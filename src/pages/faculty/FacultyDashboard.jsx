import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';
import StatCard from '../../components/StatCard';
import { MdPeople, MdAssignmentTurnedIn, MdPendingActions, MdScore, MdTimer, MdWarning, MdPublic } from 'react-icons/md';
import { teacherStats, recentActivity } from '../../data/mockFacultyData';

export default function FacultyDashboard() {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/assignments`);
                const data = await res.json();
                if (data.success) setAssignments(data.data);
            } catch (err) {
                console.warn('⚠️ Backend unreachable, using mock data for faculty dashboard.');
                // Keep assignments empty but don't crash
            }
        };
        fetchFacultyData();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-green to-emerald-500 rounded-2xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute right-0 top-0 w-64 h-full hidden md:block opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                </div>
                <h1 className="text-3xl font-bold mb-2 z-10 relative">Good morning, {user?.name}! 🎓</h1>
                <p className="text-green-50 text-lg z-10 relative">Welcome to the Faculty Portal. Here's your class overview.</p>
            </div>

            {/* Time Saved Alert */}
            <div className="bg-white border-2 border-brand-yellow/30 bg-yellow-50/50 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-yellow rounded-lg text-white shadow-sm">
                        <MdTimer className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">SmartGrade AI Impact</h3>
                        <p className="text-sm text-slate-600">The AI assistant has saved you <span className="font-bold text-slate-800">4.2 hours</span> of manual grading this week!</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={1}
                    icon={<MdPeople className="w-6 h-6" />}
                    colorClass="text-brand-blue" bgClass="bg-blue-50"
                />
                <StatCard
                    title="Assignments"
                    value={assignments.length}
                    icon={<MdAssignmentTurnedIn className="w-6 h-6" />}
                    trend={assignments.length > 0 ? 100 : 0}
                    colorClass="text-brand-green" bgClass="bg-green-50"
                />
                <StatCard
                    title="Pending Review"
                    value={0}
                    icon={<MdPendingActions className="w-6 h-6" />}
                    colorClass="text-orange-500" bgClass="bg-orange-50"
                />
                <StatCard
                    title="Class Average"
                    value={`85%`}
                    icon={<MdScore className="w-6 h-6" />}
                    trend={0}
                    colorClass="text-purple-500" bgClass="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Recent Class Activity</h2>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200"></div>

                        <div className="space-y-6">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="relative flex gap-4 items-start pl-4">
                                    <div className="absolute left-0 w-4 h-4 rounded-full bg-white border-4 border-brand-green mt-1 z-10 shadow-sm"></div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-1 hover:border-green-200 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-slate-700">
                                                    <span className="font-semibold text-slate-900">{activity.student}</span>
                                                    {' '}
                                                    {activity.error ? (
                                                        <span className="text-brand-red font-semibold flex items-center gap-1 inline-flex"><MdWarning /> flagged for manual review</span>
                                                    ) : (
                                                        <>&nbsp;{activity.action === 'submitted' ? 'submitted' : 'viewed feedback for'}</>
                                                    )}
                                                    {' '}
                                                    <span className="font-medium">{activity.assignment}</span>
                                                </p>
                                                <span className="text-xs text-slate-500">{activity.time}</span>
                                            </div>
                                            {activity.grade && (
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm bg-green-100 text-green-700">
                                                    {activity.grade}
                                                </span>
                                            )}
                                            {activity.error && (
                                                <button className="bg-red-50 text-brand-red border border-red-200 px-3 py-1 rounded text-xs font-bold hover:bg-brand-red hover:text-white transition-colors">
                                                    Grade Manually
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Reminders */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-lg bg-green-50 text-brand-green font-semibold hover:bg-green-100 transition-colors">
                                + Create Assignment
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-brand-blue font-semibold hover:bg-blue-100 transition-colors">
                                ✉️ Message Parents
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
                                📊 Generate Weekly Report
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 leading-relaxed shadow-sm border border-indigo-100 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">💡</div>
                        <h3 className="text-lg font-bold text-indigo-900 mb-2">Smart Insights</h3>
                        <p className="text-sm text-indigo-700 mb-4">
                            Based on recent tests, <strong>15 students</strong> are struggling with "Refraction of Light". Consider reviewing this topic on Friday.
                        </p>
                        <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800">
                            View Lesson Plan Gen
                        </button>
                    </div>

                    {/* SDG 4 Alignment Badge */}
                    <div className="bg-gradient-to-r from-blue-600 to-brand-blue rounded-2xl p-6 text-white shadow-md flex items-start gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <MdPublic className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight mb-1">SDG 4 Aligned</h3>
                            <p className="text-sm text-blue-100 mb-3">Your curriculum officially meets the UN Sustainable Development Goal for Quality Education.</p>
                            <button className="text-xs font-bold uppercase tracking-wider text-white border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors">
                                View Policy Impact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}