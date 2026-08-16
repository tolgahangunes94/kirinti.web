"use client";

import type { Mode } from "./useAuthForm";

type AuthFormFieldsProps = {
  mode: Mode;
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  error: string | null;
  message: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onModeToggle: (mode: Mode) => void;
};

export default function AuthFormFields({
  mode,
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  message,
  onSubmit,
  onModeToggle,
}: AuthFormFieldsProps) {
  return (
    <>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
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
          <label htmlFor="email" className="text-xs font-medium text-muted">
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
              onClick={() => onModeToggle("sign-up")}
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
              onClick={() => onModeToggle("sign-in")}
              className="font-medium text-accent hover:text-accent-strong"
            >
              Giriş yap
            </button>
          </>
        )}
      </p>
    </>
  );
}
