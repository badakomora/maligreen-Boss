/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import axios from "axios"
import { useState, useEffect } from "react"
import { Dynamics } from "./Dynamics"
import { serverUrl } from "../AppConfig"

const styles = {
  container: css`
    font-family: Monaco;
    background: #ffffff;
    width: 100%;
    margin: auto;
  `,
  section: css`
    border: 2px solid #2a61ae;
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(72, 108, 27, 0.2);
  `,
  headerContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  header: css`
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    margin: 0;
    text-align: right;
    @media (max-width: 768px) {
      text-align: left;
      margin-top: 1rem;
    }
  `,
  spanFirst: css`
    font-size: 1em;
    color: #2a61ae;
    display: block;
    margin-bottom: 0.5rem;
  `,
  spanLast: css`
    font-size: 1.6em;
    color: #2a61ae;
    display: block;
    font-weight: 800;
  `,
  tableWrap: css`
    overflow-x: auto;
    margin-bottom: 2rem;
    width: 100%;
    border-radius: 8px;
  `,
  caption: css`
    color: #2a61ae;
    text-align: left;
    padding: 0.5rem 0;
  `,
  table: css`
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    color: #2a61ae;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px -6px #2a61ae;
    margin-top: 4px;

    th,
    td {
      padding: 0.4rem;
      text-align: left;
    }

    td:last-child,
    th:last-child {
      text-align: right;
    }

    td a {
      padding: 0.4rem;
      text-align: left;
      color: #2a61ae;
      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    }

    thead {
      background: #2a61ae;
      color: #ffffff;
      border-bottom: 2px solid #ffffff;
    }

    tr {
      border-bottom: 1px solid #2a61ae;
      font-weight: none;
    }
  `,
  summaryText: css`
    margin: 1rem 0;
    font-size: 1.05rem;
    display: flex;
    justify-content: space-between;
    color: #2a61ae;

    b {
      font-weight: 700;
      font-size: 1.15rem;
    }
  `,
  summaryContainer: css`
    color: #2a61ae;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1.5rem;
    background: #ffffff;

    h2 {
      margin-top: 0;
      font-size: 1.4rem;
      font-weight: 700;
    }
  `,
}

interface NavbarProps {
  activeTab: string
}

interface IdProps {
  budgetId: number | string
  receiptId: number | string
  invoiceId: number
  productionId: number | string
  payrollId: number | string
}

interface TableDataProps {
  id: number
  name: string
  value: number
  date: string
}

interface payrollProps {
  id: number
  name: string
  designation: string
  salary: number
  status: number
}

interface ProductionProps {
  morning: string
  evening: string
  date: string
  overal: string
}

interface BudgetData {
  [account: string]: TableDataProps[]
}

