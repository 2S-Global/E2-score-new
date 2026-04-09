"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import AsyncSelect from "react-select/async";
import { se } from "date-fns/locale/se";

const VerificationFormSection = ({
  formdata,
  setFormData,
  onClose,
  is_complete,
  setSuccess = () => {},
  setMessageId = () => {},
  setError = () => {},
  setErrorId = () => {},
}) => {
  // ✅ Skip rendering when complete
  if (is_complete) return null;   
  const defaultOptions = formdata.course_id
    ? [{ value: formdata.course_id, label: formdata.course_name }]
    : [];

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Institute_token");

  // =============================
  // 🔹 Local State
  // =============================
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);
  const [courseModes, setCourseModes] = useState([]);
  const [grading_systems, setGradingSystems] = useState([]);
  //validation error
  const [err, setErr] = useState(null);
  // =============================
  // 🔹 Handlers (Memoized)
  // =============================
  const handleToggle = useCallback(
    (field) => (e) => {
      if(e.target.checked){
            setFormData((prev) => ({
              ...prev,
              level_verified: true,
              courseType_verified: true,
              courseName_verified: true,
              duration_verified: true,
              gradingSystem_verified: true,
              marks_verified: true,
              [field]: e.target.checked,
            }));
      }
      else{
        setFormData((prev) => ({
              ...prev,
              level_verified: false,
              courseType_verified: false,
              courseName_verified: false,
              duration_verified: false,
              gradingSystem_verified: false,
              marks_verified: false,
              [field]: e.target.checked,
      }))
    }
      
    },
    [setFormData]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setFormData]
  );

    // validation 
const validate = () => {
      let newErrors = {};

      if (!formdata?.level_verified) {
        newErrors.level_verified = "Level is required";
      } 

       if (!formdata?.courseType_verified) {
        newErrors.courseType_verified = "Course type is required";
      } 
      if (!formdata?.courseName_verified) {
        newErrors.courseName_verified = "Course name is required";
      } 
      if (!formdata?.duration_verified) {
        newErrors.duration_verified = "Course duration is required";
      } 
      if (!formdata?.gradingSystem_verified) {
        newErrors.gradingSystem_verified = "Grading system is required";
      } 

      if (!formdata?.marks_verified) {
        newErrors.marks_verified = "Marks is required";
      } 
      

      return newErrors;
};
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
       const validationErrors = validate();
        setErr(validationErrors);
        let isChecked=false;
        if(formdata.is_studied_here && Object.keys(validationErrors).length === 0){
          isChecked=true;
        }
        if(!formdata.is_studied_here){
          isChecked=true;
        }
        if(isChecked)
          {
                try {
                const response = await axios.put(
                  `${apiurl}/api/institutestudent/update_student_status`,
                  formdata,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                //  console.log("Form submitted successfully:", response.data);

                if (response.data.success) {
                  setSuccess(response.data.message);
                  onClose();
                } else {
                  console.error("Submission failed:", response.data.message);
                }
              } catch (error) {
                console.error("Error submitting form:", error);
              }
        }
          
      
    },
    [formdata, apiurl, token, onClose]
  );

  // =============================
  // 🔹 Auto-enable related flags
  // =============================
