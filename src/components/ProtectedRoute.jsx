import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }
  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;