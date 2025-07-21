import Link from "next/link";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";

const JobListingsTable = () => {
  return (
    <div className="tabs-box container-fluid px-0">
      <div className="widget-title d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">My Job Listings</h4>

        <div className="chosen-outer">
          <select className="form-select form-select-sm w-auto">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>

      {/* Responsive Table Section */}
      <div className="widget-content">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.slice(0, 4).map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Image
                        width={50}
                        height={49}
                        src={item.logo}
                        alt="logo"
                      />
                      <div>
                        <small className="mb-1">
                          <Link href={`/job-details/${item.id}`}>
                            {item.jobTitle}
                          </Link>
                        </small>
                        <br />
                        <small className="text-muted">
                          <i className="flaticon-briefcase me-1"></i> Segment
                          <br />
                          <i className="flaticon-map-locator me-1"></i> London,
                          UK
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <small>
                      <a href="#">3+ Applied</a>
                    </small>
                  </td>
                  <td>
                    <small>October 27, 2017</small> <br />
                    <small>April 25, 2011</small>
                  </td>
                  <td>
                    <span className="badge bg-success">Active</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        title="View"
                      >
                        <i className="la la-eye"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        title="Edit"
                      >
                        <i className="la la-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        title="Delete"
                      >
                        <i className="la la-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