/*   useEffect(() => {
    if (formdata.is_verified) {
      setFormData((prev) => ({
        ...prev,
        level_verified: true,
        courseType_verified: true,
        courseName_verified: true,
        duration_verified: true,
        gradingSystem_verified: true,
        marks_verified: true,
      }));
    }
   
  }, [formdata.is_verified, setFormData]); */

  
  // =============================
  // 🔹 Fetch Dropdowns (Levels & Course Modes)
  // =============================
  const fetchDropdowns = useCallback(async () => {
    setLoading(true);
    try {
      const [levelsRes, courseRes] = await Promise.all([
        axios.get(`${apiurl}/api/sql/dropdown/education_level`),
        axios.get(`${apiurl}/api/sql/dropdown/course_type`),
      ]);

      setLevels(levelsRes.data?.data || []);
      setCourseModes(courseRes.data?.data || []);
    } catch (error) {
      console.error("Error fetching dropdowns:", error);
    } finally {
      setLoading(false);
    }
  }, [apiurl]);

  // =============================
  // 🔹 Fetch Grading Systems
  // =============================
  const fetchGradingSystems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/sql/dropdown/grading_system`
      );
      setGradingSystems(response.data.data);
    } catch (error) {
      console.error("Error fetching grading systems:", error);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // 🔹 Initial Data Load
  // =============================
  useEffect(() => {
    fetchDropdowns();
    fetchGradingSystems();
  }, [fetchDropdowns]);

  // =============================
  // 🔹 Fetch Matching Courses
  // =============================
  const fetchCourses = async (inputValue) => {
    if (!inputValue || inputValue.trim() === "") return [];

    try {
      const response = await axios.get(
        `${apiurl}/api/sql/dropdown/matching_courses`,
        { params: { course_name: inputValue } }
      );

      return (
        response.data?.data?.map((item) => ({
          label: item.name,
          value: item.id,
        })) || []
      );
    } catch (error) {
      console.error("Error loading courses:", error);
      return [];
    }
  };

  // =============================
  // 🔹 Handle Course Selection
  // =============================
  const handleCourseChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      course_id: selectedOption ? selectedOption.value : "",
      course_name: selectedOption ? selectedOption.label : "",
    }));
  };
  // =============================
  // 🔹 JSX
  // =============================
  if (loading) return <CustomizedProgressBars />;

  return (
    <form onSubmit={handleSubmit} className="default-form  shadow-sm mb-4">
      <div className="row gy-2 p-3">
        <h5 className="card-title mb-3">Verification</h5>
           {/*  accepted or rejected */}
            {!is_complete && (
              <div className="col-md-6 form-group px-2">
                <label className="form-label">
                  <b>Did this student study here ?</b>
                </label>

                <div className="d-flex align-items-center gap-3 mb-2 ">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="studyHere"
                      checked={formdata.is_studied_here === true}
                      onChange={() =>
                        setFormData({ ...formdata, is_studied_here: true })
                      }
                    />
                    <label className="form-check-label">Yes</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="studyHere"
                      checked={formdata.is_studied_here === false}
                      onChange={() =>
                        setFormData({ ...formdata, level_verified: false,
                                            courseType_verified: false,
                                            courseName_verified: false,
                                            duration_verified: false,
                                            gradingSystem_verified: false,
                                            marks_verified: false,
                                            is_studied_here: false 
                          })
                      }
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>
            )}


  {/* Editable Form Fields */}
  {formdata.is_studied_here && !is_complete && (
 <>
        {/* =========================
    🔹 Overall Verification Switch
    ========================== */}
   
        <div className="col-12">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="verifiedSwitch"
              checked={!!formdata.is_verified}
              onChange={handleToggle("is_verified")}
            />
            <label
              className="form-check-label fw-semibold"
              htmlFor="verifiedSwitch"
            >
              All Details Verified
            </label>
          </div>
        </div>

        {/* =========================
    🔹 Level
    ========================== */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Level <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select flex-grow-1"
              name="level"
              value={formdata.level || ""}
              onChange={handleChange}
              required
              disabled={formdata.level_verified || formdata.is_verified}
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.level}
                </option>
              ))}
            </select>

            <button
              type="button"
              className={`btn btn-sm ${
                formdata.level_verified
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                {
                  setFormData((prev) => ({
                  ...prev,
                  level_verified: !prev.level_verified,
                }))
                  setErr({ ...err, 'level_verified':'' });
                }
              }
              disabled={formdata.is_verified}
            >
              {formdata.level_verified ? "Verified" : "Verify"}
            </button>
          </div>
           {err?.level_verified && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: '17px',
                      marginBottom:"7px"
                    }}
                  >
                    {err.level_verified}
                  </div>
            )}
        </div>

        {/* =========================
    🔹 Course Type
    ========================== */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Course Type <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <div className="flex-grow-1 d-flex flex-wrap gap-3">
              {courseModes.map((item) => (
                <div key={item.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="course_type"
                    value={item.id}
                    disabled={
                      formdata.courseType_verified || formdata.is_verified
                    }
                    checked={Number(formdata.course_type) === Number(item.id)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{item.name}</label>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`btn btn-sm ${
                formdata.courseType_verified
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                {setFormData((prev) => ({
                  ...prev,
                  courseType_verified: !prev.courseType_verified,
                }))
                 setErr({ ...err, 'courseType_verified':'' });
              }
              }
              disabled={formdata.is_verified}
            >
              {formdata.courseType_verified ? "Verified" : "Verify"}
            </button>
          </div>
           {err?.courseType_verified && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: '17px',
                      marginBottom:"7px"
                    }}
                  >
                    {err.courseType_verified}
                  </div>
            )}
        </div>

        {/* =========================
    🔹 Course Name
    ========================== */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Course Name <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <div className="flex-grow-1">
              <AsyncSelect
                cacheOptions
                defaultOptions={defaultOptions}
                loadOptions={fetchCourses}
                isClearable
                isSearchable
                onChange={handleCourseChange}
                value={
                  formdata.course_id
                    ? { label: formdata.course_name, value: formdata.course_id }
                    : null
                }
                placeholder="Enter or select a course name"
                isDisabled={
                  formdata.courseName_verified || formdata.is_verified
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: "#ced4da",
                    minHeight: "40px",
                    borderRadius: "0.375rem",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#86b7fe" },
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>

            <button
              type="button"
              className={`btn btn-sm ${
                formdata.courseName_verified
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                {setFormData((prev) => ({
                  ...prev,
                  courseName_verified: !prev.courseName_verified,
                }))
                  setErr({ ...err, 'courseName_verified':'' });
              }
              }
              disabled={formdata.is_verified}
            >
              {formdata.courseName_verified ? "Verified" : "Verify"}
            </button>
          </div>
          {err?.courseName_verified && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: '17px',
                      marginBottom:"7px"
                    }}
                  >
                    {err.courseName_verified}
                  </div>
            )}
        </div>

        {/* =========================
    🔹 Course Duration
    ========================== */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Course Duration <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <div className="flex-grow-1">
              <div className="row align-items-center g-2">
                <div className="col-5">
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setFormData({
                        ...formdata,
                        duration: {
                          ...formdata.duration,
                          from: e.target.value,
                        },
                      })
                    }
                    disabled={
                      formdata.duration_verified || formdata.is_verified
                    }
                    value={formdata.duration?.from || ""}
                  >
                    <option value="">Start Year</option>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      const isDisabled =
                        formdata.duration?.to &&
                        parseInt(year) > parseInt(formdata.duration.to);
                      return (
                        !isDisabled && (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      );
                    })}
                  </select>
                </div>
                <div className="col-2 text-center">
                  <strong>to</strong>
                </div>
                <div className="col-5">
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setFormData({
                        ...formdata,
                        duration: { ...formdata.duration, to: e.target.value },
                      })
                    }
                    disabled={
                      formdata.duration_verified || formdata.is_verified
                    }
                    value={formdata.duration?.to || ""}
                  >
                    <option value="">End Year</option>
                    {Array.from({ length: 46 }, (_, i) => {
                      const year = new Date().getFullYear() + 5 - i;
                      const isDisabled =
                        formdata.duration?.from &&
                        parseInt(year) < parseInt(formdata.duration.from);
                      return (
                        !isDisabled && (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`btn btn-sm ${
                formdata.duration_verified
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
               { setFormData((prev) => ({
                  ...prev,
                  duration_verified: !prev.duration_verified,
                }))
                  setErr({ ...err, 'duration_verified':'' });
              }
              }
              disabled={formdata.is_verified}
            >
              {formdata.duration_verified ? "Verified" : "Verify"}
            </button>
          </div>
           {err?.duration_verified && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: '17px',
                      marginBottom:"7px"
                    }}
                  >
                    {err.duration_verified}
                  </div>
            )}
        </div>

        {/* =========================
    🔹 Grading System
    ========================== */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Grading System <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select flex-grow-1"
              name="grading_system"
              onChange={handleChange}
              value={formdata.grading_system}
              disabled={formdata.gradingSystem_verified || formdata.is_verified}
            >
              <option>Select Grading System</option>
              {grading_systems.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className={`btn btn-sm ${
                formdata.gradingSystem_verified
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                {setFormData((prev) => ({
                  ...prev,
                  gradingSystem_verified: !prev.gradingSystem_verified,
                }))
                setErr({ ...err, 'gradingSystem_verified':'' });
              }
              }
              disabled={formdata.is_verified}
            >
              {formdata.gradingSystem_verified ? "Verified" : "Verify"}
            </button>
          </div>
           {err?.gradingSystem_verified && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: '17px',
                      marginBottom:"7px"
                    }}
                  >
                    {err.gradingSystem_verified}
                  </div>
            )}
        </div>

        {/* =========================
    🔹 Marks
    ========================== */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Marks <span className="text-danger">*</span>
          </label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              className="form-control flex-grow-1"
              name="marks"
              value={formdata.marks || ""}
              onChange={handleChange}
              disabled={formdata.marks_verified || formdata.is_verified}
              placeholder="Enter obtained marks"
            />

            <button
              type="button"
              className={`btn btn-sm ${
                formdata.marks_verified
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() =>
                {setFormData((prev) => ({
                  ...prev,
                  marks_verified: !prev.marks_verified,
                }))
                  setErr({ ...err, 'marks_verified':'' });
              }
              }
              disabled={formdata.is_verified}
            >
              {formdata.marks_verified ? "Verified" : "Verify"}
            </button>
          </div>
          {err?.marks_verified && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: '17px',
                      marginBottom:"7px"
                    }}
                  >
                  {err.marks_verified}
                  </div>
            )}
        </div>

        {/* =========================
    🔹 Remarks
    ========================== */}
        <div className="col-12">
          <label className="form-label fw-semibold">Remarks</label>
          <textarea
            className="form-control"
            name="remarks"
            rows="1"
            style={{
              resize: "vertical",
              overflowY: "auto",
            }}
            value={formdata.remarks || ""}
            onChange={handleChange}
            placeholder="Add remarks or notes here..."
          />
        </div>
        </>
  )}
        {/* =========================
    🔹 Footer Buttons
    ========================== */}
        <div className="col-12 text-end mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
        

      </div>
    </form>
  );
};

export default React.memo(VerificationFormSection);
