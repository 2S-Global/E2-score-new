"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

// Utility: Convert object to string format
export const serializeAdditionalFields = (fields) => {
  return Object.entries(fields || {})
    .map(([key, val]) => {
      if (Array.isArray(val)) return `${key}: ${val.join(", ")}`;
      return `${key}: ${val}`;
    })
    .join(", ");
};

const Additionfield = ({ formData, setFormData }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const [fieldlist, setFieldlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("employer_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${apiurl}/api/fields/get_all_company_fields`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFieldlist(res.data.data || []);
        console.log("Fieldlist updated:", res.data.data);
      } catch (err) {
        setError("Error fetching fields. Please try again.");
        setErrorId(Date.now());
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [apiurl]);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      additionalfields: {
        ...prev.additionalfields,
        [fieldName]: value,
      },
    }));
  };

  return (
    <>
      {loading && <p>Loading fields...</p>}
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      <div className="row">
        {fieldlist.map((field) => (
          <div
            className="form-group col-lg-4 col-md-6 d-flex flex-column gap-2 mb-3"
            key={field._id}
          >
            <label className="form-label">{field.name}</label>

            {/* Text Input */}
            {field.field_type === "text" && (
              <input
                type="text"
                className="form-control"
                placeholder={`Enter ${field.name}`}
                value={formData?.additionalfields?.[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}

            {/* Textarea */}
            {field.field_type === "textarea" && (
              <textarea
                className="form-control"
                placeholder={`Enter ${field.name}`}
                value={formData?.additionalfields?.[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}

            {/* Select */}
            {field.field_type === "select" && (
              <select
                className="form-select"
                value={formData?.additionalfields?.[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select {field.name}</option>
                {field.field_values
                  ?.split(",")
                  .map((val) => val.trim())
                  .filter(Boolean)
                  .map((val, idx) => (
                    <option key={idx} value={val}>
                      {val}
                    </option>
                  ))}
              </select>
            )}

            {/* Radio Buttons */}
            {field.field_type === "radio" && (
              <div className="row">
                {field.field_values
                  ?.split(",")
                  .map((val) => val.trim())
                  .filter(Boolean)
                  .map((val, idx) => (
                    <div className="form-check col-md-6" key={idx}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={field.name}
                        value={val}
                        checked={
                          formData?.additionalfields?.[field.name] === val
                        }
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                      />
                      <label className="form-check-label">{val}</label>
                    </div>
                  ))}
              </div>
            )}

            {/* Checkbox */}
            {field.field_type === "checkbox" && (
              <div className="row">
                {field.field_values
                  ?.split(",")
                  .map((val) => val.trim())
                  .filter(Boolean)
                  .map((val, idx) => (
                    <div className="form-check col-md-6" key={idx}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={`${field.name}-${val}`}
                        value={val}
                        checked={
                          formData?.additionalfields?.[field.name]?.includes(
                            val
                          ) || false
                        }
                        onChange={(e) => {
                          const currentValues =
                            formData?.additionalfields?.[field.name] || [];
                          const updatedValues = e.target.checked
                            ? [...currentValues, val]
                            : currentValues.filter((v) => v !== val);
                          handleChange(field.name, updatedValues);
                        }}
                      />
                      <label className="form-check-label">{val}</label>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Additionfield;
