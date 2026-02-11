"use client";

import { useEffect, useState } from "react";
import { Briefcase, FileText, MessageSquare, Bookmark } from "lucide-react";
import axios from "axios";

const TopCardBlock = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     FETCH DASHBOARD STATS
  ====================== */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("employer_token");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/getEmployerDashboardStats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStats(response.data?.data || {});
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: <Briefcase size={22} className="text-primary" />,
      countNumber: stats?.totalJobs ?? 0,
      metaName: "Posted Jobs",
    },
    {
      id: 2,
      icon: <FileText size={22} className="text-danger" />,
      countNumber: stats?.totalApplicants ?? 0,
      metaName: "Applications",
    },
    {
      id: 3,
      icon: <Bookmark size={22} className="text-success" />,
      countNumber: stats?.totalShortlisted ?? 0,
      metaName: "Shortlisted",
    },
    {
      id: 4,
      icon: <MessageSquare size={22} className="text-warning" />,
      countNumber: stats?.totalRejected ?? 0,
      metaName: "Rejected",
    },
  ];

  return (
    <div className="row">
      {cardContent.map((item) => (
        <div
          key={item.id}
          className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-3"
        >
          <div className="d-flex align-items-center p-3 rounded shadow-sm bg-white">
            {/* Icon */}
            <div
              className="me-3 d-flex align-items-center justify-content-center rounded"
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#f0f2f5",
              }}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-grow-1">
              {loading ? (
                <div className="spinner-border spinner-border-sm text-primary" />
              ) : (
                <>
                  <h4
                    className="mb-0 fw-bold fs-5 text-truncate"
                    title={item.countNumber}
                  >
                    {item.countNumber}
                  </h4>
                  <p className="mb-0 small text-muted">{item.metaName}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCardBlock;
