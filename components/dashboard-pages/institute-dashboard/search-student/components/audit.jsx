"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Search,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const AuditReport = ({ audit = [] }) => {
  const [showAudit, setShowAudit] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  if (!audit || audit.length === 0) return null;

  // ------------------------------------------------------
  // FILTER & SEARCH
  // ------------------------------------------------------
  const filteredAudit = audit.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;

    const q = searchText.toLowerCase();
    const matchesSearch =
      item.name?.toLowerCase().includes(q) ||
      item.row?.toString().includes(q);

    return matchesFilter && matchesSearch;
  });

  // ------------------------------------------------------
  // PAGINATION
  // ------------------------------------------------------
  const totalPages = Math.ceil(filteredAudit.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filteredAudit.slice(startIndex, startIndex + pageSize);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchText]);

  // ------------------------------------------------------
  // STATUS COLORS & BADGES
  // ------------------------------------------------------
  const statusConfig = {
    created: {
      badge: "success",
      label: "Created",
      icon: <CheckCircle2 size={16} className="text-success me-1" />,
      border: "#198754",
    },
    duplicate: {
      badge: "warning",
      label: "Duplicate",
      icon: <AlertTriangle size={16} className="text-warning me-1" />,
      border: "#ffc107",
    },
    invalid: {
      badge: "danger",
      label: "Invalid",
      icon: <XCircle size={16} className="text-danger me-1" />,
      border: "#dc3545",
    },
    default: {
      badge: "secondary",
      label: "Unknown",
      icon: null,
      border: "#6c757d",
    },
  };

  const getConfig = (status) => statusConfig[status] || statusConfig.default;

  // Stats
  const createdCount = audit.filter((x) => x.status === "created").length;
  const duplicateCount = audit.filter((x) => x.status === "duplicate").length;
  const invalidCount = audit.filter((x) => x.status === "invalid").length;

  return (
    <div className="mt-4 mb-5">
      {/* HEADER */}
      <div
        className="d-flex justify-content-between align-items-center px-2 py-2 rounded"
        style={{
          background: "#f5f8ff",
          border: "1px solid #dce6ff",
          cursor: "pointer",
        }}
        onClick={() => setShowAudit(!showAudit)}
      >
        <h6 className="mb-0 text-primary d-flex align-items-center">
          <ClipboardList size={18} className="me-2" /> Import Audit Report
        </h6>

        {showAudit ? (
          <ChevronUp size={22} className="text-primary" />
        ) : (
          <ChevronDown size={22} className="text-primary" />
        )}
      </div>

      {/* COLLAPSIBLE AREA */}
      <div
        style={{
          maxHeight: showAudit ? "420px" : "0px",
          overflowY: showAudit ? "auto" : "hidden",

          // FIXED BORDER (no shorthand)
          borderLeft: "1px solid #dee2e6",
          borderRight: "1px solid #dee2e6",
          borderBottom: showAudit ? "1px solid #dee2e6" : "none",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",

          transition: "all 0.3s ease",
        }}
      >
        {showAudit && (
          <div className="p-3">
            {/* STATS BAR */}
            <div className="mb-3 d-flex gap-3 flex-wrap">
              <span className="badge bg-success px-3 py-2">
                Created: {createdCount}
              </span>
             {/*  <span className="badge bg-warning text-dark px-3 py-2">
                Duplicates: {duplicateCount}
              </span> */}
              <span className="badge bg-danger px-3 py-2">
                Invalid: {invalidCount}
              </span>
            </div>

            {/* FILTER + SEARCH */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              {/* Filters */}
              <div className="btn-group">
                {["all", "created", "invalid"].map((key) => (
                  <button
                    key={key}
                    className={`btn btn-sm ${
                      filter === key ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setFilter(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ width: "240px" }}>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-light">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Name ,Row"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* AUDIT LIST */}
            <ul className="list-group">
              {pageItems.length === 0 && (
                <li className="list-group-item text-center text-muted py-4">
                  No matching records found.
                </li>
              )}

              {pageItems.map((item, index) => {
                const cfg = getConfig(item.status);

                return (
                  <li
                    key={index}
                    className="list-group-item"
                    style={{
                      borderLeft: `6px solid ${cfg.border}`,
                      transition: "0.2s",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong>Row {item.row}:</strong>{" "}
                        {item.name || "No Name"}
                        {item.errors?.length > 0 && (
                          <ul className="mt-2 mb-0 text-danger small ps-3">
                            {item.errors.map((err, idx) => (
                              <li key={idx}>{err}</li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="text-end">
                        {cfg.icon}
                        <span className={`badge bg-${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav className="mt-3">
                <ul className="pagination pagination-sm justify-content-center">
                  {/* Prev */}
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Prev
                    </button>
                  </li>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  {/* Next */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditReport;
