import { useAppointments } from "../../hooks/useAppointments";
import { DateField } from "./DateField";
import { PeriodTimeSelector } from "./PeriodTimeSelector";
import { ClientNameField } from "./ClientNameField";
import { FormMessage } from "../ui/FormMessage";
import { RiCalendarLine } from "react-icons/ri";
import { BiBook } from "react-icons/bi";

export const AppointmentForm: React.FC = () => {
  const {
    formDate,
    formTime,
    formClientName,
    availableTimes,
    handleSubmit,
    handleDateChange,
    handleTimeSelect,
    handleClientNameChange,
  } = useAppointments();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const success = handleSubmit();
        if (!success) {
          // Feedback já é mostrado dentro do formulário
        }
      }}
    >
      {/* Seletor de data */}
      <DateField
        label="Data"
        value={formDate}
        onChange={handleDateChange}
        placeholder="Selecionar data"
      />

      {/* Seletor de horário por período */}
      <PeriodTimeSelector
        label="Horários"
        availableTimes={availableTimes}
        selectedTime={formTime}
        onTimeSelect={handleTimeSelect}
      />

      {/* Campo do nome do cliente */}
      <ClientNameField
        label="Cliente"
        value={formClientName}
        onChange={handleClientNameChange}
        placeholder="Nome do cliente"
      />

      {/* Mensagem de validação */}
      <FormMessage
        isError={!(
          formClientName.trim() &&
          formDate &&
          formTime &&
          availableTimes.includes(formTime)
        )}
        message="Preencha todos os campos com informações válidas"
      />

      {/* Botão de agendar */}
      <button
        type="submit"
        disabled={
          !formClientName.trim() ||
          !formDate ||
          !formTime ||
          !availableTimes.includes(formTime)
        }
        className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-bold text-xs uppercase hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
      >
        AGENDAR
      </button>
    </form>
  );
};