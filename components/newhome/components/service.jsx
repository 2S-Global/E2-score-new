import Image from "next/image";
import Link from "next/link";

const Services = () => {
  return (
    <>
      <div className="content-column col-md-12 ">
        <div className="inner-column " data-aos="fade-left">
          <div className="row g-4 mt-4">
             {/* <div className="row g-1 mt-1"> */}
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
            {/* <div className="col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card ">
                <div className="mb-2">
                  <h3 className="mb-4 text-center">
                    🌎 Global Staffing: Sourcing the World's Best Talent
                  </h3>
                  <div className="text">
                    <span>
                      In today's interconnected world, the best talent often
                      resides beyond geographical borders. Our Global Staffing
                      services are designed to help your organization tap into
                      this vast, international talent pool, ensuring you secure
                      the right skills for any role, anywhere in the world.
                    </span>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>International Talent Acquisition:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We manage the entire cross-border recruitment lifecycle,
                        from initial sourcing and candidate screening to
                        interview coordination and offer negotiation. Our
                        expertise covers sourcing high-calibre candidates
                        globally, including expatriates, host-country nationals,
                        and third-country nationals.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Strategic Staffing Approaches:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We employ tailored staffing strategies (e.g.,
                        Ethnocentric, Polycentric, Regio-centric, and
                        Geocentric) that align with your business's
                        internationalization stage and corporate culture,
                        optimizing for global integration and local
                        responsiveness.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Compliance and Risk Mitigation:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        Navigating international labor laws, visa requirements,
                        payroll, and local employment quotas can be complex. We
                        ensure full regulatory compliance in every jurisdiction,
                        mitigating the legal and financial risks associated with
                        international hiring.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Building a Diverse Workforce:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        Our global reach enables you to cultivate a diverse and
                        innovative workforce, bringing varied cultural
                        perspectives and country-specific expertise to your
                        teams, which is critical for accessing new markets and
                        driving innovation.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 p-4 shadow-sm border-0 rounded-4 feature-card ">
                <div className="mb-2">
                  <h3 className="mb-4 text-center">
                    📊 Employability Scoring: Data-Driven Candidate Vetting{" "}
                  </h3>
                  <div className="text">
                    <span>
                      Employability Scoring is our proprietary, data-driven
                      methodology that moves beyond traditional resume screening
                      to predict a candidate's potential for success and
                      long-term fit within an organization. We leverage
                      sophisticated analytics to quantify a candidate’s job
                      readiness and career trajectory.
                    </span>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>Comprehensive Skill Assessment:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We evaluate a candidate's profile against key
                        employability skills that employers value, including
                        problem-solving, communication, collaboration,
                        adaptability, self-management, and domain-specific
                        technical competencies.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Machine Learning Model:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        Utilizing AI and machine learning, we analyze various
                        data points—such as education level, professional
                        experience, language proficiency, and driving factors—to
                        generate an objective, non-discriminatory score.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Prioritized Recruitment:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        This score allows recruiters to efficiently prioritize
                        and focus on the most promising candidates, drastically
                        cutting down the time and cost involved in processing
                        high volumes of applications and accelerating the
                        time-to-hire.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Reducing Bias:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        Our model is rigorously designed to exclude sensitive,
                        non-job-related drivers (like gender or region) to
                        ensure a fair and unbiased assessment, helping you make
                        merit-based hiring decisions.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card ">
                <div className="mb-2">
                  <h3 className="mb-4 text-center">
                    🛡️ Background Checking: Securing Your Workforce and
                    Reputation
                  </h3>
                  <div className="text">
                    <span>
                      Our robust Background Checking services are essential for
                      due diligence, helping you verify candidate credentials
                      and mitigate hiring risks that could impact your company's
                      safety, reputation, and financial stability. We provide
                      thorough, legally compliant screenings for prospective and
                      current employees.
                    </span>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>Verification of Credentials:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We meticulously authenticate all information provided by
                        an applicant, including:
                        <ul
                          style={{
                            paddingLeft: "1.5rem",
                            listStyleType: "disc",
                          }}
                        >
                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                              marginBottom: "8px",
                            }}
                          >
                            <strong>Employment History: </strong>
                            Verification of past roles, tenures, titles, and
                            responsibilities.
                          </li>

                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                            }}
                          >
                            <strong>Educational Qualifications: </strong>
                            Confirmation of degrees, institutions, and dates of
                            attendance.
                          </li>
                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                            }}
                          >
                            <strong>
                              Professional Licenses/Certifications:{" "}
                            </strong>
                            Validation of critical industry-specific
                            credentials.
                          </li>
                        </ul>
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Risk and Safety Screening:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        This service includes thorough checks for:
                        <ul
                          style={{
                            paddingLeft: "1.5rem",
                            listStyleType: "disc",
                          }}
                        >
                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                              marginBottom: "8px",
                            }}
                          >
                            <strong>Criminal Records: </strong>
                            Database searches for past convictions at local,
                            national, and international levels.
                          </li>

                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                            }}
                          >
                            <strong>Credit Reports: </strong>
                            Where legally permissible, for roles involving
                            financial trust.
                          </li>
                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                            }}
                          >
                            <strong>Reference Checks: </strong>
                            Detailed professional feedback from past supervisors
                            or colleagues.
                          </li>
                        </ul>
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Compliance and Confidentiality: </strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We conduct all checks in strict adherence to federal,
                        state, and international data privacy and fair credit
                        reporting laws (such as the FCRA, where applicable),
                        ensuring a transparent, ethical, and legal screening
                        process.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 p-3 shadow-sm border-0 rounded-4 feature-card ">
                <div className="mb-2">
                  <h3 className="mb-4 text-center">
                    🆔 KYC Verification: Essential Identity and Risk Validation
                  </h3>
                  <div className="text">
                    <span>
                      KYC (Know Your Customer/Client) Verification is a
                      fundamental regulatory requirement, and our service
                      provides quick, accurate, and compliant validation of
                      individual and business identities. This is critical for
                      preventing financial crime and ensuring a secure business
                      ecosystem.
                    </span>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>Anti-Money Laundering (AML) Compliance: </strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        Our procedures are integrated within a broader
                        AML/Counter-Terrorism Financing (CTF) framework, helping
                        financial institutions and other regulated entities meet
                        their global compliance obligations.
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Identity Authentication: </strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We collect and verify crucial identifying information,
                        including:
                        <ul
                          style={{
                            paddingLeft: "1.5rem",
                            listStyleType: "disc",
                          }}
                        >
                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                              marginBottom: "8px",
                            }}
                          >
                            <strong>Document Verification: </strong>
                            Authenticating government-issued IDs (passports,
                            driver's licenses) and proof of address (utility
                            bills).
                          </li>

                          <li
                            style={{
                              listStyleType: "disc",
                              display: "list-item",
                            }}
                          >
                            <strong>Biometric Checks: </strong>
                            Utilizing advanced technology for liveness detection
                            and facial recognition to prevent identity fraud and
                            spoofing.
                          </li>
                        </ul>
                      </span>
                    </li>

                    <li className="mb-3">
                      <strong>Database Screening: </strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We screen customers and entities against global
                        watchlists, sanctions databases, and Politically Exposed
                        Persons (PEPs) registries to accurately assess risk and
                        immediately flag any adverse media or financial red
                        flags.
                      </span>
                    </li>
                    <li className="mb-3">
                      <strong>Digital and Perpetual KYC:</strong>{" "}
                      <span
                        style={{
                          textAlign: "justify",
                        }}
                      >
                        We offer modern eKYC solutions that allow for rapid,
                        digital onboarding, complemented by a perpetual KYC
                        approach that monitors customer risk profiles
                        continuously, not just at the point of initial
                        engagement.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
       {/*  </div> */}
      </div>
    </>
  );
};

export default Services;
