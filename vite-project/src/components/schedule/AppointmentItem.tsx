type AppointmentItemProps = {
  appointment: {
    id: string;
    clientName: string;
    date: string;
    time: string;
  };
  deleteAppointment: (id: string) => void;
};

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  deleteAppointment,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-600 last:border-0">
      <span className="text-gray-300">
        <span className="font-medium text-white">{appointment.time}</span>
        - {appointment.clientName}
      </span>
      <button
        onClick={() => deleteAppointment(appointment.id)}
        className="text-red-400 hover:text-red-300 transition-colors"
        aria-label="Excluir agendamento"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            d="M6 19a2 2 0 0 1-2-2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5l-5 2Zm0-12h12v2h-5l-5 2V7ZM7 10l5 5V7H7v3Z"
          />
        </svg>
      </button>
    </div>
  );
};