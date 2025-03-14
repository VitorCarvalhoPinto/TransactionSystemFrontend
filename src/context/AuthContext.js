"use client";
import { createContext, useState, useEffect } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // ✅ Função de login
  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token, user } = response.data;

      // Atualiza estado e localStorage
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  // ✅ Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
