"use client";
import dayjs from "dayjs";
import React from "react";
import CircularProgress from "./HeadSection/profilepic";
import ProfileCard from "./HeadSection/profilecard";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
const HeadSection = () => {
  const [profile_pic, setProfile_pic] = useState(
    "/images/resource/no_user.png"
  );
  const [user, setUser] = useState({});
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [reload, setReload] = useState(false);

  const [sectionloading, setSectionloading] = useState(true);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        setReload(false);
        setSectionloading(true);
        const token = localStorage.getItem("candidate_token");
        const response = await axios.get(`${apiurl}/api/userdata/userdata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data?.profilePicture) {
          setProfile_pic(response.data.profilePicture);
        }

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile pic:", error);
      } finally {
        setSectionloading(false);
      }
    };

    fetchProfilePic();
  }, [reload]);

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        setError={setError}
        setSuccess={setSuccess}
      />
      <div className="ls-widget">
        <div className="tabs-box">
          {sectionloading ? (
            <CustomizedProgressBars />
          ) : (
            <>
              <div className="widget-content">
                <div className="row">
                  {/* Left Section - Circular Progress */}
                  <div className="col-md-2 d-flex justify-content-center align-items-center p-4">
                    <CircularProgress
                      progress={85}
                      imageSrc={profile_pic}
                      setReload={setReload}
                      setError={setError}
                      setSuccess={setSuccess}
                    />
                  </div>

                  {/* Center Section - Profile Card */}
                  <div className="col-md-4  d-flex justify-content-center align-items-center p-4">
                    <ProfileCard
                      name={user.name}
                      degree={user.degree}
                      /* university="University of Engineering and Management, Jaipur" */
                      location={user.currentLocation}
                      phone={user.phone_number}
                      email={user.email}
                      gender={user.gender_name}
                      dob={dayjs(user.dob).format("DD-MM-YYYY")}
                      setReload={setReload}
                      setError={setError}
                      setSuccess={setSuccess}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HeadSection;
