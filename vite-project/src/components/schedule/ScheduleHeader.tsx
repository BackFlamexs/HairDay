import { useId } from "react";
import { RiCalendarLine } from "react-icons/ri";

type ScheduleHeaderProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ selectedDate, onDateChange }) => {
  const id = useId();

  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-bold text-fg">Sua agenda</h2>
        <p className="mt-1 text-sm text-fg-muted">
          Consulte os seus cortes de cabelo agendados por dia
        </p>
      </div>

      <div className="relative">
        <label htmlFor={id} className="sr-only">
          Data da agenda
        </label>
        <RiCalendarLine
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent"
        />
        <input
          id={id}
          type="date"
          value={selectedDate}
          onChange={(e) => e.target.value && onDateChange(e.target.value)}
          className="w-full rounded-lg border border-line bg-field py-2.5 pl-10 pr-3 text-fg outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 sm:w-auto"
        />
      </div>
    </header>
  );
};
