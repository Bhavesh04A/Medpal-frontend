import { motion, AnimatePresence } from "framer-motion";
import { useAppointments } from "../../context/AppointmentsContext";
import { toast } from "react-toastify";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, x: -50 }
};

export default function AppointmentList() {
  const { appointments, loading, deleteAppointment } = useAppointments();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await deleteAppointment(id);
      toast.success("Appointment cancelled successfully");
    } catch {
      toast.error("Failed to cancel appointment");
    }
  };

  if (loading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-500 text-center py-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block mr-2"
      >
        ⏳
      </motion.div>
      Loading appointments...
    </motion.div>
  );

  if (!appointments.length) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-500 text-center py-8 bg-white rounded-lg shadow"
    >
      No appointments found.
    </motion.div>
  );

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {appointments.map((app) => (
          <motion.div
            key={app._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center border border-gray-100"
          >
            <div className="space-y-2">
              <div className="font-semibold text-blue-800">{app.doctor}</div>
              <div className="text-sm text-gray-600">
                {new Date(app.date).toLocaleDateString()} •{" "}
                {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-gray-700 text-sm">{app.reason}</div>
              {app.status && (
                <motion.span 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200"
                >
                  {app.status}
                </motion.span>
              )}
            </div>
            <motion.button
              onClick={() => handleDelete(app._id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-200 border border-red-100"
            >
              Cancel
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}