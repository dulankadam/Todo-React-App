import { useState } from 'react';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const authenticate = (action, credentials) => {
    setAuthLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (action === 'register') {
          setCurrentUser({ ...credentials });
          resolve('Registration successful!');
        } else if (action === 'login') {
          if (credentials.email === 'user@domain.com' && credentials.password === 'pass123') {
            setCurrentUser({ name: 'Test User', email: credentials.email });
            resolve('Login successful!');
          } else {
            reject('Invalid login credentials');
          }
        }
        setAuthLoading(false);
      }, 1500);
    });
  };

  const logout = () => setCurrentUser(null);

  return { currentUser, authLoading, authenticate, logout };
};

export default useAuth;
