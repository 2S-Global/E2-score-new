import React from "react";

const EmployeeInfoCard = ({ user }) => {

    const VerifyIcon = ({ status }) => {
      // 🔴 Case 1: Not worked → always red cross
      if (user.workedHere === false || user.workedInCompany === false) {
        return <span style={styles.red}>✖</span>;
      }

      // 🟢 Verified
      if (status === true) {
        return <span style={styles.green}>✔</span>;
      }

      // 🟠 Pending
      return <span style={styles.orange}>⏳</span>;
    };
  return (
    <div
      className="card border shadow-sm mb-4"
      style={{ width: "100%", margin: "0 auto", height: "auto" }}
    >
      <div className="card-body p-3">
        <h5 className="card-title mb-3">Employment Information</h5>
        <div className="row g-2">
          <div className="col-sm-6">
            <strong>Designation:</strong> {user.designation}
            <VerifyIcon status={user.designation_verified} />
          </div>

          <div className="col-sm-6">
            <strong>Employment Type:</strong>{" "}
            {user.employmenttype
              ? user.employmenttype.charAt(0).toUpperCase() +
                user.employmenttype.slice(1)
              : ""}
            <VerifyIcon status={user.employmenttype_verified} />
          </div>

          <div className="col-sm-6">
            <strong>Joining Date:</strong> {user.joiningdate}
            <VerifyIcon status={user.duration_verified} />
          </div>

          {/* Leaving Date */}
          <div className="col-sm-6">
            <strong>Leave Date:</strong> {user.leavedate}
            <VerifyIcon status={user.duration_verified} />
          </div>

          <div className="col-sm-6">
            <strong>Currently Employed:</strong>{" "}
            {user.currentlyemployed ? (
              <span className="badge bg-success">Yes</span>
            ) : (
              <span className="badge bg-secondary">No</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  green: {
    color: "white",
    backgroundColor: "green",
    borderRadius: "50%",
    padding: "2px 6px",
    marginLeft: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  orange: {
    color: "white",
    backgroundColor: "orange",
    borderRadius: "50%",
    padding: "2px 6px",
    marginLeft: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  red: {
    color: "white",
    backgroundColor: "red",
    borderRadius: "50%",
    padding: "2px 6px",
    marginLeft: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },
};
export default EmployeeInfoCard;
