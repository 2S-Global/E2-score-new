"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileMain from "./accomSection/profile/main";
import Workmain from "./accomSection/worksample/main";
import CustomizedProgressBars from "@/components/common/loader";
import MessageComponent from "@/components/common/ResponseMsg";
const AcomSection = () => {
  const [sectionloading, setSectionloading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [onlineProfilelist, setOnlineProfilelist] = useState([]);
  const [worksamplelist, setWorksamplelist] = useState([]);
  const [reloadonlineProfilelist, setReloadonlineProfilelist] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  //main use effect
  useEffect(() => {
    try {
      setSectionloading(true);
      fetchonlineProfilelist();
      fetchWorksamplelist();
    } catch (error) {
      console.error(error);
    } finally {
      setSectionloading(false);
    }
  }, [apiurl]);

  useEffect(() => {
    if (reloadonlineProfilelist) {
      fetchonlineProfilelist();
      setReloadonlineProfilelist(false);
    }
  }, [reloadonlineProfilelist]);

  //functions
  const fetchonlineProfilelist = async () => {
    try {
      const token = localStorage.getItem("candidate_token");
      const response = await axios.get(
        `${apiurl}/api/candidate/accomplishments/get_online_profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setOnlineProfilelist(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchWorksamplelist = async () => {
    try {
      const token = localStorage.getItem("candidate_token");
      const response = await axios.get(
        `${apiurl}/api/candidate/accomplishments/get_work_samples`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setWorksamplelist(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

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
          <div className="widget-title">
            <h4>Accomplishments</h4>
          </div>
          {sectionloading ? (
            <CustomizedProgressBars />
          ) : (
            <>
              <div className="widget-content">
                <div className="border-bottom my-3">
                  <ProfileMain
                    list={onlineProfilelist}
                    setError={setError}
                    setSuccess={setSuccess}
                    reload={reloadonlineProfilelist}
                    setReload={setReloadonlineProfilelist}
                  />
                </div>

                <div className="my-3">
                  <Workmain
                    list={worksamplelist}
                    setError={setError}
                    setSuccess={setSuccess}
                    reload={reloadonlineProfilelist}
                    setReload={setReloadonlineProfilelist}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AcomSection;
