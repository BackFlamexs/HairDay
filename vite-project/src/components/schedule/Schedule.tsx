import { useMemo } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import type { Appointment } from "../../types/appointment";
import { getAppointmentsByPeriod, getPeriods } from "../../utils/appointment";
import { formatDateISOtoDisplay } from "../../utils/date";
import { ScheduleHeader } from "./ScheduleHeader";
import { PeriodSection } from "./PeriodSection";

type ScheduleProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

export const Schedule: React.FC<ScheduleProps> = ({ selectedDate, onDateChange }) => {
  const { appointments, removeAppointment } = useAppointments();

  const byPeriod = useMemo(
    () => getAppointmentsByPeriod(appointments, selectedDate),
    [appointments, selectedDate]
  );

  const handleDelete = (appointment: Appointment) => {
    const confirmed = window.confirm(
      `Cancelar o agendamento de ${appointment.clientName} em ${formatDateISOtoDisplay(appointment.date)} às ${appointment.time}?`
    );
    if (confirmed) removeAppointment(appointment.id);
  };

  return (
    <section className="w-full flex-1 rounded-xl bg-gray-900 p-6 md:p-8">
      <ScheduleHeader selectedDate={selectedDate} onDateChange={onDateChange} />

      <div className="flex flex-col gap-3">
        {getPeriods().map((period) => (
          <PeriodSection
            key={period.id}
            period={period}
            appointments={byPeriod[period.id]}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};
