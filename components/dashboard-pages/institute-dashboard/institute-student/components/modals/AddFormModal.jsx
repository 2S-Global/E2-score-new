import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import Select from "react-select";
import { FaBuildingShield } from "react-icons/fa6";
let YMD=(input)=>{
const date = new Date(input);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
}
let DMY=(input)=>{
const date = new Date(input);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${day}-${month}-${year}`;
}
const AddFormModal = ({
  show,
  onClose,
  data = {},
  setRefresh = () => {},
}) => {
   const [totalSemesters, setTotalSemesters] = useState(0);
   const [courseStructure, setCourseStructure] = useState();
    const [programData, setProgramData] = useState([]);
    const [programDataResp, setProgramDataResp] = useState([]);
    const [selectProgram, setSelectProgram] = useState([])
    const [editSemesterCount, setEditSemesterCount] = useState(data?.semesters?.length ||0)
  const [formData, setFormData] = useState({
    _id: data._id || "",
    name: data.name || "",
    USN: data.USN || "",
    program: data.program || "",
    gender: data.gender || "",
    dob: data?.dob?YMD(data.dob):data.dob || "",
    admissionYear: data.admissionYear || "",
    tenTh: data.tenTh || "",
    twelveTh: data.twelveTh || "",
  });
console.log('formData',formData)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
//validation error
  const [err, setErr] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [fields, setFields] = useState([]);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  if (!show) return null;
 const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const Semesters = Array.from({ length: totalSemesters }, (_, i) => 1 +i);
 // validation 
const validate = () => {
      let newErrors = {};
      if (!formData.name?.trim()) {
        newErrors.name = "Name is required";
      } 
       if (!formData.USN?.trim()) {
        newErrors.USN = "USN is required";
      } 
       if (!formData.program?.trim()) {
        newErrors.program = "Program is required";
      } 
       if (!formData.gender?.trim()) {
        newErrors.gender = "Gender is required";
      } 
       if (!formData.dob?.trim()) {
        newErrors.dob = "DOB is required";
      } 
       if (!formData.admissionYear?.trim()) {
        newErrors.admissionYear = "Admission Year is required";
      } 
       if (!formData.tenTh) {
        newErrors.tenTh = "10Th(%) is required";
      } 
       if (!formData.twelveTh) {
        newErrors.twelveTh = "12Th(%) is required";
      } 
     
      return newErrors;
};


// Add new field
  const addField = () => {
    let totalSem=totalSemesters||0;
    let fieldsLen=fields?.length||0;
    if(fieldsLen < totalSem ){
          setFields([...fields, { value: "" }]);
    }
    else{
      setErr((prev)=>({...prev,program:""}))
    }
  };

  //add all filed selected program
    useEffect(()=>{
/*    let totalSem=totalSemesters||0;
    let fieldsLen=fields?.length||0;
    let remaining=(totalSem-fieldsLen)==totalSem?totalSem:totalSem-fieldsLen
      if(remaining >0 ){
          for(let i=0;i<remaining;i++){
            setFields((fields)=>[...fields, { value: "" }]);
          }
        } */

        let totalSem=totalSemesters||0;
      if(totalSem >0 ){
          for(let i=0;i<totalSem;i++){
            setFields((fields)=>[...fields, { value: "" }]);
          }
        }

  },[totalSemesters])


  // Remove field
  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Handle Semester change
  const handleSemesterChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

 const handleProgramSelect = (selectedOptions) => {
    if(selectedOptions?.value){
        setErr((prev)=>({...prev,program:""}))
        setFormData((prev) => ({ ...prev, program: selectedOptions?.value }));
        const findData = programDataResp.find(u => u._id === selectedOptions?.value);
        setTotalSemesters(findData?.total_number_of_semesters||0)
        setCourseStructure(findData?.courseStructure||'')
        setFields([]);
    }
    else{
      setTotalSemesters(0)
    }
      setSelectProgram(selectedOptions);
  };


  // ------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------


    const handleChange = (e) => {
    const { name, value } = e.target;
      setErr((prev)=>({...prev,[name]:""}))
    let newValue = value;
   
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const token = localStorage.getItem("Institute_token");

  // ------------------------------
  // FORM SUBMIT
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const validationErrors = validate();
      setErr(validationErrors);
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    if (Object.keys(validationErrors).length === 0) {

    try {
      
    setLoading(true);
        const isUpdate = (formData._id)?true:false;
       /*  const url = isUpdate
          ? `${apiurl}/api/useradmin/update_user`
          : `${apiurl}/api/useradmin/add_user`; */
          const url =`${apiurl}/api/institutestudent/add-institute-student-manually`
       let semesters=[]
           fields.forEach((field, index) => {
                let sem=index+1
              if (field.value) {
                let newValue={[sem]:field?.value};
                semesters.push(newValue)
              }
            });
        let payload ={}
        //if(formData._id){
          let AddData={...formData};
          AddData.dob= DMY(formData.dob) 
           payload = {
                    ...AddData,
                    semesters,
                    ...(isUpdate ? {} : { role: 1 }),
                  };

       /*  }else{
             payload = {
                        ...formData,
                        semesters,
                        ...(isUpdate ? {} : { role: 1 }),
                      };
        } */
        

        ///const method = isUpdate ? "put" : "post";
        const method ="post";

        const response = await axios({
          method,
          url,
          data: payload,
          headers: { Authorization: `Bearer ${token}` },
        });

        // Backend does not return success: true
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.data?.message || "Operation failed");
        }

        setSuccess(response.data.message);
        setRefresh(()=>true);

        setTimeout(() => {
          onClose();
        }, 1500);
    } catch (err) {
        setError(
          err.response?.data?.message || "Request failed. Please try again."
        );
    } finally {
      setLoading(false);
    }
  }
  };

// course list
  
  useEffect(()=>{
     const fetchData = async () => {
              try {
                    const response = await axios.get( `${apiurl}/api/institute-course/course`,   {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                  
                  const responseData = response?.data?.data.map((item) => ({
                                      label: item?.type!=='custom'?item?.name+'('+item?.type+')':item?.name,
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

// edit selected course

  useEffect(()=>{
    if(data.program){
    let obj={
        label: data?.programDetails?.name+'('+data?.programDetails?.type+')',
        value: data?.programDetails?._id,
      }
      setSelectProgram(obj)
      //console.log('fields',fields,data?.semesters)
        /* if(editSemesterCount){
          let semestersData=[]
          for (let item of data?.semesters) {
             semestersData.push({value: item.marks})
          }

           setFields(semestersData)
           
        } */
          let semestersData=data?.semesters||[]
          console.log('semestersData',semestersData)
           const updatedData = fields.map((item,index) => {
                               const found = semestersData.find((element) => index+1 === element.semester);
                              
                               return found?{value:found.marks}:item
                              });
                              
                              if(updatedData?.length >0){
                                  setFields(updatedData)
                              }
          /*   if(editSemesterCount){
              let semestersData=[...fields]
              for (let item of data?.semesters) {
                //semestersData.push({value: item.marks})
               const updatedArr = semestersData.map((obj, index) =>
                  index === 1 ? { ...obj, status: "done" } : obj
                );
              }
                
              setFields(semestersData)
              
            } */
       
        setTotalSemesters(data?.programDetails?.total_number_of_semesters||0)
        setCourseStructure(data?.programDetails?.courseStructure||'')
    }
  },[data?.program,fields?.length])

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {formData._id ? "Update Student" : "Add New Student"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <MessageComponent error={error} success={success} />

              <div className="row">
                {/* Name */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                       err?.name ? "is-invalid" : ""
                    }`}
                    placeholder="Candidate Name"
                    value={formData?.name || ""}
                    onChange={handleChange}                   
                  />
                  { err?.name && (
                    <div style={{color:'red'}}>{err.name}</div>
                  )}
                </div>
                   {/* DOB */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">DOB</label>
                  <input
                    type="date"
                    max={new Date()?.toISOString().split('T')[0]}
                    name="dob"
                    className={`form-control ${
                       err?.dob ? "is-invalid" : ""
                    }`}
                    placeholder="DOB"
                    value={formData?.dob || ""}
                    onChange={handleChange}                   
                  />
                  { err?.dob && (
                    <div style={{color:'red'}}>{err.dob}</div>
                  )}
                </div>

                {/* gender */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Gender</label>
                   <select class="form-select"  name="gender"  onChange={handleChange}  value={formData.gender || ""}>
                    <option value="">Please select</option>
                     <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Other</option>
                  </select>
                  {err?.gender && (
                    <div style={{color:'red'}}>{err.gender}</div>
                  )}
                </div>

                {/* admission Year */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Admission Year</label>
                 
                   <select class="form-select"  name="admissionYear"  onChange={handleChange}  value={formData.admissionYear || ""}>
                   <option value="">Please select</option>
                        {years?.map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                  </select>
                  {err?.admissionYear && (
                    <div style={{color:'red'}}>{err.admissionYear}</div>
                  )}
                </div>
               

                {/* USN */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">USN</label>
                  <input
                    type="text"
                    name="USN"
                    className={`form-control ${
                       err?.USN ? "is-invalid" : ""
                    }`}
                    placeholder="USN"
                    value={formData?.USN || ""}
                    onChange={handleChange}
                  />
                  { err?.USN && (
                    <div style={{color:'red'}}>{err?.USN}</div>
                  )}
                </div>
                 {/* Program */}
                <div className="mb-3 col-md-6">
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
                 {/* 10th(%) */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">10Th(%)</label>
                  <input
                    type="number"
                    name="tenTh"
                    className={`form-control ${
                       err?.tenTh ? "is-invalid" : ""
                    }`}
                    placeholder="10Th(%)"
                    value={formData.tenTh || ""}
                    onChange={handleChange}
                   
                  />
                  { err?.tenTh && (
                    <div style={{color:'red'}}>{err.tenTh}</div>
                  )}
                </div>
                 {/* 12Th(%) */}
                <div className="mb-3 col-md-6">
                  <label className="form-label">12Th(%)</label>
                  <input
                    type="number"
                    name="twelveTh"
                    className={`form-control ${
                       err?.twelveTh ? "is-invalid" : ""
                    }`}
                    placeholder="12Th(%)"
                    value={formData.twelveTh || ""}
                    onChange={handleChange}
                   
                  />
                  { err?.twelveTh && (
                    <div style={{color:'red'}}>{err.twelveTh}</div>
                  )}
                </div>
                
                <h6 className="mb-3 border-bottom col-md-6">Semester Marks</h6>
                  <span
                  className="mb-3 border-bottom col-md-6"
                        onClick={addField}
                        style={{
                          cursor: "pointer",
                          color: "#5c1ecf",    
                          textAlign:"right"                     
                        }}
                      >
                       Add Semester
                      </span>
                              <div className="container">
                                      {fields.map((field, index) =>  {
                                      const isDisabled =
                                        index !== 0 && fields[index - 1]?.value === "";
                                       return (<div className="input-group mb-3" key={index}>
                                         <span className="pe-2">{courseStructure==='year'?'Year':'Semester'} {index+1} </span> 
                                          <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter value"
                                            value={field.value}
                                            onChange={(e) => handleSemesterChange(index, e)}
                                            disabled={isDisabled}
                                          />

                                          {( !(formData._id)) && <span
                                            className="btn btn-danger"
                                            style={{zIndex: 0}}
                                            onClick={() => removeField(index)}
                                          >
                                            Delete
                                          </span>}
                                        </div>)}
                                      )}

                                      
                              </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
                style={{
                  pointerEvents: loading  ? "none" : "auto",
                  opacity: loading  ? 0.5 : 1,
                }}
              >
                {loading ? (
                  <>{formData._id ? "Updating" : "Submiting"}</>
                ) : (
                  <>{formData._id ? "Update" : "Submit"}</>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFormModal;
