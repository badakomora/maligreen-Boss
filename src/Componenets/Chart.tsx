import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { List } from "./List";

const dailyData = [
  { name: "Mon", sales: 5000 },
  { name: "Tue", sales: 7000 },
  { name: "Wed", sales: 6500 },
  { name: "Thu", sales: 8000 },
  { name: "Fri", sales: 9000 },
  { name: "Sat", sales: 7500 },
  { name: "Sun", sales: 8500 },
];

const weeklyData = [
  { name: "Week 1", sales: 40000 },
  { name: "Week 2", sales: 45000 },
  { name: "Week 3", sales: 42000 },
  { name: "Week 4", sales: 47000 },
];

const monthlyData = [
  { name: "Jan", sales: 180000 },
  { name: "Feb", sales: 190000 },
  { name: "Mar", sales: 200000 },
  { name: "Apr", sales: 210000 },
  { name: "May", sales: 220000 },
];

const yearlyData = [
  { name: "2020", sales: 2_000_000 },
  { name: "2021", sales: 2_200_000 },
  { name: "2022", sales: 2_500_000 },
  { name: "2023", sales: 2_700_000 },
];

export const Chart = () => {
  const [selectedData, setSelectedData] = useState(dailyData);
  const [activeIndex, setActiveIndex] = useState(0);

  const dataSets = [dailyData, weeklyData, monthlyData, yearlyData];
  // const labels = ["Daily", "Weekly", "Monthly", "Annually"];
  const labels = ["March 25", "February 25", "January 25", "December 24"];

  return (
    // <div style={{ display: "flex", width: "100%", marginTop: "100px" }}>
    <div style={{ display: "flex", width: "100%"}}>
      <div  style={{width:"30%"}}>
        {/* <h2 style={{ color: "#486c1b" }}>General Sales Revenue Trends</h2> */}
        <h2 style={{ color: "#486c1b" }}>Production Trends</h2>
        <div>
          {labels.map((label, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedData(dataSets[index]);
                setActiveIndex(index);
              }}
              style={{
                padding: "7px",
                margin:"4px",
                border: "none",
                borderRadius:"5px",
                cursor: "pointer",
                backgroundColor: activeIndex === index ? "#486c1b" : " #ffffff",
                color: activeIndex === index ? " #ffffff" : "#486c1b",
                transition: "0.3s",
              }}
            >
              {label}
            </button>
          ))}
          <List />
        </div>

      </div>
      <div style={{ width: "70%", height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={selectedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#486c1b" name="Sales" />
           
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
