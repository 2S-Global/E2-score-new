"use client";

import { useState } from "react";
import Link from "next/link";
import MessageComponent from "@/components/common/ResponseMsg";
import { useEffect } from "react";
const ApplyJobModalContent = ({ jobId, view = "candidate" }) => {
  const [formData, setFormData] = useState({
    noticePeriod: "",
    preferredTime: "",
    availabilityOnSaturday: "",
    willingToRelocate: "",
    description: "",
    acceptedTerms: false,
    experienceLevel: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        const closeBtn = document.getElementById("applyJobModalCloseBtn");
        closeBtn?.click();
      }, 2000); // ⏱ 2 seconds

      return () => clearTimeout(timer);
    }
  }, [success]);

  /* =======================
     Handle Input Change
  ======================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* =======================
     Validation
  ======================= */
  const validate = () => {
    let newErrors = {};

    // ✅ EXPERIENCE VALIDATION
    if (!formData.experienceLevel && formData.experienceLevel !== 0) {
      newErrors.experienceLevel = "* Required";
    } else if (formData.experienceLevel < 0 || formData.experienceLevel > 50) {
      newErrors.experienceLevel = "* Invalid experience";
    }

    if (!formData.noticePeriod) newErrors.noticePeriod = "* Required";
    if (!formData.preferredTime) newErrors.preferredTime = "* Required";
    if (!formData.availabilityOnSaturday)
      newErrors.availabilityOnSaturday = "* Required";
    if (!formData.willingToRelocate) newErrors.willingToRelocate = "* Required";
    if (!formData.description) newErrors.description = "* Required";
    if (!formData.acceptedTerms)
      newErrors.acceptedTerms = "* Please accept terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =======================
     Submit Form
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token =
      view === "employer"
        ? localStorage.getItem("employer_token")
        : localStorage.getItem("candidate_token");

    if (!token) {
      setError("Authentication required. Please login.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/apply-job-application?jobId=${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            noticePeriod: formData.noticePeriod,
            preferredTime: formData.preferredTime,
            availabilityOnSaturday: formData.availabilityOnSaturday,
            experienceLevel: Number(formData.experienceLevel),
            willingToRelocate: formData.willingToRelocate,
            description: formData.description,
            acceptedTerms: formData.acceptedTerms,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Job applied successfully 🎉");
      setFormData({
        noticePeriod: "",
        preferredTime: "",
        availabilityOnSaturday: "",
        willingToRelocate: "",
        experienceLevel: "",
        description: "",
        acceptedTerms: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />

      <form className="default-form job-apply-form" onSubmit={handleSubmit}>
        <div className="row">
          {/* Experience */}
          <div className="col-lg-6 form-group">
            <input
              type="number"
              className="form-control"
              name="experienceLevel"
              placeholder="Experience (Years)"
              value={formData.experienceLevel}
              onChange={handleChange}
              min="0"
              max="40"
            />
            {errors.experienceLevel && (
              <small className="text-danger">{errors.experienceLevel}</small>
            )}
          </div>
          {/* Notice Period */}
          <div className="col-lg-6 form-group">
            <select
              className="form-control"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
            >
              <option value="">Notice Period</option>
              <option value="immediate">Immediate</option>
              <option value="15 days">15 Days</option>
              <option value="30 days">30 Days</option>
              <option value="45 days">45 Days</option>
              <option value="60 days">60 Days</option>
            </select>
            {errors.noticePeriod && (
              <small className="text-danger">{errors.noticePeriod}</small>
            )}
          </div>

          {/* Preferred Time */}
          <div className="col-lg-6 form-group">
            <select
              className="form-control"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
            >
              <option value="">Preferred Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.preferredTime && (
              <small className="text-danger">{errors.preferredTime}</small>
            )}
          </div>

          {/* Relocate */}
          <div className="col-lg-6 form-group">
            <select
              className="form-control"
              name="willingToRelocate"
              value={formData.willingToRelocate}
              onChange={handleChange}
            >
              <option value="">Willing to Relocate</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.willingToRelocate && (
              <small className="text-danger">{errors.willingToRelocate}</small>
            )}
          </div>
          {/* Saturday Availability */}
          <div className="col-lg-6 form-group">
            <label className="mb-2 d-block">Availability on Saturday</label>
            <input
              type="radio"
              name="availabilityOnSaturday"
              value="yes"
              checked={formData.availabilityOnSaturday === "yes"}
              onChange={handleChange}
            />{" "}
            Yes
            <input
              type="radio"
              name="availabilityOnSaturday"
              value="no"
              className="ms-3"
              checked={formData.availabilityOnSaturday === "no"}
              onChange={handleChange}
            />{" "}
            No
            {errors.availabilityOnSaturday && (
              <div className="text-danger">
                <small>{errors.availabilityOnSaturday}</small>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="col-lg-12 form-group">
            <textarea
              className="darma"
              name="description"
              placeholder="Message"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <small className="text-danger">{errors.description}</small>
            )}
          </div>

          {/* Terms */}
          <div className="col-lg-12 form-group">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />{" "}
            I accept{" "}
            <Link href="/terms" className="text-primary">
              Terms & Privacy Policy
            </Link>
            {errors.acceptedTerms && (
              <div className="text-danger">
                <small>{errors.acceptedTerms}</small>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="col-lg-12 mt-4">
            <button
              className="theme-btn btn-style-one w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply Job"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ApplyJobModalContent;
