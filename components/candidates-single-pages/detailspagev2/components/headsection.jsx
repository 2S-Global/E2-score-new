"use client";
import React from "react";
import dayjs from "dayjs";
import CircularProgress from "./headsection/profilepic";
import ProfileCard from "./headsection/profilecard";
const HeadSection = ({ data = {} }) => {
  const profile_pic = data?.profilePicture || "/images/resource/no_user.png";
  const progress = data?.progress || 0;
  const user = data || {};

  const salaryCurrencies = [
    { label: "₹", value: "INR" },
    { label: "$", value: "USD" },
    { label: "€", value: "EUR" },
    { label: "£", value: "GBP" },
  ];
  return (
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-content">
            <div className="row">
              {/* Left Section - Circular Progress */}
              <div className="col-lg-2 d-flex justify-content-center align-items-center p-2">
                <CircularProgress progress={progress} imageSrc={profile_pic} />
              </div>

              {/* Center Section - Profile Card */}
              <div className="col-lg-4  d-flex justify-content-center align-items-center p-2">
                <ProfileCard
                  isIndianNumber={user.isIndianNumber || false}
                  numberVerified={user.numberVerified || false}
                  name={user.name || "N/A"}
                  degree={user.degree || "N/A"}
                  father_name={user.father_name || "N/A"}
                  mother_name={user.mother_name || "N/A"}
                  /* university="University of Engineering and Management, Jaipur" */
                  location={user.currentLocation || "N/A"}
                  phone={user.phone_number || "N/A"}
                  email={user.email || "N/A"}
                  gender={user.gender_name || "N/A"}
                  salary={
                    user.salary
                      ? `${
                          salaryCurrencies.find(
                            (c) => c.value === user.currency
                          )?.label
                        } ${user.salary?.toLocaleString("en-IN")}`
                      : ""
                  }
                  /* send dob only if only if it is not null  */
                  dob={user.dob}
                />
              </div>
              {/* Right Section - Image */}
              <div className="col-lg-2 d-flex justify-content-center align-items-center p-2">
                {/*<EscoreSection score_og={score} label_og={label} /> */}
                <img
                  src="/images/resource/nextUpdate.png"
                  alt="Profile"
                  className="img-fluid object-cover"
                  style={{ width: "150px", height: "180px" }}
                />
              </div>
              <div className="col-lg-2 d-flex justify-content-center align-items-center p-2">
                {/*                 <EscoreSection score_og={score} label_og={label} /> */}
                <img
                  src="/images/resource/cibil.png"
                  alt="Profile"
                  className="img-fluid object-cover"
                  style={{ width: "150px", height: "180px" }}
                />
              </div>
              <div className="col-lg-2 d-flex justify-content-center align-items-center p-2">
                {/*                 <EscoreSection score_og={score} label_og={label} /> */}
                <img
                  src="/images/resource/experian.png"
                  alt="Profile"
                  className="img-fluid object-cover"
                  style={{ width: "150px", height: "180px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadSection;
