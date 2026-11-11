import { describe, expect, it } from "vitest";
import type { Appointment } from "../types/appointment";
import {
  createAppointment,
  getAllTimes,
  getAppointmentsByPeriod,
  getAvailableTimes,
  getPeriodByTime,
  hasTimeConflict,
  isValidClientName,
  normalizeClientName,
} from "./appointment";

const appt = (time: string, date = "2024-01-10", clientName = "Cliente"): Appointment => ({
  id: `${date}-${time}`,
  clientName,
  date,
  time,
});

// Um "agora" bem no passado para que nenhum horário seja filtrado por já ter passado
const PAST_NOW = new Date(2000, 0, 1);

describe("appointment utils", () => {
  it("getAllTimes lista os 13 horários em ordem", () => {
    const times = getAllTimes();
    expect(times).toHaveLength(13);
    expect(times[0]).toBe("09:00");
    expect(times.at(-1)).toBe("21:00");
  });

  it("getPeriodByTime", () => {
    expect(getPeriodByTime("09:00")).toBe("morning");
    expect(getPeriodByTime("12:00")).toBe("morning");
    expect(getPeriodByTime("13:00")).toBe("afternoon");
    expect(getPeriodByTime("21:00")).toBe("evening");
    expect(getPeriodByTime("08:00")).toBeNull();
  });

  it("getAvailableTimes remove horários ocupados apenas da mesma data", () => {
    const list = [appt("09:00"), appt("13:00"), appt("10:00", "2024-01-11")];
    const available = getAvailableTimes(list, "2024-01-10", PAST_NOW);
    expect(available).not.toContain("09:00");
    expect(available).not.toContain("13:00");
    expect(available).toContain("10:00");
    expect(available).toHaveLength(11);
  });

  it("getAvailableTimes remove horários que já passaram", () => {
    const now = new Date(2024, 0, 10, 14, 30);
    const available = getAvailableTimes([], "2024-01-10", now);
    expect(available[0]).toBe("15:00");
    expect(getAvailableTimes([], "2024-01-09", now)).toEqual([]);
    expect(getAvailableTimes([], "", now)).toEqual([]);
  });

  it("getAppointmentsByPeriod agrupa e ordena", () => {
    const list = [appt("21:00"), appt("11:00"), appt("09:00"), appt("14:00"), appt("09:00", "2024-01-11")];
    const grouped = getAppointmentsByPeriod(list, "2024-01-10");
    expect(grouped.morning.map((a) => a.time)).toEqual(["09:00", "11:00"]);
    expect(grouped.afternoon.map((a) => a.time)).toEqual(["14:00"]);
    expect(grouped.evening.map((a) => a.time)).toEqual(["21:00"]);
  });

  it("hasTimeConflict", () => {
    const list = [appt("09:00")];
    expect(hasTimeConflict(list, "2024-01-10", "09:00")).toBe(true);
    expect(hasTimeConflict(list, "2024-01-11", "09:00")).toBe(false);
  });

  it("validação e normalização do nome", () => {
    expect(normalizeClientName("  Ana   Maria  ")).toBe("Ana Maria");
    expect(isValidClientName("   ")).toBe(false);
    expect(isValidClientName("A")).toBe(false);
    expect(isValidClientName("Al")).toBe(true);
  });

  it("createAppointment gera id e normaliza o nome", () => {
    const a = createAppointment("  João  ", "2024-01-10", "10:00");
    expect(a.id).toBeTruthy();
    expect(a).toMatchObject({ clientName: "João", date: "2024-01-10", time: "10:00" });
  });
});
