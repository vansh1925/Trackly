import { useEffect, useState } from "react";
import { AuthContext } from "./useAuth.js";
import api from "../api/axios.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/users/me')
        .then((res) => {
          setUser(res.data.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    localStorage.setItem('token', response.data.data.token);
    setUser(response.data.data.user);
  }
  const register = async (name, email, password) => {
    await api.post('/users/register', { name, email, password });
  }
  const logout=() => {
    localStorage.removeItem('token');
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{user,loading,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  )
}


