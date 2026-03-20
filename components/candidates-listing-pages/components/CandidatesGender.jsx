"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCandidateGender } from "../../../features/filter/candidateFilterSlice";
const CandidatesGender = () => {
  const[genderdata,setGenderData]=useState([])
  const { candidateGender } =
    useSelector((state) => state.candidateFilter) || {};

  const dispath = useDispatch();

  // gender handler
  const genderHandler = (e) => {
    dispath(addCandidateGender(e.target.value));
  };

    const employerToken =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;


    useEffect(() => {
      const fetchGender = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/sql/dropdown/All_gender`,
            {
              headers: {
                Authorization: `Bearer ${employerToken}`,
              },
            },
          );
  
          if (res.data?.success) {
            setGenderData(res.data.data);
          } else {
            setGenderData([]);
          }
        } catch (error) {
          console.error("Error fetching candidates:", error);
          setGenderData([]);
        } 
      };
  
      if (employerToken) {
        fetchGender();
      }
    }, [employerToken]);

  return (
    <>
      <select
        className="form-select"
        value={candidateGender}
        onChange={genderHandler}
      >
        <option value='' key="none">None</option>
        {
          genderdata?.map((item)=>(
             <option value={item?.id} key={item.id}>{item?.name}</option>
          )

          )
        }
         
       
      
      </select>
      <span className="icon flaticon-briefcase"></span>
    </>
  );
};

export default CandidatesGender;
