import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';
import { MdSpeed, MdAutoGraph, MdDashboardCustomize } from 'react-icons/md';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center] {`bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]`}"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-[fadeIn_0.8s_ease-out]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-sm font-semibold mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                        </span>
                        Meet the Future of Education
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
                        Grade Smarter. <span className="text-brand-blue">Empower Faculty.</span> Learn Faster.
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        SmartGrade AI automates grading and delivers personalized feedback to every student in under <span className="font-bold text-slate-800">60 seconds</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/login" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
                            Try Demo
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <button onClick={() => document.getElementById('features').scrollIntoView()} className="btn-secondary text-lg px-8 py-4 bg-white">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-brand-blue text-white py-12 relative -mt-6 z-20 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl shadow-blue-500/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-blue-400/30 text-center">
                    <div className="px-4">
                        <h3 className="text-4xl font-bold mb-2 tracking-tight">
                            <AnimatedCounter end={60} suffix=" sec" duration={1500} />
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base font-medium">Average grading time</p>
                    </div>
                    <div className="px-4">
                        <h3 className="text-4xl font-bold mb-2 tracking-tight">
                            <AnimatedCounter end={65} suffix="%" duration={2000} />
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base font-medium">Faculty time saved</p>
                    </div>
                    <div className="px-4">
                        <h3 className="text-4xl font-bold mb-2 tracking-tight">
                            <AnimatedCounter end={250} suffix="M+" duration={2500} />
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base font-medium">Students in India</p>
                    </div>
                    <div className="px-4">
                        <h3 className="text-4xl font-bold mb-2 tracking-tight">
                            <AnimatedCounter end={10} suffix="+" duration={1000} />
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base font-medium">Supported languages</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why schools choose SmartGrade AI</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Our platform bridges the gap between massive class sizes and the need for individualized attention.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="card group hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                            <MdSpeed className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">⚡ Instant Auto-Grading</h3>
                        <p className="text-slate-600 leading-relaxed">Submit handwritten or typed assignments and get them evaluated against complex rubrics in under a minute.</p>
                    </div>

                    <div className="card group hover:shadow-xl hover:border-green-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-green-50 text-brand-green rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                            <MdAutoGraph className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">🎯 Personalized Feedback</h3>
                        <p className="text-slate-600 leading-relaxed">It's not just a score. Gemini AI generates highly specific feedback highlighting exact strengths and weaknesses.</p>
                    </div>

                    <div className="card group hover:shadow-xl hover:border-orange-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-orange-50 text-brand-yellow rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:text-white transition-colors duration-300">
                            <MdDashboardCustomize className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">📊 Real-Time Dashboard</h3>
                        <p className="text-slate-600 leading-relaxed">Comprehensive analytics for faculty to identify at-risk students, class trends, and performance bottlenecks instantly.</p>
                    </div>

                    <div className="card group hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">🌍 SDG 4 Aligned</h3>
                        <p className="text-slate-600 leading-relaxed">Built to meet the UN Sustainable Development Goal for Quality, Equitable, and Inclusive Education for all.</p>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it works in practice</h2>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

                        <div className="grid md:grid-cols-3 gap-12 relative z-10">
                            <div className="text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-xl font-bold text-slate-400 mb-6 shadow-sm">1</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Student Submits</h4>
                                <p className="text-slate-600">Student answers questions in their preferred language natively or via upload.</p>
                            </div>

                            <div className="text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-brand-blue border-4 border-blue-100 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-sm shadow-blue-500/20">2</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">AI Evaluates</h4>
                                <p className="text-slate-600">Google Gemini analyzes the response, generating a score and personalized insights.</p>
                            </div>

                            <div className="text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-brand-green border-4 border-green-100 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-sm shadow-green-500/20">3</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">Everyone Learns</h4>
                                <p className="text-slate-600">Faculty reviews analytics, Parents are notified, and the Student knows how to improve.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}