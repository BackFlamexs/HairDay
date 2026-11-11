import { describe, expect, it } from "vitest";
import { isAppointment, parseAppointments } from "./storage";

describe("storage utils", () => {
  const valid = { id: "1", clientName: "Ana", date: "2024-01-10", time: "09:00" };

  it("isAppointment valida o formato", () => {
    expect(isAppointment(valid)).toBe(true);
    expect(isAppointment({ ...valid, date: "10/01/2024" })).toBe(false);
    expect(isAppointment({ ...valid, time: 9 })).toBe(false);
    expect(isAppointment(null)).toBe(false);
  });

  it("parseAppointments ignora dados inválidos", () => {
    expect(parseAppointments(null)).toEqual([]);
    expect(parseAppointments("not json")).toEqual([]);
    expect(parseAppointments('{"a":1}')).toEqual([]);
    expect(parseAppointments(JSON.stringify([valid, { foo: 1 }]))).toEqual([valid]);
  });
});
