/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../AppConfig";

const breakdownStyles = css`
  --primary-color: #486c1b;
  --primary-bg: #f0f4eb;
  --text-color: #486c1b;
  --text-light: #666666;
  --border-color: #d0d0d0;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  --notification-color: black;

  font-family: monaco;
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

  .links-section > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .links-section span {
    color: var(--notification-color);
    font-weight: 500;
  }

  .action-link {
    color: var(--primary-color);
    font-size: 0.9em;
    transition: all 0.2s ease;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .section-container {
    margin-top: 40px;
  }

  .section-title {
    color: var(--primary-color);
    font-size: 1.3em;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 12px;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .section-subtitle {
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 10px;
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

  /* New flex container for the expense sections */
  .expense-flex-container {
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: 100%;
  }

  /* Expense section wrapper */
  .expense-section {
    flex: 1;
    min-width: 0; /* Prevents flex items from overflowing */
  }

  .card {
    width: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    transition: box-shadow 0.3s ease;
    overflow: hidden;
  }

  .card-header {
    margin-bottom: 15px;
    padding: 12px 15px;
    border-bottom: 1px solid #486c1b;
    color: #486c1b;
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
    color: var(--text-color);
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:hover {
      border-left-color: var(--primary-color);
    }
  }

  .important-item {
    background-color: var(--primary-color);
    color: #ffffff;
    padding: 10px 12px;
    border-radius: 6px;
    border-left: none;

    .note {
      color: rgba(255, 255, 255, 0.9) !important;
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

  .date-badge {
    background-color: var(--primary-bg);
    color: var(--primary-color);
    padding: 6px 8px;
    border-radius: 10px;
    font-size: 1em;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 992px) {
    .expense-flex-container {
      flex-direction: column;
      gap: 30px;
    }

    .expense-section {
      width: 100%;
    }

    .cards-row {
      flex-direction: column;
      gap: 20px;
    }

    .card {
      max-width: 100%;
    }
  }
`;

interface Items {
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
  const [budgetMonthsData, setBudgetMonthsData] = useState<Items[]>([]);
  const [incurred, setIncurred] = useState(0);
  const [datecreated, setCreateddate] = useState("");
  const [todaysExpenses] = useState({
    biggestExpense: 78457,
    totalExpense: 178457,
    runningBalance: 271543,
    recentFunding: 450000,
  });
  const [overallExpenses] = useState({
    totalExpense: 2450000,
    totalFunding: 3120309,
    totalRevenue: 670309,
    variance: 670309,
  });

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
      setIncurred(data?.incurred ?? 0);
      setCreateddate(data?.datecreated ?? "");
    } catch (error) {
      console.error("Error fetching incurred costs:", error);
    }
  };

  // This would be replaced with actual API calls to fetch today's and overall expenses
  const fetchExpenses = async () => {
    try {
      // These would be actual API calls in a real implementation
      // const todaysResponse = await axios.get(`${serverUrl}expenses/today`);
      // const overallResponse = await axios.get(`${serverUrl}expenses/overall`);
      // For now, we're using the mock data initialized in state
      // setTodaysExpenses(todaysResponse.data);
      // setOverallExpenses(overallResponse.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchBudgetMonths();
    fetchInccurredItems();
    fetchExpenses();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `KES${amount.toLocaleString()}`;
  };

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section css={breakdownStyles}>
      <div className="container">
        <div className="links-section">
          {incurred ? (
            <div style={{ display: "flex" }}>
              <span className="date-badge">New</span>
              <a
                href="."
                className="action-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("Pending Incurred Costs");
                }}
              >
                Inccurred Cost KES {incurred.toLocaleString()} - {datecreated}{" "}
                Submitted for approval
                {"\u00BB"}
              </a>
            </div>
          ) : (
            ""
          )}
          {budgetMonthsData.length >= 1
            ? budgetMonthsData.map((month, index) => (
                <div style={{ display: "flex" }} key={index}>
                  <span className="date-badge">New</span>
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
                    {month.name} budget Submitted for approval {"\u00BB"}
                  </a>
                </div>
              ))
            : ""}
        </div>

        <div className="section-container">
          <hr className="divider" />

          {/* Flex container for Today's and Overall Expenses */}
          <div className="expense-flex-container">
            {/* Today's Expenses Section */}
            <div className="expense-section">
              <div className="card">
                <div className="card-header">
                  <h4 className="section-subtitle">
                    Today's Expense Summary{" "}
                    <span className="date-badge"> {today}</span>
                  </h4>
                </div>
                <ul className="items-list">
                  <li className="list-item">
                    <span className="item-name">
                      Biggest Expense
                      <span className="note">(Today)</span>
                    </span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(todaysExpenses.biggestExpense)}
                      </span>
                    </span>
                  </li>
                  <li className="list-item">
                    <span className="item-name">
                      Total Expense
                      <span className="note">(Today's expenditures)</span>
                    </span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(todaysExpenses.totalExpense)}
                      </span>
                    </span>
                  </li>
                  <li className="list-item">
                    <span className="item-name">Running Balance:</span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(todaysExpenses.runningBalance)}
                      </span>
                    </span>
                  </li>
                  <li className="list-item important-item">
                    <span className="item-name">Recent Funding</span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(todaysExpenses.recentFunding)}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Overall Expenses Section */}
            <div className="expense-section">
              <div className="card">
                <div className="card-header">
                  <h4 className="section-subtitle">
                    Overall Financial Summary
                  </h4>
                </div>
                <ul className="items-list">
                  <li className="list-item">
                    <span className="item-name">Total Expense</span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(overallExpenses.totalExpense)}
                      </span>
                    </span>
                  </li>
                  <li className="list-item">
                    <span className="item-name">Total Funding</span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(overallExpenses.totalFunding)}
                      </span>
                    </span>
                  </li>
                  <li className="list-item">
                    <span className="item-name">
                      Total Revenue
                      <span className="note">(Available income)</span>
                    </span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(overallExpenses.totalRevenue)}
                      </span>
                    </span>
                  </li>
                  <li className="total-row important-item">
                    <span>Profit:</span>
                    <span>{formatCurrency(overallExpenses.variance)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
