import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContextService';

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
      return <p>Please log in to access this feature.</p>;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
