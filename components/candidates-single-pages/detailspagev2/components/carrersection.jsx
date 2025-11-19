"use client";

import React, { useState, useEffect } from "react";

const CareerSection = ({ data }) => {
  const salaryCurrencies = [
    { label: "₹", value: "INR" },
    { label: "$", value: "USD" },
    { label: "€", value: "EUR" },
    { label: "£", value: "GBP" },
  ];

  const [userdata, setUserdata] = useState({
    industry: "",
    industry_name: data.industry_name || "",
    department: "",
    department_name: data.department_name || "",
    job_role: "",
    job_role_name: data.job_role_name || "",
    job_type: data.job_type || "",
    employment_type: data.employment_type || "",
    work_location: "",
    work_location_name: data.work_location_name || "",
    currency_type: data.currency_type || "",
    expected_salary: data.expected_salary || "",
    shift: data.shift || "",
  });

  useEffect(() => {
    if (!data) return;
    setUserdata({
      industry: "",
      industry_name: data.industry_name || "",
      department: "",
      department_name: data.department_name || "",
      job_role: "",
      job_role_name: data.job_role_name || "",
      job_type: data.job_type || "",
      employment_type: data.employment_type || "",
      work_location: "",
      work_location_name: data.work_location_name || "",
      currency_type: data.currency_type || "",
      expected_salary: data.expected_salary || "",
      shift: data.shift || "",
    });
  }, [data]);

  return (
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          {/* Title with Edit Icon */}
          <div
            className="widget-title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Career Profile</h4>
          </div>

          {/* Career Profile Details */}

          <>
            <div className="widget-content container">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <strong>Current Industry</strong>
                  <div className="">
                    {userdata.industry_name ? (
                      userdata.industry_name
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <strong>Department</strong>
                  <div className="">
                    {userdata.department_name ? (
                      userdata.department_name
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <strong>Job Role</strong>
                  <div className="">
                    {userdata.job_role_name ? (
                      userdata.job_role_name
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <strong>Desired Job Type</strong>
                  <div className="">
                    {userdata.job_type ? (
                      userdata.job_type
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <strong>Desired Employment Type</strong>
                  <div className="">
                    {userdata.employment_type ? (
                      userdata.employment_type
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <strong>Preferred Shift</strong>
                  <div>
                    {userdata?.shift && typeof userdata.shift !== "function" ? (
                      userdata.shift
                    ) : (
                      <span className="text-danger fw-semibold">
                        No data available
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <strong>Preferred Work Location</strong>
                  <div className="">
                    {userdata.work_location_name ? (
                      userdata.work_location_name
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* const salaryCurrencies = [
    { label: "₹", value: "INR" },
    { label: "$", value: "USD" },
    { label: "€", value: "EUR" },
    { label: "£", value: "GBP" },
  ]; */}
                <div className="col-md-6 mb-4">
                  <strong>Expected Salary</strong>
                  <div className="">
                    {userdata.expected_salary ? (
                      <>
                        {
                          // Find the symbol by currency type
                          salaryCurrencies.find(
                            (c) => c.value === userdata.currency_type
                          )?.label
                        }

                        {userdata.expected_salary?.toLocaleString("en-IN")}
                      </>
                    ) : (
                      <>
                        <span
                          className="text-danger fw-semibold"
                          style={{ textAlign: "justify" }}
                        >
                          No data available
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default CareerSection;
