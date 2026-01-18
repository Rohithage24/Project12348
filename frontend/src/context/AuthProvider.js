import { useState, useContext, createContext, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // 🔹 Load auth from localStorage on first load
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setAuth({
        user: parsedAuth.user || null,
        token: parsedAuth.token || "",
      });
    }
  }, []);

  // 🔹 Sync auth to localStorage
  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
