type NavigationButtonsProps = {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
};

export function NavigationButtons({
  onBack,
  onNext,
  nextLabel = "Proxima etapa",
  disabled,
}: NavigationButtonsProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#534AB7]/40 bg-[#1A1A2E]/95 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-2xl gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] flex-1 rounded-xl border border-[#534AB7]/60 px-4 py-3 text-[#F5F4F0]"
          >
            Voltar
          </button>
        ) : null}
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className="min-h-[44px] flex-1 rounded-xl bg-[#BA7517] px-4 py-3 font-semibold text-[#F5F4F0] disabled:opacity-50"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
