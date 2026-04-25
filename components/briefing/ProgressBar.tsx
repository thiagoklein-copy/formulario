type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="sticky top-0 z-20 border-b border-[#534AB7]/35 bg-[#1A1A2E]/95 px-4 py-4 backdrop-blur">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between text-xs text-[#F5F4F0]/70">
          <span>Briefing DNA do Reino</span>
          <span>
            Etapa {currentStep}/{totalSteps}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#111124]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#534AB7] to-[#BA7517] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
