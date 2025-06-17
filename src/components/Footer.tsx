import { Link } from "react-router-dom";

export default function Footer() {


  return (
    <footer className="w-full bg-gradient-to-b from-blue-50 to-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand and Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-10 h-10">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect x="7" y="17" width="26" height="6" rx="3" fill="#3b82f6"/>
                <rect x="17" y="7" width="6" height="26" rx="3" fill="#10b981"/>
                <circle cx="20" cy="20" r="18" stroke="#3b82f6" strokeWidth="2"/>
              </svg>
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MedPal
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Your trusted AI-powered health companion. Making healthcare accessible and reliable for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/chatbot", label: "Symptom Checker" },
              { to: "/appointments", label: "Appointments" },
              { to: "/clinics", label: "Clinics" },
              { to: "/profile", label: "Profile" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Company
          </h4>
          <ul className="space-y-3">
            {[
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/careers", label: "Careers" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Contact Us
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">📧</span>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <a
                  href="mailto:support@medpal.com"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  support@medpal.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">📞</span>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <a
                  href="tel:+911234567890"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  +91 12345 67890
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">🏢</span>
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="text-gray-700">
                  123 Health St, Medical District, Bangalore 560001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-6 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MedPal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}