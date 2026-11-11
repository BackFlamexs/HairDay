import { HairDayLogo } from "../brand/HairDayLogo";
import { BookingPanel } from "./BookingPanel";
import { useAppointments } from "../../hooks/useAppointments";

export const HairDayLayout: React.FC = () => {
  const { appointments } = useAppointments();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center gap-3">
          <HairDayLogo />
          <h1 className="text-2xl font-bold text-yellow-400">HairDay</h1>
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row">
          <BookingPanel />

          <section className="w-full rounded-xl bg-gray-900 p-6">
            <h2 className="text-xl font-bold text-gray-100">Sua agenda</h2>
            <p className="text-sm text-gray-400">{appointments.length} agendamento(s)</p>
          </section>
        </div>
      </div>
    </div>
  );
};
