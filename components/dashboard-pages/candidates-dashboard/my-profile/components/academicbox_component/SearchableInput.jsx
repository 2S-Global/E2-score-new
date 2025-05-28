import React, { useState } from "react";

const SearchableInput = ({
  name,
  label,
  value,
  onChange,
  options,
  onSelect,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100); // Slight delay for click to register
  };

  return (
    <div className="form-group position-relative">
      <label>
        {label}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        className="form-control"
        placeholder={`Search ${label}`}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        name={name}
      />
      {isFocused && value && options.length > 0 && (
        <ul
          className="dropdown-menu show"
          style={{ position: "absolute", width: "100%", zIndex: 1000 }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onMouseDown={() => onSelect(option)} // Use onMouseDown instead of onClick
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

/*
this works fine just dont hide the list 
import React from "react";

const SearchableInput = ({
  name,
  label,
  value,
  onChange,
  options,
  onSelect,
}) => {
  return (
    <div className="form-group  position-relative">
      <label>
        {label}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        className="form-control"
        placeholder={`Search ${label}`}
        value={value}
        onChange={onChange}
        autoComplete="off"
        name={name}
      />
      {options.length > 0 && value && (
        <ul
          className="dropdown-menu show"
          style={{ position: "absolute", width: "100%" }}
        >
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
 */
