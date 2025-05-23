/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { serverUrl } from "../AppConfig";

// Modal styles
const modalOverlayStyle = css`
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
`;

const modalContentStyle = css`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-family: Monaco;
`;

const modalHeaderStyle = css`
  margin-bottom: 1.5rem;

  h3 {
    color: #486c1b;
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #666;
    margin: 0;
  }
`;

const formGroupStyle = css`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #486c1b;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: Monaco;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #486c1b;
    }
  }
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const buttonStyle = (isPrimary: boolean) => css`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-family: Monaco;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: ${isPrimary ? "#486c1b" : "#f5f5f5"};
  color: ${isPrimary ? "white" : "#333"};

  &:hover {
    background-color: ${isPrimary ? "#3a5816" : "#e5e5e5"};
  }
`;

// Panel container with softer, rounded styling
const panelStyle = css`
  width: 100%;
  margin: 0.1rem auto;
  background: #ffffff;
  font-family: Monaco;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  h4 {
    color: #486c1b;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const userListStyle = css`
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    position: relative;
    margin: 0.8rem 0.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

    &::before {
      content: "";
      width: 4px;
      height: 70%;
      background-color: #486c1b;
      position: absolute;
      left: 0;
      border-radius: 20px;
    }

    img {
      height: 65px;
      width: 65px;
      border-radius: 50%;
      background-size: cover;
      border: 2px solid #f0f0f0;
    }

    h5 {
      margin: 0;
      font-size: 1.2rem;
      color: #486c1b;
      font-weight: 700;
    }

    p {
      margin: 3px 0;
      color: #486c1b;
      font-size: 0.95rem;
    }

    .designation {
      font-style: italic;
      color: #486c1b;
      display: inline-block;
      font-size: 0.85rem;
    }

    .salary {
      font-weight: 700;
      display: inline-block;
      margin-top: 0.3rem;
      color: #486c1b;
    }

    .action-wrap {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 1rem;

      p {
        font-size: 0.85rem;
        color: #486c1b;
        line-height: 1.4;
      }

      hr {
        border: none;
        height: 30px;
        border-left: 1px solid #486c1b;
        opacity: 0.3;
      }
    }
  }
`;

const departmentHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  align-items: center;
  margin-top: 1rem;
  border-radius: 12px 12px 0 0;
  border-bottom: 1px solid rgba(72, 108, 27, 0.2);
`;

const statusBadgeStyle = (status: number) => css`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.3rem;
  color: ${status === 1
    ? "#ff6347"
    : status === 2
    ? "#486c1b"
    : status === 3
    ? "#4169e1"
    : status === 4
    ? "#ff8c00"
    : status === 5
    ? "#9932cc"
    : "#ffc107"};
`;

const dropdownStyles = css`
  text-align: left;
  color: #486c1b;
  position: relative;
  z-index: 2;

  span {
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    font-size: 0.9rem;
  }

  div {
    display: none;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px -6px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    z-index: 10;
    overflow: hidden;
    right: 0;
    top: 100%;
    min-width: 150px;
    margin-top: 5px;
  }

  div a {
    padding: 0.5rem 1rem;
    display: block;
    border-bottom: 1px solid #eee;
    text-align: left;
    text-decoration: none;
    color: #486c1b;
    font-size: 0.9rem;

    &:hover {
      background: #486c1b;
      color: #ffffff;
    }
  }

  &:hover div {
    display: block;
  }
`;

interface StaffMember {
  id: number;
  name: string;
  date: string;
  salary: number;
  designation: string;
  department: string;
  img: string;
  invoiceid?: number;
  status: number;
}

interface NavbarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab?: string;
}

interface IdsProps {
  setStaffId: React.Dispatch<React.SetStateAction<number>>;
}

