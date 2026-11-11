import { useMemo, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { getAvailableTimes } from "../../utils/appointment";
import { formatDateISOtoDisplay, getTodayISO } from "../../utils/date";
import { DateField } from "./DateField";
import { PeriodTimeSelector } from "./PeriodTimeSelector";
import { ClientNameField } from "./ClientNameField";
import { FormMessage } from "../ui/FormMessage";

type AppointmentFormProps = {
  /** Chamado após um agendamento ser criado com sucesso */
  onBooked?: (date: string) => void;
};

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ onBooked }) => {
  const { appointments, addAppointment } = useAppointments();

  const [date, setDate] = useState<string>(getTodayISO);
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const availableTimes = useMemo(() => getAvailableTimes(appointments, date), [appointments, date]);

  // Se o horário escolhido deixar de estar disponível (troca de data, outro
  // agendamento, horário que passou), ele é tratado como não selecionado.
  const selectedTime = availableTimes.includes(time) ? time : "";

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = addAppointment(clientName, date, selectedTime);

    if (!result.ok) {
      setError(result.error);
      setSuccess(null);
      return;
    }

    setSuccess(
      `Agendado: ${result.appointment.clientName} em ${formatDateISOtoDisplay(date)} às ${selectedTime}.`
    );
    setError(null);
    setTime("");
    setClientName("");
    onBooked?.(date);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <DateField
        label="Data"
        value={date}
        min={getTodayISO()}
        onChange={(value) => {
          setDate(value);
          clearFeedback();
        }}
      />

      <PeriodTimeSelector
        label="Horários"
        availableTimes={availableTimes}
        selectedTime={selectedTime}
        onTimeSelect={(value) => {
          setTime(value);
          clearFeedback();
        }}
      />

      {date && availableTimes.length === 0 && (
        <p className="text-sm text-fg-muted">Não há horários disponíveis nesta data.</p>
      )}

      <ClientNameField
        label="Cliente"
        value={clientName}
        onChange={(value) => {
          setClientName(value);
          clearFeedback();
        }}
      />

      <FormMessage message={error} variant="error" />
      <FormMessage message={success} variant="success" />

      <button
        type="submit"
        className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold uppercase tracking-wide text-gray-900 transition hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
      >
        Agendar
      </button>
    </form>
  );
};
