import Link from "next/link";
import Image from "next/image";
import candidatesData from "../../../../../data/candidates";
import styles from "./Applicants.module.css";

const Applicants = () => {
  return (
    <div className={styles.tabsBox}>
      {/* HEADER */}
      <div
        className={`d-flex justify-content-between align-items-center mb-4 ${styles.widgetTitle}`}
      >
        <h4 className="mb-0">Job Applicants</h4>

        <div className={styles.linksContainer}>
          <Link href="/offer-letter-sent" className={styles.shortlistedLink}>
            <i className="la la-envelope me-1"></i>
            Offer Letter Sent
          </Link>

          <Link href="/invitation-sent" className={styles.shortlistedLink}>
            <i className="la la-envelope me-1"></i>
            Invitation Sent
          </Link>

          <Link href="/shortlisted-candidates" className={styles.shortlistedLink}>
            <i className="la la-user-check me-1"></i>
            Shortlisted Candidates
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className={`table table-hover align-middle ${styles.table}`}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Candidate</th>
              <th style={{ width: "15%" }}>Designation</th>
              <th style={{ width: "12%" }}>Location</th>
              <th style={{ width: "12%" }}>Salary</th>
              <th style={{ width: "18%" }}>Skills</th>
              <th style={{ width: "15%" }}>Experience / Notice Period</th>
              <th style={{ width: "8%", textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {candidatesData.slice(0, 10).map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  {/* <div className="d-flex align-items-center gap-3"> */}
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

                <td>
                  ₹{candidate.monthlySalary} /
                  month
                </td>

                <td>
                  <div className={styles.skillsWrap}>
                    {candidate.tags.map((tag, i) => (
                      <span key={i} className={styles.skillBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td>{candidate.experience} / {candidate.noticePeriod}</td>

                <td>
                  <div
                    className={`d-flex justify-content-center gap-2 ${styles.actionBtns}`}
                  >
                    <button
                      className="btn btn-outline-primary btn-sm"
                      title="View"
                    >
                      <i className="la la-eye"></i>
                    </button>

                    <button
                      className="btn btn-outline-success btn-sm"
                      title="Approve"
                    >
                      <i className="la la-check"></i>
                    </button>

                    {/* <button
                      className="btn btn-outline-danger btn-sm"
                      title="Reject"
                    >
                      <i className="la la-times-circle"></i>
                    </button>

                    <button
                      className="btn btn-outline-dark btn-sm"
                      title="Delete"
                    >
                      <i className="la la-trash"></i>
                    </button> */}
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

export default Applicants;
