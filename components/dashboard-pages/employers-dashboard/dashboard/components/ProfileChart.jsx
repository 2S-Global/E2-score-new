"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

const ProfileChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("employer_token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/getMonthlyApplicantsStats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const labels = json.data.map((item) => item.month);
          const counts = json.data.map((item) => item.totalApplicants);

          setChartData({
            labels,
            datasets: [
              {
                label: "Applicants",
                data: counts,
                borderColor: "#1967d2",
                backgroundColor: "#1967d2",
                tension: 0.4,
                pointRadius: 4,
              },
            ],
          });
        }
      } catch (err) {
        console.error("Failed to load chart data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="tabs-box w-100 h-100">
      <div className="widget-title">
        <h4 className="mb-4">Candidate Application Statistics</h4>
      </div>

      <div
        className="widget-content d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" />
            <div className="mt-2">Loading statistics...</div>
          </div>
        ) : (
          chartData && <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default ProfileChart;
