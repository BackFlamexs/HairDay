import { AppointmentItem } from "./AppointmentItem";

type AppointmentListProps = {
  appointments: {
    id: string;
    clientName: string;
    date: string;
    time: string;
  }[];
  deleteAppointment: (id: string) => void;
};

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  deleteAppointment,
}) => {
  if (appointments.length === 0) {
    return <></>;
  }

  return (
    <div>
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          deleteAppointment={deleteAppointment}
        />
      ))}
    </div>
  );
};