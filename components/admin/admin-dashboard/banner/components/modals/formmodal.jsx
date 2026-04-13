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
      banner_title: "",
      banner_image:"",
      id: "",
    });
  
     const [selectedImage, setSelectedImage] = useState(
        data?.banner_image?data.banner_image:null
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
    if (!formData.banner_title?.trim()) {
      newErrors.banner_title = "Banner title is required";
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
          banner_title: data?.banner_title || "",
          banner_image: data?.banner_image || "",
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
      sendformData.append("banner_title", formData.banner_title);
      

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
          `${apiurl}/api/home/update-banner`,
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
          `${apiurl}/api/home/add-banner`,
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
                   Banner Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="banner_title"
                    className="form-control"
                    value={formData.banner_title}
                    onChange={handleChange}
                  />
                   {err?.banner_title && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.banner_title}
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
