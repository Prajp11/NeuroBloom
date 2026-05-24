import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "./TherapyBooking.css";
import "../../styles/saas-shared.css";
import TherapistList from "../../components/TherapistList/TherapistList";
import Toast from "../../components/Toast/Toast";
import TherapyPaymentModal from "./components/TherapyPaymentModal";
import ConsultationBooking from "../ConsultationBooking/ConsultationBooking";
import { fetchTherapists, createTherapyBooking, fetchTherapyBookingMetadata } from "../../api/therapy";
import { createPaymentIntent } from "../../api/payments";
import { resolveMediaUrl } from "../../api/config";
import { ApiError } from "../../api/client";
import somyaImage from "../../Images/TherapyBooking/Somya.jpg";
import prajwalImage from "../../Images/TherapyBooking/Prajwal.png";
import archinImage from "../../Images/TherapyBooking/Archin.jpg";
import vivekImage from "../../Images/TherapyBooking/Vivek.png";

const easeOut = [0.22, 1, 0.36, 1];
const THERAPISTS_CACHE_KEY = "therapy_therapists_cache_v1";
const FALLBACK_AGE_GROUPS = [
  { value: "18_24", label: "18–24" },
  { value: "25_34", label: "25–34" },
  { value: "35_44", label: "35–44" },
  { value: "45_54", label: "45–54" },
  { value: "55_plus", label: "55+" },
];
const FALLBACK_REASONS = [
  { value: "stress_management", label: "Stress Management" },
  { value: "anxiety_support", label: "Anxiety Support" },
  { value: "depression_support", label: "Depression Support" },
  { value: "relationship_challenges", label: "Relationship Challenges" },
  { value: "work_burnout", label: "Work Burnout" },
  { value: "sleep_issues", label: "Sleep Issues" },
  { value: "self_confidence", label: "Self Confidence" },
  { value: "grief_or_loss", label: "Grief or Loss" },
  { value: "other", label: "Other" },
];
const FALLBACK_THERAPISTS = [
  {
    id: "1",
    name: "Dr. Somya",
    specialization: "Cognitive Behavioral Therapy",
    image: somyaImage,
    rating: 4.5,
    description:
      "Dr. Somya helps individuals overcome negative thought patterns using CBT techniques.",
    experience: "8+ years",
    availability: "Mon - Fri",
    session_fee: 999,
  },
  {
    id: "2",
    name: "Dr. Prajwal",
    specialization: "Mindfulness Therapy",
    image: prajwalImage,
    rating: 4.8,
    description:
      "Dr. Prajwal guides clients through mindful awareness to reduce stress and anxiety.",
    experience: "10+ years",
    availability: "Mon - Sat",
    session_fee: 1199,
  },
  {
    id: "3",
    name: "Dr. Archin",
    specialization: "Depression & Anxiety",
    image: archinImage,
    rating: 4.2,
    description:
      "Dr. Archin offers compassionate support for individuals facing depression and anxiety.",
    experience: "6+ years",
    availability: "Tue - Sat",
    session_fee: 899,
  },
  {
    id: "4",
    name: "Dr. Vivek",
    specialization: "Stress Management",
    image: vivekImage,
    rating: 4.7,
    description:
      "Dr. Vivek empowers people to manage stress and build resilience with practical strategies.",
    experience: "12+ years",
    availability: "Mon - Fri",
    session_fee: 1299,
  },
];

function normalizeTherapistRow(t) {
  return {
    id: String(t.id),
    name: t.name ?? "Therapist",
    specialization: t.specialization ?? t.specialty ?? "Therapy",
    image: resolveMediaUrl(t.image),
    rating: typeof t.rating === "number" ? t.rating : undefined,
    description: t.description ?? "",
    experience: t.experience ?? "",
    availability: t.availability ?? "",
    session_fee: t.session_fee,
  };
}

function extractTherapistList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

function readCachedTherapists() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(THERAPISTS_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeTherapistRow) : [];
  } catch {
    return [];
  }
}

function writeCachedTherapists(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THERAPISTS_CACHE_KEY, JSON.stringify(list));
  } catch {
    /* ignore local storage errors */
  }
}

