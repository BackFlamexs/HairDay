export interface Appointment {
  id: string;
  clientName: string;
  date: string; // Formato ISO: YYYY-MM-DD
  time: string; // Formato HH:mm, 24 horas
}

export type PeriodId = "morning" | "afternoon" | "evening";

export interface Period {
  id: PeriodId;
  label: "Manhã" | "Tarde" | "Noite";
  startTime: string;
  endTime: string;
  times: string[];
}