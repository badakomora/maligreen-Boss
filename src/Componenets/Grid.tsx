import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../AppConfig";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");

  :root {
    --color1: #ffffff;
    --color2: #ffffff;
    --color5: #ffffff;
    --color6: #2a61ae;
    font-family: Monaco;
  }

  .center-container {
    background-color: #2a61ae;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .grid {
    width: 90vw;
    height: 90vh;
    margin: 2rem;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    box-shadow: 0px 0px 10px -6px #ffffff;
  }

  .section {
    padding: 1rem 1.8rem;
    transition: transform 0.3s ease-out;
    box-shadow: 0px 0px 65px -3px #2a61ae;
  }

  .section:hover {
    transform: scale(1.01);
  }

  .special1 {
    grid-column: span 2;
    background: url(https://upload.wikimedia.org/wikipedia/commons/0/00/Old_Albanian_woman.jpg)
      no-repeat center center;
    background-size: cover;
    color: white;
  }

  .special3 {
    color: #2a61ae;
  }

  .special3 b {
    color: #2d5110;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .special3 span:first-of-type {
    font-size: 4rem;
    font-weight: bold;
  }

  .special4 {
    color: #ffffff;
  }

  .special2 {
    grid-column: span 2;
    color: #ffffff;
  }
`;

const bgColors = {
  c1: "var(--color1)",
  c2: "var(--color2)",
  c3: "var(--color3)",
  c4: "var(--color4)",
  c5: "var(--color5)",
  c6: "var(--color6)",
};

export const Grid = () => {
  const [productioncount, setProductionCount] = useState(0);
  const [livestockcount, setLivestockCount] = useState(0);
  const [expensecount, setExpenseCount] = useState(0);
  const [salescount, setSalesCount] = useState(0);

  const [productiondrop, setProductionDrop] = useState(true);
  // const [livestockdrop, setLivestockDrop] = useState(true);
  const [expensedrop, setExpenseDrop] = useState(true);
  const [salesdrop, setSalesDrop] = useState(true);
  const [valuedCustomer, setValuedCustomer] = useState("");

  const production = async () => {
    try {
      const response = await axios.get(`${serverUrl}production/metrics`);
      setProductionCount(response.data.count);
      setProductionDrop(response.data.drop);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const customer = async () => {
    try {
      const response = await axios.get(`${serverUrl}customer/list`);
      setValuedCustomer(response.data.valued);
    } catch (error) {
      console.error("Error fetching valued customer:", error);
    }
  };

  const livestock = async () => {
    try {
      const response = await axios.get(`${serverUrl}livestock/list`);
      setLivestockCount(response.data.count);
      // setLivestockDrop(response.data.drop);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const expense = async () => {
    try {
      const response = await axios.get(`${serverUrl}expense/list`);
      setExpenseCount(response.data.count);
      setExpenseDrop(response.data.drop);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const sales = async () => {
    try {
      const response = await axios.get(`${serverUrl}invoice/list`);
      setSalesCount(response.data.count);
      setSalesDrop(response.data.drop);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  useEffect(() => {
    customer();
    production();
    livestock();
    expense();
    sales();
  }, []);
  return (
    <>
      <Global styles={globalStyles} />
      <div className="center-container">
        <main className="grid">
          <section className="section" style={{ backgroundColor: bgColors.c1 }}>
            <header className="special3">
              <span>Today's Sales</span>
              <span>
                <b>KES</b> {salescount} {salesdrop ? "\u2193" : "\u2191"}
              </span>
            </header>
          </section>
          <section
            className="section special3"
            style={{ backgroundColor: bgColors.c2 }}
          >
            <span>Today's Production</span>
            <span>
              {productioncount} Litres{productiondrop ? "\u2193" : "\u2191"}
            </span>
          </section>
          <section className="section special1">
            <span style={{ fontSize: "2.5rem" }}>{valuedCustomer}</span>
            <span style={{ fontSize: "1.2rem" }}>⭐Most Valued Customer</span>
          </section>
          <section className="section special2">
            <span>
              Today's Incurred Expenses {expensedrop ? "\u2193" : "\u2191"}
            </span>
            <span style={{ fontSize: "4rem" }}>KES {expensecount}</span>
          </section>
          <section
            className="section special3"
            style={{ backgroundColor: bgColors.c5 }}
          >
            <span>Today's Inventory</span>
            <br />
            {/* <span>5 Bags of dairy meal left ...</span> */}
            <span>Coming soon ...</span>
          </section>
          <section
            className="section special4"
            style={{ backgroundColor: bgColors.c6 }}
          >
            <span style={{ fontSize: "1.2rem" }}>
              Today's Goat Count on the Farm
            </span>
            <b>
              <big>{livestockcount}</big>
              {/* {livestockdrop ? "\u2193" : "\u2191"} */}
            </b>
          </section>
        </main>
      </div>
    </>
  );
};
