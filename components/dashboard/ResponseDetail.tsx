import { BriefingResponse } from "@/lib/briefing-schema";

type ResponseDetailProps = {
  response: BriefingResponse & { created_at?: string; completed?: boolean; current_step?: number };
};

function renderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";
  return value?.trim() ? value : "-";
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
          <p className="text-sm leading-relaxed text-[#F5F4F0]">{renderValue(value as string | string[])}</p>
        </div>
      ))}
    </div>
  );
}
