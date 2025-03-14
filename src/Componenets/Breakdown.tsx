/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  specialMenu: css`
    margin: 50px 0;
  `,
  container: css`
    width: 100%;
    color: #486c1b;
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
    span {
      color: #486c1b;
    }
    .note {
      font-size: 13px;
      color: #888;
      white-space: nowrap;
    }
  `,
};

const menuItems = [
  {
    items: [
      { name: "Last Replenishment", price: "KES450,000", note: "Recent restock" },
      { name: "Running Balance", price: "KES120,309", note: "Available funds" },
      { name: "Current Budget", price: "KES378,457", note: "Allocated budget" },
      { name: "Total Expense", price: "KES478,457", note: "All expenditures" },
    ],
    total: "KES378,457",
  },
  {
    items: [
      { name: "Unexpected Cost", price: "KES450,000", note: "Emergency expense" },
      { name: "Biggest Expense", price: "KES120,309", note: "Highest cost item" },
      { name: "Urgent Risks", price: "KES300,000", note: "High priority" },
      { name: "Exceeding budget", price: "KES478,457", note: "Overspending alert" },
    ],
    total: "KES378,457",
  },
];

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
            {menuItems.map((menu, index) => (
              <div key={index} css={styles.specialCard}>
                <ul>
                  {menu.items.map((item, i) => (
                    <li key={i}>
                      {item.name}<span className="note">({item.note})</span>
                      <span className="amount-note">
                        <span><b>{item.price}</b></span>
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
      </div>
    </section>
  );
};