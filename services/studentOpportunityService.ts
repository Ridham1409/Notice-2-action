import { StudentProfile, Opportunity } from '@/types';
import { opportunityService } from './opportunityService';
import { profileService } from './profileService';
import { actionService } from './actionService';
import { authService } from './authService';
import { rankOpportunitiesForStudent, MatchedOpportunity } from '@/lib/matchingEngine';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

const getSavedStorageKey = (userId: string) => `notice2action_saved_opps_${userId}`;

export interface StudentOpportunitySummary {
  all: MatchedOpportunity[];
  bestMatches: MatchedOpportunity[];
  needsVerification: MatchedOpportunity[];
  notEligible: MatchedOpportunity[];
  savedOpportunityIds: string[];
  plannedOpportunityIds: string[];
}

export const studentOpportunityService = {
  getSavedOpportunityIds(userId?: string): string[] {
    const uid = userId || authService.getUserId();
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(getSavedStorageKey(uid));
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading saved opportunities', e);
    }
    return [];
  },

  async toggleSaveOpportunity(opportunityId: string, userId?: string): Promise<boolean> {
    const uid = userId || authService.getUserId();
    const current = this.getSavedOpportunityIds(uid);
    const exists = current.includes(opportunityId);
    const updated = exists
      ? current.filter((id) => id !== opportunityId)
      : [...current, opportunityId];

    if (typeof window !== 'undefined') {
      localStorage.setItem(getSavedStorageKey(uid), JSON.stringify(updated));
    }

    // Persist to Firestore: users/{userId}/savedOpportunities/{oppId}
    try {
      const docRef = doc(db, 'users', uid, 'savedOpportunities', opportunityId);
      if (exists) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          opportunityId,
          savedAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      // Local storage retains saved bookmark
    }

    return !exists;
  },

  async getStudentOpportunities(studentProfile?: StudentProfile): Promise<StudentOpportunitySummary> {
    const student = studentProfile || profileService.getProfile();
    const uid = student.id || authService.getUserId();

    // 1. Fetch all opportunities from database
    const allOpps = await opportunityService.getAll();

    // 2. Deterministically evaluate and rank all opportunities against the student's profile
    const ranked = rankOpportunitiesForStudent(student, allOpps);

    // 3. Get action plan and saved bookmarks
    const actions = actionService.getActionPlan(uid);
    const plannedOpportunityIds = actions
      .map((a) => a.opportunityId)
      .filter(Boolean) as string[];
    const savedOpportunityIds = this.getSavedOpportunityIds(uid);

    // 4. Categorize by strict status
    const bestMatches = ranked.filter(
      (m) => m.eligibility.eligible === true && (m.matchLevel === 'HIGH MATCH' || m.matchLevel === 'MEDIUM MATCH')
    );
    const needsVerification = ranked.filter(
      (m) => m.eligibility.eligible === 'unknown' || m.matchLevel === 'NEEDS MORE INFORMATION'
    );
    const notEligible = ranked.filter(
      (m) => m.eligibility.eligible === false || m.matchLevel === 'NOT ELIGIBLE'
    );

    return {
      all: ranked,
      bestMatches,
      needsVerification,
      notEligible,
      savedOpportunityIds,
      plannedOpportunityIds,
    };
  }
};
