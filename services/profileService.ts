import { StudentProfile } from '@/types';
import { mockStudent } from '@/mock/student';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { authService } from './authService';

const getStorageKey = (userId: string) => `notice2action_student_profile_${userId}`;

type ProfileListener = (profile: StudentProfile) => void;
const listeners: Set<ProfileListener> = new Set();

export const profileService = {
  subscribe(listener: ProfileListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notify(profile: StudentProfile) {
    listeners.forEach((fn) => {
      try {
        fn(profile);
      } catch (err) {
        console.error('Error notifying profile subscriber:', err);
      }
    });
  },

  getProfile(userId?: string): StudentProfile {
    const uid = userId || authService.getUserId();
    if (typeof window === 'undefined') return { ...mockStudent, id: uid };
    try {
      const stored = localStorage.getItem(getStorageKey(uid));
      if (stored) {
        return JSON.parse(stored);
      }
      // If default user, initialize with mockStudent
      if (uid.includes('ridham')) {
        return { ...mockStudent, id: uid };
      }
      // Default blank student profile for new user
      return {
        id: uid,
        fullName: '',
        email: '',
        phone: '',
        gujaratDomicile: true,
        academicLevel: 'UG',
        courseStream: 'Engineering',
        boardUniversity: 'GTU',
        percentageOrCgpa: '80.0',
        category: 'General',
        annualFamilyIncome: 300000,
        district: 'Ahmedabad',
        taluka: 'City',
        hosteller: false,
        disability: false,
      };
    } catch (e) {
      console.error('Error loading profile from localStorage', e);
    }
    return { ...mockStudent, id: uid };
  },

  async loadProfileFromCloud(userId?: string): Promise<StudentProfile> {
    const uid = userId || authService.getUserId();
    try {
      // 1. Check users/{uid}
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const cloudData = snap.data() as StudentProfile;
        this.saveProfileLocal(cloudData, uid);
        this.notify(cloudData);
        return cloudData;
      }

      // 2. Check students/{uid}
      const studentRef = doc(db, 'students', uid);
      const studentSnap = await getDoc(studentRef);
      if (studentSnap.exists()) {
        const cloudData = studentSnap.data() as StudentProfile;
        this.saveProfileLocal(cloudData, uid);
        this.notify(cloudData);
        return cloudData;
      }
    } catch (e: any) {
      // Offline / rules fallback
    }
    return this.getProfile(uid);
  },

  saveProfileLocal(profile: StudentProfile, userId?: string): void {
    const uid = userId || profile.id || authService.getUserId();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(getStorageKey(uid), JSON.stringify({ ...profile, id: uid }));
      } catch (e) {
        console.error('Error saving profile to localStorage', e);
      }
    }
  },

  async saveProfile(profile: StudentProfile): Promise<StudentProfile> {
    const uid = profile.id || authService.getUserId();
    const updatedProfile = { ...profile, id: uid };

    // 1. Immediately cache locally for this user
    this.saveProfileLocal(updatedProfile, uid);

    // 2. Broadcast to reactive UI listeners
    this.notify(updatedProfile);

    // 3. Persist to Firestore: users/{uid} and students/{uid}
    try {
      const userDocRef = doc(db, 'users', uid);
      await setDoc(
        userDocRef,
        {
          ...updatedProfile,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      const studentDocRef = doc(db, 'students', uid);
      await setDoc(
        studentDocRef,
        {
          ...updatedProfile,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e: any) {
      // Local storage provides immediate persistence if Firestore network fails
    }

    return updatedProfile;
  }
};
