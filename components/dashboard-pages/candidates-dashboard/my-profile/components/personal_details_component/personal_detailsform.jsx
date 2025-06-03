import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import LanguageProficiency from "../academicbox_component/language";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomizedProgressBars from "@/components/common/loader";
import Disability from "./disability";
import CareerBreak from "./carrer_break";
const PersonalInfoForm = ({ formData, setFormData, focusSection, show }) => {
  //main
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  //list
  const [Genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [more_info_list, setMore_info_list] = useState([]);
  const [marriageStatusList, setMarriageStatusList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [UsaVisaList, setUsaVisaList] = useState([]);

  //utlity
  const personalInfo = useRef(null);
  const category = useRef(null);
  const careerBreak = useRef(null);
  const workPermit = useRef(null);
  const languages = useRef(null);
  const dob = useRef(null);
  const differentlyAbled = useRef(null);

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  //loading state
  const [loading, setLoading] = useState(false);

  //use effects
  useEffect(() => {
    if (loading) return; // Skip scrolling if still loading
    if (show && focusSection) {
      const sections = {
        personalInfo: personalInfo,
        category: category,
        careerBreak: careerBreak,
        workPermit: workPermit,
        languages: languages,
        dob: dob,
        differentlyAbled: differentlyAbled,
      };
      console.log("Scrolling to focus section:", focusSection);
      sections[focusSection]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [show, focusSection, loading]);

  useEffect(() => {
    const fetchGenders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/All_gender`);
        const data = await response.json();
        setGenders(data.data);
      } catch (error) {
        console.error("Error fetching genders:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMoreInfoList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiurl}/api/sql/dropdown/more_information`
        );
        const data = await response.json();
        setMore_info_list(data.data);
      } catch (error) {
        console.error("Error fetching more info list:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMarriageStatusList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiurl}/api/sql/dropdown/marital_status`
        );
        const data = await response.json();
        setMarriageStatusList(data.data);
      } catch (error) {
        console.error("Error fetching marriage status list:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiurl}/api/sql/dropdown/category_details`
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUsaVisaList = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/visa_type`);
        const data = await response.json();
        setUsaVisaList(data.data);
      } catch (error) {
        console.error("Error fetching USA visa list:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/sql/dropdown/All_contry`);
        const data = await response.json();
        setCountries(
          data.data.map((country) => ({
            label: country.name,
            value: country.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();

    fetchUsaVisaList();
    fetchCategories();
    fetchMarriageStatusList();
    fetchGenders();
    fetchMoreInfoList();
  }, [apiurl]);

  //functions
  const handleSelect = (key, value, e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleMultiSelect = (key, value, e) => {
    e.preventDefault();
    setFormData((prev) => {
      const currentValues = prev[key] || [];
      const isSelected = currentValues.includes(value);
      return {
        ...prev,
        [key]: isSelected
          ? currentValues.filter((v) => v !== value) // remove if already selected
          : [...currentValues, value], // add if not selected
      };
    });
  };

  const handleDateChange = (date) => {
    if (date) {
      setFormData({ ...formData, dob: date }); // Store raw Date object
    }
  };

  const handleChange = (selectedOptions) => {
    setFormData({
      ...formData,
      work_permit_other_countries: selectedOptions.map((opt) => opt.value),
    });
  };

  // Convert stored IDs to react-select compatible format
  const selectedCountries = countries.filter((country) =>
    formData.work_permit_other_countries.includes(country.value)
  );

  return (
    <>
      {loading ? (
        <CustomizedProgressBars />
      ) : (
        <>
          <form className="default-form">
            <p>this is from PersonalInfoForm</p>

            <div ref={personalInfo}>
              {/* Gender Selection */}
              <div className="mb-3 form-group">
                <label className="form-label">
                  <b>Gender</b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {Genders.map((gender) => (
                    <button
                      type="button"
                      key={gender.id}
                      onClick={(e) => handleSelect("gender", gender.id, e)}
                      className={`btn option-btn rounded-pill ${
                        formData.gender == gender.id ? "active" : ""
                      }`}
                    >
                      {gender.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* more info selection */}
              <div className="mb-3 form-group">
                <label className="form-label">
                  <b>More Information</b>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {more_info_list.map((info) => (
                    <button
                      type="button"
                      key={info.id}
                      onClick={(e) =>
                        handleMultiSelect("more_info", info.id, e)
                      }
                      className={`btn option-btn rounded-pill ${
                        formData.more_info.includes(info.id) ? "active" : ""
                      }`}
                    >
                      {info.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Marital Status Section */}
              <div className="mb-3">
                <label className="form-label">
                  <b>Marital Status</b>
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {marriageStatusList.map((status) => (
                    <button
                      type="button"
                      key={status.id}
                      onClick={(e) =>
                        handleSelect("marital_status", status.id, e)
                      }
                      className={`btn option-btn rounded-pill ${
                        formData.marital_status == status.id ? "active" : ""
                      }`}
                    >
                      {status.status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date of Birth Selection */}
              <div className="mb-3 col-md-4 form-group" ref={dob}>
                <label className="form-label d-block">
                  <b>Date of Birth</b>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  selected={formData.dob ? new Date(formData.dob) : null}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  maxDate={eighteenYearsAgo}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  required
                  placeholderText="dd/mm/yyyy"
                  width="100%"
                  withPortal
                />
              </div>
            </div>
            <div className="mb-3" ref={category}>
              <label className="form-label">
                <b>Category</b>
              </label>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Companies welcome people from various categories to bring
                equality among all citizens.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    onClick={(e) => handleSelect("category", category.id, e)}
                    className={`btn option-btn rounded-pill ${
                      formData.category == category.id ? "active" : ""
                    }`}
                  >
                    {category.category_name}
                  </button>
                ))}
              </div>
            </div>
            <div className="row" ref={differentlyAbled}>
              <div className="mb-3 form-group" ref={differentlyAbled}>
                <label className="form-label">
                  <b>Are you differently abled?</b>
                </label>
                <div className="d-flex gap-3">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="form-check-label">
                      <input
                        type="radio"
                        name="differentlyAbled"
                        value={formData.differentlyAbled}
                        checked={formData.differentlyAbled === option}
                        onChange={() =>
                          setFormData({ ...formData, differentlyAbled: option })
                        }
                        className="form-check-input me-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              {formData.differentlyAbled === "Yes" ? (
                <>
                  <Disability
                    formData={formData}
                    setFormData={setFormData}
                    apiurl={apiurl}
                  />
                </>
              ) : null}
            </div>

            <div className="mb-3 form-group" ref={careerBreak}>
              <label className="form-label">
                <b>Have you taken a career break?</b>
              </label>
              <div className="d-flex gap-3">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="form-check-label">
                    <input
                      type="radio"
                      name="career_break"
                      value={option}
                      checked={formData.career_break === option}
                      onChange={() =>
                        setFormData({ ...formData, career_break: option })
                      }
                      className="form-check-input me-2"
                    />
                    {option}
                  </label>
                ))}
              </div>

              {formData.career_break === "Yes" ? (
                <>
                  <CareerBreak
                    formData={formData}
                    setFormData={setFormData}
                    apiurl={apiurl}
                  />
                </>
              ) : null}
            </div>

            <div ref={workPermit}>
              <div className="mb-3">
                <label className="form-label">
                  <b>Work permit for USA</b>
                </label>
                <div className="d-flex gap-3">
                  {/* Work permit for USA dropdown with type */}
                  <select
                    className="form-select"
                    value={formData.usa_visa_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        usa_visa_type: e.target.value,
                      })
                    }
                  >
                    {UsaVisaList.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.visa_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Work permit for other countries (Max 3)</b>
                </label>
                <Select
                  isMulti
                  options={countries}
                  value={countries.filter((option) =>
                    formData.work_permit_other_countries.includes(option.value)
                  )}
                  onChange={handleChange}
                  placeholder="Tell us your location preferences to work"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isOptionDisabled={(option) =>
                    formData.work_permit_other_countries.length >= 3 &&
                    !formData.work_permit_other_countries.includes(option.value)
                  }
                />
              </div>
            </div>

            <p>this is End PersonalInfoForm</p>
          </form>
        </>
      )}
    </>
  );
};

export default PersonalInfoForm;
