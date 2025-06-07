/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Navbar } from "./Componenets/Navbar";
import { Grid } from "./Componenets/Grid";
import { Block } from "./Componenets/Block";
import { Budget } from "./Componenets/Budget";
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

// PayrollModal Component Interface
interface PayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (month: string, year: string) => void;
}

// ApproveModal Component Interface
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
  budgetAmount?: number | string;
  refreshData?: () => Promise<void>;
}

// DeclineModal Component Interface
interface DeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  activeTab?: string;
  refreshData?: () => Promise<void>;
}

// Modal styles
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

// Notification tooltip styles
const notificationTooltipStyles = css`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 300px;
  max-width: 400px;
  z-index: 1000;
  margin-top: 8px;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
  }
`;

const notificationItemStyles = css`
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const notificationHeaderStyles = css`
  font-weight: 600;
  color: #2a61ae;
  margin-bottom: 8px;
  font-size: 14px;
`;

const notificationTextStyles = css`
  color: #64748b;
  font-size: 13px;
  line-height: 1.4;
`;

const notificationActionStyles = css`
  color: #2a61ae;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 4px;

  &:hover {
    color: #1e40af;
  }
`;

// Revenue breakdown tooltip styles
const revenueTooltipStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 250px;
  z-index: 1000;
  margin-top: 8px;
  animation: slideDown 0.2s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
  }
`;

const revenueItemStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
    font-weight: 600;
    color: #2a61ae;
  }
