import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const formModal = ({
  show,
  onClose,
  data = {},
  setRefresh = () => {},
}) => {
   const router = useRouter();
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const [formData, setFormData] = useState({
      subject: "",
      customer_name: "",
      customer_designation: "",
      customer_image:"",
      description: "",
      linkedin_url:"",
      id: "",
    });
  
     const [selectedImage, setSelectedImage] = useState(
        data?.customer_image?data.customer_image:null
      );
     const [file, setFile] = useState(null);
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    //validation error
    const [err, setErr] = useState(null);
  
  
   // validation 
  const validate = () => {
    let newErrors = {};
    if (!formData.subject?.trim()) {
      newErrors.subject = "Subject is required";
    } 
    if (!formData.customer_name?.trim()) {
      newErrors.customer_name = "Customer name is required";
    } 
    if (!formData.customer_designation?.trim()) {
      newErrors.customer_designation = "Customer Designation is required";
    } 

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    } 

    if (!formData.linkedin_url?.trim()) {
      newErrors.linkedin_url = "Linkedin URL is required";
    }

    return newErrors;
  };

      // Handle file selection
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setFile(file);
        // Revoke object URL on component unmount to prevent memory leaks
        return () => URL.revokeObjectURL(imageUrl);
      }
    };
  
  
    useEffect(() => {
      if (data?._id) {
        setFormData({
          subject: data?.subject || "",
          customer_name: data?.customer_name || "",
          customer_designation: data?.customer_designation || "",
          description: data?.description || "",
          linkedin_url: data?.linkedin_url || "",
          customer_image: data?.customer_image || "",
          id: data?._id || "",
        });
      }
    }, [data?._id]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setErr((prev)=>({...prev,[name]:""}))
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
       const validationErrors = validate();
        setErr(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setErr(null);
      setError(null);
      setSuccess(null);
       const sendformData = new FormData();
       if (file){
          sendformData.append("image", file);
       }
      sendformData.append("subject", formData.subject);
      sendformData.append("customer_name", formData.customer_name);
      sendformData.append("customer_designation", formData.customer_designation);
      sendformData.append("description", formData.description);
      sendformData.append("linkedin_url", formData.linkedin_url);
      

      console.log('sendformData',sendformData)

      const token = localStorage.getItem("Super_token");
      if (!token) {
        setError("Token not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        if(data?._id){
          sendformData.append("id", formData.id);
          const response = await axios.post(
          `${apiurl}/api/testimonials/update-testimonial`,
          sendformData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccess(response.data.message)
        setRefresh(()=>true)
        onClose()
      }
      else{
      
        const response = await axios.post(
          `${apiurl}/api/testimonials/add-testimonial`,
          sendformData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccess(response.data.message)
        setRefresh(()=>true)
        onClose()
      }
       // window.location.reload();
        //router.push("/admin/testimonial");
      } catch (err) {
        setError(
          err.response?.data?.message || "Something went wrong. Try again."
        );
      } finally {
        setLoading(false);
      }
    }
       
      
    };
  
    if (!show) return null;

  // ------------------------------
  // UI
  // ------------------------------
  return (
     <div
      className="modal modal-lg fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{data?._id?"Edit Testimonial":"Add Testimonial"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <MessageComponent error={error} success={success} />

              <div className="row">
                <div className="mb-3 col-md-12">
                  <label className="form-label">
                   Subject<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                   {err?.subject && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.subject}
                        </div>
                      )}
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label">
                   Customer Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    className="form-control"
                    value={formData.customer_name}
                    onChange={handleChange}
                  />
                   {err?.customer_name && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.customer_name}
                        </div>
                      )}
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label">
                   Customer Designation<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="customer_designation"
                    className="form-control"
                    value={formData.customer_designation}
                    onChange={handleChange}
                  />
                   {err?.customer_designation && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.customer_designation}
                        </div>
                      )}
                </div>
              

                <div className="mb-3  col-md-12">
                      <label className="form-label">
                            Description  <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                      />
                      {err?.description && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.description}
                        </div>
                      )}
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label">
                   Linkedin URL<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="linkedin_url"
                    className="form-control"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                  />
                   {err?.linkedin_url && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.linkedin_url}
                        </div>
                      )}
                </div>

                <div className="mb-3 col-md-12">
                  <div className="d-flex">
                          {/* Upload Buttons */}
                          <span>
                            <label htmlFor="file-upload" className="btn btn-primary me-3">
                              Select Image
                            </label>
                            <input
                              id="file-upload"
                              type="file"
                              accept="image/png, image/jpeg, image/gif"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </span>
                          {/* Profile Image Preview */}
                          <span>
                            <div
                              className="overflow-hidden border"
                              style={{ width: "120px", height: "120px",display:"grid", alignItems:"center", justifyItems:"center"}}
                            >
                              {selectedImage && <img
                                src={selectedImage}
                                alt="Testimonial"
                                className="w-100 h-100 object-cover"
                              />}
                              {!selectedImage && "No Image"}
                            </div>
                          </span>
                      </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Updating..." : data?._id?"Update":"Save"}
               
              </button>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default formModal;
