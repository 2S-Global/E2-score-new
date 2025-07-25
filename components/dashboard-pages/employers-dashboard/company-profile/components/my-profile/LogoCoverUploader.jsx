"use client";

import { useState, useEffect } from "react";

const LogoCoverUploader = ({ formdata, setFormdata }) => {
  const [logoImg, setLogoImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  // Preview URLs
  const [logoPreview, setLogoPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  // Generate preview when logo changes
  useEffect(() => {
    if (logoImg) {
      const previewUrl = URL.createObjectURL(logoImg);
      setLogoPreview(previewUrl);
      setFormdata((prev) => ({ ...prev, logo: logoImg }));
    }
  }, [logoImg]);

  // Generate preview when cover changes
  useEffect(() => {
    if (coverImg) {
      const previewUrl = URL.createObjectURL(coverImg);
      setCoverPreview(previewUrl);
      setFormdata((prev) => ({ ...prev, cover: coverImg }));
    }
  }, [coverImg]);

  const removeLogo = () => {
    setLogoImg(null);
    setLogoPreview("");
    setFormdata((prev) => ({ ...prev, logo: null }));
  };

  const removeCover = () => {
    setCoverImg(null);
    setCoverPreview("");
    setFormdata((prev) => ({ ...prev, cover: null }));
  };

  return (
    <>
      {/* Logo Upload */}
      <div className="uploading-outer mb-4">
        <div className="uploadButton mb-2 mx-4">
          <input
            className="uploadButton-input"
            type="file"
            accept="image/*"
            id="upload_logo"
            onChange={(e) => e.target.files[0] && setLogoImg(e.target.files[0])}
          />
          <label
            className="uploadButton-button ripple-effect"
            htmlFor="upload_logo"
          >
            {logoImg ? logoImg.name : "Browse Logo"}
          </label>
        </div>

        {logoPreview && (
          <div className="mb-3">
            <div className="position-relative d-inline-block">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="img-thumbnail"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={removeLogo}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="text text-muted small">Format: .jpg, .png</div>
      </div>

      {/* Cover Upload */}
      <div className="uploading-outer mb-4">
        <div className="uploadButton mb-2 mx-4">
          <input
            className="uploadButton-input"
            type="file"
            accept="image/*"
            id="upload_cover"
            onChange={(e) =>
              e.target.files[0] && setCoverImg(e.target.files[0])
            }
          />
          <label
            className="uploadButton-button ripple-effect"
            htmlFor="upload_cover"
          >
            {coverImg ? coverImg.name : "Browse Cover"}
          </label>
        </div>

        {coverPreview && (
          <div className="mb-3">
            <div className="position-relative d-inline-block">
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="img-thumbnail"
                style={{ maxWidth: "300px", maxHeight: "100px" }}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={removeCover}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="text text-muted small"> Format: .jpg, .png</div>
      </div>
    </>
  );
};

export default LogoCoverUploader;
