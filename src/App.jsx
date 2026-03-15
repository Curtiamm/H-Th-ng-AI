import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import LookupPage from './pages/LookupPage';
import DashboardPage from './pages/DashboardPage';
import OrientationPage from './pages/OrientationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/lookup" element={<LookupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orientation" element={<OrientationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
