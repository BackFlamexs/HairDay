import { HairDayLogo } from "../brand/HairDayLogo";
import { BookingPanel } from "./BookingPanel";
import { useAppointments } from "../../hooks/useAppointments";
import { formatDateISOtoDisplay } from "../../utils/date";

export const HairDayLayout: React.FC = () => {
  const {
    appointments,
    formDate,
    formTime,
    formClientName,
    availableTimes,
    appointmentsByPeriod,
    handleSubmit,
    handleDateChange,
    handleTimeSelect,
    handleClientNameChange,
    deleteAppointment,
    getPeriods,
    getPeriodByTime,
  } = useAppointments();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Logo e título no topo */}
          <div className="flex items-center gap-3">
            <HairDayLogo />
            <h1 className="text-2xl font-bold text-yellow-400">HairDay</h1>
          </div>

          {/* Informação da data no topo direito */}
          <div className="ml-auto text-sm text-gray-400">
            Data: {formatDateISOtoDisplay(formDate)}
          </div>
        </div>

        {/* Painel de agendamento (esquerda) e Agenda (direita) */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <BookingPanel
            formDate={formDate}
            formTime={formTime}
            formClientName={formClientName}
            availableTimes={availableTimes}
            handleSubmit={handleSubmit}
            handleDateChange={handleDateChange}
            handleTimeSelect={handleTimeSelect}
            handleClientNameChange={handleClientNameChange}
          />

          <div className="w-full md:w-80 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-2">Sua agenda</h2>
            <p className="text-gray-400 text-sm">Consulte os seus cortes de cabelo agendados por dia</p>
            <div className="grid grid-cols-3 gap-4">
              {getPeriods().map((period) => (
                <div
                  key={period.id}
                  className="border rounded-lg p-4 bg-gray-700"
                >
                  <span className="font-medium text-gray-300 text-xs block mb-1">
                    {period.label}{" "}
                    {period.startTime}-{period.endTime}
                  </span>
                  {/* Agendamentos do período seriam renderizados aqui */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};