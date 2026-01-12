/**
 * @prettier
 */
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import IndexPage from '../pages/IndexPage/index';
import LoginPage from '../pages/LoginPage/index';
import Dashboard from '../pages/Dashboard/index';
import Admin from '../pages/Admin/index';
import Forbidden from '../pages/Forbidden/index';
import SimpleVirtualScrolling from '../pages/SimpleVirtualScrolling';
import ComplicatedVirtualScrolling from '../pages/ComplicatedVirtualScrolling';

import {AuthProvider} from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
    {path: '/', element: <IndexPage />},
    {path: '/login', element: <LoginPage />},
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute requiredRoles="admin">
                <Admin />
            </ProtectedRoute>
        )
    },
    {
        path: '/forbidden',
        element: <Forbidden />
    },
    {
        path: '/simpleVirtualScrolling',
        element: <SimpleVirtualScrolling />
    },
    {
        path: '/complicatedVirtualScrolling',
        element: <ComplicatedVirtualScrolling />
    }
]);

const AppRouter = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default AppRouter;
