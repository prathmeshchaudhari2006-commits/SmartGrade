import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const getRoleColor = (role) => {
        switch (role) {
            case 'student': return 'bg-brand-blue';
            case 'teacher': return 'bg-brand-green';
            case 'parent': return 'bg-brand-yellow';
            default: return 'bg-brand-blue';
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
            {/* Role colored accent bar */}
            {isAuthenticated && (
                <div className={`h-1 w-full ${getRoleColor(user?.role)}`} />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    <nav className="flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="text-slate-600 font-medium hover:text-brand-blue transition-colors">
                                    Login
                                </Link>
                                <Link to="/login" className="btn-primary">
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-3 mr-2">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                                        <p className="text-xs text-slate-500 capitalize">{user.role === 'teacher' ? 'faculty' : user.role}</p>
                                    </div>
                                    <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-slate-200" />
                                </div>
                                <button onClick={logout} className="text-sm text-brand-red font-medium hover:text-red-700 transition-colors">
                                    Logout
                                </button>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}