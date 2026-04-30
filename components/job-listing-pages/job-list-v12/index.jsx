"use client";
import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
// import DefaulHeader2 from "../../header/DefaulHeader2";
import DashboardHeader from "../../header/InstituteDashboardHeader";
import CopyrightFooter from "../../dashboard-pages/CopyrightFooter";
import MobileMenu from "../../header/InstituteMobileMenu";
import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";
import MapJobFinder from "../components/MapJobFinder";
import Select from "react-select";
import { useState } from "react";
import { useRouter } from "next/navigation";

const index = () => {
  const router = useRouter();

  const [programData, setProgramData] = useState([]);
  const [selectProgram, setSelectProgram] = useState(null);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const handleProgramSelect = (selectedOption) => {
    setSelectProgram(selectedOption);

    if (selectedOption?.totalSem) {
      const sems = Array.from({ length: selectedOption.totalSem }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
      }));
      setSemesterOptions(sems);
    } else {
      setSemesterOptions([]);
    }

    setSelectedSemester(null);
  };

  const handleSemesterSelect = (option) => {
    setSelectedSemester(option);
  };

  const resetFilters = () => {
    setSelectProgram(null);
    setSelectedSemester(null);
  };

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (filters.course) query.append("course", filters.course);
    if (selectedSemester) query.append("semester", selectedSemester.value);

    router.push(`/institute-dashboard/search-details?${query.toString()}`);
  };

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>
      <DashboardHeader />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Map --> */}

      <section className="ls-section">
        <div className="auto-container">
          <section className="ls-section pt-3 pb-3">
            <div className="">
              <div className="widget-content">
                <div className="table-wrapper">
                  <div className="accordion mb-3" id="filterAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#filterCollapse"
                        >
                          🔍 Filter Students
                        </button>
                      </h2>

                      <div
                        id="filterCollapse"
                        className="accordion-collapse collapse show"
                      >
                        <div className="accordion-body px-4 py-3">
                          <div className="row g-4">
                            {/* Program */}
                            <div className="col-md-6">
                              <label className="form-label">Program</label>
                              <Select
                                options={programData}
                                value={selectProgram}
                                onChange={handleProgramSelect}
                                placeholder="Please select"
                              />
                            </div>

                            {/* Semester */}
                            <div className="col-md-6">
                              <label className="form-label">Semester</label>
                              <Select
                                options={semesterOptions}
                                value={selectedSemester}
                                onChange={handleSemesterSelect}
                                placeholder="Select Semester"
                                isDisabled={!selectProgram}
                              />
                            </div>

                            {/* Buttons */}
                            <hr className="mt-4 mb-3" />

                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-outline-secondary px-4"
                                onClick={resetFilters}
                              >
                                Reset
                              </button>

                              <button
                                className="btn btn-primary px-4"
                                onClick={handleSearch}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>
            {/* End filter column for tablet and mobile devices */}

            <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12">
              <FilterSidebar />
            </div>
            {/* <!-- End Filters Column --> */}

            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="ls-outer">
                <FilterJobsBox />
                {/* <!-- ls Switcher --> */}
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <CopyrightFooter />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
