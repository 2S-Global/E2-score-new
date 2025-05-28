import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomizedProgressBars from "@/components/common/loader";
import axios from "axios";

import SchoolForm from "./formcomponent/schoolform";
import DegreeForm from "./formcomponent/degreeform";

const EducationForm = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("candidate_token");
  if (!token) {
    // console.log("No token");
  }

  //list
  const [levels, Setlevels] = useState([]);
  const [states, useStates] = useState([]);
  const [course_mode, setCourseMode] = useState([]);
  const [grading_systems, setGradingSystems] = useState([]);
  const [listboard, setListboard] = useState([]);
  const [listmedium, setListmedium] = useState([]);
  const [university, setUniversity] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);

  //tools
  const [stateselected, setStateselected] = useState(false);
  const [universityselected, setUniversityselected] = useState(false);
  const [collegeselected, setCollegeselected] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [courseSearch, setCourseSearch] = useState("");
  const [coursetype, setCoursetype] = useState([]);
  //fetch levels
  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/education_level`
        );

        Setlevels(response.data.data);
      } catch (error) {
        //  console.error("Error fetching levels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [token]);

  useEffect(() => {
    if (!formData.level) return;
    const fetchStates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/all_university_state`
        );
        useStates(response.data.data);
      } catch (error) {
        //  console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
      }
    };
    /* api/sql/dropdown/course_type */
    const fetchCourseMode = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/course_type`
        );
        setCourseMode(response.data.data);
      } catch (error) {
        // console.error("Error fetching course modes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseMode();

    const fetchGradingSystems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/grading_system`
        );
        setGradingSystems(response.data.data);
      } catch (error) {
        // console.error("Error fetching grading systems:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGradingSystems();

    fetchStates();
  }, [formData.level]);

  useEffect(() => {
    if (!formData.state) return;
    const fetchboard = async () => {
      /* setLoading(true); */
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/state_wise_board?state_id=${formData.state}`
        );
        setListboard(response.data.data);
      } catch (error) {
        //  console.error("Error fetching boards:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchmedium = async () => {
      /*  setLoading(true); */
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/medium_of_education`
        );
        setListmedium(response.data.data);
      } catch (error) {
        //     console.error("Error fetching mediums:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchuniversity = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/university_state?state_id=${formData.state}`
        );
        setUniversity(response.data.data);
      } catch (error) {
        // console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchuniversity();
    fetchboard();
    fetchmedium();
  }, [formData.state]);

  useEffect(() => {
    if (!formData.university) return;
    const fetchcolleges = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/college_name?university_id=${formData.university}`
        );
        setColleges(response.data.data);
        setFilteredColleges(response.data.data);
      } catch (error) {
        // console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchcolleges();
  }, [formData.university]);

  useEffect(() => {
    if (!formData.institute_name) return;
    const fetchCourses = async () => {
      setLoading(true);
      try {
        /* /api/sql/dropdown/university_course?state_id=32&university_id=1032&college_name=KALYANI%20GOVERNMENT%20ENGINEERING%20COLLEGE&course_type=UG */
        const response = await axios.get(
          `${apiurl}/api/sql/dropdown/university_course?state_id=${formData.state}&university_id=${formData.university}&college_name=${formData.institute_name}&course_type=${coursetype}`
        );
        setCourses(response.data.data);
        setFilteredCourses(response.data.data);
        setCollegeselected(true);
      } catch (error) {
        // console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [formData.institute_name]);

  //chanage level
  const handleLevelChange = (e) => {
    const selectedLevel = e.target.value;
    //map out levels based on selected level
    const levelData = levels.find((lvl) => lvl.id == selectedLevel);
    if (!levelData) {
      //console.error("Level data not found");
      // return;
    }
    setCoursetype(levelData.type);

    setFormData({
      level: selectedLevel,
      state: "",
      board: "",
      year_of_passing: "",
      medium: "",
      marks: "",
      eng_marks: "",
      math_marks: "",
      university: "",
      institute_name: "",
      course_name: "",
      course_type: "",
      start_year: "",
      end_year: "",
      grading_system: "",
      is_primary: false,
      transcript: null,
      certificate: null,
    });
  };
  //handel changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "state") {
      if (value) {
        setStateselected(true);
      } else {
        setStateselected(false);
      }
    }

    if (name === "university") {
      if (value) {
        setUniversityselected(true);
      } else {
        setUniversityselected(false);
      }
    }

    if (name === "institute_name") {
      if (value) {
        setCollegeselected(true);
      } else {
        setCollegeselected(false);
      }
    }
  };

  const formatLevelName = (id) => {
    const levelObj = levels.find((lvl) => lvl.id == id);
    return levelObj ? levelObj.level : "Unknown Level";
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

  return (
    <>
      {loading ? (
        <CustomizedProgressBars />
      ) : (
        <>
          <form className="default-form">
            <div className="form-group">
              <label>
                Select Level
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control"
                name="level"
                value={formData.level}
                onChange={handleLevelChange}
                required
              >
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {formatLevelName(level.id)}
                  </option>
                ))}
              </select>
            </div>
            {formData.level ? (
              <div className="border p-3 mb-3">
                <h4 className="text-center">
                  {formatLevelName(formData.level)}
                </h4>
                <div className="row">
                  <div className="form-group">
                    <label>State</label>
                    <span style={{ color: "red" }}>*</span>
                    <select
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>

                    {formData.level == 1 || formData.level == 2 ? (
                      <SchoolForm
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        listboard={listboard}
                        listmedium={listmedium}
                        stateselected={stateselected}
                      />
                    ) : (
                      <DegreeForm
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        stateselected={stateselected}
                        university={university}
                        handleSearchChange={handleSearchChange}
                        universityselected={universityselected}
                        collegeselected={collegeselected}
                        collegeSearch={collegeSearch}
                        setCollegeSearch={setCollegeSearch}
                        filteredColleges={filteredColleges}
                        setFilteredColleges={setFilteredColleges}
                        colleges={colleges}
                        handleSelect={handleSelect}
                        courseSearch={courseSearch}
                        setCourseSearch={setCourseSearch}
                        setFilteredCourses={setFilteredCourses}
                        filteredCourses={filteredCourses}
                        courses={courses}
                        course_mode={course_mode}
                        grading_systems={grading_systems}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="col-md-12">
                  <span style={{ color: "red" }}>Please select a level</span>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </>
  );
};

export default EducationForm;
