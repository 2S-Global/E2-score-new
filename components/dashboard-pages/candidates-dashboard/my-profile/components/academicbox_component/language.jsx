import React, { useState } from "react";

const LanguageProficiency = () => {
  const [languages, setLanguages] = useState([{}]);

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: "",
        proficiency: "",
        read: false,
        write: false,
        speak: false,
      },
    ]);
  };

  const deleteLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  const handleChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const handleCheckboxChange = (index, field) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = !updatedLanguages[index][field];
    setLanguages(updatedLanguages);
  };

  return (
    <div>
      <label
        className="form-label"
        style={{ fontWeight: 600, fontSize: "20px" }}
      >
        Language proficiency
      </label>

      <p className="text-muted" style={{ fontSize: "14px" }}>
        Strengthen your resume by letting recruiters know you can communicate in
        multiple languages
      </p>

      {languages.map((lang, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">
                <b>Language</b>
              </label>
              <input
                type="text"
                placeholder="Enter language"
                className="form-control"
                value={lang.language}
                onChange={(e) =>
                  handleChange(index, "language", e.target.value)
                }
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">
                <b>Proficiency</b>
              </label>
              <select
                className="form-select"
                value={lang.proficiency}
                onChange={(e) =>
                  handleChange(index, "proficiency", e.target.value)
                }
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              >
                <option value="">Select proficiency</option>
                <option value="Beginner">Beginner</option>
                <option value="Proficient">Proficient</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={lang.read}
                onChange={() => handleCheckboxChange(index, "read")}
              />{" "}
              Read
            </label>
            <label>
              <input
                type="checkbox"
                checked={lang.write}
                onChange={() => handleCheckboxChange(index, "write")}
              />{" "}
              Write
            </label>
            <label>
              <input
                type="checkbox"
                checked={lang.speak}
                onChange={() => handleCheckboxChange(index, "speak")}
              />{" "}
              Speak
            </label>
            <button
              type="button"
              onClick={() => deleteLanguage(index)}
              style={{
                color: "blue",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addLanguage}
        style={{
          color: "blue",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add another language
      </button>
    </div>
  );
};

export default LanguageProficiency;
