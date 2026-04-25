import { ResponseCard } from "@/components/dashboard/ResponseCard";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type DashboardPageProps = {
  searchParams?: {
    q?: string;
    status?: "all" | "completed" | "in_progress";
    sort?: "desc" | "asc";
  };
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = getSupabaseServerClient();
  const query = searchParams?.q ?? "";
  const status = searchParams?.status ?? "all";
  const sort = searchParams?.sort ?? "desc";

  let dbQuery = supabase
    .from("briefing_responses")
    .select("id,nome_completo,created_at,completed,current_step")
    .order("created_at", { ascending: sort === "asc" });

  if (status === "completed") dbQuery = dbQuery.eq("completed", true);
  if (status === "in_progress") dbQuery = dbQuery.eq("completed", false);
  if (query) dbQuery = dbQuery.ilike("nome_completo", `%${query}%`);

  const { data } = await dbQuery;

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-4xl">Dashboard de Briefings</h1>
      <form className="mb-6 grid gap-3 rounded-xl border border-[#534AB7]/35 bg-[#111124] p-4 md:grid-cols-4">
        <input
          name="q"
          defaultValue={query}
          placeholder="Buscar por nome..."
          className="rounded-lg border border-[#534AB7]/45 bg-[#1A1A2E] px-3 py-2"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-[#534AB7]/45 bg-[#1A1A2E] px-3 py-2"
        >
          <option value="all">Todos</option>
          <option value="completed">Completos</option>
          <option value="in_progress">Em andamento</option>
        </select>
        <select
          name="sort"
          defaultValue={sort}
          className="rounded-lg border border-[#534AB7]/45 bg-[#1A1A2E] px-3 py-2"
        >
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
        <button className="rounded-lg bg-[#BA7517] px-3 py-2 font-semibold">Aplicar</button>
      </form>
      <div className="grid gap-4">
        {(data ?? []).map((item) => (
          <ResponseCard
            key={item.id}
            id={item.id}
            name={item.nome_completo}
            createdAt={item.created_at}
            completed={item.completed}
            currentStep={item.current_step}
          />
        ))}
      </div>
    </main>
  );
}
