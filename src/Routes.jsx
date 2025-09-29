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
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
