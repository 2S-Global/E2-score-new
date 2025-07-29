import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
import { da } from "date-fns/locale";
const AccountBox = ({ setActiveTab }) => {
  const [formdata, setFormData] = useState({
    companyname: "",
    companyemail: "",
    companyphone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [message_id, setMessageId] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("employer_token");

  useEffect(() => {
    Fetchdetails();
  }, [apiurl]);

  const Fetchdetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/companyprofile/get_account_details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setFormData({
          companyname: response.data.data.companyname || "",
          companyemail: response.data.data.email || "",
          companyphone: response.data.data.phone || "",
        });
      } else {
        console.error("Failed to fetch details:", response.data.message);
      }
    } catch (error) {
      console.error("Error while fetching account details:", error);
    } finally {
      setLoading(false);
    }
  };
  const isDisabled = loading || submitting;

  const handelsubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLoading(true);
    setError(null);
    setErrorId(null);
    setSuccess(null);
    setMessageId(null);
    try {
      const response = await axios.put(
        `${apiurl}/api/companyprofile/update_account_details`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSuccess(response.data.message);
        setMessageId(Date.now());
        setTimeout(() => {
          setActiveTab("contact");
        }, 2000);
      } else {
        console.error("Error saving personal details:", response.data.message);

        setError(response.data.message);
        setErrorId(Date.now());
      }
    } catch (error) {
      console.error("Error saving personal details:", error);

      setError("An error occurred while saving personal details.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <CustomizedProgressBars />
        </div>
      )}
      <form
        className="default-form"
        onSubmit={handelsubmit}
        type="multipart/form-data"
        method="post"
      >
        <div className="row">
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Company Name</label>
            <span className="text-danger ms-1">*</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your company name"
              value={formdata.companyname}
              onChange={(e) =>
                setFormData({ ...formdata, companyname: e.target.value })
              }
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Email </label>
            <span className="text-danger ms-1">*</span>
            <input
              type="text"
              name="name"
              placeholder="Enter Email"
              value={formdata.companyemail}
              style={{ pointerEvents: "none" }}
              readOnly
            />
          </div>

          <div className="form-group col-lg-6 col-md-12">
            <label>Mobile Number</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Mobile Number"
              value={formdata.companyphone}
              onChange={(e) =>
                setFormData({ ...formdata, companyphone: e.target.value })
              }
            />
          </div>
          <div className="form-group col-lg-6 col-md-12"></div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <button
              type="submit"
              className="theme-btn btn-style-one"
              disabled={isDisabled}
              style={{
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountBox;
