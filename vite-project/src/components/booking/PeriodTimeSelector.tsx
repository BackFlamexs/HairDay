import { TimeSlotButton } from "./TimeSlotButton";
import { getPeriods } from "../../utils/appointment";

type PeriodTimeSelectorProps = {
  label: string;
  availableTimes: string[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
};

export const PeriodTimeSelector: React.FC<PeriodTimeSelectorProps> = ({
  label,
  availableTimes,
  selectedTime,
  onTimeSelect,
}) => {
  const periods = getPeriods();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {periods.map((period) => (
          <div key={period.id} className="border rounded-lg p-2">
            <span className="font-medium text-gray-300 text-xs block mb-1">
              {period.label}{" "}
              {period.startTime}-{period.endTime}
            </span>
            <div>
              {period.times.map((time) => (
                <TimeSlotButton
                  key={time}
                  time={time}
                  available={availableTimes.includes(time)}
                  selected={selectedTime === time}
                  onClick={() => onTimeSelect(time)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};