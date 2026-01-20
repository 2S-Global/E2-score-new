"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import candidatesData from "../../../../../data/candidates";
import styles from "./Applicants.module.css";

const ApplicantsContainer = () => {
  const searchParams = useSearchParams();
  const tableType = searchParams.get("type") || "all";

  /* ======================
     PAGE TITLE
  ====================== */
  const getPageTitle = () => {
    switch (tableType) {
      case "offer-letter":
        return "Offer Letter Sent";
      case "invitation":
        return "Invitation Sent";
      case "shortlisted":
        return "Shortlisted Candidates";
      default:
        return "Job Applicants";
    }
  };

  /* ======================
     ACTION BUTTONS
  ====================== */
  const getActionButtons = () => {
    switch (tableType) {
      case "offer-letter":
        return [
          { icon: "la la-eye", title: "View", variant: "primary" },
          { icon: "la la-check", title: "Accept", variant: "success" },
        ];
      case "invitation":
        return [
          { icon: "la la-eye", title: "View", variant: "primary" },
          { icon: "la la-check", title: "Accept", variant: "success" },
        ];
      case "shortlisted":
        return [
          { icon: "la la-eye", title: "View", variant: "primary" },
          {
            icon: "la la-paper-plane",
            title: "Send Invitation",
            variant: "info",
          },
        ];
      default:
        return [
          { icon: "la la-eye", title: "View", variant: "primary" },
          { icon: "la la-check", title: "Approve", variant: "success" },
        ];
    }
  };

  /* ======================
     TOP RIGHT LINKS CONFIG
  ====================== */
  const tableLinks = [
    {
      type: "all",
      label: "Job Applicants",
      icon: "la la-users",
      href: "/employers-dashboard/dashboard",
    },
    {
      type: "offer-letter",
      label: "Offer Letter Sent",
      icon: "la la-envelope",
      href: "/employers-dashboard/dashboard?type=offer-letter",
    },
    {
      type: "invitation",
      label: "Invitation Sent",
      icon: "la la-paper-plane",
      href: "/employers-dashboard/dashboard?type=invitation",
    },
    {
      type: "shortlisted",
      label: "Shortlisted Candidates",
      icon: "la la-user-check",
      href: "/employers-dashboard/dashboard?type=shortlisted",
    },
  ];

  return (
    <div className={styles.tabsBox}>
      {/* ================= HEADER ================= */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        <h4 className="mb-0">{getPageTitle()}</h4>

        <div className={styles.linksContainer}>
          {tableLinks
            .filter((link) => link.type !== tableType)
            .map((link) => (
              <Link
                key={link.type}
                href={link.href}
                className={styles.shortlistedLink}
              >
                <i className={`${link.icon} me-1`}></i>
                {link.label}
              </Link>
            ))}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-responsive">
        <table className={`table table-hover align-middle ${styles.table}`}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Candidate</th>
              <th style={{ width: "15%" }}>Designation</th>
              <th style={{ width: "12%" }}>Location</th>
              <th style={{ width: "12%" }}>Salary</th>
              <th style={{ width: "18%" }}>Skills</th>
              <th style={{ width: "15%" }}>
                Experience / Notice Period
              </th>
              <th style={{ width: "8%", textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {candidatesData.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <div className="d-flex flex-column align-items-center text-center gap-1">
                    <Image
                      src={candidate.avatar}
                      width={46}
                      height={46}
                      className="rounded-circle"
                      alt={candidate.name}
                    />
                    <Link
                      href={`/candidates-details/${candidate.id}`}
                      className={styles.candidateName}
                    >
                      {candidate.name}
                    </Link>
                  </div>
                </td>

                <td>{candidate.designation}</td>

                <td>
                  <i className="la la-map-marker me-1"></i>
                  {candidate.location}
                </td>

                <td>₹{candidate.monthlySalary} / month</td>

                <td>
                  <div className={styles.skillsWrap}>
                    {candidate.tags.map((tag, i) => (
                      <span key={i} className={styles.skillBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td>
                  {candidate.experience} / {candidate.noticePeriod}
                </td>

                <td>
                  <div className="d-flex justify-content-center gap-2">
                    {getActionButtons().map((btn, index) => (
                      <button
                        key={index}
                        className={`btn btn-outline-${btn.variant} btn-sm`}
                        title={btn.title}
                      >
                        <i className={btn.icon}></i>
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsContainer;
