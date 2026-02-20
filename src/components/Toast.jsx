import React, { useEffect } from "react";
import "../styles/Toast.css";

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
