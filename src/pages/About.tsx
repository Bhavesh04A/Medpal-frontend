import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd } from "react-icons/fa";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Header with gradient (now with badges) */}
        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            About <span className="text-blue-600">MedPal</span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="block w-16 h-1.5 bg-blue-600 mt-3 rounded-full"
            />
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-4"
          >
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
              <FaHeartbeat className="mr-2" />
              AI Health Companion
            </div>
            <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-indigo-800">
              <FaUserMd className="mr-2" />
              Healthcare Experts
            </div>
          </motion.div>
        </div>

        {/* Content section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="p-6 sm:p-8 lg:p-10"
        >
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              MedPal is your trusted AI-powered health companion, dedicated to making healthcare accessible, reliable, and user-friendly. Our mission is to empower you to take charge of your health with instant symptom checks, seamless appointment bookings, and expert guidance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Built by a passionate team of technologists and healthcare professionals, MedPal combines cutting-edge AI with a human touch.
            </p>
          </div>

          {/* Animated divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 my-8 rounded-full"
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200"
        >
          <p className="text-sm text-gray-500">
            Trusted by thousands of users worldwide
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}