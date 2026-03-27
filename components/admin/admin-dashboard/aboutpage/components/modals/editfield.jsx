import React, { useState, useEffect , useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const EditModal = ({ show, onClose, field }) => {
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image:"",
    id: "",
  });

   const [selectedImage, setSelectedImage] = useState(
      field.image?field.image:"/images/resource/no_user.png"
    );
   const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  //validation error
  const [err, setErr] = useState(null);


const titleRef = useRef();
const descriptionRef = useRef();
const imageRef = useRef();

const refs = {
    title: titleRef,
    description: descriptionRef,
    image: imageRef}

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
    if (field) {
      setFormData({
        title: field?.title || "",
        description: field?.description || "",
        image: field?.image || "",
        id: field?._id || "",
      });
    }
  }, [field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      //start validation
      if (!formData.title?.trim()) {
            setErr({ title: "Title is required" });
            const ref = refs.title;
            if (ref?.current) {
              try {
                ref.current.focus?.();
              } catch (err) {
                console.warn("Focus failed title", err);
              }
            }
            return;
          }

        if (
          !formData.description ||
          formData.description.trim() === "" ||
          formData.description === "<p><br></p>"||
          formData.description === "<p> </p>"
          ) {
            setErr({ description: "description is required" });

            const ref = refs.description;
            if (ref && ref.current) {
              try {
                ref.current.focus();
              } catch (e) {
                console.warn("ReactQuill focus failed");
              }
            }

            return;
          }
      //end validation
    setLoading(true);
    setErr(null);
    setError(null);
    setSuccess(null);
     const sendformData = new FormData();
     if (file){
        sendformData.append("image", file);
     }
    sendformData.append("title", formData.title);
    sendformData.append("description", formData.description);
    sendformData.append("id", formData.id);
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }
    try {
    const response = await axios.post(
        `${apiurl}/api/about/updateAbout`,
        sendformData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(response.data.message);
      window.location.reload();
      router.push("/admin/listcompany");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

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
            <h5 className="modal-title">Edit About Page</h5>
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
                   Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    ref={titleRef}
                  />
                   {err?.title && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {err.title}
                        </div>
                      )}
                </div>
              

                <div className="mb-3  col-md-12">
                      <label className="form-label">
                            Description  <span style={{ color: "red" }}>*</span>
                      </label>
                      <ReactQuill
                        id="description"
                        name="description"
                        theme="snow"
                        value={formData.description}
                        onChange={(content) =>
                          setFormData((prev) => ({ ...prev, description: content }))
                        }
                        ref={descriptionRef}
                        placeholder="Write detailed  description here..."
                        className="form-group"
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ color: [] }, { background: [] }],
                            [{ script: "sub" }, { script: "super" }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ indent: "-1" }, { indent: "+1" }],
                            [{ align: [] }],
                            ["blockquote", "code-block"],
                            ["link", "image", "video"],
                            ["clean"],
                          ],
                        }}
                        formats={[
                          "header",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "color",
                          "background",
                          "script",
                          "list", // includes ordered + bullet
                          "indent",
                          "align",
                          "blockquote",
                          "code-block",
                          "link",
                          "image",
                          "video",
                        ]}
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
                              style={{ width: "120px", height: "120px" }}
                            >
                              <img
                                src={selectedImage}
                                alt="AboutImage"
                                className="w-100 h-100 object-cover"
                              />
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
                {loading ? "Updating..." : "Update"}
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

export default EditModal;
