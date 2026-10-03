import { Opportunity, OpportunityType, OpportunityStatus, StudentProfile } from '@/types';
import { mockOpportunities } from '@/mock/opportunities';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { rankOpportunitiesForStudent, MatchedOpportunity } from '@/lib/matchingEngine';

const STORAGE_CACHE_KEY = 'notice2action_opportunities_cache';
let cachedOpps: Opportunity[] | null = null;
let isSeeding = false;

export const opportunityService = {
  /**
   * Automatically seeds Firestore 'opportunities' collection if empty
   */
  async seedOpportunitiesIfNeeded(): Promise<void> {
    if (isSeeding) return;
    isSeeding = true;
    try {
      const colRef = collection(db, 'opportunities');
      const snap = await getDocs(colRef);
      if (snap.empty) {
        // Seed all verified Gujarat opportunities
        for (const opp of mockOpportunities) {
          const docRef = doc(db, 'opportunities', opp.id);
          await setDoc(docRef, { ...opp, seededAt: new Date().toISOString() }, { merge: true });
        }
      }
    } catch (e) {
      // Local fallback retains full verified dataset
    } finally {
      isSeeding = false;
    }
  },

  /**
   * Retrieves all opportunities from Firestore with memory and local cache
   */
  async getAll(): Promise<Opportunity[]> {
    if (cachedOpps && cachedOpps.length > 0) {
      return cachedOpps;
    }

    // Check local storage cache
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_CACHE_KEY);
        if (stored) {
          cachedOpps = JSON.parse(stored);
        }
      } catch (e) {}
    }

    try {
      const colRef = collection(db, 'opportunities');
      const snapshot = await getDocs(colRef);
      if (!snapshot.empty) {
        const remoteOpps: Opportunity[] = [];
        snapshot.forEach((d) => {
          remoteOpps.push({ ...(d.data() as Opportunity), id: d.id });
        });
        cachedOpps = remoteOpps;
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(remoteOpps));
        }
        return remoteOpps;
      } else {
        // Empty in Firestore -> trigger auto-seed
        this.seedOpportunitiesIfNeeded();
      }
    } catch (e: any) {
      // Offline fallback
    }

    cachedOpps = [...mockOpportunities];
    return cachedOpps;
  },

  /**
   * Retrieves single opportunity by ID from Firestore or cache
   */
  async getById(id: string): Promise<Opportunity | undefined> {
    const all = await this.getAll();
    const found = all.find((item) => item.id === id);
    if (found) return found;

    try {
      const docRef = doc(db, 'opportunities', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { ...(snapshot.data() as Opportunity), id: snapshot.id };
      }
    } catch (e: any) {
      // fallback
    }

    return mockOpportunities.find((item) => item.id === id);
  },

  /**
   * Dynamic search and multi-facet filtering
   */
  async searchAndFilter(params: {
    query?: string;
    type?: OpportunityType | 'all';
    status?: OpportunityStatus | 'all';
    educationLevel?: string;
  }): Promise<Opportunity[]> {
    const all = await this.getAll();
    let list = [...all];

    if (params.type && params.type !== 'all') {
      list = list.filter((item) => item.type === params.type);
    }

    if (params.status && params.status !== 'all') {
      list = list.filter((item) => item.status === params.status);
    }

    if (params.educationLevel && params.educationLevel !== 'all') {
      list = list.filter((item) =>
        item.education_levels.some((lvl) =>
          lvl.toLowerCase().includes(params.educationLevel!.toLowerCase())
        )
      );
    }

    if (params.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle?.toLowerCase().includes(q) ||
          item.authority.toLowerCase().includes(q) ||
          item.eligibility.academic?.toLowerCase().includes(q)
      );
    }

    return list;
  },

  /**
   * Retrieves urgent items requiring immediate student attention
   */
  async getAttentionItems(): Promise<Opportunity[]> {
    const all = await this.getAll();
    return all.filter(
      (item) =>
        item.urgencyLevel === 'high' ||
        item.status === 'EXTENDED' ||
        item.status === 'NOT_ANNOUNCED'
    );
  },

  /**
   * Ranks opportunities using the deterministic Eligibility & Matching engine
   */
  async getMatchedOpportunities(student: StudentProfile): Promise<MatchedOpportunity[]> {
    const all = await this.getAll();
    return rankOpportunitiesForStudent(student, all);
  }
};
