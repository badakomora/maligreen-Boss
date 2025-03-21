/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Navbar } from "./Componenets/Navbar";
import { Breakdown } from "./Componenets/Breakdown";
import { Product } from "./Componenets/Product";
import { Grid } from "./Componenets/Grid";
import { Data } from "./Componenets/Data";
import { Chart } from "./Componenets/Chart";
import { Block } from "./Componenets/Block";
import { Budget } from "./Componenets/Budget";

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
const getFilteredComponent = (activeTab: string) => {
  switch (activeTab) {
    case "Dashboard":
      return <Grid />;
    case "Sales":
      return (
        <>
          <Chart activeTab={activeTab} />
          <Data />
        </>
      );
    case "Expenses & Budget":
      return <Breakdown />;
    case "Livestock & Production":
      return <Product activeTab={activeTab} />;
    case "Payroll":
      return <Block />;
      case "Budget":
        return <Budget />;
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
            {activeTab === "Sales" ? <span style={{color:"#486c1b"}}>Revenue Overtime: <b><big>KES300,000</big></b></span> : activeTab === "Expenses & Budget" ? <select
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
</select> : activeTab === "Livestock & Production" ?  <span style={{color:"#486c1b"}}>Production Overtime: <b><big>300000 Litres</big></b></span> : activeTab === "Payroll" ?  <span style={{color:"#486c1b"}}>Current Monthly    Salary: <b><big>KES30,0000</big></b></span> : 
activeTab === "Budget" ?  <select
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
            </select> : <button css={btnSecondary}>Schedule a meeting</button> }          
            
            
            
            
            
            




            {/* //second button */}
            
            {activeTab === "Sales" ?  <select
              css={btnPrimary}
              value={selectedMonth}
               onChange={(e) => {
    setSelectedMonth(e.target.value);
    if (e.target.value) {
      setActiveTab("Budget");
    }
  }}
            >
              <option value=""> Sales Report</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select> : activeTab === "Expenses & Budget" ? <select
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
            </select>  : activeTab === "Livestock & Production" ?  <select
              css={btnPrimary}
              value={selectedMonth}
               onChange={(e) => {
    setSelectedMonth(e.target.value);
    if (e.target.value) {
      setActiveTab("Budget");
    }
  }}
            >
              <option value="">Livestock & Production Report</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select> : activeTab === "Payroll" ?  <select
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
            </select> : activeTab === "Budget" ?  <select
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
            </select> : <select
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
 }   
          </div>
        </header>

        {/* Filters */}
        <div css={filtersStyles}>{getFilteredComponent(activeTab)}</div>
      </main>
    </div>
  );
}

export default App;
