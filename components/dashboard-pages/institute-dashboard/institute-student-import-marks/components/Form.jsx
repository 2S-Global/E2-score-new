"use client";
import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import Select from "react-select";
import AuditReport from "./audit";
import "../institue.css"
const Form = () => {
 const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalSemesters, setTotalSemesters] = useState(0);
  const [programData, setProgramData] = useState([]);
  const [programDataResp, setProgramDataResp] = useState([]);
  const [selectProgram, setSelectProgram] = useState([])
  const [formData, setFormData] = useState({
      semester: "",
      program: "",
      semesterYear: "",
      semesterMonth: "",
      admissionYear: "",
    });
  const [err, setErr] = useState(null);
  const [audit, setAudit] = useState([]);

  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const Semesters = Array.from({ length: totalSemesters }, (_, i) => 1 +i);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const marksTypes = ["DGPA", "CGPA"];



  const handleChange = (e) => {
    const { name, value } = e.target;
      setErr((prev)=>({...prev,[name]:""}))
    let newValue = value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleProgramSelect = (selectedOptions) => {
    if(selectedOptions?.value){
        setErr((prev)=>({...prev,program:""}))
        setFormData((prev) => ({ ...prev, program: selectedOptions?.value }));
        const findData = programDataResp.find(u => u._id === selectedOptions?.value);
        setTotalSemesters(findData?.total_number_of_semesters||0)
    }
    else{
      setTotalSemesters(0)
    }
      setSelectProgram(selectedOptions);
  };

   // validation 
const validate = () => {
      let newErrors = {};
      if (!formData.semester?.trim()) {
        newErrors.semester = "Semester is required";
      } 
       if (!formData.program?.trim()) {
        newErrors.program = "Program is required";
      } 
     /*   if (!formData.semesterYear?.trim()) {
        newErrors.semesterYear = "Semester year is required";
      }  */
       if (!formData.admissionYear?.trim()) {
        newErrors.admissionYear = "Admission year is required";
      } 
      /* if (formData.admissionYear?.trim()>formData.semesterYear) {
        newErrors.admissionYear = "Invalid admission year";
      } */ 
      /* if (!formData.semesterMonth?.trim()) {
        newErrors.semesterMonth = "Semester month is required";
      } 
      if (!formData.marksType?.trim()) {
        newErrors.marksType = "Grading system is required";
      }  */
      return newErrors;
};

//admission year
/* const errorAdmissionYear=()=>{
  if (formData.semesterYear && formData.admissionYear && formData.admissionYear?.trim()>formData.semesterYear) {
        setErr((prev)=>({...prev,admissionYear:"Invalid admission year"}))
      }
      else{
         setErr((prev)=>({...prev,admissionYear:""}))
      }
} */

  // ------------------------------
  // HANDLE FILE SELECTION
  // ------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      setErrorId(Date.now());
      setCsvFile(null);
      return;
    }
    // Check extension
    const extension = file.name.split(".").pop().toLowerCase();
    if (extension !== "csv") {
      setError("Only csv files are allowed.");
      setErrorId(Date.now());
      setCsvFile(null);
      return;
    }

    setError(null);
    setCsvFile(file);
  };

      const token =
      typeof window !== "undefined"
        ? localStorage.getItem("Institute_token")
        : null;
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }


  // ------------------------------
  // SUBMIT CSV IMPORT
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErr(validationErrors);   
    console.log(err);
