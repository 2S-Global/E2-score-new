"use client";

import { useEffect, useState } from "react";
import axios from "axios";

/* ===============================
   Animated Counter Hook
================================= */
const useCountUp = (end, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

/* ===============================
   Single Card Component
================================= */
const DashboardCard = ({ icon, value, metaName, uiClass }) => {
  const animatedValue = useCountUp(value);

  return (
    <div className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12">
      <div className={`ui-item ${uiClass}`}>
        <div className="left">
          <i className={`icon la ${icon}`} style={{ fontSize: "18px" }}></i>
        </div>
        <div className="right">
          <h4>{animatedValue}</h4>
          <p>{metaName}</p>
        </div>
      </div>
    </div>
  );
};

/* ===============================
   Main Component
================================= */
const TopCardBlock = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("candidate_token")
      : null;

  const [dashboardData, setDashboardData] = useState({
    appliedJobs: 0,
    shortlistedJobs: 0,
    interviewScheduled: 0,
    offersReceived: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          `${apiurl}/api/candidate/candidateDetails/get_candidate_dashboard_data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          setDashboardData(res.data.data);
        }
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      value: dashboardData.appliedJobs,
      metaName: "Applied",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      value: dashboardData.shortlistedJobs,
      metaName: "Shortlisted",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      value: dashboardData.interviewScheduled,
      metaName: "Interview Scheduled",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      value: dashboardData.offersReceived,
      metaName: "Offers Received",
      uiClass: "ui-green",
    },
  ];

  return (
    <>
      {/* ===============================
          Glassmorphism Style
      ================================= */}
      <style jsx>{`
        .ui-item {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          padding: 20px;
        }

        .ui-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }

        .right h4 {
          font-size: 26px;
          font-weight: 700;
          margin: 0;
        }

        .right p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
      `}</style>

      {cardContent.map((item) => (
        <DashboardCard
          key={item.id}
          icon={item.icon}
          value={item.value}
          metaName={item.metaName}
          uiClass={item.uiClass}
        />
      ))}
    </>
  );
};

export default TopCardBlock;
