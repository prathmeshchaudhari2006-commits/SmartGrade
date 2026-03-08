import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ allowedRole }) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user?.role !== allowedRole) {
        const rolePath = user?.role === 'teacher' ? '/faculty' : `/${user?.role}`;
        return <Navigate to={rolePath} replace />;
    }

    return <Outlet />;
}
