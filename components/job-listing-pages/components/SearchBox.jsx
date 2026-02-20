"use client";

import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/filterSlice";

const SearchBox = () => {
  const { jobList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const keywordHandler = (e) => {
    dispatch(addKeyword(e.target.value));
  };

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="Job title, keywords, or company"
        value={jobList.keyword} // 👈 Directly from Redux
        onChange={keywordHandler}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
