import React, { useState } from "react";

const Profilepic = ({ show, onClose, imageSrc }) => {
  const [selectedImage, setSelectedImage] = useState(imageSrc || "/default-profile.png");
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFile(file);
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Upload a recent photo</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <p className="text-muted">
                Photo enhances memorability and helps you demonstrate professionalism.
              </p>

              {/* Profile Image Preview */}
              <div className="d-flex justify-content-center">
                <div
                  className="rounded-circle overflow-hidden border"
                  style={{ width: "120px", height: "120px" }}
                >
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="w-100 h-100 object-cover"
                  />
                </div>
              </div>

              {/* Upload & Delete Buttons */}
              <div className="d-flex justify-content-center mt-3">
                <label htmlFor="file-upload" className="btn btn-primary me-3">
                  Change Photo
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setSelectedImage("/images/resource/default-profile.png");
                    setFile(null);
                  }}
                >
                  Delete Photo
                </button>
              </div>

              {/* Submit Button (Only Show If Image is Selected) */}
              {file && (
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-success" onClick={onClose}>Submit</button>
                </div>
              )}

              <p className="text-muted mt-2" style={{ fontSize: "12px" }}>
                Supported file formats: PNG, JPG, JPEG, GIF - up to 2MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepic;
