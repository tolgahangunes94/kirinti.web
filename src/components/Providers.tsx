"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/supabase/AuthProvider";
import { AuthModalProvider } from "@/components/auth/AuthModalProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>{children}</AuthModalProvider>
    </AuthProvider>
  );
}
