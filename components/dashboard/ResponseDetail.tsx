import { BriefingResponse } from "@/lib/briefing-schema";

type ResponseDetailProps = {
  response: BriefingResponse & { created_at?: string; completed?: boolean; current_step?: number };
};

function renderValue(value: unknown) {
  if (value === null || value === undefined) return "-";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return "-";
    const parsedDate = Date.parse(trimmed);
    if (!Number.isNaN(parsedDate) && /^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
      return new Date(parsedDate).toLocaleString("pt-BR");
    }
    return trimmed;
  }
  return String(value);
}

export function ResponseDetail({ response }: ResponseDetailProps) {
  const entries = Object.entries(response).filter(
    ([key]) => !["id", "session_id", "updated_at"].includes(key),
  );

  return (
    <div className="space-y-4">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-xl border border-[#534AB7]/35 bg-[#111124] p-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-[#F5F4F0]/55">{key}</p>
          <p className="text-sm leading-relaxed text-[#F5F4F0]">{renderValue(value)}</p>
        </div>
      ))}
    </div>
  );
}
