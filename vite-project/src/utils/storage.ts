import type { Appointment } from "../types/appointment";

export const STORAGE_KEY = "hairday:appointments";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

/** Garante que um valor desconhecido (vindo do storage) é um Appointment válido */
export const isAppointment = (value: unknown): value is Appointment => {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.clientName === "string" &&
    typeof v.date === "string" &&
    DATE_RE.test(v.date) &&
    typeof v.time === "string" &&
    TIME_RE.test(v.time)
  );
};

/** Converte o texto salvo em uma lista de agendamentos, ignorando itens inválidos */
export const parseAppointments = (raw: string | null): Appointment[] => {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isAppointment) : [];
  } catch {
    return [];
  }
};

export const loadAppointments = (): Appointment[] => {
  try {
    return parseAppointments(localStorage.getItem(STORAGE_KEY));
  } catch {
    // localStorage indisponível (modo privado, bloqueado etc.)
    return [];
  }
};

export const saveAppointments = (appointments: Appointment[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch {
    // Sem persistência; o app continua funcionando em memória
  }
};
