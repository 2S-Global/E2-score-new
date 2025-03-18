/*  */

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";

const locations = [
  { label: "Kolkata", value: "Kolkata" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Chennai", value: "Chennai" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Pune", value: "Pune" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Chandigarh", value: "Chandigarh" }
];

const CareerModal = ({ show, onClose }) => {
    const [currency, setCurrency] = useState("INR");
  const [salary, setSalary] = useState("");
  
    const [selectedLocations, setSelectedLocations] = useState([]);
    const handleChange = (selectedOptions) => {
        if (selectedOptions.length <= 10) {
          setSelectedLocations(selectedOptions);
        }
      };
      const handleRemoveLocation = (locationToRemove) => {
        setSelectedLocations(selectedLocations.filter((loc) => loc.value !== locationToRemove));
      };


 const industry =[
    { label: "Finance", value: "finance" },
    { label: "Marketing", value: "marketing" },
    { label: "IT", value: "it" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Education", value: "education" },
    { label: "Engineering", value: "engineering" },
    { label: "Sales", value: "sales" },
    { label: "Product Management", value: "product-management" },
    { label: "Customer Service", value: "customer-service" },
    { label: "Creative", value: "creative" },
    { label: "Operations", value: "operations" },
    { label: "Data Science", value: "data-science" },
    { label: "Research", value: "research" },
    { label: "Project Management", value: "project-management" },
 ];
 const Department = [
    { label: "Marketing & PR", value: "marketing-pr" },
    { label: "Public Relations", value: "public-relations" },
    { label: "Advertising", value: "advertising" },
    { label: "Sales & Marketing", value: "sales-marketing" },
    { label: "Product Management", value: "product-management" },
    { label: "Customer Service", value: "customer-service" },
    { label: "Finance", value: "finance" },
    { label: "Operations", value: "operations" },
    { label: "IT", value: "it" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Education", value: "education" },
    { label: "Engineering", value: "engineering" },
    { label: "Sales", value: "sales" }
 ];

 const job_role =[
    { label: "Software Engineer", value: "software-engineer" },
    { label: "Product Manager", value: "product-manager" },
    { label: "UX/UI Designer", value: "ux-ui-designer" },
    { label: "Data Scientist", value: "data-scientist" },
    { label: "Project Manager", value: "project-manager" },
    { label: "Finance Analyst", value: "finance-analyst" },
    { label: "Operations Manager", value: "operations-manager" },
    { label: "Customer Service Representative", value: "customer-service-representative" },
    { label: "Marketing Manager", value: "marketing-manager" },
    { label: "HR Manager", value: "hr-manager" },
    { label: "Finance Manager", value: "finance-manager" },
 ];
 const salaryCurrencies = [
    { label: "₹", value: "INR" },
    { label: "$", value: "USD" },
    { label: "€", value: "EUR" },
    { label: "£", value: "GBP" },
  ];
  
 






  if (!show) return null;

  return (<>
   <style>
{`
  .custom-textarea::placeholder {
    color: #c7c5c5!important;
    font-size: 15px !important;
  
  }
`}
</style>
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Career profile</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p style={{ color: 'black' }}>Add details about your current and preferred job profile. This helps us personalise your job recommendations.</p>

            
            <form>
                {/* Current industry */}
            <div className="mb-3">
                <label className="form-label">Current industry</label>
                <select className="form-select" onChange={(e) => setIndustry(e.target.value)}>
                    <option value="">Select industry</option>
                    {industry.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            
            </div>

            {/* Current department */}
            <div className="mb-3">
                <label className="form-label">Current department</label>
                <select className="form-select" onChange={(e) => setDepartment(e.target.value)}>
                    <option value="">Select department</option>
                    {Department.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {/* Current job role */}
            <div className="mb-3">
                <label className="form-label">Role category</label>
                <select className="form-select" onChange={(e) => setJobRole(e.target.value)}>
                    <option value="">Select job role</option>
                    {job_role.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {/* Current job role */}
            <div className="mb-3">
                <label className="form-label">Job role</label>
                <select className="form-select" onChange={(e) => setJobRole(e.target.value)}>
                    <option value="">Select job role</option>
                    {job_role.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desired job type (CHECKBOX) */} 
               <div className="mb-3">
                <label className="form-label">Desired job type</label>
                <div className="row">
    <div className="col-md-6 form-check" style={{ paddingLeft: '35px' }}>
      <input className="form-check-input" type="checkbox" id="full-time" />
      <label className="form-check-label" htmlFor="full-time">Parmanent</label>
    </div>
    <div className="col-md-6 form-check">
      <input className="form-check-input" type="checkbox" id="part-time" />
      <label className="form-check-label" htmlFor="part-time">Contractual</label>
    </div>
  </div>
                
            </div>

                 {/* Desired Employment type (CHECKBOX) */} 
                 <div className="mb-3">
  <label className="form-label">Desired employment type</label>
  <div className="row">
    <div className="col-md-6 form-check "style={{ paddingLeft: '35px' }}>
      <input className="form-check-input" type="checkbox" id="full-time" />
      <label className="form-check-label" htmlFor="full-time">Full-time</label>
    </div>
    <div className="col-md-6 form-check">
      <input className="form-check-input" type="checkbox" id="part-time" />
      <label className="form-check-label" htmlFor="part-time">Part-time</label>
    </div>
  </div>
</div>

{/* Preferred work location (Max 10) */}
<div className="mb-3">
      <label className="form-label"><b>Preferred work location (Max 10)</b></label>
      <Select
        isMulti
        options={locations}
        value={selectedLocations}
        onChange={handleChange}
        placeholder="Tell us your location preferences to work"
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
    {/* salary */}
    <div className="mb-3">
      <label className="form-label"><b>Expected salary</b></label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Currency Selector */}
        <select
          className="form-select"
          style={{ width: "60px", padding: "5px" }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {salaryCurrencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Salary Input */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter expected salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
    </div>






            </form>

            
          </div>

          {/* Footer Buttons */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CareerModal;
