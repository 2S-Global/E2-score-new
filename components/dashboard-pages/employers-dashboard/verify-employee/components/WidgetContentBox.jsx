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
  });

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Admin_token");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        }
      );

      if (response.status === 201) {
        setSuccess(response.data.message);
        router.push('/employers-dashboard/paynow');
      }

    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.message || "Failed. Try again.");
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="widget-content">
      <div className="row">

        <form className="default-form" onSubmit={handleSubmit}>
          <MessageComponent error={error} success={success} />
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h3 className="text-center mb-4" style={{ textDecoration: "underline" }}>
                Personal Details

              </h3>
            </div>

            {/* Full Name */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Full Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>

            {/* Date of Birth */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Date of Birth</label>
              <DatePicker
                selected={formData.dob ? new Date(formData.dob) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>

            {/* Phone Number */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Phone Number</label>
              <input type="number" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
            </div>

            {/* Email */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>

            {/* Address */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Address</label>
              <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
            </div>

            {/* Gender */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Gender</label>
              <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Document Uploads */}
          <DocumentUpload label="PAN" name="pan" fileId="upload-pan"
            valuename={formData.panname} numbername={formData.pannumber}
            onFileChange={handleFileChange} onfieldChange={handleChange} />
          <DocumentUpload label="Aadhaar" name="aadhaar" fileId="upload-aadhaar"
            valuename={formData.aadhaarname} numbername={formData.aadhaarnumber}
            onFileChange={handleFileChange} onfieldChange={handleChange} />
          <DocumentUpload label="Voter ID" name="voter" fileId="upload-voter"
            valuename={formData.votername} numbername={formData.voternumber}
            onFileChange={handleFileChange} onfieldChange={handleChange} />
          <DocumentUpload label="Driving License" name="license" fileId="upload-license"
            valuename={formData.licensename} numbername={formData.licensenumber}
            onFileChange={handleFileChange} onfieldChange={handleChange} />
          <DocumentUpload label="Passport" name="passport" fileId="upload-passport"
            valuename={formData.passportname} numbername={formData.passportnumber}
            onFileChange={handleFileChange} onfieldChange={handleChange} />
          {/* Submit Button */}
          <div className="form-group">
            <button className="theme-btn btn-style-one" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetContentBox;
