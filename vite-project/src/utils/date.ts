/**
 * Utilitários de data/hora.
 *
 * Todas as datas da aplicação usam o formato ISO "YYYY-MM-DD" no fuso LOCAL.
 * Evitamos `toISOString()` e `new Date("YYYY-MM-DD")` porque ambos usam UTC,
 * o que no Brasil (UTC-3) faz a data "pular" um dia à noite.
 */

const pad = (value: number): string => String(value).padStart(2, "0");

/** Converte um Date para "YYYY-MM-DD" usando o fuso local */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Data de hoje no formato "YYYY-MM-DD" (fuso local) */
export function getTodayISO(): string {
  return toISODate(new Date());
}

/** Converte "YYYY-MM-DD" em um Date local (meia-noite local) */
export function parseISODate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Formata "YYYY-MM-DD" para exibição "dd/MM/yyyy" */
export function formatDateISOtoDisplay(date: string): string {
  if (!date) return "";
  return parseISODate(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Converte "HH:mm" em minutos desde a meia-noite */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** Ordena horários "HH:mm" em ordem crescente sem alterar o array original */
export function sortTimes(times: readonly string[]): string[] {
  return [...times].sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
}

/** Indica se a data/hora informada já passou em relação a `now` */
export function isPastDateTime(date: string, time: string, now: Date = new Date()): boolean {
  const [hours, minutes] = time.split(":").map(Number);
  const target = parseISODate(date);
  target.setHours(hours, minutes, 0, 0);
  return target.getTime() <= now.getTime();
}

/** Indica se a data é anterior a hoje */
export function isPastDate(date: string, now: Date = new Date()): boolean {
  return date < toISODate(now);
}
