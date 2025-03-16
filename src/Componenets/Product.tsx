/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Chart } from "./Chart";

const productStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Kablammo&display=swap");

  * {
    margin: 0;
    padding: 0;
    font-family: "Nunito", sans-serif;
  }

  body {
    background: #002447;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  section {
    background: #fbeceb;
    width: 700px;
    border-radius: 5px;
    padding: 20px;
  }

  .content {
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: block;
    min-width: 250px;
    align-items: center;
  }

  .product_img {
    height: 250px;
    width: 230px;
    margin: 10px;
    border-radius: 5px;
    background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17rLWpUemc2N_ScqpAr-NX1OOKWUQmQwdyXWDf1U0o6XpdFhm1mSI1GIzVFAVjxwahb0&usqp=CAU") no-repeat center;
    background-size: cover;
  }

  .product_details {
    text-align: left;
    margin: 10px;
    padding: 5px;
  }

  .product_details .title {
    font-size: 1.3em;
    color: rgb(99, 99, 99);
    font-weight: 900;
  }

  .product_details .discription,
  .product_details .price,
  .product_details .other {
    font-size: 0.8em;
    color: gray;
  }

  .product_details .price {
    font-size: 1.1em;
    font-weight: 600;
  }

  .product_details .price .price_original {
    text-decoration: line-through;
    font-size: 0.7em;
    font-weight: 400;
    color: gray;
  }

  .product_details .price .offer {
    color: #03ac13;
    font-weight: 600;
  }

  .right {
    display: block;
  }

  .product_description {
    text-align: left;
    margin: 30px 20px;
  }

  .product_description h4 {
    font-size: 0.9em;
    font-weight: 900;
    margin-bottom: 20px;
  }

  .product_description p {
    font-size: 0.8em;
    color: grey;
    margin-bottom: 15px;
  }

  .highlight {
    color: rgb(99, 99, 99);
    font-weight: 900;
  }

  .special {
    font-size: 0.85em;
  }
`;

export const Product = () => {
  return (
    <section css={productStyles}>
      <div className="content">
        <div className="left">
          <div className="product_img"></div>
          <div className="product_details">
            <h4 className="title">GoatMilk 1L</h4>
            <p className="discription">Market Prize</p>
            <p className="price">
              {/* ₹824 <span className="price_original">₹4000</span> */}
              <span className="offer">KES 200</span>
            </p>
            <p className="other">Inclusive of all taxes</p>
          </div>
        </div>

        <div className="right">
          <div className="product_description">
            <Chart />
            <p>
              <span className="highlight">Total Goat Count</span> <a href=".">5000.</a>
              <span className="special"> Kids Count</span> <a href=".">4006</a> 
              <span className="special"> Pregnant Goats</span> <a href=".">400</a>  
            </p>
            <hr />
            <p>
              <span className="highlight">Today's production </span><a href="."><b>4000 litres</b>.</a>
              <span className="special"> Lactating Goats</span><a href=".">3000</a>
            </p>
            <hr />
            <p>
              <span className="highlight">Total deceased goats</span> <a href=".">500</a>
              <span className="special"> Sick goats</span> <a href=".">40</a>
            </p>
            <hr />
            <p>
              <span className="highlight">Breeds</span> <a href=".">50</a>
            </p>
            <hr />
            <p>
              <span className="highlight"></span> <a href=".">Feeding program</a>
            </p>
            <hr />
            <p>
              <span className="highlight"></span> <a href=".">Vaccination log</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
 