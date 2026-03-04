"use client";
import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import CustomizedProgressBars from "@/components/common/loader";
import { CreditScoreGauge } from "@/components/common/Gauge";
import { CreditCibilScoreGauge } from "@/components/common/CibilGauge";

const ScoreSection = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState({});
  const [gesilscore, setGesilScore] = useState(0);
  const [cibilscore, setCibilScore] = useState(0);

  /* Fetch candidate info */
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiurl}/api/userdata/get_candidate_info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setUserdata(response.data.data);
      }
    } catch (error) {
      console.error("Candidate info error:", error);
    }
  };

  /* Fetch scores (GEISIL & CIBIL) */
  const fetchScores = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/userdata/getscore`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.success) {
        setGesilScore(response.data?.GeisilScore || 0);
        setCibilScore(response.data?.CibilScore || 0);
      }
    } catch (error) {
      console.error("Score fetch error:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchScores()]);
      setLoading(false);
    };

    if (token) init();
  }, [token]);

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-content">
          {loading ? (
            <CustomizedProgressBars />
          ) : (
            <div className="row">
              {/* LEFT SECTION – USER INFO */}
              <div className="col-md-6 d-flex justify-content-start align-items-center p-4">
                <div className="p-4">
                  <h4 className="fw-bold mb-2">{userdata.name}</h4>

                  <p className="mb-2" title={userdata.phone_number}>
                    <FaPhone className="text-secondary me-2" />
                    {userdata.phone_number || "N/A"}
                  </p>

                  <p className="mb-2" title={userdata.email}>
                    <FaEnvelope className="text-secondary me-2" />
                    {userdata.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* RIGHT SECTION – GEISIL SCORE */}
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center p-2">
                <img
                  src="/images/resource/Eisil Score Logo.png"
                  alt="GEISIL"
                  style={{
                    width: "134px",
                    height: "50px",
                    marginBottom: "-20px",
                  }}
                />
                <CreditScoreGauge
                  minScore={0}
                  maxScore={100}
                  score={gesilscore}
                  size={200}
                />
              </div>

              {/* RIGHT SECTION – CIBIL SCORE */}
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center p-2">
                <img
                  src="/images/resource/Cibil Logo.png"
                  alt="CIBIL"
                  style={{
                    width: "80px",
                    height: "40px",
                    marginBottom: "-20px",
                  }}
                />
                <CreditCibilScoreGauge
                  minScore={100}
                  maxScore={1000}
                  score={cibilscore}
                  size={200}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;
