/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Navbar } from "./Componenets/Navbar";
import { Breakdown } from "./Componenets/Breakdown";
// import { Grid } from "./Componenets/Grid";
// import { Data } from "./Componenets/Data";
// import { Chart } from "./Componenets/Chart";
// import { Budget } from "./Componenets/Budget";

const layoutStyles = css`
  display: flex;
 
  overflow: hidden;
  font-family:Monaco;
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
  margin-bottom: 1rem;
  margin-top:50px;

  select {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
    color: #486c1b;
  }
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

function App() {
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <div css={layoutStyles}>
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main css={mainContentStyles}>
        <header css={headerStyles}>
          <h1 style={{ color: "#486c1b" }}>Dashboard</h1>
          <div>
            <select
              css={btnPrimary}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">Generate Profit and Loss Report</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <button css={btnSecondary}>View Report</button>
          </div>
        </header>

        {/* Filters */}
        <div css={filtersStyles}>
          {/* <Grid />
          <Data />
          <Chart /> */}
          <Breakdown />
          {/* <Budget />  */}
        </div>
      </main>
    </div>
  );
}

export default App;
// https://codepen.io/Kcreation-MTech/pen/zYgQVwK
// https://codepen.io/leonam-silva-de-souza/pen/MWNbyZJ
// https://codepen.io/alreylz/pen/XWLvRpM


// add expense https://codepen.io/click4manoj/pen/RwpdNqy