/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  container: css`
    font-family: "Lato", sans-serif;
    background: #ffffff;
    width: 95%;
    margin: auto;
  `,
  section: css`
    border: 2px solid #486c1b;
    background: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(72, 108, 27, 0.2);
  `,
  headerContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  header: css`
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    margin: 0;
    text-align: right;
    @media (max-width: 768px) {
      text-align: left;
      margin-top: 1rem;
    }
  `,
  spanFirst: css`
    font-size: 1em;
    color: #486c1b;
    display: block;
    margin-bottom: 0.5rem;
  `,
  spanLast: css`
    font-size: 1.6em;
    color: #486c1b;
    display: block;
    font-weight: 800;
  `,
  tableWrap: css`
    overflow-x: auto;
    margin-bottom: 2rem;
    width: 100%;
    border-radius: 8px;
  `,
  table: css`
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    background: #ffffff;
    margin-bottom: 2rem;
    table-layout: fixed;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #486c1b;
  `,
  caption: css`
    color: #486c1b;
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;
    padding: 0.5rem 0;
    border-bottom: 2px solid #486c1b;
  `,
  thead: css`
    background: #486c1b;
    th {
      padding: 1rem 1.25rem;
      text-align: left;
      color: #ffffff;
      font-weight: 600;
      font-size: 1.05rem;
    }
    th:last-child {
      text-align: right;
    }
  `,
  tbody: css`
    td,
    th {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #486c1b;
      color: #486c1b;
      background: #ffffff;
    }
    th {
      text-align: left;
      font-weight: 500;
    }
    td:last-child {
      text-align: right;
      font-weight: 600;
    }
    tr:hover td,
    tr:hover th {
    }
    tr:last-child td,
    tr:last-child th {
      border-bottom: none;
    }
  `,
  summaryText: css`
    margin: 1rem 0;
    font-size: 1.05rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #486c1b;

    b {
      font-weight: 700;
      font-size: 1.15rem;
    }
  `,
  summaryContainer: css`
    color: #486c1b;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    background: #ffffff;
    // border: 1px solid #486c1b;

    h2 {
      margin-top: 0;
      font-size: 1.4rem;
      font-weight: 700;
    }
  `,
  importantRow: css`
    font-weight: bold;

    td,
    th {
      color: #486c1b;
      font-weight: 700;
    }

    &:hover td,
    &:hover th {
      color: #486c1b !important;
      font-weight: bold;
      opacity: 0.9;
    }
  `,
};
interface NavbarProps {
  activeTab: string;
}

