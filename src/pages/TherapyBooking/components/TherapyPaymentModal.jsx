import React, { useCallback, useEffect, useMemo, useState } from "react";
import { confirmPayment, fetchPaymentStatus } from "../../../api/payments";
import { ApiError } from "../../../api/client";
import "./TherapyPaymentModal.css";

const ALL_METHODS = ["upi", "card", "netbanking", "wallet"];

const WALLET_PROVIDERS = [
  { value: "paytm", label: "Paytm" },
  { value: "phonepe", label: "PhonePe" },
  { value: "gpay", label: "Google Pay" },
  { value: "amazonpay", label: "Amazon Pay" },
  { value: "mobikwik", label: "MobiKwik" },
];

function formatMoney(amount, currency) {
  const cur = (currency || "INR").toUpperCase();
  const n = Number(amount);
  if (Number.isNaN(n)) return `${amount} ${cur}`;
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: cur }).format(n);
  } catch {
    return `${n} ${cur}`;
  }
}

function methodLabel(method) {
  if (method === "upi") return "UPI";
  if (method === "card") return "Cards";
  if (method === "netbanking") return "Net Banking";
  if (method === "wallet") return "Wallet";
  return method;
}

function buildConfirmBody(orderId, clientSecret, method, fields) {
  const body = { order_id: orderId, method };
  if (clientSecret) body.client_secret = clientSecret;
  switch (method) {
    case "upi":
      body.upi_vpa = fields.upi_vpa.trim();
      break;
    case "card":
      body.card_last4 = fields.card_last4.trim();
      body.card_holder_name = fields.card_holder_name.trim();
      body.card_brand = fields.card_brand.trim().toLowerCase();
      break;
    case "netbanking":
      body.bank_code = fields.bank_code.trim().toUpperCase();
      break;
    case "wallet":
      body.wallet_provider = fields.wallet_provider;
      break;
    default:
      break;
  }
  return body;
}

function validateFields(method, fields) {
  switch (method) {
    case "upi":
      if (!fields.upi_vpa?.trim()) return "Enter a UPI ID (e.g. name@paytm).";
      break;
    case "card":
      if (!fields.card_last4?.trim() || fields.card_last4.replace(/\D/g, "").length < 4)
        return "Enter the last 4 digits of the card.";
      if (!fields.card_holder_name?.trim()) return "Enter the cardholder name.";
      if (!fields.card_brand?.trim()) return "Enter the card brand (e.g. visa).";
      break;
    case "netbanking":
      if (!fields.bank_code?.trim()) return "Enter a bank code (e.g. HDFC).";
      break;
    case "wallet":
      if (!fields.wallet_provider) return "Choose a wallet.";
      break;
    default:
      return "Select a payment method.";
  }
  return null;
}

async function pollStatus(orderId, attempts = 5, delayMs = 800) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const status = await fetchPaymentStatus(orderId);
      return status;
    } catch {
      /* ignore and retry */
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return null;
}

