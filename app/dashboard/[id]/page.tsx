import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailActions } from "@/components/dashboard/DetailActions";
import { ResponseDetail } from "@/components/dashboard/ResponseDetail";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type ResponseDetailsPageProps = {
  params: { id: string };
};

export default async function ResponseDetailsPage({ params }: ResponseDetailsPageProps) {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("briefing_responses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) notFound();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/dashboard" className="rounded-lg border border-[#534AB7]/50 px-4 py-2">
          Voltar
        </Link>
        <DetailActions />
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            data.completed ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
          }`}
        >
          {data.completed ? "Completo" : `Etapa ${data.current_step}`}
        </span>
      </div>
      <ResponseDetail response={data} />
      <style>{`@media print { button, a { display: none !important; } }`}</style>
    </main>
  );
}
