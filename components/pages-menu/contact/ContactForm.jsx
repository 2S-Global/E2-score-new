import { useState } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";

const ContactForm = ({ dispute = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    dispute: dispute,
  });
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [Submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessageId] = useState(null);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmiting(true);
    /* /api/contacts/add */
    // TODO: send data to backend / API here
    try {
      const response = await axios.post(`${apiurl}/api/contacts/add`, formData);
      console.log("Response:", response);
      if (response.data.success) {
        setSuccess(response.data.message || "Message sent successfully.");
        setMessageId(Date.now());
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong.please try again."
      );
      setErrorId(Date.now());
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />
      <div className="row">
        <div className="form-group col-lg-12 col-md-12 col-sm-12">
          <div className="response"></div>
        </div>

        {/* Name */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Name</label>
          <span className="text-danger ms-1">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Email</label>
          <span className="text-danger ms-1">*</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        {/* Subject */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Subject</label>
          <span className="text-danger ms-1">*</span>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject "
            required
          />
        </div>

        {/* Message */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Your Message</label>
          <span className="text-danger ms-1">*</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            required
            style={{
              width: "100%",
              minHeight: "120px", // initial height
              maxHeight: "300px", // restricts too big expansion
              overflowY: "auto", // adds scrollbar when needed
              resize: "vertical", // allows vertical resizing only
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            type="submit"
            id="submit"
            name="submit-form"
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2"
            disabled={Submiting}
            aria-busy={Submiting}
            aria-disabled={Submiting}
          >
            {Submiting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
