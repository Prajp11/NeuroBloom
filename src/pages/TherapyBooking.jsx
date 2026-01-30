import React, { useState } from "react";
import "../App.css";
import TherapistList from "../components/TherapistList"; 

const TherapyBooking = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Predefined time slots for now
  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

  // Handle therapist selection with toggle
  const handleTherapistSelect = (therapist) => {
    // Toggle: if same therapist is clicked, deselect
    if (selectedTherapist?.id === therapist.id) {
      setSelectedTherapist(null);
      setSelectedDate("");
      setSelectedTime("");
      setMessage("");
      setShowSuccess(false);
    } else {
      setSelectedTherapist(therapist);
      setSelectedDate(""); // Reset when changing therapist
      setSelectedTime("");
      setMessage(""); // Clear message
      setShowSuccess(false);
    }
  };

  // Handle date selection
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTime("");
  };

  // Handle time selection
  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
  };

  // Confirm Booking
  const confirmBooking = () => {
    if (!selectedTherapist || !selectedDate || !selectedTime) {
      setMessage("Please select a therapist, date, and time slot.");
      setShowSuccess(false);
      return;
    }

    setMessage(`Appointment booked with ${selectedTherapist.name} on ${selectedDate} at ${selectedTime}`);
    setShowSuccess(true);
  };

  // Get minimum date (today)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="therapy-booking-page">
      {/* Hero Section */}
      <div className="therapy-hero">
        <div className="therapy-hero-content">
          <div className="therapy-brand-icon">🧑‍⚕️</div>
          <h1 className="therapy-hero-title">Book a Therapy Session</h1>
          <p className="therapy-hero-subtitle">
            Connect with experienced mental health professionals who care about your well-being
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="therapy-main-content">
        {/* Therapist Selection */}
        <TherapistList onSelectTherapist={handleTherapistSelect} selectedId={selectedTherapist?.id} />

        {/* Booking Form Section */}
        {selectedTherapist && (
          <div className="booking-form-section">
            <div className="booking-form-container">
              <div className="selected-therapist-card">
                <div className="selected-therapist-avatar">
                  <img src={selectedTherapist.image} alt={selectedTherapist.name} />
                </div>
                <div className="selected-therapist-info">
                  <h3>{selectedTherapist.name}</h3>
                  <p>{selectedTherapist.specialization}</p>
                  <div className="therapist-rating">
                    <span className="stars">★★★★☆</span>
                    <span className="rating-value">{selectedTherapist.rating}</span>
                  </div>
                </div>
              </div>

              <div className="booking-form">
                <div className="form-section">
                  <label className="modern-label">
                    <span className="label-icon">📅</span>
                    <span>Select Date</span>
                  </label>
                  <input 
                    type="date" 
                    className="modern-date-input"
                    value={selectedDate} 
                    onChange={handleDateChange}
                    min={getTodayDate()}
                  />
                </div>

                {selectedDate && (
                  <div className="form-section time-slots-section">
                    <label className="modern-label">
                      <span className="label-icon">⏰</span>
                      <span>Available Time Slots</span>
                    </label>
                    <div className="time-slots-grid">
                      {timeSlots.map((slot, index) => (
                        <button 
                          key={index} 
                          className={`modern-time-slot ${selectedTime === slot ? "selected" : ""}`} 
                          onClick={() => handleTimeSelect(slot)}
                        >
                          <span className="time-icon">🕐</span>
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <div className="booking-summary">
                    <h4>Booking Summary</h4>
                    <div className="summary-details">
                      <div className="summary-item">
                        <span className="summary-label">Therapist:</span>
                        <span className="summary-value">{selectedTherapist.name}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Date:</span>
                        <span className="summary-value">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Time:</span>
                        <span className="summary-value">{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button className="modern-confirm-btn" onClick={confirmBooking}>
                  <span>Confirm Booking</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </button>

                {message && (
                  <div className={`booking-notification ${showSuccess ? 'success' : 'error'}`}>
                    <span className="notification-icon">{showSuccess ? '✓' : '⚠'}</span>
                    <p>{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapyBooking;
