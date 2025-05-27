"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { se } from "date-fns/locale";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Common chart options
const options = {
  responsive: true,

  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};



const fakeLineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Payments for Institute",
      data: [10, 20, 40, 35, 60, 80],
      backgroundColor: "#1967d2",
      borderColor: "#1967d2",
      tension: 0.4,
    },
  ],
};




const fakeCandidateChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Candidate Statistics",
      data: [5, 25, 15, 40, 35, 50],
      backgroundColor: "#ff6d01",
      borderColor: "#ff6d01",
      tension: 0.4,
    },
  ],
};

const ProfileChart = () => {
  const [loading, setLoading] = useState(true);
  const [pieChart1, setPieChart1] = useState({ labels: [], datasets: [] });
  const [pieChart2, setPieChart2] = useState({ labels: [], datasets: [] });

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartData2, setChartData2] = useState({ labels: [], datasets: [] });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [candidateChartData, setCandidateChartData] = useState({
    labels: [],
    datasets: [],
  });

  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPieChart1 = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/dashboard/getMonthlyCompanyDetails`
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          const data = response.data.data;

          const labels = data.map((item) => item.monthName);
          const values = data.map((item) => item.total);
          const colorPalette = [
            "#1967d2",
            "#34a853",
            "#fbbc05",
            "#ff6d01",
            "#9c27b0",
            "#00acc1",
          ];

          const pieData = {
            labels,
            datasets: [
              {
                label: "Monthly Company User",
                data: values, // includes 0s
                backgroundColor: colorPalette.slice(0, values.length),
                borderWidth: 1,
              },
            ],
          };

          setPieChart1(pieData);
  
        } else {
          console.error("API data format unexpected", response.data);
        }
      } catch (error) {
        console.error("Error fetching chart data", error);

      }
    };

    const fetchPieChart2 = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/dashboard/getMonthlyInstitutionsDetails`
        );
        const data = response.data.data;
        if (response.data.success && Array.isArray(response.data.data)) {
          const labels = data.map((item) => item.monthName);
          const values = data.map((item) => item.total);
          const colorPalette = [
            "#4e79a7",
            "#f28e2b",
            "#e15759",
            "#76b7b2",
            "#59a14f",
            "#edc949",
          ];

          const pieData2 = {
            labels,
            datasets: [
              {
                label: "Monthly Institute Users",
                data: values,
                backgroundColor: colorPalette.slice(0, values.length),
                borderWidth: 1,
              },
            ],
          };

          setPieChart2(pieData2);

        }
      } catch (error) {
        console.error("Error fetching chart data", error);
        setLoading(false);
      }
    };

    const fetchLinechartData = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/dashboard/getMonthlyCandidateDetails`
        );
        const data = response.data.data;

        if (response.data.success && Array.isArray(response.data.data)) {
          const labels = data.map((item) => item.monthName);
          const values = data.map((item) => item.total);

          const chartData = {
            labels,
            datasets: [
              {
                label: "Total Candidate Statistics",
                data: values,
                backgroundColor: "#ff6d01",
                borderColor: "#ff6d01",
                tension: 0.4,
              },
            ],
          };

          setChartData(chartData);

        }
      } catch (error) {
        console.error("Error fetching line chart data", error);
        setLoading(false);
      }
    };

    const fetchLinechartData2 = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/dashboard/getMonthlyUserDetails`
        );

        const data = response.data.data;
        if (response.data.success && Array.isArray(response.data.data)) {
          const labels = data.map((item) => item.monthName);
          const values = data.map((item) => item.total);

          const chartData = {
            labels,
            datasets: [
              {
                label: "Total User Statistics",
                data: values,
                backgroundColor: "#7490fa",
                borderColor: "#ff6d01",
                tension: 0.4,
              },
            ],
          };

          setChartData2(chartData);

        }
      } catch (error) {
        console.error("error fetching line chart data", error);
        setLoading(false);
      }
    };

    // Simulate loading
    setTimeout(() => {
      // setChartData(fakeBarChartData);
      setLineChartData(fakeLineChartData);
      setCandidateChartData(fakeCandidateChartData);
      // setLoading(false);
    }, 500);

  const fetchAll = async () => {
    try {
      await Promise.allSettled([
        fetchPieChart1(),
        fetchPieChart2(),
        fetchLinechartData(),
        fetchLinechartData2(),
      ]);
    } catch (error) {
      console.error("Error fetching one or more chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
  }, []);

  return (
<>
{loading ? (
  <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) :(
    <div className="row space-y-10">
      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total Payments from Company</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <Bar options={options} data={pieChart1} />
          )}
        </div>
      </div>

      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total Payments from Institute</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <Line options={options} data={lineChartData} />
          )}
        </div>
      </div>

      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total User In Company</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? <p>Loading chart...</p> : <Pie data={pieChart1} />}
        </div>
      </div>

      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total User In Institute </h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? <p>Loading chart...</p> : <Pie data={pieChart2} />}
        </div>
      </div>

      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total Candidate Statistics</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <Line options={options} data={chartData} />
          )}
        </div>
      </div>

      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total User Statistics</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <Line options={options} data={chartData2} />
          )}
        </div>
      </div>
    </div>
)}
</>
    

  );
};

export default ProfileChart;
