import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Toast from "../../components/Toast/Toast";
import HeroSection from "./components/HeroSection";
import SolutionsSection from "./components/SolutionsSection";
import CtaBanner from "./components/CtaBanner";
import WhoWeHelpSection from "./components/WhoWeHelpSection";
import { GetStartedModal, FeatureDetailModal } from "./components/HomeModals";
import { homeFeatures } from "./data/homeFeatures";
import "./Home.css";

export default function Home() {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [featureModal, setFeatureModal] = useState({ open: false, feature: null });
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const openGetStarted = useCallback(() => {
    setShowGetStarted(true);
    showToast("Choose log in or sign up to continue.");
  }, [showToast]);

  const scrollToSolutions = useCallback(() => {
    document.getElementById("home-solutions-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Explore our tools below.");
  }, [showToast]);

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <HeroSection onPrimaryCta={openGetStarted} onSecondaryHint={scrollToSolutions} />
      <SolutionsSection features={homeFeatures} onLearnMore={(f) => setFeatureModal({ open: true, feature: f })} />
      <CtaBanner onGetStarted={openGetStarted} />
      <WhoWeHelpSection />

      <GetStartedModal open={showGetStarted} onClose={() => setShowGetStarted(false)} />
      <FeatureDetailModal
        open={featureModal.open}
        feature={featureModal.feature}
        onClose={() => setFeatureModal({ open: false, feature: null })}
      />

      <Toast message={toast.message} visible={toast.visible} onDismiss={() => setToast((t) => ({ ...t, visible: false }))} />
    </motion.div>
  );
}
