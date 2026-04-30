'use client'
import React from 'react'

const ViewModal = ({ show, onClose, data = {} }) => {
  if (!show) return null

  const toTitleCase = (str) => {
    if (!str) return '-'
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              <b>Company Details</b>
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body text-">
            {/* ================= Company Information ================= */}

            <div className="row g-3 mb-3">
              <div className="col-md-3">
                <b>
                  <span class="icon">🏢</span>Company Name:
                </b>
              </div>
              <div className="col-md-9">{toTitleCase(data.name)}</div>

              <div className="col-md-3">
                <b>
                  <span class="icon">📧</span>Email:
                </b>
              </div>
              <div className="col-md-9">{data.email}</div>
              <div className="col-md-3">
                <b>
                  <span class="icon">👤</span> Contact Person:
                </b>
              </div>
              <div className="col-md-9">{toTitleCase(data.contactPerson)}</div>
              <div className="col-md-3">
                <b>
                  <span class="icon">📞</span> Phone:
                </b>
              </div>
              <div className="col-md-9">{data.phone}</div>
              <div className="col-md-3">
                <b>
                  <span class="icon">📍</span>Address:
                </b>
              </div>
              <div className="col-md-9">{data.address}</div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewModal
