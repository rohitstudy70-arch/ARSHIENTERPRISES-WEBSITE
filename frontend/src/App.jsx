import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApprovedStatesPage from './pages/ApprovedStatesPage';
import AboutUsPage from './pages/AboutUsPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0630] text-white selection:bg-[#e3ab84] selection:text-[#1a0f40] flex flex-col justify-between">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/approved-states" element={<ApprovedStatesPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
