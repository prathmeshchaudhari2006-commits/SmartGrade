export const parentStats = {
    avgScore: 76,
    weeklySubmissions: 3,
    improvement: 8,
    attendance: 92
};

export const childInfo = {
    name: 'Arjun Patel',
    class: '10A',
    school: 'Sunshine Public School',
    rollNo: '05'
};

export const subjectPerformance = [
    { subject: 'L.A.D.E (Linear algebra differential equation)', score: 84, status: 'excellent' },
    { subject: 'Quantum physics', score: 79, status: 'good' },
    { subject: 'I.S (Intelligent systems)', score: 71, status: 'average' },
    { subject: 'Python', score: 68, status: 'average' },
    { subject: 'JAVA', score: 55, status: 'poor' }
];

export const progressTrend = [
    { date: 'Week 1', score: 68 },
    { date: 'Week 2', score: 70 },
    { date: 'Week 3', score: 75 },
    { date: 'Week 4', score: 76 }
];

export const notifications = [
    { id: 1, type: 'critical', text: '📉 Arjun scored below 50% in Mathematics', time: '3 days ago', read: false },
    { id: 2, type: 'success', text: '✅ Arjun\'s Science score improved by 15%!', time: '1 week ago', read: true },
    { id: 3, type: 'info', text: '📝 New assignment submitted: Cell Biology Essay', time: 'Yesterday', read: false },
    { id: 4, type: 'warning', text: '🚨 Faculty flagged Arjun as at-risk in Maths', time: '2 days ago', read: true },
    { id: 5, type: 'info', text: '🏫 School holiday announcement for Friday', time: 'Today', read: true }
];

export const recentFeedback = [
    { id: 'f1', subject: 'L.A.D.E (Linear algebra differential equation)', score: 48, date: '2025-03-20', title: 'Chapter 4 Quiz', summary: 'Arjun struggled with quadratic equations. Needs practice on factoring.' },
    { id: 'f2', subject: 'I.S (Intelligent systems)', score: 92, date: '2025-03-18', title: 'Biology Lab', summary: 'Excellent understanding of cell structures. Great analytical skills.' },
    { id: 'f3', subject: 'Quantum physics', score: 85, date: '2025-03-15', title: 'Essay Writing', summary: 'Good vocabulary used. Sentence structure is improving steadily.' }
];

export const attendanceTracker = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: Math.random() > 0.1 ? 'present' : 'absent', // 90% attendance
    submission: Math.random() > 0.3 ? 'on_time' : (Math.random() > 0.5 ? 'late' : 'missed')
}));

export const chatMessages = [
    { id: 1, sender: 'Faculty', text: 'Hello Mr. Patel! Just checking in regarding Arjun\'s recent Maths quiz.', time: '10:30 AM' },
    { id: 2, sender: 'Parent', text: 'Hi Mrs. Sharma. Yes, I saw the notification. He seems to be struggling with quadratics.', time: '11:15 AM' },
    { id: 3, sender: 'Faculty', text: 'Yes, exactly. I\'ve assigned some extra practice problems via SmartGrade. Could you make sure he works on them this weekend?', time: '11:20 AM' }
];
