"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import AuthModal from "./AuthModal";

type Mode = "sign-in" | "sign-up";

type AuthModalContextValue = {
  openAuthModal: (mode?: Mode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("sign-in");

  const openAuthModal = useCallback((nextMode: Mode = "sign-in") => {
    setMode(nextMode);
    setIsOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setIsOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}
      <AuthModal open={isOpen} initialMode={mode} onClose={closeAuthModal} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
