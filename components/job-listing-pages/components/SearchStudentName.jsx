"use client";

import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/filterInstitute";

const SearchBox = () => {
  const dispatch = useDispatch();

  const studentList = useSelector(
    (state) => state.filterInstitute?.studentList || { keyword: "" },
  );

  const keywordHandler = (e) => {
    dispatch(addKeyword(e.target.value));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by Student Name"
        value={studentList.keyword}
        onChange={keywordHandler}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
