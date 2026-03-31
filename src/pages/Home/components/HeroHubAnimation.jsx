import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import {
  FaBrain,
  FaCalendarCheck,
  FaChartLine,
  FaComments,
  FaGamepad,
  FaGraduationCap,
  FaLeaf,
  FaSmile,
} from "react-icons/fa";
import "./HeroHubAnimation.css";

const CX = 200;
const CY = 200;
/* Larger radius than before so tiles clear the center card + each other (was 148 → overlap). */
const R_NODES = 178;
const R_RING_OUT = 195;
const R_RING_IN = 142;

const HUB_FEATURES = [
  { label: "Mood", to: "/mood-tracker", Icon: FaSmile, hue: "blue" },
  { label: "AI Chat", to: "/chat", Icon: FaComments, hue: "violet" },
  { label: "Therapy", to: "/therapy-booking", Icon: FaCalendarCheck, hue: "teal" },
  { label: "CBT", to: "/stress-relief/cbt", Icon: FaBrain, hue: "purple" },
  { label: "Relief", to: "/stress-relief", Icon: FaLeaf, hue: "green" },
  { label: "Learn", to: "/stress-relief/education", Icon: FaGraduationCap, hue: "amber" },
  { label: "Insights", to: "/dashboard", Icon: FaChartLine, hue: "cyan" },
  { label: "Games", to: "/stress-relief/games", Icon: FaGamepad, hue: "rose" },
];

const ACTIVITY = [
  { tone: "ok", title: "Mood check-in", sub: "Logged · calm", time: "2s ago" },
  { tone: "ok", title: "AI session", sub: "Breathing tips saved", time: "12s ago" },
  { tone: "warn", title: "Therapy slot", sub: "Reminder tomorrow 10:00", time: "1m ago" },
  { tone: "ok", title: "CBT exercise", sub: "Thought record completed", time: "3m ago" },
  { tone: "ok", title: "Sleep note", sub: "Journal synced", time: "8m ago" },
];

function hubPoints(count, r) {
  return Array.from({ length: count }, (_, i) => {
    const a = -Math.PI / 2 + (i * (2 * Math.PI)) / count;
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  });
}

