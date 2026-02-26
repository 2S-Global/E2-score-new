"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { addSalary } from "../../../features/filter/filterSlice";

const SalaryRangeSlider = () => {
  const { jobList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [salary, setSalary] = useState([
    jobList.salary.min,
    jobList.salary.max,
  ]);

  const handleOnChange = (value) => {
    setSalary(value); // update local UI
    dispatch(addSalary({ min: value[0], max: value[1] })); // update redux
  };

  useEffect(() => {
    setSalary([jobList.salary.min, jobList.salary.max]);
  }, [jobList.salary]);

  return (
    <div className="range-slider-one salary-range">
      <Slider
        range // ✅ IMPORTANT
        min={10000}
        max={3000000}
        value={salary}
        onChange={handleOnChange}
      />

      <div className="input-outer">
        <div className="amount-outer">
          <span className="d-inline-flex align-items-center">
            <span className="min">₹{salary[0]}</span>
            <span className="max ms-2">₹{salary[1]}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalaryRangeSlider;
