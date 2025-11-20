import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// create AuthContext to hold authentication state and methods
const AuthContext = createContext();

// custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component to wrap around the app and provide auth state
// children props represent the nested components
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    localStorage.getItem('token') || null;
  });

  const onLogin = async (email, password) => {
    const options = {
      method: 'POST',
      url: '/login',
      data: { email, password },
    };

    try {
      let response = await axios.request(options);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    token,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