const TherapyPaymentModal = ({ open, onClose, intent, onPaid }) => {
  const [method, setMethod] = useState("upi");
  const [fields, setFields] = useState({
    upi_vpa: "name@paytm",
    card_last4: "4242",
    card_holder_name: "Jane Doe",
    card_brand: "visa",
    bank_code: "HDFC",
    wallet_provider: "paytm",
  });
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  const supported = useMemo(() => {
    const raw = intent?.payment_methods_supported;
    if (!Array.isArray(raw) || raw.length === 0) return ALL_METHODS;
    const normalized = raw.map((m) => String(m).toLowerCase());
    const filtered = ALL_METHODS.filter((m) => normalized.includes(m));
    return filtered.length > 0 ? filtered : ALL_METHODS;
  }, [intent]);

  useEffect(() => {
    if (!open) return;
    setError("");
    setPaying(false);
    const first = supported[0] || "upi";
    setMethod(first);
  }, [open, supported]);

  const setField = useCallback((key, value) => {
    setFields((f) => ({ ...f, [key]: value }));
  }, []);

  const handlePay = async () => {
    if (!intent?.order_id) {
      setError("Missing payment order. Close and try again.");
      return;
    }
    const msg = validateFields(method, fields);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setPaying(true);
    try {
      const body = buildConfirmBody(intent.order_id, intent.client_secret, method, fields);
      await confirmPayment(body);
      const status = await pollStatus(intent.order_id);
      onPaid?.(status);
      onClose();
    } catch (e) {
      const m = e instanceof ApiError ? e.message : e?.message || "Payment failed.";
      setError(m);
    } finally {
      setPaying(false);
    }
  };

  if (!open || !intent) return null;

  return (
    <div className="therapy-pay-overlay" role="presentation" onMouseDown={(ev) => ev.target === ev.currentTarget && !paying && onClose()}>
      <div className="therapy-pay-modal nb-glass" role="dialog" aria-labelledby="therapy-pay-title" aria-modal="true">
        <div className="therapy-pay-header">
          <div>
            <p className="therapy-pay-brand">MindCare Payments</p>
            <h2 id="therapy-pay-title">Secure checkout</h2>
          </div>
          <button type="button" className="therapy-pay-close" onClick={() => !paying && onClose()} aria-label="Close">
            ×
          </button>
        </div>
        <p className="therapy-pay-hint">Complete your therapy booking with encrypted and verified payment options.</p>
        <p className="therapy-pay-amount">
          Amount payable <strong>{formatMoney(intent.amount, intent.currency)}</strong>
        </p>
        <div className="therapy-pay-trust-row">
          <span>Secured by PCI-DSS standards</span>
          {intent.order_id ? <code>{intent.order_id}</code> : null}
        </div>

        <div className="therapy-pay-methods" role="tablist" aria-label="Payment method">
          {supported.map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={method === m}
              className={`therapy-pay-tab ${method === m ? "active" : ""}`}
              onClick={() => setMethod(m)}
              disabled={paying}
            >
              {methodLabel(m)}
            </button>
          ))}
        </div>

        <p className="therapy-pay-selected-method">{methodLabel(method)} details</p>

        <div className="therapy-pay-fields">
          {method === "upi" ? (
            <label className="therapy-pay-label">
              UPI VPA
              <input
                className="therapy-pay-input"
                value={fields.upi_vpa}
                onChange={(e) => setField("upi_vpa", e.target.value)}
                placeholder="name@paytm"
                autoComplete="off"
                disabled={paying}
              />
            </label>
          ) : null}

          {method === "card" ? (
            <div className="therapy-pay-card-layout">
              <div className="therapy-pay-card-preview">
                <div className="therapy-pay-card-chip" />
                <p className="therapy-pay-card-brand">{(fields.card_brand || "visa").toUpperCase()}</p>
                <p className="therapy-pay-card-number">•••• •••• •••• {fields.card_last4 || "0000"}</p>
                <div className="therapy-pay-card-bottom">
                  <span className="therapy-pay-card-name">{fields.card_holder_name || "Card Holder"}</span>
                  <span className="therapy-pay-card-exp">VALID</span>
                </div>
              </div>
              <div className="therapy-pay-card-form">
                <label className="therapy-pay-label">
                  Last 4 digits
                  <input
                    className="therapy-pay-input"
                    value={fields.card_last4}
                    onChange={(e) => setField("card_last4", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="4242"
                    inputMode="numeric"
                    maxLength={4}
                    disabled={paying}
                  />
                </label>
                <label className="therapy-pay-label">
                  Cardholder name
                  <input
                    className="therapy-pay-input"
                    value={fields.card_holder_name}
                    onChange={(e) => setField("card_holder_name", e.target.value)}
                    placeholder="Jane Doe"
                    disabled={paying}
                  />
                </label>
                <label className="therapy-pay-label">
                  Card brand
                  <input
                    className="therapy-pay-input"
                    value={fields.card_brand}
                    onChange={(e) => setField("card_brand", e.target.value)}
                    placeholder="visa"
                    disabled={paying}
                  />
                </label>
              </div>
            </div>
          ) : null}

          {method === "netbanking" ? (
            <label className="therapy-pay-label">
              Bank code
              <input
                className="therapy-pay-input"
                value={fields.bank_code}
                onChange={(e) => setField("bank_code", e.target.value)}
                placeholder="HDFC"
                disabled={paying}
              />
            </label>
          ) : null}

          {method === "wallet" ? (
            <label className="therapy-pay-label">
              Wallet
              <select
                className="therapy-pay-input"
                value={fields.wallet_provider}
                onChange={(e) => setField("wallet_provider", e.target.value)}
                disabled={paying}
              >
                {WALLET_PROVIDERS.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        {error ? (
          <div className="therapy-pay-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="therapy-pay-actions">
          <button type="button" className="therapy-pay-secondary" onClick={() => !paying && onClose()} disabled={paying}>
            Cancel
          </button>
          <button type="button" className="therapy-pay-primary" onClick={handlePay} disabled={paying}>
            {paying ? "Authorizing payment…" : `Pay ${formatMoney(intent.amount, intent.currency)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapyPaymentModal;
