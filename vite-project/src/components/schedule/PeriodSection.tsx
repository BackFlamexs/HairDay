import { EmptyPeriod } from "./EmptyPeriod";
import { AppointmentList } from "./AppointmentList";

type PeriodSectionProps = {
  periodId: "morning" | "afternoon" | "evening";
  appointments: {
    id: string;
    clientName: string;
    date: string;
    time: string;
  }[];
  deleteAppointment: (id: string) => void;
};

export const PeriodSection: React.FC<PeriodSectionProps> = ({
  periodId,
  appointments,
  deleteAppointment,
}) => {
  const periodInfo =
    periodId === "morning"
      ? { label: "Manhã", start: "09h", end: "12h" }
      : periodId === "afternoon"
        ? { label: "Tarde", start: "13h", end: "18h" }
        : { label: "Noite", start: "19h", end: "21h" };

  return (
    <section
      key={periodId}
      className="rounded-lg p-4 bg-gray-800"
    >
      <header className="flex justify-between items-start border-b border-gray-600 pb-2 mb-2">
        <span className="text-sm font-medium text-gray-300">{periodInfo.label}</span>
      </header>
      <AppointmentList
        appointments={appointments}
        deleteAppointment={deleteAppointment}
      />
      <EmptyPeriod />
    </section>
  );
};