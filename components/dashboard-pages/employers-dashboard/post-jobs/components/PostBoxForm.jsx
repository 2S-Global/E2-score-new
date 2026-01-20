"use client";
import { queueRequest } from "@/components/dashboard-pages/candidates-dashboard/my-profile/helper/queueHelper";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams, useSearchParams } from "next/navigation";
import { validateDocuments } from "./validatePostJobDocuments";
import MessageComponent from "@/components/common/ResponseMsg";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const PostBoxForm = () => {
  const params = useParams(); // for dynamic route parts like [jobId]
  const searchParams = useSearchParams(); // for query params like ?type=jobTitle
  const id = params.jobId; // from route /edit/[jobId]
  const type = searchParams.get("type"); // from query string ?type=jobTitle

  const [showBy, setShowBy] = useState(""); // Track dropdown selection
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [jobLocationType, setJobLocationType] = useState(""); // Remote or On-site
  const [advertiseCity, setAdvertiseCity] = useState("No"); // Yes or No
  const [salaryStructure, setSalaryStructure] = useState("");

const [pageLoading, setPageLoading] = useState(true);
const [jobTitleLoading, setJobTitleLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const jobTitleRef = useRef();
  const jobDescriptionRef = useRef();
  const specializationRef = useRef(null);
  const jobSkillsRef = useRef(null);
  const getApplicationUpdateEmailRef = useRef();
  const positionAvailableRef = useRef();
  const jobTypeRef = useRef();

  const showByRef = useRef(null);
  const expectedHoursRef = useRef(null);
  const fromHoursRef = useRef(null);
  const toHoursRef = useRef(null);
  const contractLengthRef = useRef();
  const contractPeriodRef = useRef();
  const jobExpiryDateRef = useRef();
  const salaryStructureRef = useRef();
  const careerLevelRef = useRef();
  const industryRef = useRef();
  const qualificationRef = useRef();
  const jobLocationTypeRef = useRef();
  const advertiseCityRef = useRef();
  const advertiseCityNameRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const branchRef = useRef();
  const addressRef = useRef();
  const experienceLevelRef = useRef();
  const stateRef = useRef();

  const refs = {
    jobTitle: jobTitleRef,
    jobDescription: jobDescriptionRef,
    specialization: specializationRef, // ⭐ ADD THIS
    jobSkills: jobSkillsRef,

    getApplicationUpdateEmail: getApplicationUpdateEmailRef,
    positionAvailable: positionAvailableRef,
    jobType: jobTypeRef,
    showBy: showByRef,
    expectedHours: expectedHoursRef,
    fromHours: fromHoursRef,
    toHours: toHoursRef,
    contractLength: contractLengthRef, // ⭐ NEW
    contractPeriod: contractPeriodRef, // ⭐ NEW
    jobExpiryDate: jobExpiryDateRef,
    jobLocationType: jobLocationTypeRef,
    salaryStructure: salaryStructureRef,
    careerLevel: careerLevelRef,
    experienceLevel: experienceLevelRef,
    industry: industryRef,
    qualification: qualificationRef,
    advertiseCity: advertiseCityRef,
    advertiseCityName: advertiseCityNameRef,
    country: countryRef,
    state: stateRef,
    city: cityRef,
    branch: branchRef,
    address: addressRef,
    state: stateRef,
  };

  //main
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("employer_token");
  if (!token) {
    console.log("No token");
  }

  const router = useRouter();

  // API list
  const [jobTitleOptions, setJobTitleOptions] = useState([]);

  const [specialization, setSpecialization] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [careerLevel, setCareerLevel] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [gender, setGender] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);

  const [city, setCity] = useState([]);
  const [branch, setBranch] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [inputValue, setInputValue] = useState(""); // ⭐ controls typing

  // Error Variables
  const [error, setError] = useState({});

  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(0);
  const [errorField, setErrorField] = useState(0);

  // Initilize form data
  const [formData, setFormData] = useState({
    jobTitleId: "", // ADD THIS
    jobTitleName: "", // ADD THIS
    jobTitle: "", // you can keep this for backward compatibility

    jobDescription: "",
    getApplicationUpdateEmail: "",
    specialization: [],
    jobType: [],
    showBy: "",
    expectedHours: "",
    fromHours: "",
    toHours: "",
    contractLength: "",
    contractPeriod: "",
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
    resumeRequired: false,
    jobSkills: [],
  });

  useEffect(() => {
    if (!type) return;

    const timeout = setTimeout(() => {
      const element = document.getElementById(type);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        if (type !== "all") {
          element.classList.add("highlight");
          setTimeout(() => {
            element.classList.remove("highlight");
          }, 3000);
        }
      }
    }, 200); // small delay (200ms)

    return () => clearTimeout(timeout);
  }, [type, formData.jobLocationType]);

  useEffect(() => {
    if (id) {
      setPageLoading(false); // create mode

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiurl}/api/jobposting/get_job_posting_details`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                jobId: id,
              },
            },
          );

          if (response.data.success && response.status === 200) {
            const job = response.data.data;
            setInputValue(job.jobTitle || "");
            // setLoading(false);

            setFormData({
              jobTitleId: job.jobTitle || "",
              jobTitleName: job.jobTitle || "",
              jobTitle: job.jobTitle || "",
              jobDescription: job.jobDescription || "",
              getApplicationUpdateEmail: job.getApplicationUpdateEmail || "",

              // ✅ FIXED
              specialization: Array.isArray(job.specialization)
                ? job.specialization
                : [],

              jobType: job.jobType?.map((t) => t._id) || [],
              showBy: job.showBy || "fixed",

              expectedHours: job.expectedHours || "",
              fromHours: job.fromHours || "",
              toHours: job.toHours || "",

              contractLength: job.contractLength || "",
              contractPeriod: job.contractPeriod || "",
              positionAvailable: job.positionAvailable || "",

              jobExpiryDate: job.jobExpiryDate
                ? new Date(job.jobExpiryDate).toISOString().split("T")[0]
                : null,

              salary: {
                structure: job.salary?.structure || "range",
                currency: job.salary?.currency || "₹",
                min: job.salary?.min || null,
                max: job.salary?.max || null,
                amount: job.salary?.amount || null,
                rate: job.salary?.rate || "per year",
              },

              benefits: job.benefits?.map((b) => b._id) || [],

              careerLevel: job.careerLevel?._id || "",
              experienceLevel: job.experienceLevel?._id || "",
              gender: job.gender?.map((g) => g._id) || [],

              industry: job.industry || "",
              qualification: job.qualification?.map((q) => q._id) || [],

              jobLocationType: job.jobLocationType || "",
              country: job.country ? String(job.country) : "",
              state: job.state ? String(job.state) : "",
              city: job.city ? String(job.city) : "",
              branch: job.branch?._id || "",
              address: job.address || "",

              advertiseCity: job.advertiseCity || "",
              advertiseCityName: job.advertiseCityName || "",
              resumeRequired: job.resumeRequired || false,

              // ✅ FIXED
              jobSkills: Array.isArray(job.jobSkills)
                ? job.jobSkills.map((s) => ({
                    value: s,
                    label: s,
                  }))
                : [],
            });
          }
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setPageLoading(false); // ✅ ONLY here
        }
      };
      fetchData();
    }
  }, [id]);

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${apiurl}/api/sql/dropdown/All_states`);

      if (res.data.success) {
        setState(res.data.data);
      } else {
        setState([]);
      }
    } catch (error) {
      console.error("State fetch error", error);
      setState([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    if (date) {
      setFormData({ ...formData, jobExpiryDate: date });
    }
  };

  // For Job Skills

  // ✅ 1. Fetch random skills on mount
  useEffect(() => {
    const fetchRandomSkills = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiurl}/api/sql/dropdown/Random_Skill`);
        const data = res.data.data || [];

        console.log("Here is my all random skills::::'''''", data);
        setJobSkills(
          Array.from(
            new Set(data.filter(Boolean).map((s) => s.trim().toLowerCase())),
          ).map((skill) => ({
            label: skill.charAt(0).toUpperCase() + skill.slice(1),
            value: skill,
          })),
        );
      } catch (err) {
        console.error("Error fetching random skills:", err);
      } finally {
        setJobTitleLoading(false); // ✅ correct
      }
    };
    fetchRandomSkills();
  }, [apiurl]);

  const fetchSkills = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    try {
      const token = localStorage.getItem("candidate_token");

      const response = await axios.get(
        `${apiurl}/api/sql/dropdown/matching_Skill?skill_name=${inputValue}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const fetched = response.data.data || [];

      const unique = Array.from(
        new Set(fetched.map((s) => s.trim().toLowerCase())),
      );

      const formatted = unique.map((skill) => ({
        label: skill.charAt(0).toUpperCase() + skill.slice(1),
        value: skill,
      }));

      return formatted;
    } catch (e) {
      console.error("Skill fetch failed", e);
      return [];
    }
  };

  const loadJobTitles = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return []; // avoid unnecessary calls

    const res = await axios.get(`${apiurl}/api/jobposting/all_job_title`, {
      params: { q: inputValue },
    });

    return res.data.data.map((item) => ({
      value: item._id,
      label: item.title,
    }));
  };

  // 🔹 When user types
  const handleInputChange = (inputValue) => {
    fetchSkills(inputValue);
  };

  const selectedJobTypeLabels = jobType
    .filter((opt) => formData.jobType.includes(opt.value))
    .map((opt) => opt.label);

  const isPartTime = selectedJobTypeLabels.includes("Part-time");

  const isInternLike = selectedJobTypeLabels.some((label) =>
    ["Internship", "Contractual / Temporary", "Freelance"].includes(label),
  );

  const fetchSpecialization = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await fetch(
        `${apiurl}/api/jobposting/all_job_specializations?query=${inputValue}`,
      );

      const data = await response.json();

      const list = data.data || [];

      return list.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    } catch (error) {
      console.error("Error fetching specializations:", error);
      return [];
    }
  };

  // 🔥 AUTO LOAD STATE & CITY IN EDIT MODE
  useEffect(() => {
    if (formData.country) {
      fetchStates(formData.country);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);
    }
  }, [formData.state]);

  useEffect(() => {
    const fetchJobType = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/jobposting/all_job_types`);
        const data = await response.json();
        setJobType(
          data.data.map((item) => ({ label: item.name, value: item._id })),
        );
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
          `${apiurl}/api/jobposting/all_job_benefits`,
        );
        const data = await response.json();
        setBenefits(
          data.data.map((item) => ({ label: item.name, value: item._id })),
        );
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
          `${apiurl}/api/jobposting/all_job_career_levels`,
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
        const response = await fetch(
          `${apiurl}/api/jobposting/all_job_experience_levels`,
        );
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
          })),
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
        const response = await fetch(
          `${apiurl}/api/jobposting/all_job_qualifications`,
        );
        const data = await response.json();
        setQualification(
          data.data.map((item) => ({ label: item.name, value: item._id })),
        );
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

    const fetchBranches = async () => {
      //  setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/jobposting/all_company_branches`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(
          "Branches Data by mee should only data :) :",
          response.data.data,
        );
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

    // fetchSpecialization();
    fetchJobType();
    fetchBenefits();
    fetchCareerLevels();
    fetchExperienceLevel();
    fetchGender();
    fetchIndustry();
    fetchQualification();
    fetchCountry();

    fetchBranches();
    fetchStates();
  }, [apiurl]);

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
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
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    // console.log("Form Data Submitted:", formData);

    if (!formData.jobTitleId?.trim()) {
      setError({ jobTitle: "Job title is required" });
      setErrorField("jobTitle");
      setErrorId(Date.now());

      const ref = refs.jobTitle;
      if (ref?.current) {
        try {
          ref.current.focus?.();
          ref.current.select?.focus?.();
        } catch (err) {
          console.warn("Focus failed for jobTitle", err);
        }
      }
      return;
    }

    if (
      !formData.jobDescription ||
      formData.jobDescription.trim() === "" ||
      formData.jobDescription === "<p><br></p>"
    ) {
      setError({ jobDescription: "Job description is required" });
      setErrorField("jobDescription");
      setErrorId(Date.now());

      const ref = refs["jobDescription"];
      if (ref && ref.current) {
        try {
          ref.current.focus();
        } catch (e) {
          console.warn("ReactQuill focus failed");
        }
      }

      return;
    }

    // 📌 EMAIL VALIDATION
    if (
      !formData.getApplicationUpdateEmail ||
      formData.getApplicationUpdateEmail.trim() === ""
    ) {
      setError({ getApplicationUpdateEmail: "Email is required" });
      setErrorField("getApplicationUpdateEmail");
      setErrorId(Date.now());

      const ref = refs["getApplicationUpdateEmail"];
      if (ref && ref.current) {
        try {
          ref.current.focus();
        } catch (err) {
          console.warn("Focus failed for email field", err);
        }
      }
      return;
    }

    // 📌 EMAIL FORMAT REGEX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(formData.getApplicationUpdateEmail)) {
      setError({
        getApplicationUpdateEmail: "Please enter a valid email address",
      });
      setErrorField("getApplicationUpdateEmail");
      setErrorId(Date.now());

      const ref = refs["getApplicationUpdateEmail"];
      if (ref && ref.current) {
        try {
          ref.current.focus();
        } catch (err) {
          console.warn("Focus failed on invalid email", err);
        }
      }
      return;
    }

    if (formData.specialization.length === 0) {
      setError({ specialization: "Specialization is required" });
      setErrorField("specialization");
      setErrorId(Date.now());

      const ref = refs["specialization"];

      if (ref && ref.current) {
        try {
          if (ref.current.focus) ref.current.focus();
          if (ref.current.select) ref.current.select.focus(); // react-select case
        } catch (err) {
          console.warn("Focus failed for specialization", err);
        }
      }

      return;
    }

    if (!formData.jobSkills || formData.jobSkills.length === 0) {
      setError({ jobSkills: "Skills are required" }); // FIXED
      setErrorField("jobSkills");
      setErrorId(Date.now());

      const ref = refs["jobSkills"];
      if (ref && ref.current) {
        try {
          if (ref.current.focus) ref.current.focus(); // normal input
          if (ref.current.select) ref.current.select.focus(); // react-select case
        } catch (err) {
          console.warn("Focus failed for Skills", err);
        }
      }

      return;
    }

    const errorMsg = validateDocuments(formData);
    if (errorMsg) {
      const { field, message } = errorMsg;
      setError({ [field]: message });

      setErrorId(Date.now());
      setErrorField(field); // keep track of which field failed

      // 🧩 Step 2: Focus and highlight the invalid field
      const ref = refs[field];

      if (ref && ref.current) {
        try {
          // For react-select or normal inputs
          if (ref.current.focus) ref.current.focus();
          if (ref.current.select) ref.current.select.focus();
        } catch (err) {
          console.warn("Focus failed for field:", field, err);
        }

        const el =
          ref.current?.controlRef ||
          ref.current?.select?.controlRef ||
          ref.current; // fallback
      }

      return;
    }

    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    setSubmitting(true);
    try {
      let response;
      if (id) {
        const payload = {
          ...formData,

          // ✅ REQUIRED by backend
          jobTitle: formData.jobTitleName?.trim(),

          // ✅ string[]
          jobSkills: formData.jobSkills
            .map((s) => s.value.trim())
            .filter(Boolean),

          // ✅ string[]
          specialization: formData.specialization.map((s) => s.trim()),

          // ✅ ObjectId[]
          jobType: formData.jobType,

          // ✅ ObjectId[]
          benefits: formData.benefits,
          qualification: formData.qualification,
          gender: formData.gender,

          careerLevel: formData.careerLevel || null,
          experienceLevel: formData.experienceLevel || null,
          country: formData.country || null,
          city: formData.city || null,
          branch: formData.branch || null,
        };

        response = await axios.post(
          `${apiurl}/api/jobposting/edit_job_posting_details`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              jobId: id,
            },
          },
        );

        if (!response.data.success) {
          setError(response.data.message);
          setErrorId(Date.now());
          return;
        }

        setSuccess("Job post updated successfully!");
      } else {
        const payload = {
          ...formData,

          // ✅ REQUIRED by backend
          jobTitle: formData.jobTitleName?.trim(),

          // ✅ string[]
          jobSkills: formData.jobSkills
            .map((s) => s.value.trim())
            .filter(Boolean),

          // ✅ string[]
          specialization: formData.specialization.map((s) => s.trim()),

          // ✅ ObjectId[]
          jobType: formData.jobType,

          // ✅ ObjectId[]
          benefits: formData.benefits,
          qualification: formData.qualification,
          gender: formData.gender,

          careerLevel: formData.careerLevel || null,
          experienceLevel: formData.experienceLevel || null,
          country: formData.country || null,
          city: formData.city || null,
          branch: formData.branch || null,
        };

        response = await axios.post(
          `${apiurl}/api/jobposting/add_job_posting_details`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.data.success) {
          setError(response.data.message);
          setErrorId(Date.now());
          return;
        }

        setSuccess("Job posting created successfully!");
      }

      if (response.data.success) {
        console.log(
          "✅ Job posting data is saved successfully:",
          response.data.data,
        );

        // ✅ Redirect to review page with returned jobId
        const jobId = response.data.jobId; // API returns saved job object
        const status = response.data.data.status; // draft

        // router.push(`/employers-dashboard/post-jobs/review-jobs/${jobId}?status=${status}`);
        router.push(`/employers-dashboard/post-jobs/review-jobs/${jobId}`);
        // router.push(`/employers-dashboard/post-jobs/review-jobs`);
        // OR if you want to pass as query: /review-job?jobId=...&status=...
      } else {
        throw new Error(response.data.message || "An error occurred");
      }

      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      setError("Failed. Try again.");
      setErrorId(Date.now());
    } finally {
      setSubmitting(false);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      if (!stateId) {
        setCity([]);
        return;
      }

      const res = await axios.get(
        `${apiurl}/api/sql/dropdown/get_india_cities`,
        {
          params: { stateId }, // ✅ PASS stateId here
        },
      );

      if (res.data.success) {
        setCity(res.data.data);
      } else {
        setCity([]);
      }
    } catch (error) {
      console.error("City fetch error", error);
      setCity([]);
    }
  };
  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <form className="default-form" onSubmit={handleSubmit}>
        <MessageComponent success={success} errorId={errorId} />
        <div className="row">
          {/* <!-- Input --> */}
          <div className="col-lg-12 col-md-12 mt-2 mb-4" id="jobTitleBlock">
            <label htmlFor="jobTitleInput">
              <b>Job Title </b>
              <span style={{ color: "red" }}>*</span>
            </label>

            <Autocomplete
              freeSolo
              disablePortal
              loading={jobTitleLoading}
              options={jobTitleOptions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              inputValue={inputValue}
              onInputChange={async (e, value, reason) => {
                setInputValue(value);

                // ⭐ CLEAR ERROR WHEN USER TYPES ANYTHING
                setError((prev) => ({ ...prev, jobTitle: "" }));

                // ⭐ UPDATE jobTitleId WHILE TYPING (IMPORTANT FIX)
                setFormData((prev) => ({
                  ...prev,
                  jobTitleId: value,
                  jobTitleName: value,
                }));

                if (reason === "input") {
                  setJobTitleLoading(true);

                  const result = await loadJobTitles(value);
                  setJobTitleOptions(result);
                  setJobTitleLoading(false);
                }

                // ⭐ When user clears text
                if (value.trim() === "") {
                  setFormData((prev) => ({
                    ...prev,
                    jobTitleId: "",
                    jobTitleName: "",
                  }));

                  setError((prev) => ({
                    ...prev,
                    jobTitle: "Job title is required",
                  }));
                }
              }}
              onChange={(e, selected) => {
                if (!selected) return;

                // If user selected from dropdown
                if (typeof selected === "object") {
                  setFormData((prev) => ({
                    ...prev,
                    jobTitleId: selected.value,
                    jobTitleName: selected.label,
                  }));
                  setInputValue(selected.label);
                }

                // If user typed custom & pressed Enter
                if (typeof selected === "string") {
                  setFormData((prev) => ({
                    ...prev,
                    jobTitleId: selected,
                    jobTitleName: selected,
                  }));
                  setInputValue(selected);
                }

                setError((prev) => ({ ...prev, jobTitle: "" }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search or type Job Title…"
                  inputRef={jobTitleRef}
                  sx={{
                    "& .MuiInputBase-root": {
                      padding: "12px 10px",
                      borderRadius: "6px",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {jobTitleLoading ? (
                          <CircularProgress size={20} />
                        ) : null}

                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />

            {error?.jobTitle && (
              <span
                style={{
                  color: "red",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginTop: "6px",
                  display: "block",
                }}
              >
                {error.jobTitle}
              </span>
            )}
          </div>

          <div
            className="form-group col-lg-12 col-md-12"
            id="jobDescriptionBlock"
          >
            <label htmlFor="jobDescription">
              <b>Job Description </b>
              <span style={{ color: "red" }}>*</span>
            </label>
            <ReactQuill
              id="jobDescription"
              name="jobDescription"
              theme="snow"
              value={formData.jobDescription}
              ref={jobDescriptionRef}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, jobDescription: content }))
              }
              placeholder="Write detailed job description here..."
              className="form-group"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ align: [] }],
                  ["blockquote", "code-block"],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "color",
                "background",
                "script",
                "list", // includes ordered + bullet
                "indent",
                "align",
                "blockquote",
                "code-block",
                "link",
                "image",
                "video",
              ]}
            />
            {error?.jobDescription && (
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginTop: "-22px",
                }}
              >
                {error.jobDescription}
              </div>
            )}
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12" id="mailBlock">
            <label htmlFor="getApplicationUpdateEmail">
              <b>Get application updates </b>
              <span style={{ color: "red" }}>*</span>
            </label>

            <input
              type="text"
              name="getApplicationUpdateEmail"
              id="getApplicationUpdateEmail"
              ref={getApplicationUpdateEmailRef}
              value={formData.getApplicationUpdateEmail}
              onChange={(e) => {
                handleChange(e);
                // Clear error when user starts typing
                setError((prev) => ({
                  ...prev,
                  getApplicationUpdateEmail: "",
                }));
              }}
              placeholder="testing@gmail.com"
              className="form-control"
            />

            {errorField === "getApplicationUpdateEmail" &&
              error?.getApplicationUpdateEmail && (
                <p
                  style={{
                    color: "red",
                    marginTop: "4px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {error.getApplicationUpdateEmail}
                </p>
              )}
          </div>

          <div className="form-group col-lg-6 col-md-12" id="genderBlock">
            <label>Gender</label>
            <Select
              isMulti
              name="gender"
              options={gender}
              className="basic-multi-select"
              classNamePrefix="select"
              value={gender.filter((option) =>
                formData.gender.includes(option.value),
              )} // ensure proper value binding
              onChange={(selectedOptions) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: selectedOptions
                    ? selectedOptions.map((opt) => opt.value)
                    : [],
                }))
              }
            />
          </div>

          {/* <!-- Search Select --> */}
          <div
            className="form-group col-lg-6 col-md-12"
            id="specializationBlock"
          >
            <label>
              Specialization <span style={{ color: "red" }}>*</span>
            </label>
            <AsyncCreatableSelect
              isMulti
              cacheOptions
              defaultOptions={false}
              ref={specializationRef} // ⭐ ADD REF HERE
              loadOptions={fetchSpecialization}
              placeholder="Search or create specialization..."
              classNamePrefix="select"
              noOptionsMessage={() => "Please start typing…"} // ⭐ FIX ADDED
              value={formData.specialization.map((name) => ({
                label: name,
                value: name,
              }))}
              onChange={(selectedOptions) => {
                // Clear specialization error when user selects something
                if (errorField === "specialization") {
                  setError({});
                  setErrorField("");
                }

                setFormData((prev) => ({
                  ...prev,
                  specialization: selectedOptions
                    ? selectedOptions.map((opt) => opt.value)
                    : [],
                }));
              }}
              onCreateOption={(inputValue) => {
                // Clear error when user creates new item
                if (errorField === "specialization") {
                  setError({});
                  setErrorField("");
                }

                setFormData((prev) => ({
                  ...prev,
                  specialization: [...prev.specialization, inputValue],
                }));
              }}
            />
            {errorField === "specialization" && error?.specialization && (
              <p style={{ color: "red", marginTop: "4px" }}>
                {error.specialization}
              </p>
            )}
          </div>

          {/* <!-- Search Select for Skill Field --> */}
          <div className="form-group col-lg-6 col-md-12" id="skillBlock">
            <label>
              Skills <span style={{ color: "red" }}>*</span>
            </label>

            <AsyncCreatableSelect
              isMulti
              cacheOptions
              defaultOptions={false}
              loadOptions={fetchSkills}
              placeholder="Search or create skills..."
              classNamePrefix="select"
              ref={jobSkillsRef}
              noOptionsMessage={() => "Please start typing…"}
              value={formData.jobSkills}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  jobSkills: selected || [],
                }))
              }
              onCreateOption={(inputValue) =>
                setFormData((prev) => ({
                  ...prev,
                  jobSkills: [
                    ...prev.jobSkills,
                    { label: inputValue, value: inputValue },
                  ],
                }))
              }
            />

            {errorField === "jobSkills" && error?.jobSkills && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.jobSkills}
              </p>
            )}
          </div>

          <div
            className="form-group col-lg-6 col-md-12"
            id="numberOfPositionAvaiable"
          >
            <label htmlFor="positionAvaiable">
              <b>Number of Positions Available </b>
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              name="positionAvailable"
              id="positionAvaiable"
              value={formData.positionAvailable}
              ref={positionAvailableRef}
              onChange={handleChange}
              min={1}
              placeholder="1"
              className="form-control"
            />

            {errorField === "positionAvailable" && error?.positionAvailable && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.positionAvailable}
              </p>
            )}
          </div>

          {/* Job Type Block started from here -------    */}
          <div className="form-group col-lg-6 col-md-12" id="jobType">
            <label>
              <b>Job Type </b>
              <span style={{ color: "red" }}>*</span>
            </label>
            <Select
              isMulti
              name="jobType"
              ref={jobTypeRef}
              options={jobType} // [{label, value:_id}]
              className="basic-multi-select"
              classNamePrefix="select"
              /* ✅ VALUE BINDING (IDs → objects for UI) */
              value={jobType.filter((opt) =>
                formData.jobType.includes(opt.value),
              )}
              onChange={(selectedOptions) => {
                const ids = selectedOptions
                  ? selectedOptions.map((opt) => opt.value) // ✅ ONLY ObjectId strings
                  : [];

                const labels = selectedOptions
                  ? selectedOptions.map((opt) => opt.label)
                  : [];

                const isPartTimeSelected = labels.includes("Part-time");
                const isInternLikeSelected = labels.some((v) =>
                  [
                    "Internship",
                    "Contractual / Temporary",
                    "Freelance",
                  ].includes(v),
                );

                setFormData((prev) => ({
                  ...prev,
                  jobType: ids, // ✅ BACKEND SAFE

                  expectedHours: isPartTimeSelected ? prev.expectedHours : "",
                  fromHours: isPartTimeSelected ? prev.fromHours : "",
                  toHours: isPartTimeSelected ? prev.toHours : "",
                  showBy: isPartTimeSelected ? prev.showBy || "" : "",

                  contractLength: isInternLikeSelected
                    ? prev.contractLength
                    : "",
                  contractPeriod: isInternLikeSelected
                    ? prev.contractPeriod
                    : "",
                }));
              }}
            />

            {errorField === "jobType" && error?.jobType && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.jobType}
              </p>
            )}
          </div>

          {isPartTime && (
            <div
              className="form-group col-lg-12 col-md-12"
              id="expectedHoursBlock"
            >
              <label>Expected hours</label>
              <div className="d-flex gap-3">
                {/* Show pay by Dropdown */}
                <div className="flex-fill">
                  <label className="form-label small">Show by</label>
                  <select
                    ref={showByRef}
                    className={`form-select ${errorField === "showBy" ? "error-highlight" : ""}`}
                    value={formData.showBy || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        showBy: e.target.value,
                        expectedHours: "",
                        fromHours: "",
                        toHours: "",
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    <option value="fixed">Fixed hours</option>
                    <option value="range">Range</option>
                    <option value="maximum">Maximum</option>
                    <option value="minimum">Minimum</option>
                  </select>

                  {errorField === "showBy" && error?.showBy && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "4px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {error.showBy}
                    </p>
                  )}
                </div>

                {/* Single input for Fixed/Maximum/Minimum */}
                {/* Minimum Salary Textfield*/}
                {formData.showBy && formData.showBy !== "range" && (
                  <div className="flex-fill">
                    <label className="form-label small">
                      {labelMap[formData.showBy]}
                    </label>
                    <input
                      type="number"
                      ref={expectedHoursRef}
                      name="expectedHours"
                      className={`form-control ${errorField === "expectedHours" ? "error-highlight" : ""}`}
                      placeholder="Enter hours"
                      value={formData.expectedHours ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          expectedHours: e.target.value,
                          fromHours: "",
                          toHours: "",
                        }))
                      }
                    />

                    {errorField === "expectedHours" && (
                      <p
                        style={{
                          color: "red",
                          marginTop: "4px",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {error.expectedHours}
                      </p>
                    )}
                  </div>
                )}

                {/* Two inputs for Range */}
                {formData.showBy === "range" && (
                  <>
                    <div className="flex-fill">
                      <label className="form-label small">From</label>
                      <input
                        type="number"
                        ref={fromHoursRef}
                        name="fromHours"
                        className={`form-control ${errorField === "fromHours" ? "error-highlight" : ""}`}
                        placeholder="e.g. 4"
                        value={formData.fromHours ?? ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fromHours: e.target.value,
                            expectedHours: "",
                          }))
                        }
                      />
                      {errorField === "fromHours" && (
                        <p
                          style={{
                            color: "red",
                            marginTop: "4px",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          {error.fromHours}
                        </p>
                      )}
                    </div>
                    <div className="flex-fill">
                      <label className="form-label small">To</label>
                      <input
                        type="number"
                        ref={toHoursRef}
                        name="toHours"
                        className={`form-control ${errorField === "toHours" ? "error-highlight" : ""}`}
                        placeholder="e.g. 8"
                        value={formData.toHours ?? ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            toHours: e.target.value,
                            expectedHours: "",
                          }))
                        }
                      />
                      {errorField === "toHours" && (
                        <p
                          style={{
                            color: "red",
                            marginTop: "4px",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          {error.toHours}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Add Hours per week */}
                <div style={{ marginTop: "50px" }}>
                  <span className="form-label small mb-0">Hours per week</span>
                </div>
              </div>
            </div>
          )}

          {/* Contract Timings */}
          {isInternLike && (
            <div className="form-group col-lg-12 col-md-12">
              <label>How long is the contract?</label>
              <div className="d-flex gap-3">
                {/* Contract Length */}
                <div className="flex-fill">
                  <label className="form-label small">Length</label>
                  <input
                    type="number"
                    name="contractLength"
                    ref={contractLengthRef}
                    placeholder=""
                    min={1}
                    value={formData.contractLength ?? ""}
                    className={`form-control ${errorField === "contractLength" ? "error-highlight" : ""}`}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        contractLength: e.target.value,
                      }));
                    }}
                  />

                  {/* 🔴 ERROR MESSAGE */}
                  {errorField === "contractLength" && error?.contractLength && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "4px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {error.contractLength}
                    </p>
                  )}
                </div>

                {/* Contract Period */}
                <div className="flex-fill">
                  <label className="form-label small">Period</label>
                  <select
                    className={`form-select ${errorField === "contractPeriod" ? "error-highlight" : ""}`}
                    name="contractPeriod"
                    ref={contractPeriodRef}
                    value={formData.contractPeriod ?? ""}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        contractPeriod: e.target.value,
                      }));
                    }}
                  >
                    <option value="" disabled>
                      Select period
                    </option>
                    <option value="month">month(s)</option>
                    <option value="week">week(s)</option>
                    <option value="day">day(s)</option>
                  </select>

                  {/* 🔴 ERROR MESSAGE */}
                  {errorField === "contractPeriod" && error?.contractPeriod && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "4px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {error.contractPeriod}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div
              className="form-group col-lg-6 col-md-12"
              id="jobExpiryDateBlock"
            >
              <label htmlFor="jobExpiryDate" className="form-label">
                <b>
                  Post Expiry Date <span style={{ color: "red" }}>*</span>
                </b>
              </label>

              <DatePicker
                value={
                  formData.jobExpiryDate
                    ? new Date(formData.jobExpiryDate)
                    : null
                }
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={
                  new Date(
                    today.getFullYear() + 1,
                    today.getMonth(),
                    today.getDate(),
                  )
                }
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    inputRef: jobExpiryDateRef, // ⭐ focus target
                    id: "jobExpiryDate",
                    placeholder: "dd/mm/yyyy",
                    error: errorField === "jobExpiryDate", // ⭐ MUI red border

                    className: "form-control",
                    style: {
                      backgroundColor: "#f0f5f7",
                      border: "1px solid #f0f5f7",
                      borderRadius: "8px",
                    },
                  },
                }}
              />

              {/* If you still want extra custom text below: */}
              {errorField === "jobExpiryDate" && error?.jobExpiryDate && (
                <p
                  style={{
                    color: "red",
                    marginTop: "4px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {error.jobExpiryDate}
                </p>
              )}
            </div>
          </LocalizationProvider>

          <div className="form-group col-lg-12 col-md-12" id="salaryBlock">
            <label>
              <b>Salary </b>
              <span style={{ color: "red" }}>*</span>
            </label>
            <div className="d-flex gap-3">
              {/* Show pay by Dropdown */}
              <div className="flex-fill">
                <label className="form-label small">Show pay by</label>
                <select
                  className="form-select"
                  value={formData.salary.structure}
                  ref={salaryStructureRef}
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
                        newSalary.min = null; // only starting amount relevant
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
                  }}
                >
                  <option value="range">Range</option>
                  <option value="starting amount">Starting amount</option>
                  <option value="maximum amount">Maximum amount</option>
                  <option value="exact amount">Exact amount</option>
                </select>
              </div>

              {/* Currency Dropdown */}
              <div className="flex-fill">
                <label className="form-label small">Currency</label>
                <select
                  className="form-select"
                  value={formData.salary.currency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: { ...formData.salary, currency: e.target.value },
                    })
                  }
                >
                  <option value="₹">₹</option>
                  <option value="$">$</option>
                  <option value="€">€</option>
                  <option value="£">£</option>
                </select>
              </div>

              {/* Minimum Salary Textfield*/}
              {formData.salary.structure === "range" && (
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
                <label className="form-label small">
                  {formData.salary.structure === "range" ? "Maximum" : "Amount"}
                </label>
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
                    formData.salary.structure === "range" ||
                    formData.salary.structure === "maximum amount"
                      ? "800000"
                      : "400000"
                  }
                />
              </div>

              {/* Rate Dropdown */}
              <div className="flex-fill">
                <label className="form-label small">Rate</label>
                <select
                  className="form-select"
                  value={formData.salary.rate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: { ...formData.salary, rate: e.target.value },
                    })
                  }
                >
                  <option value="per hour">per hour</option>
                  <option value="per day">per day</option>
                  <option value="per week">per week</option>
                  <option value="per month">per month</option>
                  <option value="per year">per year</option>
                </select>
              </div>
            </div>
            {errorField === "salaryStructure" && error?.salaryStructure && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.salaryStructure}
              </p>
            )}
          </div>

          {/* Salary Part Added By Chandra ends here */}

          {/* Benefits Added By Chandra starts from here */}
          {/* <!-- Search Select --> */}
          <div className="form-group col-lg-6 col-md-12" id="benefitsBlock">
            <label>Benefits </label>
            <Select
              isMulti
              name="benefits"
              options={benefits}
              className="basic-multi-select"
              classNamePrefix="select"
              value={benefits.filter((option) =>
                formData.benefits.includes(option.value),
              )} // ensure proper value binding
              onChange={(selectedOptions) =>
                setFormData((prev) => ({
                  ...prev,
                  benefits: selectedOptions
                    ? selectedOptions.map((opt) => opt.value)
                    : [],
                }))
              }
            />
          </div>
          {/* Benefits Part Added By Chandra ends here */}

          <div className="form-group col-lg-6 col-md-12" id="careerLevelBlock">
            <label>
              <b>
                Career Level <span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <select
              className="form-select"
              value={formData.careerLevel}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  careerLevel: e.target.value,
                }));
              }}
              ref={careerLevelRef}
            >
              <option value="">Select</option>
              {careerLevel.map((level) => (
                <option key={level._id} value={level._id}>
                  {level.name}
                </option>
              ))}
            </select>

            {errorField === "careerLevel" && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.careerLevel}
              </p>
            )}
          </div>

          <div
            className="form-group col-lg-6 col-md-12"
            id="experienceLevelBlock"
          >
            <label>
              <b>
                Experience Level <span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <select
              className="chosen-single form-select"
              value={formData.experienceLevel}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  experienceLevel: e.target.value,
                }));
              }}
              ref={experienceLevelRef}
            >
              <option value="">Select</option>
              {experienceLevel.map((level) => (
                <option key={level._id} value={level._id}>
                  {level.name}
                </option>
              ))}
            </select>
            {errorField === "experienceLevel" && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.experienceLevel}
              </p>
            )}
          </div>

          <div className="form-group col-lg-6 col-md-12" id="industryBlock">
            <label>
              <b>
                Industry <span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <select
              className="chosen-single form-select"
              value={formData.industry}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, industry: e.target.value }));
              }}
              ref={industryRef}
            >
              <option value="">Select</option>
              {industry.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.job_industry}
                </option>
              ))}
            </select>

            {errorField === "industry" && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.industry}
              </p>
            )}
          </div>

          <div
            className="form-group col-lg-6 col-md-12"
            id="qualificationBlock"
          >
            <label>
              <b>
                Qualification <span style={{ color: "red" }}>*</span>
              </b>
            </label>
            <Select
              isMulti
              name="qualification"
              ref={qualificationRef}
              options={qualification}
              className="basic-multi-select"
              classNamePrefix="select"
              value={qualification.filter((option) =>
                formData.qualification.includes(option.value),
              )} // ensure proper value binding
              onChange={(selectedOptions) =>
                setFormData((prev) => ({
                  ...prev,
                  qualification: selectedOptions
                    ? selectedOptions.map((opt) => opt.value)
                    : [],
                }))
              }
            />
            {errorField === "qualification" && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.qualification}
              </p>
            )}
          </div>

          {/* Job Location- Remote or On-site */}
          <div className="form-group col-lg-6 col-md-12">
            <label>
              <b>Which option best describes this job's location? </b>
              <span style={{ color: "red" }}>*</span>
            </label>

            <select
              className={`chosen-single form-select ${
                error?.jobLocationType ? "is-invalid" : ""
              }`}
              value={formData.jobLocationType}
              ref={jobLocationTypeRef}
              onChange={(e) => {
                const value = e.target.value;

                setFormData((prev) => {
                  if (value === "remote") {
                    return {
                      ...prev,
                      jobLocationType: "remote",

                      // 🔥 CLEAR ON-SITE FIELDS
                      country: "",
                      state: "",
                      city: "",
                      branch: "",
                      address: "",

                      // default remote values
                      advertiseCity: "No",
                      advertiseCityName: "",
                    };
                  }

                  if (value === "on-site") {
                    return {
                      ...prev,
                      jobLocationType: "on-site",

                      // 🔥 CLEAR REMOTE FIELDS
                      advertiseCity: "",
                      advertiseCityName: "",
                    };
                  }

                  return prev;
                });
              }}
            >
              <option value="">Select</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
            </select>

            {/* 🔴 Error Message */}
            {error?.jobLocationType && (
              <p
                style={{
                  color: "red",
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {error.jobLocationType}
              </p>
            )}
          </div>

          {/* <!-- Input --> */}
          {/* Show when On-site */}
          {formData.jobLocationType === "on-site" && (
            <>
              <div className="form-group col-lg-6 col-md-12" id="countryBlock">
                <label>
                  <b>Country </b>
                </label>
                <select
                  className="chosen-single form-select"
                  value={formData.country || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }));
                  }}
                >
                  <option value="">Select Country</option>

                  {country.map((level) => (
                    <option key={level.id} value={String(level.id)}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-lg-6 col-md-12" id="stateBlock">
                <label>
                  <b>State </b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="chosen-single form-select"
                  value={formData.state}
                  onChange={(e) => {
                    const selectedStateId = e.target.value;

                    setFormData((prev) => ({
                      ...prev,
                      state: selectedStateId,
                      city: "",
                    }));

                    setCity([]);

                    if (selectedStateId) {
                      fetchCities(selectedStateId); // 🔥 state → city
                    }
                  }}
                  ref={stateRef}
                >
                  <option value="">Select</option>
                  {state.map((level) => (
                    <option key={level.id} value={String(level.id)}>
                      {level.name}
                    </option>
                  ))}
                </select>
                {error?.state && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "4px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {error.state}
                  </p>
                )}
              </div>

              {/* <!-- Input --> */}
              <div className="form-group col-lg-6 col-md-12" id="cityBlock">
                <label>
                  <b>City </b>
                  <span style={{ color: "red" }}>*</span>
                </label>

                <select
                  className="chosen-single form-select"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }));
                  }}
                  ref={cityRef}
                >
                  <option value="">Select</option>
                  {city.map((level) => (
                    <option key={level.id} value={String(level.id)}>
                      {level.city_name}
                    </option>
                  ))}
                </select>

                {error?.city && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "4px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {error.city}
                  </p>
                )}
              </div>

              {/* brance dropdown */}
              <div className="form-group col-lg-6 col-md-12" id="branchBlock">
                <label>
                  <b>Branch </b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="chosen-single form-select"
                  value={formData.branch}
                  onChange={(e) => {
                    console.log(
                      "Branch selected value -- Chandra Sarkar : ",
                      e.target.value,
                    );
                    setFormData((prev) => ({
                      ...prev,
                      branch: e.target.value,
                    }));
                  }}
                  ref={branchRef}
                >
                  <option value="">Select</option>
                  {branch.map((level) => (
                    <option key={level._id} value={level._id}>
                      {level.name}
                    </option>
                  ))}
                </select>

                {error.branch && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "4px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {error.branch}
                  </p>
                )}
              </div>

              {/* <!-- Input --> */}
              <div
                className="form-group col-lg-12 col-md-12"
                id="completeAddressBlock"
              >
                <label>
                  <b>Complete Address </b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  ref={addressRef}
                  placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                  value={formData.address}
                  onChange={(e) => {
                    console.log(
                      "Complete Address selected value -- Chandra Sarkar : ",
                      e.target.value,
                    );
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                  }}
                />

                {error.address && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "4px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {error.address}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Show when Remote */}
          {formData.jobLocationType === "remote" && (
            <div
              className="form-group col-lg-12 col-md-12"
              ref={advertiseCityRef}
            >
              <label className="form-label">
                <b>Do you want to advertise your job in a specific city?</b>
                <span style={{ color: "red" }}> *</span>
              </label>

              <div className="d-flex gap-3">
                {/* No Option */}
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="advertiseCity"
                    value="No"
                    checked={formData.advertiseCity === "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        advertiseCity: e.target.value,
                        advertiseCityName: "",
                      }))
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        advertiseCity: e.target.value,
                      }))
                    }
                    className="form-check-input me-2"
                  />
                  Yes
                </label>
              </div>

              {/* ✅ RADIO ERROR */}
              {error.advertiseCity && (
                <div className="text-danger mt-1">{error.advertiseCity}</div>
              )}
            </div>
          )}
          {/* <!-- Input --> */}
          {/* Show when Remote + Yes */}
          {formData.jobLocationType === "remote" &&
            formData.advertiseCity === "Yes" && (
              <div className="form-group col-lg-6 col-md-12">
                <label>
                  <b>Where do you want to advertise this job? </b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="advertiseCityName"
                  value={formData.advertiseCityName}
                  onChange={handleChange}
                  placeholder=""
                  ref={advertiseCityNameRef}
                />
                {error.advertiseCityName && (
                  <div className="text-danger mt-1">
                    {error.advertiseCityName}
                  </div>
                )}
              </div>
            )}

          {/* ckeckbox */}
          <div className="mb-3 form-group" id="requireRemumeBlock">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={formData.resumeRequired}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    resumeRequired: e.target.checked,
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Resume is required
              </label>
            </div>
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-12 col-md-12 text-right">
            <button
              type="submit"
              className="theme-btn btn-style-one"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </form>
      <style jsx>{`
        .highlight {
          background-color: #fff89a;
          border-radius: 8px;
          padding: 12px;
          transition: background-color 0.3s ease;
        }

        :global(#jobDescription .ql-container) {
          height: 220px !important;
        }
      `}</style>
    </>
  );
};

export default PostBoxForm;