export const Budget: React.FC<NavbarProps & IdProps> = ({
  activeTab,
  budgetId,
  receiptId,
  payrollId,
  productionId,
}) => {
  const farmMetrics = {
    herdMetrics: [
      { name: "Initial Goat Stock", value: "8,000", important: true },
      { name: "Total Goat Count", value: "5,000", important: true },
      { name: "Lactating Goats", value: "2,039", important: true },
      { name: "Kids Count", value: "8,457" },
      { name: "Pregnant Goats", value: "457" },
      { name: "Bucks", value: "457" },
      { name: "Breeds", value: "1,209" },
    ],
    healthStatus: [
      { name: "Healthy", value: "457", important: true },
      { name: "Sick Goats", value: "400" },
      { name: "Under Treatment", value: "5,000" },
      { name: "Recovering", value: "2,039" },
      { name: "Injured", value: "8,457" },
      {
        name: "Total Deceased Goats",
        value: "1,000",
        note: "High priority",
        important: true,
      },
    ],
  }

  const [budgetData, setBudgetData] = useState<BudgetData>({})
  const [incurreddata, setInccurredCostsData] = useState<BudgetData>({})
  const [receiptData, setReceiptsData] = useState<BudgetData>({})
  const [receipt, setReceipt] = useState(0)
  const [balanceafter, setBalanceAfter] = useState(0)
  const [date, setDate] = useState()

  const [production, setProduction] = useState<ProductionProps[]>([])
  const [totals, setTotals] = useState({ morning: 0, evening: 0, overall: 0 })
  const { runningBalance } = Dynamics()
  const [perioddates, setperioddates] = useState("")
  const [payrolldata, setPayrollData] = useState<payrollProps[]>([])
  const [payrollmonth, setPayrollMonth] = useState("")
  const [totalsalary, setTotalSalary] = useState(0)

  useEffect(() => {
    const fetchBudgetMonthsItems = async () => {
      try {
        const response = await axios.get(`${serverUrl}budget/${budgetId}`)
        const groupedBudget: BudgetData = {}

        response.data.list.forEach(
          (item: {
            id: number
            description: string
            cost: number
            monthadded: string
            account: string
          }) => {
            const entry = {
              id: item.id,
              name: item.description,
              value: item.cost,
              date: item.monthadded,
            }

            const normalizedAccount = item.account.trim()

            if (!groupedBudget[normalizedAccount]) {
              groupedBudget[normalizedAccount] = []
            }
            groupedBudget[normalizedAccount].push(entry)
          },
        )

        setBudgetData(groupedBudget)
      } catch (error) {
        console.error("Error fetching budget:", error)
      }
    }

    const fetchInccurredCostsItems = async () => {
      try {
        const response = await axios.get(`${serverUrl}incurredcost/list`)
        const groupedIncurredCosts: BudgetData = {}

        response.data.list.forEach(
          (item: {
            id: number
            description: string
            cost: number
            datecreated: string
            account: string
          }) => {
            const entry = {
              id: item.id,
              name: item.description,
              value: item.cost,
              date: item.datecreated,
            }

            const normalizedAccount = item.account.trim()

            if (!groupedIncurredCosts[normalizedAccount]) {
              groupedIncurredCosts[normalizedAccount] = []
            }
            groupedIncurredCosts[normalizedAccount].push(entry)
          },
        )

        setInccurredCostsData(groupedIncurredCosts)
      } catch (error) {
        console.error("Error fetching incurred costs:", error)
      }
    }

    const fetchProduction = async () => {
      try {
        const response = await axios.get(`${serverUrl}production/${productionId}`)

        const productionList = response.data.list.map((item: any) => ({
          date: new Date(item.dateadded).toLocaleDateString("en-GB"),
          morning: item.morningproduction.toString(),
          evening: item.eveningproduction.toString(),
        }))

        const totals = {
          morning: response.data.totals.total_morning,
          evening: response.data.totals.total_evening,
          overall: response.data.totals.total_production,
        }

        setProduction(productionList)
        setTotals(totals)
        setperioddates(response.data.perioddate)
      } catch (error) {
        console.error("Error fetching production:", error)
      }
    }

    const fetchReceipts = async () => {
      try {
        const response = await axios.get(`${serverUrl}expense/receipt/${receiptId}`)
        const groupedReceipts: BudgetData = {}

        response.data.list.forEach(
          (item: {
            amount: number
            itemdescription: string
            account: string
            cost: number
            date: string
            quantity: number
          }) => {
            const entry = {
              id: item.amount,
              name: item.itemdescription,
              value: item.cost * item.quantity,
              date: "",
            }

            const normalizedAccount = item.account.trim()

            if (!groupedReceipts[normalizedAccount]) {
              groupedReceipts[normalizedAccount] = []
            }
            groupedReceipts[normalizedAccount].push(entry)
          },
        )

        setReceiptsData(groupedReceipts)
        setReceipt(response.data.receipt)
        setDate(response.data.date)
        setBalanceAfter(response.data.currentBalance)
      } catch (error) {
        console.error("Error fetching budget:", error)
      }
    }

    const fetchPayroll = async () => {
      try {
        const response = await axios.get(`${serverUrl}staff/payroll/${payrollId}`)

        const payroll = response.data.payroll.map(
          (
            item: {
              name: string
              designation: string
              salary: string
              status: number
            },
            id: number,
          ) => ({
            id: id + 1,
            name: item.name,
            designation: item.designation,
            salary: item.salary,
            status:
              item.status === 0
                ? "Dismissed"
                : item.status === 1
                  ? "Awaiting Confirmation"
                  : item.status === 2
                    ? "Permanent and Pensionable"
                    : item.status === 3
                      ? "Casual"
                      : item.status === 4
                        ? "Inter"
                        : "",
          }),
        )

        setPayrollData(payroll)
        setTotalSalary(response.data.totalSalary)
        setPayrollMonth(response.data.monthadded)
      } catch (error) {
        console.error("Error fetching budget:", error)
      }
    }

    fetchPayroll()
    fetchInccurredCostsItems()
    fetchProduction()
    fetchReceipts()
    fetchBudgetMonthsItems()
  }, [budgetId, payrollId, productionId, receiptId])

  const invoices = [
    {
      date: "1/2/2025",
      product: "Goat Milk",
      quantity: "6L",
      grand: "5000",
    },
    {
      date: "1/2/2025",
      product: "Goat Yoghurt",
      quantity: "300g",
      grand: "5000",
    },
    {
      date: "1/2/2025",
      product: "Goat Soap",
      quantity: "100g",
      grand: "5000",
    },
  ]

  const formatCurrency = (value: string) => {
    const numValue = Number(value.replace(/,/g, ""))
    return numValue.toLocaleString()
  }

  return (
    <main css={styles.container}>
      <section css={styles.section}>
        <div css={styles.headerContainer}>
          <img src="/logo.png" alt="Company Logo" width="200px" height="80px" />
          <h4 css={styles.header}>
            {activeTab === "Budget" ? (
              <>
                {Object.entries(budgetData)
                  .slice(0, 1)
                  .map(([account, items], index) => (
                    <div key={`budget-header-${index}`}>
                      {items.length > 0 && <span css={styles.spanFirst}>{items[0].date}</span>}
                    </div>
                  ))}
                <span css={styles.spanLast}>Monthly Budget</span>
              </>
            ) : activeTab === "Receipt Breakdown" ? (
              <>
                <span css={styles.spanFirst}>{date}</span>
                <span
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    color: "#2a61ae",
                  }}
                >
                  Ref.
                  <b css={styles.spanLast}>KES {receipt}</b>
                </span>
              </>
            ) : activeTab === "Incurred Costs" ? (
              <>
                <span css={styles.spanFirst}>
                  {Object.entries(incurreddata).flatMap(([_, items]) => items)[0]?.date}
                </span>
                <span
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    color: "#2a61ae",
                  }}
                >
                  Ref.
                  <b css={styles.spanLast}>
                    KES{" "}
                    {Object.entries(incurreddata)
                      .flatMap(([_, items]) => items)
                      .reduce((sum, item) => sum + Number(item.value || 0), 0)
                      .toLocaleString()}
                  </b>
                </span>
              </>
            ) : activeTab === "Livestock Report" ? (
              <>
                <span css={styles.spanFirst}>March 2025 - January 2030</span>
                <span css={styles.spanLast}>Livestock Report</span>
              </>
            ) : activeTab === "Production Report" ? (
              <>
                <span css={styles.spanFirst}>{perioddates}</span>
                <span css={styles.spanLast}>Production Report</span>
              </>
            ) : activeTab === "Invoice Details" || activeTab === "Credit Note" ? (
              <>
                <span
                  style={{
                    color: "#2a61ae",
                    display: "block",
                  }}
                >
                  March 2025
                </span>
                <span
                  style={{
                    color: "#2a61ae",
                    display: "block",
                    fontWeight: "800",
                  }}
                >
                  Andrew Bada Komora
                </span>
              </>
            ) : (
              <>
                <span css={styles.spanFirst}>{payrollmonth}</span>
                <span css={styles.spanLast}>Payroll Report</span>
              </>
            )}
          </h4>
        </div>

        <div css={styles.tableWrap}>
          {activeTab === "Livestock Report" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>Herd Metrics</caption>
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>No.</th>
                  </tr>
                </thead>
                <tbody>
                  {farmMetrics.herdMetrics.map((item, i) => (
                    <tr key={`herd-${i}`}>
                      <th>{item.name}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table css={styles.table}>
                <caption css={styles.caption}>Health Status</caption>
                <thead>
                  <tr>
                    <th>Details</th>
                    <th>No.</th>
                  </tr>
                </thead>
                <tbody>
                  {farmMetrics.healthStatus.map((item, i) => (
                    <tr key={`health-${i}`}>
                      <th>{item.name}</th>
                      <td>{formatCurrency(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : activeTab === "Receipt Breakdown" ? (
            <>
              {Object.entries(receiptData).map(([account, items], accountIndex) => (
                <table css={styles.table} key={`receipt-table-${accountIndex}`}>
                  <caption css={styles.caption}>{account}</caption>
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, itemIndex) => (
                      <tr key={`receipt-${accountIndex}-${itemIndex}`}>
                        <th>{item.name}</th>
                        <td>KES {item.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}

              <div css={styles.summaryContainer}>
                <h2>Receipt Summary</h2>
                <hr style={{ border: "1px dotted #2a61ae" }} />
                <p css={styles.summaryText}>
                  <span>Receipt Funding:</span>
                  <b>KES {Number(receipt).toLocaleString()}</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Surplus:</span>
                  <b>KES {Number(balanceafter).toLocaleString()}</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Expenses:</span>
                  <b>
                    KES{" "}
                    {Number(
                      Object.values(receiptData)
                        .flat()
                        .reduce((total, item) => total + (Number(item.value) || 0), 0),
                    ).toLocaleString()}
                  </b>
                </p>

                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>
                    KES{" "}
                    {(
                      balanceafter -
                      Object.values(receiptData)
                        .flat()
                        .reduce((total, item) => total + (Number(item.value) || 0), 0)
                    ).toLocaleString()}
                  </b>
                </p>

                <hr style={{ border: "1px dotted #2a61ae" }} />
              </div>
            </>
          ) : activeTab === "Incurred Costs" ? (
            <>
              {Object.entries(incurreddata).map(([account, items], accountIndex) => (
                <table css={styles.table} key={`incurred-table-${accountIndex}`}>
                  <caption css={styles.caption}>{account}</caption>
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, itemIndex) => (
                      <tr key={`incurred-${accountIndex}-${itemIndex}`}>
                        <th>{item.name}</th>
                        <td>KES {item.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}

              <div css={styles.summaryContainer}>
                <h2>Summary</h2>
                <hr style={{ border: "1px dotted #2a61ae" }} />

                <p css={styles.summaryText}>
                  <span>Total Incurred Costs:</span>
                  <b>
                    KES{" "}
                    {Object.entries(incurreddata)
                      .flatMap(([_, items]) => items)
                      .reduce((sum, item) => sum + Number(item.value || 0), 0)
                      .toLocaleString()}
                  </b>
                </p>

                <p css={styles.summaryText}>
                  <span>Running Balance:</span>
                  <b>KES {runningBalance.toLocaleString()}</b>
                </p>

                <hr style={{ border: "1px dotted #2a61ae" }} />
              </div>
            </>
          ) : activeTab === "Production Report" ? (
            <>
              <table css={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Morning Production</th>
                    <th>Evening Production</th>
                    <th>Total Production</th>
                  </tr>
                </thead>
                <tbody>
                  {production.map((item, i) => (
                    <tr key={`production-${i}`}>
                      <th>{item.date}</th>
                      <td>{item.morning} Litres</td>
                      <td>{item.evening} Litres</td>
                      <td>{Number(item.morning) + Number(item.evening)} Litres</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div css={styles.summaryContainer}>
                <hr style={{ border: "1px dotted #2a61ae" }} />
                <p css={styles.summaryText}>
                  <span>Total Morning Production:</span>
                  <b>{totals.morning} Litres</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Evening Production:</span>
                  <b>{totals.evening} Litres</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Production:</span>
                  <b>{totals.overall} Litres</b>
                </p>

                <hr style={{ border: "1px dotted #2a61ae" }} />
              </div>
            </>
          ) : activeTab === "Budget" ? (
            <>
              {Object.entries(budgetData).map(([account, items], accountIndex) => (
                <table css={styles.table} key={`budget-table-${accountIndex}`}>
                  <caption css={styles.caption}>{account}</caption>
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, itemIndex) => (
                      <tr key={`budget-${accountIndex}-${itemIndex}`}>
                        <th>{item.name}</th>
                        <td>KES {item.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}

              <div css={styles.summaryContainer}>
                <h2>Budget Summary</h2>
                <hr style={{ border: "1px dotted #2a61ae" }} />
                <p css={styles.summaryText}>
                  <span>Total Budget:</span>
                  <b>
                    KES{" "}
                    {Object.values(budgetData)
                      .flat()
                      .reduce((total, item) => total + (Number(item.value) || 0), 0)
                      .toFixed(2)}
                  </b>
                </p>

                <hr style={{ border: "1px dotted #2a61ae" }} />
              </div>
            </>
          ) : activeTab === "Invoice Details" || activeTab === "Credit Note" ? (
            <>
              <table css={styles.table}>
                <caption css={styles.caption}>
                  {activeTab === "Invoice Details" ? "Customer Receipt" : "Credit Note"}
                </caption>
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((item, i) => (
                    <tr key={`invoice-${i}`}>
                      <th>Invoice2534</th>
                      <td>
                        {item.product}({item.quantity})
                      </td>
                      <th>KES {item.grand}</th>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div css={styles.summaryContainer}>
                <h2>Receipt Summary</h2>
                <hr style={{ border: "1px dotted #2a61ae" }} />
                <p css={styles.summaryText}>
                  <span>Payment Method</span>
                  <b>Buy Goods</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Amount Paid</span>
                  <b>KES 500,000</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Total Owed</span>
                  <b>KES 43,587</b>
                </p>

                <p css={styles.summaryText}>
                  <span>Balance</span>
                  <b>KES 503,587</b>
                </p>

                <hr style={{ border: "1px dotted #2a61ae" }} />
              </div>
            </>
          ) : (
            <>
              <table css={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Employment Term</th>
                    <th>Basic Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolldata.map((item, i) => (
                    <tr key={`payroll-${i}`}>
                      <th>{item.name}</th>
                      <td>{item.designation}</td>
                      <td>{item.status}</td>
                      <td>KES {item.salary.toLocaleString("en-US")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div css={styles.summaryContainer}>
                <h2>Payroll Summary</h2>
                <hr style={{ border: "1px dotted #2a61ae" }} />
                <p css={styles.summaryText}>
                  <span>Total Salaries:</span>
                  <b>KES {totalsalary.toLocaleString()}</b>
                </p>
                <hr style={{ border: "1px dotted #2a61ae" }} />
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
