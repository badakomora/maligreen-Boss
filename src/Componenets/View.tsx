/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import type React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { serverUrl } from "../AppConfig"

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px;
  box-shadow: 0px 8px 24px rgba(72, 108, 27, 0.3);
  border-radius: 16px;
  overflow: hidden;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  background: white;
`

const columnStyle = (bgColor: string) => css`
  background: ${bgColor};
  padding: 2rem;
  min-height: 600px;
  position: relative;
  
  &:first-of-type::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 128px;
    height: 128px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
  
  &:last-of-type::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: -15px;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
`

const sectionTitleStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 2rem;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
  }
`

const whiteSectionTitleStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 2rem;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(72, 108, 27, 0.3);
  color: #486c1b;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: #486c1b;
  }
`

const fieldGroupStyle = css`
  margin-bottom: 1.5rem;
`

const labelStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.9;
`

const inputStyle = css`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`

const whiteInputStyle = css`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #486c1b;
  border-radius: 12px;
  background: #ffffff;
  color: #486c1b;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3a5a16;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(72, 108, 27, 0.2);
  }
`

const displayFieldStyle = css`
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  font-weight: 500;
`

const whiteDisplayFieldStyle = css`
  padding: 16px 20px;
  background: #f8fdf4;
  border-radius: 12px;
  border: 1px solid rgba(72, 108, 27, 0.3);
  font-size: 16px;
  font-weight: 500;
  color: #486c1b;
`

const buttonStyle = css`
  padding: 16px 24px;
  background: #486c1b;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #3a5a16;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(72, 108, 27, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const reviewButtonStyle = css`
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const salaryContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

const currencyLabelStyle = css`
  color: #486c1b;
  font-weight: 700;
  font-size: 18px;
  min-width: 40px;
`

const selectStyle = css`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  option {
    background: #486c1b;
    color: #ffffff;
  }
`

const modalOverlayStyle = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`

const modalContentStyle = css`
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 28rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`

const modalHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const modalTitleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`

const modalIconStyle = css`
  padding: 8px;
  background: #f0f9ff;
  border-radius: 8px;
  font-size: 20px;
`

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
`

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
`

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
`

const modalButtonStyle = css`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`

const modalCancelButtonStyle = css`
  ${modalButtonStyle}
  border: 1px solid #d1d5db;
  color: #374151;
  background: white;
  
  &:hover {
    background: #f9fafb;
  }
`

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
`

interface NavbarProps {
  activeTab: string
}

interface IdsProps {
  expenseId: number
  livestockId: number
  staffId: number
}

interface TableDataProps {
  id: number
  name: string
  designation: string
  salary: number
  department: string
  status: number
  date: string
  img: string
  phone: string
  email: string
  cv: string
  term: string
}

interface GrantRaiseModalProps {
  isOpen: boolean
  onClose: () => void
  currentSalary: number
  staffName: string
  onConfirm: (newSalary: number, reason: string) => void
}

const GrantRaiseModal: React.FC<GrantRaiseModalProps> = ({ isOpen, onClose, currentSalary, staffName, onConfirm }) => {
  const [newSalary, setNewSalary] = useState(currentSalary.toString())
  const [reason, setReason] = useState("")
  const [raisePercentage, setRaisePercentage] = useState("")

  const calculateRaise = (percentage: string) => {
    if (percentage && !isNaN(Number(percentage))) {
      const raise = currentSalary * (Number(percentage) / 100)
      const total = currentSalary + raise
      setNewSalary(total.toString())
    }
  }

  const handlePercentageChange = (value: string) => {
    setRaisePercentage(value)
    calculateRaise(value)
  }

  const handleConfirm = () => {
    if (newSalary && reason) {
      onConfirm(Number(newSalary), reason)
      onClose()
      setNewSalary(currentSalary.toString())
      setReason("")
      setRaisePercentage("")
    }
  }

  if (!isOpen) return null

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        <div style={{ padding: "1.5rem" }}>
          <div css={modalHeaderStyle}>
            <div css={modalTitleContainerStyle}>
              <div css={modalIconStyle}>
                <span style={{ color: "#10b981" }}>📈</span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>Grant Salary Raise</h2>
            </div>
            <button onClick={onClose} css={modalCloseButtonStyle}>
              <span style={{ color: "#6b7280" }}>✕</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "1rem" }}>
              <h3 style={{ fontWeight: "600", color: "#111827", marginBottom: "8px", fontSize: "16px" }}>
                Staff Information
              </h3>
              <p style={{ color: "#374151", margin: "4px 0" }}>
                <span style={{ fontWeight: "500" }}>Name:</span> {staffName}
              </p>
              <p style={{ color: "#374151", margin: "4px 0" }}>
                <span style={{ fontWeight: "500" }}>Current Salary:</span> KES {currentSalary.toLocaleString()}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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

              {newSalary && currentSalary && Number(newSalary) > currentSalary && (
                <div
                  style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "12px" }}
                >
                  <p style={{ fontSize: "14px", color: "#166534", margin: 0 }}>
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
                disabled={!newSalary || !reason || Number(newSalary) <= currentSalary}
                css={modalConfirmButtonStyle}
              >
                Confirm Raise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const View: React.FC<NavbarProps & IdsProps> = ({ activeTab, expenseId, livestockId, staffId }) => {
  const [staffData, setStaffData] = useState<TableDataProps[]>([])
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false)
  const [editableStaff, setEditableStaff] = useState<{
    name: string
    email: string
    phone: string
    salary: string
  }>({
    name: "",
    email: "",
    phone: "",
    salary: "",
  })

  useEffect(() => {
    const staffList = async () => {
      try {
        const response = await axios.get(`${serverUrl}staff/${staffId}`)
        const filteredStaff = response.data.staff.map(
          (
            item: {
              name: string
              designation: string
              salary: number
              department: string
              datejoined: string
              photo: string
              id: number
              email: string
              phone: string
              cv: string
              note: string
              status: number
              term: string
            },
            i: number,
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
          }),
        )

        setStaffData(filteredStaff)

        if (filteredStaff.length > 0) {
          const firstStaff = filteredStaff[0]
          setEditableStaff({
            name: firstStaff.name,
            email: firstStaff.email,
            phone: firstStaff.phone,
            salary: firstStaff.salary.toString(),
          })
        }
      } catch (error) {
        console.error("Error fetching staff:", error)
      }
    }

    staffList()
  }, [expenseId, livestockId, staffId])

  const handleNameBlur = async () => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        name: editableStaff.name,
      })
      toast.success(response.data.tab)
    } catch (error) {
      console.error("Error updating name:", error)
      toast.error("Failed to update name")
    }
  }

  const handleEmailBlur = async () => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        email: editableStaff.email,
      })
      toast.success(response.data.tab)
    } catch (error) {
      console.error("Error updating email:", error)
      toast.error("Failed to update email")
    }
  }

  const handlePhoneBlur = async () => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        phone: editableStaff.phone,
      })
      toast.success(response.data.tab)
    } catch (error) {
      console.error("Error updating phone:", error)
      toast.error("Failed to update phone")
    }
  }

  const handleSalaryBlur = async () => {
    try {
      const salaryAmount = Number.parseFloat(editableStaff.salary)
      if (isNaN(salaryAmount)) {
        console.error("Invalid salary input")
        toast.error("Invalid salary amount")
        return
      }
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        salary: salaryAmount,
      })
      toast.success(response.data.tab)
    } catch (error) {
      console.error("Error updating salary:", error)
      toast.error("Failed to update salary")
    }
  }

  const handleGrantRaise = async (newSalary: number, reason: string) => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        salary: newSalary,
      })
      setEditableStaff((prev) => ({ ...prev, salary: newSalary.toString() }))
      toast.success(`Salary raise granted! New salary: KES ${newSalary.toLocaleString()}`)
      console.log("Raise granted:", { newSalary, reason })
    } catch (error) {
      console.error("Error granting raise:", error)
      toast.error("Failed to grant salary raise")
    }
  }

  const openCVReview = (cvPath: string) => {
    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(serverUrl + cvPath)}&embedded=true`
    window.open(googleDocsUrl, "_blank", "width=800,height=600")
  }

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
            <div key={index} style={{ display: "block", padding: "24px" }}>
              <div css={containerStyle}>
                <div css={columnStyle("linear-gradient(135deg, #486c1b 0%, #3a5a16 100%)")}>
                  <div style={{ color: "#ffffff" }}>
                    <div css={sectionTitleStyle}>
                      <span style={{ fontSize: "28px" }}>👤</span>
                      Personal Information
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={labelStyle}>Full Name</div>
                      <div>
                        <input
                          type="text"
                          value={editableStaff.name}
                          onChange={(e) =>
                            setEditableStaff((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          onBlur={handleNameBlur}
                          css={inputStyle}
                        />
                      </div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={labelStyle}>
                        <span style={{ fontSize: "18px" }}>📞</span>
                        Phone Number
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editableStaff.phone}
                          onChange={(e) =>
                            setEditableStaff((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          onBlur={handlePhoneBlur}
                          css={inputStyle}
                        />
                      </div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={labelStyle}>
                        <span style={{ fontSize: "18px" }}>📧</span>
                        Email Address
                      </div>
                      <div>
                        <input
                          type="email"
                          value={editableStaff.email}
                          onChange={(e) =>
                            setEditableStaff((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          onBlur={handleEmailBlur}
                          css={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div css={columnStyle("#ffffff")}>
                  <div style={{ color: "#486c1b" }}>
                    <div css={whiteSectionTitleStyle}>
                      <span style={{ fontSize: "28px" }}>💼</span>
                      Employment Details
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={[labelStyle, { color: "#486c1b" }]}>
                        <span style={{ fontSize: "18px" }}>📅</span>
                        Start Date
                      </div>
                      <div css={whiteDisplayFieldStyle}>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={[labelStyle, { color: "#486c1b" }]}>Position</div>
                      <div css={whiteDisplayFieldStyle}>{item.designation}</div>
                      <div css={[whiteDisplayFieldStyle, { marginTop: "8px", opacity: 0.8, background: "#f0f9f0" }]}>
                        {item.department}
                      </div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={[labelStyle, { color: "#486c1b" }]}>
                        <span style={{ fontSize: "18px" }}>💰</span>
                        Monthly Salary
                      </div>
                      <div>
                        <div css={salaryContainerStyle}>
                          <span css={currencyLabelStyle}>KES</span>
                          <input
                            type="text"
                            value={editableStaff.salary}
                            onChange={(e) =>
                              setEditableStaff((prev) => ({
                                ...prev,
                                salary: e.target.value,
                              }))
                            }
                            onBlur={handleSalaryBlur}
                            css={whiteInputStyle}
                          />
                        </div>
                        <button css={buttonStyle} onClick={() => setIsRaiseModalOpen(true)}>
                          <span style={{ fontSize: "18px" }}>📈</span>
                          Grant Raise
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div css={columnStyle("linear-gradient(135deg, #486c1b 0%, #3a5a16 100%)")}>
                  <div style={{ color: "#ffffff" }}>
                    <div css={sectionTitleStyle}>
                      <span style={{ fontSize: "28px" }}>📄</span>
                      Status & Documents
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={labelStyle}>Employment Status</div>
                      <div css={displayFieldStyle}>{item.status === 0 ? "Awaiting Confirmation" : item.term}</div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={labelStyle}>Payslips</div>
                      <select css={selectStyle}>
                        <option>Coming soon...</option>
                      </select>
                    </div>

                    <button onClick={() => openCVReview(item.cv)} css={reviewButtonStyle}>
                      <span style={{ fontSize: "18px" }}>📄</span>
                      Review CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}

      <GrantRaiseModal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        currentSalary={Number(editableStaff.salary) || 0}
        staffName={editableStaff.name}
        onConfirm={handleGrantRaise}
      />
    </>
  )
}

export default View
