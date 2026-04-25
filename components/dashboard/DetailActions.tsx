"use client";

export function DetailActions() {
  return (
    <>
      <button onClick={() => window.print()} className="rounded-lg bg-[#BA7517] px-4 py-2 font-semibold">
        Exportar como PDF
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="rounded-lg border border-[#534AB7]/50 px-4 py-2"
      >
        Copiar link para compartilhar com o time
      </button>
    </>
  );
}
