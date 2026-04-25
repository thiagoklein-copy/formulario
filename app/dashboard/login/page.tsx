"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function DashboardLoginPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Falha ao autenticar. Verifique email e senha.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border border-[#534AB7]/35 bg-[#111124] p-6"
      >
        <h1 className="text-3xl">Acesso ao Dashboard</h1>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-full rounded-xl border border-[#534AB7]/50 bg-[#1A1A2E] px-4 py-3"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha"
          className="w-full rounded-xl border border-[#534AB7]/50 bg-[#1A1A2E] px-4 py-3"
          required
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button type="submit" className="min-h-[44px] w-full rounded-xl bg-[#BA7517] py-3 font-semibold">
          Entrar
        </button>
      </form>
    </main>
  );
}
