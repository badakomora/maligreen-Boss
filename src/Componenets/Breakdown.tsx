/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../AppConfig";

const breakdownStyles = css`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  margin: 30px 0;

  .container {
    width: 100%;
  }

  .links-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }

  .action-link {
    color: #486c1b;
    text-decoration: none;
    font-size: 0.9em;
    transition: color 0.2s ease;
    display: inline-block;
    padding: 4px 0;

    &:hover {
      color: #5a8824;
      text-decoration: underline;
    }
  }

  .section-container {
    margin-top: 40px;
  }

  .section-title {
    color: #486c1b;
    font-size: 1.3em;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .divider {
    border-top: 1px dotted #d0d0d0;
    margin: 12px 0 20px;
  }

  .cards-row {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }

  .card {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 6px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .items-list {
    padding: 0;
    list-style: none;
    text-align: left;
  }

  .list-item {
    font-size: 0.9em;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #486c1b;
    padding: 6px 8px;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }
  }

  .important-item {
    background-color: #486c1b;
    color: #ffffff;
    padding: 8px;
    border-radius: 4px;

    &:hover {
      background-color: #5a8824;
    }

    .note {
      color: #ffffff !important;
      font-weight: 500;
    }
  }

  .item-name {
    flex: 1;
  }

  .note {
    font-size: 0.85em;
    color: #666;
    margin-left: 5px;
  }

  .amount-note {
    display: flex;
    gap: 15px;
    min-width: 180px;
    justify-content: flex-end;
    text-align: right;
  }

  .amount {
    flex: 1;
    text-align: right;
    min-width: 100px;
    font-weight: 600;
  }

  .total-row {
    border-top: 1px dotted #d0d0d0;
    margin-top: 12px;
    padding-top: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 992px) {
    .cards-row {
      flex-direction: column;
      gap: 20px;
    }

    .card {
      max-width: 100%;
    }
  }
`;

interface items {
  id: number;
  name: string;
  status: number;
}
interface IdProps {
  setBudgetId: React.Dispatch<React.SetStateAction<number | string>>;
}
interface NavbarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
export const Breakdown: React.FC<NavbarProps & IdProps> = ({
  setActiveTab,
  setBudgetId,
}) => {
  const [budgetMonthsData, setBudgetMonthsData] = useState<items[]>([]);
  const [incurred, setIncurred] = useState(0);
  const [datecreated, setCreateddate] = useState("");

  const fetchBudgetMonths = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/budgetList`);
      const shelterList = response.data.pending.map(
        (item: { id: number; monthadded: string; status: number }) => ({
          id: item.id,
          name: item.monthadded,
          status: item.status,
        })
      );
      setBudgetMonthsData(shelterList);
    } catch (error) {
      console.error("Error fetching shelter:", error);
    }
  };

  const fetchInccurredItems = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}incurredcost/list`);
      setIncurred(data?.incurred ?? 0); // Use nullish coalescing to avoid setting 0 if incurred is 0
      setCreateddate(data?.datecreated ?? "");
    } catch (error) {
      console.error("Error fetching incurred costs:", error);
    }
  };

  useEffect(() => {
    fetchBudgetMonths();
    fetchInccurredItems();
  });

  return (
    <section css={breakdownStyles}>
      <div className="container">
        <div className="links-section">
          <a
            href="."
            className="action-link"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("Pending Incurred Costs");
            }}
          >
            <b style={{ color: "orange" }}>Pending</b> Inccurred Cost KES{" "}
            {incurred} - {datecreated} Submitted for approval
            {"\u00BB"}
          </a>
          {budgetMonthsData.map((month, index) => (
            <a
              key={index}
              href="."
              className="action-link"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("Budget");
                setBudgetId(Number(month.id));
              }}
            >
              <b style={{ color: "orange" }}>Pending</b> {month.name} budget
              Submitted for approval{"\u00BB"}
            </a>
          ))}
        </div>

        <div className="section-container">
          <h2 className="section-title">Expense & Budget Breakdown</h2>
          <hr className="divider" />
          <div className="cards-row">
            {/* Left Card - Key Financial Information */}
            <div className="card">
              <ul className="items-list">
                <li className="list-item">
                  <span className="item-name">
                    Biggest Expense
                    <span className="note">(Biggets budget)</span>
                  </span>
                  <span className="amount-note">
                    <span className="amount">KES378,457</span>
                  </span>
                </li>
                <li className="list-item">
                  <span className="item-name">
                    Total Expense
                    <span className="note">(All expenditures)</span>
                  </span>
                  <span className="amount-note">
                    <span className="amount">KES478,457</span>
                  </span>
                </li>
                <li className="list-item">
                  <span className="item-name">Running Balance:</span>
                  <span className="amount-note">
                    <span className="amount">KES378,457</span>
                  </span>
                </li>
                <li className="list-item important-item">
                  <span className="item-name">
                    Receipt Reference
                    <span className="note">(Recent Funding)</span>
                  </span>
                  <span className="amount-note">
                    <span className="amount">KES450,000</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Card - Overtime Expenses */}
            <div className="card">
              <ul className="items-list">
                <li className="list-item important-item">
                  <span className="item-name">
                    Total Expense
                    <span className="note">(All-time expenses)</span>
                  </span>
                  <span className="amount-note">
                    <span className="amount">KES2,450,000</span>
                  </span>
                </li>
                <li className="list-item">
                  <span className="item-name">
                    Total Funding
                    <span className="note">(All-time funding)</span>
                  </span>
                  <span className="amount-note">
                    <span className="amount">KES3,120,309</span>
                  </span>
                </li>
                <li className="list-item important-item">
                  <span className="item-name">
                    Total Revenue
                    <span className="note">(Available revenue)</span>
                  </span>
                  <span className="amount-note">
                    <span className="amount">KES670,309</span>
                  </span>
                </li>
                <li className="total-row">
                  <span>Variance:</span>
                  <span>KES670,309</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
