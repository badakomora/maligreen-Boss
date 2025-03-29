/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Navbar } from "./Componenets/Navbar";
import { Breakdown } from "./Componenets/Breakdown";
import { Product } from "./Componenets/Product";
import { Grid } from "./Componenets/Grid";
import { Chart } from "./Componenets/Chart";
import { Block } from "./Componenets/Block";
import { Budget } from "./Componenets/Budget";
import { Form } from "./Componenets/Form";

const layoutStyles = css`
  display: flex;
  overflow: hidden;
  font-family: Monaco;
`;

const mainContentStyles = css`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: white;
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const buttonStyles = css`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 2px;
`;

const btnPrimary = css`
  ${buttonStyles}
  background: #486c1b;
  color: #ffffff;
`;

const btnSecondary = css`
  ${buttonStyles}
  background: #ffffff;
  border: solid 2px #486c1b;
  color: #486c1b;
`;

const filtersStyles = css`
  display: block;
  justify-content: space-between;
`;

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

// Function to return the component based on activeTab
const getFilteredComponent = (
  activeTab: string,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
) => {
  switch (activeTab) {
    case "Dashboard":
      return <Grid />;
    case "Sales":
      return <Chart activeTab={activeTab} setActiveTab={setActiveTab} />;
    case "Expenses & Budget":
      return <Breakdown />;
    case "Livestock & Production":
      return <Product activeTab={activeTab} setActiveTab={setActiveTab} />;
    case "Payroll":
      return <Block activeTab={activeTab} setActiveTab={setActiveTab} />;
    case "Budget":
    case "Sales Report":
      return <Budget activeTab={activeTab} />;
    case "Scheule a meeting":
      return <Form activeTab={activeTab} />;
    default:
      return <p>No data available</p>;
  }
};

function App() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div css={layoutStyles}>
      {/* Sidebar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main css={mainContentStyles}>
        <header css={headerStyles}>
          <h1 style={{ color: "#486c1b" }}>{activeTab}</h1>
          <div>
            {activeTab === "Sales" ? (
              <div
                css={css`
                  position: relative;
                  display: inline-block;

                  &:hover .tooltip-content {
                    display: block;
                  }
                `}
              >
                <span style={{ color: "#486c1b", cursor: "pointer" }}>
                  Revenue Over Time:{" "}
                  <b>
                    <big>KES800,000 </big>
                  </b>
                </span>
                <div
                  className="tooltip-content"
                  css={css`
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background-color: #ffffff;
                    border: 1px solid #486c1b;
                    color: #486c1b;
                    border-radius: 4px;
                    padding: 8px 12px;
                    z-index: 1;
                    box-shadow: 0px 0px 10px -6px #486c1b;
                    width: 300px;
                    display: none;
                  `}
                >
                  <p
                    css={css`
                      margin: 0;
                      font-size: 14px;
                    `}
                  >
                    Cash Revenue:
                    <b>
                      <big>KES60,000 </big>
                    </b>
                  </p>
                  <hr />
                  <p
                    css={css`
                      margin: 0;
                      font-size: 14px;
                    `}
                  >
                    Buy Goods 4367606 Revenue:
                    <b>
                      <big>KES210,000 </big>
                    </b>
                  </p>
                  <hr />
                  <p
                    css={css`
                      margin: 0;
                      font-size: 14px;
                    `}
                  >
                    Stanbic Bank:
                    <b>
                      <big>KES60,000 </big>
                    </b>
                  </p>
                </div>
              </div>
            ) : activeTab === "Expenses & Budget" ? (
              <select
                css={btnSecondary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Budget");
                  }
                }}
              >
                <option value=""> Receipts Breakdown</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : activeTab === "Livestock & Production" ? (
              <span style={{ color: "#486c1b" }}>
                Production Over Time:
                <b>
                  <big>300000 Litres </big>
                </b>
              </span>
            ) : activeTab === "Payroll" ? (
              <span style={{ color: "#486c1b" }}>
                Current Monthly Salary:{" "}
                <b>
                  <big>KES30,0000</big>
                </b>
              </span>
            ) : activeTab === "Budget" ? (
              <select
                css={btnSecondary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Budget");
                  }
                }}
              >
                <option value="">Action</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : (
              <button
                css={btnSecondary}
                onClick={() => setActiveTab("Scheule a meeting")}
              >
                Schedule a meeting
              </button>
            )}

            {/* //second button */}

            {activeTab === "Sales" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Sales Report");
                  }
                }}
              >
                <option value=""> Sales Report</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : activeTab === "Expenses & Budget" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Budget");
                  }
                }}
              >
                <option value=""> Budgets</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : activeTab === "Livestock & Production" ? (
              <>
                <select
                  css={btnPrimary}
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    if (e.target.value) {
                      setActiveTab("Budget");
                    }
                  }}
                >
                  <option value="">Production Report</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </>
            ) : activeTab === "Payroll" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Budget");
                  }
                }}
              >
                <option value="">Monthly Payrolls</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : activeTab === "Budget" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Budget");
                  }
                }}
              >
                <option value="">Approved Budgets</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setActiveTab("Budget");
                  }
                }}
              >
                <option value=""> Profit and Loss Report</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </header>

        {/* Filters */}
        <div css={filtersStyles}>
          {getFilteredComponent(activeTab, setActiveTab)}
        </div>
      </main>
    </div>
  );
}

export default App;
// shop home https://codepen.io/TurkAysenur/pen/gORaboY
