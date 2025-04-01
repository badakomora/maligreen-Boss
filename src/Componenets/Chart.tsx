"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  cashRevenue: number;
  tillRevenue: number;
  bankRevenue: number;
};

// Modified data to include three revenue types
const detailedDailyData: DailyDataItem[] = [
  {
    date: "2024-03-01",
    name: "Mar 01",
    cashRevenue: 2000,
    tillRevenue: 1500,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-02",
    name: "Mar 02",
    cashRevenue: 2100,
    tillRevenue: 1600,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-03",
    name: "Mar 03",
    cashRevenue: 1900,
    tillRevenue: 1400,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-04",
    name: "Mar 04",
    cashRevenue: 2000,
    tillRevenue: 1600,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-05",
    name: "Mar 05",
    cashRevenue: 2200,
    tillRevenue: 1600,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-06",
    name: "Mar 06",
    cashRevenue: 1800,
    tillRevenue: 1600,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-07",
    name: "Mar 07",
    cashRevenue: 2000,
    tillRevenue: 1500,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-08",
    name: "Mar 08",
    cashRevenue: 2200,
    tillRevenue: 1700,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-09",
    name: "Mar 09",
    cashRevenue: 2300,
    tillRevenue: 1800,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-10",
    name: "Mar 10",
    cashRevenue: 2400,
    tillRevenue: 1900,
    bankRevenue: 1600,
  },
  {
    date: "2024-03-11",
    name: "Mar 11",
    cashRevenue: 2500,
    tillRevenue: 2000,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-12",
    name: "Mar 12",
    cashRevenue: 2300,
    tillRevenue: 1900,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-13",
    name: "Mar 13",
    cashRevenue: 2600,
    tillRevenue: 2100,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-14",
    name: "Mar 14",
    cashRevenue: 2500,
    tillRevenue: 2000,
    bankRevenue: 1600,
  },
  {
    date: "2024-03-15",
    name: "Mar 15",
    cashRevenue: 2300,
    tillRevenue: 1900,
    bankRevenue: 1600,
  },
  {
    date: "2024-03-16",
    name: "Mar 16",
    cashRevenue: 2400,
    tillRevenue: 1900,
    bankRevenue: 1600,
  },
  {
    date: "2024-03-17",
    name: "Mar 17",
    cashRevenue: 2300,
    tillRevenue: 1800,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-18",
    name: "Mar 18",
    cashRevenue: 2200,
    tillRevenue: 1700,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-19",
    name: "Mar 19",
    cashRevenue: 2200,
    tillRevenue: 1800,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-20",
    name: "Mar 20",
    cashRevenue: 2100,
    tillRevenue: 1700,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-21",
    name: "Mar 21",
    cashRevenue: 2000,
    tillRevenue: 1500,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-22",
    name: "Mar 22",
    cashRevenue: 2100,
    tillRevenue: 1600,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-23",
    name: "Mar 23",
    cashRevenue: 2000,
    tillRevenue: 1600,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-24",
    name: "Mar 24",
    cashRevenue: 1900,
    tillRevenue: 1500,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-25",
    name: "Mar 25",
    cashRevenue: 1800,
    tillRevenue: 1400,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-26",
    name: "Mar 26",
    cashRevenue: 1900,
    tillRevenue: 1400,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-27",
    name: "Mar 27",
    cashRevenue: 1800,
    tillRevenue: 1300,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-28",
    name: "Mar 28",
    cashRevenue: 1700,
    tillRevenue: 1300,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-29",
    name: "Mar 29",
    cashRevenue: 1600,
    tillRevenue: 1200,
    bankRevenue: 1500,
  },
  {
    date: "2024-03-30",
    name: "Mar 30",
    cashRevenue: 1500,
    tillRevenue: 1200,
    bankRevenue: 1500,
  },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const Chart: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
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
              Select Start Date:
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
            <br /> <br />
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                color: "#486c1b",
              }}
            >
              Select End Date:
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
            <br />
            <br />
            {activeTab === "Livestock & Production" ? (
              <a
                href="."
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("Livestock Report");
                }}
                style={{ color: "#486c1b" }}
              >
                <b>Livestock Report {"\u00BB"}</b>
              </a>
            ) : (
              ""
            )}
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
              dataKey="cashRevenue"
              name="Cash Revenue"
              stroke="#486c1b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="tillRevenue"
              name="Till Revenue"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="bankRevenue"
              name="Bank Revenue"
              stroke="#ff7300"
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
