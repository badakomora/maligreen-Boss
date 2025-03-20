import React from "react";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");

  :root {
    --color1: #ffffff;
    --color2:  #ffffff;
    --color5: #ffffff;
    --color6: #486c1b;
    font-family: "Inria Sans", sans-serif;
  }

  .center-container {
    background-color: #486c1b;
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
    box-shadow: 0px 0px 10px -6px  #ffffff;
  }
  .section {
    padding: 1rem 1.8rem;
    transition: scale 1s ease-out;
    box-shadow: 0px 0px 65px -3px  #486c1b;
  }
  .section:hover {
    transform: scale(1.01);
    // box-shadow: 0px 0px 65px -3px  #486c1b;
  }
  .special1 {
    grid-column: span 2;
    background: url(https://upload.wikimedia.org/wikipedia/commons/0/00/Old_Albanian_woman.jpg)
      no-repeat center center;
    background-size: cover;
    color: white;
  }
     .special3 {
    color: #486c1b;
  }
      .special4 {
    color:  #ffffff;
  }
  .special2 {
    grid-column: span 2;
     color:  #ffffff;
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
  return (
    <>
      <Global styles={globalStyles} />
      <div className="center-container">
        <main className="grid">
          <section className="section" style={{ backgroundColor: bgColors.c1 }}>
            <header className="special3">
              <span style={{ fontSize: "5rem", fontWeight: "bolder" }}>Today's Sales</span>
              <span style={{ fontSize: "1.2rem" }}>
                <b>KES</b>36,584
              </span>
            </header>
          </section>
          <section className="section special3" style={{ backgroundColor: bgColors.c2 }}>
            <span>Today's Production</span>
            <span style={{ fontSize: "4rem" }}>3247 Litres</span>
          </section>
          <section className="section special1">
            <span style={{ fontSize: "2.5rem" }}>Grey Martin</span>
            <span style={{ fontSize: "1.2rem" }}>⭐ Rated Valued Customer</span>
          </section>
          <section className="section special2">
            <span>Today's Incurred Expenses</span>
            <span style={{ fontSize: "4rem" }}>KES300,064</span>
          </section>
          <section className="section special3" style={{ backgroundColor: bgColors.c5 }}>
            <span style={{ fontSize: "4rem" }}>Today's Variance </span>
            <b>KES300,000</b>
          </section>
          <section className="section special4" style={{ backgroundColor: bgColors.c6 }}>
            <span style={{ fontSize: "1.2rem" }}>Today's goat count on the farm</span>
            <b><big>4004</big></b>
          </section>
        </main>
      </div>
    </>
  );
};


