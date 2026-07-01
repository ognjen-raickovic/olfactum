// src/contexts/AuthContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // the logged‑in user object
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // true while checking token on mount

  // Store token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // On mount, if token exists, validate it by fetching /me
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Token invalid or expired");
        setToken(null); // clear invalid token
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  // --- Auth actions ---

  const login = async (loginData) => {
    // loginData: { login, password }
    const res = await api.post("/auth/login", loginData);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (registerData) => {
    // registerData: { username, email, password }
    const res = await api.post("/auth/register", registerData);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Update own username
  const updateUsername = async (newUsername) => {
    const res = await api.put("/users/username", { username: newUsername });
    setUser((prev) => ({ ...prev, username: newUsername }));
    return res.data;
  };

  // Change password (requires current and new)
  const changePassword = async (currentPassword, newPassword) => {
    const res = await api.put("/users/password", {
      currentPassword,
      newPassword,
    });
    return res.data;
  };

  // Delete account
  const deleteAccount = async () => {
    await api.delete("/users/account");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUsername,
    changePassword,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
