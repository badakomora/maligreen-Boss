/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Navbar } from "./Componenets/Navbar";
import { Grid } from "./Componenets/Grid";
import { Block } from "./Componenets/Block";
import { Budget } from "./Componenets/Budget";
import { Form } from "./Componenets/Form";
import { View } from "./Componenets/View";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "./AppConfig";
import { Breakdown } from "./Componenets/Breakdown";
import { Chart } from "./Componenets/Chart";
import { Product } from "./Componenets/Product";
import { Dynamics } from "./Componenets/Dynamics";

// MeetingModal Component
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dateTime: string, purpose: string) => void;
}

const modalOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100%;
`;

const modalContentStyles = css`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 90vh;
  margin: auto;
`;

const formGroupStyles = css`
  margin-bottom: 1.5rem;
`;

const labelStyles = css`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #486c1b;
`;

const inputStyles = css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Monaco;
  &:focus {
    outline: none;
    border-color: #486c1b;
  }
`;

const textareaStyles = css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Monaco;
  min-height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #486c1b;
  }
`;

const buttonContainerStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const MeetingModal = ({ isOpen, onClose }: MeetingModalProps) => {
  const [dateTime, setDateTime] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the backend API to schedule a meeting
      const response = await axios.post(`${serverUrl}item/scheduleMeeting`, {
        dateTime: dateTime,
        purpose: purpose,
      });

      // Reset form
      setDateTime("");
      setPurpose("");

      toast.success("Meeting scheduled successfully!");
      onClose();
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div css={modalOverlayStyles}>
      <div css={modalContentStyles}>
        <h2 style={{ color: "#486c1b", marginTop: 0 }}>Schedule a Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div css={formGroupStyles}>
            <label css={labelStyles} htmlFor="dateTime">
              Date & Time
            </label>
            <input
              type="text"
              id="dateTime"
              css={inputStyles}
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="Enter date and time (e.g., May 25, 2025 3:00 PM)"
              required
            />
          </div>
          <div css={formGroupStyles}>
            <label css={labelStyles} htmlFor="purpose">
              Purpose
            </label>
            <textarea
              id="purpose"
              css={textareaStyles}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Describe the purpose of this meeting..."
            />
          </div>
          <div css={buttonContainerStyles}>
            <button type="button" css={btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" css={btnPrimary}>
              Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PayrollModal Component
interface PayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (month: string, note: string) => void;
}

const PayrollModal = ({ isOpen, onClose }: PayrollModalProps) => {
  const [month, setMonth] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the backend API to schedule a meeting
      const response = await axios.post(`${serverUrl}item/scheduleMeeting`, {
        dateTime: month,
        purpose: note,
      });

      // Reset form
      setMonth("");
      setNote("");

      toast.success("Meeting scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div css={modalOverlayStyles}>
      <div css={modalContentStyles}>
        <h2 style={{ color: "#486c1b", marginTop: 0 }}>Schedule a Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div css={formGroupStyles}>
            <label css={labelStyles} htmlFor="month">
              Date & Time
            </label>
            <input
              type="text"
              id="month"
              css={inputStyles}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter date and time (e.g., May 25, 2025 3:00 PM)"
              required
            />
          </div>
          <div css={formGroupStyles}>
            <label css={labelStyles} htmlFor="note">
              Purpose
            </label>
            <textarea
              id="note"
              css={textareaStyles}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe the purpose of this meeting..."
            />
          </div>
          <div css={buttonContainerStyles}>
            <button type="button" css={btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" css={btnPrimary}>
              Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const layoutStyles = css`
  display: flex;
  overflow: hidden;
  font-family: Monaco;
  width: 100%;
`;

const mainContentStyles = css`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: white;
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonStyles = css`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 5px;
`;

const btnPrimary = css`
  ${buttonStyles}
  background: #486c1b;
  border: none;
  color: #ffffff;

  &:hover {
    background: #365214;
    color: #ffffff;
  }
  &:disabled {
    background: #a5b99a;
    cursor: not-allowed;
  }
`;

const btnSecondary = css`
  ${buttonStyles}
  background: #ffffff;
  border: 1px solid #486c1b;
  color: #486c1b;

  &:hover {
    background: #486c1b;
    color: #ffffff;
  }
  &:disabled {
    border-color: #a5b99a;
    color: #a5b99a;
    cursor: not-allowed;
  }
`;

const filtersStyles = css`
  margin-top: 10px;
  display: block;
  justify-content: space-between;
`;

