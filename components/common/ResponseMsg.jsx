import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageComponent = ({ error, success }) => {
  const [showError, setShowError] = useState(error);
  const [showSuccess, setShowSuccess] = useState(success);

  useEffect(() => {
    if (error) {
      setShowError(error);
      const timer = setTimeout(() => setShowError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setShowSuccess(success);
      const timer = setTimeout(() => setShowSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const messageVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <AnimatePresence>
        {showError && (
          <motion.div
            key="error"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="alert alert-danger shadow rounded"
            role="alert"
          >
            {showError}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowError(null)}
            ></button>
          </motion.div>
        )}
        {showSuccess && (
          <motion.div
            key="success"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="alert alert-success shadow rounded"
            role="alert"
          >
            {showSuccess}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowSuccess(null)}
            ></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageComponent;
