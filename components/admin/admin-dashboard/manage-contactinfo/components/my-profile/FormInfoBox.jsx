"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";

const ContactInfoBox = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [formdata, setFormdata] = useState({
    _id: "",
    address: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessageId] = useState(null);

  // ================= FETCH DATA =================
  const fetchContact = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiurl}/api/contact/all`);

      if (res.data.success && res.data.data.length > 0) {
        const data = res.data.data[0]; // first contact

        setFormdata({
          _id: data._id,
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitting(true);

    try {
      const res = await axios.put(
        `${apiurl}/api/contact/update/${formdata._id}`,
        {
          address: formdata.address,
          phone: formdata.phone,
          email: formdata.email,
        },
      );

      if (res.data.success) {
        setSuccess("Updated successfully");
        setMessageId(Date.now());
      }
    } catch (err) {
      setError("Update failed");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // ================= UI =================
  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      {loading && (
        <div className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75">
          <CustomizedProgressBars />
        </div>
      )}

      <form className="default-form" onSubmit={handleSubmit}>
        <div className="row">
          {/* ADDRESS */}
          <div className="form-group col-lg-12">
            <label>Address</label>
            <textarea
              name="address"
              value={formdata.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter address"
              style={{
                height: "100px",
                minHeight: "100px",
                resize: "none",
                padding: "6px 10px",
              }}
              required
            />
          </div>

          {/* CONTACT */}
          <div className="form-group col-lg-6">
            <label>Contact Number</label>
            <input
              type="text"
              name="phone"
              value={formdata.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group col-lg-6">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          {/* BUTTON */}
          <div className="form-group col-lg-12">
            <button
              className="theme-btn btn-style-one"
              disabled={loading || submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactInfoBox;
