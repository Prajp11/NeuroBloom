import React from "react";
import "../App.css"; // Styling will be in App.css

const therapists = [
  {
    id: 1,
    name: "Dr. Somya",
    specialization: "Cognitive Behavioral Therapy",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Dr. Prajwal",
    specialization: "Mindfulness Therapy",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Dr. Archin",
    specialization: "Depression & Anxiety",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Dr. Vivek",
    specialization: "Stress Management",
    image: "https://via.placeholder.com/150",
  },
];

const TherapistList = ({ onSelectTherapist }) => {
  return (
    <div className="therapist-list-container">
      <h2>Select a Therapist</h2>
      <div className="therapist-grid">
        {therapists.map((therapist) => (
          <div key={therapist.id} className="therapist-card">
            <img src={therapist.image} alt={therapist.name} />
            <h3>{therapist.name}</h3>
            <p>{therapist.specialization}</p>
            <button onClick={() => onSelectTherapist(therapist)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistList;
