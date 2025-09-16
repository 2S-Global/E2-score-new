"use client";

import Select from "react-select";
import { useState } from "react";

const PostBoxForm = () => {
  const [showBy, setShowBy] = useState(""); // Track dropdown selection

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
          <label>Email Address</label>
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
          <Select
            defaultValue={[jobTypes[2]]}
            isMulti
            name="colors"
            options={jobTypes}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Number of Positions Available</label>
          <input type="number" name="name" placeholder="" />
        </div>

        {/* Fixed Timing for Part Time */}
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
              <select className="form-select" name="expiryDay">
                <option value="">Range</option>
                <option value="">Starting amount</option>
                <option value="">Maximum amount</option>
                <option value="">Exact amount</option>
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
            <div className="flex-fill">
              <label className="form-label small">Minimum</label>
              <input
                type="text"
                name="minSalary"
                className="form-control"
                placeholder="10,000"
              />
            </div>
            {/* Maximum Salary Textfield*/}
            <div className="flex-fill">
              <label className="form-label small">Maximum</label>
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
            <option>Banking</option>
            <option>Digital & Creative</option>
            <option>Retail</option>
            <option>Human Resources</option>
            <option>Management</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
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
          <label>Gender</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
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
            <option>Select</option>
            <option>Banking</option>
            <option>Digital & Creative</option>
            <option>Retail</option>
            <option>Human Resources</option>
            <option>Management</option>
          </select>
        </div>

        {/* <!-- Input --> */}
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

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
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
    </form>
  );
};

export default PostBoxForm;
