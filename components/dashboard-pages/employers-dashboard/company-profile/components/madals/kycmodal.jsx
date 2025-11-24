import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import KycBox from "./Kycboxnew.jsx";

const KycModal = ({
  show,
  onClose,
  setError,
  setSuccess,
  setMessageId,
  setErrorId,
  setReload,
  focusSection,
  data,
}) => {
  if (!show) return null;
  const [isFormValid, setIsFormValid] = useState(false);
  const [saving, setSaving] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  /* 
  console.log("data", data); */

  const [formData, setFormData] = useState({
    pan_number: data?.pan_number || "",
    pan_name: data?.pan_name || "",
    cin_number: data?.cin_number || "",
    cin_name: data?.cin_name || "",
    gstin_name: data?.gstin_name || "",
    gstin_number: data?.gstin_number || "",
  });

  const [formerrors, setFormErrors] = useState("");

  const validationConfig = [
    {
      fields: ["pan_number", "pan_name"],
      message: "Please fill both the PAN number and name.",
    },
    {
      fields: ["cin_number", "cin_name"],
      message: "Please fill both the CIN number and name.",
    },
    {
      fields: ["gstin_number", "gstin_name"],
      message: "Please fill both the GSTIN number and name.",
    },
  ];

  const ValidateForm = () => {
    setFormErrors("");
    setIsFormValid(false); // default: invalid

    let hasAnyGroupFilled = false;

    for (const { fields, message } of validationConfig) {
      // Check if at least one field in this group is filled
      const isAnyFilled = fields.some(
        (field) => formData[field]?.toString().trim() !== ""
      );

      if (isAnyFilled) {
        hasAnyGroupFilled = true; // ✅ at least one group has data

        // If some are filled, ensure all are filled
        const isAllFilled = fields.every(
          (field) => formData[field]?.toString().trim() !== ""
        );

        if (!isAllFilled) {
          setFormErrors(message);
          setIsFormValid(false);
          return;
        }
      }
    }

    if (!hasAnyGroupFilled) {
      setFormErrors("Please fill at least one document.");
      setIsFormValid(false);
      return;
    }

    // ✅ Passed all checks
    setIsFormValid(true);
  };

  useEffect(() => {
    ValidateForm();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    setMessageId(null);
    setErrorId(null);

    try {
      const response = await axios.post(
        `${apiurl}/api/companykyc/kyc`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(response.data.message || "KYC updated successfully.");
        setMessageId(Date.now());
        setReload(true);
        onClose();
      }

      if (!response.data.success) {
        setError(response.data.message || "Failed to update KYC.");
        setErrorId(Date.now());
      }
    } catch (error) {
      console.error(error);
      setError("Failed to update KYC. Try again later.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="modal fade show d-block modal-xl "
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
            <form className="default-form" onSubmit={handleSubmit}>
              {/* Modal Body */}
              <div className="modal-body">
                <KycBox
                  formData={formData}
                  setFormData={setFormData}
                  focusSection={focusSection}
                />
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
                    <div className="custom-tooltip">{formerrors}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    // onClick={handleSave}
                    disabled={!isFormValid || saving}
                  >
                    <>{saving ? "Saving..." : "Save"}</>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycModal;
