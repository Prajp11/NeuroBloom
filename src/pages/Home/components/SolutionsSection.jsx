import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiLayers, FiShield } from "react-icons/fi";
import "./SolutionsSection.css";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ feature, index, onLearnMore }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      className="home-feature-card"
      data-index={index}
      variants={item}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="home-feature-card__header">
        <div className="home-feature-card__icon-wrap">
          <div className={`home-feature-card__skeleton${loaded ? " is-hidden" : ""}`} aria-hidden />
          <img
            src={feature.image}
            alt=""
            className={`home-feature-card__img${loaded ? " is-visible" : ""}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
      <div className="home-feature-card__body">
        <h3 className="home-feature-card__title">{feature.title}</h3>
        <p className="home-feature-card__info">{feature.info}</p>
        <button type="button" className="home-feature-card__more" onClick={() => onLearnMore(feature)}>
          Learn more
          <span className="home-feature-card__more-arrow" aria-hidden>
            →
          </span>
        </button>
      </div>
    </motion.article>
  );
}

export default function SolutionsSection({ features, onLearnMore }) {
  return (
    <section className="home-solutions" aria-labelledby="home-solutions-title">
      <div className="home-solutions__divider-wrap" aria-hidden>
        <motion.div
          className="home-solutions__divider-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="home-solutions__intro">
        <motion.div
          className="home-solutions__pill-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <span className="home-solutions__pill">
            <FiLayers aria-hidden />
            Suite
          </span>
          <span className="home-solutions__pill">
            <FiActivity aria-hidden />
            Outcomes
          </span>
          <span className="home-solutions__pill">
            <FiShield aria-hidden />
            Privacy
          </span>
        </motion.div>

        <motion.h2
          id="home-solutions-title"
          className="home-solutions__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Comprehensive mental health solutions
        </motion.h2>
        <motion.p
          className="home-solutions__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Professional-grade tools with a calm interface—so you can focus on feeling better, not figuring out software.
        </motion.p>
      </div>

      <motion.div
        className="home-solutions__grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} onLearnMore={onLearnMore} />
        ))}
      </motion.div>
    </section>
  );
}