export default function HeroHubAnimation() {
  const reduceMotion = useReducedMotion();
  const reactId = useId().replace(/:/g, "");
  const points = useMemo(() => hubPoints(HUB_FEATURES.length, R_NODES), []);
  const [feedOffset, setFeedOffset] = useState(0);
  const hubRootRef = useRef(null);
  const hubStageRef = useRef(null);

  const step = 360 / HUB_FEATURES.length;

  useLayoutEffect(() => {
    const root = hubRootRef.current;
    const stage = hubStageRef.current;
    if (!root || !stage || typeof ResizeObserver === "undefined") return undefined;

    const apply = () => {
      const w = stage.offsetWidth;
      if (!w) return;
      const orbit = (R_NODES / 400) * w;
      const node = Math.round(Math.min(58, Math.max(42, (52 / 400) * w)));
      const coreW = Math.min(232, Math.max(156, (208 / 400) * w));
      const pad = Math.max(12, Math.round(node * 0.65 + 14));
      root.style.setProperty("--hh-orbit", `${orbit}px`);
      root.style.setProperty("--hh-node", `${node}px`);
      root.style.setProperty("--hh-core-w", `${coreW}px`);
      root.style.setProperty("--hh-pad", `${pad}px`);
      /* Slightly slower orbit on narrow stages (tablet / mobile) */
      const dur = w < 320 ? "22s" : w < 400 ? "20s" : "18s";
      root.style.setProperty("--hh-orbit-dur", dur);
    };

    /**
     * ResizeObserver runs during layout; writing custom props on `root` can resize `stage`
     * in the same turn and trigger "ResizeObserver loop completed with undelivered notifications"
     * (e.g. when main content width changes via the sidebar). Defer work to the next frame.
     */
    let rafId = 0;
    const scheduleApply = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        apply();
      });
    };

    apply();
    const ro = new ResizeObserver(() => scheduleApply());
    ro.observe(stage);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setFeedOffset((o) => (o + 1) % ACTIVITY.length), 3800);
    return () => clearInterval(id);
  }, []);

  const visibleActivities = [0, 1, 2].map((k) => ACTIVITY[(feedOffset + k) % ACTIVITY.length]);
  const staticMotion = reduceMotion === true;

  return (
    <div
      ref={hubRootRef}
      className={`hero-hub${staticMotion ? " hero-hub--static" : ""}`}
      aria-label="NeuroBloom feature hub visualization"
    >
      <div ref={hubStageRef} className="hero-hub__stage">
        <div className="hero-hub__grid" aria-hidden />
        <div className="hero-hub__glow hero-hub__glow--a" aria-hidden />
        <div className="hero-hub__glow hero-hub__glow--b" aria-hidden />

        {/* Fade-in wrapper + rotating layer (pause hover only affects spin) */}
        <div className="hero-hub__orbit-fade">
          <div className="hero-hub__orbit-spin">
          <svg className="hero-hub__svg" viewBox="0 0 400 400" aria-hidden preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id={`${reactId}-line`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
              </linearGradient>
              <filter id={`${reactId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle className="hero-hub__orbit" cx={CX} cy={CY} r={R_RING_IN} />
            <circle className="hero-hub__orbit hero-hub__orbit--outer" cx={CX} cy={CY} r={R_RING_OUT} />

            {points.map((p, i) => (
              <line
                key={`ln-${HUB_FEATURES[i].label}`}
                className="hero-hub__connector"
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke={`url(#${reactId}-line)`}
              />
            ))}

            {!staticMotion &&
              points.map((p, i) => {
                const pathD = `M ${CX} ${CY} L ${p.x} ${p.y}`;
                return (
                  <circle
                    key={`pulse-${HUB_FEATURES[i].label}`}
                    className="hero-hub__pulse"
                    r="4"
                    fill="#34d399"
                    opacity="0.95"
                    filter={`url(#${reactId}-glow)`}
                  >
                    <animateMotion
                      dur={`${2.4 + (i % 4) * 0.15}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.28}s`}
                      calcMode="linear"
                      path={pathD}
                    />
                  </circle>
                );
              })}
          </svg>

          {HUB_FEATURES.map((node, i) => {
            const angle = i * step - 90;
            const rad = (-Math.PI / 2 + (i * (2 * Math.PI)) / HUB_FEATURES.length);
            /* Front of orbit (toward bottom of circle) reads slightly larger */
            const depthScale = 0.92 + 0.1 * (1 + Math.sin(rad)) / 2;
            const Icon = node.Icon;
            return (
              <div
                key={node.to}
                className="hero-hub__slot"
                style={{
                  /* rotate(θ) translateY(-r) rotate(-θ) = on the ring but local axes stay upright; parent spin + counter-spin handles motion */
                  transform: `rotate(${angle}deg) translateY(calc(-1 * var(--hh-orbit, 178px))) rotate(${-angle}deg)`,
                }}
              >
                <div className="hero-hub__slot-counter">
                  <div className="hero-hub__slot-depth" style={{ "--hh-tile-depth": String(depthScale) }}>
                    <div className="hero-hub__slot-bob">
                      <Link
                        to={node.to}
                        className={`hero-hub__node hero-hub__node--${node.hue}`}
                        title={`Open ${node.label}`}
                      >
                        <Icon className="hero-hub__node-icon" aria-hidden />
                        <span className="hero-hub__node-label">{node.label}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        <div className="hero-hub__core-glow" aria-hidden />
        <div className="hero-hub__core">
          <div className="hero-hub__core-head">
            <div className="hero-hub__core-brand">
              <span className="hero-hub__core-logo" aria-hidden>
                <FaBrain />
              </span>
              <div>
                <span className="hero-hub__core-title">NeuroBloom</span>
                <span className="hero-hub__core-tag">Wellness hub</span>
              </div>
            </div>
            <span className="hero-hub__live">
              <span className="hero-hub__live-dot" aria-hidden />
              Live
            </span>
          </div>
          <ul className="hero-hub__feed">
            {visibleActivities.map((row, idx) => (
              <li
                key={`${row.title}-${feedOffset}-${idx}`}
                className={`hero-hub__feed-row hero-hub__feed-row--${row.tone}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <span className="hero-hub__feed-icon" aria-hidden>
                  {row.tone === "ok" ? "✓" : "!"}
                </span>
                <div className="hero-hub__feed-copy">
                  <span className="hero-hub__feed-title">{row.title}</span>
                  <span className="hero-hub__feed-sub">{row.sub}</span>
                </div>
                <span className="hero-hub__feed-time">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
