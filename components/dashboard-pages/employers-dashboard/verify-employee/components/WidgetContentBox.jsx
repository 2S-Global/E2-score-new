import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DocumentUpload from "./document";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; // Import from date-fns

import MessageComponent from "@/components/common/ResponseMsg";

const WidgetContentBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: null,
    phone: "",
    email: "",
    address: "",
    gender: "",
    panname: "",
    aadhaarname: "",
    votername: "",
    licensename: "",
    passportname: "",
    pannumber: "",
    aadhaarnumber: "",
    voternumber: "",
    licensenumber: "",
    passportnumber: "",
    pandoc: null,
    aadhaardoc: null,
    voterdoc: null,
    licensenumdoc: null,
    passportdoc: null,
    // uanname:null,
    uannumber: null,
  });

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    if (date) {
      setFormData({ ...formData, dob: date }); // Store raw Date object
    }
  };

  const handleFileChange = (docType, file) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${docType}doc`]: file || null, // Ensure null when file is removed
    }));
  };

  const validateForm = () => {
    const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const AADHAAR_REGEX = /^\d{12}$/;
    const PASSPORT_REGEX = /^[A-Z][0-9]{7}$/;
    const DL_REGEX = /^[A-Z0-9]{10,16}$/;
    const VOTER_REGEX = /^[A-Z0-9]{10}$/;
    // 1. Mandatory basic fields
    if (!formData.name || !formData.email || !formData.dob) {
      return "Name, Email and Date of Birth are mandatory";
    }

    // 4️⃣ Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }

    // 5️⃣ Phone (optional but must be 10 digits if entered)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      return "Mobile number must be exactly 10 digits";
    }

    // PAN validation
    if (
      formData.pannumber &&
      !PAN_REGEX.test(formData.pannumber.toUpperCase())
    ) {
      return "Invalid PAN number (Format: ABCDE1234F)";
    }

    // Passport validation
    if (
      formData.passportnumber &&
      !PASSPORT_REGEX.test(formData.passportnumber.toUpperCase())
    ) {
      return "Invalid Passport File Number (Format: A1234567)";
    }

    // Aadhaar validation
    if (formData.aadhaarnumber && !AADHAAR_REGEX.test(formData.aadhaarnumber)) {
      return "Invalid Aadhaar number (Must be 12 digits)";
    }

    // Driving License validation
    if (
      formData.licensenumber &&
      !DL_REGEX.test(formData.licensenumber.toUpperCase())
    ) {
      return "Invalid Driving License number";
    }

    // Voter ID validation
    if (
      formData.voternumber &&
      !VOTER_REGEX.test(formData.voternumber.toUpperCase())
    ) {
      return "Invalid Voter ID number";
    }

    // 2. Identity fields check
    const identityFields = [
      formData.panname,
      formData.pannumber,
      formData.passportname,
      formData.passportnumber,
      formData.aadhaarname,
      formData.aadhaarnumber,
      formData.licensename,
      formData.licensenumber,
      formData.votername,
      formData.voternumber,
      formData.uannumber,
    ];

    const hasAnyIdentity = identityFields.some(
      (val) => val && val.toString().trim() !== "",
    );

    if (!hasAnyIdentity) {
      return "Please fill at least one identity document (PAN / Passport / Aadhaar / License / Voter / UAN)";
    }

    // 3. Pair validation helper
    const pairCheck = (name, number, label) => {
      if ((name && !number) || (!name && number)) {
        return `${label} Name and ${label} Number both are required`;
      }
      return null;
    };

    return (
      pairCheck(formData.panname, formData.pannumber, "PAN") ||
      pairCheck(formData.passportname, formData.passportnumber, "Passport") ||
      pairCheck(formData.aadhaarname, formData.aadhaarnumber, "Aadhaar") ||
      pairCheck(
        formData.licensename,
        formData.licensenumber,
        "Driving License",
      ) ||
      pairCheck(formData.votername, formData.voternumber, "Voter")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔥 FORCE reset first
    setError(null);
    setSuccess(null);

    // ⏳ allow React to flush state
    await Promise.resolve();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (formData[key] instanceof Date) {
        formDataToSend.append(key, format(formData[key], "yyyy-MM-dd")); // Convert Date to string
      } else if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${apiurl}/api/usercart/add_user_cart`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        setSuccess(response.data.message);
        router.push("/employers-dashboard/paynow");
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.message || "Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fileId = "upload-passport";

  const [documentData, setDocumentData] = useState({
    docName: "",
    docNumber: "",
    file: null,
    filePreview: null,
  });
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocumentData({
        ...documentData,
        file,
        filePreview: fileURL,
      });

      if (onFileChange) {
        onFileChange(name, file);
      }
    }
  };

  return (
    <div className="widget-content">
      <div className="col-lg-12 col-md-12 py-2">
        <h5>
          <strong>Add Employee Details</strong>
        </h5>
      </div>

      <div className="row">
        <form className="default-form" onSubmit={handleSubmit}>
          <MessageComponent error={error} success={success} />
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h5
                className="text-center mb-2"
                style={{ textDecoration: "underline" }}
              >
                Personal Details
              </h5>
            </div>

            {/* Full Name */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value;
                  // allow only letters and spaces
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setFormData({ ...formData, name: value });
                  }
                }}
                placeholder="Enter full name"
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>
                Date of Birth <span style={{ color: "red" }}>*</span>
              </label>

              <DatePicker
                selected={formData.dob}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD / MM / YYYY"
                maxDate={new Date()}
                showPopperArrow={false}
                className="form-control"
                wrapperClassName="w-100"
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      type="button"
                    >
                      ‹
                    </button>

                    {/* MONTH DROPDOWN */}
                    <select
                      value={date.getMonth()}
                      onChange={(e) => changeMonth(Number(e.target.value))}
                    >
                      {[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ].map((month, index) => (
                        <option key={month} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>

                    {/* YEAR DROPDOWN */}
                    <select
                      value={date.getFullYear()}
                      onChange={(e) => changeYear(Number(e.target.value))}
                    >
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      type="button"
                    >
                      ›
                    </button>
                  </div>
                )}
              />
            </div>

            {/* Phone Number */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter 10 digit mobile number"
                value={formData.phone}
                inputMode="numeric"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value;
                  // allow only digits and max 10
                  if (/^\d{0,10}$/.test(value)) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
              />
            </div>

            {/* Email */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Document Uploads */}
          <DocumentUpload
            label="PAN"
            name="pan"
            fileId="upload-pan"
            valuename={formData.panname}
            numbername={formData.pannumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
          />

          <div className="row">
            {/* Heading */}
            {/* Name Input */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Passport Name</label>
              <input
                type="text"
                name="passportname"
                placeholder="Enter Name on Passport"
                className="form-control"
                value={formData.passportname}
                onChange={(e) => {
                  const value = e.target.value;
                  // allow only alphabets and spaces
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setFormData({ ...formData, passportname: value });
                  }
                }}
              />
            </div>

            {/* Document Number Input passportnumber */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Passport File Number</label>
              <input
                type="text"
                name="passportnumber"
                placeholder="Enter Name on Passport"
                className="form-control"
                value={formData.passportnumber}
                onChange={handleChange}
              />
            </div>

            {/* File Upload */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label htmlFor={fileId}>Upload Passport File</label>
              <div className="uploadButton d-flex align-items-center">
                <input
                  className="uploadButton-input"
                  type="file"
                  name="file"
                  accept="image/*,application/pdf"
                  id={fileId}
                  onChange={handleFileSelect}
                />
                <label
                  className="uploadButton-button ripple-effect"
                  htmlFor={fileId}
                  style={{
                    width: "100%",
                    height: "54px",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                >
                  {documentData.file ? (
                    <span
                      onClick={() =>
                        window.open(documentData.filePreview, "_blank")
                      }
                    >
                      {documentData.file.name}
                    </span>
                  ) : (
                    `Browse Passport File`
                  )}
                </label>
              </div>
            </div>
          </div>

          <DocumentUpload
            label="Aadhaar"
            name="aadhaar"
            fileId="upload-aadhaar"
            valuename={formData.aadhaarname}
            numbername={formData.aadhaarnumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
          />
          <DocumentUpload
            label="Driving License"
            name="license"
            fileId="upload-license"
            valuename={formData.licensename}
            numbername={formData.licensenumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
          />

          <DocumentUpload
            label="Epic (Voter)"
            name="voter"
            fileId="upload-voter"
            valuename={formData.votername}
            numbername={formData.voternumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
          />

          <div className="row">
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>UAN</label>
              <input
                type="text"
                name="uannumber"
                placeholder="Enter UAN"
                className="form-control"
                value={formData.uannumber || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="form-group">
            <button
              className="theme-btn btn-style-one"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetContentBox;
