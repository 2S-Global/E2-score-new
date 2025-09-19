"use client";

import Select from "react-select";
import { useState } from "react";

const PostBoxForm = () => {
  const [showBy, setShowBy] = useState("fixed"); // Track dropdown selection
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [jobLocationType, setJobLocationType] = useState(""); // Remote or On-site
  const [advertiseCity, setAdvertiseCity] = useState("No"); // Yes or No
  const [salaryStructure, setSalaryStructure] = useState("");

  // helper flags
  const selectedValues = selectedJobTypes.map((j) => j.value);

  const isPartTime = selectedValues.includes("Part-time");

  const isInternLike = selectedValues.some((v) =>
    ["Internship", "Contractual / Temporary", "Freelance"].includes(v)
  );


  // Map dropdown values → label names
  const labelMap = {
    fixed: "Fixed at",
    rangeFrom: "From",
    rangeTo: "To",
    maximum: "No more than",
    minimum: "No less than",
  };

  const specialisms = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

  const companyBenefits = [
    { value: "Health insurance", label: "Health insurance" },
    { value: "Provident Fund", label: "Provident Fund" },
    { value: "Cell phone reimbursement", label: "Cell phone reimbursement" },
    { value: "Paid sick time", label: "Paid sick time" },
    { value: "Work from home", label: "Work from home" },
    { value: "Paid time off", label: "Paid time off" },
    { value: "Food provided", label: "Food provided" },
    { value: "Life insurance", label: "Life insurance" },
    { value: "Internet reimbursement", label: "Internet reimbursement" },
    { value: "Commuter assistance", label: "Commuter assistance" },
    { value: "Leave encashment", label: "Leave encashment" },
    { value: "Flexible schedule", label: "Flexible schedule" },
  ];

  const jobTypes = [
    { value: "Full-time", label: "Full-time" },
    { value: "Permanent", label: "Permanent" },
    { value: "Fresher", label: "Fresher" },
    { value: "Part-time", label: "Part-time" },
    { value: "Internship", label: "Internship" },
    { value: "Contractual / Temporary", label: "Contractual / Temporary" },
    { value: "Freelance", label: "Freelance" },
    { value: "Volunteer", label: "Volunteer" },
  ];

  const contractLength = [
    { value: "month(s)", label: "month(s)" },
    { value: "week(s)", label: "week(s)" },
    { value: "day(s)", label: "day(s)" },
  ];

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 mt-2">
          <label>Job Title</label>
          <input type="text" name="name" placeholder="Title" />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Get application updates</label>
          <input type="text" name="name" placeholder="" />
        </div>

        {/* <!-- Username (Input) Pre Existing Code --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Username</label>
          <input type="text" name="name" placeholder="" />
        </div> */}

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Specialization </label>
          <Select
            defaultValue={[specialisms[2]]}
            isMulti
            name="colors"
            options={specialisms}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          {/* should uncomment this select */}
          {/* <Select
            defaultValue={[jobTypes[2]]}
            isMulti
            name="jobTypes"
            options={jobTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedJobTypes}
            onChange={setSelectedJobTypes}
          /> */}

          {/* below this select is for my testing purpose */}
          <Select
            defaultValue={[jobTypes[2]]}
            isMulti
            name="jobTypes"
            options={jobTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedJobTypes}
            onChange={(e) => {
              console.log("User picked by Chandra-Sarkar:", e);
              setSelectedJobTypes(e);
            }}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Number of Positions Available</label>
          <input type="number" name="positions" placeholder="" className="form-control" />
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
          <label>Job Expiry Date</label>
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

        {/* <!-- Input Pre Existing Code --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>$1500</option>
            <option>$2000</option>
            <option>$2500</option>
            <option>$3500</option>
            <option>$4500</option>
            <option>$5000</option>
          </select>
        </div> */}

        {/* Salary Part Added By Chandra  starts from here */}

        <div className="form-group col-lg-12 col-md-12">
          <label>Salary</label>
          <div className="d-flex gap-3">
            {/* Show pay by Dropdown */}
            <div className="flex-fill">
              <label className="form-label small">Show pay by</label>
              <select className="form-select" value={salaryStructure}
                onChange={(e) => {
                  setSalaryStructure(e.target.value);
                  console.log("Salary Structure By Chandra Sarkar: ", e.target.value);
                }
                }>
                <option value="range">Range</option>
                <option value="starting amount">Starting amount</option>
                <option value="maximum amount">Maximum amount</option>
                <option value="exact amount">Exact amount</option>
              </select>
            </div>

            {/* Currency Dropdown */}
            <div className="flex-fill">
              <label className="form-label small">Currency</label>
              <select className="form-select" name="expiryMonth">
                <option value="">₹</option>
                <option value="">$</option>
                <option value="">€</option>
                <option value="">£</option>
              </select>
            </div>

            {/* Minimum Salary Textfield*/}
            {salaryStructure && salaryStructure == "range" && (
              <div className="flex-fill">
                <label className="form-label small">Minimum</label>
                <input
                  type="text"
                  name="minSalary"
                  className="form-control"
                  placeholder="10,000"
                />
              </div>
            )}
            {/* Maximum Salary Textfield*/}
            <div className="flex-fill">
              <label className="form-label small">{salaryStructure === "range" ? "Maximum" : "Amount"}</label>
              <input
                type="text"
                name="maxSalary"
                className="form-control"
                placeholder="80,000"
              />
            </div>


            {/* Rate Dropdown */}
            <div className="flex-fill">
              <label className="form-label small">Rate</label>
              <select className="form-select" name="expiryYear">
                <option value="">per hour</option>
                <option value="">per day</option>
                <option value="">per week</option>
                <option value="">per month</option>
                <option value="">per year</option>
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
            defaultValue={[companyBenefits[2]]}
            isMulti
            name="colors"
            options={companyBenefits}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        {/* Benefits Part Added By Chandra ends here */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Internship</option>
            <option>Entry Level</option>
            <option>Associate</option>
            <option>Mid-Senior Level</option>
            <option>Manager / Supervisor</option>
            <option>Senior Manager</option>
            <option>Director</option>
            <option>Vice President</option>
            <option>Executive (CXO / CEO / CTO / CFO, etc.)</option>
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>Experience Level</label>
          <select className="chosen-single form-select">
            <option>0 - 1 Year</option>
            <option>1 - 2 Years</option>
            <option>2 - 3 Years</option>
            <option>3 - 5 Years</option>
            <option>5 - 7 Years</option>
            <option>7 - 10 Years</option>
            <option>10 - 15 Years</option>
            <option>15+ Years</option>
            <option>Fresher (No experience)</option>
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>Gender</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>All</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group col-lg-4 col-md-12">
          <label>Graduation Requirement</label>
          <select className="chosen-single form-select">
            <option value="">Select Requirement</option>
            <option value="graduates">Graduates Only</option>
            <option value="non-graduates">Non-Graduates Only</option>
            <option value="both">Both (No Restriction)</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Banking</option>
            <option>Digital & Creative</option>
            <option>Retail</option>
            <option>Human Resources</option>
            <option>Management</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <select className="chosen-single form-select">
            <option value="">Select Qualification</option>
            <option value="below-10">Below 10th</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="diploma">Diploma</option>
            <option value="certificate">Certificate Course</option>
            <option value="iti">ITI</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate (Bachelor’s Degree)</option>
            <option value="postgraduate">Postgraduate (Master’s Degree)</option>
            <option value="doctorate">Doctorate / PhD</option>
            <option value="professional">Other Professional Qualification</option>
            <option value="not-required">Not Required</option>
          </select>
        </div>

        {/* Job Location- Remote or On-site */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Which option best describes this job's location? </label>
          <select className="chosen-single form-select" value={jobLocationType} onChange={(e) => {
            setJobLocationType(e.target.value);
            console.log("Single select value by chandra: ", e.target.value);
            // setAdvertiseCity(""); // reset advertise choice when changing type
          }}>
            <option value="">Select</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        {/* Show when On-site */}
        {jobLocationType === "on-site" && (
          <>
            <div className="form-group col-lg-6 col-md-12">
              <label>Country</label>
              <select className="chosen-single form-select">
                <option>Australia</option>
                <option>Pakistan</option>
                <option>Chaina</option>
                <option>Japan</option>
                <option>India</option>
              </select>
            </div>

            {/* <!-- Input --> */}
            <div className="form-group col-lg-6 col-md-12">
              <label>City</label>
              <select className="chosen-single form-select">
                <option>Melbourne</option>
                <option>Pakistan</option>
                <option>Chaina</option>
                <option>Japan</option>
                <option>India</option>
              </select>
            </div>

            {/* brance dropdown */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Branch</label>
              <select className="chosen-single form-select">
                <option>Select</option>
                <option>Kolkata Branch</option>
                <option>Mumbai Branch</option>
                <option>Delhi Branch</option>
              </select>
            </div>

            {/* <!-- Input --> */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Complete Address</label>
              <input
                type="text"
                name="name"
                placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
              />
            </div>
          </>
        )}


        {/* Show when Remote */}
        {jobLocationType === "remote" && (
          <div className="form-group col-lg-12 col-md-12">
            <label className="form-label">
              Do you want to advertise your job in a specific city?
            </label>
            <div className="d-flex gap-3">

              {/* No Option */}
              <label className="form-check-label">
                <input
                  type="radio"
                  name="advertise_city"
                  value="No"
                  checked={advertiseCity === "No"}
                  onChange={(e) => setAdvertiseCity(e.target.value)}
                  className="form-check-input me-2"
                />
                No (Anywhere in India)
              </label>

              {/* Yes Option */}
              <label className="form-check-label">
                <input
                  type="radio"
                  name="advertise_city"
                  value="Yes"
                  checked={advertiseCity === "Yes"}
                  onChange={(e) => setAdvertiseCity(e.target.value)}
                  className="form-check-input me-2"
                />
                Yes
              </label>

            </div>
          </div>
        )}
        {/* <!-- Input --> */}
        {/* Show when Remote + Yes */}
        {jobLocationType === "remote" && advertiseCity === "Yes" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Where do you want to advertise this job? </label>
            <input type="text" name="name" placeholder="" />
          </div>
        )}


        {/* 
        <div className="form-group col-lg-3 col-md-12">
          <label>Latitude</label>
          <input type="text" name="name" placeholder="Melbourne" />
        </div>

       
        <div className="form-group col-lg-3 col-md-12">
          <label>Longitude</label>
          <input type="text" name="name" placeholder="Melbourne" />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <button className="theme-btn btn-style-three">Search Location</button>
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Next</button>
        </div>
      </div>
    </form >
  );
};

export default PostBoxForm;
