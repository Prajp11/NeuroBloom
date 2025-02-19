import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
