import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentsContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Array of health tips
const healthTips = [
  "Stay hydrated! Drink at least 8 glasses of water a day.",
  "Take a short walk every hour to keep your body active.",
  "Wash your hands regularly to prevent infections.",
  "Eat a balanced diet rich in fruits and vegetables.",
  "Get at least 7-8 hours of sleep every night.",
  "Take deep breaths and manage stress with mindfulness.",
  "Don't skip breakfast – it fuels your day!",
  "Schedule regular health check-ups.",
  "Limit screen time to protect your eyes.",
  "Practice good posture to avoid back pain."
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut" as const,
      duration: 0.5
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "backOut" as const,
      duration: 0.5
    }
  },
  hover: {
    y: -5,
    transition: {
      ease: "easeOut" as const,
      duration: 0.2
    }
  }
} as const;

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { user, profileImgTs } = useAuth();
  const { appointments, loading, refreshAppointments } = useAppointments();
  const [healthTip, setHealthTip] = useState("");

  // Pick a random health tip on mount
  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setHealthTip(randomTip);
  }, []);

  // Get next upcoming appointment
  const nextAppointment = appointments
    .filter(a => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  // Recent activity (last 3 appointments)
  const recentActivities = appointments
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col"
    >
      <main className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
        {/* Welcome & Profile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center mb-8 w-full max-w-4xl"
        >
          <motion.div 
            variants={itemVariants}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src={
                user && user._id
                  ? `${API_BASE_URL}/api/profile/image/${user._id}?ts=${profileImgTs}`
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/default-avatar.png";
              }}
            />
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-200 transition-all duration-300"></div>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-800">
            Welcome back, <span className="text-blue-600">{user?.name || "User"}</span>!
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-600 mb-3 text-center">{user?.email}</motion.p>
          
          {user?.phone && (
            <motion.p variants={itemVariants} className="text-gray-500 mb-4 text-center">
              <span className="text-gray-600">Phone:</span> {user.phone}
            </motion.p>
          )}
          
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/profile"
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all hover:bg-blue-50 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </Link>
          </motion.div>
        </motion.div>
        {/* Health Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" as const }}
          className="bg-white border-l-4 border-blue-500 rounded-lg p-4 mb-8 w-full max-w-4xl text-left shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-start">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
              className="bg-blue-100 p-2 rounded-full mr-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <div>
              <h4 className="font-bold text-blue-700 mb-1">Daily Health Tip</h4>
              <p className="text-gray-700">{healthTip}</p>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Upcoming Appointment */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Upcoming Appointment</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 text-sm flex items-center transition-colors"
                  onClick={refreshAppointments}
                  title="Refresh appointments"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </motion.button>
              </div>
            </div>
            <div className="p-4">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center py-4"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
                    ></motion.div>
                  </motion.div>
                ) : nextAppointment ? (
                  <motion.div
                    key="appointment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animate-fade-in-up"
                  >
                    <div className="flex items-start">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="bg-green-100 p-2 rounded-full mr-3"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-700">
                          {nextAppointment.doctorName || nextAppointment.doctor}
                        </h4>
                        {nextAppointment.clinicName && (
                          <p className="text-gray-600 text-sm mb-1">
                            {nextAppointment.clinicName}
                          </p>
                        )}
                        <p className="text-gray-500 text-sm">
                          {new Date(nextAppointment.date).toLocaleDateString()} at{" "}
                          {new Date(nextAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            (nextAppointment.status || "Confirmed").toLowerCase() === "confirmed" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {nextAppointment.status || "Confirmed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-appointment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500 mb-2">No upcoming appointments</p>
                    <Link to="/appointments" className="text-blue-600 hover:underline font-medium">
                      Book now
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
              <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
            </div>
            <div className="p-4">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center py-4"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
                    ></motion.div>
                  </motion.div>
                ) : recentActivities.length > 0 ? (
                  <motion.ul 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-3"
                  >
                    {recentActivities.map((activity, idx) => (
                      <motion.li 
                        key={activity._id || idx}
                        variants={itemVariants}
                        className="bg-gray-50 rounded-lg p-3 hover:bg-blue-50 transition-colors duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-start">
                          <motion.div 
                            whileHover={{ rotate: 10 }}
                            className="bg-blue-100 p-2 rounded-full mr-3"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-800">Appointment</h4>
                              <span className="text-gray-500 text-xs">
                                {new Date(activity.date).toLocaleDateString()}{" "}
                                {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">
                              With {activity.doctorName || activity.doctor || "Doctor"}
                              {activity.clinicName ? ` at ${activity.clinicName}` : ""}
                            </p>
                            {activity.reason && (
                              <p className="text-gray-500 text-xs mt-1">
                                <span className="font-medium">Reason:</span> {activity.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.div
                    key="no-activity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500">No recent activity</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center mb-8 w-full max-w-4xl"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/chatbot" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Start Symptom Check
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/appointments" 
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/clinics" 
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Find Clinic
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}