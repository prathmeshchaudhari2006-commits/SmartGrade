import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoBadge from './components/DemoBadge';
import Sidebar from './components/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import PortalChatbot from './components/PortalChatbot';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import SubmitAssignment from './pages/student/SubmitAssignment';
import GradingResult from './pages/student/GradingResult';
import MyFeedback from './pages/student/MyFeedback';
import MyProgress from './pages/student/MyProgress';
import MyBadges from './pages/student/MyBadges';
import LanguageSettings from './pages/student/LanguageSettings';

// Faculty Pages
// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import Assignments from './pages/faculty/Assignments';
import StudentRoster from './pages/faculty/StudentRoster';
import ClassAnalytics from './pages/faculty/ClassAnalytics';
import AtRiskStudents from './pages/faculty/AtRiskStudents';
import Reports from './pages/faculty/Reports';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildProgress from './pages/parent/ChildProgress';
import RecentFeedback from './pages/parent/RecentFeedback';
import Notifications from './pages/parent/Notifications';
import MessageFaculty from './pages/parent/MessageFaculty';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>
      <Footer />
      <DemoBadge />
    </div>
  );
};

const PortalLayout = ({ role }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={role} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 relative pb-20">
          <Outlet />
        </main>
      </div>
      <PortalChatbot />
      <DemoBadge />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Student Portal */}
          <Route element={<ProtectedRoute allowedRole="student" />}>
            <Route element={<PortalLayout role="student" />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/submit" element={<SubmitAssignment />} />
              <Route path="/student/result" element={<GradingResult />} />
              <Route path="/student/feedback" element={<MyFeedback />} />
              <Route path="/student/progress" element={<MyProgress />} />
              <Route path="/student/badges" element={<MyBadges />} />
              <Route path="/student/language" element={<LanguageSettings />} />
            </Route>
          </Route>

          {/* Faculty Portal */}
          <Route element={<ProtectedRoute allowedRole="teacher" />}>
            <Route element={<PortalLayout role="teacher" />}>
              <Route path="/faculty" element={<FacultyDashboard />} />
              <Route path="/faculty/assignments" element={<Assignments />} />
              <Route path="/faculty/students" element={<StudentRoster />} />
              <Route path="/faculty/analytics" element={<ClassAnalytics />} />
              <Route path="/faculty/at-risk" element={<AtRiskStudents />} />
              <Route path="/faculty/reports" element={<Reports />} />
            </Route>
          </Route>

          {/* Parent Portal */}
          <Route element={<ProtectedRoute allowedRole="parent" />}>
            <Route element={<PortalLayout role="parent" />}>
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/parent/progress" element={<ChildProgress />} />
              <Route path="/parent/feedback" element={<RecentFeedback />} />
              <Route path="/parent/notifications" element={<Notifications />} />
              <Route path="/parent/message" element={<MessageFaculty />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}
