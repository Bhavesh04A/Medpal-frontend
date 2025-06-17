import { motion } from "framer-motion";

export default function Privacy() {
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
        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Privacy Policy
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="block w-16 h-1.5 bg-blue-600 mt-3 rounded-full"
            ></motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            We respect your privacy. This policy explains how we collect, use, and protect your personal information.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="p-6 sm:p-8 lg:p-10 space-y-6"
        >
          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information Collection</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information you provide directly, including name, email, and health data when you use our services.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Data Usage</h2>
            <p className="text-gray-600 leading-relaxed">
              Your information is used to provide and improve our services, communicate with you, and ensure platform security.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Data Protection</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures including encryption and access controls to protect your data.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You may access, correct, or delete your personal information through your account settings or by contacting us.
            </p>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}