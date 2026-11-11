import { useContext } from "react";
import { AppointmentsContext, type AppointmentsContextValue } from "../context/appointmentsContext";

/**
 * Acessa o estado global de agendamentos.
 * Precisa estar dentro de <AppointmentsProvider>.
 */
export const useAppointments = (): AppointmentsContextValue => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments deve ser usado dentro de <AppointmentsProvider>.");
  }
  return context;
};
