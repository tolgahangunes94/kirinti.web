import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import LoginForm from "@/components/auth/LoginForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Giriş Yap",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <LoginForm />
      </main>
    </>
  );
}
