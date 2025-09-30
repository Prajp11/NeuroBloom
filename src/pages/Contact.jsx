import React, { useState } from "react";
import { FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaUser, FaPaperPlane, FaHeart } from "react-icons/fa";
import "../App.css"; // Ensure styles are applied

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Form submission logic can be added here
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-brand-intro">
            <div className="contact-brand-icon">
              <FaEnvelope />
            </div>
            <h1 className="contact-title">
              Get in <span className="brand-gradient">Touch</span>
            </h1>
          </div>
          <p className="contact-subtitle">
            We're here to help you on your mental health journey. Reach out to us for support, 
            inquiries, or feedback - we'd love to hear from you.
          </p>
          <div className="contact-mission-highlight">
            <FaHeart className="mission-icon" />
            <span>Your wellness is our priority</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-content-grid">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2 className="section-title">Contact Information</h2>
              <p className="section-subtitle">
                Multiple ways to connect with our support team
              </p>
              
              <div className="contact-info-cards">
                <div className="info-card">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <h3>Email Us</h3>
                    <p>support@neurobloom.com</p>
                    <span className="info-detail">We respond within 24 hours</span>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567</p>
                    <span className="info-detail">Mon-Fri, 9AM-6PM EST</span>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-content">
                    <h3>Visit Us</h3>
                    <p>123 Wellness Street</p>
                    <span className="info-detail">New York, NY 10001</span>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <h3>Support Hours</h3>
                    <p>24/7 AI Support</p>
                    <span className="info-detail">Live chat always available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              {submitted ? (
                <div className="success-message-container">
                  <div className="success-animation">
                    <FaCheckCircle className="success-icon" />
                  </div>
                  <h3 className="success-title">Message Sent Successfully!</h3>
                  <p className="success-description">
                    Thank you for reaching out to us. Our team will review your message 
                    and get back to you within 24 hours.
                  </p>
                  <div className="success-actions">
                    <button 
                      className="success-btn" 
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-container">
                  <h2 className="form-title">Send us a Message</h2>
                  <p className="form-subtitle">
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                  
                  <form onSubmit={handleSubmit} className="modern-contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          <FaUser className="label-icon" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          <FaEnvelope className="label-icon" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        <FaPaperPlane className="label-icon" />
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you on your mental health journey..."
                        className="form-textarea"
                        rows="6"
                        required
                      />
                    </div>

                    <button type="submit" className="form-submit-btn">
                      <span>Send Message</span>
                      <FaPaperPlane className="btn-icon" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
