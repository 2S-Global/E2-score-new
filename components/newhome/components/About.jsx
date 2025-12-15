import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <>
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="inner-column " data-aos="fade-left">
          <ul className="list-style-one">
            <li className="mb-2">
              Established in 2025, Global Employability Information Services
              India Limited is a pioneering information and HR solutions firm
              dedicated to building secure, high-performing workforces
              worldwide.
            </li>
            <li className="mb-2">
              We empower businesses to make informed, secure, and strategic
              decisions, ensuring that every hire is not just qualified, but
              also fully validated and compliant.
            </li>

            <li className="mb-2">
              We integrate advanced data analytics with critical verification
              services to transform how companies attract, vet, and hire talent.
              Our four core objectives define our commitment to global
              recruitment excellence and risk mitigation:
            </li>
          </ul>
          <div className="row g-1 mt-1">
            {/* CARD TEMPLATE */}
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card ">
                <div className="d-flex align-items-center gap-1 mb-1">
                  <span className="fs-4">🌎</span>
                  <h5 className="m-0 fw-semibold">Global Staffing</h5>
                </div>

                <p className="text-muted mt-1">
                  Strategic international talent acquisition and cross-border
                  recruitment management.
                </p>

                <p className="fw-semibold mt-1">
                  Helps secure specialized skills and build a diverse global
                  workforce.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card ">
                <div className="d-flex align-items-center gap-1 mb-1">
                  <span className="fs-4">📊</span>
                  <h5 className="m-0 fw-semibold">Employability</h5>
                </div>

                <p className="text-muted mt-1">
                  A proprietary AI-driven scoring system to quantify candidate
                  job readiness.
                </p>

                <p className="fw-semibold mt-1">
                  Reduces time-to-hire and ensures unbiased, merit-based talent
                  selection.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card ">
                <div className="d-flex align-items-center gap-1 mb-1">
                  <span className="fs-4">🛡️</span>
                  <h5 className="m-0 fw-semibold">Background Check</h5>
                </div>

                <p className="text-muted mt-1">
                  Legally compliant verification of employment, education, and
                  criminal history.
                </p>

                <p className="fw-semibold mt-1">
                  Protects your organization and strengthens hiring confidence.
                </p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="col-lg-6 col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card">
                <div className="d-flex align-items-center gap-1 mb-1">
                  <span className="fs-4">🆔</span>
                  <h5 className="m-0 fw-semibold">KYC Verification</h5>
                </div>

                <p className="text-muted mt-1">
                  Digital identity authentication and screening against global
                  watchlists.
                </p>

                <p className="fw-semibold mt-1">
                  Ensures AML/CTF compliance and prevents financial fraud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .col about left content */}

      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <figure className="image" data-aos="fade-right">
          <Image
            width={600}
            height={600}
            src="/images/resource/image-2.png"
            alt="about"
          />
        </figure>
      </div>
      {/* <!-- Image Column --> */}
    </>
  );
};

export default About;