export const Block: React.FC<NavbarProps & IdsProps> = ({
  setActiveTab,
  setStaffId,
}) => {
  const [staffData, setStaffData] = useState<StaffMember[]>([]);
  const [departmentData, setDepartmentData] = useState<StaffMember[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [employmentTerms, setEmploymentTerms] = useState("2"); // Default to Permanent
  const [employmentDate, setEmploymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [customEmploymentTerm, setCustomEmploymentTerm] = useState("");
  const [isCustomTerm, setIsCustomTerm] = useState(false);
  const [employmentTermsData, setEmploymentTermsData] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    fetchStaff();
    departments();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${serverUrl}staff/list`);
      const filteredStaff = response.data.list.map(
        (
          item: {
            name: string;
            designation: string;
            salary: number;
            department: string;
            datejoined: string;
            photo: string;
            id: number;
            status: number;
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
          status: item.status,
        })
      );

      setStaffData(filteredStaff);

      // Extract employment terms from the response
      if (response.data.employmentTerms) {
        setEmploymentTermsData(response.data.employmentTerms);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const departments = async () => {
    try {
      const response = await axios.get(`${serverUrl}item/departments`);
      const filteredStaff = response.data.list.map(
        (
          item: {
            id: string;
            department: string;
          },
          i: number
        ) => ({
          id: item.id,
          name: item.department,
        })
      );

      setDepartmentData(filteredStaff);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const dismiss = async (staffId: number, status: number, date?: string) => {
    try {
      const response = await axios.put(`${serverUrl}staff/status/${status}`, {
        staffId,
        status,
        // If your API supports it, you could add: employmentDate: date
      });
      toast.success(response.data.tab);
      fetchStaff();
    } catch (error) {
      console.error("Error updating staff status:", error);
      toast.error("Failed to update employment status");
    }
  };

  const openApprovalModal = (staff: { id: number; name: string }) => {
    setSelectedStaff(staff);
    setName(staff.name);
    setModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStaff) {
      if (isCustomTerm) {
        // First create the new employment term
        axios
          .post(`${serverUrl}item/newEmploymentterm`, {
            term: customEmploymentTerm,
          })
          .then((createResponse) => {
            const newTermId = createResponse.data.id;
            // Set the new term as selected
            setEmploymentTerms(newTermId.toString());
            // Now assign the new term to the staff member
            return axios.put(`${serverUrl}staff/status/${selectedStaff.id}`, {
              status: newTermId,
              date: employmentDate,
            });
          })
          .then((response) => {
            toast.success(response.data.tab || "Status updated successfully");
            fetchStaff(); // This will also refresh the employment terms
          })
          .catch((error) => {
            console.error(
              "Error creating employment term or updating staff:",
              error
            );
            toast.error("Failed to create employment term or update status");
          });
      } else {
        // Use existing employment term
        axios
          .put(`${serverUrl}staff/status/${selectedStaff.id}`, {
            status: Number.parseInt(employmentTerms),
            date: employmentDate,
          })
          .then((response) => {
            toast.success(response.data.tab || "Status updated successfully");
            fetchStaff();
          })
          .catch((error) => {
            console.error("Error updating staff status:", error);
            toast.error("Failed to update employment status");
          });
      }

      setModalOpen(false);
    }
  };

  // Helper function to get status text
  const getStatusText = (status: number) => {
    const term = employmentTermsData.find((t) => t.id === status);
    if (term) {
      return term.name;
    }

    // Fallback for legacy statuses
    switch (status) {
      case 1:
        return "Dismissed";
      case 2:
        return "Permanent and Pensionable";
      case 3:
        return "Intern";
      case 4:
        return "Casual";
      case 5:
        return "Contract";
      default:
        return "Awaiting Confirmation";
    }
  };

  return (
    <>
      <div css={panelStyle}>
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

        {departmentData.map((dept) => {
          const members = staffData.filter(
            (staff) => staff.department === dept.name
          );

          if (members.length === 0) return null;

          return (
            <div key={dept.name}>
              <div css={departmentHeaderStyle}>
                <h4 style={{ margin: 0, marginRight: "10px" }}>{dept.name}</h4>
                <div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      border: "1px solid #486c1b",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "12px",
                    }}
                  >
                    {members.length}{" "}
                    {members.length === 1 ? "member" : "members"}
                  </span>
                </div>
              </div>
              <ul css={userListStyle}>
                {members.map((user) => (
                  <li key={user.id}>
                    <img src={`${serverUrl}${user.img}`} alt={user.name} />
                    <div>
                      <h5>{user.name}</h5>
                      <p className="designation">{user.designation}</p>
                      <div className="salary">
                        KES {user.salary.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="action-wrap">
                      <div>
                        <p>Joined on {user.date}</p>
                        <div css={statusBadgeStyle(user.status)}>
                          {getStatusText(user.status)}
                        </div>
                      </div>
                      <hr />
                      <div css={dropdownStyles}>
                        <span>Action &#9660;</span>
                        <div>
                          <a
                            href="."
                            onClick={(e) => {
                              e.preventDefault();
                              setStaffId(user.id);
                              setActiveTab("Staff Review");
                            }}
                          >
                            Review
                          </a>
                          {user.status === 0 ? (
                            <>
                              <a
                                href="."
                                onClick={(e) => {
                                  e.preventDefault();
                                  openApprovalModal({
                                    id: user.id,
                                    name: user.name,
                                  });
                                }}
                              >
                                Approve Employment
                              </a>
                              <a
                                href="."
                                onClick={(e) => {
                                  e.preventDefault();
                                  dismiss(user.id, 1); // 1 is for Dismissed status
                                }}
                              >
                                Dismiss Employment
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Employment Approval Modal */}
      {modalOpen && selectedStaff && (
        <div css={modalOverlayStyle} onClick={() => setModalOpen(false)}>
          <div css={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div css={modalHeaderStyle}>
              <h3>Approve Employment</h3>
              <p>Set employment terms for this staff member</p>
            </div>

            <form onSubmit={handleModalSubmit}>
              <div css={formGroupStyle}>
                <label htmlFor="name">Name: {name}</label>
                <input
                  type="text"
                  id="name"
                  placeholder={name}
                  value={selectedStaff.id}
                  disabled
                  style={{ display: "none" }}
                  required
                />
              </div>

              <div css={formGroupStyle}>
                <label htmlFor="employmentTerms">Employment Terms</label>
                <select
                  id="employmentTerms"
                  value={employmentTerms}
                  onChange={(e) => {
                    setEmploymentTerms(e.target.value);
                    setIsCustomTerm(e.target.value === "custom");
                  }}
                  required
                >
                  {employmentTermsData.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name}
                    </option>
                  ))}
                  <option value="custom">Create New Employment</option>
                </select>
              </div>

              {isCustomTerm && (
                <div css={formGroupStyle} style={{ marginTop: "1rem" }}>
                  <label htmlFor="customEmploymentTerm">
                    New Employment Term
                  </label>
                  <input
                    type="text"
                    id="customEmploymentTerm"
                    value={customEmploymentTerm}
                    onChange={(e) => setCustomEmploymentTerm(e.target.value)}
                    placeholder="Enter new employment term"
                    required={isCustomTerm}
                  />
                </div>
              )}

              <div css={formGroupStyle}>
                <label htmlFor="employmentDate">Date of Employment</label>
                <input
                  type="date"
                  id="employmentDate"
                  value={employmentDate}
                  onChange={(e) => setEmploymentDate(e.target.value)}
                  required
                />
              </div>

              <div css={buttonGroupStyle}>
                <button
                  type="button"
                  css={buttonStyle(false)}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" css={buttonStyle(true)}>
                  Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
