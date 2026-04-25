import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl text-[#F5F4F0]">DNA do Reino</h1>
      <p className="mb-8 max-w-xl text-[#F5F4F0]/75">
        Formulario de briefing para onboarding estrategico da agencia.
      </p>
      <div className="flex gap-3">
        <Link href="/briefing" className="rounded-xl bg-[#BA7517] px-5 py-3 font-semibold">
          Iniciar briefing
        </Link>
        <Link href="/dashboard" className="rounded-xl border border-[#534AB7] px-5 py-3">
          Dashboard interno
        </Link>
      </div>
    </main>
  );
}
