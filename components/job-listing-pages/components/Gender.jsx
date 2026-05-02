"use client";

import { useDispatch, useSelector } from "react-redux";
import { addGender } from "../../../features/filter/filterInstitute";

const GenderBox = () => {
  const dispatch = useDispatch();

  const gender = useSelector(
    (state) => state.filterInstitute?.studentList?.gender || [],
  );

  const genderOptions = [
    { id: 1, name: "Male", value: "male" },
    { id: 2, name: "Female", value: "female" },
    { id: 3, name: "Other", value: "other" },
  ];

  const handleChange = (value) => {
    dispatch(addGender(value));
  };

  return (
    <ul className="switchbox">
      {genderOptions.map((item) => (
        <li key={item.id}>
          <label className="switch">
            <input
              type="checkbox" // ✅ checkbox now correct
              value={item.value}
              checked={gender.includes(item.value)} // ✅ FIX
              onChange={() => handleChange(item.value)}
            />
            <span className="slider round"></span>
            <span className="title">{item.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default GenderBox;
