/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
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
  border-radius: 12px;
  overflow: hidden;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const columnStyle = (bgColor: string) => css`
  background: ${bgColor};
  padding: 8%;
  min-height: 500px;
  position: relative;
  
  &:first-of-type::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  &:last-of-type::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: -15px;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
`

const sectionTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
  }
`

const whiteSectionTitleStyle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(72, 108, 27, 0.3);
  color: #486c1b;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #486c1b;
  }
`

const fieldGroupStyle = css`
  margin-bottom: 25px;
`

const labelStyle = css`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.9;
`

const inputStyle = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const whiteInputStyle = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #486c1b;
  border-radius: 8px;
  background: #ffffff;
  color: #486c1b;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3a5a16;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(72, 108, 27, 0.2);
  }
`

const displayFieldStyle = css`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  font-weight: 500;
`

const whiteDisplayFieldStyle = css`
  padding: 12px 16px;
  background: #f8fdf4;
  border-radius: 8px;
  border: 1px solid rgba(72, 108, 27, 0.3);
  font-size: 14px;
  font-weight: 500;
  color: #486c1b;
`

const buttonStyle = css`
  padding: 12px 24px;
  background: #486c1b;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  width: 100%;
  
  &:hover {
    background: #3a5a16;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(72, 108, 27, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const downloadButtonStyle = css`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const warningStyle = css`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 1px solid #ffeaa7;
  border-left: 4px solid #f39c12;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 24px;
  color: #856404;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  &::before {
    content: '⚠️';
    margin-right: 10px;
    font-size: 16px;
  }
`

const salaryContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`

const currencyLabelStyle = css`
  color: #486c1b;
  font-weight: 700;
  font-size: 16px;
  min-width: 35px;
`

const selectStyle = css`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  option {
    background: #486c1b;
    color: #ffffff;
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
  description?: string
  supplier?: string
  dateexpensed?: string
  quantity?: number
  cost?: number
  balance?: number
  account?: string
  amount?: number
  datesent?: string
  note?: string
  tagid?: string
  dateadded?: string
  breed?: number
  nanny?: string
  healthstatus?: string
  herdmetric?: string
  shelter?: string
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

export const View: React.FC<NavbarProps & IdsProps> = ({ activeTab, expenseId, livestockId, staffId }) => {
  const [staffData, setStaffData] = useState<TableDataProps[]>([])

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
            <div key={index} style={{ display: "block", padding: "20px" }}>
              <div css={containerStyle}>
                <div css={columnStyle("#486c1b")}>
                  <div style={{ color: "#ffffff" }}>
                    <div css={sectionTitleStyle}>Personal Information</div>

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
                      <div css={labelStyle}>Phone Number</div>
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
                      <div css={labelStyle}>Email Address</div>
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
                    <div css={whiteSectionTitleStyle}>Employment Details</div>

                    <div css={fieldGroupStyle}>
                      <div css={[labelStyle, { color: "#486c1b" }]}>Start Date</div>
                      <div css={whiteDisplayFieldStyle}>{item.date}</div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={[labelStyle, { color: "#486c1b" }]}>Position</div>
                      <div css={whiteDisplayFieldStyle}>{item.designation}</div>
                      <div css={[whiteDisplayFieldStyle, { marginTop: "8px", opacity: 0.8 }]}>{item.department}</div>
                    </div>

                    <div css={fieldGroupStyle}>
                      <div css={[labelStyle, { color: "#486c1b" }]}>Monthly Salary</div>
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
                        <button css={buttonStyle}>Grant Raise</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div css={columnStyle("#486c1b")}>
                  <div style={{ color: "#ffffff" }}>
                    <div css={sectionTitleStyle}>Status & Documents</div>

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

                    <a
                      href={`${serverUrl}${item.cv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      css={downloadButtonStyle}
                    >
                      📄 Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  )
}
