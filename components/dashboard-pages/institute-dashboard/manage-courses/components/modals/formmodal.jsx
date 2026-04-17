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
      setFormData({
        course_name: data.name || "", // ✅ FIX
        duration: data.course_durartion || "", // ✅ FIX
        semester: data.total_number_of_semesters || "", // ✅ FIX
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Autocomplete trigger
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

                      {!courseLoading && courseList.length === 0 && (
                        <li className="list-group-item">No data found</li>
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

                {/* ✅ Duration */}
                <div className="mb-3 col-md-12">
                  <label className="form-label">
                    Duration <span style={{ color: "red" }}>*</span>
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
                <div className="mb-3 col-md-12">
                  <label className="form-label">
                    Total Semester <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="semester"
                    className="form-control"
                    value={formData.semester}
                    onChange={handleChange}
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

                  {err?.semester && (
                    <div style={{ color: "red", fontSize: "14px" }}>
                      {err.semester}
                    </div>
                  )}
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
