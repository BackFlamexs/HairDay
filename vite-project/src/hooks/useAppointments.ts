import { useState } from "react";
import { Appointment, PeriodId } from "../types/appointment";
import {
  getAvailableTimes,
  getAppointmentsByPeriod,
  getBookedTimes,
  createAppointment,
  isValidClientName,
  hasTimeConflict,
  getPeriodByTime,
  getPeriods,
} from "../utils/appointment";
import { formatDateISOtoDisplay, formatTimeDisplay } from "../utils/date";

// Dados demonstrativos (podem ser removidos depois)
const demonstrativeAppointments: Appointment[] = [
  { id: "1", clientName: "Ryan Dorwart", date: "2024-01-10", time: "11:00" },
  { id: "2", clientName: "Livia Curtis", date: "2024-01-10", time: "13:00" },
  { id: "3", clientName: "Randy Calzoni", date: "2024-01-10", time: "14:00" },
  { id: "4", clientName: "Marley Franci", date: "2024-01-10", time: "16:00" },
  { id: "5", clientName: "Jaylon Korsgaard", date: "2024-01-10", time: "17:00" },
  { id: "6", clientName: "Maria Herwitz", date: "2024-01-10", time: "21:00" },
];

export const useAppointments = () => {
  // Estado: começar com array vazio para estado limpo
  // Os dados demonstrativos podem ser desserializados se necessário
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Estado do formulário
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [formTime, setFormTime] = useState<string>("");
  const [formClientName, setFormClientName] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Carregar dados demonstrativos (comentar/remover se não desejado)
  // appointments = demonstrativeAppointments;

  const availableTimes = getAvailableTimes(appointments, formDate);

  const appointmentsByPeriod = getAppointmentsByPeriod(appointments, formDate);

  const handleSubmit = () => {
    // Validar campos
    if (!formClientName.trim()) {
      return false;
    }

    if (!formDate) {
      return false;
    }

    if (!formTime) {
      return false;
    }

    // Verificar conflito de horário
    if (hasTimeConflict(appointments, formDate, formTime)) {
      return false;
    }

    // Criar novo agendamento
    const newAppointment = createAppointment(formClientName, formDate, formTime);

    // Atualizar estado de forma imutável
    setAppointments((prev) => [...prev, newAppointment]);

    // Limpar formulário
    setFormClientName("");
    setFormTime("");
    setSelectedTime("");

    return true;
  };

  const handleDateChange = (date: string) => {
    setFormDate(date);
    // Recalcular horários disponíveis quando a data muda
    // O selectedTime será recalculado baseado na nova disponibilidade
  };

  const handleTimeSelect = (time: string) => {
    setFormTime(time);
    setSelectedTime(time);
    setFormClientName("");
  };

  const handleClientNameChange = (name: string) => {
    setFormClientName(name);
  };

  const deleteAppointment = (id: string, date: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    // O horário é liberado automaticamente ao remover do array
  };

  return {
    // Estado
    appointments,
    formDate,
    formTime,
    formClientName,
    selectedTime,
    availableTimes,
    appointmentsByPeriod,

    // Actions
    setFormDate,
    setFormTime,
    setFormClientName,
    handleSubmit,
    handleDateChange,
    handleTimeSelect,
    handleClientNameChange,
    deleteAppointment,

    // Utils
    getPeriods,
    getPeriodByTime,
    formatDateISOtoDisplay,
    formatTimeDisplay,
  };
};