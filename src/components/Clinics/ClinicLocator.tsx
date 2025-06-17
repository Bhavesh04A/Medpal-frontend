import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaSearchLocation, FaSpinner } from "react-icons/fa";


const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ClinicLocator() {
  const [query, setQuery] = useState("");
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSuggestions([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length === 0) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/clinics/search?q=${encodeURIComponent(value)}`
        );
        setSuggestions(Array.isArray(res.data) ? res.data.slice(0, 5) : []);
      } catch {
        setSuggestions([]);
      }
    }, 250);
  };

  const searchClinics = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setShowSuggestions(false);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/clinics/search?q=${encodeURIComponent(query)}`
      );
      setClinics(Array.isArray(res.data) ? res.data : []);
      if (Array.isArray(res.data) && res.data.length === 0)
        toast.info("No clinics found for this search.");
    } catch {
      toast.error("Failed to search clinics");
      setClinics([]);
    }
    setLoading(false);
  };

  const handleSuggestionClick = (clinic) => {
    setQuery(clinic.name);
    setShowSuggestions(false);
    searchClinics();
  };

  const findNearby = () => {
    if (!navigator.geolocation) {
      toast.info("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setShowSuggestions(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/clinics/nearby?lat=${latitude}&lng=${longitude}`
          );
          setClinics(Array.isArray(res.data) ? res.data : []);
          if (Array.isArray(res.data) && res.data.length === 0)
            toast.info("No clinics found nearby.");
        } catch {
          toast.error("Failed to find nearby clinics");
          setClinics([]);
        }
        setLoading(false);
      },
      (err) => {
        toast.error("Location access denied.");
        setClinics([]);
        setLoading(false);
      }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
    >
      <form onSubmit={searchClinics} className="flex flex-col md:flex-row gap-3 mb-6 relative">
        <div className="w-full relative">
          <input
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search clinics or hospitals..."
            className="border-2 border-gray-200 p-3 rounded-xl w-full focus:outline-none focus:border-blue-500 transition-all duration-200"
            autoComplete="off"
          />
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.ul 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-60 overflow-auto"
              >
                {suggestions.map((clinic, idx) => (
                  <motion.li
                    key={clinic.place_id || idx}
                    whileHover={{ backgroundColor: "#f0f9ff" }}
                    className="px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(clinic)}
                  >
                    <div className="font-semibold text-blue-800">{clinic.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{clinic.formatted_address || clinic.vicinity}</div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <div className="flex gap-3">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
          >
            <FaSearchLocation /> Search
          </motion.button>
          <motion.button
            type="button"
            onClick={findNearby}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2 shadow-md"
          >
           {loading ? <FaSpinner className="animate-spin" /> : <FaMapMarkerAlt />} 
            Near Me
          </motion.button>
        </div>
      </form>

      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="text-4xl text-blue-600 mb-4"
          >
            <FaSpinner />
          </motion.div>
          <p className="text-gray-600 font-medium">Finding clinics...</p>
        </motion.div>
      ) : Array.isArray(clinics) && clinics.length ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {clinics.map((clinic, idx) => (
            <motion.div
              key={clinic.place_id || idx}
              whileHover={{ y: -5 }}
              className="bg-blue-50 rounded-xl p-5 shadow-sm border border-blue-100 hover:border-blue-200 transition-all"
            >
              <div className="font-bold text-lg text-blue-800 mb-2">{clinic.name}</div>
              <div className="text-gray-700 text-sm mb-3">{clinic.formatted_address || clinic.vicinity}</div>
              {clinic.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center text-yellow-500">
                    ⭐ {clinic.rating}
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{clinic.user_ratings_total} reviews</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 rounded-xl p-8 text-center"
        >
          <div className="text-5xl mb-4">🏥</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No clinics found</h3>
          <p className="text-gray-500">Try a different search or use the "Near Me" button</p>
        </motion.div>
      )}
    </motion.div>
  );
}
