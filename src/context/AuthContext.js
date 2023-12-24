// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    scheduleTokenExpiration();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  };

  const scheduleTokenExpiration = () => {
   
    const expirationTime = 3 * 24 * 60 * 60 * 1000;

   
    setTimeout(() => {
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }, expirationTime);

    
    localStorage.setItem('tokenExpiration', new Date().getTime() + expirationTime);
  };

  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const expirationTime = localStorage.getItem('tokenExpiration');
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
      } else {
        
        scheduleTokenExpiration();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
