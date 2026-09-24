import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/apex/Home';
import ServicesPage from './components/apex/ServicesPage';
import ServiceDetail from './components/apex/ServiceDetail';
import AboutPage from './components/apex/AboutPage';
import ContactPage from './components/apex/ContactPage';
import FAQPage from './components/apex/FAQPage';
import PrivacyPage from './components/apex/PrivacyPage';
import TermsPage from './components/apex/TermsPage';

function App() {
  return (
    <div className="antialiased text-ink bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
