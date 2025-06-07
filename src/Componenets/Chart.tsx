/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
import axios from "axios";
import { serverUrl } from "../AppConfig";

type SalesDataItem = {
  date: string;
  name: string;
  cashRevenue: number;
  tillRevenue: number;
  bankRevenue: number;
};

type ProductionDataItem = {
  date: string;
  name: string;
  livestock: number;
  production: number;
};

interface NavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

// Using Emotion CSS to match the parent component styling approach
const chartStyles = css`
  .chart-container {
    width: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, sans-serif;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 24px;
    margin-bottom: 24px;
  }

  .chart-layout {
    display: flex;
    width: 100%;
    gap: 30px;
    min-height: 480px;
  }

  .chart-sidebar {
    width: 30%;
    padding-right: 20px;
    border-right: 1px solid #eaeaea;
  }

  .chart-main {
    width: 70%;
    height: 480px;
    position: relative;
  }

  .chart-title {
    font-family: inherit;
    color: #2a61ae;
    font-size: 1.4em;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f2e9;
    letter-spacing: -0.01em;
  }

  .livestock-count {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 24px;
    border-left: 4px solid #2a61ae;
    transition: all 0.2s ease;
  }

  .livestock-count:hover {
    background-color: #f0f2e9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(72, 108, 27, 0.1);
  }

  .livestock-count p {
    color: #2a61ae;
    font-size: 1em;
    margin: 0;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .livestock-count p::after {
    content: attr(data-count);
    font-size: 1.2em;
    font-weight: 700;
  }

  .date-controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fafafa;
    padding: 20px;
    border-radius: 10px;
  }

  .date-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .date-field label {
    display: block;
    color: #2a61ae;
    font-weight: 600;
    font-size: 0.9em;
    margin-bottom: 4px;
  }

  .date-input {
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    width: 100%;
    font-size: 0.9em;
    transition: all 0.2s ease;
    color: #333;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .date-input:focus {
    outline: none;
    border-color: #2a61ae;
    box-shadow: 0 0 0 3px rgba(72, 108, 27, 0.15);
  }

  .date-input:hover {
    border-color: #2a61ae;
  }

  .chart {
    font-size: 12px;
    font-family: inherit;
  }

  /* Improve tooltip styling */
  .recharts-tooltip-wrapper .recharts-default-tooltip {
    background-color: rgba(255, 255, 255, 0.98) !important;
    border: none !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
    padding: 12px !important;
  }

  .recharts-tooltip-label {
    color: #333 !important;
    font-weight: 600 !important;
    margin-bottom: 8px !important;
    border-bottom: 1px solid #eaeaea !important;
    padding-bottom: 6px !important;
  }

  .recharts-tooltip-item {
    color: #555 !important;
    padding: 4px 0 !important;
  }

  /* Improve legend styling */
  .recharts-default-legend {
    padding: 10px !important;
    background-color: rgba(255, 255, 255, 0.8) !important;
    border-radius: 8px !important;
    margin-top: 10px !important;
  }

  .recharts-legend-item {
    margin-right: 20px !important;
  }

  /* Responsive styles */
  @media (max-width: 1200px) {
    .chart-container {
      padding: 20px;
    }
  }

  @media (max-width: 992px) {
    .chart-layout {
      flex-direction: column;
    }

    .chart-sidebar,
    .chart-main {
      width: 100%;
    }

    .chart-sidebar {
      padding-right: 0;
      padding-bottom: 24px;
      margin-bottom: 24px;
      border-right: none;
      border-bottom: 1px solid #eaeaea;
    }

    .date-controls {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .date-field {
      flex: 1;
      min-width: 200px;
    }
  }

  @media (max-width: 576px) {
    .chart-container {
      padding: 16px;
      border-radius: 8px;
    }

    .date-controls {
      flex-direction: column;
      padding: 16px;
    }

    .chart-main {
      height: 400px;
    }
  }
`;

