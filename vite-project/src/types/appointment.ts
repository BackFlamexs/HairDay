export interface Appointment {
  id: string;
  clientName: string;
  /** Formato ISO local: YYYY-MM-DD */
  date: string;
  /** Formato HH:mm, 24 horas */
  time: string;
}

export type PeriodId = "morning" | "afternoon" | "evening";

export interface Period {
  id: PeriodId;
  label: "Manhã" | "Tarde" | "Noite";
  /** Rótulo de início, ex.: "09h" */
  startLabel: string;
  /** Rótulo de fim, ex.: "12h" */
  endLabel: string;
  /** Horários disponíveis para agendamento no período */
  times: string[];
}

export type AppointmentsByPeriod = Record<PeriodId, Appointment[]>;
