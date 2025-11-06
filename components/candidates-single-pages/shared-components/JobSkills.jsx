const JobSkills = ({ skills = [] }) => {
  return (
    <ul className="job-skills">
      {skills.map((skill, i) => (
        <li key={i}>
          <a href="#">
            {skill?.trim().charAt(0).toUpperCase() + skill?.trim().slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;
