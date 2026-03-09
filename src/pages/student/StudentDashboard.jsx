import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';
import StatCard from '../../components/StatCard';
import { MdAssignmentTurnedIn, MdScore, MdPendingActions, MdBadge, MdArrowForward } from 'react-icons/md';
import { streakData, badges } from '../../data/mockStudentData';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [recentFeedback, setRecentFeedback] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch assignments (In a real app, we'd filter by student class)
                const resA = await fetch(`${API_BASE_URL}/api/assignments`);
                const dataA = await resA.json();
                if (dataA.success) setAssignments(dataA.data);
            } catch (err) {
                console.warn('⚠️ Backend unreachable, using mock data for dashboard.');
                // Use mock assignments from mockStudentData as fallback
                const { assignments: mockAssignments } = await import('../../data/mockStudentData');
                setAssignments(mockAssignments || []);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-blue to-blue-500 rounded-2xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute right-0 top-0 w-64 h-full hidden md:block opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 2.21 1.19 4.14 2.97 5.23.4.24.9.06 1.05-.39.14-.42-.09-.89-.48-1.13C8.21 14.88 7.5 13.51 7.5 12c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 1.51-.71 2.88-2.04 3.71-.39.24-.62.71-.48 1.13.15.45.65.63 1.05.39C16.81 16.14 18 14.21 18 12c0-3.31-2.69-6-6-6z" /></svg>
                </div>
                <h1 className="text-3xl font-bold mb-2 z-10 relative">Hello, {user?.name}! 👋</h1>
                <p className="text-blue-100 text-lg z-10 relative">Ready to learn today? Let's check your progress.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Assignments Available"
                    value={assignments.length}
                    icon={<MdAssignmentTurnedIn className="w-6 h-6" />}
                    trend={assignments.length > 0 ? 100 : 0}
                />
                <StatCard
                    title="Average Score"
                    value={`0%`}
                    icon={<MdScore className="w-6 h-6" />}
                    trend={0}
                    colorClass="text-brand-green" bgClass="bg-green-50"
                />
                <StatCard
                    title="Recent Submissions"
                    value={recentFeedback.length}
                    icon={<MdPendingActions className="w-6 h-6" />}
                    colorClass="text-orange-500" bgClass="bg-orange-50"
                />
                <StatCard
                    title="Badges Earned"
                    value={badges.filter(b => b.earned).length}
                    icon={<MdBadge className="w-6 h-6" />}
                    colorClass="text-purple-500" bgClass="bg-purple-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Assignments List (New) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Pending Assignments</h2>
                        <Link to="/student/submit" className="text-sm text-brand-green font-medium hover:underline flex items-center gap-1">Go to Submission <MdArrowForward /></Link>
                    </div>

                    <div className="space-y-3">
                        {assignments.length === 0 ? (
                            <div className="text-center py-8 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                                <p className="text-slate-500 font-medium">No pending assignments! You're caught up.</p>
                            </div>
                        ) : assignments.map((assignment) => (
                            <Link key={assignment.id} to="/student/submit" className="block bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-brand-green hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-green-50 text-brand-green flex items-center justify-center">
                                            <MdAssignmentTurnedIn className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 group-hover:text-brand-green transition-colors">{assignment.title}</h4>
                                            <p className="text-sm text-slate-500">{assignment.subject} • Due {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full group-hover:bg-brand-green group-hover:text-white transition-colors">Submit Now</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Column Layout */}
                <div className="space-y-6">
                    {/* Learning Streak */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
                            Learning Streak
                            <span className="text-orange-500 text-sm flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">🔥 12 Days</span>
                        </h2>

                        <div className="grid grid-cols-7 gap-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                <div key={`day-${i}`} className="text-center text-xs font-medium text-slate-400 mb-1">{d}</div>
                            ))}
                            {/* Pad calendar start */}
                            <div className="col-span-3"></div>

                            {streakData.map((day, i) => (
                                <div
                                    key={i}
                                    onClick={() => toast.info(`Activity breakdown for Day ${day.day} coming soon!`)}
                                    className={`w-full aspect-square rounded-sm
                  ${day.active ? 'bg-brand-green/80 hover:bg-brand-green cursor-pointer' : 'bg-slate-100 hover:bg-slate-200 cursor-pointer'} 
                  transition-colors`}
                                    title={`Day ${day.day}: ${day.active ? 'Active' : 'Inactive'}`}
                                ></div>
                            ))}
                        </div>
                        <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">Submit assignments consistently to build your streak and earn new badges!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}