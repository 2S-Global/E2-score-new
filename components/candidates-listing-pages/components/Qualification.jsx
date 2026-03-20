"use client";
import { useDispatch, useSelector } from "react-redux";
import { addQualification } from "../../../features/filter/candidateFilterSlice";
import axios from "axios";
import { useEffect, useState } from "react";
const Qualification = () => {
   const[qualificationData,setQualificationData]=useState([])
  const [selected, setSelected] = useState([]);
  const [handelChange, sethandelChange] = useState(0);
  const { qualifications } = useSelector((state) => state.candidateFilter) || {};
  const dispatch = useDispatch();


 const employerToken =
    typeof window !== "undefined"
      ? localStorage.getItem("employer_token")
      : null;

 useEffect(() => {
      const fetchQualification = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/userdata/get_user_level`,
            {
              headers: {
                Authorization: `Bearer ${employerToken}`,
              },
            },
          );
  
          if (res?.data?.data?.length >0) {
            setQualificationData(res.data.data);
          } else {
            setQualificationData([]);
          }
        } catch (error) {
          console.error("Error fetching candidates:", error);
          setQualificationData([]);
        } 
      };
  
      if (employerToken) {
        fetchQualification();
      }
    }, [employerToken]);

 

  useEffect(()=>{
    dispatch(addQualification(selected))
  },[handelChange])
  const handleChange = (e,id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
    sethandelChange(pre=>pre+1)
  };


  return (
    <ul className="switchbox">
      {qualificationData?.map((item) => (
        <li key={item.id}>
          <label className="switch">
            <input
              type="checkbox"
              checked={selected.includes(item.id) || false}
              value={item.level}
              onChange={(e) => handleChange(e, item.id)}
            />
            
            <span className="slider round"></span>
            <span className="title">{item.level}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Qualification;
