"use client";

import { useState } from "react";
import { useAuthForm, type Mode } from "./useAuthForm";
import AuthFormFields from "./AuthFormFields";

type AuthModalProps = {
  open: boolean;
  initialMode?: Mode;
  onClose: () => void;
};

export default function AuthModal({
  open,
  initialMode = "sign-in",
  onClose,
}: AuthModalProps) {
  const {
    mode,
    setMode,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    message,
    setMessage,
    handleSubmit,
  } = useAuthForm({ initialMode, onAuthSuccess: onClose });

  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setMode(initialMode);
      setError(null);
      setMessage(null);
    }
  }

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/70" />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>

          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {mode === "sign-in" ? "Giriş Yap" : "Hesap Oluştur"}
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            {mode === "sign-in"
              ? "Kırıntı Madencilik topluluğuna tekrar hoş geldin."
              : "Topluluğa katılmak için birkaç bilgi yeter."}
          </p>

          <AuthFormFields
            mode={mode}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            error={error}
            message={message}
            onSubmit={handleSubmit}
            onModeToggle={setMode}
          />
        </div>
      </div>
    </>
  );
}
