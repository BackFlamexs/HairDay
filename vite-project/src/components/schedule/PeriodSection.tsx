import { RiMoonClearLine, RiSunCloudyLine, RiSunLine } from "react-icons/ri";
import type { IconType } from "react-icons";
import type { Appointment, Period, PeriodId } from "../../types/appointment";
import { EmptyPeriod } from "./EmptyPeriod";
import { AppointmentList } from "./AppointmentList";

const PERIOD_ICONS: Record<PeriodId, IconType> = {
  morning: RiSunLine,
  afternoon: RiSunCloudyLine,
  evening: RiMoonClearLine,
};

type PeriodSectionProps = {
  period: Period;
  appointments: Appointment[];
  onDelete: (appointment: Appointment) => void;
};

export const PeriodSection: React.FC<PeriodSectionProps> = ({ period, appointments, onDelete }) => {
  const Icon = PERIOD_ICONS[period.id];
  const headingId = `period-${period.id}`;

  return (
    <section aria-labelledby={headingId} className="rounded-lg border border-gray-700">
      <header className="flex items-center justify-between border-b border-gray-700 px-5 py-3">
        <h3 id={headingId} className="flex items-center gap-2 text-sm font-semibold text-gray-200">
          <Icon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
          {period.label}
        </h3>
        <span className="text-sm text-gray-400">
          {period.startLabel}-{period.endLabel}
        </span>
      </header>

      <div className="px-5 py-3">
        {appointments.length === 0 ? (
          <EmptyPeriod />
        ) : (
          <AppointmentList appointments={appointments} onDelete={onDelete} />
        )}
      </div>
    </section>
  );
};
