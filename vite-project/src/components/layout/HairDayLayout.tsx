import { useState } from "react";
import { HairDayLogo } from "../brand/HairDayLogo";
import { BookingPanel } from "./BookingPanel";
import { Schedule } from "../schedule/Schedule";
import { getTodayISO } from "../../utils/date";

export const HairDayLayout: React.FC = () => {
  // Data exibida na agenda (independente da data escolhida no formulário)
  const [scheduleDate, setScheduleDate] = useState<string>(getTodayISO);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-3 md:p-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-[28rem] lg:shrink-0">
          <div className="flex items-center gap-3 px-2 pt-2">
            <HairDayLogo />
            <h1 className="text-2xl font-bold text-yellow-400">HairDay</h1>
          </div>
          {/* Ao agendar, a agenda passa a mostrar o dia do novo agendamento */}
          <BookingPanel onBooked={setScheduleDate} />
        </div>

        <Schedule selectedDate={scheduleDate} onDateChange={setScheduleDate} />
      </div>
    </div>
  );
};
