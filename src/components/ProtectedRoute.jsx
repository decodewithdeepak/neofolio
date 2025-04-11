import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, needsUsername } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser && needsUsername) {
    return <Navigate to="/username-setup" />;
  }

  return children;
};

export default ProtectedRoute;