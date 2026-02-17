"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = false,
}) {
  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h5 className={danger ? "text-danger fw-bold" : "fw-bold"}>
                {title}
              </h5>
            </div>

            <div className={styles.body}>
              <p>{message}</p>
            </div>

            <div className={styles.footer}>
              <button
                className="btn btn-light px-4"
                onClick={onClose}
                disabled={loading}
              >
                {cancelText}
              </button>

              <button
                className={`btn ${danger ? "btn-danger" : "btn-primary"} px-4`}
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
