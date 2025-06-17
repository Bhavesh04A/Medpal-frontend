import { useState } from "react";
import { motion } from "framer-motion";
import { useAppointments } from "../../context/AppointmentsContext";
import { toast } from "react-toastify";

const inputVariants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
  }
};

export default function AppointmentForm() {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { addAppointment } = useAppointments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor.trim() || !date.trim() || !reason.trim()) return;
    
    setLoading(true);
    try {
      await addAppointment({ doctor, date, reason });
      toast.success("Appointment booked successfully!");
      setDoctor("");
      setDate("");
      setReason("");
    } catch (err) {
      toast.error("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100"
    >
      <motion.div
        whileFocus="focus"
        variants={inputVariants}
      >
        <input
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
          placeholder="Doctor's Name"
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200"
        />
      </motion.div>

      <motion.div
        whileFocus="focus"
        variants={inputVariants}
      >
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          type="datetime-local"
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200"
        />
      </motion.div>

      <motion.div
        whileFocus="focus"
        variants={inputVariants}
      >
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          placeholder="Reason for appointment"
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200"
        />
      </motion.div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          loading 
            ? "bg-blue-400 cursor-not-allowed" 
            : "bg-gradient-to-r from-blue-500 to-teal-500"
        } text-white shadow-md`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block mr-2"
            >
              ⏳
            </motion.span>
            Booking...
          </span>
        ) : (
          "Book Appointment"
        )}
      </motion.button>
    </motion.form>
  );
}