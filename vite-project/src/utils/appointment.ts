import type { Appointment, AppointmentsByPeriod, Period, PeriodId } from "../types/appointment";
import { isPastDateTime, sortTimes } from "./date";

/** Fonte única da verdade dos períodos e seus horários */
export const PERIODS: readonly Period[] = [
  {
    id: "morning",
    label: "Manhã",
    startLabel: "09h",
    endLabel: "12h",
    times: ["09:00", "10:00", "11:00", "12:00"],
  },
  {
    id: "afternoon",
    label: "Tarde",
    startLabel: "13h",
    endLabel: "18h",
    times: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  {
    id: "evening",
    label: "Noite",
    startLabel: "19h",
    endLabel: "21h",
    times: ["19:00", "20:00", "21:00"],
  },
];

export const getPeriods = (): readonly Period[] => PERIODS;

export const getPeriodById = (id: PeriodId): Period => {
  const period = PERIODS.find((p) => p.id === id);
  if (!period) throw new Error(`Período desconhecido: ${id}`);
  return period;
};

/** Determina a qual período um horário pertence */
export const getPeriodByTime = (time: string): PeriodId | null =>
  PERIODS.find((p) => p.times.includes(time))?.id ?? null;

/** Todos os horários de atendimento do dia, em ordem */
export const getAllTimes = (): string[] => sortTimes(PERIODS.flatMap((p) => p.times));

/** Horários já ocupados em uma data */
export const getBookedTimes = (appointments: readonly Appointment[], date: string): string[] =>
  appointments.filter((a) => a.date === date).map((a) => a.time);

/**
 * Horários disponíveis para uma data: remove os já agendados
 * e os que já passaram (quando `now` é informado).
 */
export const getAvailableTimes = (
  appointments: readonly Appointment[],
  date: string,
  now: Date = new Date()
): string[] => {
  if (!date) return [];
  const booked = new Set(getBookedTimes(appointments, date));
  return getAllTimes().filter((t) => !booked.has(t) && !isPastDateTime(date, t, now));
};

/** Agendamentos de uma data agrupados por período e ordenados por horário */
export const getAppointmentsByPeriod = (
  appointments: readonly Appointment[],
  date: string
): AppointmentsByPeriod => {
  const result: AppointmentsByPeriod = { morning: [], afternoon: [], evening: [] };

  appointments
    .filter((a) => a.date === date)
    .forEach((a) => {
      const period = getPeriodByTime(a.time);
      if (period) result[period].push(a);
    });

  for (const id of Object.keys(result) as PeriodId[]) {
    result[id].sort((a, b) => a.time.localeCompare(b.time));
  }

  return result;
};

/** Cria um novo agendamento com ID único */
export const createAppointment = (clientName: string, date: string, time: string): Appointment => ({
  id: crypto.randomUUID(),
  clientName: normalizeClientName(clientName),
  date,
  time,
});

/** Remove espaços extras do nome */
export const normalizeClientName = (name: string): string => name.trim().replace(/\s+/g, " ");

/** Nome válido: ao menos 2 caracteres após normalização */
export const isValidClientName = (name: string): boolean => normalizeClientName(name).length >= 2;

/** Verifica se já existe agendamento na data/horário */
export const hasTimeConflict = (
  appointments: readonly Appointment[],
  date: string,
  time: string
): boolean => appointments.some((a) => a.date === date && a.time === time);
