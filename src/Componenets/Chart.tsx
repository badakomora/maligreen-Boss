"use client";

import React, { useState, useEffect } from "react";
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

type DailyDataItem = {
  date: string;
  name: string;
  sales: number;
};

// **Actual Sales Data for 30 Days**
const detailedDailyData: DailyDataItem[] = [
  { date: "2024-03-01", name: "Mar 01", sales: 5000 },
  { date: "2024-03-02", name: "Mar 02", sales: 5200 },
  { date: "2024-03-03", name: "Mar 03", sales: 4800 },
  { date: "2024-03-04", name: "Mar 04", sales: 5100 },
  { date: "2024-03-05", name: "Mar 05", sales: 5300 },
  { date: "2024-03-06", name: "Mar 06", sales: 4900 },
  { date: "2024-03-07", name: "Mar 07", sales: 5000 },
  { date: "2024-03-08", name: "Mar 08", sales: 5400 },
  { date: "2024-03-09", name: "Mar 09", sales: 5600 },
  { date: "2024-03-10", name: "Mar 10", sales: 5900 },
  { date: "2024-03-11", name: "Mar 11", sales: 6000 },
  { date: "2024-03-12", name: "Mar 12", sales: 5700 },
  { date: "2024-03-13", name: "Mar 13", sales: 6200 },
  { date: "2024-03-14", name: "Mar 14", sales: 6100 },
  { date: "2024-03-15", name: "Mar 15", sales: 5800 },
  { date: "2024-03-16", name: "Mar 16", sales: 5900 },
  { date: "2024-03-17", name: "Mar 17", sales: 5600 },
  { date: "2024-03-18", name: "Mar 18", sales: 5400 },
  { date: "2024-03-19", name: "Mar 19", sales: 5500 },
  { date: "2024-03-20", name: "Mar 20", sales: 5300 },
  { date: "2024-03-21", name: "Mar 21", sales: 5000 },
  { date: "2024-03-22", name: "Mar 22", sales: 5200 },
  { date: "2024-03-23", name: "Mar 23", sales: 5100 },
  { date: "2024-03-24", name: "Mar 24", sales: 4900 },
  { date: "2024-03-25", name: "Mar 25", sales: 4700 },
  { date: "2024-03-26", name: "Mar 26", sales: 4800 },
  { date: "2024-03-27", name: "Mar 27", sales: 4600 },
  { date: "2024-03-28", name: "Mar 28", sales: 4500 },
  { date: "2024-03-29", name: "Mar 29", sales: 4300 },
  { date: "2024-03-30", name: "Mar 30", sales: 4200 },
];

interface NavbarProps {
  activeTab: string;
}

export const Chart: React.FC<NavbarProps> = ({ activeTab }) => {
  const [startDate, setStartDate] = useState(detailedDailyData[0]?.date || "");
  const [endDate, setEndDate] = useState(
    detailedDailyData[detailedDailyData.length - 1]?.date || ""
  );
  const [filteredDailyData, setFilteredDailyData] = useState<DailyDataItem[]>(
    []
  );

  useEffect(() => {
    if (startDate && endDate) {
      setFilteredDailyData(
        detailedDailyData.filter(
          (item) => item.date >= startDate && item.date <= endDate
        )
      );
    }
  }, [startDate, endDate]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "30%" }}>
        <h2 style={{ fontFamily: "Monaco", color: "#486c1b" }}>
          {activeTab === "Livestock & Production"
            ? "Production Trends"
            : "Sales Revenue Overview"}
        </h2>
        <div>
          <div style={{ marginTop: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                color: "#486c1b",
              }}
            >
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              min={detailedDailyData[0]?.date}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #486c1b",
                width: "100%",
              }}
            />
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                color: "#486c1b",
              }}
            >
              End Date:
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={detailedDailyData[detailedDailyData.length - 1]?.date}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #486c1b",
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "70%", height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredDailyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#486c1b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
