/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Navbar } from "./Componenets/Navbar";
import { Table } from "./Componenets/Table";

const layoutStyles = css`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const mainContentStyles = css`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #f9f9f9;
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
  color: white;
`;

const btnSecondary = css`
  ${buttonStyles}
  background: #3498db;
  color: white;
`;

const filtersStyles = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  select {
    padding: 0.5rem;
    border-radius: 8px;
  }

  input {
    width: 50%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
`;





function App() {
  return (
    <div css={layoutStyles}>
      {/* Sidebar */}
     <Navbar />

      {/* Main Content */}
      <main css={mainContentStyles}>
        <header css={headerStyles}>
          <h1>Dashboard</h1>
          <div>
            <button css={btnPrimary}>+ New Customer</button>
            <button css={btnSecondary}>+ create Invoice</button>
          </div>
        </header>

        {/* Filters */}
        <div css={filtersStyles}>
          <select>
            <option value="all">ALL Reports</option>
            <option value="en-cours">Profit & Loss</option>
            <option value="a-faire">Sales and Marketing</option>
            <option value="terminé">Progress</option>
          </select>
          {/* <input type="text" placeholder="Rechercher..." /> */}
        </div>

        {/* Tasks */}
       <Table />
      </main>
    </div>
  );
}

export default App;
// https://codepen.io/Kcreation-MTech/pen/zYgQVwK
// https://codepen.io/leonam-silva-de-souza/pen/MWNbyZJ
// https://codepen.io/alreylz/pen/XWLvRpM