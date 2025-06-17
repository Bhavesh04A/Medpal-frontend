import { motion } from "framer-motion";

export default function Careers() {
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
            Careers at MedPal
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
            Join our mission to transform healthcare through innovative technology.
          </motion.p>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="p-6 sm:p-8 lg:p-10 space-y-6"
        >
          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Open Positions</h2>
            <p className="text-gray-600 leading-relaxed">
              We're always looking for talented engineers, designers, and healthcare experts to join our team.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Current Openings</h2>
            <ul className="text-gray-600 leading-relaxed list-disc pl-5 space-y-2">
              <li>Senior Frontend Developer (React)</li>
              <li>Healthcare Data Analyst</li>
              <li>UX/UI Designer</li>
              <li>Medical Content Specialist</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Apply</h2>
            <p className="text-gray-600 leading-relaxed">
              Send your CV and portfolio to:
            </p>
            <a 
              href="mailto:careers@medpal.com" 
              className="text-blue-600 hover:underline font-medium"
            >
              careers@medpal.com
            </a>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              We review applications on a rolling basis and will contact qualified candidates.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}