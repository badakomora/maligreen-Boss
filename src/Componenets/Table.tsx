/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { useState } from "react";

const buttonStyles = css`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
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

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 10px -6px #486c1b;

  th, td {
    padding: 0.4rem;
    text-align: center;
  }

  thead {
    background: #486c1b;
    color: white;
  }

  tbody tr:hover {
    background:  #486c1b;
    color: #ffffff;
  }

  select, input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    cursor: pointer;
  }
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 1rem;
  }
`;

const priorityStyles = css`
  font-size: 0.9rem;
  font-weight: bold;
`;

const statusColors: Record<string, SerializedStyles> = {
  overdue: css`
    ${priorityStyles}
    color: #e74c3c;
  `,
  unpaid: css`
    ${priorityStyles}
    color: #f39c12;
  `,
  paid: css`
    ${priorityStyles}
    color: #27ae60;
  `,
  partiallypaid: css`
    ${priorityStyles}
      color: rgb(39, 88, 174);
  `,
};

export const Table = () => {
  const [view, setView] = useState("Sales Invoices");

  return (
    <section>
      <div css={headerStyles}>
        <h2 style={{color:"#486c1b"}}>{view}</h2>
        <div>
          {view === "Sales Invoices" ? (
            <select css={btnSecondary}>
              <option>All (No Filter)</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Overdue</option>
            </select>
          ) : (
            <input css={btnSecondary} type="text" placeholder="Search Customer" />
          )}
          <select css={btnPrimary} onChange={(e) => setView(e.target.value)}>
            <option>Customer Tax Invoices</option>
            <option>List of Customers</option>
          </select>
        </div>
      </div>

      <table css={tableStyles}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Litres</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, name: "Andrew Bada", date: "22/01/2024", status: "Overdue", litres: "300L" },
            { id: 2, name: "Grace Ndondu", date: "02/05/2024", status: "Unpaid", litres: "50L" },
            { id: 3, name: "Mali Green", date: "29/08/2024", status: "Paid", litres: "20L" },
            { id: 4, name: "Andrew Bada", date: "22/01/2024", status: "Partially Paid", litres: "300L" },
          ].map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>
  <span css={statusColors[item.status.toLowerCase().replace(/\s/g, "")]}>
    {item.status}
  </span>
</td>

              <td>{item.litres}</td>
              <td>
                <select css={btnSecondary}>
                  <option>Action</option>
                  <option>Create Receipt</option>
                  <option>Create Credit Note</option>
                  <option>Edit</option>
                  <option>Invoice Details</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
