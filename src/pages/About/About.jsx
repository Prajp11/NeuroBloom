import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./About.css";
import "../../styles/saas-shared.css";
import {
  FaBrain,
  FaRobot,
  FaSmile,
  FaHandsHelping,
  FaHeart,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import therapyImg from "../../Images/AboutImages/therapy.png";
import cbtImg from "../../Images/AboutImages/cbt.png";
import moodImg from "../../Images/AboutImages/mood-tracking.png";
import supportImg from "../../Images/AboutImages/support-group.png";

const easeOut = [0.22, 1, 0.36, 1];

const fadeContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const About = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/signup");
  };

  const handleLearnMore = () => {
    navigate("/contact");
  };

  return (
    <div className="about-page nb-noise">
      <section className="about-hero" aria-label="About NeuroBloom">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="about-brand-intro">
            <div className="about-brand-icon" aria-hidden>
              🧠
            </div>
            <h1 className="about-title">
              Welcome to <span className="brand-gradient">NeuroBloom</span>
            </h1>
          </div>
          <p className="about-subtitle">
            Revolutionizing mental health through AI-powered innovation, compassionate care,
            and evidence-based therapeutic approaches.
          </p>
          <div className="about-mission-highlight">
            <FaHeart className="mission-icon" aria-hidden />
            <span>Empowering minds, one connection at a time</span>
          </div>
        </motion.div>
      </section>

      <section className="about-stats" aria-label="Platform highlights">
        <motion.div
          className="stats-container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-48px" }}
          variants={fadeContainer}
        >
          <motion.div className="stat-card" variants={fadeItem}>
            <FaClock className="stat-icon" aria-hidden />
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available support</div>
          </motion.div>
          <motion.div className="stat-card" variants={fadeItem}>
            <FaShieldAlt className="stat-icon" aria-hidden />
            <div className="stat-number">100%</div>
            <div className="stat-label">Privacy protected</div>
          </motion.div>
          <motion.div className="stat-card" variants={fadeItem}>
            <FaBrain className="stat-icon" aria-hidden />
            <div className="stat-number">AI</div>
            <div className="stat-label">Powered technology</div>
          </motion.div>
          <motion.div className="stat-card" variants={fadeItem}>
            <FaHeart className="stat-icon" aria-hidden />
            <div className="stat-number">Free</div>
            <div className="stat-label">Mental health support</div>
          </motion.div>
        </motion.div>
      </section>

      <section className="about-features" aria-labelledby="about-features-heading">
        <div className="about-container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeContainer}
          >
            <motion.h2 className="section-title" id="about-features-heading" variants={fadeItem}>
              Our core features
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeItem}>
              Comprehensive mental health tools powered by thoughtful AI and clinical best practices.
            </motion.p>

            <motion.div className="modern-features-grid" variants={fadeContainer}>
              <motion.article className="modern-feature-card" variants={fadeItem}>
                <div className="card-header">
                  <div className="card-image-wrapper">
                    <img src={therapyImg} alt="" className="card-image" />
                    <div className="card-icon-overlay">
                      <FaRobot className="card-icon" aria-hidden />
                    </div>
                  </div>
                  <div className="card-badge primary">24/7 available</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">AI-powered therapy</h3>
                  <p className="card-description">
                    Experience personalized therapeutic conversations with our advanced AI companion. Get
                    instant support, guided exercises, and evidence-based mental health insights anytime,
                    anywhere.
                  </p>
                  <div className="card-features">
                    <span className="feature-item">
                      <FaRobot className="feature-icon" aria-hidden />
                      Instant response
                    </span>
                    <span className="feature-item">
                      <FaHeart className="feature-icon" aria-hidden />
                      Personalized care
                    </span>
                    <span className="feature-item">
                      <FaShieldAlt className="feature-icon" aria-hidden />
                      Privacy protected
                    </span>
                  </div>
                </div>
              </motion.article>

              <motion.article className="modern-feature-card" variants={fadeItem}>
                <div className="card-header">
                  <div className="card-image-wrapper">
                    <img src={cbtImg} alt="" className="card-image" />
                    <div className="card-icon-overlay">
                      <FaBrain className="card-icon" aria-hidden />
                    </div>
                  </div>
                  <div className="card-badge secondary">Evidence-based</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">Cognitive behavioral therapy</h3>
                  <p className="card-description">
                    Transform negative thought patterns with proven CBT methodologies. Our interactive
                    exercises help you build resilience and develop healthy coping strategies.
                  </p>
                  <div className="card-features">
                    <span className="feature-item">
                      <FaBrain className="feature-icon" aria-hidden />
                      Thought reframing
                    </span>
                    <span className="feature-item">
                      <FaHeart className="feature-icon" aria-hidden />
                      Behavioral change
                    </span>
                    <span className="feature-item">
                      <FaClock className="feature-icon" aria-hidden />
                      Progress tracking
                    </span>
                  </div>
                </div>
              </motion.article>

              <motion.article className="modern-feature-card" variants={fadeItem}>
                <div className="card-header">
                  <div className="card-image-wrapper">
                    <img src={moodImg} alt="" className="card-image" />
                    <div className="card-icon-overlay">
                      <FaSmile className="card-icon" aria-hidden />
                    </div>
                  </div>
                  <div className="card-badge tertiary">AI analytics</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">Smart mood tracking</h3>
                  <p className="card-description">
                    Monitor your emotional patterns with intelligent tracking. Gain valuable insights into
                    your mental health journey with clear analytics and personalized recommendations.
                  </p>
                  <div className="card-features">
                    <span className="feature-item">
                      <FaSmile className="feature-icon" aria-hidden />
                      Pattern recognition
                    </span>
                    <span className="feature-item">
                      <FaBrain className="feature-icon" aria-hidden />
                      Trend analysis
                    </span>
                    <span className="feature-item">
                      <FaHeart className="feature-icon" aria-hidden />
                      Wellness insights
                    </span>
                  </div>
                </div>
              </motion.article>

              <motion.article className="modern-feature-card" variants={fadeItem}>
                <div className="card-header">
                  <div className="card-image-wrapper">
                    <img src={supportImg} alt="" className="card-image" />
                    <div className="card-icon-overlay">
                      <FaHandsHelping className="card-icon" aria-hidden />
                    </div>
                  </div>
                  <div className="card-badge quaternary">Professional led</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">Community support</h3>
                  <p className="card-description">
                    Join supportive communities and connect with licensed mental health professionals.
                    Experience shared healing and expert guidance in a safe environment.
                  </p>
                  <div className="card-features">
                    <span className="feature-item">
                      <FaHandsHelping className="feature-icon" aria-hidden />
                      Peer support
                    </span>
                    <span className="feature-item">
                      <FaShieldAlt className="feature-icon" aria-hidden />
                      Expert guidance
                    </span>
                    <span className="feature-item">
                      <FaHeart className="feature-icon" aria-hidden />
                      Safe space
                    </span>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="about-mission" aria-labelledby="about-mission-heading">
        <div className="mission-container">
          <motion.div
            className="mission-content"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeContainer}
          >
            <motion.div variants={fadeItem}>
              <FaShieldAlt className="mission-shield" aria-hidden />
            </motion.div>
            <motion.h2 id="about-mission-heading" variants={fadeItem}>
              Our mission
            </motion.h2>
            <motion.p variants={fadeItem}>
              At <strong>NeuroBloom</strong>, we&apos;re committed to democratizing mental health care
              through innovative AI technology and compassionate human connection. We believe everyone
              deserves access to quality mental health support, regardless of location, time, or
              circumstances.
            </motion.p>
            <motion.div className="mission-values" variants={fadeContainer}>
              <motion.div className="value-item" variants={fadeItem}>
                <span className="value-icon" aria-hidden>
                  🌟
                </span>
                <span>Excellence in care</span>
              </motion.div>
              <motion.div className="value-item" variants={fadeItem}>
                <span className="value-icon" aria-hidden>
                  🔒
                </span>
                <span>Privacy &amp; security</span>
              </motion.div>
              <motion.div className="value-item" variants={fadeItem}>
                <span className="value-icon" aria-hidden>
                  🤝
                </span>
                <span>Inclusive community</span>
              </motion.div>
              <motion.div className="value-item" variants={fadeItem}>
                <span className="value-icon" aria-hidden>
                  📈
                </span>
                <span>Continuous innovation</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="about-cta" aria-label="Get started">
        <motion.div
          className="cta-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeContainer}
        >
          <motion.h2 variants={fadeItem}>Ready to begin your journey?</motion.h2>
          <motion.p variants={fadeItem}>
            Join thousands of users who have transformed their mental wellness with NeuroBloom.
          </motion.p>
          <motion.div className="cta-buttons" variants={fadeItem}>
            <button type="button" className="cta-primary" onClick={handleStartJourney}>
              Start your journey
            </button>
            <button type="button" className="cta-secondary" onClick={handleLearnMore}>
              Learn more
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
