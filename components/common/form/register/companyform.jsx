import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
//new component
import MessageComponent from "../../ResponseMsg";
import { Search } from "lucide-react";
import AutoDetectPhoneInput from "../phonenumber";
const FormContentcom = () => {
  const [formData, setFormData] = useState({
    company_type: "",
    cin_id: "",
    cin: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message_id, setMessageId] = useState(null);
  const [company_type_list, setCompanyTypeList] = useState([]);
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    setErrorId(null);
    setMessageId(null);

    if (formData.company_type == "") {
      setError("Please Select Company Type");
      setErrorId(Date.now());
      setLoading(false);

      window.location.href = "#company_type";

      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/company-register`,
        formData
      );
      console.log("Response:", response);
      //check if response is successful
      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }
      setSuccess(response.data.message || "Registration successful!");
      setMessageId(Date.now());
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handelcinsubmit = async () => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorId(null);
    setSuccess(null);
    setMessageId(null);

    const regex =
      /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
    if (regex.test(formData.cin)) {
      try {
        setLoading(true);
        setError(null);
        setErrorId(null);
        setSuccess(null);
        setMessageId(null);

        const response = await axios.post(
          `${apiurl}/api/companyprofile/search_company_by_cin`,
          {
            cin: formData.cin,
          }
        );
        if (response.data.success) {
          setFormData({
            ...formData,
            cin_id: response.data.data._id,
            cin: response.data.data.cinnumber,
            name: response.data.data.companyname,
            email: response.data.data.companyemail,
            phone_number: response.data.data.companyphone,
            address: response.data.data.companyaddress,
          });

          setError(null);
          setErrorId(null);
          setSuccess(response.data.message);
          setMessageId(Date.now());
        } else {
          setError("No Details Found Please Enter Valid CIN or Enter Manually");
          setErrorId(Date.now());
        }
      } catch (e) {
        setError("No Details Found Please Enter Valid CIN or Enter Manually");
        setErrorId(Date.now());
      } finally {
        setLoading(false);
      }
    } else {
      setError("Invalid CIN Please Enter Valid CIN or Enter Manually");
      setErrorId(Date.now());
    }
  };
  const setPhone = (phone) => {
    setFormData({ ...formData, phone_number: phone });
  };

  const fetchcompanylist = async () => {
    try {
      const response = await axios.get(
        `${apiurl}/api/companyprofile/get_company_types`
      );
      if (response.data.success) {
        setCompanyTypeList(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchcompanylist();
  }, [apiurl]);

  const [disablesubmit, setDisableSubmit] = useState(false);
  const [needcin, setNeedcin] = useState(false);
  useEffect(() => {
    if (formData.company_type) {
      setNeedcin(Cincheck(formData.company_type));
    } else {
      setNeedcin(false);
    }
  }, [formData.company_type]);

  const Cincheck = (type_id) => {
    const item = company_type_list.find((item) => item._id === type_id);
    return item ? item.Has_CIN : false;
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* display error */}
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      <div className="form-group" id="company_type">
        <label className="mb-1">Company Type</label>
        <span className="text-danger ms-1">*</span>

        <div className="d-flex align-items-stretch gap-2 flex-wrap">
          {company_type_list?.map((item) => (
            <div className="form-check" key={item._id}>
              <input
                className="form-check-input"
                type="radio"
                name="company_type"
                id={`company-${item._id}`}
                value={item._id}
                checked={formData.company_type === item._id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company_type: e.target.value,
                  })
                }
              />

              <label
                className="form-check-label"
                htmlFor={`company-${item._id}`}
              >
                {item.Legal_Structure}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* {needcin && (
        <div className="form-group mb-1">
          <label>Company CIN Number </label>

          <div className="d-flex align-items-stretch gap-2">
            <input
              type="text"
              name="cin"
              placeholder="Enter company CIN"
              value={formData.cin}
              onChange={handleChange}
              className="form-control"
              pattern="^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handelcinsubmit()}
            >
              <Search />
            </button>
          </div>
        </div>
      )} */}
      <div className="form-group mb-1">
        <label>Company Name</label>
        <span className="text-danger ms-2">*</span>
        <input
          type="text"
          name="name"
          placeholder="Name as per PAN"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      {/* name */}
      <div className="form-group mb-1">
        <label>Official Email Address</label>
        <span className="text-danger ms-2">*</span>
        <input
          type="email"
          name="email"
          placeholder="
        Enter your Official Email address"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {/* Email */}

      <AutoDetectPhoneInput
        phone={formData.phone_number}
        setPhone={setPhone}
        setDisableSubmit={setDisableSubmit} // 👈 pass it down
      />
      {/* Phone */}

      <div className="form-group ">
        <label>Password</label>
        <span className="text-danger ms-2">*</span>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={loading || disablesubmit} // 👈 still disables click
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContentcom;
