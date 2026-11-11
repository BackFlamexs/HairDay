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
    ? "border-yellow-400 bg-gray-700 text-yellow-400"
    : available
      ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
      : "cursor-not-allowed border-gray-700 bg-transparent text-gray-600 line-through";

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