if (Object.keys(validationErrors).length === 0) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formPayload = new FormData();
    formPayload.append("role", 1);
    formPayload.append("csv", csvFile);
    formPayload.append("program", formData.program);
    formPayload.append("semesterYear", formData.semesterYear);
    formPayload.append("semesterMonth", formData.semesterMonth);
    formPayload.append("marksType", formData.marksType);
    formPayload.append("admissionYear", formData.admissionYear);
    formPayload.append("semester", formData.semester);
    try {
      const response = await axios.post(
        `${apiurl}/api/institutestudent/import-candidates-marks`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.success) throw new Error(response.data.message);

      setSuccess(response.data.message);
      setMessage_id(Date.now());

     /*  if (response.data.total === response.data.created) {
        setTimeout(() => {
          setRefresh(true);
        }, 1000);
      } else if (response.data.audit) {
        setAudit(response.data.audit);
      } */
      setTimeout(() => {
          setRefresh(true);
        }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Import failed. Try again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  }
  };

  //fetch program list

  useEffect(()=>{
  
     const fetchData = async () => {
              try {
                const response = await axios.get( `${apiurl}/api/institute-course/course`,   {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
               
              const responseData = response?.data?.data.map((item) => ({
                                  label: item?.name+'('+item?.type+')',
                                  value: item?._id,
                                }));
                 setProgramData(responseData ||[])
                 setProgramDataResp(response?.data?.data||[])
              } catch (error) {
                console.error(error);
              }
            };
     
           
        fetchData()
  },[])


  // ================= UI =================
  return (
    <>
    
         <form onSubmit={handleSubmit}>
              <MessageComponent
                error={error}
                success={success}
                errorId={errorId}
                message_id={message_id}
              />
              <div  className="row">
                 <div className="mb-3 col-md-4">
                  <label className="form-label">Program</label>
                  <Select
                    options={programData}
                    value={selectProgram}
                    onChange={handleProgramSelect}
                    placeholder="Please select"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  { err?.program && (
                    <div style={{color:'red'}}>{err.program}</div>
                  )}
                 </div>
                 <div className="mb-3 col-md-4">
                  <label className="form-label">Admission Year</label>
                  
                  <select className="form-select"  name="admissionYear"  onChange={(e)=>{handleChange(e)}}   value={formData.admissionYear || ""}>
                    <option value="">Please select</option>
                        {years?.map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                  </select>               
                   { err?.admissionYear && (
                    <div style={{color:'red'}}>{err.admissionYear}</div>
                  )}
                </div>
                  <div className="mb-3 col-md-4">
                  <label className="form-label">Semester</label>
                  <select class="form-select"  name="semester"  onChange={handleChange}  value={formData.semester || ""}>
                    <option value="">Please select</option>
                     {Semesters?.map((sem) => (
                          <option key={sem}>{sem}</option>
                        ))}
                  </select>                 
                   { err?.semester && (
                    <div style={{color:'red'}}>{err.semester}</div>
                  )}
                </div>
               {/*   <div className="mb-3 col-md-4">
                  <label className="form-label">Semester Year</label>
                  
                  <select class="form-select"  name="semesterYear"  onChange={handleChange}  value={formData.semesterYear || ""}>
                    <option value="">Please select</option>
                        {years?.map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                  </select>               
                   { err?.semesterYear && (
                    <div style={{color:'red'}}>{err.semesterYear}</div>
                  )}
                 </div> */}
               {/*  <div className="mb-3 col-md-4">
                  <label className="form-label">Semester Month</label>
                  <select class="form-select"  name="semesterMonth"  onChange={handleChange}  value={formData.semesterMonth || ""}>
                    <option value="">Please select</option>
                     {months?.map((item,i) => (
                          <option key={item}>{item}</option>
                        ))}
                  </select>                 
                   { err?.semesterMonth && (
                    <div style={{color:'red'}}>{err.semesterMonth}</div>
                  )}
                </div> */}
               {/*  <div className="mb-3 col-md-4">
                  <label className="form-label">Grading System</label>
                  <select class="form-select"  name="marksType"  onChange={handleChange}  value={formData.marksType || ""}>
                    <option value="">Please select</option>
                     {marksTypes?.map((item,i) => (
                          <option key={item}>{item}</option>
                        ))}
                  </select>                 
                   { err?.marksType && (
                    <div style={{color:'red'}}>{err.marksType}</div>
                  )}
                </div> */}
                <div className="mb-3 col-md-12">
                  <label className="form-label">Upload Csv</label>
                  <input
                    type="file"
                    accept=".csv"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    onChange={handleFileChange}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
                 <div className="mb-3 col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary float-end"
                      disabled={loading || !csvFile}
                    >
                      {loading ? "Importing..." : "Import"}
                    </button>
                  </div>
              </div>
             
            </form>
    </>
  );
};

export default Form;
