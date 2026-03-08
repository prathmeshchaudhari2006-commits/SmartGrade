import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';
import { MdAdd, MdMoreVert, MdInsertDriveFile, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Assignments() {
    const { user } = useAuth();
    const [assignmentsList, setAssignmentsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [facultyNotes, setFacultyNotes] = useState('');
    const [showNotesField, setShowNotesField] = useState(false);
    const [formData, setFormData] = useState({ title: '', subject: 'L.A.D.E (Linear algebra differential equation)', dueDate: '', question: '' });
    const [questionFile, setQuestionFile] = useState(null);
    const [notesFile, setNotesFile] = useState(null);

    useEffect(() => {
        // Fetch real assignments
        fetch(`${API_BASE_URL}/api/assignments`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setAssignmentsList(data.data);
                }
            })
            .catch(err => console.error("Failed fetching assignments:", err));
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const fileToBase64 = (file) => new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve({ base64: reader.result.split(',')[1], name: file.name });
            });

            const qFileData = questionFile ? await fileToBase64(questionFile) : null;
            const nFileData = notesFile ? await fileToBase64(notesFile) : null;

            const payload = {
                title: formData.title,
                question: formData.question,
                subject: formData.subject,
                dueDate: formData.dueDate,
                teacherId: user?.id || 'demo-faculty-id',
                classId: '165e1714-7800-45f4-a7b6-1e93f8db9ba6',
                facultyNotes: facultyNotes || null,
                questionFile: qFileData?.base64 || null,
                questionFileName: qFileData?.name || null,
                notesFile: nFileData?.base64 || null,
                notesFileName: nFileData?.name || null
            };

            const res = await fetch(`${API_BASE_URL}/api/assignments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success) {
                toast.success(`Assignment created ${facultyNotes ? 'with AI Context Notes' : ''} & distributed to students!`);
                setAssignmentsList([data.data, ...assignmentsList]);
                setFacultyNotes('');
                setShowNotesField(false);
                setFormData({ title: '', subject: 'L.A.D.E (Linear algebra differential equation)', dueDate: '', question: '' });
                setQuestionFile(null);
                setNotesFile(null);
            } else {
                toast.error(data.error?.message || 'Failed to create assignment');
            }
        } catch (error) {
            toast.error('Network error creating assignment');
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in relative pb-10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Class Assignments</h1>
                    <p className="text-slate-500">Manage and create AI-graded assignments for Class 10A.</p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <MdAdd className="w-5 h-5" />
                    {showForm ? 'Cancel Creation' : 'Create Assignment'}
                </button>
            </div>

            {/* Slide down form */}
            {showForm && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-md animate-fade-in mb-8">
                    <h2 className="text-lg font-bold text-green-800 mb-4">Create New AI Assignment</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Assignment Title</label>
                                <input type="text" required placeholder="e.g. Chapter 5 Quiz" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand-green" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
                                    <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand-green">
                                        <option>L.A.D.E (Linear algebra differential equation)</option><option>I.S (Intelligent systems)</option><option>Quantum physics</option><option>Python</option><option>JAVA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Due Date</label>
                                    <input type="date" required value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-brand-green" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">Assignment Question / Prompt</label>
                            <div className="flex flex-col gap-2">
                                <textarea required rows="3" placeholder="Define the question students must answer..." value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:border-brand-green resize-y" />
                                <div className="flex items-center gap-2">
                                    <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors border border-slate-300">
                                        <MdInsertDriveFile className="w-4 h-4" />
                                        {questionFile ? questionFile.name : 'Upload PDF/Doc/PPT'}
                                        <input type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={e => setQuestionFile(e.target.files[0])} />
                                    </label>
                                    {questionFile && <button type="button" onClick={() => setQuestionFile(null)} className="text-red-500 hover:text-red-700 text-xs font-bold">Clear</button>}
                                </div>
                            </div>
                        </div>

                        {/* Optional Faculty Notes / Context for AI */}
                        <div className="pt-2">
                            {!showNotesField ? (
                                <button
                                    type="button"
                                    onClick={() => setShowNotesField(true)}
                                    className="text-sm font-bold text-brand-green hover:text-green-700 flex items-center gap-1"
                                >
                                    <MdAdd className="w-4 h-4" /> Add Optional AI Reference Notes
                                </button>
                            ) : (
                                <div className="space-y-2 animate-fade-in border-l-2 border-brand-green pl-4 ml-1">
                                    <div className="flex justify-between items-end">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Reference Notes (Context for AI Grading)
                                            <span className="block text-xs font-normal text-slate-500 mt-0.5">Paste answer keys, specific points to look for, or formulas. The AI will use this to grade accuracy.</span>
                                        </label>
                                        <button type="button" onClick={() => { setShowNotesField(false); setFacultyNotes(''); }} className="text-xs text-red-500 hover:text-red-700 font-semibold">Remove</button>
                                    </div>
                                    <div className="space-y-3">
                                        <textarea
                                            value={facultyNotes}
                                            onChange={(e) => setFacultyNotes(e.target.value)}
                                            rows="4"
                                            placeholder="e.g., The student must mention Newton's Third Law (Action & Reaction)..."
                                            className="w-full p-3 bg-white border border-green-200 rounded-lg outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-y text-sm"
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-green-100/50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-bold transition-colors border border-green-200">
                                                <MdInsertDriveFile className="w-4 h-4" />
                                                {notesFile ? notesFile.name : 'Upload Reference PDF/PPT'}
                                                <input type="file" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={e => setNotesFile(e.target.files[0])} />
                                            </label>
                                            {notesFile && <button type="button" onClick={() => setNotesFile(null)} className="text-red-500 hover:text-red-700 text-xs font-bold">Clear</button>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
                            <button type="submit" className="bg-brand-green hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Publish to Class</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Assignments List */}
            <div className="grid gap-4 mt-8">
                {assignmentsList.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                        <MdInsertDriveFile className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-500 font-medium">No assignments created yet.</p>
                    </div>
                ) : assignmentsList.map((assignment) => (
                    <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-green-200 transition-colors group">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-green-50 group-hover:text-brand-green transition-colors hidden sm:block">
                                <MdInsertDriveFile className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{assignment.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">{assignment.subject}</span>
                                    <span className="text-sm text-slate-500">Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>

                                    {assignment.submissions?.some(s => s.status === 'NEEDS_MANUAL_REVIEW') && (
                                        <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded animate-pulse">
                                            ⚠️ Review Required
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 justify-between md:justify-end w-full md:w-auto">
                            {/* Submission Progress */}
                            <div className="w-32">
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-slate-500">Submitted</span>
                                    <span className="text-slate-tight">{assignment.submissions?.length || 0}/{assignment.total || 0}</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div className="bg-brand-green h-full rounded-full transition-all duration-1000" style={{ width: `${((assignment.submissions?.length || 0) / (assignment.total || 1)) * 100}%` }}></div>
                                </div>
                            </div>

                            {/* Avg Score */}
                            <div className="text-center min-w-[80px]">
                                <div className="text-xs font-semibold text-slate-500 mb-1">Class Avg</div>
                                {assignment.avgScore ? (
                                    <span className="font-bold text-lg text-slate-800">{assignment.avgScore}%</span>
                                ) : (
                                    <span className="text-sm font-medium text-slate-400">Pending</span>
                                )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <button className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors border
                                    ${assignment.submissions?.some(s => s.status === 'NEEDS_MANUAL_REVIEW')
                                        ? 'bg-orange-600 text-white border-orange-700 hover:bg-orange-700 shadow-sm'
                                        : 'bg-blue-50 text-brand-blue border-blue-200 hover:bg-brand-blue hover:text-white'}`}>
                                    <MdCheckCircle className="w-4 h-4" />
                                    {assignment.submissions?.some(s => s.status === 'NEEDS_MANUAL_REVIEW') ? 'Resolve Review' : 'Verify & Approve'}
                                </button>
                                <button className="text-slate-400 hover:text-slate-600 p-1">
                                    <MdMoreVert className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}