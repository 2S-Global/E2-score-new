"use client";

import { useDispatch, useSelector } from "react-redux";
import { setExclude } from "../../../features/filter/filterInstitute";

const ExcludeBox = () => {
  const dispatch = useDispatch();

  const exclude = useSelector(
    (state) => state.filterInstitute?.studentList?.exclude || {},
  );

  const options = [
    { id: 1, label: "Exclude Already Gave Interview", key: "interview" },
    { id: 2, label: "Exclude Already Placed", key: "placed" },
  ];

  return (
    <ul
      className="switchbox"
      style={{
        padding: 0,
        margin: 0,
        listStyle: "none",
        width: "100%",
      }}
    >
      {options.map((item) => (
        <li key={item.id} style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={!!exclude[item.key]}
              onChange={(e) =>
                dispatch(
                  setExclude({
                    key: item.key,
                    value: e.target.checked,
                  }),
                )
              }
              style={{ display: "none" }}
            />

            {/* Custom Toggle */}
            <span
              style={{
                width: "38px",
                height: "20px",
                background: exclude[item.key] ? "#4CAF50" : "#ccc",
                borderRadius: "20px",
                position: "relative",
                transition: "0.3s",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  background: "#fff",
                  borderRadius: "50%",
                  top: "2px",
                  left: exclude[item.key] ? "20px" : "2px",
                  transition: "0.3s",
                }}
              />
            </span>

            {/* Label */}
            <span style={{ fontSize: "14px" }}>{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ExcludeBox;
