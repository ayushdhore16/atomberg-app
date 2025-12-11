"use client";

import { useAppContext } from "@/lib/context";
import { AuthForm, Dashboard } from "@/components";

export default function Home() {
  const { isAuthenticated } = useAppContext();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      {isAuthenticated ? <Dashboard /> : <AuthForm />}
    </main>
  );
}
