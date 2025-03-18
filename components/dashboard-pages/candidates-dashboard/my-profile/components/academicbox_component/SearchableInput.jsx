import React from "react";

const SearchableInput = ({ label, value, onChange, options, onSelect }) => {
  return (
    <div className="form-group  position-relative">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={`Search ${label}`}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {options.length > 0 && value && (
        <ul className="dropdown-menu show" style={{ position: "absolute", width: "100%" }}>
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableInput;
