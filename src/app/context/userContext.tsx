'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth } from "@/services/firebase";
import { signOut, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

// Create a context to hold the user object
const UserContext = createContext<{ user: User | null } | undefined>(undefined);

// Provider component to wrap the app
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

export const logOut = () => {
  signOut(auth);
};

export function useUserContext() {
  const context = useContext(UserContext);
  return context?.user;
};