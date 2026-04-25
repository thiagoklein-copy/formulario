"use client";

type QuestionRadioProps = {
  label: string;
  hint?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function QuestionRadio({
  label,
  hint,
  options,
  value,
  onChange,
  error,
}: QuestionRadioProps) {
  return (
    <div className="space-y-3">
      <p className="text-base font-medium text-[#F5F4F0]">{label}</p>
      {hint ? <p className="text-sm text-[#F5F4F0]/70">{hint}</p> : null}
      <div className="space-y-2">
        {options.map((option) => {
          const checked = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`min-h-[44px] w-full rounded-xl border px-4 py-3 text-left transition ${
                checked
                  ? "border-[#BA7517] bg-[#534AB7]/35 text-[#F5F4F0]"
                  : "border-[#534AB7]/50 bg-[#111124] text-[#F5F4F0]/85"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
