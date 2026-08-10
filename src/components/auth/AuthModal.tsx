"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";

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
  const [mode, setMode] = useState<Mode>(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else onClose();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) setError(error.message);
      else setMessage("Kayıt başarılı! E-postanı doğrulamayı unutma.");
    }

    setLoading(false);
  }

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

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === "sign-up" && (
              <div>
                <label
                  htmlFor="fullName"
                  className="text-xs font-medium text-muted"
                >
                  Ad Soyad
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="text-xs font-medium text-muted"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-medium text-muted"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {message && <p className="text-sm text-green-400">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {loading
                ? "Lütfen bekle..."
                : mode === "sign-in"
                  ? "Giriş Yap"
                  : "Kayıt Ol"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            {mode === "sign-in" ? (
              <>
                Hesabın yok mu?{" "}
                <button
                  type="button"
                  onClick={() => setMode("sign-up")}
                  className="font-medium text-accent hover:text-accent-strong"
                >
                  Kayıt ol
                </button>
              </>
            ) : (
              <>
                Zaten hesabın var mı?{" "}
                <button
                  type="button"
                  onClick={() => setMode("sign-in")}
                  className="font-medium text-accent hover:text-accent-strong"
                >
                  Giriş yap
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
