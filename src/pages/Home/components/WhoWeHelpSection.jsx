import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import individual from "../../../Images/Home/individual.png";
import healthcare from "../../../Images/Home/healthcare.png";
import organizations from "../../../Images/Home/organizations.png";
import caregivers from "../../../Images/Home/caregivers.png";
import "./WhoWeHelpSection.css";

const audiences = [
  {
    id: "individuals",
    label: "Individuals",
    headline: "Personal wellbeing, on your terms",
    copy: "Private journaling, mood trends, and AI support that meets you where you are—without judgment.",
    img: individual,
  },
  {
    id: "healthcare",
    label: "Healthcare providers",
    headline: "Tools that complement clinical care",
    copy: "Structured resources and engagement that extend your impact between sessions.",
    img: healthcare,
  },
  {
    id: "organizations",
    label: "Organizations",
    headline: "Scalable wellness for teams",
    copy: "Calm, consistent experiences that reduce stigma and improve utilization.",
    img: organizations,
  },
  {
    id: "caregivers",
    label: "Caregivers",
    headline: "Support for those who support others",
    copy: "Guided exercises and relief moments so you can recharge and stay present.",
    img: caregivers,
  },
];

export default function WhoWeHelpSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="home-who" aria-labelledby="home-who-title">
      <div className="home-who__header">
        <motion.h2
          id="home-who-title"
          className="home-who__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45 }}
        >
          Who we <span className="home-who__title-accent">help</span>
        </motion.h2>
        <motion.p
          className="home-who__subtitle"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Tailored mental health experiences for the people who keep our communities running.
        </motion.p>
      </div>

      <div className="home-who__tabs" role="tablist" aria-label="Audience">
        {audiences.map((a, i) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            id={`tab-${a.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${a.id}`}
            className={`home-who__tab${active === i ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="home-who__panel-wrap">
        <AnimatePresence mode="wait">
          <motion.article
            key={audiences[active].id}
            id={`panel-${audiences[active].id}`}
            role="tabpanel"
            aria-labelledby={`tab-${audiences[active].id}`}
            className="home-who__panel"
            initial={{ opacity: 0, y: 16, rotateX: -6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -12, rotateX: 6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="home-who__visual">
              <motion.img
                src={audiences[active].img}
                alt=""
                className="home-who__img"
                loading="lazy"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />
              <div className="home-who__visual-ring" aria-hidden />
            </div>
            <div className="home-who__copy">
              <h3 className="home-who__headline">{audiences[active].headline}</h3>
              <p className="home-who__text">{audiences[active].copy}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
