"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ProfileChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("candidate_token")
          : null;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/getMonthlyJobAppliedStatus`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.success) {
        const labels = res.data.data.map((item) => item.month);
        const values = res.data.data.map((item) => item.totalAppliedJobs);

        const allZero = values.every((v) => v === 0);

        if (allZero) {
          setChartData("empty");
        } else {
          setChartData({
            labels,
            datasets: [
              {
                label: "Total Applied Jobs",
                data: values,
                tension: 0.4, // smooth curve
                borderWidth: 3,
                pointRadius: 4,
                fill: true,
                borderColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  if (!chartArea) return "#1967d2";

                  const gradient = ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom,
                  );

                  gradient.addColorStop(0, "rgba(25, 103, 210, 1)");
                  gradient.addColorStop(1, "rgba(25, 103, 210, 0.1)");

                  return gradient;
                },
                backgroundColor: "rgba(25, 103, 210, 0.1)",
              },
            ],
          });
        }
      }
    } catch (error) {
      console.error("Error fetching monthly data:", error);
      setChartData("empty");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Total Applied Jobs</h4>
      </div>

      <div
        className="widget-content"
        style={{ height: "300px", position: "relative" }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : chartData === "empty" ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <p style={{ color: "#999", fontSize: "16px" }}>
              No jobs applied yet.
            </p>
          </div>
        ) : (
          <Line ref={chartRef} options={options} data={chartData} />
        )}
      </div>
    </div>
  );
};

export default ProfileChart;
