export const studentStats = {
    submitted: 12,
    avgScore: 76,
    pending: 2,
    badges: 5
};

export const assignments = [
    { id: 'a1', title: 'Calculus: Derivatives Practice', subject: 'L.A.D.E (Linear algebra differential equation)', dueDate: '2025-04-10', status: 'pending', facultyNotes: 'Grade generously on the working out steps. The final answer must be simplified. Accept either Leibniz or Lagrange notation.' },
    { id: 'a2', title: 'System Architecture Essay', subject: 'I.S (Intelligent systems)', dueDate: '2025-04-12', status: 'pending' },
    { id: 'a3', title: 'Schrödinger Equation Analysis', subject: 'Quantum physics', dueDate: '2025-04-15', status: 'pending' },
    { id: 'a4', title: 'Data Structures with Python', subject: 'Python', dueDate: '2025-04-18', status: 'pending' },
    { id: 'a5', title: 'Multithreading in JAVA', subject: 'JAVA', dueDate: '2025-04-20', status: 'pending' },
];

export const feedbackHistory = [
    { id: 'f1', title: 'Quantum Mechanics Quiz', subject: 'Quantum physics', date: '2025-03-20', score: 85, grade: 'B+', status: 'reviewed' },
    { id: 'f2', title: 'Differential Equations', subject: 'L.A.D.E (Linear algebra differential equation)', date: '2025-03-18', score: 92, grade: 'A', status: 'reviewed' },
    { id: 'f3', title: 'Neural Networks 101', subject: 'I.S (Intelligent systems)', date: '2025-03-15', score: 78, grade: 'B', status: 'reviewed' },
    { id: 'f4', title: 'Pandas Data Analysis', subject: 'Python', date: '2025-03-10', score: 65, grade: 'C+', status: 'reviewed' },
    { id: 'f5', title: 'Hindi Grammar Test', subject: 'Hindi', date: '2025-03-05', score: 88, grade: 'B+', status: 'reviewed' },
    { id: 'f6', title: 'Trigonometry Basics', subject: 'Maths', date: '2025-02-28', score: 62, grade: 'C', status: 'reviewed' },
    { id: 'f7', title: 'Photosynthesis Lab', subject: 'Science', date: '2025-02-20', score: 95, grade: 'A+', status: 'reviewed' },
];

export const progressData = {
    trend: [
        { date: 'Jan 15', score: 65 },
        { date: 'Feb 01', score: 68 },
        { date: 'Feb 15', score: 72 },
        { date: 'Mar 01', score: 70 },
        { date: 'Mar 15', score: 75 },
        { date: 'Mar 30', score: 82 },
    ],
    bySubject: [
        { subject: 'Science', score: 85, fullMark: 100 },
        { subject: 'Maths', score: 78, fullMark: 100 },
        { subject: 'English', score: 82, fullMark: 100 },
        { subject: 'History', score: 68, fullMark: 100 },
        { subject: 'Hindi', score: 88, fullMark: 100 },
    ],
    radar: [
        { subject: 'Science', A: 85, fullMark: 100 },
        { subject: 'Maths', A: 78, fullMark: 100 },
        { subject: 'English', A: 82, fullMark: 100 },
        { subject: 'History', A: 68, fullMark: 100 },
        { subject: 'Hindi', A: 88, fullMark: 100 },
    ]
};

export const badges = [
    { id: 'b1', title: 'First Submission', icon: '🏆', earned: false, desc: 'Submit your first assignment' },
    { id: 'b2', title: 'Speed Learner', icon: '⚡', earned: false, desc: 'Submit 5 assignments' },
    { id: 'b3', title: 'Improver', icon: '📈', earned: false, desc: 'Score improved 3 times in a row' },
    { id: 'b4', title: 'Perfect Score', icon: '🎯', earned: false, desc: 'Score 100% on any assignment' },
    { id: 'b5', title: '7-Day Streak', icon: '🔥', earned: false, desc: 'Log in 7 days in a row' },
    { id: 'b6', title: 'Top of Class', icon: '🌟', earned: false, desc: 'Achieve highest score in class' },
];

export const streakData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    active: false // Reset streak for demo
}));

// Helper function to mutate badges in memory for demo purposes
export const earnBadge = (badgeId) => {
    const badge = badges.find(b => b.id === badgeId);
    if (badge && !badge.earned) {
        badge.earned = true;
        badge.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
};
