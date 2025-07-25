"use client";

import Select from "react-select";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LogoCoverUploader from "./LogoCoverUploader";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
import axios from "axios";

import { Search } from "lucide-react";
import { es } from "date-fns/locale";
import { about } from "@/data/mainMenuData";
import { set } from "date-fns";
const FormInfoBox = () => {
  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];
  /* cin 
regex= "^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$"
*/
  const [disableform, setDisableform] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [message_id, setMessageId] = useState(null);

  const [success, setSuccess] = useState(null);

  const [formdata, setFormdata] = useState({
    cin: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    established: "",
    teamsize: "",
    industry_type: [],
    allowinsearch: true,
    about: "",
    logo: null,
    cover: null,
  });

  const handelcinsubmit = async () => {
    const regex =
      /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
    if (regex.test(formdata.cin)) {
      try {
        setDisableform(true);
        setLoading(true);
        setError(null);
        setErrorId(null);
        setSuccess(null);
        setMessageId(null);

        const response = await axios.post(
          `${apiurl}/api/companyprofile/search_company_by_cin`,
          {
            cin: formdata.cin,
          }
        );
        if (response.data.success) {
          setFormdata({
            ...formdata,
            cin: response.data.data.cinnumber,
            name: response.data.data.companyname,
            email: response.data.data.companyemail,
            phone: response.data.data.companyphone,
            address: response.data.data.companyaddress,
            /*    website: "",
            established: "",
            teamsize: "",
            industry_type: [],
            allowinsearch: true,
            about: "",
            logo: null,
            cover: null, */
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
        setDisableform(false);
      }
    } else {
      setError("Invalid CIN Please Enter Valid CIN or Enter Manually");
      setErrorId(Date.now());
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

      <form className="default-form">
        <div className="form-group">
          <label className="mb-1">CIN</label>
          <div className="d-flex align-items-stretch gap-2">
            <input
              type="text"
              name="name"
              placeholder="Enter company CIN"
              value={formdata.cin}
              onChange={(e) =>
                setFormdata({ ...formdata, cin: e.target.value })
              }
              required
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handelcinsubmit()}
            >
              <Search />
            </button>

            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setDisableform(false)}
            >
              Enter Manually
            </button>
          </div>
        </div>

        <div
          className="row"
          style={{
            pointerEvents: disableform ? "none" : "auto",
            opacity: disableform ? 0.5 : 1,
          }}
        >
          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Company name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter company name"
              value={formdata.name}
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
              required
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Email address</label>
            <input
              type="email"
              name="name"
              placeholder="Enter email address"
              value={formdata.email}
              onChange={(e) =>
                setFormdata({ ...formdata, email: e.target.value })
              }
              required
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Phone</label>
            <input
              type="text"
              name="name"
              placeholder="0 123 456 7890"
              value={formdata.phone}
              onChange={(e) =>
                setFormdata({ ...formdata, phone: e.target.value })
              }
              required
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Website</label>
            <input
              type="text"
              name="name"
              placeholder="www.example.com"
              value={formdata.website}
              onChange={(e) =>
                setFormdata({ ...formdata, website: e.target.value })
              }
              required
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12 d-flex flex-column">
            <label>Est. Since</label>
            <DatePicker
              selected={
                formdata.established ? new Date(formdata.established) : null
              }
              onChange={(date) =>
                setFormdata({ ...formdata, established: date })
              }
              dateFormat="dd/MM/yyyy"
              className="form-control"
              required
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Team Size</label>
            <select
              className="chosen-single form-select"
              required
              value={formdata.teamsize}
              onChange={(e) =>
                setFormdata({ ...formdata, teamsize: e.target.value })
              }
            >
              <option value="less_than_50">Less than 50</option>
              <option value="50_100">50 - 100</option>
              <option value="101_500">101 - 500</option>
              <option value="501_1000">501 - 1000</option>
              <option value="more_than_1000">More than 1000</option>
            </select>
          </div>

          {/* <!-- Search Select --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Industry Type</label>
            <Select
              isMulti
              name="colors"
              options={catOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={formdata.industry}
              onChange={(e) => setFormdata({ ...formdata, industry: e })}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Allow In Search & Listing</label>
            <select
              className="chosen-single form-select"
              value={formdata.searchlisting}
              onChange={(e) =>
                setFormdata({ ...formdata, searchlisting: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* <!-- About Company --> */}
          <div className="form-group col-lg-12 col-md-12">
            <label>About Company</label>
            <textarea
              value={formdata.about}
              onChange={(e) =>
                setFormdata({ ...formdata, about: e.target.value })
              }
              placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
            ></textarea>
          </div>

          <LogoCoverUploader formdata={formdata} setFormdata={setFormdata} />
          {/* End logo and cover photo components */}

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <button className="theme-btn btn-style-one">Save</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormInfoBox;
