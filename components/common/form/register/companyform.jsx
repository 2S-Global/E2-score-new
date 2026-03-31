import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {EyeIcon,EyeOff,Info} from "lucide-react"
//new component
import MessageComponent from "../../ResponseMsg";
//import { Search } from "lucide-react";
import AutoDetectPhoneInput from "../phonenumber";
import {generateStrongPassword} from "../../../../utils/generatePassword"
import Tooltip from '@mui/material/Tooltip';
const FormContentcom = () => {
  const [formData, setFormData] = useState({
    company_type: "",
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
  //password 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    //validation error
    const [err, setErr] = useState(null);

  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
 
  // Handle input changes
  const handleChange = (e) => {
     setErr({ ...err, [e.target.name]:'' });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // validation 
  const validate = () => {
        let newErrors = {};
        if (!formData.password?.trim()) {
          newErrors.password = "Password is required";
        } 
        if (formData.password?.trim()) {
          const isValid =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?])[^\s]{8,}$/.test(formData.password?.trim());
          if(!isValid){
              newErrors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, one special character, and no spaces (e.g., Abc@1234).";
          }
            
        } 
  
      if ( !confirmPassword.trim()) {
        newErrors.confirmPassword= "Confirm password is required.";
      }
  
      if ( formData.password?.trim() && confirmPassword && formData.password?.trim() !== confirmPassword) {
        newErrors.confirmPassword= "Passwords and confirm password do not match.";
      }
  
        return newErrors;
  };

  const handelValidation=()=>{
   const validationErrors = validate();
        setErr(validationErrors);
}
  
    //generate Password
    const generatePassword=()=>{
      const pass=generateStrongPassword()
      setFormData({ ...formData, 'password': pass });
      setShowPassword(true)
      let timer;
      (function(){
          clearTimeout(timer)
          timer=setTimeout(()=>setShowPassword(false),4000)
      })()
      
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
        setErr(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
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

     
     


       <div className="mb-3">
            <label  className="form-label pull-left" style={{fontWeight:'500'}}>Password  <Tooltip
                      describeChild
                      title={
                        <div style={{lineHeight: "1.5",  fontSize:"12px"}}>
                          <div>1) Password must be at least 8 characters long.</div>
                          <div>2) Must contain at least one uppercase letter.</div>
                          <div>3) Must contain at least one lowercase letter.</div>
                          <div>4) Must contain at least one number.</div>
                          <div>5) Must contain at least one special character.</div>
                          <div>6) Spaces are not allowed.</div>
                        </div>
                          }
                        placement="right-start" arrow
                        lotprops={{
                                          tooltip: {
                                            sx: {
                                              lineHeight: "1",   // adjust line height
                                              fontSize:"14px"
                                            },
                                          },
                                        }}
      
              ><Info size={15}/> </Tooltip></label>
            <label  className="form-label pull-right generate-pass" style={{cursor:"pointer",fontWeight:'500'}} onClick={()=>generatePassword()}>Password generate</label>
            <div className="input-group input-group-lg">
                <input
                className="form-control"
                  id="password-field"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <span className="input-group-text"  
                 onMouseDown={() => setShowPassword(true)}   
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}>
                     {showPassword?<EyeIcon size={20}/>
                    :<EyeOff size={20}/>}
                </span>
            </div>
      </div>
       {err?.password && (
          <div
            style={{
              color: "red",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: '17px'
            }}
          >
            {err.password}
          </div>
        )}
 {/* password */}
        
       <div className="mb-3">
            <label  className="form-label" style={{fontWeight:'500'}}>Confirm Password</label>
            <div className="input-group input-group-lg">
                <input
                  className="form-control"
                  id="Confirm-password-field"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) => {setConfirmPassword(e.target.value), setErr({ ...err, confirmPassword:'' });}}
                  onFocus={()=>handelValidation()}
                   onKeyUp={()=>handelValidation()}
                />
                <span className="input-group-text"
                onMouseDown={() => setShowConfirm(true)}   
                onMouseUp={() => setShowConfirm(false)}
                onTouchStart={() => setShowConfirm(true)}
                onTouchEnd={() => setShowConfirm(false)}
                  style={{ cursor: "pointer" }}>
                   
                    {showConfirm?<EyeIcon size={20}/>
                    :<EyeOff size={20}/>}
                </span>
            </div>
      </div>
       {err?.confirmPassword && (
          <div
            style={{
              color: "red",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: '17px',
              marginBottom:"7px"
            }}
          >
            {err.confirmPassword}
          </div>
        )}





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
