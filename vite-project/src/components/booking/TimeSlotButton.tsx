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
  const classes = [
    "px-3 py-1 rounded-md text-sm font-medium transition-colors",
    "hover:opacity-80",
  ];

  if (selected) {
    classes.push("bg-yellow-400 text-gray-900");
  } else if (available) {
    classes.push("bg-gray-700 text-white");
  } else {
    classes.push("bg-gray-500 text-gray-300 cursor-not-allowed");
  }

  return (
    <button
      className={classes.join(" ")}
      onClick={onClick}
      disabled={!available}
      aria-disabled={!available}
      title={!available ? "Horário indisponível" : ""}
    >
      {time}
    </button>
  );
};