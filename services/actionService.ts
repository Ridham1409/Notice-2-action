import { ActionPlanItem } from '@/types';
import { mockActionPlan } from '@/mock/actions';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { authService } from './authService';

const getStorageKey = (userId: string) => `notice2action_action_plan_${userId}`;

export const actionService = {
  getActionPlan(userId?: string): ActionPlanItem[] {
    const uid = userId || authService.getUserId();
    if (typeof window === 'undefined') return mockActionPlan;
    try {
      const stored = localStorage.getItem(getStorageKey(uid));
      if (stored) {
        return JSON.parse(stored);
      }
      // If default user, initialize with mock items
      if (uid.includes('ridham')) {
        return mockActionPlan;
      }
      return [];
    } catch (e) {
      console.error('Error loading action plan', e);
    }
    return mockActionPlan;
  },

  async loadFromCloud(userId?: string): Promise<ActionPlanItem[]> {
    const uid = userId || authService.getUserId();
    try {
      // 1. Check user-scoped subcollection: users/{uid}/actionPlan
      const subColRef = collection(db, 'users', uid, 'actionPlan');
      const snap = await getDocs(subColRef);
      if (!snap.empty) {
        const cloudItems: ActionPlanItem[] = [];
        snap.forEach((d) => {
          cloudItems.push({ ...(d.data() as ActionPlanItem), id: d.id });
        });
        this.saveActionPlanLocal(cloudItems, uid);
        return cloudItems;
      }

      // 2. Check global actions collection filtered by studentId
      const colRef = collection(db, 'actions');
      const globalSnap = await getDocs(colRef);
      if (!globalSnap.empty) {
        const userItems: ActionPlanItem[] = [];
        globalSnap.forEach((d) => {
          const item = d.data() as ActionPlanItem & { studentId?: string };
          if (item.studentId === uid || !item.studentId) {
            userItems.push({ ...item, id: d.id });
          }
        });
        if (userItems.length > 0) {
          this.saveActionPlanLocal(userItems, uid);
          return userItems;
        }
      }
    } catch (e: any) {
      // Offline / permission fallback
    }
    return this.getActionPlan(uid);
  },

  saveActionPlanLocal(items: ActionPlanItem[], userId?: string): void {
    const uid = userId || authService.getUserId();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(getStorageKey(uid), JSON.stringify(items));
      } catch (e) {
        console.error('Error saving action plan', e);
      }
    }
  },

  async syncItemToCloud(item: ActionPlanItem, userId?: string): Promise<void> {
    const uid = userId || authService.getUserId();
    try {
      // 1. Save under user's private subcollection: users/{uid}/actionPlan/{actionId}
      const userDocRef = doc(db, 'users', uid, 'actionPlan', item.id);
      await setDoc(
        userDocRef,
        {
          ...item,
          studentId: uid,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      // 2. Save under central actions collection
      const globalDocRef = doc(db, 'actions', item.id);
      await setDoc(
        globalDocRef,
        {
          ...item,
          studentId: uid,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      // Local storage provides immediate persistence
    }
  },

  addItem(item: Omit<ActionPlanItem, 'id' | 'createdAt'>, userId?: string): ActionPlanItem {
    const uid = userId || authService.getUserId();
    const current = this.getActionPlan(uid);
    const newItem: ActionPlanItem = {
      ...item,
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...current];
    this.saveActionPlanLocal(updated, uid);
    this.syncItemToCloud(newItem, uid);
    return newItem;
  },

  toggleDocument(actionId: string, docIndex: number, userId?: string): ActionPlanItem[] {
    const uid = userId || authService.getUserId();
    const current = this.getActionPlan(uid);
    let updatedItem: ActionPlanItem | null = null;

    const updated = current.map((item) => {
      if (item.id === actionId && item.documents[docIndex]) {
        const docs = [...item.documents];
        docs[docIndex] = {
          ...docs[docIndex],
          checked: !docs[docIndex].checked,
        };
        updatedItem = { ...item, documents: docs };
        return updatedItem;
      }
      return item;
    });

    this.saveActionPlanLocal(updated, uid);
    if (updatedItem) {
      this.syncItemToCloud(updatedItem, uid);
    }
    return updated;
  },

  toggleComplete(actionId: string, userId?: string): ActionPlanItem[] {
    const uid = userId || authService.getUserId();
    const current = this.getActionPlan(uid);
    let updatedItem: ActionPlanItem | null = null;

    const updated = current.map((item) => {
      if (item.id === actionId) {
        const isCompleted = item.status === 'COMPLETED';
        updatedItem = {
          ...item,
          status: isCompleted ? 'IN_PROGRESS' : 'COMPLETED',
          categoryTimeframe: isCompleted ? 'TODAY' : 'COMPLETED',
          completedAt: isCompleted ? undefined : new Date().toISOString(),
        } as ActionPlanItem;
        return updatedItem;
      }
      return item;
    });

    this.saveActionPlanLocal(updated, uid);
    if (updatedItem) {
      this.syncItemToCloud(updatedItem, uid);
    }
    return updated;
  },

  deleteItem(actionId: string, userId?: string): ActionPlanItem[] {
    const uid = userId || authService.getUserId();
    const current = this.getActionPlan(uid);
    const updated = current.filter((item) => item.id !== actionId);
    this.saveActionPlanLocal(updated, uid);

    try {
      const userDocRef = doc(db, 'users', uid, 'actionPlan', actionId);
      deleteDoc(userDocRef).catch(() => {});
      const globalDocRef = doc(db, 'actions', actionId);
      deleteDoc(globalDocRef).catch(() => {});
    } catch (e) {}

    return updated;
  }
};
