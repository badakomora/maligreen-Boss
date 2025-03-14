/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  container: css`
    font-family: "Lato", sans-serif;
    background: #ffffff;
    padding: 1rem;
  `,
  section: css`
    border: 2px solid #486c1b;
    background: white;
    padding: 1rem;
  `,
  headerContainer: css`
    display: flex;
    justify-content:space-between;
    gap: 1rem;
    margin-bottom: 2rem;
  `,
  header: css`
    font-family: "Raleway", sans-serif;
    font-weight: bold;
    margin-top:10px;
    text-align: right;
    
  `,
  spanFirst: css`
    font-size: 0.8em;
    color: #486c1b;
  `,
  spanLast: css`
    font-size: 1.2em;
    color: #486c1b;
  `,
  tableWrap: css`
    overflow-x: auto;
  `,
  table: css`
    border-collapse: collapse;
    width: 100%;
    background: white;
  `,
  caption: css`
    color: #486c1b;
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;
  `,
  thead: css`
    background: #486c1b;
    th {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 2px solid #ffffff;
      color: #ffffff;
    }
  `,
  tbody: css`
    td, th {
      padding: 0.5rem;
      text-align: left;
      border-bottom: 1px solid #486c1b;
      color: #486c1b;
      background: white;
    }
  `,
  total: css`
    font-weight: bold;
    background: #486c1b;
    color: #ffffff;
    td, th {
      border-top: 2px solid #ffffff;
      padding: 0.75rem;
    }
  `,
};

export const Budget = () => {
  return (
    <main css={styles.container}>
      <section css={styles.section}>
        {/* Logo and Header in Flex Container */}
        <div css={styles.headerContainer}>
          <img src="/2.png" alt="Company Logo" width="200px" height="80px"/>
          <h1 css={styles.header}>
            <span css={styles.spanFirst}>March 2025</span> <br />
            <span css={styles.spanLast}>Monthly Budget</span>
          </h1>
        </div>

        <div css={styles.tableWrap}>
          {/* Expenses Table */}
          <table css={styles.table}>
            <caption css={styles.caption}>Expenses</caption>
            <thead css={styles.thead}>
              <tr>
                <th>Details</th>
                <th>Estimated</th>
                <th>Actual</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody css={styles.tbody}>
              {["Food", "Health", "Utilities", "Clothing/Shoes", "Pets", "Public Transport", "Entertainment"].map((item, i) => (
                <tr key={i}>
                  <th>{item}</th>
                  <td>KES200</td>
                  <td>KES150</td>
                  <td>KES50</td>
                </tr>
              ))}
              <tr css={styles.total}>
                <th>Total Expenses</th>
                <td>KES880</td>
                <td>KES940</td>
                <td style={{color:"red"}}>-KES60</td>
              </tr>
            </tbody>
          </table>

          {/* Income Table */}
          <table css={styles.table}>
            <caption css={styles.caption}>Income</caption>
            <thead css={styles.thead}>
              <tr>
                <th>Details</th>
                <th>Estimated</th>
                <th>Actual</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody css={styles.tbody}>
              {["Wages", "Interest/Dividends", "Savings"].map((item, i) => (
                <tr key={i}>
                  <th>{item}</th>
                  <td>KES500</td>
                  <td>KES650</td>
                  <td>KES150</td>
                </tr>
              ))}
              <tr css={styles.total}>
                <th>Total Income</th>
                <td>KES2550</td>
                <td>KES2750</td>
                <td style={{color:"green"}}>KES200</td>
              </tr>
            </tbody>
          </table>

          {/* Net Balance Table */}
          <table css={styles.table}>
            <caption css={styles.caption}>Net Balance</caption>
            <tbody>
              <tr css={styles.total}>
                <td>Total Net Balance</td>
                <td>KES1810</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};
