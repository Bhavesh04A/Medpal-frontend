import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshUser: () => Promise<void>;
  profileImgTs: number;
  setProfileImgTs: React.Dispatch<React.SetStateAction<number>>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  setUser: () => {},
  refreshUser: async () => {},
  profileImgTs: Date.now(),
  setProfileImgTs: () => {},
});

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api/auth`;

function getInitialUser() {
  const userStr = localStorage.getItem("medpal_user");
  return userStr ? JSON.parse(userStr) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("medpal_token"));
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading, setLoading] = useState(true);
  const [profileImgTs, setProfileImgTs] = useState(Date.now());

  useEffect(() => {
    try {
      if (user) {
        const { _id, name, email, phone } = user;
        localStorage.setItem("medpal_user", JSON.stringify({ _id, name, email, phone }));
      } else {
        localStorage.removeItem("medpal_user");
      }
    } catch (err) {
      // Type guard for err
      if (
        err instanceof Error &&
        "name" in err &&
        (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        console.error("localStorage quota exceeded. User data not saved.");
      } else {
        throw err;
      }
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("medpal_token");
    if (token) {
      axios
        .get(`${API_BASE_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch(() => {
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("medpal_token");
    if (token) {
      const res = await axios.get(`${API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("medpal_token", res.data.token);
      setIsLoggedIn(true);
      await refreshUser();
      setProfileImgTs(Date.now());
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      localStorage.setItem("medpal_token", res.data.token);
      setIsLoggedIn(true);
      await refreshUser();
      setProfileImgTs(Date.now());
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("medpal_token");
    localStorage.removeItem("medpal_user");
    setUser(null);
    setIsLoggedIn(false);
    setProfileImgTs(Date.now());
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        login,
        register,
        logout,
        setUser,
        refreshUser,
        profileImgTs,
        setProfileImgTs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
