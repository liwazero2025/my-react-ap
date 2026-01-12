import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'myapp_auth_v1';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setUser(parsed.user);
                setToken(parsed.token);
            }
        } catch (e) {
            console.warn('Failed to read auth from storage', e);
        }
    }, []);

    useEffect(() => {
        const payload = {user, token};
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (e) {
            console.warn('Failed to write auth to storage', e);
        }
    }, [user, token]);

    const login = ({username, password, role = 'user'}) => {
        // Demo login: accept any credentials. Replace with real API request as needed.
        const fakeToken = `token-${Date.now()}`;
        const loggedUser = {username, role};
        setUser(loggedUser);
        setToken(fakeToken);
        return {user: loggedUser, token: fakeToken};
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const isAuthenticated = () => !!token;

    const hasRole = (requiredRoles) => {
        if (!requiredRoles || requiredRoles.length === 0) return true;
        if (!user) return false;
        if (typeof requiredRoles === 'string') requiredRoles = [requiredRoles];
        return requiredRoles.includes(user.role);
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout, isAuthenticated, hasRole}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export default AuthContext;