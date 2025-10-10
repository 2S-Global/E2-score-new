const JobDescription = ({ description }) => {
    return (
        <div className="job-detail">
            <h4>Job Description</h4>
            <p style={{ textAlign: "justify" }}>
                {description
                    ? description
                    : "No description available for this job."}
            </p>
        </div>
    );
};

export default JobDescription;
