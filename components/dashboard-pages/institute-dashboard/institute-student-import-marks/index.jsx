"use client";
import MobileMenu from "../../../header/AdminMobileMenu";
import DashboardHeader from "../../../header/DashboardAdminheader";
import DashboardInstituteSidebar from "../../../header/DashboardInstituteSidebar";

import CopyrightFooter from "../../CopyrightFooter";
import axios from "axios";
import Form from "./components/Form";
import { useState,useEffect } from "react";
const Index = () => {
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    useEffect(()=>{
    
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("Institute_token")
        : null;
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
              try {
                const response = await axios.get( `${apiurl}/api/institute-course/course`,   {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response.data);
                 setProgram(response)
              } catch (error) {
                console.error(error);
              }
            };
     
           
        fetchData()
    
    
 
    },[])
  return (
    <>
      <div className="page-wrapper dashboard ">
        <span className="header-span"></span>
        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        <DashboardInstituteSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            
            <div className="row">
              <div className="col-lg-6 mx-auto" >
                <div className="applicants-widget ls-widget">
                  <div
                    className="widget-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Import Student Marks</h4>
                          <a
                      href="/institute-student-import-marks.csv"
                      download
                      className="btn btn-sm btn-outline-primary"
                    >
                      Download Template Csv
                    </a>
                  </div>
                  <div className="widget-content">
                            <Form/>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </>
  );
};

export default Index;