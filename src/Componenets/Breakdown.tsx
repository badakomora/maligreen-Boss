/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

import { serverUrl } from "../AppConfig";
import { toast } from "react-toastify";
import { Dynamics } from "./Dynamics";

const breakdownStyles = css`
  --primary-color: #486c1b;
  --primary-bg: #f0f4eb;
  --text-color: #486c1b;
  --text-light: #666666;
  --border-color: #d0d0d0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --notification-color: black;

  font-family: monaco;
  margin: 30px 0;

  .container {
    width: 100%;
  }

  .links-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .links-section > div {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px 4px;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
  }

  .links-section span {
    color: var(--notification-color);
    font-weight: 500;
  }

  .action-link {
    color: var(--primary-color);
    font-size: 0.95em;
    transition: all 0.2s ease;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;

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
    margin-bottom: 16px;
    padding-bottom: 10px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .divider {
    border-top: 1px dotted #d0d0d0;
    margin: 16px 0 24px;
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
    border-radius: 10px;
    box-shadow: var(--card-shadow);
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    overflow: hidden;
    border: 1px solid rgba(72, 108, 27, 0.1);

    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  .card-header {
    margin-bottom: 15px;
    padding: 16px 20px;
    border-bottom: 2px solid #486c1b;
    color: #486c1b;
    background-color: rgba(72, 108, 27, 0.05);
  }

  .items-list {
    padding: 0 15px 15px;
    list-style: none;
    text-align: left;
    margin: 0;
  }

  .list-item {
    font-size: 0.95em;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-color);
    padding: 10px 14px;
    border-radius: 6px;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
    background-color: rgba(240, 244, 235, 0.3);

    &:hover {
      border-left-color: var(--primary-color);
      background-color: rgba(240, 244, 235, 0.6);
    }
  }

  .important-item {
    background-color: var(--primary-color);
    color: #ffffff;
    padding: 12px 14px;
    border-radius: 6px;
    border-left: none;
    font-weight: 600;

    .note {
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 500;
    }

    &:hover {
      background-color: #3d5c17;
    }
  }

  .item-name {
    flex: 1;
  }

  .note {
    font-size: 0.85em;
    color: #666;
    margin-left: 5px;
    font-style: italic;
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
    padding-top: 12px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  .date-badge {
    color: var(--primary-color);
    padding: 3px 4px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
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

    .section-subtitle {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  @media (max-width: 576px) {
    .list-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .amount-note {
      width: 100%;
      justify-content: flex-start;
    }

    .amount {
      text-align: left;
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
  const [incurredstatus, setIncuuredStatus] = useState(0);
  const [datecreated, setCreateddate] = useState("");
  const { runningBalance, recentReceipt } = Dynamics();
  const [biggestexpense, setDailyMax] = useState(0);
  const [totalexpense, setDailyTotal] = useState(0);
  const [today, setToday] = useState("");
  const [totaldaily, setTotalDaily] = useState(0);
  const [receipttotal, setReceiptTotal] = useState(0);
  const [totalsales, setTotalsales] = useState(0);

  // Use useMemo to compute these values whenever the dependencies change
  const todaysExpenses = useMemo(
    () => ({
      biggestExpense: biggestexpense,
      totalExpense: totalexpense,
      runningBalance: runningBalance,
      recentFunding: recentReceipt,
    }),
    [biggestexpense, totalexpense, runningBalance, recentReceipt]
  );

  const overallExpenses = useMemo(
    () => ({
      totalExpense: totaldaily,
      totalFunding: receipttotal,
      totalRevenue: totalsales,
      variance: totalsales - receipttotal,
    }),
    [totaldaily, receipttotal, totalsales]
  );

  useEffect(() => {
    fetchBudgetMonths();
    fetchInccurredItems();
    fetchTodaysExpenses();
    fetchReceiptTotal();
    fetchTotalsales();
  }, []);

  const fetchBudgetMonths = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/budgetList`);
      const shelterList = response.data.list.map(
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

  const fetchReceiptTotal = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/receiptList`);
      setReceiptTotal(response.data.totalAllTime);
    } catch (error) {
      console.error("Error fetching receipt total:", error);
    }
  };

  const fetchTotalsales = async () => {
    try {
      const response = await axios.get(`${serverUrl}invoice/list`);
      setTotalsales(response.data.totalsales);
    } catch (error) {
      console.error("Error fetching total sales:", error);
    }
  };

  const fetchTodaysExpenses = async () => {
    try {
      const response = await axios.get(`${serverUrl}expense/list`);
      setDailyTotal(response.data.dailyTotal);
      setDailyMax(response.data.biggestExpense);
      setToday(response.data.lastDate);
      setTotalDaily(response.data.totalExpenseOvertime);
    } catch (error) {
      console.error("Error fetching today's expenses:", error);
    }
  };

  const fetchInccurredItems = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}incurredcost/list`);
      setIncuuredStatus(data?.status ?? 0);
      setIncurred(data?.incurred ?? 0);
      setCreateddate(data?.datecreated ?? "");
    } catch (error) {
      console.error("Error fetching incurred costs:", error);
    }
  };

  const handleStatus = async (
    newStatus?: number,
    type?: "incurred" | "budget"
  ) => {
    try {
      const status = newStatus ?? 2;
      const endpoints = [];

      if (type === "incurred" || !type) {
        endpoints.push({
          endpoint: "incurredcost/update",
          name: "Incurred costs",
        });
      }
      if (type === "budget" || !type) {
        endpoints.push({ endpoint: "item/budgetUpdate", name: "Budget" });
      }

      for (const req of endpoints) {
        try {
          const { data } = await axios.post(`${serverUrl}${req.endpoint}`, {
            status,
          });

          if (data?.tab) {
            toast.success(data.tab);
          }
        } catch (error: any) {
          if (error.response?.data?.error) {
            toast.error(`${req.name}: ${error.response.data.error}`);
          } else {
            toast.error(`Error updating ${req.name.toLowerCase()}`);
          }
        }
      }

      fetchBudgetMonths();
      fetchInccurredItems();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const formatCurrency = (amount: number) => {
    return `KES${amount.toLocaleString()}`;
  };
  const statusLabels: Record<number, string> = {
    1: "New",
    2: "Opened",
    3: "Running Funds",
  };

  const todayString = new Date().toISOString().split("T")[0];

  return (
    <section css={breakdownStyles}>
      <div className="container">
        <div className="links-section">
          {incurredstatus === 4 ? (
            ""
          ) : incurred ? (
            <div style={{ display: "flex" }}>
              <span className="date-badge">
                {statusLabels[incurredstatus] || ""}
              </span>
              <a
                href="."
                className="action-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("Incurred Costs");
                  handleStatus(2, "incurred");
                }}
              >
                Incurred Cost {formatCurrency(incurred).toLocaleString()} -{" "}
                {datecreated}{" "}
                {incurredstatus === 1
                  ? " submitted for approval"
                  : incurredstatus === 2
                  ? " in Review"
                  : incurredstatus === 3
                  ? " approved"
                  : ""}{" "}
                {"\u00BB"}
              </a>
            </div>
          ) : (
            ""
          )}
          {budgetMonthsData
            .filter((month) => month.status === 1 || month.status === 2)
            .map((month, index) => (
              <div style={{ display: "flex" }} key={index}>
                <span className="date-badge">
                  {month.status === 1 ? "New" : "In review"}
                </span>
                <a
                  href="."
                  className="action-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("Proposed Budget");
                    setBudgetId(Number(month.id));
                    handleStatus(2, "budget");
                  }}
                >
                  {month.name} budget Submitted for approval {"\u00BB"}
                </a>
              </div>
            ))}
        </div>

        <div className="section-container">
          <hr className="divider" />

          <div className="expense-flex-container">
            {/* Today's Expenses Section */}
            <div className="expense-section">
              <div className="card">
                <div className="card-header">
                  <h4 className="section-subtitle">
                    {today === todayString ? "Today's" : "Last"} Expense Summary{" "}
                    <span className="date-badge">{today}</span>
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
                        {formatCurrency(
                          todaysExpenses.biggestExpense
                        ).toLocaleString()}
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
                        {formatCurrency(
                          todaysExpenses.totalExpense
                        ).toLocaleString()}
                      </span>
                    </span>
                  </li>
                  {/* <li className="list-item">
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
                        {todaysExpenses.recentFunding || "N/A"}
                      </span>
                    </span>
                  </li> */}
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
                        {formatCurrency(
                          overallExpenses.totalExpense
                        ).toLocaleString()}
                      </span>
                    </span>
                  </li>
                  <li className="list-item">
                    <span className="item-name">Total Funding</span>
                    <span className="amount-note">
                      <span className="amount">
                        {formatCurrency(
                          overallExpenses.totalFunding
                        ).toLocaleString()}
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
                        {formatCurrency(
                          overallExpenses.totalRevenue
                        ).toLocaleString()}
                      </span>
                    </span>
                  </li>
                  <li className="total-row important-item">
                    <span>
                      {overallExpenses.variance >= 0 ? "Profit" : "Loss"}
                    </span>
                    <span>
                      {formatCurrency(
                        overallExpenses.variance
                      ).toLocaleString()}
                    </span>
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
