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

const projectsSectionStyles = css`
  margin-bottom: 2rem;
`;

const projectListStyles = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const projectCardStyles = css`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(50% - 1rem);
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
          <input type="text" placeholder="Rechercher..." />
        </div>

        {/* Projects */}
        <section css={projectsSectionStyles}>
          <h2>Projets</h2>
          <div css={projectListStyles}>
            <div css={projectCardStyles}>
              <h3>Migration Serveur</h3>
              <p><strong>Responsable :</strong> Alice</p>
              <p><strong>Statut :</strong> En cours</p>
              <p><strong>Date limite :</strong> 25/11/2024</p>
            </div>
            <div css={projectCardStyles}>
              <h3>Développement Application</h3>
              <p><strong>Responsable :</strong> Bob</p>
              <p><strong>Statut :</strong> À faire</p>
              <p><strong>Date limite :</strong> 30/11/2024</p>
            </div>
          </div>
        </section>

        {/* Tasks */}
       <Table />
      </main>
    </div>
  );
}

export default App;
// https://codepen.io/Kcreation-MTech/pen/zYgQVwK