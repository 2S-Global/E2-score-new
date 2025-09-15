import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react"; // AI suggestion icon
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import KycBox from "./Kycboxnew";

const KycModal = ({
  show,
  onClose,
  setError,
  setSuccess,
  setMessageId,
  setErrorId,
  setReload,
  setSectionloading,
  focusSection,
}) => {
  if (!show) return null;
  const [isFormValid, setIsFormValid] = useState(false);
  const [saving, setSaving] = useState(false);

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
              <style jsx>{`
                .tooltip-wrapper {
                  position: relative;
                  display: inline-block;
                }

                .tooltip-wrapper .custom-tooltip {
                  visibility: hidden;
                  background-color: white;
                  color: red;
                  font-weight: bold;
                  text-align: center;
                  border: 1px solid red;
                  border-radius: 4px;
                  padding: 5px 10px;
                  position: absolute;
                  bottom: 100%;
                  left: 0;
                  margin-bottom: 6px;
                  z-index: 1;
                  white-space: nowrap;
                }

                .tooltip-wrapper:hover .custom-tooltip {
                  visibility: visible;
                }
              `}</style>

              <div className="tooltip-wrapper">
                {!isFormValid && (
                  <div className="custom-tooltip">
                    Please fill all required fields
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  // onClick={handleSave}
                  disabled={!isFormValid || saving}
                >
                  <>{saving ? "Saving..." : "Save"}</>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycModal;
