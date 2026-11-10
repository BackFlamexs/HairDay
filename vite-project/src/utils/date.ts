import { PeriodId } from "../types/appointment";

/**
 * Formata uma data em formato ISO para exibição dd/MM/yyyy
 */
export function formatDateISOtoDisplay(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formata um horário HH:mm para exibição
 */
export function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m < 10 ? "0" : ""}${m} ${period}`;
}

/**
 * Verifica se duas datas são iguais (em formato ISO)
 */
export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

/**
 * Converte um horário string para minutos desde a meia-noite
 * Isso permite comparação e ordenação numérica
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Ordena horários em ordem crescente (lexicográfica de HH:mm funciona para 24h)
 */
export const sortTimes = (times: string[]): string[] =>
  times.sort();

/**
 * Verifica se um horário está dentro de um período
 */
export function isTimeInPeriod(time: string, period: PeriodId): boolean {
  const periods: Record<PeriodId, { start: string; end: string }> = {
    morning: { start: "09:00", end: "12:00" },
    afternoon: { start: "13:00", end: "18:00" },
    evening: { start: "19:00", end: "21:00" },
  };

  const p = periods[period];
  const timeMin = timeToMinutes(time);
  const startMin = timeToMinutes(p.start);
  const endMin = timeToMinutes(p.end);

  return timeMin >= startMin && timeMin <= endMin;
}