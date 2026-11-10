import { AppointmentForm } from "../booking/AppointmentForm";
import { ScheduleDatePicker } from "../schedule/ScheduleDatePicker";

type BookingPanelProps = {
  formDate: string;
  formTime: string;
  formClientName: string;
  availableTimes: string[];
  handleSubmit: () => boolean;
  handleDateChange: (date: string) => void;
  handleTimeSelect: (time: string) => void;
  handleClientNameChange: (name: string) => void;
};

export const BookingPanel: React.FC<BookingPanelProps> = ({
  formDate,
  formTime,
  formClientName,
  availableTimes,
  handleSubmit,
  handleDateChange,
  handleTimeSelect,
  handleClientNameChange,
}) => {
  return (
    <aside className="w-full md:w-80 bg-gray-800 rounded-lg p-6">
      <AppointmentForm />

      <ScheduleDatePicker />
    </aside>
  );
};