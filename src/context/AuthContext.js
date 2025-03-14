"use client";
import { createContext, useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [adm, setAdm] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedAdm = localStorage.getItem("adm");
    
    if (storedUser && storedToken && storedAdm) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAdm(storedAdm);
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, user, adm } = response.data;

      setUser(user);
      setToken(token);
      setAdm(adm);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("adm", adm);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("adm");
    delete api.defaults.headers.Authorization;
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, adm, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
