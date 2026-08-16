"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Mode = "sign-in" | "sign-up";

type UseAuthFormOptions = {
  initialMode?: Mode;
  onAuthSuccess?: () => void;
};

export function useAuthForm({
  initialMode = "sign-in",
  onAuthSuccess,
}: UseAuthFormOptions = {}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
      else onAuthSuccess?.();
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

  return {
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
  };
}
