import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Chatbot from "../components/Chatbot/Chatbot";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut" as const,
      duration: 0.6
    }
  }
};

export default function ChatbotPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center py-8 px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl flex flex-col items-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800"
        >
          Symptom Checker
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-600 mb-8 text-center max-w-xl"
        >
          Describe your symptoms and get instant, AI-powered health guidance.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.5,
            ease: "backOut" as const
          }}
          className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <Chatbot />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
