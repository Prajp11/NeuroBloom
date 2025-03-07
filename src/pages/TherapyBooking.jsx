import React, { useState } from "react";
import "../App.css";
import TherapistList from "../components/TherapistList"; 

const TherapyBooking = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  // Predefined time slots for now
  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

  // Handle therapist selection
  const handleTherapistSelect = (therapist) => {
    setSelectedTherapist(therapist);
    setSelectedDate(""); // Reset when changing therapist
    setSelectedTime("");
    setMessage(""); // Clear message
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
      setMessage("⚠️ Please select a therapist, date, and time slot.");
      return;
    }

    setMessage(`✅ Appointment booked with ${selectedTherapist.name} on ${selectedDate} at ${selectedTime}`);
  };

  return (
    <div className="therapy-booking-container">
      <h2>🧑‍⚕️ Book a Therapy Session</h2>

      {/* ✅ Therapist Selection */}
      <TherapistList onSelectTherapist={handleTherapistSelect} />

      {/* ✅ Show Date Selection Only if Therapist is Chosen */}
      {selectedTherapist && (
        <>
          <h3>Selected Therapist: {selectedTherapist.name}</h3>
          <label>Select Date:</label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </>
      )}

      {/* ✅ Show Time Slots Only if Date is Chosen */}
      {selectedDate && (
        <>
          <h3>Available Time Slots</h3>
          <div className="time-slot-container">
            {timeSlots.map((slot, index) => (
              <button key={index} className={`time-slot-btn ${selectedTime === slot ? "selected" : ""}`} onClick={() => handleTimeSelect(slot)}>
                {slot}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ✅ Confirm Booking Button */}
      <button className="confirm-btn" onClick={confirmBooking}>Confirm Booking</button>

      {/* ✅ Booking Message */}
      {message && <p className="booking-message">{message}</p>}
    </div>
  );
};

export default TherapyBooking;
