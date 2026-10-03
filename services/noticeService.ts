import { NoticeAnalysisResult } from '@/types';
import { mockNotices } from '@/mock/notices';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { authService } from './authService';

const getStorageKey = (userId: string) => `notice2action_notices_${userId}`;

export const noticeService = {
  /**
   * Retrieves notices from user subcollection, central Firestore, or local fallback
   */
  async getRecentNotices(userId?: string): Promise<NoticeAnalysisResult[]> {
    const uid = userId || authService.getUserId();
    const resultList: NoticeAnalysisResult[] = [];
    const seenIds = new Set<string>();

    // 1. Check local storage cache for user notices
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(getStorageKey(uid));
        if (stored) {
          const userNotices = JSON.parse(stored) as NoticeAnalysisResult[];
          userNotices.forEach((n) => {
            if (!seenIds.has(n.id)) {
              seenIds.add(n.id);
              resultList.push(n);
            }
          });
        }
      } catch (e) {}
    }

    // 2. Fetch user-scoped notices from Firestore: users/{uid}/notices
    try {
      const userNoticesRef = collection(db, 'users', uid, 'notices');
      const userSnap = await getDocs(userNoticesRef);
      userSnap.forEach((d) => {
        const n = { ...(d.data() as NoticeAnalysisResult), id: d.id };
        if (!seenIds.has(n.id)) {
          seenIds.add(n.id);
          resultList.push(n);
        }
      });
    } catch (e) {}

    // 3. Fetch central verified government circulars from Firestore
    try {
      const colRef = collection(db, 'notices');
      const snap = await getDocs(colRef);
      snap.forEach((d) => {
        const n = { ...(d.data() as NoticeAnalysisResult), id: d.id };
        if (!seenIds.has(n.id)) {
          seenIds.add(n.id);
          resultList.push(n);
        }
      });
    } catch (e) {}

    // 4. If empty or missing base notices, supplement with verified seed notices
    mockNotices.forEach((m) => {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        resultList.push(m);
      }
    });

    return resultList;
  },

  async getNoticeById(id: string, userId?: string): Promise<NoticeAnalysisResult | undefined> {
    const all = await this.getRecentNotices(userId);
    return all.find((n) => n.id === id);
  },

  /**
   * Real PDF Notice Analysis:
   * Sends binary PDF and studentId to /api/notices/analyze.
   * Persists extracted notice locally and in Firestore.
   */
  async analyzeNotice(file: File, userId?: string): Promise<NoticeAnalysisResult> {
    const uid = userId || authService.getUserId();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', uid);

    const response = await fetch('/api/notices/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to analyze PDF notice');
    }

    const data: NoticeAnalysisResult = await response.json();

    // Cache locally
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(getStorageKey(uid));
        const list = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((item: NoticeAnalysisResult) => item.id !== data.id && item.title !== data.title);
        localStorage.setItem(getStorageKey(uid), JSON.stringify([data, ...filtered]));
      } catch (e) {}
    }

    // Persist under users/{uid}/notices/{noticeId}
    try {
      const userNoticeRef = doc(db, 'users', uid, 'notices', data.id);
      await setDoc(userNoticeRef, { ...data, studentId: uid, savedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {}

    return data;
  }
};
