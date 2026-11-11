import { AppointmentForm } from "../booking/AppointmentForm";

type BookingPanelProps = {
  onBooked?: (date: string) => void;
};

export const BookingPanel: React.FC<BookingPanelProps> = ({ onBooked }) => {
  return (
    <aside className="w-full rounded-xl bg-gray-900 p-6 md:p-8 lg:max-w-md">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-gray-100">Agende um atendimento</h2>
        <p className="mt-1 text-sm text-gray-400">
          Selecione data, horário e informe o nome do cliente para criar o agendamento
        </p>
      </header>
      <AppointmentForm onBooked={onBooked} />
    </aside>
  );
};
