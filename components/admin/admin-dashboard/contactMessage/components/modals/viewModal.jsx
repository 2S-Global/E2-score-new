import React, { useState, useEffect} from "react";

const formModal = ({
  show,
  onClose,
  data = {},
  setRefresh = () => {},
}) => {
   
    const [formData, setFormData] = useState({
      subject: "",
      name: "",
      email: "",
      message: "",
    });
  
  
    useEffect(() => {
      if (data?._id) {
        setFormData({
          subject: data?.subject || "",
          name: data?.name || "",
          email: data?.email || "",
          message: data?.message || ""
        });
      }
    }, [data?._id]);
  
   
  
  
    
  
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
            <h5 className="modal-title">{data?._id?"Contact Message":""}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form >
          

              <div className="row">
                <div className="mb-3 col-md-12">
                  <label className="form-label">
                   Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.subject}
                   readOnly
                  />
                
                </div>

                <div className="mb-3 col-md-12">
                  <label className="form-label">
                   Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                   readOnly
                  />
                  
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label">
                  Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.email}
                   readOnly
                  />
                  
                </div>
              

                <div className="mb-3  col-md-12">
                      <label className="form-label">
                            Message  
                      </label>
                      <textarea
                        className="form-control"
                        value={formData.message}
                        style={{
                            height: '300px',
                            overflowY: 'auto',
                            resize: 'vertical'
                          }}
                      readOnly
                      />
                    
                </div>

                
              </div>
             
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
