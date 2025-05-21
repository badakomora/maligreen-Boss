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
import { serverUrl } from "../AppConfig";
import axios from "axios";

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
  }

  .chart-layout {
    display: flex;
    width: 100%;
    gap: 20px;
    min-height: 480px;
  }

  .chart-sidebar {
    width: 30%;
    padding-right: 20px;
  }

  .chart-main {
    width: 70%;
    height: 480px;
  }

  .chart-title {
    font-family: inherit;
    color: #486c1b;
    font-size: 1.3em;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eaeaea;
  }

  .livestock-count {
    background-color: #f8f9fa;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 20px;
  }

  .livestock-count p {
    color: #486c1b;
    font-size: 0.9em;
    margin: 0;
    font-weight: 600;
  }

  .date-controls {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .date-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .date-field label {
    display: block;
    color: #486c1b;
    font-weight: 500;
    font-size: 0.85em;
  }

  .date-input {
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #d0d5dd;
    width: 100%;
    font-size: 0.85em;
    transition: all 0.2s ease;
    color: #333;
    background-color: #fff;
  }

  .date-input:focus {
    outline: none;
    border-color: #486c1b;
    box-shadow: 0 0 0 2px rgba(72, 108, 27, 0.1);
  }

  .date-input:hover {
    border-color: #486c1b;
  }

  .chart {
    font-size: 12px;
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
      padding-bottom: 16px;
      margin-bottom: 16px;
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

          return {
            date: date,
            name: name,
            cashRevenue: "KES " + item.cashrevenue.toLocaleString(),
            tillRevenue: "KES " + item.tillrevenue.toLocaleString(),
            bankRevenue: "KES " + item.bankrevenue.toLocaleString(),
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

  // 3. Create a separate useEffect for filtering salesData to avoid circular dependencies
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

  // 4. Create a separate useEffect for filtering productionData
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
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
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
              <p>Current Livestock Count: {livestockCount}</p>
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
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                syncId="productionChart"
                className="chart"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" height={60} tick={{ fill: "#333" }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#486c1b"
                  domain={[0, "dataMax + 10"]}
                  label={{
                    value: "Livestock Count",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#486c1b",
                    fontSize: 12,
                  }}
                  tick={{ fill: "#486c1b" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#8884d8"
                  domain={[0, "dataMax + 5"]}
                  label={{
                    value: "Production",
                    angle: 90,
                    position: "insideRight",
                    fill: "#8884d8",
                    fontSize: 12,
                  }}
                  tick={{ fill: "#8884d8" }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "livestock") {
                      return [value, "Livestock Count"];
                    } else if (name === "production") {
                      return [value, "Total Production"];
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
                  yAxisId="left"
                  type="monotone"
                  dataKey="livestock"
                  name="Livestock (count)"
                  stroke="#486c1b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#486c1b", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#486c1b",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="production"
                  name="Total Production (Litres)"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8884d8", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#8884d8",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            ) : (
              <LineChart
                data={filteredSalesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                className="chart"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" height={60} tick={{ fill: "#333" }} />
                <YAxis tick={{ fill: "#333" }} />
                <Tooltip
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
                  stroke="#486c1b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#486c1b", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#486c1b",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tillRevenue"
                  name="Till Revenue"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8884d8", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#8884d8",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bankRevenue"
                  name="Bank Revenue"
                  stroke="#ff7300"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ff7300", strokeWidth: 1 }}
                  activeDot={{
                    r: 7,
                    fill: "#ff7300",
                    stroke: "#fff",
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
