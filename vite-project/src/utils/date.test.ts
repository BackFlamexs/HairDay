import { describe, expect, it } from "vitest";
import {
  formatDateISOtoDisplay,
  isPastDate,
  isPastDateTime,
  parseISODate,
  sortTimes,
  timeToMinutes,
  toISODate,
} from "./date";

describe("date utils", () => {
  it("toISODate usa o fuso local (sem deslocar o dia)", () => {
    // 23:30 local continua sendo o mesmo dia
    expect(toISODate(new Date(2024, 0, 10, 23, 30))).toBe("2024-01-10");
    expect(toISODate(new Date(2024, 8, 5))).toBe("2024-09-05");
  });

  it("parseISODate cria a data à meia-noite local", () => {
    const d = parseISODate("2024-01-10");
    expect([d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()]).toEqual([2024, 0, 10, 0]);
  });

  it("formatDateISOtoDisplay formata dd/MM/yyyy sem perder um dia", () => {
    expect(formatDateISOtoDisplay("2024-01-10")).toBe("10/01/2024");
    expect(formatDateISOtoDisplay("")).toBe("");
  });

  it("timeToMinutes e sortTimes", () => {
    expect(timeToMinutes("09:30")).toBe(570);
    const input = ["13:00", "09:00", "21:00", "10:00"];
    expect(sortTimes(input)).toEqual(["09:00", "10:00", "13:00", "21:00"]);
    expect(input).toEqual(["13:00", "09:00", "21:00", "10:00"]); // não muta
  });

  it("isPastDateTime / isPastDate", () => {
    const now = new Date(2024, 0, 10, 14, 30);
    expect(isPastDateTime("2024-01-10", "14:00", now)).toBe(true);
    expect(isPastDateTime("2024-01-10", "15:00", now)).toBe(false);
    expect(isPastDateTime("2024-01-09", "21:00", now)).toBe(true);
    expect(isPastDate("2024-01-09", now)).toBe(true);
    expect(isPastDate("2024-01-10", now)).toBe(false);
  });
});
