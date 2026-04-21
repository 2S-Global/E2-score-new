"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";

const formModal = ({ show, onClose, data = {}, setRefresh = () => {} }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    course_name: "",
    duration: "",
    semester: "",
    id: "",
    exam_type: "year", // NEW
    marks_type: "", // NEW
  });

  const [courseList, setCourseList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState({});

useEffect(() => {
  if (data?._id) {
    const duration = data.course_durartion || "";
    const examType = data.courseStructure || "year";

    let calculatedSemester = "";

    if (duration) {
      if (examType === "year") {
        calculatedSemester = Number(duration);
      } else if (examType === "semester") {
        calculatedSemester = Number(duration) * 2;
      }
    }

    setFormData({
      course_name: data.name || "",
      duration: duration,
      semester: calculatedSemester, // ✅ FIXED
      exam_type: examType, // ✅ IMPORTANT
      marks_type: data.marksType || "", // ✅ IMPORTANT
      id: data._id || "",
    });
  }
}, [data]);

  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.course_name) newErrors.course_name = "Course is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.semester) newErrors.semester = "Semester is required";
    if (!formData.exam_type) newErrors.exam_type = "Exam type is required";
    if (!formData.marks_type) newErrors.marks_type = "Marks type is required";
    return newErrors;
  };

  // ✅ Fetch courses (API)
  const fetchCourses = async (search) => {
    try {
      setCourseLoading(true);
      const res = await axios.get(
        `${apiurl}/api/sql/dropdown/CourcesSearch?search=${search}`,
      );

      setCourseList(res.data?.data || []);
      setShowDropdown(true);
    } catch (err) {
      console.log(err);
    } finally {
      setCourseLoading(false);
    }
  };

  // ✅ Handle input change
const handleChange = (e) => {
  const { name, value } = e.target;

  setErr((prev) => ({ ...prev, [name]: "" }));

  let updatedForm = {
    ...formData,
    [name]: value,
  };

  // ✅ Always calculate (fix blank issue)
  const duration = name === "duration" ? value : formData.duration;
  const examType = name === "exam_type" ? value : formData.exam_type;

  if (duration && examType) {
    if (examType === "year") {
   updatedForm.semester = String(duration);
    } else if (examType === "semester") {
      updatedForm.semester = String(Number(duration) * 2);
    }
  } else {
    // ✅ IMPORTANT: reset when empty
    updatedForm.semester = "";
  }

  setFormData(updatedForm);

  // autocomplete (same)
  if (name === "course_name") {
    if (value.length > 0) {
      fetchCourses(value);
    } else {
      setShowDropdown(false);
      setCourseList([]);
    }
  }
};

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErr(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const sendformData = new FormData();

      // ✅ FIXED FIELD NAMES
      sendformData.append("name", formData.course_name);
      sendformData.append("course_durartion", formData.duration);
      sendformData.append("total_number_of_semesters", formData.semester);
      sendformData.append("courseStructure", formData.exam_type); // ✅ FIX
      sendformData.append("marksType", formData.marks_type); // ✅ FIX

      const token = localStorage.getItem("Institute_token");

      try {
        let response;

        // ✅ EDIT MODE
        if (data?._id) {
          sendformData.append("courseId", formData.id); // 🔥 FIXED

          response = await axios.put(
            `${apiurl}/api/institutestudent/update-custom-course`,
            sendformData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
        }
        // ✅ ADD MODE
        else {
          response = await axios.post(
            `${apiurl}/api/institutestudent/add-custom-course `,
            sendformData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
        }

        setSuccess(response.data.message);
        setRefresh(true);
        onClose();
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  if (!show) return null;

  return (
    <div
      className="modal modal-lg fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {data?._id ? "Edit Course" : "Add Course"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <MessageComponent error={error} success={success} />

              <div className="row">
                {/* ✅ Course Autocomplete */}
                <div className="mb-3 col-md-12 position-relative">
                  <label className="form-label">
                    Course Name <span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    name="course_name"
                    className="form-control"
                    value={formData.course_name}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  {showDropdown && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {courseLoading && (
                        <li className="list-group-item">Loading...</li>
                      )}

                      {!courseLoading &&
                        courseList.length === 0 &&
                        formData.course_name && (
                          <li
                            className="list-group-item list-group-item-action text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                course_name: formData.course_name, // keep typed value
                              }));
                              setShowDropdown(false);
                            }}
                          >
                            Create new: "{formData.course_name}"
                          </li>
                        )}

                      {courseList.map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              course_name: item.name || item.course_name || "",
                            }));
                            setShowDropdown(false);
                          }}
                        >
                          {item.name || item.course_name}
                        </li>
                      ))}
                    </ul>
                  )}

                  {err?.course_name && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {err.course_name}
                    </div>
                  )}
                </div>

                {/* ✅ Exam Type */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Exam Type <span style={{ color: "red" }}>*</span>
                  </label>

                  <div>
                    <label className="me-3">
                      <input
                        type="radio"
                        name="exam_type"
                        value="year"
                        checked={formData.exam_type === "year"}
                        onChange={handleChange}
                      />{" "}
                      Yearly
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="exam_type"
                        value="semester"
                        checked={formData.exam_type === "semester"}
                        onChange={handleChange}
                      />{" "}
                      Semester
                    </label>
                  </div>

                  {err?.exam_type && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {err.exam_type}
                    </div>
                  )}
                </div>

                {/* ✅ Marks Type */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Marks Type <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    name="marks_type"
                    className="form-control"
                    value={formData.marks_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Marks Type</option>
                    <option value="dgpa">DGPA</option>
                    <option value="cgpa">CGPA</option>
                    <option value="percentage">Percentage</option>
                  </select>

                  {err?.marks_type && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {err.marks_type}
                    </div>
                  )}
                </div>

                {/* ✅ Duration */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Duration (Years) <span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleChange}
                  >
                    <option value="">Select Duration</option>
                    <option value="1">1 Years</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                    <option value="6">6 Years</option>
                  </select>

                  {err?.duration && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {err.duration}
                    </div>
                  )}
                </div>

                {/* ✅ Semester */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">
                    Total Semester <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="semester"
                    className="form-control"
                    value={formData.semester}
                    disabled
                  >
                    <option value="">Select Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>

                  {/* {err?.semester && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {err.semester}
                    </div>
                  )} */}
                </div>
              </div>

              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Saving..." : data?._id ? "Update" : "Save"}
              </button>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default formModal;
