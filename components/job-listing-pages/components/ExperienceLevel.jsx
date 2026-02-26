"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addExperience } from "../../../features/filter/filterSlice";
import {
  experienceLevelCheck,
  fetchExperienceLevels,
} from "../../../features/job/jobSlice";

const ExperienceLevel = () => {
  const { experienceLevel } = useSelector((state) => state.job) || {};
  const dispatch = useDispatch();

  // ✅ FETCH EXPERIENCE LEVELS WHEN COMPONENT LOADS
  useEffect(() => {
    dispatch(fetchExperienceLevels());
  }, [dispatch]);

  const experienceHandler = (e, id) => {
    dispatch(addExperience(e.target.value));
    dispatch(experienceLevelCheck(id));
  };

  return (
    <ul className="switchbox">
      {experienceLevel?.map((item) => (
        <li key={item.id}>
          <label className="switch">
            <input
              type="checkbox"
              checked={item.isChecked}
              value={item.value}
              onChange={(e) => experienceHandler(e, item.id)}
            />
            <span className="slider round"></span>
            <span className="title">{item.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ExperienceLevel;
