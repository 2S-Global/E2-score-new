"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
import { Download, Trash2 } from "lucide-react";

const ResumeBox = () => {
  const [loading, setLoading] = useState(false);
  const [transcriptFile, setTranscriptFile] = useState({
    name: "Demo Name",
  });
  const [uploadDate, setUploadDate] = useState("10/10/2023");
  const [resumeUrl, setResumeUrl] = useState(
    "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/06/06/SFTW/84076810007-2218051337.jpg?crop=3667,2750,x0,y0"
  );
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchResume = useCallback(async () => {
    try {
      return;
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/resume`
      );
      const { fileUrl, fileName, uploadedAt } = response.data;

      if (fileUrl && fileName) {
        setTranscriptFile({ name: fileName });
        setResumeUrl(fileUrl);
        setUploadDate(
          new Date(uploadedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        );
      }
    } catch (err) {
      console.error("Failed to fetch resume:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    return;

    setTranscriptFile(file);
    setUploadDate(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    );

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setMessage(null);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({ type: "success", text: "Resume uploaded successfully!" });
      setResumeUrl(response.data.fileUrl); // assume backend returns the new file URL
      console.log("Uploaded file response:", response.data);
    } catch (error) {
      setMessage({ type: "error", text: "Upload failed. Please try again." });
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const UploadButton = ({
    label,
    id,
    file,
    onChange,
    accept,
    width = "340px",
  }) => (
    <div className="form-group">
      <div className="uploadButton">
        <input
          className="uploadButton-input"
          type="file"
          id={id}
          accept={accept}
          onChange={onChange}
          ref={fileInputRef}
          required
        />
        <label
          className="uploadButton-button ripple-effect"
          style={{ width }}
          htmlFor={id}
        >
          {file ? file.name : `Browse ${label}..`}
        </label>
      </div>
    </div>
  );

  const handleDelete = useCallback(() => {
    setTranscriptFile(null);
    setUploadDate(null);
    setResumeUrl(null);
    setMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Resume</h4>
        </div>

        {loading ? (
          <CustomizedProgressBars />
        ) : (
          <div className="widget-content">
            {message && (
              <MessageComponent type={message.type} text={message.text} />
            )}

            {transcriptFile && (
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="resume-file fw-semibold mb-1">
                    {transcriptFile.name}
                  </p>
                  {uploadDate && (
                    <p className="upload-date text-muted">
                      Uploaded on {uploadDate}
                    </p>
                  )}
                </div>
                <div className="col-md-6 d-flex gap-3 justify-content-md-end mt-3 mt-md-0">
                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success btn-sm d-flex align-items-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  )}
                  <button
                    onClick={handleDelete}
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            )}

            <div
              className="upload-wrapper d-flex justify-content-center mt-4"
              style={{ width: "100%" }}
            >
              <UploadButton
                label="Upload Resume"
                id="resume"
                file={transcriptFile}
                onChange={handleFileChange}
                accept="image/*, .pdf"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBox;
