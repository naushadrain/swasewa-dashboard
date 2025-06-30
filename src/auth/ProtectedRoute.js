import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // We created this in the previous step

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If there is no user, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the children components
  return children;
};

export default ProtectedRoute;