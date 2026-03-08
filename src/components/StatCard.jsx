import React from 'react';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

export default function StatCard({ title, value, icon, trend, colorClass = "text-brand-blue", bgClass = "bg-blue-50" }) {
    return (
        <div className="card hover:shadow-md transition-shadow animate-fade-in group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>

                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold
              ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {trend > 0 ? <MdTrendingUp /> : <MdTrendingDown />}
                            <span>{Math.abs(trend)}% from last month</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
