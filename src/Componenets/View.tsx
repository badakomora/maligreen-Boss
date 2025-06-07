/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { serverUrl } from "../AppConfig";

// Applying the simpler styling from Component 1
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

const modalOverlayStyle = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const modalContentStyle = css`
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 28rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const modalHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const modalTitleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const modalIconStyle = css`
  padding: 8px;
  background: #f0f9ff;
  border-radius: 8px;
  font-size: 20px;
`;

const modalCloseButtonStyle = css`
  padding: 4px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
  font-size: 20px;

  &:hover {
    background: #f3f4f6;
  }
`;

const modalInputStyle = css`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #10b981;
    border-color: #10b981;
  }
`;

const modalTextareaStyle = css`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: none;

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #10b981;
    border-color: #10b981;
  }
`;

const modalButtonStyle = css`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const modalCancelButtonStyle = css`
  ${modalButtonStyle}
  border: 1px solid #d1d5db;
  color: #374151;
  background: white;

  &:hover {
    background: #f9fafb;
  }
`;

const modalConfirmButtonStyle = css`
  ${modalButtonStyle}
  background: #10b981;
  color: white;
  border: none;

  &:hover {
    background: #059669;
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

interface NavbarProps {
  activeTab: string;
}

interface IdsProps {
  expenseId: number;
  livestockId: number;
  staffId: number;
}

interface TableDataProps {
  id: number;
  name: string;
  designation: string;
  salary: number;
  department: string;
  status: number;
  date: string;
  img: string;
  phone: string;
  email: string;
  cv: string;
  term: string;
}

interface GrantRaiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSalary: number;
  staffName: string;
  onConfirm: (newSalary: number, reason: string) => void;
}

const GrantRaiseModal: React.FC<GrantRaiseModalProps> = ({
  isOpen,
  onClose,
  currentSalary,
  staffName,
  onConfirm,
}) => {
  const [newSalary, setNewSalary] = useState(currentSalary.toString());
  const [reason, setReason] = useState("");
  const [raisePercentage, setRaisePercentage] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setNewSalary(currentSalary.toString());
      setReason("");
      setRaisePercentage("");
    }
  }, [isOpen, currentSalary]);

  const calculateRaise = (percentage: string) => {
    if (percentage && !isNaN(Number(percentage))) {
      const raise = currentSalary * (Number(percentage) / 100);
      const total = currentSalary + raise;
      setNewSalary(total.toString());
    }
  };

  const handlePercentageChange = (value: string) => {
    setRaisePercentage(value);
    calculateRaise(value);
  };

  const handleConfirm = () => {
    if (newSalary && reason && Number(newSalary) > currentSalary) {
      onConfirm(Number(newSalary), reason);
    }
  };

  if (!isOpen) return null;

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        <div style={{ padding: "1.5rem" }}>
          <div css={modalHeaderStyle}>
            <div css={modalTitleContainerStyle}>
              <div css={modalIconStyle}>
                <span style={{ color: "#10b981" }}>📈</span>
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#111827",
                  margin: 0,
                }}
              >
                Grant Salary Raise
              </h2>
            </div>
            <button onClick={onClose} css={modalCloseButtonStyle}>
              <span style={{ color: "#6b7280" }}>✕</span>
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                background: "#f9fafb",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <h3
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px",
                  fontSize: "16px",
                }}
              >
                Staff Information
              </h3>
              <p style={{ color: "#374151", margin: "4px 0" }}>
                <span style={{ fontWeight: "500" }}>Name:</span> {staffName}
              </p>
              <p style={{ color: "#374151", margin: "4px 0" }}>
                <span style={{ fontWeight: "500" }}>Current Salary:</span> KES{" "}
                {currentSalary.toLocaleString()}
              </p>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Raise Percentage (%)
                </label>
                <input
                  type="number"
                  value={raisePercentage}
                  onChange={(e) => handlePercentageChange(e.target.value)}
                  placeholder="Enter percentage"
                  css={modalInputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  New Salary (KES)
                </label>
                <input
                  type="number"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  css={modalInputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Reason for Raise
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for salary increase..."
                  rows={3}
                  css={modalTextareaStyle}
                />
              </div>

              {newSalary &&
                currentSalary &&
                Number(newSalary) > currentSalary && (
                  <div
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  >
                    <p
                      style={{ fontSize: "14px", color: "#166534", margin: 0 }}
                    >
                      <span style={{ fontWeight: "500" }}>Increase:</span> KES{" "}
                      {(Number(newSalary) - currentSalary).toLocaleString()}
                    </p>
                  </div>
                )}
            </div>

            <div style={{ display: "flex", gap: "12px", paddingTop: "1rem" }}>
              <button onClick={onClose} css={modalCancelButtonStyle}>
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={
                  !newSalary || !reason || Number(newSalary) <= currentSalary
                }
                css={modalConfirmButtonStyle}
              >
                Confirm Raise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const View: React.FC<NavbarProps & IdsProps> = ({
  activeTab,
  expenseId,
  livestockId,
  staffId,
}) => {
  const [staffData, setStaffData] = useState<TableDataProps[]>([]);
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);

  useEffect(() => {
    const staffList = async () => {
      try {
        const response = await axios.get(`${serverUrl}staff/${staffId}`);
        const filteredStaff = response.data.staff.map(
          (
            item: {
              name: string;
              designation: string;
              salary: number;
              department: string;
              datejoined: string;
              photo: string;
              id: number;
              email: string;
              phone: string;
              cv: string;
              note: string;
              status: number;
              term: string;
            },
            i: number
          ) => ({
            id: item.id,
            name: item.name,
            date: new Date(item.datejoined).toLocaleDateString(),
            salary: item.salary,
            designation: item.designation,
            department: item.department,
            img: item.photo,
            phone: item.phone,
            email: item.email,
            cv: item.cv,
            note: item.note,
            status: item.status,
            term: item.term,
          })
        );

        setStaffData(filteredStaff);
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Failed to fetch staff data");
      }
    };

    staffList();
  }, [expenseId, livestockId, staffId]);

  const handleGrantRaise = async (newSalary: number, reason: string) => {
    try {
      await axios.put(`${serverUrl}staff/update/${staffId}`, {
        salary: newSalary,
      });

      // Update the staffData state
      setStaffData((prev) =>
        prev.map((item) =>
          item.id === Number(staffId) ? { ...item, salary: newSalary } : item
        )
      );

      // Close the modal
      setIsRaiseModalOpen(false);

      // Show success message
      toast.success("Salary raise granted successfully");

      console.log("Raise granted:", {
        staffId,
        newSalary,
        reason,
      });
    } catch (error) {
      console.error("Error granting raise:", error);
      toast.error("Failed to grant salary raise");
    }
  };

  return (
    <>
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
      {activeTab === "Staff Review"
        ? staffData.map((item, index) => (
            <div key={index} css={containerStyle}>
              <div css={columnStyle("#2a61ae")}>
                <div style={{ color: "#ffffff" }}>
                  <p>
                    Name: <b>{item.name}</b>
                  </p>
                  <p>Mobile: {item.phone}</p>
                  <p>Email: {item.email}</p>
                </div>
              </div>
              <div css={columnStyle("#ffffff")}>
                <div style={{ color: "#2a61ae" }}>
                  <p>
                    Designation: <b>{item.designation}</b>,
                    <b> {item.department}</b>
                  </p>
                  <p>
                    Salary: <b>KES {item.salary.toLocaleString()}</b>
                  </p>
                  <a
                    href="."
                    style={{ color: "#2a61ae" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRaiseModalOpen(true);
                    }}
                  >
                    Grant Raise {"\u00BB"}
                  </a>
                </div>
              </div>
              <div css={columnStyle("#2a61ae")}>
                <div style={{ color: "#ffffff" }}>
                  <p>
                    Started work on: <b>{item.date}</b>
                  </p>
                  <p>
                    Employment Terms:{" "}
                    {item.status === 0 ? "Awaiting Confirmation" : item.term}
                  </p>

                  <a
                    href={`${serverUrl}${item.cv}`}
                    style={{ color: "#ffffff" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Review CV {"\u00BB"}
                  </a>
                </div>
              </div>
            </div>
          ))
        : ""}

      {staffData.map((item) => (
        <GrantRaiseModal
          key={item.id}
          isOpen={isRaiseModalOpen}
          onClose={() => setIsRaiseModalOpen(false)}
          currentSalary={item.salary}
          staffName={item.name}
          onConfirm={handleGrantRaise}
        />
      ))}
    </>
  );
};

export default View;
