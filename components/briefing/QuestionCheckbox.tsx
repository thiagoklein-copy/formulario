"use client";

type QuestionCheckboxProps = {
  label: string;
  hint?: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  maxSelections?: number;
};

export function QuestionCheckbox({
  label,
  hint,
  options,
  values,
  onChange,
  error,
  maxSelections,
}: QuestionCheckboxProps) {
  const limitReached = typeof maxSelections === "number" && values.length >= maxSelections;
  return (
    <div className="space-y-3">
      <p className="text-base font-medium text-[#F5F4F0]">{label}</p>
      {hint ? <p className="text-sm text-[#F5F4F0]/70">{hint}</p> : null}
      <div className="space-y-2">
        {options.map((option) => {
          const checked = values.includes(option);
          const blocked = !checked && limitReached;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (checked) {
                  onChange(values.filter((item) => item !== option));
                  return;
                }
                if (blocked) return;
                onChange([...values, option]);
              }}
              className={`min-h-[44px] w-full rounded-xl border px-4 py-3 text-left transition ${
                checked
                  ? "border-[#BA7517] bg-[#534AB7]/35 text-[#F5F4F0]"
                  : blocked
                    ? "border-[#534AB7]/30 bg-[#111124]/50 text-[#F5F4F0]/45"
                    : "border-[#534AB7]/50 bg-[#111124] text-[#F5F4F0]/85"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {maxSelections ? (
        <p className="text-xs text-[#F5F4F0]/65">
          Selecione até {maxSelections} opção(ões). {limitReached ? "Limite atingido." : ""}
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
