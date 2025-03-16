/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const styles = {
  specialMenu: css`
    margin: 50px 0;
  `,
  container: css`
    width: 100%;
  `,
  rowdiv: css`
    margin-top: 70px;
    display: block;
  `,
  row: css`
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
  `,
  specialCard: css`
    width: 100%;
    max-width: 400px;
    background: white;
    text-align: center;
    ul {
      padding: 0;
      list-style: none;
      text-align: left;
    }
    li {
      font-size: 15px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
       color: #486c1b;
    }
    .amount-note {
      display: flex;
      gap: 15px;
      min-width: 180px;
      justify-content: flex-end;
      text-align: right;
    }
    .amount-note span:first-of-type {
      flex: 1;
      text-align: right;
      min-width: 100px;
    }
    .total {
      border-top: 1px dotted #333;
      margin-top: 12px;
      padding-top: 5px;
      font-weight: bold;
    }
  `,
  importantItem: css`
    .note {
      font-size: 15px !important;
      color:  #ffffff; !important;
      font-weight: 500;
    }
    background-color:  #486c1b;
     color:  #ffffff !important;
    padding: 5px;
    border-radius: 4px;
  `,
}

const dailyMenuItems = [
  {
    items: [
      { name: "Last Replenishment", price: "KES450,000", note: "Recent restock" },
      { name: "Running Balance", price: "KES120,309", note: "Available funds", important: true },
      { name: "Current Budget", price: "KES378,457", note: "Allocated budget" },
      { name: "Total Expense", price: "KES478,457", note: "All expenditures" },
    ],
    total: "KES378,457",
  },
  {
    items: [
      { name: "Unexpected Cost", price: "KES450,000", note: "Emergency expense" },
      { name: "Biggest Expense", price: "KES120,309", note: "Highest cost item" },
      { name: "Urgent Risks", price: "KES300,000", note: "High priority", important: true },
      { name: "Exceeding budget", price: "KES478,457", note: "Overspending alert" },
    ],
    total: "KES378,457",
  },
]

const overtimeMenuItems = [
  {
    items: [
      { name: "Total Overtime Costs", price: "KES2,450,000", note: "All-time expenses" },
      { name: "Budget Allocation", price: "KES3,120,309", note: "Total funding" },
      { name: "Remaining Balance", price: "KES670,309", note: "Available funds", important: true },
      { name: "Monthly Average", price: "KES178,457", note: "Typical spending" },
    ],
    total: "KES670,309",
  },
  {
    items: [
      { name: "Q1 Overtime Trend", price: "KES550,000", note: "Jan-Mar total" },
      { name: "Q2 Overtime Trend", price: "KES620,309", note: "Apr-Jun total" },
      { name: "Q3 Overtime Trend", price: "KES700,000", note: "Jul-Sep total", important: true },
      { name: "Q4 Overtime Trend", price: "KES580,457", note: "Oct-Dec total" },
    ],
    total: "KES2,450,766",
  },
]

export const Breakdown = () => {
  return (
    <section css={styles.specialMenu}>
      <div css={styles.container}>
        <a href="." style={{ color: "#486c1b" }}>
          November 2025 budget Submitted for approval{"\u00BB"}
        </a>
        <br />
        <a href="." style={{ color: "#486c1b" }}>
          Replenish Farm Manager{"\u00BB"}
        </a>
        <div css={styles.rowdiv}>
          <h2>Daily Expense & Budget Breakdown</h2>
          <hr style={{ borderTop: "1px dotted #333" }} />
          <div css={styles.row}>
            {dailyMenuItems.map((menu, index) => (
              <div key={index} css={styles.specialCard}>
                <ul>
                  {menu.items.map((item, i) => (
                    <li key={i} css={item.important ? styles.importantItem : undefined}>
                      {item.name}
                      <span className="note">({item.note})</span>
                      <span className="amount-note">
                        <span>
                          <b>{item.price}</b>
                        </span>
                      </span>
                    </li>
                  ))}
                  {index === 0 && (
                    <li className="total">
                      Variance: <span>{menu.total}</span>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div css={styles.rowdiv}>
          <h2>Overtime Expense & Budget Breakdown (All-Time)</h2>
          <hr style={{ borderTop: "1px dotted #333" }} />
          <div css={styles.row}>
            {overtimeMenuItems.map((menu, index) => (
              <div key={index} css={styles.specialCard}>
                <ul>
                  {menu.items.map((item, i) => (
                    <li key={i} css={item.important ? styles.importantItem : undefined}>
                      {item.name}
                      <span className="note">({item.note})</span>
                      <span className="amount-note">
                        <span>
                          <b>{item.price}</b>
                        </span>
                      </span>
                    </li>
                  ))}
                  {index === 0 && (
                    <li className="total">
                      Remaining Balance: <span>{menu.total}</span>
                    </li>
                  )}
                  {index === 1 && (
                    <li className="total">
                      Total Overtime: <span>{menu.total}</span>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

