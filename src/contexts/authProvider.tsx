"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: string;
  joinDate?: string;
  readingStats?: {
    totalRead: number;
    favorites: number;
    currentlyReading: number;
  };
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res.success && res.user) {
        setUser(res.user);
      }
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error("getCurrentUser error:", err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
