"use client";
import { useDispatch, useSelector } from "react-redux";
import { addAdmissionYear } from "../../../features/filter/filterInstitute";

const AdmissionYear = () => {
  const dispatch = useDispatch();

  const { admissionYear } =
    useSelector((state) => state.filterInstitute.studentList) || {};

  const handleChange = (e) => {
    dispatch(addAdmissionYear(e.target.value));
  };

  return (
    <div className="form-group">
      <input
        type="number"
        placeholder="Enter year (e.g. 2022)"
        value={admissionYear || ""}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 4) {
            handleChange(e);
          }
        }}
        min="1900"
        max="9999"
        className="form-control"
      />
    </div>
  );
};

export default AdmissionYear;
