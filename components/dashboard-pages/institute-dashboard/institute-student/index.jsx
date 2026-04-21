import MobileMenu from "../../../header/AdminMobileMenu";
import DashboardHeader from "../../../header/InstituteDashboardHeader";
import DashboardInstituteSidebar from "../../../header/DashboardInstituteSidebar";

import CopyrightFooter from "../../CopyrightFooter";

import Table from "./components/table";

import CandidateformModal from "./components/modals/formmodal";
import AddFormModal from "./components/modals/AddFormModal";
import AddCsvModal from "./components/modals/csv";
import MarksCsv from "./components/modals/marksCsv";
import { useState } from "react";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isCsvModalOpenMarks, setIsCsvModalOpenMarks] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const openModalAdd = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalAdd = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openCsvModal = () => {
    setIsCsvModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalCsv = () => {
    setIsCsvModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const openCsvModalMarks = () => {
    setIsCsvModalOpenMarks(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalCsvMarks = () => {
    setIsCsvModalOpenMarks(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  return (
    <>
      <div className="page-wrapper dashboard ">
        <span className="header-span"></span>
        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        <DashboardInstituteSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <div className="row">
              <div className="col-lg-12">
                <div className="applicants-widget ls-widget">
                  <div
                    className="widget-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Student List</h4>

                    <div style={{ display: "flex", gap: "15px" }}>
                      <span
                        onClick={openModalAdd}
                        style={{
                          cursor: "pointer",
                          float: "right",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Student
                      </span>

       {/*                <span
                        onClick={openCsvModal}
                        style={{
                          cursor: "pointer",
                          color: "#13cfcf",
                          fontWeight: 500,
                          fontSize: "16px",
                        }}
                      >
                        Import Student (csv)
                      </span>
                       <span
                        onClick={openCsvModalMarks}
                        style={{
                          cursor: "pointer",
                          color: "#5c1ecf",
                          fontWeight: 500,
                          fontSize: "16px",
                        }}
                      >
                        Import Student Marks (csv)
                      </span> */}
                    </div>
                  </div>
                  <Table setRefresh={setRefresh} refresh={refresh} />
                </div>
              </div>
            </div>
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <AddFormModal
          show={isModalOpen}
          onClose={closeModalAdd}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}

      {isCsvModalOpen && (
        <AddCsvModal
          show={openCsvModal}
          onClose={closeModalCsv}
          setRefresh={setRefresh}
        />
      )}
        {isCsvModalOpenMarks && (
        <MarksCsv
          show={openCsvModalMarks}
          onClose={closeModalCsvMarks}
          setRefresh={setRefresh}
        />
      )}
    </>
    
  );
};

export default Index;
