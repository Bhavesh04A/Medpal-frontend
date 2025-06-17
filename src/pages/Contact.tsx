import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

export default function Contact() {
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
        {/* Header Section */}
        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Contact Us
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
            We'd love to hear from you! Reach out for support, feedback, or partnership inquiries.
          </motion.p>
        </div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="p-6 sm:p-8 lg:p-10 space-y-8"
        >
          <div className="prose prose-blue max-w-none">
            {/* Email Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <FiMail className="text-blue-500 mr-2" />
                Email Support
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:support@medpal.com" 
                className="text-blue-600 hover:underline"
              >
                support@medpal.com
              </a>
            </div>

            {/* Phone Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <FiPhone className="text-blue-500 mr-2" />
                Phone Support
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Call us during business hours (9AM-5PM, Mon-Fri).
              </p>
              <a 
                href="tel:+911234567890" 
                className="text-blue-600 hover:underline"
              >
                +91 12345 67890
              </a>
            </div>

            {/* In-App Support */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <FiMessageSquare className="text-blue-500 mr-2" />
                In-App Support
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For quickest response, use our in-app support chat available 24/7.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              We typically respond within 1 business day. For urgent matters, please call us directly.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}