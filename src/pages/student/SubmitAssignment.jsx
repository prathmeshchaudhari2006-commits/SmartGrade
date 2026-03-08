import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';
import { gradeAssignment } from '../../utils/geminiApi';
import LoadingAI from '../../components/LoadingAI';
import { MdUploadFile, MdBolt, MdInfo, MdInsertDriveFile } from 'react-icons/md';
import { toast } from 'react-toastify';
import { earnBadge } from '../../data/mockStudentData';
// Removed mock assignments import

export default function SubmitAssignment() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [assignmentsList, setAssignmentsList] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [subject, setSubject] = useState('L.A.D.E (Linear algebra differential equation)');
    const [answer, setAnswer] = useState('');
    const [language, setLanguage] = useState('English');
    const [isGrading, setIsGrading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [submissionFile, setSubmissionFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const subjects = ['L.A.D.E (Linear algebra differential equation)', 'I.S (Intelligent systems)', 'Quantum physics', 'Python', 'JAVA'];
    const languages = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali'];

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Strip prefix
        reader.onerror = error => reject(error);
    });

    React.useEffect(() => {
        // Fetch real assignments from DB
        fetch(`${API_BASE_URL}/api/assignments`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setAssignmentsList(data.data);
                }
            })
            .catch(err => console.error("Failed fetching assignments:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!answer.trim() && !selectedFile) {
            toast.error('Please enter an answer or upload a file.');
            return;
        }

        setIsGrading(true);

        try {
            // Find the specific question or use a default
            const assignmentObj = assignmentsList.find(a => a.id === selectedAssignment);
            const question = assignmentObj ? assignmentObj.question : `General ${subject} Question`;
            const facultyContext = assignmentObj?.facultyNotes || null;

            let base64Image = null;
            let mimeType = null;

            if (selectedFile) {
                toast.info('Analyzing handwriting natively via Gemini AI Vision...');
                try {
                    base64Image = await fileToBase64(selectedFile);
                    mimeType = selectedFile.type;
                } catch (readError) {
                    console.error('File Read Error:', readError);
                    throw new Error(`Failed to read the uploaded file: ${readError.message}`);
                }
            }

            const studentAnswer = answer || (selectedFile ? '[See attached handwritten image]' : '');

            let result;

            try {
                // Try backend API first
                const response = await fetch(`${API_BASE_URL}/api/submissions`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        assignmentId: selectedAssignment,
                        studentId: user.id,
                        studentAnswer,
                        base64Image,
                        mimeType
                    })
                });

                const data = await response.json();
                if (data.success) {
                    result = data.data;
                } else {
                    throw new Error(data.error?.message || 'Backend grading failed');
                }
            } catch (backendError) {
                // Fallback: Grade directly via Gemini API natively bypassing OCR
                console.warn('⚠️ Sync failed, using direct Gemini grading.');
                result = await gradeAssignment({
                    subject,
                    question,
                    studentAnswer,
                    studentName: user?.name || 'Student',
                    facultyContext,
                    base64Image,
                    mimeType
                });
            }

            // Award immediate demo badge
            if (result && !result.error) {
                earnBadge('b1');
            }

            toast.dismiss(); // Clear any analysis toasts

            if (result.status === "NEEDS_MANUAL_REVIEW" || result.error === "ILLEGIBLE_HANDWRITING") {
                toast.warning("Handwriting is unreadable. Your assignment has been sent to your Faculty for manual review.");
                navigate('/student/result', { state: { error: true, subject, question, manualReview: true } });
            } else {
                navigate('/student/result', { state: { result, subject, question } });
            }

        } catch (error) {
            console.error('Submission error:', error);
            toast.error(error.message || 'Error grading assignment. Please try again.');
            setIsGrading(false);
        }
    };

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check file size (Gemini can handle up to 20MB for direct inline, but let's keep it reasonable)
            if (file.size > 15 * 1024 * 1024) {
                toast.error('File size must be less than 15MB.');
                return;
            }

            setSelectedFile(file);
            setFileName(file.name);
            toast.success('File uploaded! Gemini Vision will analyze it.');
        }
    };

    if (isGrading) {
        return <LoadingAI />;
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in relative pb-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Submit Assignment</h1>
                <p className="text-slate-500">Upload your work or type your answer directly for instant AI grading.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Assignment Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Select Assignment</label>
                        <select
                            value={selectedAssignment}
                            onChange={(e) => {
                                setSelectedAssignment(e.target.value);
                                const subj = assignmentsList.find(a => a.id === e.target.value)?.subject;
                                if (subj) setSubject(subj);
                            }}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition-shadow"
                        >
                            <option value="" disabled>-- Choose an assignment --</option>
                            {assignmentsList.map(a => (
                                <option key={a.id} value={a.id}>{a.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subject override */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none transition-shadow"
                        >
                            {subjects.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Assignment Question Display */}
                {selectedAssignment && (
                    <div className="mb-8 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl animate-fade-in shadow-inner">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider flex items-center gap-2">
                                <MdInfo className="w-4 h-4" /> Assignment Question
                            </h3>
                            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-brand-blue rounded">
                                {assignmentsList.find(a => a.id === selectedAssignment)?.subject}
                            </span>
                        </div>
                        <p className="text-slate-800 font-medium text-lg leading-relaxed whitespace-pre-wrap mb-4">
                            {assignmentsList.find(a => a.id === selectedAssignment)?.question}
                        </p>

                        {/* Downloadable Files from Faculty */}
                        <div className="flex flex-wrap gap-3">
                            {assignmentsList.find(a => a.id === selectedAssignment)?.questionFile && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const a = document.createElement('a');
                                        a.href = `data:application/octet-stream;base64,${assignmentsList.find(a => a.id === selectedAssignment).questionFile}`;
                                        a.download = assignmentsList.find(a => a.id === selectedAssignment).questionFileName;
                                        a.click();
                                    }}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                                >
                                    <MdInsertDriveFile className="text-brand-blue" />
                                    Download Assignment PDF
                                </button>
                            )}
                            {assignmentsList.find(a => a.id === selectedAssignment)?.notesFile && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const a = document.createElement('a');
                                        a.href = `data:application/octet-stream;base64,${assignmentsList.find(a => a.id === selectedAssignment).notesFile}`;
                                        a.download = assignmentsList.find(a => a.id === selectedAssignment).notesFileName;
                                        a.click();
                                    }}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                                >
                                    <MdInfo className="text-brand-green" />
                                    Reference Notes
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Text Area */}
                <div className="mb-6">
                    <label className="text-sm font-semibold text-slate-700 flex justify-between items-end mb-2">
                        <span>Your Answer</span>
                        <span className="text-xs font-normal text-slate-400">Markdown supported</span>
                    </label>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your detailed answer here... The AI is evaluating your logic, vocabulary, and grammar."
                        className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none resize-y transition-shadow"
                    />
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <span className="text-slate-400 font-medium text-sm">OR</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Submission Type Tabs */}
                <div className="flex gap-4 mb-6 p-1 bg-slate-100 rounded-xl">
                    <button
                        type="button"
                        onClick={() => { setSelectedFile(null); setFileName(''); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${!selectedFile ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Text / Digital File
                    </button>
                    <button
                        type="button"
                        onClick={() => { if (!selectedFile) setSelectedFile({ name: 'camera_capture.jpg', type: 'image/jpeg' }); }}
                        className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${selectedFile?.type === 'image/jpeg' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Handwritten (AI Vision)
                    </button>
                </div>

                {/* File Upload / Camera Zone */}
                <div className="mb-8">
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                        {selectedFile?.type === 'image/jpeg' ? 'Capture/Upload Handwritten Image' : 'Upload Submission (PDF/Doc/PPT)'}
                    </label>
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
            ${fileName ? 'border-brand-green bg-green-50' : 'border-slate-300 hover:border-brand-blue bg-slate-50 hover:bg-blue-50/50'}`}>

                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept={selectedFile?.type === 'image/jpeg' ? '.jpg,.jpeg,.png' : '.pdf,.doc,.docx,.ppt,.pptx'}
                        />

                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3
                ${fileName ? 'bg-brand-green text-white' : 'bg-white text-slate-400 border border-slate-200 shadow-sm'}`}>
                                <MdUploadFile className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-slate-700 mb-1">
                                {fileName ? `Selected: ${fileName}` : 'Click to browse or drag and drop'}
                            </span>
                            {!fileName && <span className="text-xs text-slate-500 block">PDF, DOC, PPT up to 10MB</span>}
                        </label>
                    </div>
                </div>

                {/* Footer actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
                    <div className="space-y-1 w-full sm:w-auto">
                        <label className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Language Preference</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent border-0 text-slate-700 font-medium p-0 focus:ring-0 cursor-pointer"
                        >
                            {languages.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto btn-primary bg-brand-blue py-3 px-8 text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 group hover:-translate-y-1"
                    >
                        Submit for AI Grading
                        <MdBolt className="w-5 h-5 text-brand-yellow group-hover:scale-125 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    );
}