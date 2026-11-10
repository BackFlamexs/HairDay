import { RiCalendarLine } from "react-icons/ri";

type ScheduleDatePickerProps = {
  selectedDate?: string;
  onDateChange?: (date: string) => void;
};

export const ScheduleDatePicker: React.FC<ScheduleDatePickerProps> = ({
  selectedDate = new Date().toISOString().split("T")[0],
  onDateChange = () => {},
}) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">Data</label>
      <div className="flex items-center gap-2">
        <RiCalendarLine className="w-4 h-4 text-gray-400" />
        <select
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-gray-700 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent w-64"
        >
          <option value="2024-01-09" className="text-gray-300">
            09/01/2024
          </option>
          <option value="2024-01-10" className="text-gray-300 selected">
            10/01/2024
          </option>
          <option value="2024-01-11" className="text-gray-300">
            11/01/2024
          </option>
        </select>
      </div>
    </div>
  );
};