import { motion, AnimatePresence } from "framer-motion";
import ClinicLocator from "../components/Clinics/ClinicLocator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
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

export default function ClinicsPage() {
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
        className="w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Find Clinics
          </h1>
          <p className="text-gray-600 mb-8 text-center max-w-xl mx-auto">
            Locate nearby clinics and healthcare centers quickly and easily.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <ClinicLocator />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ℹ️
            </motion.span>
            Search for specialized clinics using keywords like "dental" or "pediatrics"
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}