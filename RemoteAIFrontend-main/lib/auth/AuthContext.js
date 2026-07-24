"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getToken } from "@/lib/api/authClient";
import * as authApi from "@/lib/api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadCurrentUser() {
      if (!getToken()) {
        setIsLoading(false);
        return;
      }
      try {
        const me = await authApi.getMe();
        if (!cancelled) setUser(me);
      } catch {
        // Token invalid/expired — treat as logged out rather than erroring the page.
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadCurrentUser();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const loggedInUser = await authApi.login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (details) => {
    const newUser = await authApi.register(details);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await authApi.getMe();
    setUser(me);
    return me;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within <AuthProvider>.");
  return context;
}
