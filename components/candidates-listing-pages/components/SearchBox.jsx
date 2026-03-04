"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/candidateFilterSlice";

const SearchBox = () => {
  const { keyword } = useSelector((state) => state.candidateFilter);
  const [getKeyword, setKeyword] = useState(keyword || "");
  const dispatch = useDispatch();

  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    dispatch(addKeyword(getKeyword));
  }, [getKeyword, dispatch]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="Search by name, email or phone"
        onChange={keywordHandler}
        value={getKeyword}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
