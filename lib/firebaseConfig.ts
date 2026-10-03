// Centralized Firebase configuration for Notice2Action
// Project: notice-2-action-a1c30

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBRpDIRg8WSTFPYkokwj_DIBheXVowBZIg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "notice-2-action-a1c30.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "notice-2-action-a1c30",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "notice-2-action-a1c30.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "99983733633",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:99983733633:web:22d5e4bad3678394756e80",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-T9EG8T8BD5",
};
