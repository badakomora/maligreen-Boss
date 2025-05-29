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
import { toast, ToastContainer } from "react-toastify";
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

// ApproveModal Component Interface - Updated to include incurred and datecreated
interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    amount: number,
    budgetAmount: number,
    approvalDate: string
  ) => void;
  incurred?: number;
  datecreated?: string;
  activeTab?: string;
  budgetAmount?: number | string; // Add this line
}

// DeclineModal Component Interface
interface DeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  activeTab?: string;
}

// Update the modalOverlayStyles with a smooth animation
const modalOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100%;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Update the modalContentStyles with better styling and animation
const modalContentStyles = css`
  background: white;
  padding: 0;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  max-height: 90vh;
  margin: auto;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Replace the MeetingModal component with this improved version
const MeetingModal = ({ isOpen, onClose, onSubmit }: MeetingModalProps) => {
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the backend API to schedule a meeting with the correct parameter names
      const response = await axios.post(`${serverUrl}item/scheduleMeeting`, {
        purpose,
        datescheduled: date, // Changed from 'date' to 'datescheduled' to match backend
        venue,
        note,
      });

      // Reset form
      setPurpose("");
      setDate("");
      setVenue("");
      setNote("");

      toast.success(response.data.tab);
      onClose();
      onSubmit(date, purpose); // Call the onSubmit prop with the form data
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting. Please try again.");
    }
  };

  if (!isOpen) return null;

  // Theme Colors
  const colors = {
    primary: "#486c1b",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

  // Styles
  const styles = {
    header: css`
      background-color: ${colors.lightGreen};
      padding: 20px 30px;
      border-bottom: 1px solid ${colors.border};
    `,
    container: css`
      padding: 30px;
      background-color: ${colors.white};
    `,
    heading: css`
      color: ${colors.primary};
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    `,
    subheading: css`
      color: ${colors.text};
      font-size: 14px;
      margin-top: 5px;
      opacity: 0.8;
    `,
    label: css`
      font-size: 14px;
      font-weight: 600;
      color: ${colors.primary};
      margin-bottom: 8px;
      display: block;
    `,
    inputcontainer: css`
      width: 100%;
      margin-bottom: 20px;
    `,
    input: css`
      font-size: 15px;
      color: ${colors.text};
      background-color: ${colors.white};
      width: 100%;
      padding: 12px 15px;
      border: 1px solid ${colors.border};
      border-radius: 8px;
      box-sizing: border-box;
      transition: all 0.2s ease;

      &::placeholder {
        color: #a0aec0;
      }
      &:focus {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(72, 108, 27, 0.15);
        outline: none;
      }
    `,
    row: css`
      display: flex;
      gap: 20px;
      margin-bottom: 20px;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 0;
      }
    `,
    buttonContainer: css`
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 10px;
    `,
    submitButton: css`
      ${btnPrimary}
      padding: 12px 24px;
      font-size: 15px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(72, 108, 27, 0.2);
      }
    `,
    cancelButton: css`
      ${btnSecondary}
      padding: 12px 24px;
      font-size: 15px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    `,
  };

  return (
    <div
      css={modalOverlayStyles}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div css={modalContentStyles}>
        <div css={styles.header}>
          <h1 css={styles.heading}>Schedule a Meeting</h1>
          <p css={styles.subheading}>
            Fill in the details to schedule your meeting
          </p>
        </div>
        <div css={styles.container}>
          <form onSubmit={handleSubmit}>
            <div css={styles.inputcontainer}>
              <label css={styles.label}>Purpose</label>
              <input
                css={styles.input}
                type="text"
                placeholder="What is this meeting about?"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </div>

            <div css={styles.row}>
              <div css={styles.inputcontainer}>
                <label css={styles.label}>Date</label>
                <input
                  css={styles.input}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div css={styles.inputcontainer}>
                <label css={styles.label}>Venue</label>
                <input
                  css={styles.input}
                  type="text"
                  placeholder="Meeting location"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </div>
            </div>

            <div css={styles.inputcontainer}>
              <label css={styles.label}>Additional Notes</label>
              <textarea
                css={[
                  styles.input,
                  css`
                    min-height: 100px;
                    resize: vertical;
                  `,
                ]}
                placeholder="Any additional information about the meeting"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div css={styles.buttonContainer}>
              <button type="button" css={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" css={styles.submitButton}>
                Schedule Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ApproveModal Component - Fixed to properly handle incurred and datecreated
const ApproveModal = ({
  isOpen,
  onClose,
  onSubmit,
  incurred = 0,
  datecreated = "",
  activeTab = "",
  budgetAmount: propBudgetAmount = "", // Add this line
}: ApproveModalProps) => {
  const [amount, setAmount] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(
    propBudgetAmount?.toString() || ""
  );
  const [approvalDate, setApprovalDate] = useState("");

  // Set default values when modal opens
  useEffect(() => {
    if (isOpen) {
      if (incurred > 0) {
        setAmount(incurred.toString());
      }
      if (datecreated) {
        setApprovalDate(datecreated);
      }
      // Add this: Set budget amount from props if available
      if (propBudgetAmount && propBudgetAmount !== "") {
        setBudgetAmount(propBudgetAmount.toString());
      }
    }
  }, [isOpen, incurred, datecreated, propBudgetAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Determine the type and amount based on activeTab
      let type, finalAmount, note;

      if (activeTab === "Incurred Costs") {
        type = "Incurred Cost";
        finalAmount = Number.parseFloat(amount || incurred.toString());
        note = `Approved incurred cost funding - KES ${finalAmount.toLocaleString()}`;
      } else {
        type = "Proposed Budget";
        finalAmount = Number.parseFloat(budgetAmount);
        note = `Approved budget funding - KES ${finalAmount.toLocaleString()}`;
      }

      // Call the newReceipt endpoint with the type
      const response = await axios.post(`${serverUrl}item/newReceipt`, {
        amount: finalAmount,
        date: approvalDate,
        note: note,
        type: type,
      });

      toast.success(response.data.tab);

      // Reset form
      setAmount("");
      setBudgetAmount("");
      setApprovalDate("");

      onClose();
      onSubmit(
        finalAmount,
        Number.parseFloat(budgetAmount || "0"),
        approvalDate
      );
    } catch (error) {
      console.error("Error submitting approval:", error);
      toast.error("Failed to submit approval. Please try again.");
    }
  };

  if (!isOpen) return null;

  // Theme Colors
  const colors = {
    primary: "#486c1b",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

  // Styles
  const styles = {
    header: css`
      background-color: ${colors.lightGreen};
      padding: 20px 30px;
      border-bottom: 1px solid ${colors.border};
    `,
    container: css`
      padding: 30px;
      background-color: ${colors.white};
    `,
    heading: css`
      color: ${colors.primary};
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    `,
    subheading: css`
      color: ${colors.text};
      font-size: 14px;
      margin-top: 5px;
      opacity: 0.8;
    `,
    label: css`
      font-size: 14px;
      font-weight: 600;
      color: ${colors.primary};
      margin-bottom: 8px;
      display: block;
    `,
    inputcontainer: css`
      width: 100%;
      margin-bottom: 20px;
    `,
    input: css`
      font-size: 15px;
      color: ${colors.text};
      background-color: ${colors.white};
      width: 100%;
      padding: 12px 15px;
      border: 1px solid ${colors.border};
      border-radius: 8px;
      box-sizing: border-box;
      transition: all 0.2s ease;

      &::placeholder {
        color: #a0aec0;
      }
      &:focus {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(72, 108, 27, 0.15);
        outline: none;
      }
    `,
    buttonContainer: css`
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 10px;
    `,
    submitButton: css`
      ${btnPrimary}
      padding: 12px 24px;
      font-size: 15px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(72, 108, 27, 0.2);
      }
    `,
    cancelButton: css`
      ${btnSecondary}
      padding: 12px 24px;
      font-size: 15px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    `,
  };

  return (
    <div
      css={modalOverlayStyles}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div css={modalContentStyles}>
        <div css={styles.header}>
          <h1 css={styles.heading}>
            {activeTab === "Incurred Costs"
              ? "Approve Incurred Cost"
              : activeTab === "Proposed Budget"
              ? "Approve Budget"
              : "Approve Request"}
          </h1>
          <p css={styles.subheading}>
            Enter the approval details and funding information
          </p>
        </div>
        <div css={styles.container}>
          <form onSubmit={handleSubmit}>
            {/* Only show Amount input if NOT "Proposed Budget" */}
            {activeTab !== "Proposed Budget" && (
              <div css={styles.inputcontainer}>
                <label css={styles.label}>Amount to be Sent (KES)</label>
                <input
                  css={styles.input}
                  type="number"
                  step="0.01"
                  placeholder="Enter amount to be sent"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required={activeTab !== "Proposed Budget"}
                />
              </div>
            )}

            {/* Only show Budget Amount input if NOT "Incurred Costs" */}
            {activeTab !== "Incurred Costs" && (
              <div css={styles.inputcontainer}>
                <label css={styles.label}>Budget Amount (KES)</label>
                <input
                  css={styles.input}
                  type="number"
                  step="0.01"
                  placeholder="Enter budget amount"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  required={activeTab !== "Incurred Costs"}
                />
              </div>
            )}

            <div css={styles.inputcontainer}>
              <label css={styles.label}>Date of Approval/Funding</label>
              <input
                css={styles.input}
                type="date"
                value={approvalDate}
                onChange={(e) => setApprovalDate(e.target.value)}
                required
              />
            </div>

            <div css={styles.buttonContainer}>
              <button type="button" css={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" css={styles.submitButton}>
                {activeTab === "Incurred Costs"
                  ? "Approve & Fund"
                  : activeTab === "Proposed Budget"
                  ? "Approve Budget"
                  : "Approve & Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// DeclineModal Component
const DeclineModal = ({
  isOpen,
  onClose,
  onSubmit,
  activeTab = "",
}: DeclineModalProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Determine the type based on activeTab
      let type;
      if (activeTab === "Incurred Costs") {
        type = "Incurred Cost";
      } else if (activeTab === "Proposed Budget") {
        type = "Proposed Budget";
      }

      // Call the backend API to decline with the reason and type
      const response = await axios.post(`${serverUrl}item/decline`, {
        reason,
        type,
      });

      // Reset form
      setReason("");

      toast.success(response.data.tab);
      onClose();
      onSubmit(reason);
    } catch (error) {
      console.error("Error submitting decline:", error);
      toast.error("Failed to submit decline. Please try again.");
    }
  };

  if (!isOpen) return null;

  // Theme Colors
  const colors = {
    primary: "#486c1b",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

  // Styles
  const styles = {
    header: css`
      background-color: ${colors.lightGreen};
      padding: 20px 30px;
      border-bottom: 1px solid ${colors.border};
    `,
    container: css`
      padding: 30px;
      background-color: ${colors.white};
    `,
    heading: css`
      color: ${colors.primary};
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    `,
    subheading: css`
      color: ${colors.text};
      font-size: 14px;
      margin-top: 5px;
      opacity: 0.8;
    `,
    label: css`
      font-size: 14px;
      font-weight: 600;
      color: ${colors.primary};
      margin-bottom: 8px;
      display: block;
    `,
    inputcontainer: css`
      width: 100%;
      margin-bottom: 20px;
    `,
    input: css`
      font-size: 15px;
      color: ${colors.text};
      background-color: ${colors.white};
      width: 100%;
      padding: 12px 15px;
      border: 1px solid ${colors.border};
      border-radius: 8px;
      box-sizing: border-box;
      transition: all 0.2s ease;
      min-height: 100px;
      resize: vertical;

      &::placeholder {
        color: #a0aec0;
      }
      &:focus {
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(72, 108, 27, 0.15);
        outline: none;
      }
    `,
    buttonContainer: css`
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 10px;
    `,
    submitButton: css`
      ${btnPrimary}
      padding: 12px 24px;
      font-size: 15px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(72, 108, 27, 0.2);
      }
    `,
    cancelButton: css`
      ${btnSecondary}
      padding: 12px 24px;
      font-size: 15px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    `,
  };

  return (
    <div
      css={modalOverlayStyles}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div css={modalContentStyles}>
        <div css={styles.header}>
          <h1 css={styles.heading}>
            {activeTab === "Incurred Costs"
              ? "Decline Incurred Cost"
              : activeTab === "Proposed Budget"
              ? "Decline Budget"
              : "Decline Request"}
          </h1>
          <p css={styles.subheading}>
            Please provide a reason for declining this request
          </p>
        </div>
        <div css={styles.container}>
          <form onSubmit={handleSubmit}>
            <div css={styles.inputcontainer}>
              <label css={styles.label}>Reason for Decline</label>
              <textarea
                css={styles.input}
                placeholder={
                  activeTab === "Incurred Costs"
                    ? "e.g. Insufficient documentation, Amount exceeds limits"
                    : activeTab === "Proposed Budget"
                    ? "e.g. Budget exceeds allocated limits, Requires revision"
                    : "e.g. Budget exceeds allocated limits, Requires additional justification"
                }
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div css={styles.buttonContainer}>
              <button type="button" css={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" css={styles.submitButton}>
                {activeTab === "Incurred Costs"
                  ? "Decline Cost"
                  : activeTab === "Proposed Budget"
                  ? "Decline Budget"
                  : "Decline Request"}
              </button>
            </div>
          </form>
        </div>
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
  venue: string;
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
  const [invoiceId] = useState(0);
  const [expenseId] = useState(0);
  const [livestockId] = useState(0);
  const [staffId, setStaffId] = useState(0);
  const [budgetId, setBudgetId] = useState<number | string>(0);
  const [receiptId, setreceiptId] = useState<number | string>(0);
  const [payrollId, setPayrollId] = useState<number | string>(0);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  // FIX: Added the missing budgetAmount state
  const [budgetAmount, setBudgetAmount] = useState<number | string>("");

  const [budgetMonthsData, setBudgetMonthsData] = useState<items[]>([]);
  const [totalsales, setTotalSalesData] = useState(0);
  const [payrollmonths, setPayrollMonths] = useState<items[]>([]);
  const [scheduledmeeting, setScheduledMeeting] = useState<items[]>([]);

  const [receipts, setReceiptsData] = useState<receiptsType[]>([]);
  const [productionperiodData, setproductionPeriodData] = useState<items[]>([]);
  const [productionId, setProductionId] = useState<string | number>(0);
  const [incurred, setIncurred] = useState(0);
  const [datecreated, setCreateddate] = useState("");
  const [payrollmonth, setPayrollMonth] = useState("");
  const [totalsalary, setTotalSalary] = useState(0);

  const [cashTotal, setCashTotal] = useState(0);
  const [tillTotal, setTillTotal] = useState(0);
  const [bankTotal, setBankTotal] = useState(0);
  const [unpaidtotal, setUnpaidTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
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

    const fetchmeeting = async () => {
      try {
        const response = await axios.get(`${serverUrl}item/meeting/list`);
        const meetingList = response.data.list.map(
          (item: {
            id: number;
            purpose: string;
            datescheduled: string;
            venue: string;
            note: string;
            status: number;
            datecreated: string;
          }) => ({
            id: item.id,
            name: `${item.datescheduled} - ${item.purpose}`, // or any preferred label
            status: item.status,
            venue: item.venue,
            note: item.note,
            datecreated: item.datecreated,
          })
        );
        setScheduledMeeting(meetingList); // Rename this to setMeetingData for clarity?
      } catch (error) {
        console.error("Error fetching meeting list:", error);
      }
    };

    const totalbudgetcost = async () => {
      try {
        const response = await axios.get(`${serverUrl}budget/${budgetId}`);
        const cost = response.data.totalCost;
        setBudgetAmount(cost || ""); // FIX: Now this will work correctly
      } catch (error) {
        console.error("Error fetching budget total cost:", error);
      }
    };

    const productionperiod = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}item/productionperiodlist`
        );
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

        const { chartdata, totalsales, unpaid } = response.data;

        // Get the latest row (most recent day)
        const latest = chartdata?.[0] || {};

        setTotalSalesData(totalsales);

        setCashTotal(Number(latest.cashrevenue || 0));
        setTillTotal(Number(latest.tillrevenue || 0));
        setBankTotal(Number(latest.bankrevenue || 0));
        setUnpaidTotal(Number(unpaid || 0));
      } catch (error) {
        console.error("Error fetching invoice revenue breakdown:", error);
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
        setTotalSalary(response.data.totalsalary || 0);
        setPayrollMonth(response.data.monthadded);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    getreceipts();
    fetchBudgetMonths();
    productionperiod();
    revenue();
    fetchInccurredItems();
    fetchMonths();
    prevpayroll();
    fetchmeeting();
    totalbudgetcost();
  }, [activeTab, budgetId, totalsales]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const notificationPanel = document.querySelector(".tooltip-content");
      const bellIcon = document.querySelector(".bell-icon");

      if (
        isNotificationOpen &&
        notificationPanel &&
        bellIcon &&
        !notificationPanel.contains(target) &&
        !bellIcon.contains(target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

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
      case "Proposed Budget":
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
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
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
                        <big>KES {cashTotal}</big>
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
                        <big>KES {tillTotal} </big>
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
                        <big>KES {bankTotal} </big>
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
                      <big>KES {unpaidtotal.toLocaleString()} </big>
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
                        <big>KES {unpaidtotal.toLocaleString()} </big>
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
                        <big> N/A </big>
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
                      setActiveTab("Incurred Costs");
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
              </>
            ) : activeTab === "Staff Management" ? (
              <>
                <span style={{ color: "#486c1b" }}>
                  {payrollmonth} Salary:{" "}
                  <b>
                    <big>KES {totalsalary.toLocaleString()}</big>
                  </b>
                </span>
              </>
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
                  {budgetMonthsData
                    .filter((month) => month.status !== 1 && month.status !== 2)
                    .map((month, index) => (
                      <option key={index} value={month.id}>
                        {month.name}
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
                  if (value) {
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
                  {budgetMonthsData
                    .filter((month) => month.status !== 1 && month.status !== 2)
                    .map((month, index) => (
                      <option key={index} value={month.id}>
                        {month.name}
                      </option>
                    ))}
                </select>
              </>
            ) : activeTab === "Proposed Budget" ? (
              <>
                <button
                  css={btnSecondary}
                  onClick={() => {
                    setIsApproveModalOpen(true);
                    setBudgetId(budgetId);
                  }}
                >
                  Approve
                </button>
                <button
                  css={btnPrimary}
                  onClick={() => setIsDeclineModalOpen(true)}
                >
                  Decline
                </button>
              </>
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
            ) : activeTab === "Incurred Costs" ? (
              <>
                <button
                  css={btnPrimary}
                  onClick={() => setIsApproveModalOpen(true)}
                >
                  Approve
                </button>
                <button
                  css={btnSecondary}
                  onClick={() => setIsDeclineModalOpen(true)}
                >
                  Decline
                </button>
              </>
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
                    `}
                  >
                    <span
                      className="bell-icon"
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
                      `}
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    >
                      {/* scheduledmeeting.length > 0 */}
                      {/* incurred */}
                      {/* budgetMonthsData */}
                      {scheduledmeeting.length > 0 ||
                      budgetMonthsData.length > 0 ||
                      incurred
                        ? "\u{1F514}"
                        : ""}
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
                        width: 200px;
                        margin-top: 8px;
                        transition: opacity 0.2s ease-in-out;
                        visibility: ${isNotificationOpen
                          ? "visible"
                          : "hidden"};
                        opacity: ${isNotificationOpen ? "1" : "0"};
                        pointer-events: ${isNotificationOpen ? "auto" : "none"};
                      `}
                    >
                      {scheduledmeeting.length > 0 ? (
                        scheduledmeeting.map((meeting, index) => (
                          <div key={index}>
                            <p
                              css={css`
                                margin: 0;
                                font-size: 14px;
                              `}
                            >
                              Meeting Scheduled for{" "}
                              <b>
                                <big>{meeting.name.split(" - ")[0]}</big>
                              </b>{" "}
                              at {meeting.venue}
                            </p>
                            <p
                              css={css`
                                margin: 0;
                                font-size: 14px;
                              `}
                            >
                              Purpose: {meeting.name.split(" - ")[1]}
                            </p>
                            {index < scheduledmeeting.length - 1 && <hr />}
                          </div>
                        ))
                      ) : (
                        <p
                          css={css`
                            margin: 0;
                            font-size: 14px;
                          `}
                        >
                          No meetings scheduled
                        </p>
                      )}
                      <hr />
                      {incurred ? (
                        <p onClick={() => setActiveTab("Incurred Costs")}>
                          Incurred cost KES {incurred.toLocaleString()}
                          {" submitted  on "} {datecreated} {" for approval"}
                        </p>
                      ) : (
                        ""
                      )}

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
                            ? ""
                            : month.name + " Budget submitted for approval"}
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
                  Schedule a meeting
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
                  <option value="">Profit and Loss Report</option>
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
      <ApproveModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onSubmit={(amount, budgetAmount, approvalDate) => {
          console.log("Approved:", { amount, budgetAmount, approvalDate });
          setIsApproveModalOpen(false);
        }}
        incurred={incurred}
        datecreated={datecreated}
        activeTab={activeTab}
        budgetAmount={budgetAmount} // Add this line
      />
      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onSubmit={(reason) => {
          console.log("Declined with reason:", reason);
          setIsDeclineModalOpen(false);
        }}
        activeTab={activeTab}
      />
    </div>
  );
}

export default App;
