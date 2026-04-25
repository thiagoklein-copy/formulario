import Link from "next/link";

type ResponseCardProps = {
  id: string;
  name: string;
  createdAt: string;
  completed: boolean;
  currentStep: number;
};

export function ResponseCard({ id, name, createdAt, completed, currentStep }: ResponseCardProps) {
  return (
    <Link
      href={`/dashboard/${id}`}
      className="block rounded-xl border border-[#534AB7]/40 bg-[#111124] p-4 transition hover:border-[#BA7517]"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-lg font-medium text-[#F5F4F0]">{name || "Sem nome"}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            completed ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
          }`}
        >
          {completed ? "Completo" : "Em andamento"}
        </span>
      </div>
      <p className="text-sm text-[#F5F4F0]/65">
        {new Date(createdAt).toLocaleString("pt-BR")} - Etapa atual: {currentStep}
      </p>
    </Link>
  );
}
