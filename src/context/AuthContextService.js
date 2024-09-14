import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const authenticate = (action, credentials) => {
    setAuthLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (action === 'register') {
          setCurrentUser({ ...credentials });
          localStorage.setItem('currentUser', JSON.stringify(credentials));
          resolve('Registration successful!');
        } else if (action === 'login') {
          const storedUser = JSON.parse(localStorage.getItem('currentUser'));
          if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
            setCurrentUser(storedUser);
            resolve('Login successful!');
          } else {
            reject('Invalid login credentials');
          }
        }
        setAuthLoading(false);
      }, 1500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    //localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, authLoading, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