export const Budget: React.FC<NavbarProps> = ({ activeTab }) => {
  const farmMetrics = {
    herdMetrics: [
      {
        name: "Initial Goat Stock (2/4/2025)",
        value: "8,000",
        important: true,
      },
      { name: "Second Goat Stock (2/4/2025)", value: "8,000", important: true },
      { name: "Lactating Goats", value: "2,039", important: true },
      { name: "Kids Count", value: "8,457" },
      { name: "Pregnant Goats", value: "457" },
      { name: "Bucks", value: "457" },
      { name: "Breeds", value: "1,209" },
      { name: "Total Goat Count", value: "5,000", important: true },
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
      { name: "Salaries", value: "300000", important: true },
      { name: "Kitchen Shopping", value: "25000", important: true },
      { name: "WIFI Bill", value: "3000" },
      { name: "Electricity Bill", value: "5000" },
      { name: "Miscellaneous", value: "10,000" },
    ],
    farm: [
      { name: "Dairy Meal", value: "250000", important: true },
      { name: "Goat Salt", value: "12000" },
      { name: "Mollusses", value: "50000" },
      { name: "Dog Meal", value: "2,039" },
    ],
  };

  const financials = [
    {
      item: "Funding",
      value: "500,345",
      important: true,
    },
    {
      item: "Cost of Goods Sold (COGS)",
      value: "500,345",
    },
    {
      item: "Operating Expenses(OPEX)",
      value: "500,345",
    },
    {
      item: "Other Income & Expenses",
      value: "500,345",
    },
  ];

  const sales = [
    {
      item: "Cash Revenue",
      value: "500,345",
      important: true,
    },
    {
      item: "Buy Goods Revenue",
      value: "500,345",
      important: true,
    },
    {
      item: "Stanbic Bank Revenue",
      value: "500,345",
      important: true,
    },
    {
      item: "Unit Sold",
      value: "500,345",
    },
    {
      item: "Trends (Month-over-Month)",
      value: `50% \u2191`,
    },
  ];

  const salaries = [
    {
      name: "Andrew Bada",
      designation: "Administrator",
      allowance: "300000",
      salary: "200000",
    },
    {
      name: "Andrew Bada",
      designation: "Administrator",
      allowance: "300000",
      salary: "200000",
    },
    {
      name: "Andrew Bada",
      designation: "Administrator",
      allowance: "300000",
      salary: "200000",
    },
    {
      name: "Andrew Bada",
      designation: "Administrator",
      allowance: "300000",
      salary: "200000",
    },
    {
      name: "Andrew Bada",
      designation: "Administrator",
      allowance: "300000",
      salary: "200000",
    },
    {
      name: "Andrew Bada",
      designation: "Administrator",
      allowance: "300000",
      salary: "200000",
    },
  ];

  const recipts = {
    General: [
      { name: "Electricity Bill", value: "300000", important: true },
      { name: "Kitchen Shopping", value: "25000", important: true },
      { name: "WIFI Bill", value: "3000" },
      { name: "Electricity Bill", value: "5000" },
      { name: "Miscellaneous", value: "10,000" },
    ],
    farm: [
      { name: "Dairy Meal", value: "250000", important: true },
      { name: "Goat Salt", value: "12000" },
      { name: "Mollusses", value: "50000" },
      { name: "Dog Meal", value: "2,039" },
    ],
  };

  const production = [
    { date: "1/2/2025", morning: "300000", evening: "2000" },
    { date: "1/2/2025", morning: "300000", evening: "2000" },
    { date: "1/2/2025", morning: "300000", evening: "2000" },
    { date: "1/2/2025", morning: "300000", evening: "2000" },
    { date: "1/2/2025", morning: "300000", evening: "2000" },
    { date: "1/2/2025", morning: "300000", evening: "2000" },
    { date: "1/2/2025", morning: "300000", evening: "2000" },
  ];

  return (
    <main css={styles.container}>
      <section css={styles.section}>
        <div css={styles.headerContainer}>
          <img src="/2.png" alt="Company Logo" width="200px" height="80px" />
          <h4 css={styles.header}>
            {activeTab === "Profit & Loss" ? (
              <>
                <span css={styles.spanFirst}>March 2025</span>
                <span css={styles.spanLast}>Profit & Loss Report</span>
              </>
            ) : activeTab === "Sales Report" ? (
              <>
                <span css={styles.spanFirst}>March 2025</span>
                <span css={styles.spanLast}>Sales Report</span>
              </>
            ) : activeTab === "Budget" ? (
              <>
                <span css={styles.spanFirst}>March 2025</span>
                <span css={styles.spanLast}>Monthly Budget</span>
              </>
            ) : activeTab === "Receipt Breakdown" ? (
              <>
                <span css={styles.spanFirst}>13/3/2025</span>
                <span css={styles.spanLast}>Receipt KES 435,876 Breakdown</span>
              </>
            ) : activeTab === "Livestock Report" ? (
              <>
                <span css={styles.spanFirst}>March 2025</span>
                <span css={styles.spanLast}>Livestock Report</span>
              </>
            ) : activeTab === "Production Report" ? (
              <>
                <span css={styles.spanFirst}>March 2025</span>
                <span css={styles.spanLast}>Production Report</span>
              </>
            ) : (
              <>
                <span css={styles.spanFirst}>March 2025</span>
                <span css={styles.spanLast}>Payroll Report</span>
              </>
            )}
          </h4>
        </div>

        <div css={styles.tableWrap}>
          {activeTab === "Profit & Loss" ? (
            <>
              <table css={styles.table}>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {financials.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.item}</th>
                      <td>KES{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <h2>P&L Report Summary</h2>
                <hr style={{ border: "1px dotted #486c1b" }} />
                <p css={styles.summaryText}>
                  <span>Gross Profit:</span>
                  <b>KES 500,000</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Operating Profit:</span>
                  <b>KES 259,598</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Net Profit:</span>
                  <b>KES 43,587</b>
                </p>

                <hr style={{ border: "1px dotted #486c1b" }} />
              </div>
            </>
          ) : activeTab === "Sales Report" ? (
            <>
              <table css={styles.table}>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {sales.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.item}</th>
                      <td>KES{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <h2>Sales Summary</h2>
                <hr style={{ border: "1px dotted #486c1b" }} />
                <p css={styles.summaryText}>
                  <span>Profit(Month-over-Month):</span>
                  <b>KES 500,000</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Sales Revenue:</span>
                  <b>KES 43,587</b>
                </p>

                <hr style={{ border: "1px dotted #486c1b" }} />
              </div>
            </>
          ) : activeTab === "Livestock Report" ? (
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
                      <td>{item.value}</td>
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
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : activeTab === "Receipt Breakdown" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>Utilities & Services</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {recipts.General.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Consumables & Supplies</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Equipment & Maintenance</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>
                  Salaries & Operational Costs
                </caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <h2>Receipt Summary</h2>
                <hr style={{ border: "1px dotted #486c1b" }} />
                <p css={styles.summaryText}>
                  <span>Receipt Funding:</span>
                  <b>KES 500,000</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Expenses:</span>
                  <b>KES 259,598</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>KES 43,587</b>
                </p>

                <hr style={{ border: "1px dotted #486c1b" }} />
              </div>
            </>
          ) : activeTab === "Production Report" ? (
            <>
              <table css={styles.table}>
                <thead css={styles.thead}>
                  <tr>
                    <th>Date</th>
                    <th>Morning Production</th>
                    <th>Evening Production</th>
                    <th>Total Production</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {production.map((item, i) => (
                    <tr key={i}>
                      <th>{item.date}</th>
                      <td>{item.morning} Litres</td>
                      <td>{item.evening} Litres</td>
                      <td>50000 Litres</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div css={styles.summaryContainer}>
                <h2>Production Summary</h2>
                <hr style={{ border: "1px dotted #486c1b" }} />
                <p css={styles.summaryText}>
                  <span>Total Morning Production:</span>
                  <b>43587 Litres</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Evening Production:</span>
                  <b>43587 Litres</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Production:</span>
                  <b>43587 Litres</b>
                </p>

                <hr style={{ border: "1px dotted #486c1b" }} />
              </div>
            </>
          ) : activeTab === "Budget" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>Utilities & Services</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {recipts.General.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>KES{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Consumables & Supplies</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>KES{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Equipment & Maintenance</caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>KES{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>
                  Salaries & Operational Costs
                </caption>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {itemsRequired.farm.map((item, i) => (
                    <tr
                      key={i}
                      css={item.important ? styles.importantRow : undefined}
                    >
                      <th>{item.name}</th>
                      <td>KES{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <h2>Budget Summary</h2>
                <hr style={{ border: "1px dotted #486c1b" }} />
                <p css={styles.summaryText}>
                  <span>Budget Funding:</span>
                  <b>KES 500,000</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>KES 43,587</b>
                </p>

                <hr style={{ border: "1px dotted #486c1b" }} />
              </div>
            </>
          ) : (
            <>
              <table css={styles.table}>
                <thead css={styles.thead}>
                  <tr>
                    <th>Details</th>
                    <th>Designation</th>
                    <th>Allowances </th>
                    <th>Basic Salary</th>
                  </tr>
                </thead>
                <tbody css={styles.tbody}>
                  {salaries.map((item, i) => (
                    <tr key={i}>
                      <th>{item.name}</th>
                      <td>{item.designation}</td>
                      <td>KES{item.allowance}</td>
                      <td>KES{item.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <h2>Payroll Summary</h2>
                <hr style={{ border: "1px dotted #486c1b" }} />
                <p css={styles.summaryText}>
                  <span>Sallaries:</span>
                  <b>KES 500,000</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Allowances:</span>
                  <b>KES 43,587</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Funding:</span>
                  <b>KES 503,587</b>
                </p>

                <hr style={{ border: "1px dotted #486c1b" }} />
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};
