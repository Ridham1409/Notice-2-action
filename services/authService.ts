import { auth } from '@/lib/firebase';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

const USER_ID_KEY = 'notice2action_current_user_id';
const DEFAULT_USER_ID = 'stu_ridham_2026';

type AuthListener = (userId: string) => void;
const listeners: Set<AuthListener> = new Set();

class AuthService {
  private currentUserId: string = DEFAULT_USER_ID;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(USER_ID_KEY);
      if (stored) {
        this.currentUserId = stored;
      } else {
        this.currentUserId = DEFAULT_USER_ID;
        localStorage.setItem(USER_ID_KEY, this.currentUserId);
      }

      // Initialize background Firebase Anonymous Auth
      try {
        onAuthStateChanged(auth, (user: User | null) => {
          if (user) {
            // If user logged in, use their UID or map
            this.isInitialized = true;
          }
        });

        signInAnonymously(auth).catch(() => {
          // Offline or rules fallback
        });
      } catch (e) {
        // Fallback
      }
    }
  }

  getUserId(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(USER_ID_KEY);
      if (stored) return stored;
    }
    return this.currentUserId || DEFAULT_USER_ID;
  }

  setUserId(id: string): void {
    this.currentUserId = id;
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_KEY, id);
    }
    this.notify(id);
  }

  createNewStudentSession(namePrefix?: string): string {
    const newId = `stu_${namePrefix ? namePrefix.toLowerCase().replace(/\s+/g, '_') : 'student'}_${Date.now().toString(36)}`;
    this.setUserId(newId);
    return newId;
  }

  subscribe(listener: AuthListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  private notify(userId: string): void {
    listeners.forEach((fn) => {
      try {
        fn(userId);
      } catch (err) {
        console.error('Error notifying auth subscriber:', err);
      }
    });
  }
}

export const authService = new AuthService();
