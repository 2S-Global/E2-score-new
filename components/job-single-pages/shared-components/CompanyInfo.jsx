"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Social from "../social/Social";

const CompanyInfo = () => {

  //Get Token
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  if (!token) {
    console.log("No token");
  }

  const [companyDetails, setCompanyDetails] = useState([]);

  //My Custom code
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${apiurl}/api/companyprofile/get_company_details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Here is my company details data which is coming from useEffect tang na tang tang !", response.data);

        if (response.data.success && response.status === 200) {
          setCompanyDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const employeeSizeLabels = {
    less_than_50: "Less than 50",
    "50_100": "50 - 100",
    "101_500": "101 - 500",
    "501_1000": "501 - 1000",
    more_than_1000: "More than 1000",
  };

  return (
    <ul className="company-info">
      {/* {jobPreviewDetails?.title && <h4>{jobPreviewDetails?.title}</h4>} */}
      {companyDetails?.industryName && (
        <li style={{display: "unset"}}>
          Primary industry: <span>{companyDetails.industryName}</span>
        </li>
      )}
      {companyDetails?.teamsize && (
        <li>
          Company size: <span>{employeeSizeLabels[companyDetails?.teamsize] || "Not specified"}</span>
        </li>
      )}
      {companyDetails?.established && (
        <li>
          Founded in: <span>{new Date(companyDetails.established).getFullYear()}</span>
        </li>
      )}
      {companyDetails?.phone && (
        <li>
          Phone: <span>{companyDetails.phone}</span>
        </li>
      )}
      {companyDetails?.email && (
        <li>
          Email: <span>{companyDetails.email}</span>
        </li>
      )}
      {companyDetails?.address && (
        <li style={{display: "unset"}}>
          Location: <span>{companyDetails.address}</span>
        </li>
      )}
      <li>
        Social media:
        <Social />
      </li>
    </ul>
  );
};

export default CompanyInfo;
