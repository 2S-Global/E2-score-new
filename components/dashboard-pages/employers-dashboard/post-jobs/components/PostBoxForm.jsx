"use client";

import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const PostBoxForm = () => {
  const [showBy, setShowBy] = useState("fixed"); // Track dropdown selection
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [jobLocationType, setJobLocationType] = useState(""); // Remote or On-site
  const [advertiseCity, setAdvertiseCity] = useState("No"); // Yes or No
  const [salaryStructure, setSalaryStructure] = useState("");

  //main
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  if (!token) {
    console.log("No token");
  }

  // API list
  const [specialization, setSpecialization] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [careerLevel, setCareerLevel] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [gender, setGender] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [branch, setBranch] = useState([]);

  //  Code added by Chandra Sarkar on 22th september 2025  -- starts from here
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    getApplicationUpdateEmail: "",
    specialization: [],
    jobType: [],
    positionAvailable: "",
    jobExpiryDate: null,
    salary: {
      structure: "range",
      currency: "₹",
      min: null,
      max: null,
      amount: null,
      rate: "per year",
    },
    benefits: [],
    careerLevel: "",
    experienceLevel: "",
    gender: [],
    industry: "",
    qualification: [],
    jobLocationType: "",
    country: "",
    city: "",
    branch: "",
    address: "",
    advertiseCity: "",
    advertiseCityName: "",
  });

  const handleChange = (e) => {
    // console.log("Console By Chandra Sarkar: ", e.target.value);
    const { name, value } = e.target;

    /*
    if (name === "full_name") {
      const onlyLetters = /^[A-Za-z\s]*$/; // Allow letters and spaces only

      if (!onlyLetters.test(value)) {
        return; // Don't update state if invalid character
      }
    }

    if (name === "phone") {
      const onlyNumbers = /^[0-9]*$/; // Only numbers allowed

      // If value contains any non-numeric characters, prevent update
      if (!onlyNumbers.test(value)) {
        return; // Don't update state if invalid character
      }

      // Check for exact 10 characters
      if (value.length > 10) {
        return; // Prevent more than 10 characters
      }
    }

    */
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    console.log("I am getting value from date picker in Job Posting Section -- Chandra Sarkar : ", date);
    if (date) {
      setFormData({ ...formData, jobExpiryDate: date }); // Store raw Date object
    }
  };

  //  Code added by Chandra Sarkar on 22th september 2025  -- till the end

  // helper flags
  const selectedValues = selectedJobTypes.map((j) => j.value);

  const isPartTime = selectedValues.includes("Part-time");

  const isInternLike = selectedValues.some((v) =>
    ["Internship", "Contractual / Temporary", "Freelance"].includes(v)
  );

  useEffect(() => {
    const fetchSpecialization = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/jobposting/all_job_specializations`);
        const data = await response.json();
        setSpecialization(data.data.map((item) => ({ label: item.name, value: item._id })));
      } catch (error) {
        console.error("Error fetching genders:", error);
      } finally {
        // setLoading(false);
      }
    };


    const fetchJobType = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          `${apiurl}/api/jobposting/all_job_types`
        );
        const data = await response.json();
        setJobType(data.data.map((item) => ({ label: item.name, value: item.name })));
      } catch (error) {
        console.error("Error fetching more info list:", error);
      } finally {
        // setLoading(false);
      }
    };

    const fetchBenefits = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          `${apiurl}/api/jobposting/all_job_benefits`
        );
        const data = await response.json();
        setBenefits(data.data.map((item) => ({ label: item.name, value: item._id })));
      } catch (error) {
        console.error("Error fetching marriage status list:", error);
      } finally {
        // setLoading(false);
      }
    };

    const fetchCareerLevels = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          `${apiurl}/api/jobposting/all_job_career_levels`
        );
        const data = await response.json();
        console.log("Career Levels Data by mee :) :", data);
        // setCategories(data.data);
        setCareerLevel(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        // setLoading(false);
      }
    };

    const fetchExperienceLevel = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/jobposting/all_job_experience_levels`);
        const data = await response.json();
        setExperienceLevel(data.data);
      } catch (error) {
        console.error("Error fetching USA visa list:", error);
      } finally {
        // setLoading(false);
      }
    };

    const fetchGender = async () => {
      //  setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/All_gender`);
        const data = await response.json();
        setGender(
          data.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        //  setLoading(false);
      }
    };

    const fetchIndustry = async () => {
      //  setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/get_industry`);
        const data = await response.json();
        setIndustry(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        //  setLoading(false);
      }
    };

    const fetchQualification = async () => {
      //  setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/jobposting/all_job_qualifications`);
        const data = await response.json();
        setQualification(data.data.map((item) => ({ label: item.name, value: item._id })));
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        //  setLoading(false);
      }
    };

    const fetchCountry = async () => {
      //  setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/All_contry`);
        const data = await response.json();
        setCountry(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        //  setLoading(false);
      }
    };

    const fetchCity = async () => {
      //  setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/get_india_cities`);
        const data = await response.json();
        setCity(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        //  setLoading(false);
      }
    };

    const fetchBranches = async () => {
      //  setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/jobposting/all_company_branches`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Branches Data by mee should only data :) :", response.data.data);
        if (response.status === 200) {
          console.log("All Company Branches fetched successfully");
          setBranch(response.data.data);
        }
        // setCity(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        //  setLoading(false);
      }
    };

    fetchSpecialization();
    fetchJobType();
    fetchBenefits();
    fetchCareerLevels();
    fetchExperienceLevel();
    fetchGender();
    fetchIndustry();
    fetchQualification();
    fetchCountry();
    fetchCity();
    fetchBranches();
  }, [apiurl]);

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  // Map dropdown values → label names
  const labelMap = {
    fixed: "Fixed at",
    rangeFrom: "From",
    rangeTo: "To",
    maximum: "No more than",
    minimum: "No less than",
  };

  const contractLength = [
    { value: "month(s)", label: "month(s)" },
    { value: "week(s)", label: "week(s)" },
    { value: "day(s)", label: "day(s)" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 mt-2">
          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required id="jobTitle" placeholder="Title" />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present" name="jobDescription" value={formData.jobDescription} onChange={handleChange} required id="jobDescription"></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="getApplicationUpdateEmail">Get application updates</label>
          <input type="text" name="getApplicationUpdateEmail" id="getApplicationUpdateEmail" value={formData.getApplicationUpdateEmail} onChange={handleChange} required placeholder="" />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label >Specialization </label>
          <Select
            isMulti
            name="specialization"
            options={specialization}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.specialization}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                specialization: selectedOptions || [],
              }))
            }
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <Select
            isMulti
            name="jobType"
            options={jobType}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.jobType}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                jobType: selectedOptions || [],
              }))
            }
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label htmlFor="positionAvaiable">Number of Positions Available</label>
          <input type="number" name="positionAvailable" id="positionAvaiable" value={formData.positionAvailable} onChange={handleChange} required placeholder="" className="form-control" />
        </div>


        {/* Part-time => Expected hours */}
        {/* Fixed Timing for Part Time */}

        {isPartTime && (
          <div className="form-group col-lg-12 col-md-12">
            <label>Expected hours</label>
            <div className="d-flex gap-3">
              {/* Show pay by Dropdown */}
              <div className="flex-fill">
                <label className="form-label small">Show by</label>
                <select className="form-select" value={showBy} onChange={(e) => setShowBy(e.target.value)}>
                  <option value="">Select</option>
                  <option value="fixed">Fixed hours</option>
                  <option value="range">Range</option>
                  <option value="maximum">Maximum</option>
                  <option value="minimum">Minimum</option>
                </select>
              </div>

              {/* Single input for Fixed/Maximum/Minimum */}
              {/* Minimum Salary Textfield*/}
              {showBy && showBy !== "range" && (
                <div className="flex-fill">
                  <label className="form-label small">{labelMap[showBy]}</label>
                  <input
                    type="text"
                    name={showBy}
                    className="form-control"
                    placeholder="Enter hours"
                  />
                </div>
              )}

              {/* Two inputs for Range */}
              {showBy === "range" && (
                <>
                  <div className="flex-fill">
                    <label className="form-label small">From</label>
                    <input
                      type="number"
                      name="fromHours"
                      className="form-control"
                      placeholder="e.g. 4"
                    />
                  </div>
                  <div className="flex-fill">
                    <label className="form-label small">To</label>
                    <input
                      type="number"
                      name="toHours"
                      className="form-control"
                      placeholder="e.g. 8"
                    />
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        {/* Contract Timings */}
        {isInternLike && (
          <div className="form-group col-lg-12 col-md-12">
            <label>How long is the contract?</label>
            <div className="d-flex gap-3">
              {/* Show pay by Dropdown */}
              <div className="flex-fill">
                <label className="form-label small">Length</label>
                <input type="number" name="name" placeholder="" />
              </div>

              {/* Single input for Fixed/Maximum/Minimum */}
              {/* Minimum Salary Textfield*/}
              <div className="flex-fill">
                <label className="form-label small">Period</label>
                <select className="form-select" name="expiryDay">
                  <option value="">month(s)</option>
                  <option value="">week(s)</option>
                  <option value="">day(s)</option>
                </select>
              </div>

            </div>
          </div>
        )}


        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Expiry Date123</label>
          <div className="d-flex gap-3">
            {/* Day Dropdown */}
            <select className="form-select" name="expiryDay">
              <option value="">Day</option>
              {[...Array(31).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>

            {/* Month Dropdown */}
            <select className="form-select" name="expiryMonth">
              <option value="">Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select className="form-select" name="expiryYear">
              <option value="">Year</option>
              {[...Array(10).keys()].map((i) => {
                const year = new Date().getFullYear() + i; // Current year + 10 years ahead
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>


        {/* Date Picker added by me --Chandra Sarkar -- starts from here */}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="mb-3 form-group">
            <label htmlFor="jobExpiryDate" className="form-label">
              <b>
                Job Expiry Date{" "}
                <span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <DatePicker
              value={formData.jobExpiryDate ? new Date(formData.jobExpiryDate) : null}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  id: "jobExpiryDate",
                  required: true,
                  placeholder: "dd/mm/yyyy",
                  className: "form-control",
                  style: {
                    backgroundColor: "#f0f5f7",
                    border: "1px solid #f0f5f7",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    transition: "all 300ms ease",
                  },
                },
              }}
            />
          </div>
        </LocalizationProvider>

        {/* Date Picker added by me --Chandra Sarkar -- ended here */}

        {/* Salary Part Added By Chandra  starts from here */}

        <div className="form-group col-lg-12 col-md-12">
          <label>Salary</label>
          <div className="d-flex gap-3">
            {/* Show pay by Dropdown */}
            <div className="flex-fill">
              <label className="form-label small">Show pay by</label>
              <select className="form-select" value={formData.salary.structure}
                onChange={(e) => {
                  const structure = e.target.value;

                  // Reset fields based on selected structure
                  let newSalary = { ...formData.salary, structure };

                  switch (structure) {
                    case "range":
                      newSalary.min = null;
                      newSalary.max = null;
                      newSalary.amount = null;
                      break;
                    case "starting amount":
                      newSalary.min = null;  // only starting amount relevant
                      newSalary.max = null;
                      newSalary.amount = null;
                      break;
                    case "maximum amount":
                      newSalary.min = null;
                      newSalary.max = null;
                      newSalary.amount = null;
                      break;
                    case "exact amount":
                      newSalary.min = null;
                      newSalary.max = null;
                      newSalary.amount = null;
                      break;
                    default:
                      break;
                  }

                  setFormData({ ...formData, salary: newSalary });
                }}>
                <option value="range">Range</option>
                <option value="starting amount">Starting amount</option>
                <option value="maximum amount">Maximum amount</option>
                <option value="exact amount">Exact amount</option>
              </select>
            </div>

            {/* Currency Dropdown */}
            <div className="flex-fill">
              <label className="form-label small">Currency</label>
              <select className="form-select" value={formData.salary.currency} onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: { ...formData.salary, currency: e.target.value },
                })
              }>
                <option value="₹">₹</option>
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="£">£</option>
              </select>
            </div>

            {/* Minimum Salary Textfield*/}
            {(formData.salary.structure === "range") && (
              <div className="flex-fill">
                <label className="form-label small">Minimum</label>
                <input
                  type="text"
                  value={formData.salary.min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: { ...formData.salary, min: e.target.value },
                    })
                  }
                  className="form-control"
                  placeholder="400000"
                />
              </div>
            )}
            {/* Maximum Salary Textfield*/}
            <div className="flex-fill">
              <label className="form-label small">{formData.salary.structure === "range" ? "Maximum" : "Amount"}</label>
              <input
                type="text"
                value={
                  formData.salary.structure === "range"
                    ? formData.salary.max || ""
                    : formData.salary.amount || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (formData.salary.structure === "range") {
                    setFormData({
                      ...formData,
                      salary: { ...formData.salary, max: value },
                    });
                  } else {
                    setFormData({
                      ...formData,
                      salary: { ...formData.salary, amount: value },
                    });
                  }
                }}
                className="form-control"
                placeholder={
                  formData.salary.structure === "range" || formData.salary.structure === "maximum amount"
                    ? "800000"
                    : "400000"
                }
              />
            </div>


            {/* Rate Dropdown */}
            <div className="flex-fill">
              <label className="form-label small">Rate</label>
              <select className="form-select" value={formData.salary.rate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: { ...formData.salary, rate: e.target.value },
                  })
                }>
                <option value="per hour">per hour</option>
                <option value="per day">per day</option>
                <option value="per week">per week</option>
                <option value="per month">per month</option>
                <option value="per year">per year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Salary Part Added By Chandra ends here */}

        {/* Benefits Added By Chandra starts from here */}
        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Benefits </label>
          <Select
            isMulti
            name="benefits"
            options={benefits}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.benefits}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                benefits: selectedOptions || [],
              }))
            }
          />
        </div>
        {/* Benefits Part Added By Chandra ends here */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select className="chosen-single form-select" value={formData.careerLevel} onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              careerLevel: e.target.value,
            }));
          }}>
            <option value="">Select</option>
            {careerLevel.map((level) => (
              <option key={level._id} value={level._id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Experience Level</label>
          <select className="chosen-single form-select" value={formData.experienceLevel} onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              experienceLevel: e.target.value,
            }));
          }}>
            <option value="">Select</option>
            {experienceLevel.map((level) => (
              <option key={level._id} value={level._id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <Select
            isMulti
            name="gender"
            options={gender}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.gender}
            onChange={(selectedOptions) => {
              setFormData((prev) => ({
                ...prev,
                gender: selectedOptions || [],
              }))
            }
            }
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <select className="chosen-single form-select" value={formData.industry} onChange={(e) => {
            setFormData((prev) => ({ ...prev, industry: e.target.value }))
          }}>
            <option value="">Select</option>
            {industry.map((level) => (
              <option key={level.id} value={level.id}>
                {level.job_industry}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <Select
            isMulti
            name="qualification"
            options={qualification}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.qualification}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                qualification: selectedOptions || [],
              }))
            }
          />
        </div>

        {/* Job Location- Remote or On-site */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Which option best describes this job's location? </label>
          <select className="chosen-single form-select" value={formData.jobLocationType} onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              jobLocationType: e.target.value,
            }));
          }}>
            <option value="">Select</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        {/* Show when On-site */}
        {formData.jobLocationType === "on-site" && (
          <>
            <div className="form-group col-lg-6 col-md-12">
              <label>Country</label>
              <select className="chosen-single form-select" value={formData.country}
                onChange={(e) => {
                  console.log("Country selected value -- Chandra Sarkar : ", e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                }>
                <option value="">Select</option>
                {country.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Input --> */}
            <div className="form-group col-lg-6 col-md-12">
              <label>City</label>
              <select className="chosen-single form-select" value={formData.city}
                onChange={(e) => {
                  console.log("City selected value -- Chandra Sarkar : ", e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                }>
                <option value="">Select</option>
                {city.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.city_name}
                  </option>
                ))}
              </select>
            </div>

            {/* brance dropdown */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Branch</label>
              <select className="chosen-single form-select" value={formData.branch}
                onChange={(e) => {
                  console.log("Branch selected value -- Chandra Sarkar : ", e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    branch: e.target.value,
                  }))
                }
                }>
                <option value="">Select</option>
                {branch.map((level) => (
                  <option key={level._id} value={level._id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Input --> */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Complete Address</label>
              <input
                type="text"
                name="name"
                placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                value={formData.address}
                onChange={(e) => {
                  console.log("Complete Address selected value -- Chandra Sarkar : ", e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                }
              />
            </div>
          </>
        )}


        {/* Show when Remote */}
        {formData.jobLocationType === "remote" && (
          <div className="form-group col-lg-12 col-md-12">
            <label className="form-label">
              Do you want to advertise your job in a specific city?
            </label>
            <div className="d-flex gap-3">

              {/* No Option */}
              <label className="form-check-label">
                <input
                  type="radio"
                  name="advertiseCity"
                  value="No"
                  checked={formData.advertiseCity === "No"}
                  onChange={(e) => {
                    console.log("Advertise City for No Option -- Chandra Sarkar : ", e.target);
                    setFormData((prev) => ({
                      ...prev,
                      advertiseCity: e.target.value,
                      advertiseCityName: "",
                    }))
                  }
                  }
                  className="form-check-input me-2"
                />
                No (Anywhere in India)
              </label>

              {/* Yes Option */}
              <label className="form-check-label">
                <input
                  type="radio"
                  name="advertiseCity"
                  value="Yes"
                  checked={formData.advertiseCity === "Yes"}
                  onChange={(e) => {
                    console.log("Advertise City for Yes Option -- Chandra Sarkar : ", e.target);
                    setFormData((prev) => ({
                      ...prev,
                      advertiseCity: e.target.value,
                    }))
                    }
                  }
                  className="form-check-input me-2"
                />
                Yes
              </label>

            </div>
          </div>
        )}
        {/* <!-- Input --> */}
        {/* Show when Remote + Yes */}
        {formData.jobLocationType === "remote" && formData.advertiseCity === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Where do you want to advertise this job? </label>
            <input type="text" name="name" placeholder="" />
          </div>
        )}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Next</button>
        </div>
      </div>
    </form >
  );
};

export default PostBoxForm;