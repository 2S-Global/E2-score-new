"use client";
import { queueRequest } from "../helper/queueHelper";
import dayjs from "dayjs";
import React from "react";
import CircularProgress from "./HeadSection/profilepic";
import ProfileCard from "./HeadSection/profilecard";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";

import { CreditScoreGauge } from "@/components/common/Gauge";

import dynamic from "next/dynamic";

const GaugeChart = dynamic(() => import("react-gauge-chart"), {
  ssr: false,
});
const HeadSection = () => {
  const [profile_pic, setProfile_pic] = useState(
    "/images/resource/no_user.png"
  );
  const [user, setUser] = useState({});
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [progress, setProgress] = useState(0);

  const [reload, setReload] = useState(false);

  const [sectionloading, setSectionloading] = useState(true);

  const [gesilscore, Setgesilscore] = useState(0);
  const [cibilscore, Setcibilscore] = useState(0);

  useEffect(() => {
    fetchProfilePic();
    fetchscore();
  }, [reload]);
  const fetchProfilePic = async () => {
    try {
      setReload(false);
      setSectionloading(true);
      const token = localStorage.getItem("candidate_token");
      const response = await queueRequest(() =>
        axios.get(`${apiurl}/api/userdata/userdata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      if (response.data?.profilePicture) {
        setProfile_pic(response.data.profilePicture);
      }

      if (response.data?.progress) {
        setProgress(response.data.progress);
      }

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile pic:", error);
    } finally {
      setSectionloading(false);
    }
  };

  const fetchscore = async () => {
    try {
      setReload(false);
      setSectionloading(true);
      const token = localStorage.getItem("candidate_token");
      const response = await queueRequest(() =>
        axios.get(`${apiurl}/api/userdata/getscore`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      if (response.data?.success) {
        Setgesilscore(response.data?.GeisilScore || 0);
        Setcibilscore(response.data?.CibilScore || 0);
      }
    } catch (error) {
      console.error("Error fetching profile pic:", error);
    } finally {
      setSectionloading(false);
    }
  };

  const salaryCurrencies = [
    { label: "₹", value: "INR" },
    { label: "$", value: "USD" },
    { label: "€", value: "EUR" },
    { label: "£", value: "GBP" },
  ];

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
                  <div className="col-lg-2 d-flex justify-content-center align-items-center p-2">
                    <CircularProgress
                      progress={progress}
                      imageSrc={profile_pic}
                      setReload={setReload}
                      setError={setError}
                      setSuccess={setSuccess}
                    />
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
                      dob={
                        user.dob
                          ? dayjs(user.dob).format("DD-MM-YYYY")
                          : undefined
                      }
                      setReload={setReload}
                      setError={setError}
                      setSuccess={setSuccess}
                    />
                  </div>

                  {/* Right Section - Image */}
                  <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center p-2">
                    {/* Logo */}
                    <img
                      src="/images/resource/Eisil Score Logo.png"
                      alt="Profile"
                      style={{
                        width: "150px",
                        height: "50px",
                        marginBottom: "-20px",
                      }}
                    />

                    {/* Gauge */}
                    <CreditScoreGauge
                      minScore={0}
                      maxScore={100}
                      score={gesilscore}
                      size={200}
                    />
                  </div>

                  <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center p-2">
                    {/* Logo */}
                    <img
                      src="/images/resource/Cibil Logo.png"
                      alt="Profile"
                      style={{
                        width: "150px",
                        height: "50px",
                        marginBottom: "-20px",
                      }}
                    />

                    {/* Gauge */}
                    <CreditScoreGauge
                      minScore={0}
                      maxScore={100}
                      score={cibilscore}
                      size={200}
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
