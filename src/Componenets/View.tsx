/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px;
  box-shadow: 0px 4px 12px rgba(72, 108, 27, 0.2);
  border-radius: 10px;
  overflow: hidden;
`;

const columnStyle = (bgColor: string) => css`
  background: ${bgColor};
  padding: 5%;
`;

const dropdownStyles = css`
  text-align: left;

  span {
    cursor: pointer;
  }

  div {
    display: none;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px -6px #486c1b;
    border-radius: 6px;
    z-index: 10;
  }

  div a {
    padding: 0.3rem;
    display: block;
    border-bottom: 1px dotted #486c1b;
    text-align: left;
    text-decoration: none;
    color: #486c1b;

    &:hover {
      background: #486c1b;
      color: #ffffff;
    }
  }

  &:hover div {
    display: block;
  }
`;

interface NavbarProps {
  activeTab: string;
}

export const View: React.FC<NavbarProps> = ({ activeTab }) => {
  return (
    <>
      {activeTab === "Staff Review" ? (
        <div css={containerStyle}>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>
                Name: <b> Andrew Bada Komora</b>
              </p>
              <p>Phone Number: +2547 1234 5678</p>
              <p>Email: badakomora06@gmail.com</p>
            </div>
          </div>
          <div css={columnStyle("#ffffff")}>
            <div style={{ color: "#486c1b" }}>
              <p>
                Joined: <b>21/3/2025</b>
              </p>
              <p>
                Designation: <b>Administrator</b> || Department :{" "}
                <b>Administration</b>
              </p>
              <p>
                Salary: <b>KES 300,286</b> || Allowances: <b>KES 0</b>
              </p>
            </div>
          </div>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>
                Sales Contribution: <b>KES 0</b>
              </p>
              <p>Achievements: Employee of the Year 2025</p>
              <a href="." style={{ color: "#ffffff" }}>
                Review CV {"\u00BB"}
              </a>
            </div>
          </div>
        </div>
      ) : activeTab === "Invoice Details" ? (
        <div css={containerStyle}>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>
                Invoice ID: <b> Invoice2002</b>
              </p>
              <p>
                Date Created: <b>21/3/2025</b>
              </p>
              <p>
                Due Date: <b>21/4/2025</b>
              </p>
            </div>
          </div>
          <div css={columnStyle("#ffffff")}>
            <div style={{ color: "#486c1b" }}>
              <p>Discount: KES200</p>
              <p>
                Grand Total: <b>KES 300</b>
              </p>
              <p>Litres Sold: 5</p>
            </div>
          </div>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>From: Mali Green Ltd</p>
              <p>To: Andrew Bada</p>
              <p>Product : Goat Milk</p>
            </div>
          </div>
        </div>
      ) : activeTab === "View Expense" ? (
        <div css={containerStyle}>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>
                Expense: <b> Dairy Meal</b>
              </p>
              <p>
                Date Expensed: <b>21/3/2025</b>
              </p>
              <p>
                <div css={dropdownStyles}>
                  Account:<span>Consumables & Supplies &#9660;</span>
                  <div style={{ textAlign: "left", textDecoration: "none" }}>
                    <a href=".">Utilities & Services</a>
                    <a href=".">Consumables & Supplies</a>
                    <a href=".">Equipment & Maintenance</a>
                    <a href=".">Salaries & Operational Costs</a>
                  </div>
                </div>
              </p>
            </div>
          </div>
          <div css={columnStyle("#ffffff")}>
            <div style={{ color: "#486c1b" }}>
              <p>
                Quantity: <b>200 Bags | None</b>
              </p>
              <p>
                Total Cost: <b>KES5000</b>
              </p>
              <p>
                Running Balance: <b>KES3000</b>
              </p>
            </div>
          </div>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>Supplier: Madaraka Feeds</p>
              <p>Note: Purchased for goat feed stock</p>
              <p>
                Receipt: <b>KES40000</b>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div css={containerStyle}>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>
                Name: <b> Tag 121(Saneen)</b>
              </p>
              <p>
                Joined/DOB: <b>21/3/2025</b>
              </p>
              <p>
                Vaccines: <b>Budapest, mouthFoot</b>
              </p>
            </div>
          </div>
          <div css={columnStyle("#ffffff")}>
            <div style={{ color: "#486c1b" }}>
              <p>Nanny ID: Tag 3002</p>
              <p>
                No. of Kids Alive: (3) <b>Tag121A</b>, <b>Tag121B</b>,{" "}
                <b>Tag121C</b>
              </p>
              <p>
                No. of Kids Dead: (2) <b>Tag121D</b>, <b>Tag121E</b>
              </p>
            </div>
          </div>
          <div css={columnStyle("#486c1b")}>
            <div style={{ color: "#ffffff" }}>
              <p>
                <div css={dropdownStyles}>
                  Block:<span>B Section 1 &#9660;</span>
                  <div style={{ textAlign: "left", textDecoration: "none" }}>
                    <a href=".">A Section 1</a>
                    <a href=".">A Section 2</a>
                    <a href=".">B Section 1</a>
                    <a href=".">B Section 2</a>
                  </div>
                </div>
              </p>
              <p>
                <div css={dropdownStyles}>
                  Health Status:<span>Sick &#9660;</span>
                  <div style={{ textAlign: "left", textDecoration: "none" }}>
                    <a href=".">Healthy</a>
                    <a href=".">Sick</a>
                    <a href=".">Injured</a>
                    <a href=".">Healthy</a>
                    <a href=".">Sick</a>
                    <a href=".">Injured</a>
                  </div>
                </div>
              </p>
              <p>
                <div css={dropdownStyles}>
                  Herd Metric:<span>Pregnant &#9660;</span>
                  <div style={{ textAlign: "left", textDecoration: "none" }}>
                    <a href=".">Lactating & Pregnant</a>
                    <a href=".">Lactating</a>
                    <a href=".">Pregnant</a>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
