import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatbotPage from "./pages/ChatbotPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ClinicsPage from "./pages/ClinicsPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Careers from "./pages/Careers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppointmentsProvider } from "./context/AppointmentsContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop"; 
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./context/ThemeContext";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <AppointmentsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/chatbot" element={
              <PrivateRoute>
                <ChatbotPage />
              </PrivateRoute>
            } />
            <Route path="/appointments" element={
              <PrivateRoute>
                <AppointmentsPage />
              </PrivateRoute>
            } />
            <Route path="/clinics" element={
              <PrivateRoute>
                <ClinicsPage />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Company pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppointmentsProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
