import React from 'react';
import PropTypes from 'prop-types';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const ProtectedRoute = ({children, requiredRoles}) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.isAuthenticated()) {
        // Not logged in -> redirect to login, keep the target route in state
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    // Check roles if provided
    if (!auth.hasRole(requiredRoles)) {
        // Unauthorized
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
    requiredRoles: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export default ProtectedRoute;