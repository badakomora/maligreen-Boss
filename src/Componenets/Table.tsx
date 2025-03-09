/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 0.8rem;
    text-align: center;
  }

  thead {
    background: #34495e;
    color: white;
  }
`;

const priorityStyles = css`
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  color: white;
`;

const highPriority = css`
  ${priorityStyles}
  background: #e74c3c;
`;

const mediumPriority = css`
  ${priorityStyles}
  background: #f1c40f;
`;
const paid = css`
  ${priorityStyles}
  background: #486c1b;
`;
export const Table = () =>{
    return(
        <section>
        <h2>Unpaid Invoices</h2>
        <table css={tableStyles}>
          <thead>
            <tr>
            <th>No.</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Litres</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <th>1.</th>
              <td>Andrew Bada</td>
              <td>22/1/2024</td>
              <td><span css={highPriority}>Overdue</span></td>
              <td>300l</td>
              <td><select>
            <option value="all">Action</option>
            <option value="en-cours">Create Receipt</option>
            <option value="a-faire">Create Credit Note</option>
            <option value="terminé">Edit</option>
          </select></td>
            </tr>
            <tr>
            <th>2.</th>
            <td>Grace Ndondu</td>
            <td>2/5/2024</td>
              <td><span css={mediumPriority}>unpaid</span></td>
              <td>50l</td>
              <td><select>
            <option value="all">Action</option>
            <option value="en-cours">Create Receipt</option>
            <option value="a-faire">Create Credit Note</option>
            <option value="terminé">Edit</option>
          </select></td>
            </tr>
            <tr>
            <th>3.</th>
            <td>Mali Green</td>
            <td>29/8/2024</td>
              <td><span css={paid}>Paid</span></td>
              <td>20l</td>
              <td><select>
            <option value="all">Action</option>
            <option value="en-cours">Create Receipt</option>
            <option value="a-faire">Create Credit Note</option>
            <option value="terminé">Edit</option>
          </select></td>
            </tr>
          </tbody>
        </table>
      </section>
    )
}