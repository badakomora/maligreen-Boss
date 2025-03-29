/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  container: css`
    font-family: "Lato", sans-serif;
    background: #ffffff;
    padding: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  `,
  section: css`
    border: 2px solid #486c1b;
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px -6p #486c1b;
  `,
  headerContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  header: css`
    font-family: "Raleway", sans-serif;
    font-weight: bold;
    margin: 0;
    text-align: right;
    @media (max-width: 600px) {
      text-align: left;
      margin-top: 1rem;
    }
  `,
  spanFirst: css`
    font-size: 0.9em;
    color: #486c1b;
    display: block;
    margin-bottom: 0.3rem;
  `,
  spanLast: css`
    font-size: 1.4em;
    color: #486c1b;
    display: block;
  `,
  tableWrap: css`
    overflow-x: auto;
    margin-bottom: 1.5rem;
  `,
  table: css`
    border-collapse: collapse;
    width: 100%;
    background: white;
    margin-bottom: 1.5rem;
    table-layout: fixed;
  `,
  caption: css`
    color: #486c1b;
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;
    padding: 0.5rem 0;
    border-bottom: 2px solid #486c1b;
  `,
  thead: css`
    background: #486c1b;
    th {
      padding: 0.85rem 1rem;
      text-align: left;
      border-bottom: 2px solid #ffffff;
      color: #ffffff;
      font-weight: 600;
    }
    th:first-of-type {
      width: 70%;
    }
    th:last-of-type {
      width: 30%;
      text-align: right;
    }
  `,
  tbody: css`
    td,
    th {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #486c1b;
      color: #486c1b;
      background: white;
    }
    th {
      text-align: left;
      font-weight: normal;
    }
    td {
      text-align: right;
    }
    tr:hover {
      background-color: #486c1b;
    }
    tr:last-child td,
    tr:last-child th {
      border-bottom: none;
    }
  `,
  summaryText: css`
    margin: 0.75rem 0;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;

    b {
      font-weight: 700;
      font-size: 1.1rem;
    }
  `,
  summaryContainer: css`
    background: #486c1b;
    color: #ffffff;
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1rem;
  `,
  importantRow: css`
    font-weight: bold;
    background-color: #486c1b;
  `,
};

interface NavbarProps {
  activeTab: string;
}

export const Budget: React.FC<NavbarProps> = ({ activeTab }) => {
  const farmMetrics = {
    herdMetrics: [
      { name: "Total Goat Count", value: "5,000", important: true },
      { name: "Lactating Goats", value: "2,039", important: true },
      { name: "Kids Count", value: "8,457" },
      { name: "Pregnant Goats", value: "457" },
      { name: "Bucks", value: "457" },
      { name: "Breeds", value: "1,209" },
    ],
    healthStatus: [
      { name: "Healthy", value: "457", important: true },
      { name: "Sick Goats", value: "400" },
      { name: "Under Treatment", value: "5,000" },
      { name: "Recovering", value: "2,039" },
      { name: "Injured", value: "8,457" },
      {
        name: "Total Deceased Goats",
        value: "1,000",
        note: "High priority",
        important: true,
      },
    ],
  };

  const itemsRequired = {
    General: [
      { name: "Total Revenue", value: "300000", important: true },
      { name: "Total Units Sold", value: "25000", important: true },
      { name: "Gross Profit", value: "3000" },
      { name: "Net ProfitAverage Order Value (AOV)", value: "5000" },
      { name: "Sales Growth ", value: "100" },
    ],
    farm: [
      { name: "Dairy Meal", value: "250000", important: true },
      { name: "Goat Salt", value: "12000" },
      { name: "Mollusses", value: "50000" },
      { name: "Dog Meal", value: "2,039" },
    ],
  };

  // Format currency values consistently
  const formatCurrency = (value: string) => {
    // Remove commas and convert to number
    const numValue = Number(value.replace(/,/g, ""));
    // Format with commas
    return numValue.toLocaleString();
  };

  return (
    <main css={styles.container}>
      <section css={styles.section}>
        <div css={styles.headerContainer}>
          <img src="/2.png" alt="Company Logo" width="200px" height="80px" />
          <h1 css={styles.header}>
            <span css={styles.spanFirst}>March 2025</span>
            {activeTab === "Budget" ? (
              <span css={styles.spanLast}>Monthly Budget</span>
            ) : activeTab === "Receipt Breakdown" ? (
              <span css={styles.spanLast}>Receipt Breakdown</span>
            ) : activeTab === "Production Report" ? (
              <span css={styles.spanLast}>Monthly Production</span>
            ) : activeTab === "Sales Report" ? (
              <span css={styles.spanLast}>Monthly Report</span>
            ) : (
              <span css={styles.spanLast}>Payroll Report</span>
            )}
          </h1>
        </div>

        <div css={styles.tableWrap}>
          {activeTab === "Livestock Report" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>Herd Metrics</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>No.</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {farmMetrics.herdMetrics.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Health Status</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>No.</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {farmMetrics.healthStatus.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : activeTab === "Receipt Breakdown" ? (
            <>
              <h2 style={{ color: " #486c1b" }}>
                Receipt KES 435,876 (23/3/2025) Breakdown
              </h2>
              <table css={styles.table}>
                <caption css={styles.caption}>General Expenses</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.General.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Farm Operations</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <p css={styles.summaryText}>
                  <span>Funding:</span>
                  <b>KES 435,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Surplus:</span>
                  <b>KES 35,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>KES 35,876</b>
                </p>
              </div>
            </>
          ) : activeTab === "Production Report" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>
                  January 2025 Production Report
                </caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.General.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Farm Operations</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <p css={styles.summaryText}>
                  <span>Funding:</span>
                  <b>KES 435,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Surplus:</span>
                  <b>KES 35,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>KES 35,876</b>
                </p>
              </div>
            </>
          ) : activeTab === "Sales Report" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>
                  January 2025 Sales Report
                </caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.General.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Farm Operations</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <p css={styles.summaryText}>
                  <span>Funding:</span>
                  <b>KES 435,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Surplus:</span>
                  <b>KES 35,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>KES 35,876</b>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: " #486c1b" }}>January 2025 Payroll Report</h2>
              <table css={styles.table}>
                <caption css={styles.caption}>General Requirements</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.General.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Farm Operations</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <p css={styles.summaryText}>
                  <span>Total Budget:</span>
                  <b>KES 35,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Surplus:</span>
                  <b>KES 35,876</b>
                </p>
                <p css={styles.summaryText}>
                  <span>Total Funding:</span>
                  <b>KES 35,876</b>
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};
