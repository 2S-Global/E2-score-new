const JobOverView = ({ overview }) => {

  const { createdAgo, expiredAt, jobLocationType, location, advertiseCityName, title, salary } = overview || {};

  return (
    <div className="widget-content">
      <ul className="job-overview">
        {createdAgo && (
          <li>
            <i className="icon icon-calendar"></i>
            <h5>Date Posted:</h5>
            <span>Posted {createdAgo}</span>
          </li>
        )}
        {expiredAt && (
          <li>
            <i className="icon icon-expiry"></i>
            <h5>Expiration date:</h5>
            <span>{expiredAt}</span>
          </li>
        )}
        {location && (
          <li>
            <i className="icon icon-location"></i>
            <h5>Location:</h5>
            <span>{jobLocationType === "remote"
              ? advertiseCityName
                ? `Remote - ${advertiseCityName}`
                : "Remote"
              : jobLocationType === "on-site"
                ? location || "N/A"
                : location || "N/A"}</span>
          </li>
        )}
        {title && (
          <li>
            <i className="icon icon-user-2"></i>
            <h5>Job Title:</h5>
            <span>{title}</span>
          </li>
        )}
        <li>
          <i className="icon icon-clock"></i>
          <h5>Hours:</h5>
          <span>50h / week</span>
        </li>
        <li>
          <i className="icon icon-rate"></i>
          <h5>Rate:</h5>
          <span>$15 - $25 / hour</span>
        </li>
        {salary && (
          <li>
            <i className="icon icon-salary"></i>
            <h5>Salary:</h5>
            {/* <span>$35k - $45k</span> */}
            <span>{salary ? (
              (() => {
                const { structure, currency, min, max, amount, rate } = salary;

                switch (structure) {
                  case "range":
                    if (currency && min != null && max != null && rate) {
                      return (
                        <>
                          {currency}
                          {min.toLocaleString("en-IN", { maximumFractionDigits: 2 })} -{" "}
                          {currency}
                          {max.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {rate}
                        </>
                      );
                    }
                    return <span>Incomplete salary data</span>;

                  case "starting amount":
                    if (currency && amount != null && rate) {
                      return (
                        <>
                          From {currency}
                          {amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {rate}
                        </>
                      );
                    }
                    return <span>Incomplete salary data</span>;

                  case "maximum amount":
                    if (currency && amount != null && rate) {
                      return (
                        <>
                          Up to {currency}
                          {amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {rate}
                        </>
                      );
                    }
                    return <span>Incomplete salary data</span>;

                  case "exact amount":
                    if (currency && amount != null && rate) {
                      return (
                        <>
                          {currency}
                          {amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {rate}
                        </>
                      );
                    }
                    return <span>Incomplete salary data</span>;

                  default:
                    return <span>Salary data not available</span>;
                }
              })()
            ) : (
              <span>Salary not specified</span>
            )}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default JobOverView;
