import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamic Year

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <h4>Mental Health Companion</h4>
          <p>
            Supporting mental wellness with AI-powered therapy, self-assessments, and personalized care.
          </p>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/About">About Us</a></li>
            <li><a href="/Contact Us">Contact Us</a></li>
            <li><a href="/Privacy">Privacy Policy</a></li>
            <li><a href="/Terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Email: mentalhealthsupport@gmail.com</p>
          <p>Phone: +91 7378570635</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Mental Health Companion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
