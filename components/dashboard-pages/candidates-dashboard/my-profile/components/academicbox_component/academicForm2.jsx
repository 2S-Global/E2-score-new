import React, { useState, useEffect, use } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizedProgressBars from "@/components/common/loader";
import axios from "axios";
import {
  specializations,
  colleges,
  courses,
  diploma_st_uni,
  university,
  grading_systems,
} from "./academicData";
import SearchableInput from "./SearchableInput";
import UploadButton from "./UploadButton";
import SchoolForm from "./schoolform";
import DegreeForm from "./degreeform";

const EducationForm = ({ formData, setFormData }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [academicData, setAcademicData] = useState([]);
  const [transcriptFile, setTranscriptFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [states, useStates] = useState([]);
  const [levels, Setlevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const token = localStorage.getItem("candidate_token");
  if (!token) {
    console.log("No token");
  }

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/education_level`
        );
        Setlevels(response.data.data);
      } catch (error) {
        console.error("Error fetching levels:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchStates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/all_university_state`
        );
        useStates(response.data.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
    fetchStates();
  }, [token]);

  const handleRemove = (id) => {
    setAcademicData(academicData.filter((item) => item.id !== id));
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setAcademicData(level ? [{ id: Date.now(), level, data: {} }] : []);
    setFormData({ ...formData, level: level });
  };

  const handleSearchChange = (e, setSearch, setFiltered, list) => {
    const value = e.target.value;
    setSearch(value);
    setFiltered(
      list.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleSelect = (value, setSearch, setFiltered) => {
    setSearch(value);
    setFiltered([]);
  };

  const handleChange = (id, field, value) => {
    setAcademicData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, data: { ...item.data, [field]: value } }
          : item
      )
    );
    setFormData({ ...formData, [field]: value });
  };

  const calPercentage = (id, cgpa) => {
    const percentage = cgpa ? (parseFloat(cgpa) * 9.5).toFixed(2) : "";
    handleChange(id, "percentage", percentage);
  };

  const formatLevelName = (id) => {
    const levelObj = levels.find((lvl) => lvl.id == id);
    return levelObj ? levelObj.level : "Unknown Level";
  };

  return (
    <>
      {loading ? (
        <CustomizedProgressBars />
      ) : (
        <form className="default-form">
          <div className="form-group">
            <label>Select Level (This is form 2)</label>
            <select
              className="form-control"
              value={formData.level}
              onChange={(e) => handleLevelChange(e.target.value)}
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {formatLevelName(level.id)}
                </option>
              ))}
            </select>
          </div>
          {academicData.map((item) => (
            <div key={item.id} className="border p-3 mb-3">
              <h4 className="text-center">{formatLevelName(item.level)}</h4>

              <div className="row">
                {/* State Selection */}
                <div className="form-group">
                  <label>State</label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      handleChange(item.id, "state", e.target.value)
                    }
                  >
                    <option>Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                {["1", "2"].includes(String(item.level)) ? (
                  // Board Selection for 10th/12th
                  <SchoolForm
                    item={item}
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                    transcriptFile={transcriptFile}
                    setTranscriptFile={setTranscriptFile}
                    certificateFile={certificateFile}
                    setCertificateFile={setCertificateFile}
                  />
                ) : (
                  // University Selection for Diploma/UG/PG/PhD
                  <DegreeForm
                    item={item}
                    handleChange={handleChange}
                    transcriptFile={transcriptFile}
                    setTranscriptFile={setTranscriptFile}
                    certificateFile={certificateFile}
                    setCertificateFile={setCertificateFile}
                    diploma_st_uni={diploma_st_uni}
                    collegeSearch={collegeSearch}
                    setCollegeSearch={setCollegeSearch}
                    courseSearch={courseSearch}
                    setCourseSearch={setCourseSearch}
                    filteredColleges={filteredColleges}
                    setFilteredColleges={setFilteredColleges}
                    filteredCourses={filteredCourses}
                    setFilteredCourses={setFilteredCourses}
                    specializations={specializations}
                    grading_systems={grading_systems}
                    university={university}
                    handleSearchChange={handleSearchChange}
                    handleSelect={handleSelect}
                    colleges={colleges}
                    courses={courses}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>

              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </form>
      )}
    </>
  );
};

export default EducationForm;
