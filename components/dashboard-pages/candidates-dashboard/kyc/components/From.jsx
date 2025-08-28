"use client";

import { useState } from "react";

const VerificationForm = ({ Document, name }) => {
  const [formData, setFormData] = useState({
    name: name || "",
    number: "",
    fieldname: Document.verification_name,
  });

  const handleInputChange = (fieldKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };
  const addToVerificationCart = async (formData) => {
    console.log("test ", formData);
  };

  return (
    <form
      className="default-form"
      onSubmit={(e) => {
        e.preventDefault();
        addToVerificationCart(formData);
      }}
    >
      <div className="row">
        {Document.fields.map((field, index) => {
          const inputId = `${Document._id}-${index}`;
          const inputName = `${Document.verification_name}-${index}`;

          return (
            <div className="form-group col-lg-6 col-md-6" key={inputId}>
              <label htmlFor={inputId}>
                {field}
                <span className="text-danger ms-1">*</span>
              </label>
              <input
                type="text"
                id={inputId}
                name={inputName}
                className="form-control"
                placeholder={`Enter ${field}`}
                required
                readOnly={index === 1}
                value={index === 0 ? formData.number : formData.name}
                onChange={(e) =>
                  handleInputChange(
                    index === 0 ? "number" : "name",
                    e.target.value
                  )
                }
                {...(Document.regex ? { pattern: Document.regex } : {})}
              />
            </div>
          );
        })}

        <div className="form-group  d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Add To Verification Cart
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerificationForm;
