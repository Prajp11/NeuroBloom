import React from "react";
import "../App.css";
import somyaImage from "../Images/TherapyBooking/Somya.jpg";
import prajwalImage from "../Images/TherapyBooking/Prajwal.png";
import archinImage from "../Images/TherapyBooking/Archin.jpg";
import vivekImage from "../Images/TherapyBooking/Vivek.png";

const therapists = [
  {
    id: 1,
    name: "Dr. Somya",
    specialization: "Cognitive Behavioral Therapy",
    image: somyaImage,
    rating: 4.5,
    description:
      "Dr. Somya helps individuals overcome negative thought patterns using CBT techniques. With over 8 years of experience, she specializes in emotional regulation and thought restructuring.",
    experience: "8+ years",
    availability: "Mon - Fri"
  },
  {
    id: 2,
    name: "Dr. Prajwal",
    specialization: "Mindfulness Therapy",
    image: prajwalImage,
    rating: 4.8,
    description:
      "Dr. Prajwal guides clients through mindful awareness to reduce stress and anxiety. He blends meditation with cognitive strategies to improve daily mental clarity.",
    experience: "10+ years",
    availability: "Mon - Sat"
  },
  {
    id: 3,
    name: "Dr. Archin",
    specialization: "Depression & Anxiety",
    image: archinImage,
    rating: 4.2,
    description:
      "Dr. Archin offers compassionate support for individuals facing depression and anxiety. His approach includes personalized therapy plans and behavioral techniques.",
    experience: "6+ years",
    availability: "Tue - Sat"
  },
  {
    id: 4,
    name: "Dr. Vivek",
    specialization: "Stress Management",
    image: vivekImage,
    rating: 4.7,
    description:
      "With a calm demeanor and practical strategies, Dr. Vivek empowers people to manage stress and build resilience. He's known for his motivational sessions and lifestyle tips.",
    experience: "12+ years",
    availability: "Mon - Fri"
  },
];

const TherapistList = ({ onSelectTherapist, selectedId }) => {
  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (halfStar) stars.push("☆");
    while (stars.length < 5) stars.push("☆");
    return stars.join("");
  };

  return (
    <div className="modern-therapist-section">
      <div className="therapist-section-header">
        <h2>Meet Our Experts</h2>
        <p>Choose from our team of experienced mental health professionals</p>
      </div>
      
      <div className="therapist-grid-modern">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className={`therapist-card-modern ${
              selectedId === therapist.id ? "selected" : ""
            }`}
          >
            <div className="therapist-card-header">
              <div className="therapist-image-container">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="therapist-image"
                />
                {selectedId === therapist.id && (
                  <div className="selected-badge">
                    <span>✓</span>
                  </div>
                )}
              </div>
              <div className="therapist-badge">
                <span>{therapist.experience}</span>
              </div>
            </div>

            <div className="therapist-card-body">
              <h3 className="therapist-name">{therapist.name}</h3>
              <p className="therapist-specialization">{therapist.specialization}</p>
              
              <div className="therapist-meta">
                <div className="therapist-rating-display">
                  <span className="stars">{getStars(therapist.rating)}</span>
                  <span className="rating-number">({therapist.rating})</span>
                </div>
                <div className="therapist-availability">
                  <span className="availability-icon">📅</span>
                  <span>{therapist.availability}</span>
                </div>
              </div>

              <p className="therapist-description">{therapist.description}</p>
            </div>

            <div className="therapist-card-footer">
              <button
                onClick={() => onSelectTherapist(therapist)}
                className="book-therapist-btn"
              >
                {selectedId === therapist.id ? (
                  <>
                    <span>Selected</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Book Now</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistList;