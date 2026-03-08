import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { MdSchool, MdPerson, MdFamilyRestroom, MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        if (role === 'student') {
            setEmail('80012345678'); // Sample SAP ID
        } else if (role === 'teacher') {
            setEmail('Faculty@nmims.in');
        } else {
            setEmail('parent@demo.com');
        }
        setPassword('demo123');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate short delay for polish
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const result = await login(selectedRole, email, password);
            if (result === 'SUCCESS') {
                toast.success(`Welcome back!`);
            } else if (result === 'INVALID_CREDENTIALS') {
                toast.error('Invalid email or password. Please check your credentials.');
                setIsLoading(false);
            } else if (result === 'NETWORK_ERROR') {
                toast.error('Could not connect to server. Please ensure the backend is running command.');
                setIsLoading(false);
            } else {
                toast.error('Server error. Please try again later.');
                setIsLoading(false);
            }
        } catch (err) {
            toast.error('An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    const roles = [
        { id: 'student', title: 'Student', icon: <MdSchool className="w-10 h-10" />, color: 'blue', desc: 'Submit assignments & view feedback' },
        { id: 'teacher', title: 'Faculty', icon: <MdPerson className="w-10 h-10" />, color: 'green', desc: 'Manage class & review insights' },
        { id: 'parent', title: 'Parent', icon: <MdFamilyRestroom className="w-10 h-10" />, color: 'yellow', desc: 'Track child\'s learning progress' },
    ];

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full animate-fade-in relative z-10">

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 overflow-hidden relative">
                    {/* Decorational background bloobs */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse 
             ${selectedRole === 'student' ? 'bg-blue-200' : selectedRole === 'teacher' ? 'bg-green-200' : selectedRole === 'parent' ? 'bg-orange-200' : 'bg-slate-200'}`}></div>

                    <div className="flex flex-col items-center mb-8 relative z-10">
                        <Logo className="mb-6" />

                        {!selectedRole ? (
                            <div className="text-center w-full animate-slide-up">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h2>
                                <p className="text-slate-500 mb-8">Who are you logging in as today?</p>

                                <div className="space-y-4">
                                    {roles.map((r) => (
                                        <button
                                            key={r.id}
                                            onClick={() => handleRoleSelect(r.id)}
                                            className={`w-full group relative bg-white border-2 border-slate-100 p-4 rounded-xl flex items-center gap-4 text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1
                          hover:border-${r.color}-400 overflow-hidden focus:outline-none focus:ring-2 focus:ring-${r.color}-500 focus:ring-offset-2`}
                                        >
                                            <div className={`absolute inset-0 bg-${r.color}-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out`}></div>

                                            <div className={`relative z-10 flex text-${r.color}-500 bg-${r.color}-50 group-hover:bg-white p-3 rounded-lg transition-colors`}>
                                                {r.icon}
                                            </div>
                                            <div className="relative z-10">
                                                <h3 className="font-bold text-slate-800 text-lg group-hover:text-brand-blue transition-colors">{r.title}</h3>
                                                <p className="text-sm text-slate-500">{r.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full animate-slide-up relative z-10">
                                <button
                                    onClick={() => setSelectedRole(null)}
                                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
                                >
                                    <MdArrowBack /> Back to roles
                                </button>

                                <h2 className="text-2xl font-bold text-slate-800 mb-1 capitalize">{selectedRole === 'teacher' ? 'Faculty' : selectedRole} Login</h2>
                                <p className="text-slate-500 mb-6">Enter your details to access your portal.</p>

                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-sm">
                                    <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-brand-blue inline-block"></span> Demo Credentials
                                    </p>
                                    <p className="text-slate-600 font-mono text-xs mb-1">
                                        {selectedRole === 'student' ? 'SAP ID: 80012345678' :
                                            selectedRole === 'teacher' ? 'Email: Faculty@nmims.in' :
                                                'Email: parent@demo.com'}
                                    </p>
                                    <p className="text-slate-600 font-mono text-xs">Pass: demo123</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            {selectedRole === 'student' ? 'SAP ID' : 'Email Address'}
                                        </label>
                                        <input
                                            type={selectedRole === 'student' ? 'text' : 'email'}
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-shadow"
                                            placeholder={selectedRole === 'student' ? 'Enter your SAP ID' : 'Enter your email'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-shadow"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-all
                      ${selectedRole === 'student' ? 'bg-brand-blue hover:bg-blue-600' :
                                                selectedRole === 'teacher' ? 'bg-brand-green hover:bg-green-600' :
                                                    'bg-brand-yellow hover:bg-yellow-600'} 
                      ${isLoading ? 'opacity-70 cursor-wait' : 'shadow-md hover:shadow-lg active:scale-[0.98]'}`}
                                    >
                                        {isLoading ? 'Authenticating...' : 'Login to Portal'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}