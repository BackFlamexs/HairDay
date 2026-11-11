type TimeSlotButtonProps = {
  time: string;
  available: boolean;
  selected: boolean;
  onClick: () => void;
};

export const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  time,
  available,
  selected,
  onClick,
}) => {
  const base =
    "rounded-lg border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400";

  const state = selected
    ? "border-yellow-400 bg-slot-hover text-accent"
    : available
      ? "border-line bg-slot text-fg hover:bg-slot-hover"
      : "cursor-not-allowed border-line-subtle bg-transparent text-fg-disabled line-through";

  return (
    <button
      type="button"
      className={`${base} ${state}`}
      onClick={onClick}
      disabled={!available}
      aria-pressed={selected}
      title={available ? undefined : "Horário indisponível"}
    >
      {time}
    </button>
  );
};
