import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    MdDashboard, MdAssignment, MdFeedback, MdTrendingUp,
    MdBadge, MdLanguage, MdPeople, MdAnalytics, MdWarning,
    MdMessage, MdNotifications, MdInsertChartOutlined
} from 'react-icons/md';

const getLinks = (role) => {
    switch (role) {
        case 'student':
            return [
                { path: '/student', label: 'Dashboard', icon: <MdDashboard /> },
                { path: '/student/submit', label: 'Submit Assignment', icon: <MdAssignment /> },
                { path: '/student/feedback', label: 'My Feedback', icon: <MdFeedback /> },
                { path: '/student/progress', label: 'My Progress', icon: <MdTrendingUp /> },
                { path: '/student/badges', label: 'My Badges', icon: <MdBadge /> },
                { path: '/student/language', label: 'Language Settings', icon: <MdLanguage /> },
            ];
        case 'teacher':
            return [
                { path: '/faculty', label: 'Faculty Dashboard', icon: <MdDashboard /> },
                { path: '/faculty/assignments', label: 'Assignments', icon: <MdAssignment /> },
                { path: '/faculty/students', label: 'Student Roster', icon: <MdPeople /> },
                { path: '/faculty/analytics', label: 'Faculty Analytics', icon: <MdAnalytics /> },
                { path: '/faculty/at-risk', label: 'Support Alerts', icon: <MdWarning /> },
                { path: '/faculty/reports', label: 'Academic Reports', icon: <MdInsertChartOutlined /> },
            ];
        case 'parent':
            return [
                { path: '/parent', label: 'Dashboard', icon: <MdDashboard /> },
                { path: '/parent/progress', label: 'Child Progress', icon: <MdTrendingUp /> },
                { path: '/parent/feedback', label: 'Recent Feedback', icon: <MdFeedback /> },
                { path: '/parent/notifications', label: 'Notifications', icon: <MdNotifications /> },
                { path: '/parent/message', label: 'Message Faculty', icon: <MdMessage /> },
            ];
        default:
            return [];
    }
};

export default function Sidebar({ role }) {
    const links = getLinks(role);

    const getThemeClass = (isActive) => {
        if (!isActive) return "text-slate-600 hover:bg-slate-100";
        if (role === 'student') return "bg-blue-50 text-brand-blue border-r-4 border-brand-blue font-semibold";
        if (role === 'teacher') return "bg-green-50 text-brand-green border-r-4 border-brand-green font-semibold";
        if (role === 'parent') return "bg-orange-50 text-orange-600 border-r-4 border-orange-500 font-semibold";
        return "";
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:block h-full">
            <nav className="p-4 space-y-1 mt-4">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === `/${role}`}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-colors ${getThemeClass(isActive)}`
                        }
                    >
                        <span className="text-xl">{link.icon}</span>
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}