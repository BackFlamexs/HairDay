import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Appointment } from "../types/appointment";
import { createAppointment, hasTimeConflict, isValidClientName } from "../utils/appointment";
import { isPastDateTime } from "../utils/date";
import {
  STORAGE_KEY,
  loadAppointments,
  parseAppointments,
  saveAppointments,
} from "../utils/storage";
import { AppointmentsContext, type AddAppointmentResult } from "./appointmentsContext";

type AppointmentsProviderProps = {
  children: ReactNode;
  /** Quando informado, ignora o localStorage e não persiste (útil para testes) */
  initialAppointments?: Appointment[];
};

export const AppointmentsProvider: React.FC<AppointmentsProviderProps> = ({
  children,
  initialAppointments,
}) => {
  const persist = initialAppointments === undefined;
  const [appointments, setAppointments] = useState<Appointment[]>(
    () => initialAppointments ?? loadAppointments()
  );

  // Salva a cada alteração
  useEffect(() => {
    if (persist) saveAppointments(appointments);
  }, [appointments, persist]);

  // Mantém várias abas sincronizadas
  useEffect(() => {
    if (!persist) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setAppointments(parseAppointments(event.newValue));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [persist]);

  const addAppointment = useCallback(
    (clientName: string, date: string, time: string): AddAppointmentResult => {
      if (!isValidClientName(clientName)) {
        return { ok: false, error: "Informe o nome do cliente (mínimo de 2 caracteres)." };
      }
      if (!date) {
        return { ok: false, error: "Selecione uma data." };
      }
      if (!time) {
        return { ok: false, error: "Selecione um horário." };
      }
      if (isPastDateTime(date, time)) {
        return { ok: false, error: "Não é possível agendar em um horário que já passou." };
      }
      if (hasTimeConflict(appointments, date, time)) {
        return { ok: false, error: "Este horário já está ocupado." };
      }

      const appointment = createAppointment(clientName, date, time);
      setAppointments((prev) => [...prev, appointment]);
      return { ok: true, appointment };
    },
    [appointments]
  );

  const removeAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = useMemo(
    () => ({ appointments, addAppointment, removeAppointment }),
    [appointments, addAppointment, removeAppointment]
  );

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>;
};
