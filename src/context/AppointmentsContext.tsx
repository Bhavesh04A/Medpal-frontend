import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 

type Appointment = {
  _id: string;
  doctor: string;
  date: string;
  reason: string;
  status?: string;
  doctorName?: string;
  clinicName?: string;
  time?: string;
};

type AppointmentsContextType = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  refreshAppointments: () => Promise<void>;
  addAppointment: (data: Omit<Appointment, "_id">) => Promise<void>;
  editAppointment: (id: string, data: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
};

const AppointmentsContext = createContext<AppointmentsContextType>({
  appointments: [],
  loading: false,
  error: null,
  refreshAppointments: async () => {},
  addAppointment: async () => {},
  editAppointment: async () => {},
  deleteAppointment: async () => {},
});

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function AppointmentsProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn, loading: authLoading } = useAuth(); 

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      refreshAppointments();
    }
    if (!authLoading && !isLoggedIn) {
      setAppointments([]);
    }
    // eslint-disable-next-line
  }, [isLoggedIn, authLoading]);

  const refreshAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("medpal_token");
      const res = await axios.get(`${API_BASE_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.appointments || res.data || []);
    } catch (err: any) {
      setError("Failed to load appointments");
      setAppointments([]);
    }
    setLoading(false);
  };

  const addAppointment = async (data: Omit<Appointment, "_id">) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("medpal_token");
      await axios.post(
        `${API_BASE_URL}/api/appointments`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshAppointments();
    } catch (err: any) {
      setError("Failed to add appointment");
    }
    setLoading(false);
  };

  const editAppointment = async (id: string, data: Partial<Appointment>) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("medpal_token");
      await axios.put(
        `${API_BASE_URL}/api/appointments/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshAppointments();
    } catch (err: any) {
      setError("Failed to edit appointment");
    }
    setLoading(false);
  };

  const deleteAppointment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("medpal_token");
      await axios.delete(
        `${API_BASE_URL}/api/appointments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshAppointments();
    } catch (err: any) {
      setError("Failed to delete appointment");
    }
    setLoading(false);
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        loading,
        error,
        refreshAppointments,
        addAppointment,
        editAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentsContext);
}
