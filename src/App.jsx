import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate ,useNavigate} from "react-router-dom";
import { useAuthContext } from "views/auth/hooks/useAuthContext";
import AdminLayout from "layouts/admin";
import TechLayout from "layouts/technicien";
import ClientLayout from "layouts/client";
import HelpdeskLayout from "layouts/help-desk";
import NoAccess from "layouts/noaccess";
import Page404 from "layouts/page404";
import AuthLayout from "layouts/auth";
import ControllerLayout from "layouts/Controller";
import Manager from "layouts/manager";

const App = () => {
  const { user, state } = useAuthContext();
  const navigate = useNavigate(); 

 /*
  useEffect(() => {
    if (user && user.role) {
      console.log("User Role:", user.role);
    }
  }, [user]);*/
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (user && user.token) {
        const tokenExp = user.tokenExp;
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (currentTime >= tokenExp) {
          // Token has expired
          console.log("Token has expired");
          alert('Your session has expired. Please log in again.'); // Show alert
          navigate('/auth/sign-in'); // Redirect to the login page
        }
      }
    };

    checkTokenExpiration(); // Call the function when the component mounts or user changes
  }, [user, navigate]);
 
  const isUserAuthorized = (allowedRoles) => {
    return user && user.role && allowedRoles.includes(user.role);
  };

  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route
        path="client/*"
        element={
          isUserAuthorized(['CLIENT']) ? (
            <ClientLayout  />
          ) : (
            <Navigate to="/noacces" replace />
          )
        }
      />
      <Route
        path="helpdesk/*"
        element={
          isUserAuthorized(['HELPDESK']) ? (
            <HelpdeskLayout  />
          ) : (
            <Navigate to="/noacces" replace />
          )
        }
      />
      <Route
        path="tech/*"
        element={
          isUserAuthorized(['TECHNICIEN']) ? (
            <TechLayout />
          ) : (
            <Navigate to="/noacces" replace />
          )
        }
      />
      <Route
        path="manager/*"
        element={
          isUserAuthorized(['ADMIN']) ? (
            <ControllerLayout  />
          ) : (
            <Navigate to="/noacces" replace />
          )
        }
      />
       <Route
        path="control/*"
        element={
          isUserAuthorized(['MANAGER']) ? (
            <Manager />
          ) : (
            <Navigate to="/noacces" replace />
          )
        }
      />
      <Route
        path="admin/*"
        element={
          isUserAuthorized(['COORDINATRICE']) ? (
            <AdminLayout />
          ) : (
            <Navigate to="/noacces" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      {<Route path="*" element={<Page404 />} />}
      {<Route path="/noacces" element={<NoAccess />} />}
    </Routes>
  );
};

export default App;