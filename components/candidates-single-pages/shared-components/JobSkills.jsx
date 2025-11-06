const JobSkills = ({ skills = [] }) => {
  return (
    <ul className="job-skills">
      {skills.map((skill, i) => (
        <li key={i} className="m-1">
          {skill?.trim().charAt(0).toUpperCase() + skill?.trim().slice(1)}
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;
