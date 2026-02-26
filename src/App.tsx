import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Setup from './pages/Setup';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import Risks from './pages/Risks';
import ActionPlan from './pages/ActionPlan';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import CopsoqConfig from './pages/CopsoqConfig';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        <Route path="/dashboard/setup" element={<DashboardLayout><Setup /></DashboardLayout>} />
        <Route path="/dashboard/campaigns" element={<DashboardLayout><Campaigns /></DashboardLayout>} />
        <Route path="/dashboard/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/dashboard/risks" element={<DashboardLayout><Risks /></DashboardLayout>} />
        <Route path="/dashboard/actions" element={<DashboardLayout><ActionPlan /></DashboardLayout>} />
        <Route path="/dashboard/copsoq-config" element={<DashboardLayout><CopsoqConfig /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
