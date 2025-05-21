"use client";
import React from "react";
import CircularProgress from "./HeadSection/profilepic";
import ProfileCard from "./HeadSection/profilecard";
import { useState, useEffect } from "react";
import axios from "axios";

const HeadSection = () => {
  const [profile_pic, setProfile_pic] = useState(
    "/images/resource/no_user.png"
  );
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const token = localStorage.getItem("candidate_token");
        const response = await axios.get(`${apiurl}/api/userdata/userdata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile_pic(response.data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile pic:", error);
      }
    };

    fetchProfilePic();
  }, [apiurl]);

  return (
    <>
      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-content">
            <div className="row">
              {/* Left Section - Circular Progress */}
              <div className="col-md-2 d-flex justify-content-center align-items-center p-4">
                <CircularProgress progress={85} imageSrc={profile_pic} />
              </div>

              {/* Center Section - Profile Card */}
              <div className="col-md-4  d-flex justify-content-center align-items-center p-4">
                <ProfileCard
                  name="Abhishek Dey"
                  degree="B.Tech/B.E."
                  /* university="University of Engineering and Management, Jaipur" */
                  location="Kolkata"
                  phone="9051624898"
                  email="ab.dey2000@gmail.com"
                  gender="Male"
                  dob="13th October 2000"
                />
              </div>

              {/* Right Section - Image */}
              <div className="col-md-2 d-flex justify-content-center align-items-center p-4">
                {/*<EscoreSection score_og={score} label_og={label} /> */}
                <img
                  src="/images/resource/nextUpdate.png"
                  alt="Profile"
                  className="img-fluid object-cover"
                  style={{ width: "150px", height: "180px" }}
                />
              </div>
              <div className="col-md-2 d-flex justify-content-center align-items-center p-4">
                {/*                 <EscoreSection score_og={score} label_og={label} /> */}
                <img
                  src="/images/resource/cibil.png"
                  alt="Profile"
                  className="img-fluid object-cover"
                  style={{ width: "150px", height: "180px" }}
                />
              </div>
              <div className="col-md-2 d-flex justify-content-center align-items-center p-4">
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