export const Chart: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSalesData, setFilteredSalesData] = useState<SalesDataItem[]>(
    []
  );
  const [filteredProductionData, setFilteredProductionData] = useState<
    ProductionDataItem[]
  >([]);
  const [productionData, setProductionData] = useState<ProductionDataItem[]>(
    []
  );
  const [livestockCount, setLivestockCount] = useState(0);
  const [salesData, setSalesData] = useState<SalesDataItem[]>([]);

  useEffect(() => {
    // Fetch livestock production data on component mount
    fetchSalesData();
    fetchLivestockData();
  }, []); // Empty dependency array to run only on mount

  // Set initial dates based on active tab and available data
  useEffect(() => {
    if (activeTab === "Livestock & Production" && productionData.length > 0) {
      // Set dates based on production data
      if (!startDate || !endDate) {
        setStartDate(productionData[0]?.date || "");
        setEndDate(productionData[productionData.length - 1]?.date || "");
      }
    } else if (activeTab !== "Livestock & Production" && salesData.length > 0) {
      // Set dates based on sales data
      if (!startDate || !endDate) {
        setStartDate(salesData[0]?.date || "");
        setEndDate(salesData[salesData.length - 1]?.date || "");
      }
    }
  }, [activeTab, productionData, salesData, startDate, endDate]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${serverUrl}invoice/list`);

      // Map the sales data from the response
      const formattedSalesData = response.data.chartdata.map(
        (item: {
          date: string;
          cashrevenue: number | string;
          tillrevenue: number | string;
          bankrevenue: number | string;
        }) => {
          // Format the date to YYYY-MM-DD
          const date = new Date(item.date).toISOString().split("T")[0];
          // Create a formatted name for display (e.g., "Mar 01")
          const formattedDate = new Date(date);
          const name = formattedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          });

          // Convert string values to numbers for the chart
          const cashRevenue =
            typeof item.cashrevenue === "string"
              ? Number.parseFloat(item.cashrevenue.replace(/[^0-9.-]+/g, ""))
              : item.cashrevenue;

          const tillRevenue =
            typeof item.tillrevenue === "string"
              ? Number.parseFloat(item.tillrevenue.replace(/[^0-9.-]+/g, ""))
              : item.tillrevenue;

          const bankRevenue =
            typeof item.bankrevenue === "string"
              ? Number.parseFloat(item.bankrevenue.replace(/[^0-9.-]+/g, ""))
              : item.bankrevenue;

          return {
            date: date,
            name: name,
            cashRevenue: cashRevenue,
            tillRevenue: tillRevenue,
            bankRevenue: bankRevenue,
          };
        }
      );

      // Sort by date to ensure chronological order
      formattedSalesData.sort(
        (
          a: { date: string | number | Date },
          b: { date: string | number | Date }
        ) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setSalesData(formattedSalesData);

      // Initialize filtered data with all data
      if (formattedSalesData.length > 0) {
        setFilteredSalesData(formattedSalesData);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Create a separate useEffect for filtering salesData to avoid circular dependencies
  useEffect(() => {
    // Only filter sales data when we have both dates and data
    if (startDate && endDate && salesData.length > 0) {
      setFilteredSalesData(
        salesData.filter(
          (item) => item.date >= startDate && item.date <= endDate
        )
      );
    }
  }, [startDate, endDate, salesData]);

  // Create a separate useEffect for filtering productionData
  useEffect(() => {
    // Only filter production data when we have both dates and data
    if (startDate && endDate && productionData.length > 0) {
      setFilteredProductionData(
        productionData.filter(
          (item) => item.date >= startDate && item.date <= endDate
        )
      );
    }
  }, [startDate, endDate, productionData]);

  const fetchLivestockData = async () => {
    try {
      const response = await axios.get(`${serverUrl}livestock/list`);

      // Set the livestock count
      setLivestockCount(response.data.count);

      // Map the production data from the response
      const formattedProductionData = response.data.livestockProductionData.map(
        (item: { dateadded: string; production: number; count: number }) => {
          // Format the date to YYYY-MM-DD
          const date = new Date(item.dateadded).toISOString().split("T")[0];
          // Create a formatted name for display (e.g., "Mar 01")
          const formattedDate = new Date(date);
          const name = formattedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          });

          return {
            date: date,
            name: name,
            livestock: item.count,
            production: item.production,
          };
        }
      );

      // Sort by date to ensure chronological order
      formattedProductionData.sort(
        (
          a: { date: string | number | Date },
          b: { date: string | number | Date }
        ) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setProductionData(formattedProductionData);

      // Initialize filtered data with all data
      if (formattedProductionData.length > 0) {
        setFilteredProductionData(formattedProductionData);
      }
    } catch (error) {
      console.error("Error fetching livestock data:", error);
    }
  };

  // Reset dates when switching tabs
  useEffect(() => {
    // Reset dates when switching tabs to ensure they match the current data set
    if (activeTab === "Livestock & Production" && productionData.length > 0) {
      setStartDate(productionData[0]?.date || "");
      setEndDate(productionData[productionData.length - 1]?.date || "");
    } else if (activeTab !== "Livestock & Production" && salesData.length > 0) {
      setStartDate(salesData[0]?.date || "");
      setEndDate(salesData[salesData.length - 1]?.date || "");
    }
  }, [activeTab, productionData, salesData]);

  // Format currency for Y-axis
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <div css={chartStyles} className="chart-container">
      <div className="chart-layout">
        <div className="chart-sidebar">
          <h2 className="chart-title">
            {activeTab === "Livestock & Production"
              ? "Production Overview"
              : "Sales Revenue Overview"}
          </h2>
          {activeTab === "Livestock & Production" && (
            <div className="livestock-count">
              <p data-count={livestockCount}>Current Livestock Count:</p>
            </div>
          )}
          <div className="date-controls">
            <div className="date-field">
              <label htmlFor="start-date">Select Start Date:</label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                min={
                  activeTab === "Livestock & Production"
                    ? productionData.length > 0
                      ? productionData[0]?.date
                      : ""
                    : salesData.length > 0
                    ? salesData[0]?.date
                    : ""
                }
                max={endDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
            </div>
            <div className="date-field">
              <label htmlFor="end-date">Select End Date:</label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                min={startDate}
                max={
                  activeTab === "Livestock & Production"
                    ? productionData.length > 0
                      ? productionData[productionData.length - 1]?.date
                      : ""
                    : salesData.length > 0
                    ? salesData[salesData.length - 1]?.date
                    : ""
                }
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>
        </div>
        <div className="chart-main">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === "Livestock & Production" ? (
              <LineChart
                data={filteredProductionData}
                margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
                className="chart"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  height={60}
                  tick={{ fill: "#333" }}
                  tickLine={true}
                  axisLine={true}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "#333" }}
                  tickLine={true}
                  axisLine={true}
                  label={{
                    value: "Production (Litres)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#8884d8", textAnchor: "middle" },
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#333" }}
                  tickLine={true}
                  axisLine={true}
                  label={{
                    value: "Livestock Count",
                    angle: -90,
                    position: "insideRight",
                    style: { fill: "#2a61ae", textAnchor: "middle" },
                  }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "livestock") {
                      return [value, "Livestock Count"];
                    } else if (name === "production") {
                      return [value, "Total Production (Litres)"];
                    }
                    return [value, name];
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "6px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #eaeaea",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px" }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="livestock"
                  name="Livestock (count)"
                  stroke="#2a61ae"
                  strokeWidth={3}
                  yAxisId="right"
                  dot={{ r: 4, fill: "#2a61ae", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#2a61ae",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  name="Total Production (Litres)"
                  stroke="#9ecc46"
                  strokeWidth={3}
                  yAxisId="left"
                  dot={{ r: 4, fill: "#9ecc46", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#9ecc46",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            ) : (
              <LineChart
                data={filteredSalesData}
                margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
                className="chart"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  height={60}
                  tick={{ fill: "#333" }}
                  tickLine={true}
                  axisLine={true}
                />
                <YAxis
                  tick={{ fill: "#333" }}
                  tickFormatter={formatCurrency}
                  tickLine={true}
                  axisLine={true}
                  label={{
                    value: "Revenue (KES)",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#333", textAnchor: "middle" },
                  }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "cashRevenue") {
                      return [
                        `KES ${Number(value).toLocaleString()}`,
                        "Cash Revenue",
                      ];
                    } else if (name === "tillRevenue") {
                      return [
                        `KES ${Number(value).toLocaleString()}`,
                        "Till Revenue",
                      ];
                    } else if (name === "bankRevenue") {
                      return [
                        `KES ${Number(value).toLocaleString()}`,
                        "Bank Revenue",
                      ];
                    }
                    return [value, name];
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "6px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #eaeaea",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px" }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="cashRevenue"
                  name="Cash Revenue"
                  stroke="#2a61ae"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2a61ae", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#2a61ae",
                    stroke: "#fffff",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tillRevenue"
                  name="Till Revenue"
                  stroke="#9ecc46"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#9ecc46", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#9ecc46",
                    stroke: "#fffff",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bankRevenue"
                  name="Bank Revenue"
                  stroke="#040503"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#040503", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#040503",
                    stroke: "#fffff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
