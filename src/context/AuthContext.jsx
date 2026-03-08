import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const AuthContext = createContext();

// Built-in demo users — works even without the backend
const DEMO_USERS = {
    '80012345678': { id: 'demo-student-1', name: 'Arjun', role: 'student', email: '80012345678' },
    'Faculty@nmims.in': { id: 'demo-teacher-1', name: 'Faculty User', role: 'teacher', email: 'Faculty@nmims.in' },
    'parent@demo.com': { id: 'demo-parent-1', name: 'Mr. Patel', role: 'parent', email: 'parent@demo.com' },
};

// Map internal role names to URL paths
const getRolePath = (role) => {
    if (role === 'teacher') return '/faculty';
    return `/${role}`;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (role, email, password) => {
        try {
            // Try the live backend first
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                const userData = {
                    ...result.data,
                    role: result.data.role.toLowerCase(),
                    avatar: `https://ui-avatars.com/api/?name=${result.data.name}&background=random`
                };
                setUser(userData);
                navigate(getRolePath(userData.role));
                return 'SUCCESS';
            }
            return 'INVALID_CREDENTIALS';

        } catch (networkError) {
            // Backend is not running — use built-in demo credentials
            console.warn('⚠️ Backend unreachable, using offline demo mode.');

            if (password !== 'demo123') {
                return 'INVALID_CREDENTIALS';
            }

            const demoUser = DEMO_USERS[email];
            if (!demoUser) {
                return 'INVALID_CREDENTIALS';
            }

            const userData = {
                ...demoUser,
                avatar: `https://ui-avatars.com/api/?name=${demoUser.name}&background=random`
            };
            setUser(userData);
            navigate(getRolePath(demoUser.role));
            return 'SUCCESS';
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
