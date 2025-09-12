import React, { useState } from "react";
import { Sparkles } from "lucide-react"; // AI suggestion icon
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import KycBox from "./Kycbox";

const KycModal = ({ show, onClose, setError, setSuccess }) => {
  if (!show) return null;
  return (
    <>
      <div
        className="modal fade show d-block "
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">KYC</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <KycBox />
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycModal;
