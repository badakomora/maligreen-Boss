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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  section {
    background: #ffffff;
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
    color: #486c1b;
    font-weight: 900;
  }

  .product_details .discription,
  .product_details .price,
  .product_details .other {
    font-size: 0.8em;
    color: #486c1b;
  }

  .product_details .price {
    font-size: 1.1em;
    font-weight: 600;
  }

  .product_details .price .price_original {
    text-decoration: line-through;
    font-size: 0.7em;
    font-weight: 400;
  }

  .product_details .price .offer {
    color: #486c1b;
    font-weight: 600;
  }

  .right {
    display: block;
  }

  .product_description {
    text-align: left;
    margin: 20px 10px;
  }

  .product_description h4 {
    font-size: 0.9em;
    font-weight: 900;
    margin-bottom: 20px;
  }

  .product_description p {
    font-size: 0.8em;
    color: #486c1b;
    margin-bottom: 15px;
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
            <h4 className="title">Goat Milk 1L</h4>
            <p className="discription">Market Prize</p>
            <p className="price">
              <span className="offer">KES200</span>
            </p>
            <p className="other">Inclusive of all taxes</p>
          </div>
        </div>

        <div className="right">
          <div className="product_description">
            <Chart />
          </div>
        </div>
      </div>
    </section>
  );
};
 