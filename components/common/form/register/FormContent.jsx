import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {EyeIcon,EyeOff,Info} from "lucide-react"
//new component
import MessageComponent from "../../ResponseMsg";
import AutoDetectPhoneInput from "../phonenumber";
import {generateStrongPassword} from "../../../../utils/generatePassword"
import Tooltip from '@mui/material/Tooltip';
const FormContent = () => {
  const [formData, setFormData] = useState({
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
  //password 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  //validation error
  const [err, setErr] = useState(null);
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  // Handle input changes
  const handleChange = (e) => {
     setErr({ ...err, [e.target.name]:'' });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const infromation=`Password must be at least 8 characters long and include at least one uppercase letter, 
                    one lowercase letter, one number, one special character, 
                    and no spaces (e.g., Abc@1234).`
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


  // Handle form submission
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

    //console.log(formData);

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/register`,
        formData
      );

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
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  }
  };

  const setPhone = (phone) => {
    setFormData({ ...formData, phone_number: phone });
  };
  const [disablesubmit, setDisableSubmit] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      {/* display error */}
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      <div className="form-group mb-1">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-1">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {/* <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </div> */}

      <AutoDetectPhoneInput
        phone={formData.phone_number}
        setPhone={setPhone}
        setDisableSubmit={setDisableSubmit}
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

        
       <div className="mb-3">
            <label  className="form-label" style={{fontWeight:'500'}}>Confirm Password</label>
            <div className="input-group input-group-lg">
                <input
                  className="form-control"
                  id="Confirm-password-field"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {setConfirmPassword(e.target.value), setErr({ ...err, confirmPassword:'' });}}
                  autoComplete="new-password"
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

      {/*  {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>} */}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={loading || disablesubmit}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
};

export default FormContent;
