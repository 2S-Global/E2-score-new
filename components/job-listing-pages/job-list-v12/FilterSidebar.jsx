import CallToActions from "../components/CallToActions";
import Categories from "../components/Categories";
import DatePosted from "../components/DatePosted";
import DestinationRangeSlider from "../components/DestinationRangeSlider";
import ExperienceLevel from "../components/ExperienceLevel";
import Admission from "../components/Admission";
import MarksRange from "../components/MarksRange";
import ExcludeBox from "../components/ExcludeBox";
import JobType from "../components/JobType";
import Program from "../components/Program";
import LocationBox from "../components/LocationBox";
import Gender from "../components/Gender";
import SalaryRangeSlider from "../components/SalaryRangeSlider";
import SearchBox from "../components/SearchStudentName";
import Tag from "../components/Tag";

const FilterSidebar = () => {
  return (
    <div className="inner-column">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        {/* End .close filter */}

        <div className="filter-block">
          <h4>Search Student (Name )</h4>
          <div className="form-group">
            <SearchBox />
          </div>
        </div>
        {/* <!-- Filter Block --> */}

        <div className="switchbox-outer">
          <h4>Gender</h4>
          <Gender />
        </div>
        {/* <!-- Filter Block --> */}

        {/* <!-- Filter Block --> */}
        {/* <div className="switchbox-outer">
          <h4>Program</h4>
          <Program />
        </div> */}
        <div className="switchbox-outer">
          <h4>Admission Year</h4>
          <Admission />
        </div>

        <div className="switchbox-outer">
          <h4>Marks Range</h4>
          <MarksRange />
        </div>

        <div
          className="filter-block"
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            marginBottom: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ margin: 0 }}>
            <button
              className="w-100 d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#excludeCollapse"
              aria-expanded="false" // ✅ closed by default
              style={{
                background: "#f9fafb",
                border: "none",
                padding: "14px 16px",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                const arrow = e.currentTarget.querySelector(".arrow");
                const isOpen =
                  e.currentTarget.getAttribute("aria-expanded") === "true";

                arrow.style.transform = isOpen
                  ? "rotate(90deg)"
                  : "rotate(0deg)";
              }}
            >
              <span>Exclude Students</span>

              <span
                className="arrow"
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transform: "rotate(0deg)", // ✅ start closed
                }}
              >
                ›
              </span>
            </button>
          </h4>

          <div
            id="excludeCollapse"
            className="collapse switchbox-outer" // ✅ removed "show"
            style={{
              padding: "12px 16px",
              background: "#ffffff",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <ExcludeBox />
          </div>
        </div>
      </div>
      {/* Filter Outer */}

      {/* <CallToActions /> */}
      {/* <!-- End Call To Action --> */}
    </div>
  );
};

export default FilterSidebar;