function getBookingId(response) {
  if (!response || typeof response !== "object") return null;
  const id = response.id ?? response.booking_id ?? response.pk;
  if (id === undefined || id === null) return null;
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
}

function ratingStars(rating) {
  const r = typeof rating === "number" ? rating : 4.5;
  const full = Math.floor(r);
  const half = r % 1 >= 0.5;
  const parts = [];
  for (let i = 0; i < full; i += 1) parts.push("★");
  if (half) parts.push("☆");
  while (parts.length < 5) parts.push("☆");
  return parts.join("");
}

function prettifyOption(v) {
  if (!v) return "";
  return String(v)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const TherapyBooking = () => {
  const [activeTab, setActiveTab] = useState("therapy");

  const [therapists, setTherapists] = useState(() => {
    const cached = readCachedTherapists();
    if (cached.length > 0) return cached;
    return FALLBACK_THERAPISTS;
  });
  const [therapistsLoading, setTherapistsLoading] = useState(false);
  const [therapistsError, setTherapistsError] = useState("");

  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [bookingReason, setBookingReason] = useState("");
  const [bookingReasonNote, setBookingReasonNote] = useState("");
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [bookingMetaLoading, setBookingMetaLoading] = useState(false);
  const [bookingMetaError, setBookingMetaError] = useState("");
  const [bookingMeta, setBookingMeta] = useState({
    age_group_options: FALLBACK_AGE_GROUPS,
    booking_reason_options: FALLBACK_REASONS,
  });

  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const loadBookingMeta = useCallback(async () => {
    setBookingMetaLoading(true);
    setBookingMetaError("");
    try {
      const data = await fetchTherapyBookingMetadata();
      const ages =
        Array.isArray(data?.age_group_options) && data.age_group_options.length > 0
          ? data.age_group_options
          : FALLBACK_AGE_GROUPS;
      const reasons =
        Array.isArray(data?.booking_reason_options) && data.booking_reason_options.length > 0
          ? data.booking_reason_options
          : FALLBACK_REASONS;
      setBookingMeta({ age_group_options: ages, booking_reason_options: reasons });
      setAgeGroup((prev) => prev || ages[1]?.value || ages[0]?.value || "");
      setBookingReason((prev) => prev || reasons[0]?.value || "");
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : "Could not load booking options. Using default values.";
      setBookingMetaError(msg);
      setBookingMeta({ age_group_options: FALLBACK_AGE_GROUPS, booking_reason_options: FALLBACK_REASONS });
      setAgeGroup((prev) => prev || FALLBACK_AGE_GROUPS[1]?.value || "");
      setBookingReason((prev) => prev || FALLBACK_REASONS[0]?.value || "");
    } finally {
      setBookingMetaLoading(false);
    }
  }, []);

  const loadTherapists = useCallback(async (opts = {}) => {
    const { silent = false } = opts;
    if (!silent) setTherapistsLoading(true);
    setTherapistsError("");
    try {
      const data = await fetchTherapists();
      const rows = extractTherapistList(data);
      const normalized = rows.map(normalizeTherapistRow);
      if (normalized.length > 0) {
        setTherapists(normalized);
        writeCachedTherapists(normalized);
        setSelectedTherapist((prev) => {
          if (!prev) return prev;
          return normalized.find((t) => String(t.id) === String(prev.id)) || prev;
        });
      }
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? e.message
          : "Could not load therapists. Is the API running at http://127.0.0.1:8000?";
      setTherapistsError(msg);
    } finally {
      if (!silent) setTherapistsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTherapists({ silent: true });
  }, [loadTherapists]);

  useEffect(() => {
    loadBookingMeta();
  }, [loadBookingMeta]);

  const dismissToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

  const handleTherapistSelect = (therapist) => {
    if (selectedTherapist?.id === therapist.id) {
      setSelectedTherapist(null);
      setSelectedDate("");
      setSelectedTime("");
      setMessage("");
      setShowSuccess(false);
      setPaymentModalOpen(false);
      setPaymentIntent(null);
      setBookingDetailsOpen(false);
    } else {
      setSelectedTherapist(therapist);
      setSelectedDate("");
      setSelectedTime("");
      setMessage("");
      setShowSuccess(false);
      setPaymentModalOpen(false);
      setPaymentIntent(null);
      setBookingDetailsOpen(true);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTime("");
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
  };

  const formatSessionFee = (fee) => {
    if (fee === undefined || fee === null || fee === "") return null;
    const n = Number(fee);
    if (Number.isNaN(n)) return String(fee);
    try {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
    } catch {
      return `₹${n}`;
    }
  };

  const proceedToPayment = async () => {
    if (!selectedTherapist || !selectedDate || !selectedTime) {
      setMessage("Please select a therapist, date, and time slot.");
      setShowSuccess(false);
      return;
    }
    if (!ageGroup) {
      setMessage("Please select your age group.");
      setShowSuccess(false);
      return;
    }
    if (!bookingReason) {
      setMessage("Please select a booking reason.");
      setShowSuccess(false);
      return;
    }
    if (bookingReason === "other" && !bookingReasonNote.trim()) {
      setMessage("Please add a short note for 'Other' reason.");
      setShowSuccess(false);
      return;
    }

    setMessage("");
    setCheckoutLoading(true);
    setPaymentModalOpen(false);
    setPaymentIntent(null);

    try {
      const bookingPayload = {
        therapist_id: String(selectedTherapist.id),
        appointment_date: selectedDate,
        time_slot: selectedTime,
        age_group: ageGroup,
        booking_reason: bookingReason,
        booking_reason_note: bookingReason === "other" ? bookingReasonNote.trim() : "",
      };
      const name = patientName.trim();
      if (name) bookingPayload.patient_name = name;

      const bookingRes = await createTherapyBooking(bookingPayload);
      const bookingId = getBookingId(bookingRes);
      if (bookingId == null) {
        throw new Error("Booking created but no booking id was returned.");
      }

      const intentRes = await createPaymentIntent({
        booking_kind: "therapy",
        therapy_booking_id: bookingId,
      });

      setPaymentIntent({
        order_id: intentRes.order_id,
        client_secret: intentRes.client_secret,
        amount: intentRes.amount,
        currency: intentRes.currency,
        payment_methods_supported: intentRes.payment_methods_supported,
      });
      setPaymentModalOpen(true);
      setBookingDetailsOpen(false);
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : e?.message || "Could not start checkout.";
      setMessage(msg);
      setShowSuccess(false);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePaid = useCallback(() => {
    const formatted = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setShowSuccess(true);
    setSelectedDate("");
    setSelectedTime("");
    setPaymentIntent(null);
    setToast({
      visible: true,
      message: `Payment successful. Session with ${selectedTherapist?.name} — ${formatted} was confirmed.`,
    });
  }, [selectedDate, selectedTherapist]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const feeLabel = selectedTherapist ? formatSessionFee(selectedTherapist.session_fee) : null;
  const selectedReasonLabel = useMemo(() => {
    if (!bookingReason) return "";
    return bookingMeta.booking_reason_options.find((o) => o.value === bookingReason)?.label ?? prettifyOption(bookingReason);
  }, [bookingReason, bookingMeta.booking_reason_options]);
  const selectedAgeLabel = useMemo(() => {
    if (!ageGroup) return "";
    return bookingMeta.age_group_options.find((o) => o.value === ageGroup)?.label ?? ageGroup.replace("_", "-").replace("plus", "+");
  }, [ageGroup, bookingMeta.age_group_options]);

  return (
    <div className="therapy-booking-page nb-noise">
      <Toast message={toast.message} visible={toast.visible} onDismiss={dismissToast} duration={4000} />

      <TherapyPaymentModal
        open={paymentModalOpen}
        intent={paymentIntent}
        onClose={() => !checkoutLoading && setPaymentModalOpen(false)}
        onPaid={handlePaid}
      />

      <div className="therapy-booking-inner nb-page">
        <motion.header
          className="therapy-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <div className="therapy-hero__mesh" aria-hidden />
          <div className="therapy-hero__grid" aria-hidden />
          <div className="therapy-hero-content">
            <span className="therapy-brand-icon" aria-hidden>
              🧑‍⚕️
            </span>
            <h1 className="therapy-hero-title">Book a mental health session</h1>
            <p className="therapy-hero-subtitle">
              Connect with therapists or visit certified mental health hospitals — all in one place.
            </p>
          </div>
        </motion.header>

        {/* Tab switcher */}
        <div className="therapy-tabs">
          <button
            type="button"
            className={`therapy-tab${activeTab === "therapy" ? " therapy-tab--active" : ""}`}
            onClick={() => setActiveTab("therapy")}
          >
            🧑‍⚕️ Therapy Session
          </button>
          <button
            type="button"
            className={`therapy-tab${activeTab === "consultation" ? " therapy-tab--active" : ""}`}
            onClick={() => setActiveTab("consultation")}
          >
            🏥 Hospital Consultation
          </button>
        </div>

        {activeTab === "consultation" ? (
          <div className="therapy-consultation-panel">
            <ConsultationBooking />
          </div>
        ) : (
        <div className="therapy-main-content">
          <TherapistList
            therapists={therapists}
            loading={therapistsLoading}
            error={therapistsError}
            onRetry={loadTherapists}
            onSelectTherapist={handleTherapistSelect}
            selectedId={selectedTherapist?.id}
          />

          {selectedTherapist ? (
            <motion.div
              className="booking-form-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              <div className="booking-form-container nb-glass">
                <div className="selected-therapist-card">
                  <div className="selected-therapist-avatar">
                    <img src={selectedTherapist.image} alt="" />
                  </div>
                  <div className="selected-therapist-info">
                    <h3>{selectedTherapist.name}</h3>
                    <p>{selectedTherapist.specialization}</p>
                    {feeLabel ? <p className="therapy-selected-fee">{feeLabel} / session</p> : null}
                    <div className="therapist-rating">
                      <span className="stars" aria-hidden>
                        {ratingStars(selectedTherapist.rating)}
                      </span>
                      <span className="rating-value">
                        {typeof selectedTherapist.rating === "number" ? selectedTherapist.rating : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="booking-form">
                  <div className="booking-pill-row">
                    <span className="booking-pill">
                      <strong>Age:</strong> {selectedAgeLabel || "Not set"}
                    </span>
                    <span className="booking-pill">
                      <strong>Reason:</strong> {selectedReasonLabel || "Not set"}
                    </span>
                    <span className="booking-pill">
                      <strong>Slot:</strong> {selectedDate && selectedTime ? `${selectedDate} · ${selectedTime}` : "Not set"}
                    </span>
                  </div>

                  <button type="button" className="modern-secondary-btn" onClick={() => setBookingDetailsOpen(true)}>
                    Set day, time and profile details
                  </button>

                  {selectedTime ? (
                    <div className="booking-summary">
                      <h4>Summary</h4>
                      <div className="summary-details">
                        <div className="summary-item">
                          <span className="summary-label">Therapist</span>
                          <span className="summary-value">{selectedTherapist.name}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Date</span>
                          <span className="summary-value">
                            {new Date(selectedDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Time</span>
                          <span className="summary-value">{selectedTime}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Age group</span>
                          <span className="summary-value">{selectedAgeLabel || "—"}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Reason</span>
                          <span className="summary-value">{selectedReasonLabel || "—"}</span>
                        </div>
                        {feeLabel ? (
                          <div className="summary-item">
                            <span className="summary-label">Session fee</span>
                            <span className="summary-value">{feeLabel}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  <button type="button" className="modern-confirm-btn" onClick={proceedToPayment} disabled={checkoutLoading || therapistsLoading}>
                    <span>{checkoutLoading ? "Starting checkout…" : "Proceed to payment"}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </button>

                  {showSuccess ? (
                    <p className="therapy-inline-success" role="status">
                      Your session is confirmed after successful payment. Check Django admin for booking and payment records.
                    </p>
                  ) : null}
                  {!showSuccess && message ? (
                    <div className="booking-notification error" role="alert">
                      <span className="notification-icon" aria-hidden>
                        ⚠
                      </span>
                      <p>{message}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ) : null}

          {selectedTherapist && bookingDetailsOpen ? (
            <div className="therapy-booking-overlay" role="presentation" onMouseDown={(ev) => ev.target === ev.currentTarget && setBookingDetailsOpen(false)}>
              <motion.div
                className="therapy-booking-modal nb-glass"
                role="dialog"
                aria-modal="true"
                aria-labelledby="therapy-booking-modal-title"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: easeOut }}
              >
                <div className="therapy-booking-modal-head">
                  <div>
                    <p className="therapy-booking-kicker">Session details</p>
                    <h3 id="therapy-booking-modal-title">Personalize your booking</h3>
                  </div>
                  <button type="button" className="therapy-booking-close" onClick={() => setBookingDetailsOpen(false)}>
                    ×
                  </button>
                </div>

                <div className="booking-form">
                  <div className="form-section">
                    <label className="modern-label" htmlFor="therapy-name">
                      <span className="label-icon" aria-hidden>
                        👤
                      </span>
                      <span>Name (optional)</span>
                    </label>
                    <input
                      id="therapy-name"
                      type="text"
                      className="modern-date-input"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>

                  <div className="form-section">
                    <label className="modern-label" htmlFor="therapy-age-group">
                      <span className="label-icon" aria-hidden>
                        🎯
                      </span>
                      <span>Age group</span>
                    </label>
                    <select
                      id="therapy-age-group"
                      className="modern-date-input"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      disabled={bookingMetaLoading}
                    >
                      <option value="">Select age group</option>
                      {bookingMeta.age_group_options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-section">
                    <label className="modern-label" htmlFor="therapy-booking-reason">
                      <span className="label-icon" aria-hidden>
                        🧠
                      </span>
                      <span>Reason</span>
                    </label>
                    <select
                      id="therapy-booking-reason"
                      className="modern-date-input"
                      value={bookingReason}
                      onChange={(e) => setBookingReason(e.target.value)}
                      disabled={bookingMetaLoading}
                    >
                      <option value="">Select reason</option>
                      {bookingMeta.booking_reason_options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {bookingReason === "other" ? (
                    <div className="form-section">
                      <label className="modern-label" htmlFor="therapy-reason-note">
                        <span className="label-icon" aria-hidden>
                          📝
                        </span>
                        <span>Reason note</span>
                      </label>
                      <textarea
                        id="therapy-reason-note"
                        className="modern-date-input therapy-note-input"
                        value={bookingReasonNote}
                        onChange={(e) => setBookingReasonNote(e.target.value)}
                        placeholder="Please share a short note"
                        rows={3}
                      />
                    </div>
                  ) : null}

                  <div className="form-section">
                    <label className="modern-label" htmlFor="therapy-date">
                      <span className="label-icon" aria-hidden>
                        📅
                      </span>
                      <span>Select date</span>
                    </label>
                    <input
                      id="therapy-date"
                      type="date"
                      className="modern-date-input"
                      value={selectedDate}
                      onChange={handleDateChange}
                      min={getTodayDate()}
                    />
                  </div>

                  {selectedDate ? (
                    <div className="form-section time-slots-section">
                      <p className="modern-label">
                        <span className="label-icon" aria-hidden>
                          ⏰
                        </span>
                        <span>Available times</span>
                      </p>
                      <div className="time-slots-grid">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`modern-time-slot ${selectedTime === slot ? "selected" : ""}`}
                            onClick={() => handleTimeSelect(slot)}
                          >
                            <span className="time-icon" aria-hidden>
                              🕐
                            </span>
                            <span>{slot}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {bookingMetaError ? <p className="therapy-booking-meta-warn">{bookingMetaError}</p> : null}

                  <button type="button" className="modern-secondary-btn" onClick={() => setBookingDetailsOpen(false)}>
                    Save details
                  </button>
                </div>
              </motion.div>
            </div>
          ) : null}
        </div>
        )}
      </div>
    </div>
  );
};

export default TherapyBooking;
