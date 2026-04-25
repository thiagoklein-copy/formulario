export default function BriefingDonePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1A1A2E] px-6 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full border-2 border-emerald-400">
        <span className="animate-pulse text-4xl text-emerald-300">✓</span>
      </div>
      <h1 className="mb-3 text-4xl text-white">Briefing enviado com sucesso</h1>
      <p className="max-w-2xl text-white/80">
        Rafael, recebemos todas as suas respostas. Agora e com a gente - em breve
        entraremos em contato para dar os proximos passos do DNA do Reino.
      </p>
      <p className="mt-10 text-sm uppercase tracking-[0.2em] text-[#BA7517]">Agencia DNA Growth</p>
    </main>
  );
}
