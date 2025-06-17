import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function ProfilePage() {
  const { user, refreshUser, profileImgTs, setProfileImgTs } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setFetching(true);
      await refreshUser();
      setFetching(false);
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
  }, [user]);

  const handlePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePic", file);
    setLoading(true);
    try {
      const token = localStorage.getItem("medpal_token");
      await axios.post(
        `${API_BASE_URL}/api/profile/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await refreshUser();
      setProfileImgTs(Date.now());
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Image upload failed");
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("medpal_token");
      await axios.put(
        `${API_BASE_URL}/api/profile`,
        { name, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUser();
      setEditMode(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
          ></motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-medium text-gray-600"
          >
            Loading your profile...
          </motion.span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your personal information
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 p-4 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                <motion.img
                  key={user?._id || profileImgTs}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={
                    user && user._id
                      ? `${API_BASE_URL}/api/profile/image/${user._id}?ts=${profileImgTs}`
                      : "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
              {editMode && (
                <>
                  <button
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    title="Change profile picture"
                    disabled={loading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePicChange}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </>
              )}
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">{name}</h2>
            <p className="text-blue-100">{user?.email}</p>
          </div>

          {/* Profile Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div variants={itemVariants} className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    readOnly={!editMode}
                    onChange={e => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${editMode ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-50 border-gray-200"} transition-all`}
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 border-gray-200"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    readOnly={!editMode}
                    onChange={e => setPhone(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${editMode ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-50 border-gray-200"} transition-all`}
                    placeholder="+91-XXXXXXXXXX"
                    pattern="^(\+?\d{1,3}[\- ]?)?\d{10}$"
                    required
                  />
                </motion.div>
              </div>

              <motion.div className="flex justify-end space-x-3 pt-4">
                <AnimatePresence mode="wait">
                  {!editMode ? (
                    <motion.button
                      key="edit-button"
                      variants={itemVariants}
                      type="button"
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                      onClick={() => setEditMode(true)}
                      disabled={loading}
                    >
                      Edit Profile
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        key="cancel-button"
                        variants={itemVariants}
                        type="button"
                        className="px-5 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                        onClick={() => {
                          setName(user?.name || "");
                          setPhone(user?.phone || "");
                          setEditMode(false);
                        }}
                        disabled={loading}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        key="save-button"
                        variants={itemVariants}
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </span>
                        ) : "Save Changes"}
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </div>

          <motion.div variants={itemVariants} className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
