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
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-sm font-semibold text-gray-200">{label}</legend>
      {getPeriods().map((period) => (
        <div key={period.id} className="flex flex-col gap-2">
          <span className="text-xs text-gray-400">{period.label}</span>
          <div className="flex flex-wrap gap-2">
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
    </fieldset>
  );
};
