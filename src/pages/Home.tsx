import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Dummy testimonials data
const testimonials = [
  {
    name: "Amit Sharma",
    text: "MedPal helped me understand my symptoms and book a doctor in minutes. Highly recommended!",
    avatar: "🧑‍⚕️",
  },
  {
    name: "Priya Verma",
    text: "The AI symptom checker is super easy and accurate. I feel more confident about my health.",
    avatar: "👩‍⚕️",
  },
  {
    name: "Rohit Singh",
    text: "Great experience! The clinic locator saved me a lot of time.",
    avatar: "🧑‍💼",
  },
];

const featureCards = [
  {
    icon: "🤖",
    title: "AI Symptom Checker",
    desc: "Describe your symptoms and get instant, reliable health tips powered by advanced AI.",
    accent: "border-blue-400",
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    icon: "📅",
    title: "Book Appointments",
    desc: "Find doctors and schedule appointments with just a few clicks, anytime.",
    accent: "border-green-400",
    iconBg: "bg-green-100 text-green-700",
  },
  {
    icon: "🏥",
    title: "Find Clinics",
    desc: "Locate nearby clinics and healthcare centers quickly and easily.",
    accent: "border-teal-300",
    iconBg: "bg-teal-100 text-teal-700",
  },
  {
    icon: "💡",
    title: "About MedPal",
    desc: "MedPal is your trusted digital health companion, making healthcare accessible, reliable, and user-friendly for everyone.",
    accent: "border-gray-300",
    iconBg: "bg-gray-100 text-gray-700",
  },
];

const TrustBadge = ({ emoji, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-4 hover:bg-blue-50 rounded-xl transition-all"
    >
      <motion.span 
        className="text-4xl mb-3"
        animate={inView ? { 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {emoji}
      </motion.span>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const controlsRef = useRef();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("medpal_token"));
  }, []);

  const showPrev = () =>
    setTestimonialIdx((idx) => (idx === 0 ? testimonials.length - 1 : idx - 1));
  const showNext = () =>
    setTestimonialIdx((idx) => (idx === testimonials.length - 1 ? 0 : idx + 1));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"
            >
              Your AI-powered Health Companion
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
            >
              Instantly check symptoms, get trusted health guidance, and connect with doctors—all in one place.
            </motion.p>
            
            {!isLoggedIn && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
              >
                <Link
                  to="/login"
                  className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Create Account
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Healthcare Made Simple
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto"
          ></motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`
                bg-white border-t-4 ${card.accent} rounded-xl shadow-lg p-6 flex flex-col items-center
                transform transition-all duration-300 hover:shadow-xl cursor-pointer
              `}
            >
              <motion.span 
                className={`text-4xl mb-4 rounded-full p-3 ${card.iconBg} shadow-inner`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {card.icon}
              </motion.span>
              <h3 className="font-bold text-xl mb-3 text-gray-800 text-center">
                {card.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Don't just take our word for it - hear from our community
            </p>
          </motion.div>

          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col items-center border border-blue-50">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
              viewport={{ once: true }}
              className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow"
            >
              <span className="text-3xl">⭐</span>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <span className="text-5xl mb-4">{testimonials[testimonialIdx].avatar}</span>
                <blockquote className="text-xl text-center text-gray-700 mb-6 leading-relaxed">
                  &quot;{testimonials[testimonialIdx].text}&quot;
                </blockquote>
                <cite className="font-semibold text-lg text-blue-600 not-italic">
                  {testimonials[testimonialIdx].name}
                </cite>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setTestimonialIdx(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all ${idx === testimonialIdx ? 'bg-blue-600 w-6' : 'bg-blue-200'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            
            <div className="flex justify-between w-full mt-6">
              <motion.button
                aria-label="Previous testimonial"
                onClick={showPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-blue-50 hover:bg-blue-100 p-3 transition-all hover:shadow"
              >
                <span className="text-xl text-blue-600">←</span>
              </motion.button>
              <motion.button
                aria-label="Next testimonial"
                onClick={showNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-blue-50 hover:bg-blue-100 p-3 transition-all hover:shadow"
              >
                <span className="text-xl text-blue-600">→</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100"
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <TrustBadge 
              emoji="🔒" 
              title="Secure & Private" 
              description="Your health data is always protected" 
            />
            <TrustBadge 
              emoji="✅" 
              title="Compliant" 
              description="HIPAA & GDPR compliant" 
            />
            <TrustBadge 
              emoji="👨‍⚕️" 
              title="Expert Verified" 
              description="Qualified doctors & experts" 
            />
            <TrustBadge 
              emoji="🌟" 
              title="Trusted" 
              description="By 10,000+ users" 
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}