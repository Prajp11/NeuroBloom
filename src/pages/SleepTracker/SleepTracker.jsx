import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  FaMoon, FaBed, FaClock, FaCheck, FaTimes, FaTrash,
  FaChevronDown, FaChevronUp, FaInbox,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { apiJson } from "../../api/client";
import "./SleepTracker.css";
import "../../styles/saas-shared.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const easeOut = [0.22, 1, 0.36, 1];

// ── Helpers ──────────────────────────────────────────────────────
function authHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function toApiDateTime(str) {
  if (!str) return str;
  return str.length === 16 ? `${str}:00` : str;
}

function computeDuration(bedtime, wakeTime) {
  if (!bedtime || !wakeTime) return null;
  const diff = (new Date(wakeTime) - new Date(bedtime)) / 3_600_000;
  if (diff <= 0 || diff > 24) return null;
  const h = Math.floor(diff);
  const m = Math.round((diff - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function qualityColor(q) {
  if (!q) return "rgba(100,116,139,0.6)";
  if (q <= 2) return "#ef4444";
  if (q === 3) return "#f59e0b";
  return "#22c55e";
}

function qualityBarColor(q) {
  if (!q) return "rgba(100,116,139,0.15)";
  if (q <= 2) return "rgba(239,68,68,0.75)";
  if (q === 3) return "rgba(245,158,11,0.75)";
  return "rgba(34,197,94,0.75)";
}

function qualityStars(rating) {
  if (!rating) return "—";
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function formatChartDate(dateStr) {
  if (!dateStr) return "";
  const [, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}`;
}

function formatTime(isoStr) {
  if (!isoStr) return "—";
  return new Date(isoStr).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });
}

function formatEntryDate(isoStr) {
  if (!isoStr) return "—";
  return new Date(isoStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

const QUALITY_OPTIONS = [
  { value: 1, emoji: "😴", label: "Poor"  },
  { value: 2, emoji: "😞", label: "Fair"  },
  { value: 3, emoji: "😐", label: "Okay"  },
  { value: 4, emoji: "😊", label: "Good"  },
  { value: 5, emoji: "😄", label: "Great" },
];

const RANGE_OPTIONS = [7, 14, 30];

// Inline Chart.js plugin — draws the "8h goal" reference line
const recommendedLinePlugin = {
  id: "st-recommended-line",
  afterDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales.y) return;
    const yVal = scales.y.getPixelForValue(8);
    if (yVal < chartArea.top || yVal > chartArea.bottom) return;
    ctx.save();
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = "rgba(34,197,94,0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(chartArea.left, yVal);
    ctx.lineTo(chartArea.right, yVal);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(34,197,94,0.75)";
    ctx.font = "600 10px system-ui,sans-serif";
    ctx.fillText("8h goal", chartArea.right - 44, yVal - 4);
    ctx.restore();
  },
};

// ── Component ─────────────────────────────────────────────────────
export default function SleepTracker({ embedded = false }) {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    bedtime: "", wake_time: "", quality_rating: 0, notes: "",
  });
  const [saving,   setSaving]   = useState(false);
  const [range,    setRange]    = useState(7);
  const [history,  setHistory]  = useState(null);
  const [histLoading, setHistLoading] = useState(true);
  const [toast,    setToast]    = useState(null);
  const [expandedId,    setExpandedId]    = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting,      setDeleting]      = useState(null);

  const toastTimer = useRef(null);

  // ── Toast ──────────────────────────────────────────────────────
  const showToast = useCallback((type, msg) => {
    clearTimeout(toastTimer.current);
    setToast({ type, msg });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // ── Load history ──────────────────────────────────────────────
  const loadHistory = useCallback(async (r) => {
    setHistLoading(true);
    try {
      const data = await apiJson(`/api/sleep/history/?range=${r}`, { headers: authHeader() });
      setHistory(data);
    } catch {
      setHistory({ chart_data: [], entries: [], avg_hours: null, avg_quality: null, mood_correlation: null, total_entries: 0 });
    } finally {
      setHistLoading(false);
    }
  }, []);

  useEffect(() => { loadHistory(range); }, [loadHistory, range]);

  // ── Save ──────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.bedtime || !form.wake_time || !form.quality_rating) return;
    setSaving(true);
    try {
      await apiJson("/api/sleep/log/", {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({
          bedtime:        toApiDateTime(form.bedtime),
          wake_time:      toApiDateTime(form.wake_time),
          quality_rating: form.quality_rating,
          notes:          form.notes,
        }),
      });
      showToast("success", "Sleep entry saved!");
      setForm({ bedtime: "", wake_time: "", quality_rating: 0, notes: "" });
      loadHistory(range);
    } catch (err) {
      showToast("error", err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeleting(id);
    setHistory(prev =>
      prev ? { ...prev, entries: prev.entries.filter(e => e.id !== id) } : prev
    );
    setDeleteConfirm(null);
    try {
      await apiJson(`/api/sleep/log/${id}/`, { method: "DELETE", headers: authHeader() });
      loadHistory(range);
    } catch {
      loadHistory(range);
    } finally {
      setDeleting(null);
    }
  };

  // ── Chart data ────────────────────────────────────────────────
  const chartData = useMemo(() => {
    if (!history?.chart_data?.length) return null;
    return {
      labels: history.chart_data.map(d => formatChartDate(d.date)),
      datasets: [{
        label: "Hours Slept",
        data: history.chart_data.map(d => d.hours),
        backgroundColor: history.chart_data.map(d => qualityBarColor(d.quality)),
        borderColor: history.chart_data.map(d =>
          qualityBarColor(d.quality).replace("0.75", "0.95")
        ),
        borderWidth: 1,
        borderRadius: 5,
        borderSkipped: false,
      }],
    };
  }, [history]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
        titleColor:      theme === "dark" ? "#f8fafc" : "#0f172a",
        bodyColor:       theme === "dark" ? "#94a3b8" : "#64748b",
        borderColor:     theme === "dark" ? "rgba(248,250,252,0.12)" : "rgba(15,23,42,0.12)",
        borderWidth: 1, padding: 12, cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const h = ctx.raw;
            if (h == null) return "No data";
            const hrs = Math.floor(h);
            const min = Math.round((h - hrs) * 60);
            return min > 0 ? `${hrs}h ${min}m slept` : `${hrs}h slept`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: theme === "dark" ? "rgba(248,250,252,0.06)" : "rgba(15,23,42,0.06)" },
        ticks: { color: theme === "dark" ? "#94a3b8" : "#64748b", font: { size: 11 } },
      },
      y: {
        grid: { color: theme === "dark" ? "rgba(248,250,252,0.06)" : "rgba(15,23,42,0.06)" },
        ticks: {
          color: theme === "dark" ? "#94a3b8" : "#64748b",
          font: { size: 11 },
          callback: (v) => `${v}h`,
        },
        min: 0,
        suggestedMax: 10,
      },
    },
  }), [theme]);

  // ── Duration live preview ─────────────────────────────────────
  const duration = useMemo(
    () => computeDuration(form.bedtime, form.wake_time),
    [form.bedtime, form.wake_time]
  );

  const canSave = !saving && form.bedtime && form.wake_time && form.quality_rating > 0;

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className={embedded ? "st-embedded" : "st-page nb-noise"}>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`st-toast st-toast--${toast.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            {toast.type === "success" ? <FaCheck aria-hidden /> : <FaTimes aria-hidden />}
            <span>{toast.msg}</span>
            <button
              className="st-toast__close"
              onClick={() => setToast(null)}
              aria-label="Dismiss"
            >
              <FaTimes aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero — hidden when embedded inside another page */}
      {!embedded && (
        <div className="nb-page st-hero">
          <motion.div
            className="st-hero__inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div className="st-hero__eyebrow">
              <FaMoon aria-hidden /> Sleep Tracker
            </div>
            <h1 className="st-hero__title">
              Sleep <span className="st-hero__gradient">Quality</span>
            </h1>
            <p className="st-hero__desc">
              Log rest, visualise patterns, and discover how sleep shapes your mental wellbeing.
            </p>
          </motion.div>
        </div>
      )}

      {/* Two-panel grid */}
      <div className={embedded ? "st-grid st-grid--embedded" : "nb-page st-grid"}>

        {/* ── Left: Log form ── */}
        <motion.div
          className="st-card nb-glass"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.1 }}
        >
          <div className="st-card__bar st-card__bar--log" />
          <div className="st-card__body">
            <h2 className="st-card__title"><FaBed aria-hidden /> Log Sleep</h2>

            {/* Bedtime */}
            <div className="st-field">
              <label className="st-label">Bedtime</label>
              <input
                type="datetime-local"
                className="st-input"
                value={form.bedtime}
                onChange={e => setForm(f => ({ ...f, bedtime: e.target.value }))}
              />
            </div>

            {/* Wake time */}
            <div className="st-field">
              <label className="st-label">Wake Time</label>
              <input
                type="datetime-local"
                className="st-input"
                value={form.wake_time}
                onChange={e => setForm(f => ({ ...f, wake_time: e.target.value }))}
              />
            </div>

            {/* Live duration */}
            <AnimatePresence>
              {duration && (
                <motion.div
                  className="st-duration"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                >
                  <FaClock aria-hidden />
                  Duration: <strong>{duration}</strong>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quality rating */}
            <div className="st-field">
              <label className="st-label">Sleep Quality</label>
              <div className="st-quality-row">
                {QUALITY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`st-quality-btn${form.quality_rating === opt.value ? " st-quality-btn--active" : ""}`}
                    onClick={() => setForm(f => ({ ...f, quality_rating: opt.value }))}
                    title={opt.label}
                  >
                    <span className="st-quality-emoji">{opt.emoji}</span>
                    <span className="st-quality-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="st-field">
              <label className="st-label">
                Notes <span className="st-label__opt">(optional)</span>
              </label>
              <textarea
                className="st-textarea"
                placeholder="Any observations about your sleep…"
                value={form.notes}
                rows={3}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              />
            </div>

            <button
              className="st-btn-primary"
              onClick={handleSave}
              disabled={!canSave}
            >
              {saving
                ? <><div className="st-spinner st-spinner--sm" aria-hidden /> Saving…</>
                : <><FaCheck aria-hidden /> Save Entry</>}
            </button>
          </div>
        </motion.div>

        {/* ── Right: Chart + history ── */}
        <motion.div
          className="st-card nb-glass"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.15 }}
        >
          <div className="st-card__bar st-card__bar--chart" />
          <div className="st-card__body">

            {/* Range tabs */}
            <div className="st-range-tabs">
              {RANGE_OPTIONS.map(r => (
                <button
                  key={r}
                  className={`st-range-tab${range === r ? " st-range-tab--active" : ""}`}
                  onClick={() => setRange(r)}
                >
                  {r} days
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="st-chart-wrap">
              {histLoading ? (
                <div className="st-chart-state">
                  <div className="st-spinner" aria-hidden />
                </div>
              ) : chartData ? (
                <Bar
                  data={chartData}
                  options={chartOptions}
                  plugins={[recommendedLinePlugin]}
                />
              ) : (
                <div className="st-chart-state">
                  <FaMoon className="st-chart-state__icon" aria-hidden />
                  <p>No data for this period.</p>
                </div>
              )}
            </div>

            {/* Chart legend */}
            <div className="st-chart-legend">
              <span className="st-legend-dot st-legend-dot--green" /> Good (4–5)
              <span className="st-legend-dot st-legend-dot--amber" /> Okay (3)
              <span className="st-legend-dot st-legend-dot--red"   /> Poor (1–2)
              <span className="st-legend-line" /> 8h goal
            </div>

            {/* Stats */}
            {history && !histLoading && (
              <div className="st-stats">
                <div className="st-stat">
                  <span className="st-stat__val">
                    {history.avg_hours != null ? `${Number(history.avg_hours).toFixed(1)}h` : "—"}
                  </span>
                  <span className="st-stat__label">Avg Sleep</span>
                </div>
                <div className="st-stat">
                  <span className="st-stat__val st-stat__val--stars"
                    style={{ color: qualityColor(Math.round(history.avg_quality ?? 0)) }}
                  >
                    {history.avg_quality != null
                      ? qualityStars(Math.round(history.avg_quality))
                      : "—"}
                  </span>
                  <span className="st-stat__label">Avg Quality</span>
                </div>
                <div className="st-stat">
                  <span className="st-stat__val">
                    {history.total_entries ?? 0}<span className="st-stat__denom"> / {range}</span>
                  </span>
                  <span className="st-stat__label">Days Logged</span>
                </div>
              </div>
            )}

            {/* Mood correlation */}
            {history?.mood_correlation?.available && (
              <motion.div
                className="st-correlation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                <span className="st-correlation__icon" aria-hidden>💤</span>
                <p>{history.mood_correlation.message}</p>
              </motion.div>
            )}

            {/* History list */}
            <div className="st-hist-head">Past Entries</div>

            {histLoading ? (
              <div className="st-hist-state">
                <div className="st-spinner" aria-hidden />
              </div>
            ) : !history?.entries?.length ? (
              <div className="st-hist-state">
                <FaInbox className="st-hist-state__icon" aria-hidden />
                <p>No sleep logged yet.</p>
                <p className="st-hist-state__sub">
                  Start tracking tonight to see your pattern.
                </p>
              </div>
            ) : (
              <div className="st-entries">
                {history.entries.map(entry => {
                  const isOpen = expandedId === entry.id;
                  const dur    = computeDuration(entry.bedtime, entry.wake_time);
                  return (
                    <div
                      key={entry.id}
                      className={`st-entry${isOpen ? " st-entry--open" : ""}`}
                    >
                      {/* Row */}
                      <button
                        className="st-entry__row"
                        onClick={() => setExpandedId(isOpen ? null : entry.id)}
                      >
                        <div className="st-entry__left">
                          <span
                            className="st-entry__stars"
                            style={{ color: qualityColor(entry.quality_rating) }}
                          >
                            {qualityStars(entry.quality_rating)}
                          </span>
                          <span className="st-entry__date">
                            {formatEntryDate(entry.bedtime)}
                          </span>
                          {dur && <span className="st-entry__dur">{dur}</span>}
                        </div>
                        <div className="st-entry__right">
                          {isOpen
                            ? <FaChevronUp  className="st-entry__chevron" aria-hidden />
                            : <FaChevronDown className="st-entry__chevron" aria-hidden />}
                        </div>
                      </button>

                      {/* Detail */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="st-entry__detail"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: easeOut }}
                          >
                            <div className="st-entry__detail-inner">
                              <div className="st-entry__meta-row">
                                <span>🛏 {formatTime(entry.bedtime)} → {formatTime(entry.wake_time)}</span>
                                {dur && <span>⏱ {dur}</span>}
                              </div>
                              {entry.notes && (
                                <p className="st-entry__notes">{entry.notes}</p>
                              )}
                              <div className="st-entry__footer">
                                {deleteConfirm === entry.id ? (
                                  <div className="st-delete-confirm">
                                    <span>Delete this entry?</span>
                                    <button
                                      className="st-delete-confirm__yes"
                                      onClick={() => handleDelete(entry.id)}
                                      disabled={deleting === entry.id}
                                    >
                                      {deleting === entry.id ? "Deleting…" : "Delete"}
                                    </button>
                                    <button
                                      className="st-delete-confirm__no"
                                      onClick={() => setDeleteConfirm(null)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className="st-btn-ghost st-btn-ghost--danger"
                                    onClick={() => setDeleteConfirm(entry.id)}
                                  >
                                    <FaTrash aria-hidden /> Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
