import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';

// Import pages from `pages/` folder
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            {/* Home Page - Shows Cards First, Then Carousel */}
            <Route
              path="/"
              element={
                <div>
                  <Home />
                  <Carousel /> {/* Carousel appears below Home page cards */}
                </div>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          {/* Footer Component */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
