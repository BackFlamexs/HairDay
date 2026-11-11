import { createContext } from "react";
import type { Appointment } from "../types/appointment";

export type AddAppointmentResult =
  | { ok: true; appointment: Appointment }
  | { ok: false; error: string };

export interface AppointmentsContextValue {
  appointments: Appointment[];
  addAppointment: (clientName: string, date: string, time: string) => AddAppointmentResult;
  removeAppointment: (id: string) => void;
}

export const AppointmentsContext = createContext<AppointmentsContextValue | null>(null);
