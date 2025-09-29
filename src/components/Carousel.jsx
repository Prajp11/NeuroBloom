import React, { useEffect, useRef } from 'react';
import individual from '../Images/Home/individual.png';
import healthcare from '../Images/Home/healthcare.png';
import organizations from '../Images/Home/organizations.png';
import caregivers from '../Images/Home/caregivers.png';

const carouselImages = [
  { img: individual, label: 'Individuals with Mental Health Issues' },
  { img: healthcare, label: 'Healthcare Providers' },
  { img: organizations, label: 'Organizations' },
  { img: caregivers, label: 'Caregivers' },
];

const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1.5;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20); // Smoother animation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-section modern-carousel">
      <div className="carousel-header">
        <h2 className="carousel-heading">
          <span className="heading-accent">Who We're</span>
          <span className="heading-primary"> Empowering</span>
        </h2>
        <p className="carousel-subtitle">Supporting diverse communities with tailored mental health solutions</p>
      </div>
      
      <div className="carousel-container">
        <div className="carousel-track" ref={carouselRef}>
          {[...carouselImages, ...carouselImages].map((item, index) => (
            <div key={`carousel-item-${index}-${item.label.replace(/\s+/g, '-').toLowerCase()}`} className="carousel-item modern-carousel-item">
              <div className="carousel-item-inner">
                <div className="carousel-image-container">
                  <img src={item.img} alt={item.label} className="carousel-img" />
                  <div className="image-overlay"></div>
                </div>
                <div className="carousel-content">
                  <h3 className="carousel-label">{item.label}</h3>
                  <div className="carousel-accent-line"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
