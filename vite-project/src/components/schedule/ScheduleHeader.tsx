import { RiCalendarLine } from "react-icons/ri";

type ScheduleHeaderProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <header className="border-b border-gray-600 pb-4 mb-4">
      <h2 className="text-xl font-bold text-yellow-400">Sua agenda</h2>
      <p className="text-gray-400 text-sm">Consulte os seus cortes de cabelo agendados por dia</p>

      <div className="mt-3 flex items-center gap-2">
        <RiCalendarLine className="w-4 h-4 text-gray-400" />
        <select
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-gray-700 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
        >
          <option value="2024-01-09" className="text-gray-300">
            09/01/2024
          </option>
          <option value="2024-01-10" className="text-gray-300">
            10/01/2024
          </option>
          <option value="2024-01-11" className="text-gray-300">
            11/01/2024
          </option>
        </select>
      </div>
    </header>
  );
};