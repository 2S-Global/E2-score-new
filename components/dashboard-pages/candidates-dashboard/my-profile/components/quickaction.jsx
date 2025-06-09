const QuickActionSidebar = ({ menu, menuToggleHandler, activeSection }) => {
  const sections = [
    { label: "Head", targetId: "head-section" },
    { label: "Resume Headline", targetId: "resume-headline" },
    { label: "Profile Summary", targetId: "profile-summary" },
    { label: "Key Skills", targetId: "key-skill" },
    { label: "Personal Details", targetId: "personal" },
    { label: "Education", targetId: "academy" },
    { label: "Accomplishments", targetId: "acom" },
    { label: "Career Profile", targetId: "career" },
    { label: "Employment", targetId: "employment" },
    { label: "IT skills", targetId: "it-key" },
    { label: "Projects", targetId: "projects" },
    { label: "Resume", targetId: "resume-box" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust this value for your fixed header height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
        <div className="sidebar-inner">
          <h5>Quick Actions</h5>
          <ul className="navigation">
            {sections.map((section) => (
              <li
                key={section.targetId}
                className={`navItem ${
                  activeSection === section.targetId ? "active" : ""
                }`}
                onClick={() => {
                  scrollToSection(section.targetId);
                  if (menuToggleHandler) menuToggleHandler();
                }}
              >
                {section.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .navItem {
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          transition:
            background-color 0.3s ease,
            color 0.3s ease;
          display: flex;
          align-items: center;
          color: #333;
          font-weight: 500;
        }

        .navItem:hover {
          background-color: #f3f4f6;
        }

        .active {
          background-color: #7367f0;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default QuickActionSidebar;
