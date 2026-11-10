import { Appointment, PeriodId, Period } from "../types/appointment";
import { formatDateISOtoDisplay, formatTimeDisplay, isSameDay, sortTimes, timeToMinutes } from "./date";

// Horários fixos por período
const PERIOD_SCHEDULES: Record<PeriodId, string[]> = {
  morning: ["09:00", "10:00", "11:00", "12:00"],
  afternoon: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  evening: ["19:00", "20:00", "21:00"],
};

// Intervalo de cada período em formato texto
const PERIOD_LABELS: Record<PeriodId, { start: string; end: string }> = {
  morning: { start: "09h", end: "12h" },
  afternoon: { start: "13h", end: "18h" },
  evening: { start: "19h", end: "21h" },
};

/**
 * Obtém todos os períodos disponíveis
 */
export const getPeriods = (): Period[] => {
  return (Object.keys(PERIOD_SCHEDULES) as PeriodId[]).map((id) => ({
    id,
    label: PERIOD_LABELS[id].start === "09h" ? "Manhã" : PERIOD_LABELS[id].start === "13h" ? "Tarde" : "Noite",
    startTime: PERIOD_LABELS[id].start,
    endTime: PERIOD_LABELS[id].end,
    times: PERIOD_SCHEDULES[id],
  }));
};

/**
 * Obtém um período pelo ID
 */
export const getPeriodById = (id: PeriodId): Period => {
  return getPeriods().find((p) => p.id === id)!;
};

/**
 * Calcula os horários disponíveis para uma data específica
 * Remove os horários que já possuem agendamento
 */
export const getAvailableTimes = (
  appointments: Appointment[],
  date: string,
  periodId?: PeriodId
): string[] => {
  const allTimes = periodId
    ? getPeriodById(periodId).times
    : sortTimes(
        Object.values(PERIOD_SCHEDULES).reduce(
          (acc, times) => acc.concat(times),
          []
        )
      );

  const bookedTimes = appointments
    .filter((a) => isSameDay(a.date, date))
    .map((a) => a.time);

  return sortTimes(allTimes.filter((t) => !bookedTimes.includes(t)));
};

/**
 * Obtém os agendamentos agrupados por período para uma data específica
 */
export const getAppointmentsByPeriod = (
  appointments: Appointment[],
  date: string
): Record<PeriodId, Appointment[]> => {
  const periods = getPeriods();
  // Inicializa o resultado com todos os períodos vazios
  const result: Record<string, Appointment[]> = {
    morning: [],
    afternoon: [],
    evening: [],
  };

  // Agrupa os agendamentos por período
  appointments
    .filter((a) => isSameDay(a.date, date))
    .forEach((a) => {
      const period = getPeriodByTime(a.time);
      if (period) {
        (result as any)[period].push(a);
      }
    });

  // Reorder the result to match the PeriodId type
  const finalResult: Record<PeriodId, Appointment[]> = {
    morning: result.morning,
    afternoon: result.afternoon,
    evening: result.evening,
  };

  return finalResult;
};

/**
 * Determina qual período um horário pertence
 */
export const getPeriodByTime = (time: string): PeriodId | null => {
  if (timeToMinutes(time) >= timeToMinutes("09:00") && timeToMinutes(time) <= timeToMinutes("12:00"))
    return "morning";
  if (timeToMinutes(time) >= timeToMinutes("13:00") && timeToMinutes(time) <= timeToMinutes("18:00"))
    return "afternoon";
  if (timeToMinutes(time) >= timeToMinutes("19:00") && timeToMinutes(time) <= timeToMinutes("21:00"))
    return "evening";
  return null;
};

/**
 * Obtém os horários já ocupados para uma data
 */
export const getBookedTimes = (appointments: Appointment[], date: string): string[] => {
  return appointments
    .filter((a) => isSameDay(a.date, date))
    .map((a) => a.time);
};

/**
 * Cria um novo agendamento com ID único
 */
export const createAppointment = (
  clientName: string,
  date: string,
  time: string
): Appointment => {
  const id = crypto.randomUUID();
  return { id, clientName: clientName.trim(), date, time };
};

/**
 * Verifica se o nome do cliente é válido (não vazio após trim)
 */
export const isValidClientName = (name: string): boolean => {
  return name.trim().length > 0;
};

/**
 * Verifica se há conflitos de horário para uma data
 */
export const hasTimeConflict = (
  appointments: Appointment[],
  date: string,
  time: string
): boolean => {
  return appointments.some((a) => isSameDay(a.date, date) && a.time === time);
};