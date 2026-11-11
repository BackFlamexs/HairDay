import { AppointmentsProvider } from "./context/AppointmentsProvider";
import { HairDayLayout } from "./components/layout/HairDayLayout";

export default function App() {
  return (
    <AppointmentsProvider>
      <HairDayLayout />
    </AppointmentsProvider>
  );
}
