"use client";

import { useRouter } from "next/navigation";
import { useAuthForm } from "./useAuthForm";
import AuthFormFields from "./AuthFormFields";

export default function LoginForm() {
  const router = useRouter();
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
    message,
    handleSubmit,
  } = useAuthForm({ onAuthSuccess: () => router.push("/") });

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {mode === "sign-in" ? "Giriş Yap" : "Hesap Oluştur"}
      </h1>
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
  );
}
