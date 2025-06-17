import  { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout, profileImgTs } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/chatbot", label: "Symptom Checker" },
    { to: "/appointments", label: "Appointments" },
    { to: "/clinics", label: "Clinics" },
    { to: "/profile", label: "Profile" },
  ];

  const footerLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/careers", label: "Careers" },
  ];

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  const getProfileImgUrl = () =>
    user && user._id
      ? `${API_BASE_URL}/api/profile/image/${user._id}?ts=${profileImgTs}`
      : "/default-avatar.png";

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 px-4 py-3 md:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group transition-transform hover:scale-95"
        >
          <span className="inline-block w-9 h-9">
            <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
              <rect x="7" y="17" width="26" height="6" rx="3" fill="#3b82f6"/>
              <rect x="17" y="7" width="6" height="26" rx="3" fill="#10b981"/>
              <circle cx="20" cy="20" r="18" stroke="#3b82f6" strokeWidth="2"/>
            </svg>
          </span>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            MedPal
          </span>
        </Link>

        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium px-3 py-2 rounded-lg transition-all ${
                    location.pathname === link.to
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative ml-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg font-medium hover:shadow-md transition-all"
                >
                  <img
                    src={getProfileImgUrl()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                  <span className="font-semibold">{user?.name || "User"}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                {userMenuOpen && (
                  <div 
                    ref={userMenuRef} 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-2"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {footerLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-medium px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-all"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-50 focus:outline-none transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-7 h-7 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 bg-white rounded-xl shadow-lg py-3 px-4 border border-gray-100 animate-fade-in">
          {isLoggedIn ? (
            <>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block py-3 px-3 rounded-lg font-medium mb-1 transition-all ${
                    location.pathname === link.to
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-600"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 mt-2 pt-3">
                <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-blue-50 rounded-lg">
                  <img
                    src={getProfileImgUrl()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                  <span className="font-semibold text-blue-700">{user?.name || "User"}</span>
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {footerLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-3 px-3 rounded-lg font-medium mb-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="block py-3 px-3 text-blue-600 font-medium hover:bg-blue-50 rounded-lg mb-1 transition-all"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block py-3 px-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
