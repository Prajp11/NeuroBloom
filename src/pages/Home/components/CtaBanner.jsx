import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import "./CtaBanner.css";

export default function CtaBanner({ onGetStarted }) {
  const btnRef = useRef(null);

  const addRipple = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "home-cta__ripple";
    const size = Math.max(rect.width, rect.height);
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }, []);

  return (
    <section className="home-cta" aria-labelledby="home-cta-title">
      <div className="home-cta__blobs" aria-hidden>
        <span className="home-cta__blob home-cta__blob--a" />
        <span className="home-cta__blob home-cta__blob--b" />
        <span className="home-cta__blob home-cta__blob--c" />
      </div>
      <div className="home-cta__noise" aria-hidden />

      <motion.div
        className="home-cta__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="home-cta__eyebrow">Start in minutes</p>
        <h2 id="home-cta-title" className="home-cta__title">
          Ready to invest in how you feel?
        </h2>
        <p className="home-cta__desc">
          Join a calm, modern space built for real life—private support, structured tools, and progress you can see.
        </p>
        <button
          type="button"
          ref={btnRef}
          className="home-cta__btn"
          onClick={(e) => {
            addRipple(e);
            onGetStarted?.();
          }}
        >
          <span>Get started today</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
