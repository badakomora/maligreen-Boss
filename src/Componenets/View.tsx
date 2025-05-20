/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../AppConfig";
// import { Dynamics } from "./Dynamics";

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

const dropdownStyles = css`
  text-align: left;

  span {
    cursor: pointer;
  }

  div {
    display: none;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px -6px #486c1b;
    border-radius: 6px;
    z-index: 10;
  }

  div a {
    padding: 0.3rem;
    display: block;
    border-bottom: 1px dotted #486c1b;
    text-align: left;
    text-decoration: none;
    color: #486c1b;

    &:hover {
      background: #486c1b;
      color: #ffffff;
    }
  }

  &:hover div {
    display: block;
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
}

export const View: React.FC<NavbarProps & IdsProps> = ({
  activeTab,
  expenseId,
  livestockId,
  staffId,
}) => {
  const [expenseData, setExpenseData] = useState<TableDataProps[]>([]);
  const [accountData, setAccountList] = useState<TableDataProps[]>([]);
  const [livestockData, setLivestockData] = useState<TableDataProps[]>([]);
  const [shelterList, setShelterList] = useState<TableDataProps[]>([]);
  const [statusList, setStatusList] = useState<TableDataProps[]>([]);
  const [metricList, setMetricList] = useState<TableDataProps[]>([]);
  const [staffData, setStaffData] = useState<TableDataProps[]>([]);
  const [aliveKids, setAliveKids] = useState({ count: 0, tagids: [] });
  const [deadKids, setDeadKids] = useState({ count: 0, tagids: [] });

  useEffect(() => {
    const expense = async () => {
      try {
        const response = await axios.get(`${serverUrl}expense/${expenseId}`);
        const expense = response.data.expense.map(
          (
            item: {
              itemdescription: string;
              supplier: string;
              dateexpensed: string;
              quantity: number;
              cost: number;
              currentbalance: number;
              account: string;
              amount: number;
              datesent: string;
              note: string;
              accountid: number;
            },
            i: number
          ) => ({
            id: item.accountid,
            description: item.itemdescription,
            supplier: item.supplier,
            dateexpensed: item.dateexpensed,
            quantity: item.quantity,
            cost: item.cost,
            balance: `KES ${item.currentbalance}`,
            account: item.account,
            amount: `KES ${item.amount}`,
            datesent: item.datesent,
            note: item.note,
          })
        );
        setExpenseData(expense);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    const accounts = async () => {
      try {
        const response = await axios.get(`${serverUrl}item/AccountList`);
        const invoiceList = response.data.list.map(
          (item: { id: number; account: string }) => ({
            id: item.id,
            account: item.account,
          })
        );
        setAccountList(invoiceList);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    const livestock = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}livestock/${livestockId}`
        );
        const livestockList = response.data.livestock.map(
          (item: {
            id: number;
            tagid: string;
            dateadded: string;
            breed: number;
            healthstatus: string;
            nannyid: string;
            herdmetric: string;
            shelter: string;
            note: string;
          }) => ({
            id: item.id,
            tagid: item.tagid,
            dateadded: item.dateadded,
            breed: item.breed,
            healthstatus: item.healthstatus,
            herdmetric: item.herdmetric,
            shelter: item.shelter,
            note: item.note,
            nanny: item.nannyid ? item.nannyid : "N/A",
          })
        );

        setLivestockData(livestockList);

        // Save alive and dead kids info
        setAliveKids({
          count: response.data.aliveKids.count,
          tagids: response.data.aliveKids.tagids,
        });

        setDeadKids({
          count: response.data.deadKids.count,
          tagids: response.data.deadKids.tagids,
        });

        setLivestockData(livestockList);
      } catch (error) {
        console.error("Error fetching livestock:", error);
      }
    };

    const livestocklist = async () => {
      try {
        const response = await axios.get(`${serverUrl}item/shelterList`);
        const shelterList = response.data.list.map(
          (item: { id: number; pen: string }) => ({
            id: item.id,
            shelter: item.pen,
          })
        );

        setShelterList(shelterList);
      } catch (error) {
        console.error("Error fetching livestock:", error);
      }
    };

    const statuslist = async () => {
      try {
        const response = await axios.get(`${serverUrl}item/statusList`);
        const statusList = response.data.list.map(
          (item: { id: number; status: string }) => ({
            id: item.id,
            healthstatus: item.status,
          })
        );

        setStatusList(statusList);
      } catch (error) {
        console.error("Error fetching livestock:", error);
      }
    };

    const metriclist = async () => {
      try {
        const response = await axios.get(`${serverUrl}item/metricList`);
        const metricList = response.data.list.map(
          (item: { id: number; metric: string }) => ({
            id: item.id,
            herdmetric: item.metric,
          })
        );

        setMetricList(metricList);
      } catch (error) {
        console.error("Error fetching livestock:", error);
      }
    };

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
          })
        );

        setStaffData(filteredStaff);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    staffList();
    metriclist();
    statuslist();
    livestocklist();
    accounts();
    expense();
    livestock();
  }, [expenseId, livestockId, staffId]);

  const changeAccount = async (accountId: number) => {
    try {
      // Send the PUT request
      const response = await axios.put(
        `${serverUrl}expense/update/${expenseId}/${accountId}`
      );
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("Failed to update account");
    }
  };

  const changeShelter = async (shelter: string | undefined) => {
    try {
      const response = await axios.put(
        `${serverUrl}livestock/update/${livestockId}`,
        { shelter }
      );
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating shelter:", error);
      toast.error("Failed to update shelter");
    }
  };

  const changeHealthStatus = async (healthstatus: string | undefined) => {
    try {
      const response = await axios.put(
        `${serverUrl}livestock/update/${livestockId}`,
        { healthstatus }
      );
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating health status:", error);
      toast.error("Failed to update health status");
    }
  };

  const changeHerdMetric = async (herdmetric: string | undefined) => {
    try {
      const response = await axios.put(
        `${serverUrl}livestock/update/${livestockId}`,
        { herdmetric }
      );
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating herd metric:", error);
      toast.error("Failed to update herd metric");
    }
  };
  const [salary, setSalary] = useState(""); // Initialize salary state

  const handleSalaryBlur = async () => {
    try {
      const salaryAmount = parseFloat(salary);
      if (isNaN(salaryAmount)) {
        console.error("Invalid salary input");
        return;
      }
      const response = await axios.put(`${serverUrl}staff/update/${staffId}`, {
        salary: salaryAmount,
      });
      toast.success(response.data.tab);
    } catch (error) {
      console.error("Error updating salary:", error);
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
              <div css={columnStyle("#486c1b")}>
                <div style={{ color: "#ffffff" }}>
                  <p>
                    Name: <b> {item.name}</b>
                  </p>
                  <p>Phone Number: {item.phone}</p>
                  <p>Email: {item.email}</p>
                </div>
              </div>
              <div css={columnStyle("#ffffff")}>
                <div style={{ color: "#486c1b" }}>
                  <p>
                    Started work on: <b>{item.date}</b>
                  </p>
                  <p>
                    Designation: <b>{item.designation}</b>,
                    <b> {item.department}</b>
                  </p>
                  <p>
                    Salary:{" "}
                    <b>
                      KES{" "}
                      <input
                        type="text"
                        value={
                          salary.toLocaleString() ||
                          item.salary.toLocaleString()
                        }
                        onChange={(e) => setSalary(e.target.value)}
                        onBlur={handleSalaryBlur}
                        style={{
                          border: "none",
                          background: "transparent",
                          outline: "none",
                          font: "inherit",
                          padding: 0,
                          cursor: "text",
                          color: "#486c1b",
                        }}
                      />
                    </b>
                  </p>
                </div>
              </div>
              <div css={columnStyle("#486c1b")}>
                <div style={{ color: "#ffffff" }}>
                  {/* // 1 = awaiting confirmation
                      // 0 = Dismissed
                      // 2 = permanent etc */}
                  <p>
                    Employment Terms:{" "}
                    {item.status === 1
                      ? "Dismissed"
                      : item.status === 0
                      ? "Awaiting Confirmation"
                      : item.status === 2
                      ? "Permanent and Pensionable"
                      : item.status === 3
                      ? "Casual"
                      : item.status === 4
                      ? "Inter"
                      : ""}
                  </p>
                  <p>Descriptive Features: {item.note}</p>
                  <a
                    href={`${serverUrl}${item.cv}`}
                    style={{ color: "#ffffff", textDecoration: "none" }}
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
        : activeTab === "View Expense"
        ? expenseData.map((item, index) => (
            <div key={index} css={containerStyle}>
              <div css={columnStyle("#486c1b")}>
                <div style={{ color: "#ffffff" }}>
                  <p>
                    Item: <b> {item.description}</b>
                  </p>
                  <p>Vendor: {item.supplier}</p>
                  <p>
                    Date Expensed: <b>{item.dateexpensed}</b>
                  </p>
                </div>
              </div>
              <div css={columnStyle("#ffffff")}>
                <div style={{ color: "#486c1b" }}>
                  <p>
                    Quantity: <b>{item.quantity} Units</b>
                  </p>
                  <p>
                    Total Cost: <b>KES {Number(item.cost)}</b>
                  </p>
                  <p>
                    Running Balance After: <b> {item.balance}</b>
                  </p>
                </div>
              </div>
              <div css={columnStyle("#486c1b")}>
                <div style={{ color: "#ffffff" }}>
                  <div css={dropdownStyles}>
                    Account: <span>{item.account} &#9660;</span>
                    <div style={{ textAlign: "left", textDecoration: "none" }}>
                      {accountData.map((account, index) => (
                        <a
                          key={index}
                          href="."
                          onClick={(e) => {
                            e.preventDefault();
                            changeAccount(account.id);
                          }}
                        >
                          {account.account}
                        </a>
                      ))}
                    </div>
                  </div>
                  <p>
                    Receipt:{" "}
                    <b>
                      KES {item.amount} - {item.datesent}
                    </b>
                  </p>
                  <p>Note: {item.note}</p>
                </div>
              </div>
            </div>
          ))
        : activeTab === "Livestock Details"
        ? livestockData.map((item, index) => (
            <div key={index} css={containerStyle}>
              <div css={columnStyle("#486c1b")}>
                <div style={{ color: "#ffffff" }}>
                  <p>
                    Name:{" "}
                    <b>
                      {item.tagid} - {item.breed}
                    </b>
                  </p>
                  <p>
                    Arrival date/DOB: <b>{item.dateadded}</b>
                  </p>
                  <p>
                    Vaccines: <b>Budapest, mouthFoot</b>
                    <b>...</b>
                  </p>
                </div>
              </div>
              <div css={columnStyle("#ffffff")}>
                <div style={{ color: "#486c1b" }}>
                  <p>
                    Nanny: <b>{item.nanny}</b>
                  </p>
                  <p>
                    No. of Kids Alive: <b>{aliveKids.count}</b>
                    {aliveKids.tagids.join(", ")}
                  </p>
                  <p>
                    No. of Kids Dead: <b>{deadKids.count} </b>{" "}
                    {deadKids.tagids.join(", ")}
                  </p>
                </div>
              </div>
              <div css={columnStyle("#486c1b")}>
                <div style={{ color: "#ffffff" }}>
                  <div css={dropdownStyles}>
                    Pen:
                    <span>{item.shelter} &#9660;</span>
                    <div style={{ textAlign: "left", textDecoration: "none" }}>
                      {shelterList.map((item, index) => (
                        <a
                          key={index}
                          href="."
                          onClick={(e) => {
                            e.preventDefault();
                            changeShelter(item.shelter);
                          }}
                        >
                          {item.shelter}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div css={dropdownStyles}>
                      Health Status: <span>{item.healthstatus} &#9660;</span>
                      <div
                        style={{ textAlign: "left", textDecoration: "none" }}
                      >
                        {statusList.map((status, index) => (
                          <a
                            key={index}
                            href="."
                            onClick={(e) => {
                              e.preventDefault();
                              changeHealthStatus(status.healthstatus);
                            }}
                          >
                            {status.healthstatus}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div css={dropdownStyles}>
                      Herd Metric:
                      <span>{item.herdmetric} &#9660;</span>
                      <div
                        style={{ textAlign: "left", textDecoration: "none" }}
                      >
                        {metricList.map((metric, index) => (
                          <a
                            key={index}
                            href="."
                            onClick={(e) => {
                              e.preventDefault();
                              changeHerdMetric(metric.herdmetric);
                            }}
                          >
                            {metric.herdmetric}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>Descriptive Features: {item.note}</div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};
