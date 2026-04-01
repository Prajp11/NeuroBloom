import React, { useEffect } from "react";
import "./Toast.css";

export default function Toast({ message, visible, onDismiss, duration = 3200 }) {
  useEffect(() => {
    if (!visible || !onDismiss) return undefined;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [visible, onDismiss, duration]);

  if (!visible) return null;

  return (
    <div className="mh-toast" role="status" aria-live="polite">
      <span className="mh-toast__text">{message}</span>
      <button type="button" className="mh-toast__close" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
