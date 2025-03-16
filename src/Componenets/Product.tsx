/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
  }

  .product_img {
    height: 250px;
    width: 230px;
    margin: 10px;
    border-radius: 5px;
    background: url("https://sapinsdairy.com/wp-content/uploads/2021/12/milk-bottle.png") no-repeat center;
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
            <h4 className="title">Woakers</h4>
            <p className="discription">Men's White Printed Sneakers</p>
            <p className="price">
              ₹824 <span className="price_original">₹4000</span>
              <span className="offer"> 79% OFF</span>
            </p>
            <p className="other">inclusive of all taxes</p>
          </div>
        </div>

        <div className="right">
          <div className="product_description">
            <h4>PRODUCT DESCRIPTION</h4>
            <p>
              Elevate your style with this classy pair of Casual Shoes from the house of Our brand. Featuring a contemporary refined design with exceptional comfort, this pair is perfect to give your quintessential dressing an upgrade.
            </p>
            <p>
              <span className="highlight">Country of Origin -</span> India
            </p>
            <p>
              <span className="highlight">Manufactured By -</span> S.K. INTERNATIONAL AJUDD PURAM BAGDA TAHSIL AGRA U.P.
              <span className="special"> 282001, 9759860599, sheela.woakers@gmail.com</span>
            </p>
            <p>
              <span className="highlight">Packed By -</span> S.K. INTERNATIONAL AJUDD PURAM BAGDA TAHSIL AGRA U.P.
              <span className="special"> 282001, 9759860599, sheela.woakers@gmail.com</span>
            </p>
            <p>
              <span className="highlight">Commodity -</span> Men's Casual Shoes
            </p>
            <p>
              <span className="highlight">Sold By -</span> Next Tree Private Limited
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
