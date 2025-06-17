import { motion } from "framer-motion";
import AppointmentForm from "../components/Appointments/AppointmentForm";
import AppointmentList from "../components/Appointments/AppointmentList";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function AppointmentsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col items-center py-12 px-4 sm:px-6"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 px-4 py-6 text-center"
        >
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            Manage Appointments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg"
          >
            Book new appointments or manage existing ones
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <div className="p-6 md:p-8 space-y-10">
          {/* New Appointment Section */}
          <motion.section 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-300 ease-in-out"
          >
            <motion.h2 
              whileHover={{ x: 5 }}
              className="text-2xl font-semibold mb-6 text-gray-800 flex items-center"
            >
              <span className="mr-2">📅</span>
              New Appointment
            </motion.h2>
            <AppointmentForm />
          </motion.section>

          {/* Existing Appointments Section */}
          <motion.section 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-300 ease-in-out"
          >
            <motion.h2 
              whileHover={{ x: 5 }}
              className="text-2xl font-semibold mb-6 text-gray-800 flex items-center"
            >
              <span className="mr-2">🗓️</span>
              Your Appointments
            </motion.h2>
            <AppointmentList />
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
}