import DOMPurify from "dompurify";

const JobDescription = ({ description }) => {
    const cleanDescription = description
        ? DOMPurify.sanitize(description)
        : "No description available for this job.";

    return (
        <div className="job-detail" style={{listStyleType: "unset"}}>
            <h4>Job Description</h4>
            <div
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
        </div>
    );
};

export default JobDescription;
