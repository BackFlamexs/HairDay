import type { Appointment } from "../../types/appointment";
import { AppointmentItem } from "./AppointmentItem";

type AppointmentListProps = {
  appointments: Appointment[];
  onDelete: (appointment: Appointment) => void;
};

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onDelete }) => {
  return (
    <ul className="divide-y divide-line-subtle">
      {appointments.map((appointment) => (
        <AppointmentItem key={appointment.id} appointment={appointment} onDelete={onDelete} />
      ))}
    </ul>
  );
};
