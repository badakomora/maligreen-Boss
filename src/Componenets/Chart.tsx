/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { serverUrl } from "../AppConfig"
import axios from "axios"

type SalesDataItem = {
  date: string
  name: string
  cashRevenue: number
  tillRevenue: number
  bankRevenue: number
}

type ProductionDataItem = {
  date: string
  name: string
  livestock: number
  production: number
}

// Sales data from one endpoint
const salesData: SalesDataItem[] = [
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
]

interface NavbarProps {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

// Using Emotion CSS to match the parent component styling approach
const chartStyles = css`
  .chart-container {
    width: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
`

export const Chart: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [filteredSalesData, setFilteredSalesData] = useState<SalesDataItem[]>([])
  const [filteredProductionData, setFilteredProductionData] = useState<ProductionDataItem[]>([])
  const [productionData, setProductionData] = useState<ProductionDataItem[]>([])
  const [livestockCount, setLivestockCount] = useState(0)

  useEffect(() => {
    // Fetch livestock production data on component mount
    fetchLivestockData()
  }, [])

  useEffect(() => {
    // Only filter data when we have both dates and data
    if (startDate && endDate && salesData.length > 0) {
      setFilteredSalesData(salesData.filter((item) => item.date >= startDate && item.date <= endDate))
    }

    if (startDate && endDate && productionData.length > 0) {
      setFilteredProductionData(productionData.filter((item) => item.date >= startDate && item.date <= endDate))
    }
  }, [startDate, endDate, productionData])

  // Add a new useEffect to set initial dates when productionData is loaded
  useEffect(() => {
    if (productionData.length > 0) {
      // Set default dates from the production data if not already set
      if (!startDate) {
        setStartDate(productionData[0]?.date || "")
      }
      if (!endDate) {
        setEndDate(productionData[productionData.length - 1]?.date || "")
      }
    }
  }, [endDate, productionData, startDate])

  const fetchLivestockData = async () => {
    try {
      const response = await axios.get(`${serverUrl}livestock/list`)

      // Set the livestock count
      setLivestockCount(response.data.count)

      // Map the production data from the response
      const formattedProductionData = response.data.livestockProductionData.map(
        (item: { dateadded: string; production: number; count: number }) => {
          // Format the date to YYYY-MM-DD
          const date = new Date(item.dateadded).toISOString().split("T")[0]
          // Create a formatted name for display (e.g., "Mar 01")
          const formattedDate = new Date(date)
          const name = formattedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          })

          return {
            date: date,
            name: name,
            livestock: Number(item.count) || 0,
            production: Number(item.production) || 0,
          }
        },
      )

      // Sort by date to ensure chronological order
      formattedProductionData.sort(
        (a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )

      setProductionData(formattedProductionData)

      // Initialize filtered data with all data
      if (formattedProductionData.length > 0) {
        setFilteredProductionData(formattedProductionData)
      }
    } catch (error) {
      console.error("Error fetching livestock data:", error)
    }
  }

  return (
    <div css={chartStyles} className="chart-container">
      <div className="chart-layout">
        <div className="chart-sidebar">
          <h2 className="chart-title">
            {activeTab === "Livestock & Production" ? "Production Overview" : "Sales Revenue Overview"}
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
                min={productionData.length > 0 ? productionData[0]?.date : ""}
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
                max={productionData.length > 0 ? productionData[productionData.length - 1]?.date : ""}
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
                  label={{ value: "Production", angle: 90, position: "insideRight", fill: "#8884d8", fontSize: 12 }}
                  tick={{ fill: "#8884d8" }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    return [value, name === "livestock" ? "Livestock Count" : "Total Production"]
                  }}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "6px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #eaeaea",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="livestock"
                  name="Livestock (count)"
                  stroke="#486c1b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#486c1b", strokeWidth: 1 }}
                  activeDot={{ r: 7, fill: "#486c1b", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="production"
                  name="Total Production"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8884d8", strokeWidth: 1 }}
                  activeDot={{ r: 7, fill: "#8884d8", stroke: "#fff", strokeWidth: 2 }}
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
                <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="cashRevenue"
                  name="Cash Revenue"
                  stroke="#486c1b"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#486c1b", strokeWidth: 1 }}
                  activeDot={{ r: 7, fill: "#486c1b", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="tillRevenue"
                  name="Till Revenue"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#8884d8", strokeWidth: 1 }}
                  activeDot={{ r: 7, fill: "#8884d8", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="bankRevenue"
                  name="Bank Revenue"
                  stroke="#ff7300"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ff7300", strokeWidth: 1 }}
                  activeDot={{ r: 7, fill: "#ff7300", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
