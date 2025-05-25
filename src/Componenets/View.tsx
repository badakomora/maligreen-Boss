"use client";

import type React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../AppConfig";

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
  description?: string;
  supplier?: string;
  dateexpensed?: string;
  quantity?: number;
  cost?: number;
  balance?: number;
  account?: string;
  amount?: number;
  datesent?: string;
  note?: string;
  tagid?: string;
  dateadded?: string;
  breed?: number;
  nanny?: string;
  healthstatus?: string;
  herdmetric?: string;
  shelter?: string;
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

export const View: React.FC<NavbarProps & IdsProps> = ({
  activeTab,
  expenseId,
  livestockId,
  staffId,
}) => {
  const [staffData, setStaffData] = useState<TableDataProps[]>([]);

  const [editableStaff, setEditableStaff] = useState<{
    name: string;
    email: string;
    phone: string;
    salary: string;
  }>({
    name: "",
    email: "",
    phone: "",
    salary: "",
  });

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

        if (filteredStaff.length > 0) {
          const firstStaff = filteredStaff[0];
          setEditableStaff({
            name: firstStaff.name,
            email: firstStaff.email,
            phone: firstStaff.phone,
            salary: firstStaff.salary.toString(),
          });
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    staffList();
  }, [expenseId, livestockId, staffId]);

  const handleNameBlur = async () => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        name: editableStaff.name,
      });
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Failed to update name");
    }
  };

  const handleEmailBlur = async () => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        email: editableStaff.email,
      });
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Failed to update email");
    }
  };

  const handlePhoneBlur = async () => {
    try {
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        phone: editableStaff.phone,
      });
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("Failed to update phone");
    }
  };

  const handleSalaryBlur = async () => {
    try {
      const salaryAmount = Number.parseFloat(editableStaff.salary);
      if (isNaN(salaryAmount)) {
        console.error("Invalid salary input");
        toast.error("Invalid salary amount");
        return;
      }
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        salary: salaryAmount,
      });
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating salary:", error);
      toast.error("Failed to update salary");
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
            <div key={index}>
              <span>You can only update personal details</span>
              <div>
                <div>
                  <div>
                    <div>Personal Information</div>

                    <div>
                      <div>Full Name</div>
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
                        />
                      </div>
                    </div>

                    <div>
                      <div>Phone Number</div>
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
                        />
                      </div>
                    </div>

                    <div>
                      <div>Email Address</div>
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
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div>Employment Details</div>

                    <div>
                      <div>Start Date</div>
                      <div>{item.date}</div>
                    </div>

                    <div>
                      <div>Position</div>
                      <div>{item.designation}</div>
                      <div>{item.department}</div>
                    </div>

                    <div>
                      <div>Monthly Salary</div>
                      <div>
                        <div>
                          KES{" "}
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
                          />
                        </div>
                        <button>Grant Raise</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div>Status & Documents</div>

                    <div>
                      <div>Employment Status</div>
                      <div>
                        {item.status === 0
                          ? "Awaiting Confirmation"
                          : item.term}
                      </div>
                    </div>

                    <div>
                      <div>Payslips</div>
                      <select>
                        <option>Coming soon...</option>
                      </select>
                    </div>

                    <a
                      href={`${serverUrl}${item.cv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};
