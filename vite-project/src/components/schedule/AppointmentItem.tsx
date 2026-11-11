import { RiDeleteBinLine } from "react-icons/ri";
import type { Appointment } from "../../types/appointment";

type AppointmentItemProps = {
  appointment: Appointment;
  onDelete: (appointment: Appointment) => void;
};

export const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onDelete }) => {
  return (
    <li className="flex items-center gap-4 py-2">
      <span className="font-bold tabular-nums text-fg">{appointment.time}</span>
      <span className="flex-1 truncate text-fg-soft">{appointment.clientName}</span>
      <button
        type="button"
        onClick={() => onDelete(appointment)}
        className="rounded p-1 text-fg-subtle transition hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        aria-label={`Cancelar agendamento de ${appointment.clientName} às ${appointment.time}`}
        title="Cancelar agendamento"
      >
        <RiDeleteBinLine aria-hidden="true" className="h-5 w-5" />
      </button>
    </li>
  );
};
