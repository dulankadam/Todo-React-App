import { useState } from 'react';

const useNotifications = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  return { notification, notify };
};

export default useNotifications;
