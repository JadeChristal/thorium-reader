import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: any;
    isAuthenticated: boolean;
}

const PrivateRoutes = ({ children, isAuthenticated }:Props) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace  />;
      }
    
      return children ;
};

export default PrivateRoutes;
