import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import HeroHubAnimation from "./HeroHubAnimation";
import "./HeroSection.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection({ onPrimaryCta, onSecondaryHint }) {
  const rippleRef = useRef(null);

  const addRipple = useCallback((e) => {
    const btn = rippleRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "home-hero__ripple";
    const size = Math.max(rect.width, rect.height);
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }, []);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__bg">
        <div className="home-hero__mesh" />
        <div className="home-hero__noise" />
        <div className="home-hero__particles" aria-hidden />
      </div>

      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <motion.div
            className="home-hero__eyebrow"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="home-hero__eyebrow-dot" />
            NeuroBloom
          </motion.div>

          <motion.h1 id="home-hero-title" className="home-hero__title" custom={1} variants={fadeUp} initial="hidden" animate="visible">
            Your trusted{" "}
            <span className="home-hero__hl-companion">Mental Health Companion</span>
          </motion.h1>

          <motion.p className="home-hero__desc" custom={2} variants={fadeUp} initial="hidden" animate="visible">
            Empowering mental well-being through AI-guided support, calm design, and tools that scale with you—from first
            check-in to lasting habits.
          </motion.p>

          <motion.div className="home-hero__actions" custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <button
              type="button"
              ref={rippleRef}
              className="home-hero__cta home-hero__cta--primary"
              onClick={(e) => {
                addRipple(e);
                onPrimaryCta?.();
              }}
            >
              <span>Get started</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </button>
            <button type="button" className="home-hero__cta home-hero__cta--ghost" onClick={() => onSecondaryHint?.()}>
              See how it works
            </button>
          </motion.div>

          <motion.ul className="home-hero__stats" custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <li className="home-hero__stat">
              <span className="home-hero__stat-k">24/7</span>
              <span className="home-hero__stat-v">Always-on support</span>
            </li>
            <li className="home-hero__stat">
              <span className="home-hero__stat-k">Private</span>
              <span className="home-hero__stat-v">Secure by design</span>
            </li>
            <li className="home-hero__stat">
              <span className="home-hero__stat-k">Guided</span>
              <span className="home-hero__stat-v">CBT &amp; mood tools</span>
            </li>
          </motion.ul>
        </div>

        <motion.div
          className="home-hero__art"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <HeroHubAnimation />
        </motion.div>
      </div>
    </section>
  );
}
