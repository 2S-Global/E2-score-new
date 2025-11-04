"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoginWithSocial from "./LoginWithSocial";
import FormContent2 from "./FormContent";
import FormContentcom from "./companyform";
import InstituteFormContent from "./InstituteRegister";
import Link from "next/link";
import Image from "next/image";

const Register2 = () => {
  return (
    <div className="form-inner p-4">
      <div className="mb-3 d-flex justify-content-center pb-4 pt-4">
        <Image
          alt="brand"
          src="/images/logo3.png"
          width={214}
          height={70}
          priority
        />
      </div>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        GLOBAL EMPLOYABILITY INFORMATION SERVICES INDIA LIMITED
      </h3>

      <Tabs>
        <div className="form-group register-dual">
          <TabList className="btn-box row">
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Candidate
              </button>
            </Tab>

            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-briefcase"></i> Employer
              </button>
            </Tab>
            <Tab className="col-lg-6 col-md-12">
              <button className="theme-btn btn-style-four">
                <i className="la la-user"></i> Institute
              </button>
            </Tab>
          </TabList>
        </div>
        {/* End .form-group */}

        <TabPanel>
          <FormContent2 />
        </TabPanel>
        {/* End cadidates Form */}

        <TabPanel>
          <FormContentcom />
        </TabPanel>

        {/* Institute */}
        <TabPanel>
          <InstituteFormContent />
        </TabPanel>
      </Tabs>
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            href="/login"
            className="call-modal login"
            style={{ color: "blue" }}
          >
            LogIn
          </Link>
        </div>
        {/* <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial /> */}
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register2;
