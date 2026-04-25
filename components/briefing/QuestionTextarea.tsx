"use client";

type QuestionTextareaProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function QuestionTextarea({
  label,
  hint,
  value,
  onChange,
  error,
}: QuestionTextareaProps) {
  return (
    <label className="block space-y-2">
      <span className="text-base font-medium text-[#F5F4F0]">{label}</span>
      {hint ? <span className="block text-sm text-[#F5F4F0]/70">{hint}</span> : null}
      <textarea
        value={value}
        rows={5}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-[#111124] px-4 py-3 text-[#F5F4F0] outline-none transition ${
          error ? "border-red-500" : "border-[#534AB7]/50 focus:border-[#BA7517]"
        }`}
      />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </label>
  );
}
