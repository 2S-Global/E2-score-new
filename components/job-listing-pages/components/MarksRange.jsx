"use client";

import { useDispatch, useSelector } from "react-redux";
import { setMarksRange } from "../../../features/filter/filterInstitute";

const MarksRange = () => {
  const dispatch = useDispatch();

  const marks = useSelector((state) => state.filterInstitute.studentList.marks);

const handleChange = (type, index, value) => {
  let newRange = [...marks[type]];

  // ✅ convert + clamp between 0–100
  value = Math.max(0, Math.min(100, Number(value)));

  if (index === 0) {
    newRange[0] = Math.min(value, newRange[1]); // min ≤ max
  } else {
    newRange[1] = Math.max(value, newRange[0]); // max ≥ min
  }

  dispatch(setMarksRange({ type, range: newRange }));
};
  const renderRange = (label, type) => (
    <div className="mb-4">
      <label className="fw-bold">{label}</label>

      {/* Slider */}
      <div className="d-flex gap-2 align-items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={marks[type][0]}
          onChange={(e) => handleChange(type, 0, e.target.value)}
          className="w-50"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={marks[type][1]}
          onChange={(e) => handleChange(type, 1, e.target.value)}
          className="w-50"
        />
      </div>

      {/* Input boxes */}
      <div className="d-flex gap-2 mt-2">
        <input
          type="number"
          min="0"
          max="100"
          value={marks[type][0]}
          onChange={(e) => handleChange(type, 0, e.target.value)}
          className="form-control"
        />
        <input
          type="number"
          min="0"
          max="100"
          value={marks[type][1]}
          onChange={(e) => handleChange(type, 1, e.target.value)}
          className="form-control"
        />
      </div>

      {/* Range display */}
      <small className="text-muted">
        Range: {marks[type][0]}% - {marks[type][1]}%
      </small>
    </div>
  );

  return (
    <div>
      {renderRange("10th Marks", "tenth")}
      {renderRange("12th Marks", "twelfth")}
      {renderRange("Graduation Marks", "graduation")}
    </div>
  );
};

export default MarksRange;
