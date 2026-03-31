import React from "react";
import { Link } from "react-router-dom";
import "./HomeModals.css";

export function GetStartedModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="home-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="home-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-modal-get-started-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="home-modal-get-started-title" className="home-modal__title">
          Get started
        </h2>
        <p className="home-modal__text">Choose an option to continue.</p>
        <div className="home-modal__actions">
          <Link to="/login" className="home-modal__btn home-modal__btn--primary">
            Log in
          </Link>
          <Link to="/signup" className="home-modal__btn home-modal__btn--accent">
            Create account
          </Link>
        </div>
        <button type="button" className="home-modal__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export function FeatureDetailModal({ open, feature, onClose }) {
  if (!open || !feature) return null;

  return (
    <div className="home-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="home-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-modal-feature-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="home-modal-feature-title" className="home-modal__title">
          {feature.learnMore.heading}
        </h2>
        <p className="home-modal__text home-modal__text--left">{feature.learnMore.details}</p>
        <button type="button" className="home-modal__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
