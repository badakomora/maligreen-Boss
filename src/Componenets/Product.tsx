/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Chart } from "./Chart";

const productStyles = css`
  section {
    background: #ffffff;
    width: 100%;
    border-radius: 5px;
    padding: 20px;
  }

  .content {
    display: flex;
    justify-content: space-between;
  }

  .left {
    width: 20%;
  }

  .product_img {
    height: 250px;
    width: 230px;
    margin-top: 20px;
    border-radius: 5px;
    background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17rLWpUemc2N_ScqpAr-NX1OOKWUQmQwdyXWDf1U0o6XpdFhm1mSI1GIzVFAVjxwahb0&usqp=CAU")
      no-repeat center;
    background-size: cover;
  }

  .product_details {
    text-align: left;
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

  .right {
    width: 80%;
    margin: 2px;
  }

  .product_description {
    text-align: left;
  }
`;

interface NavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const Product: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <section css={productStyles}>
      <div className="content">
        <div className="right">
          <div className="product_description">
            <Chart activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
        <div className="left">
          <div className="product_img"></div>
          <div className="product_details">
            <h4 className="title">Goat Milk 1L</h4>
            <p className="price">
              <span className="offer">
                <span className="discription">Market Prize </span>KES200
              </span>
            </p>
            <p className="other">Inclusive of all taxes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// https://codepen.io/TunderScripts/pen/JdeeQX
