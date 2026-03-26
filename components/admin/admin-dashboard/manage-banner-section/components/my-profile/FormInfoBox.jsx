"use client";

import Select from "react-select";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LogoCoverUploader from "./LogoCoverUploader";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
import axios from "axios";
import { Search } from "lucide-react";

const FormInfoBox = ({ setActiveTab }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [industries, setIndustry] = useState([]);
  const [company_type_list, setCompanyTypeList] = useState([]);

  const [disableform, setDisableform] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message_id, setMessageId] = useState(null);

  const [needcin, setNeedcin] = useState(false);

  const [formdata, setFormdata] = useState({
    _id: "",
    email: "",
    phone: "",
    facebook_link: "",
    twitter_link: "",
    short_description: "",
    address: "",
    logo: null,
    logo_preview: null,
  });

  // =============================================================
  // Load token & fetch data only after token is available
  // =============================================================
  useEffect(() => {
    const token = localStorage.getItem("Super_token");
    if (!token) return;

    FetchCompanyDetails(token);
  }, []);

  // =============================================================
  // FETCH COMPANY CONTACT DATA
  // =============================================================
  const FetchCompanyDetails = async (token) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${apiurl}/api/home/get-banner-details`
      );

      if (response.data.success && response.data.data.length > 0) {

        const data = response.data.data[0];  // << Fix: take first object

        setFormdata((prev) => ({
          ...prev,
          _id: data._id || "",
          banner_title: data.title || "",
          logo_preview: data.bannerImage || null,
        }));
      }

    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =============================================================
  // HANDLE SUBMIT
  // =============================================================
  const handelsubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Super_token");
    setLoading(true);
    setSubmitting(true);

    try {

      const form = new FormData();
      form.append("title", formdata.banner_title);
      form.append("bannerImage", formdata.logo);   // NEW FILE

      const response = await axios.put(
        `${apiurl}/api/home/update-banner-details/${formdata._id}`,
        form
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setMessageId(Date.now());

        setTimeout(() => setActiveTab("account"), 2000);
      }
    } catch (e) {
      setError("Error Saving Details. Try Again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // =============================================================
  // UI STARTS
  // =============================================================

  return (
    <>
      <MessageComponent error={error} success={success} errorId={errorId} message_id={message_id} />

      {loading && (
        <div className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
          <CustomizedProgressBars />
        </div>
      )}

      <form className="default-form" onSubmit={handelsubmit}>

        <div className="row" style={{ pointerEvents: disableform ? "none" : "auto", opacity: disableform ? 0.5 : 1 }}>

          <div className="form-group col-lg-12">
            <label>Banner Title</label>
            <textarea rows="2" value={formdata.banner_title} onChange={(e) => setFormdata({ ...formdata, banner_title: e.target.value })} required />
          </div>

          <LogoCoverUploader formdata={formdata} setFormdata={setFormdata} />

          <button className="theme-btn btn-style-one" disabled={loading || submitting}>
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>

      </form>
    </>
  );
};

export default FormInfoBox;