`;

// PayrollModal Component
const PayrollModal = ({ isOpen, onClose, onSubmit }: PayrollModalProps) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}payroll/create`, {
        month,
        year,
      });

      setMonth("");
      setYear("");

      toast.success(response.data.message || "Payroll created successfully");
      onClose();
      onSubmit(month, year);
    } catch (error) {
      console.error("Error creating payroll:", error);
      toast.error("Failed to create payroll. Please try again.");
    }
  };

  if (!isOpen) return null;

  const colors = {
    primary: "#2a61ae",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

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
          <h1 css={styles.heading}>Create New Payroll</h1>
          <p css={styles.subheading}>Set up a new monthly payroll period</p>
        </div>
        <div css={styles.container}>
          <form onSubmit={handleSubmit}>
            <div css={styles.inputcontainer}>
              <label css={styles.label}>Month</label>
              <select
                css={styles.input}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div css={styles.inputcontainer}>
              <label css={styles.label}>Year</label>
              <input
                css={styles.input}
                type="number"
                placeholder="Enter year (e.g., 2024)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="2020"
                max="2030"
                required
              />
            </div>

            <div css={styles.buttonContainer}>
              <button type="button" css={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" css={styles.submitButton}>
                Create Payroll
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// MeetingModal Component
const MeetingModal = ({ isOpen, onClose, onSubmit }: MeetingModalProps) => {
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}item/scheduleMeeting`, {
        purpose,
        datescheduled: date,
        venue,
        note,
      });

      setPurpose("");
      setDate("");
      setVenue("");
      setNote("");

      toast.success(response.data.tab);
      onClose();
      onSubmit(date, purpose);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      toast.error("Failed to schedule meeting. Please try again.");
    }
  };

  if (!isOpen) return null;

  const colors = {
    primary: "#2a61ae",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

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

// ApproveModal Component
const ApproveModal = ({
  isOpen,
  onClose,
  onSubmit,
  incurred = 0,
  datecreated = "",
  activeTab = "",
  budgetAmount: propBudgetAmount = "",
  refreshData,
}: ApproveModalProps) => {
  const [amount, setAmount] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(
    propBudgetAmount?.toString() || ""
  );
  const [approvalDate, setApprovalDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (incurred > 0) {
        setAmount(incurred.toString());
      }
      if (datecreated) {
        setApprovalDate(datecreated);
      }
      if (propBudgetAmount && propBudgetAmount !== "") {
        setBudgetAmount(propBudgetAmount.toString());
      }
    }
  }, [isOpen, incurred, datecreated, propBudgetAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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

      const response = await axios.post(`${serverUrl}item/newReceipt`, {
        amount: finalAmount,
        date: approvalDate,
        note: note,
        type: type,
      });

      toast.success(response.data.tab);

      setAmount("");
      setBudgetAmount("");
      setApprovalDate("");

      onClose();
      onSubmit(
        finalAmount,
        Number.parseFloat(budgetAmount || "0"),
        approvalDate
      );

      if (refreshData) {
        await refreshData();
      }
    } catch (error) {
      console.error("Error submitting approval:", error);
      toast.error("Failed to submit approval. Please try again.");
    }
  };

  if (!isOpen) return null;

  const colors = {
    primary: "#2a61ae",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

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
  refreshData,
}: DeclineModalProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let type;
      if (activeTab === "Incurred Costs") {
        type = "Incurred Cost";
      } else if (activeTab === "Proposed Budget") {
        type = "Proposed Budget";
      }

      const response = await axios.post(`${serverUrl}item/decline`, {
        reason,
        type,
      });

      setReason("");

      toast.success(response.data.tab);
      onClose();
      onSubmit(reason);

      if (refreshData) {
        await refreshData();
      }
    } catch (error) {
      console.error("Error submitting decline:", error);
      toast.error("Failed to submit decline. Please try again.");
    }
  };

  if (!isOpen) return null;

  const colors = {
    primary: "#2a61ae",
    white: "#ffffff",
    background: "#f8f9fa",
    border: "#e2e8f0",
    text: "#333333",
    lightGreen: "#ecf4e4",
  };

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
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  background:#2a61ae;
  border: none;
  color: #ffffff;

  &:hover {
    background: #ffffff;
    color: #1e40af;
    border: 1px solid #1e40af;
  }
  &:disabled {
    background: #a5b99a;
    cursor: not-allowed;
  }
`;

const btnSecondary = css`
  ${buttonStyles}
  background: #ffffff;
  border: 1px solid#2a61ae;
  color: #2a61ae;

  &:hover {
    background: #2a61ae;
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

export default function App() {
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
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isRevenueTooltipOpen, setIsRevenueTooltipOpen] = useState(false);
  const [isReceivableTooltipOpen, setIsReceivableTooltipOpen] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);

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
    setIsComponentLoading(true);
    localStorage.setItem("activeTab", activeTab);

    // Simulate component loading time and fetch data
    const loadComponent = async () => {
      try {
        await fetchAllData();
        // Add a small delay to show loading state
        setTimeout(() => {
          setIsComponentLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error loading component:", error);
        setIsComponentLoading(false);
      }
    };
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchBudgetMonths(),
          fetchMeeting(),
          fetchTotalBudgetCost(),
          fetchProductionPeriod(),
          fetchReceipts(),
          fetchRevenue(),
          fetchIncurredItems(),
          fetchPayrollMonths(),
          fetchPreviousPayroll(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load some data. Please refresh the page.");
      }
    };
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
        console.error("Error fetching budget months:", error);
      }
    };

    const fetchMeeting = async () => {
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
            name: `${item.datescheduled} - ${item.purpose}`,
            status: item.status,
            venue: item.venue,
            note: item.note,
            datecreated: item.datecreated,
          })
        );
        setScheduledMeeting(meetingList);
      } catch (error) {
        console.error("Error fetching meeting list:", error);
      }
    };

    const fetchTotalBudgetCost = async () => {
      try {
        if (budgetId) {
          const response = await axios.get(`${serverUrl}budget/${budgetId}`);
          const cost = response.data.totalCost;
          setBudgetAmount(cost || "");
        }
      } catch (error) {
        console.error("Error fetching budget total cost:", error);
      }
    };

    const fetchProductionPeriod = async () => {
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

    const fetchReceipts = async () => {
      try {
        const response = await axios.get(`${serverUrl}item/receiptList`);
        const filteredSales = response.data.list.map(
          (item: { id: number; amount: number; datesent: string }) => ({
            id: item.id,
            amount: item.amount,
            date: new Date(item.datesent).toLocaleDateString(),
          })
        );
        setReceiptsData(filteredSales);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    const fetchRevenue = async () => {
      try {
        const response = await axios.get(`${serverUrl}invoice/list`);
        const { chartdata, totalsales, unpaid } = response.data;

        const latest = chartdata?.[0] || {};
        setTotalSalesData(totalsales);
        setCashTotal(Number(latest.cashrevenue || 0));
        setTillTotal(Number(latest.tillrevenue || 0));
        setBankTotal(Number(latest.bankrevenue || 0));
        setUnpaidTotal(Number(unpaid || 0));
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    const fetchIncurredItems = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}incurredcost/list`);
        setIncurred(data?.incurred ?? 0);
        setCreateddate(data?.datecreated ?? "");
      } catch (error) {
        console.error("Error fetching incurred costs:", error);
      }
    };

    const fetchPayrollMonths = async () => {
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
        console.error("Error fetching payroll months:", error);
      }
    };

    const fetchPreviousPayroll = async () => {
      try {
        const response = await axios.get(`${serverUrl}staff/list`);
        setTotalSalary(response.data.totalsalary || 0);
        setPayrollMonth(response.data.monthadded);
      } catch (error) {
        console.error("Error fetching previous payroll:", error);
      }
    };

    loadComponent();
  }, [activeTab, budgetId]); // Add activeTab as dependency

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const notificationPanel = document.querySelector(".tooltip-content");
      const bellIcon = document.querySelector(".bell-icon");
      const revenueTooltip = document.querySelector(".revenue-tooltip");
      const revenueText = document.querySelector(".revenue-text");
      const receivableTooltip = document.querySelector(".receivable-tooltip");
      const receivableText = document.querySelector(".receivable-text");

      if (
        isNotificationOpen &&
        notificationPanel &&
        bellIcon &&
        !notificationPanel.contains(target) &&
        !bellIcon.contains(target)
      ) {
        setIsNotificationOpen(false);
      }

      if (
        isRevenueTooltipOpen &&
        revenueTooltip &&
        revenueText &&
        !revenueTooltip.contains(target) &&
        !revenueText.contains(target)
      ) {
        setIsRevenueTooltipOpen(false);
      }

      if (
        isReceivableTooltipOpen &&
        receivableTooltip &&
        receivableText &&
        !receivableTooltip.contains(target) &&
        !receivableText.contains(target)
      ) {
        setIsReceivableTooltipOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, isRevenueTooltipOpen, isReceivableTooltipOpen]);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchBudgetMonths(),
        fetchMeeting(),
        fetchTotalBudgetCost(),
        fetchReceipts(),
        fetchRevenue(),
        fetchIncurredItems(),
        fetchPreviousPayroll(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load some data. Please refresh the page.");
    }
  };

  const refreshData = async () => {
    await fetchAllData();
  };

  const getFilteredComponent = (
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Show loading spinner while component is loading
    if (isComponentLoading) {
      return (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 400px;
            flex-direction: column;
            gap: 1rem;
          `}
        >
          <div
            css={css`
              width: 40px;
              height: 40px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #2a61ae;
              border-radius: 50%;
              animation: spin 1s linear infinite;

              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          />
          <p
            css={css`
              color: #2a61ae;
              font-size: 16px;
              margin: 0;
            `}
          >
            Loading {activeTab}...
          </p>
        </div>
      );
    }

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
      default:
        return <p>No data available</p>;
    }
  };

  const renderHeaderContent = () => {
    switch (activeTab) {
      case "Sales":
        return (
          <>
            <div
              css={css`
                position: relative;
                display: inline-block;
                margin-right: 1rem;
              `}
            >
              <span
                className="revenue-text"
                style={{ color: "#2a61ae", cursor: "pointer" }}
                onClick={() => setIsRevenueTooltipOpen(!isRevenueTooltipOpen)}
              >
                Revenue Overtime:{" "}
                <b>
                  <big>KES {totalsales.toLocaleString("en-US")}</big>
                </b>
              </span>

              {isRevenueTooltipOpen && (
                <div className="revenue-tooltip" css={revenueTooltipStyles}>
                  <div css={revenueItemStyles}>
                    <span>Cash Revenue:</span>
                    <span>KES {cashTotal.toLocaleString()}</span>
                  </div>
                  <div css={revenueItemStyles}>
                    <span>Till Revenue:</span>
                    <span>KES {tillTotal.toLocaleString()}</span>
                  </div>
                  <div css={revenueItemStyles}>
                    <span>Bank Revenue:</span>
                    <span>KES {bankTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
            <div
              css={css`
                position: relative;
                display: inline-block;
              `}
            >
              <span
                className="receivable-text"
                style={{ color: "#2a61ae", cursor: "pointer" }}
                onClick={() =>
                  setIsReceivableTooltipOpen(!isReceivableTooltipOpen)
                }
              >
                Accounts Receivable:{" "}
                <b>
                  <big>KES {unpaidtotal.toLocaleString()}</big>
                </b>
              </span>

              {isReceivableTooltipOpen && (
                <div className="receivable-tooltip" css={revenueTooltipStyles}>
                  <div css={revenueItemStyles}>
                    <span>Outstanding Invoices:</span>
                    <span>KES {unpaidtotal.toLocaleString()}</span>
                  </div>
                  <div css={revenueItemStyles}>
                    <span>Loans:</span>
                    <span>N/A</span>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case "Expenses & Budget":
        return (
          <>
            <span style={{ color: "#2a61ae" }}>
              Running Balance:{" "}
              <b>
                <big>KES {runningBalance.toLocaleString("en-US")}</big>
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
              {receipts.map((receipt, index) => (
                <option key={index} value={receipt.id}>
                  Receipt KES {receipt.amount.toLocaleString("en-US")} -{" "}
                  {receipt.date}
                </option>
              ))}
            </select>
          </>
        );
      case "Livestock & Production":
        return (
          <span
            style={{ color: "#2a61ae", cursor: "pointer" }}
            onClick={() => setActiveTab("Livestock Report")}
          >
            <b>Livestock Report {"\u00BB"}</b>
          </span>
        );
      case "Staff Management":
        return (
          <span style={{ color: "#2a61ae" }}>
            {payrollmonth ? payrollmonth : "Monthly"} Salary:{" "}
            <b>
              <big>KES {totalsalary.toLocaleString()}</big>
            </b>
          </span>
        );
      default:
        return null;
    }
  };

  const renderHeaderButtons = () => {
    switch (activeTab) {
      case "Sales":
        return (
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
            <option value="">Sales Report</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        );
      case "Expenses & Budget":
        return (
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
        );
      case "Livestock & Production":
        return (
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
        );
      case "Staff Management":
      case "Payroll Report":
        return (
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
            <option value="new">Create New Payroll</option>
            {payrollmonths.map((month, index) => (
              <option key={index} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        );
      case "Proposed Budget":
        return (
          <>
            <button
              css={btnSecondary}
              onClick={() => setIsApproveModalOpen(true)}
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
        );
      case "Incurred Costs":
        return (
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
            <button
              css={btnSecondary}
              onClick={() => setActiveTab("Expenses & Budget")}
            >
              Return Later
            </button>
          </>
        );
      case "Dashboard":
        return (
          <>
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
        );
      default:
        return;
    }
  };

  return (
    <div css={layoutStyles}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main css={mainContentStyles}>
        <header css={headerStyles}>
          <h1 style={{ color: "#2a61ae" }}>{activeTab}</h1>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 1rem;
            `}
          >
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
            {renderHeaderContent()}
            {activeTab === "Dashboard" && (
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
                    animation: ${scheduledmeeting.length > 0 ||
                    budgetMonthsData.length > 0 ||
                    incurred
                      ? "shake 0.5s ease-in-out infinite"
                      : "none"};
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
                  `}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  {scheduledmeeting.length > 0 ||
                  budgetMonthsData.length > 0 ||
                  incurred
                    ? "\u{1F514}"
                    : ""}
                </span>

                {isNotificationOpen && (
                  <div
                    className="tooltip-content"
                    css={notificationTooltipStyles}
                  >
                    <div css={notificationHeaderStyles}>
                      Notifications (
                      {scheduledmeeting.length +
                        budgetMonthsData.filter(
                          (b) => b.status === 1 || b.status === 2
                        ).length +
                        (incurred > 0 ? 1 : 0)}
                      )
                    </div>

                    {scheduledmeeting.length > 0 && (
                      <>
                        {scheduledmeeting.slice(0, 3).map((meeting, index) => (
                          <div key={index} css={notificationItemStyles}>
                            <div css={notificationTextStyles}>
                              <strong>Meeting Scheduled:</strong> {meeting.name}
                            </div>
                            <div css={notificationTextStyles}>
                              Venue: {meeting.venue}
                            </div>
                          </div>
                        ))}
                        {scheduledmeeting.length > 3 && (
                          <div css={notificationTextStyles}>
                            +{scheduledmeeting.length - 3} more meetings...
                          </div>
                        )}
                      </>
                    )}

                    {budgetMonthsData.filter(
                      (b) => b.status === 1 || b.status === 2
                    ).length > 0 && (
                      <>
                        {budgetMonthsData
                          .filter((b) => b.status === 1 || b.status === 2)
                          .slice(0, 2)
                          .map((budget, index) => (
                            <div key={index} css={notificationItemStyles}>
                              <div css={notificationTextStyles}>
                                <strong>Budget Approval Required:</strong>{" "}
                                {budget.name}
                              </div>
                              <div
                                css={notificationActionStyles}
                                onClick={() => {
                                  setActiveTab("Proposed Budget");
                                  setBudgetId(budget.id);
                                  setIsNotificationOpen(false);
                                }}
                              >
                                Review Budget →
                              </div>
                            </div>
                          ))}
                      </>
                    )}

                    {incurred > 0 && (
                      <div css={notificationItemStyles}>
                        <div css={notificationTextStyles}>
                          <strong>Incurred Cost Approval:</strong> KES{" "}
                          {incurred.toLocaleString()}
                        </div>
                        <div css={notificationTextStyles}>
                          Date: {new Date(datecreated).toLocaleDateString()}
                        </div>
                        <div
                          css={notificationActionStyles}
                          onClick={() => {
                            setActiveTab("Incurred Costs");
                            setIsNotificationOpen(false);
                          }}
                        >
                          Review Cost →
                        </div>
                      </div>
                    )}

                    {scheduledmeeting.length === 0 &&
                      budgetMonthsData.filter(
                        (b) => b.status === 1 || b.status === 2
                      ).length === 0 &&
                      incurred === 0 && (
                        <div css={notificationTextStyles}>
                          No new notifications
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
            {renderHeaderButtons()}
          </div>
        </header>

        <div css={filtersStyles}>
          {getFilteredComponent(activeTab, setActiveTab)}
        </div>
      </main>

      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        onSubmit={() => {
          setIsMeetingModalOpen(false);
          refreshData();
        }}
      />

      <PayrollModal
        isOpen={isPayrollModalOpen}
        onClose={() => setIsPayrollModalOpen(false)}
        onSubmit={() => {
          setIsPayrollModalOpen(false);
          refreshData();
        }}
      />

      <ApproveModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onSubmit={() => {
          setIsApproveModalOpen(false);
          refreshData();
        }}
        incurred={incurred}
        datecreated={datecreated}
        activeTab={activeTab}
        budgetAmount={budgetAmount}
        refreshData={refreshData}
      />

      <DeclineModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        onSubmit={() => {
          setIsDeclineModalOpen(false);
          refreshData();
        }}
        activeTab={activeTab}
        refreshData={refreshData}
      />
    </div>
  );
}
function fetchMeeting(): any {
  throw new Error("Function not implemented.");
}

function fetchBudgetMonths(): any {
  throw new Error("Function not implemented.");
}

function fetchTotalBudgetCost(): any {
  throw new Error("Function not implemented.");
}

function fetchReceipts(): any {
  throw new Error("Function not implemented.");
}

function fetchRevenue(): any {
  throw new Error("Function not implemented.");
}

function fetchIncurredItems(): any {
  throw new Error("Function not implemented.");
}

function fetchPreviousPayroll(): any {
  throw new Error("Function not implemented.");
}