interface receiptsType {
  id: number;
  amount: number;
  date: string;
}

interface items {
  id: number;
  name: string;
  status: number;
}

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const { runningBalance } = Dynamics();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Dashboard";
  });
  const [invoiceId, setInvoiceId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [expenseId, setExpenseId] = useState(0);
  const [livestockId, setLivestockId] = useState(0);
  const [staffId, setStaffId] = useState(0);
  const [budgetId, setBudgetId] = useState<number | string>(0);
  const [receiptId, setreceiptId] = useState<number | string>(0);
  const [payrollId, setPayrollId] = useState<number | string>(0);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  // useEffect(() => {
  //   setCustomerId(0);
  //   setInvoiceId(0);
  // }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
    getreceipts();
    fetchBudgetMonths();
    productionperiod();
    revenue();
    fetchInccurredItems();
    fetchMonths();
    prevpayroll();
  }, [activeTab]);

  const [budgetMonthsData, setBudgetMonthsData] = useState<items[]>([]);
  const [totalsales, setTotalSalesData] = useState(0);
  const [payrollmonths, setPayrollMonths] = useState<items[]>([]);

  const [receipts, setReceiptsData] = useState<receiptsType[]>([]);
  const [productionperiodData, setproductionPeriodData] = useState<items[]>([]);
  const [productionId, setProductionId] = useState<string | number>(0);
  const [incurred, setIncurred] = useState(0);
  const [datecreated, setCreateddate] = useState("");
  const [payrollmonth, setPayrollMonth] = useState("");
  const [totalsalary, setTotalSalary] = useState(0);

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

  const productionperiod = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/productionperiodlist`);
      const productionperiodList = response.data.list.map(
        (item: { id: number; monthadded: string }) => ({
          id: item.id,
          name: item.monthadded,
        })
      );
      setproductionPeriodData(productionperiodList);
    } catch (error) {
      console.error("Error fetching production periods:", error);
    }
  };

  const getreceipts = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/receiptList`);
      const filteredSales = response.data.list.map(
        (
          item: {
            id: number;
            amount: number;
            datesent: string;
          },
          i: number
        ) => ({
          id: item.id,
          amount: item.amount,
          date: new Date(item.datesent).toLocaleDateString(),
        })
      );

      setReceiptsData(filteredSales);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const revenue = async () => {
    try {
      const response = await axios.get(`${serverUrl}invoice/list`);
      setTotalSalesData(response.data.totalsales);
    } catch (error) {
      console.error("Error fetching invoices:", error);
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

  const fetchMonths = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/PayrollList`);
      const payrollList = response.data.map(
        (item: { id: number; monthadded: string }) => ({
          id: item.id,
          name: item.monthadded,
        })
      );
      setPayrollMonths(payrollList);
    } catch (error) {
      console.error("Error fetching payroll:", error);
    }
  };

  const prevpayroll = async () => {
    try {
      const response = await axios.get(`${serverUrl}staff/list`);
      setTotalSalary(response.data.totalsalary);
      setPayrollMonth(response.data.monthadded);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const getFilteredComponent = (
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
  ) => {
    switch (activeTab) {
      case "Dashboard":
        return <Grid />;
      case "Sales":
        return <Chart activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "Expenses & Budget":
        return (
          <Breakdown setActiveTab={setActiveTab} setBudgetId={setBudgetId} />
        );
      case "Livestock & Production":
        return <Product activeTab={activeTab} setActiveTab={setActiveTab} />;
      case "Staff Management":
        return (
          <Block
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setStaffId={setStaffId}
          />
        );
      case "Profit & Loss":
      case "Budget":
      case "Sales Report":
      case "Receipt Breakdown":
      case "Incurred Costs":
      case "Livestock Report":
      case "Production Report":
      case "Payroll Report":
      case "Pending Incurred Costs":
        return (
          <Budget
            activeTab={activeTab}
            budgetId={budgetId}
            receiptId={receiptId}
            invoiceId={invoiceId}
            productionId={productionId}
            payrollId={payrollId}
          />
        );
      case "Staff Review":
        return (
          <View
            activeTab={activeTab}
            expenseId={expenseId}
            livestockId={livestockId}
            staffId={staffId}
          />
        );
      case "Scheule a meeting":
        return <Form activeTab={activeTab} />;
      default:
        return <p>No data available</p>;
    }
  };

  return (
    <div css={layoutStyles}>
      {/* Sidebar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main css={mainContentStyles}>
        <header css={headerStyles}>
          <h1 style={{ color: "#486c1b" }}>{activeTab}</h1>
          <div>
            {activeTab === "Sales" ? (
              <>
                <div
                  css={css`
                    position: relative;
                    display: inline-block;

                    &:hover .tooltip-content {
                      display: block;
                    }
                  `}
                >
                  <span style={{ color: "#486c1b", cursor: "pointer" }}>
                    Revenue Overtime:{" "}
                    <b>
                      <big>KES {totalsales.toLocaleString("en-US")} </big>
                    </b>
                  </span>

                  <div
                    className="tooltip-content"
                    css={css`
                      position: absolute;
                      top: 100%;
                      left: 0;
                      background-color: #ffffff;
                      border: 1px solid #486c1b;
                      color: #486c1b;
                      border-radius: 4px;
                      padding: 8px 12px;
                      z-index: 1;
                      box-shadow: 0px 0px 10px -6px #486c1b;
                      width: 300px;
                      display: none;
                    `}
                  >
                    <p
                      css={css`
                        margin: 0;
                        font-size: 14px;
                      `}
                    >
                      Cash Revenue:{" "}
                      <b>
                        {" "}
                        <big>KES60,000 </big>
                      </b>
                    </p>
                    <hr />
                    <p
                      css={css`
                        margin: 0;
                        font-size: 14px;
                      `}
                    >
                      Buy Goods 4367606 Revenue :{" "}
                      <b>
                        {" "}
                        <big>KES210,000 </big>
                      </b>
                    </p>
                    <hr />
                    <p
                      css={css`
                        margin: 0;
                        font-size: 14px;
                      `}
                    >
                      Stanbic Revenue:{" "}
                      <b>
                        {" "}
                        <big>KES70,000 </big>
                      </b>
                    </p>
                  </div>
                </div>{" "}
                <div
                  css={css`
                    position: relative;
                    display: inline-block;

                    &:hover .tooltip-content {
                      display: block;
                    }
                  `}
                >
                  <span style={{ color: "#486c1b", cursor: "pointer" }}>
                    Accounts Receivable:{" "}
                    <b>
                      <big>KES {totalsales.toLocaleString("en-US")} </big>
                    </b>
                  </span>

                  <div
                    className="tooltip-content"
                    css={css`
                      position: absolute;
                      top: 100%;
                      left: 0;
                      background-color: #ffffff;
                      border: 1px solid #486c1b;
                      color: #486c1b;
                      border-radius: 4px;
                      padding: 8px 12px;
                      z-index: 1;
                      box-shadow: 0px 0px 10px -6px #486c1b;
                      width: 300px;
                      display: none;
                    `}
                  >
                    <p
                      css={css`
                        margin: 0;
                        font-size: 14px;
                      `}
                    >
                      Unpaid Invoices:{" "}
                      <b>
                        {" "}
                        <big>KES60,000 </big>
                      </b>
                    </p>
                    <hr />
                    <p
                      css={css`
                        margin: 0;
                        font-size: 14px;
                      `}
                    >
                      Loans :{" "}
                      <b>
                        {" "}
                        <big>KES210,000 </big>
                      </b>
                    </p>
                  </div>
                </div>
              </>
            ) : activeTab === "Expenses & Budget" ? (
              <>
                <span style={{ color: "#486c1b" }}>
                  Running Balance:{" "}
                  <b>
                    <big>KES{runningBalance.toLocaleString("en-US")}</big>
                  </b>
                </span>
                <select
                  css={btnSecondary}
                  value={selectedMonth}
                  onChange={(e) => {
                    const selectedValue = e.target.value;

                    if (selectedValue === "new") {
                      setActiveTab("Request Funding");
                    } else if (selectedValue === "pending") {
                      setActiveTab("Pending Incurred Costs");
                    } else {
                      setreceiptId(selectedValue);
                      setActiveTab("Receipt Breakdown");
                    }
                  }}
                >
                  <option>Receipts Breakdown</option>
                  <hr style={{ border: "2px dotted #ffffff" }} />
                  {receipts.map((receipt, index) => (
                    <option key={index} value={receipt.id}>
                      Receipt KES {receipt.amount.toLocaleString("en-US")} -{" "}
                      {receipt.date}
                    </option>
                  ))}
                </select>
              </>
            ) : activeTab === "Livestock & Production" ? (
              <>
                <span
                  style={{ color: "#486c1b", cursor: "pointer" }}
                  onClick={() => setActiveTab("Livestock Report")}
                >
                  <b>Livestock Report {"\u00BB"}</b>{" "}
                </span>
                {/* <button
                  css={btnSecondary}
                  onClick={() => setActiveTab("Production")}
                >
                  Log Production
                </button>
                <button
                  css={btnSecondary}
                  onClick={() => setActiveTab("Livestock")}
                >
                  Livestock Entry
                </button> */}
              </>
            ) : activeTab === "Staff Management" ? (
              <>
                <span style={{ color: "#486c1b" }}>
                  {payrollmonth} Salary:{" "}
                  <b>
                    <big>KES {totalsalary.toLocaleString()}</big>
                  </b>
                </span>
                {/* <button
                  css={btnSecondary}
                  onClick={() => setActiveTab("Hire staff")}
                >
                  Onboard New Staff
                </button> */}
              </>
            ) : activeTab === "Livestock Report" ||
              activeTab === "Receipt Breakdown" ||
              activeTab === "Production Report" ||
              activeTab === "Staff Management" ||
              activeTab === "Payroll Report" ||
              activeTab === "Invoice Details" ||
              activeTab === "Budget" ? (
              <button
                css={btnSecondary}
                onClick={() => setActiveTab("Create Expense")}
              >
                Download
              </button>
            ) : (
              ""
            )}

            {/* //second button */}

            {activeTab === "Sales" ? (
              <>
                <select
                  css={btnPrimary}
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    if (e.target.value) {
                      setActiveTab("Sales Report");
                    }
                  }}
                >
                  <option value=""> Sales Report</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </>
            ) : activeTab === "Expenses & Budget" ? (
              <>
                <select
                  css={btnPrimary}
                  value={budgetId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "new") {
                      setActiveTab("Create Budget");
                      setBudgetId(val);
                    } else {
                      setActiveTab("Budget");
                      setBudgetId(Number(val));
                    }
                  }}
                >
                  <option>Budgets</option>
                  {budgetMonthsData.map((month, index) => (
                    <option key={index} value={month.id}>
                      {month.name}{" "}
                      {month.status === 1 ? "Budget Awaits Funding" : ""}
                    </option>
                  ))}
                </select>
              </>
            ) : activeTab === "Livestock & Production" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setProductionId(e.target.value);
                    setActiveTab("Production Report");
                  }
                }}
              >
                <option value="">Monthly Production</option>
                {productionperiodData.map((item, index) => (
                  <option key={`period-${index}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : activeTab === "Staff Management" ||
              activeTab === "Payroll Report" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedMonth(value);
                  if (value === "new") {
                    setIsPayrollModalOpen(true);
                  } else if (value) {
                    setPayrollId(value);
                    setActiveTab("Payroll Report");
                  }
                }}
              >
                <option value="">Monthly Payrolls</option>
                {payrollmonths.map((month, index) => (
                  <option key={index} value={month.id}>
                    {month.name}
                  </option>
                ))}
              </select>
            ) : activeTab === "Budget" ? (
              <select
                css={btnPrimary}
                value={budgetId}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "new") {
                    setActiveTab("Create Budget");
                    setBudgetId(val);
                  } else {
                    setActiveTab("Budget");
                    setBudgetId(Number(val));
                  }
                }}
              >
                <option>Budgets</option>
                {budgetMonthsData.map((month, index) => (
                  <option key={index} value={month.id}>
                    {month.name}{" "}
                    {month.status === 1 ? "Budget Awaits Funding" : ""}
                  </option>
                ))}
              </select>
            ) : activeTab === "Production Report" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setProductionId(e.target.value);
                    setActiveTab("Production Report");
                  }
                }}
              >
                <option value="">Monthly Production</option>
                {productionperiodData.map((item, index) => (
                  <option key={`period-${index}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : activeTab === "Receipt Breakdown" ||
              activeTab === "Pending Incurred Costs" ? (
              <select
                css={btnSecondary}
                value={selectedMonth}
                onChange={(e) => {
                  const selectedValue = e.target.value;

                  if (selectedValue === "new") {
                    setActiveTab("Request Funding");
                  } else if (selectedValue === "pending") {
                    setActiveTab("Pending Incurred Costs");
                  } else {
                    setreceiptId(selectedValue);
                    setActiveTab("Receipt Breakdown");
                  }
                  console.log(activeTab);
                }}
              >
                <option value="">Receipts Breakdown</option>
                <hr style={{ border: "2px dotted #ffffff" }} />
                {receipts.map((receipt, index) => (
                  <option key={index} value={receipt.id}>
                    Receipt {receipt.amount.toLocaleString("en-US")} -{" "}
                    {receipt.date}
                  </option>
                ))}
              </select>
            ) : activeTab === "Production Report" ? (
              <select
                css={btnPrimary}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  if (e.target.value) {
                    setProductionId(e.target.value);
                    setActiveTab("Production Report");
                  }
                }}
              >
                <option value="">Monthly Production</option>
                {productionperiodData.map((item, index) => (
                  <option key={`period-${index}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            ) : (
              <>
                {activeTab === "Dashboard" ? (
                  <div
                    css={css`
                      position: relative;
                      display: inline-block;
                      cursor: pointer;

                      &:hover .tooltip-content,
                      .tooltip-content:hover {
                        visibility: visible;
                        opacity: 1;
                      }
                    `}
                  >
                    <span
                      css={css`
                        font-size: 24px;
                        color: blue;
                        display: inline-block;
                        animation: shake 0.5s ease-in-out infinite;
                        transform-origin: 50% 0;

                        @keyframes shake {
                          0% {
                            transform: rotate(0deg);
                          }
                          25% {
                            transform: rotate(-5deg);
                          }
                          50% {
                            transform: rotate(0deg);
                          }
                          75% {
                            transform: rotate(5deg);
                          }
                          100% {
                            transform: rotate(0deg);
                          }
                        }

                        &:hover {
                          animation-play-state: paused;
                        }
                        &:hover + .tooltip-content {
                          visibility: visible;
                          opacity: 1;
                          pointer-events: auto;
                        }
                      `}
                    >
                      &#128276;
                    </span>

                    <div
                      className="tooltip-content"
                      css={css`
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background-color: #ffffff;
                        border: 1px solid #486c1b;
                        color: #486c1b;
                        border-radius: 4px;
                        padding: 8px 12px;
                        z-index: 1;
                        box-shadow: 0px 0px 10px -6px #486c1b;
                        width: 150px;
                        margin-top: 8px;
                        transition: opacity 0.2s ease-in-out;
                        visibility: hidden;
                        opacity: 0;
                        pointer-events: none;
                        &:hover {
                          visibility: visible;
                          opacity: 1;
                          pointer-events: auto;
                        }
                      `}
                    >
                      <p
                        css={css`
                          margin: 0;
                          font-size: 14px;
                        `}
                      >
                        Meeting Scheduled for{" "}
                        <b>
                          <big>3:00 PM Monday 18th</big>
                        </b>{" "}
                        at the HQ Riverside Main Office
                      </p>
                      <p
                        css={css`
                          margin: 0;
                          font-size: 14px;
                        `}
                      >
                        Purpose: Financials Reconciliation
                      </p>
                      <hr />
                      <p onClick={() => setActiveTab("Pending Incurred Costs")}>
                        Fund Incurred cost KES {incurred.toLocaleString()} –{" "}
                        {datecreated}
                      </p>
                      <hr />
                      {budgetMonthsData.map((month, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setActiveTab("Budget");
                            setBudgetId(Number(month.id));
                          }}
                        >
                          {month.status === 1
                            ? month.name + "Budget Awaits Funding"
                            : ""}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <button
                  css={btnSecondary}
                  onClick={() => setIsMeetingModalOpen(true)}
                >
                  {activeTab === "Staff Review"
                    ? "Give Raise"
                    : "Schedule a meeting"}
                </button>

                <select
                  css={btnPrimary}
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    if (e.target.value) {
                      setActiveTab("Profit & Loss");
                    }
                  }}
                >
                  <option value="">
                    {" "}
                    {activeTab === "Staff Review"
                      ? "Payslips"
                      : "Profit and Loss Report"}
                  </option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </header>

        {/* Filters */}
        <div css={filtersStyles}>
          {getFilteredComponent(activeTab, setActiveTab)}
        </div>
      </main>
      <PayrollModal
        isOpen={isPayrollModalOpen}
        onClose={() => {
          setIsPayrollModalOpen(false);
          setSelectedMonth("");
        }}
        onSubmit={(month, note) => {
          // The API call is now handled inside the PayrollModal component
          setIsPayrollModalOpen(false);
          setSelectedMonth("");
          // Navigate to the payroll report for the new month
          setActiveTab("Payroll Report");
        }}
      />
      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => {
          setIsMeetingModalOpen(false);
        }}
        onSubmit={(dateTime, purpose) => {
          // The API call is now handled inside the MeetingModal component
          setIsMeetingModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
