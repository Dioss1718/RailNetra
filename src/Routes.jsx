import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LiveMapPage from './pages/live-map';
import Simulation from './pages/simulation';
import CorridorNegotiation from './pages/corridor-negotiation';
import AISuggestions from './pages/ai-suggestions';
import Dashboard from './pages/dashboard';
import ScheduleManagement from './pages/schedule-management';
import DailyReports from './pages/reports/DailyReports';
import AddTrain from './pages/trains/AddTrain';
import ScheduleChanges from './pages/schedule-changes';
import ReportIncident from './pages/incidents/ReportIncident';
import Broadcast from './pages/broadcast';
import Maintenance from './pages/maintenance';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AISuggestions />} />
        <Route path="/live-map" element={<LiveMapPage />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/corridor-negotiation" element={<CorridorNegotiation />} />
        <Route path="/ai-suggestions" element={<AISuggestions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule-management" element={<ScheduleManagement />} />
        <Route path="/reports/daily" element={<DailyReports />} />
        <Route path="/trains/add" element={<AddTrain />} />
        <Route path="/schedule-changes" element={<ScheduleChanges />} />
        <Route path="/incidents/report" element={<ReportIncident />} />
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
