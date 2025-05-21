/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type React from "react";
import { Chart } from "./Chart";

const productStyles = css`
  section {
    background: #ffffff;
    width: 100%;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(72, 108, 27, 0.1);
    margin: 20px 0;
  }

  .content {
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  .left {
    width: 20%;
    display: flex;
    flex-direction: column;
  }

  .product_img {
    height: 250px;
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
    background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17rLWpUemc2N_ScqpAr-NX1OOKWUQmQwdyXWDf1U0o6XpdFhm1mSI1GIzVFAVjxwahb0&usqp=CAU")
      no-repeat center;
    background-size: cover;
    box-shadow: 0 6px 15px rgba(72, 108, 27, 0.15);
    transition: transform 0.3s ease;
    border: 3px solid rgba(72, 108, 27, 0.08);

    &:hover {
      transform: scale(1.02);
      border-color: rgba(72, 108, 27, 0.2);
    }
  }

  .product_details {
    text-align: left;
    margin-top: 20px;
    padding: 18px;
    background: rgba(72, 108, 27, 0.05);
    border-radius: 10px;
    border-left: 4px solid #486c1b;
  }

  .product_details .title {
    font-size: 1.3em;
    color: #486c1b;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  .product_details .discription,
  .product_details .price,
  .product_details .other {
    font-size: 0.9em;
    color: #5a7a2e;
    margin: 5px 0;
  }

  .product_details .price {
    font-size: 1.1em;
    font-weight: 600;
    margin: 12px 0;
    color: #3d5c14;
  }

  .product_details .offer {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .product_details .discription {
    font-size: 0.8em;
    opacity: 0.8;
    font-weight: 500;
  }

  .product_details .other {
    font-size: 0.8em;
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px dashed rgba(72, 108, 27, 0.2);
  }

  .right {
    width: 80%;
    background: rgba(72, 108, 27, 0.03);
    border-radius: 10px;
    padding: 20px;
  }

  .product_description {
    text-align: left;
    height: 100%;
  }

  @media (max-width: 768px) {
    .content {
      flex-direction: column;
    }

    .left,
    .right {
      width: 100%;
    }

    .product_img {
      height: 220px;
      max-width: 230px;
      margin: 20px auto;
    }

    .product_details {
      text-align: center;
      border-left: none;
      border-top: 4px solid #486c1b;
    }
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
                <span className="discription">Market Price</span>
                KES 200
              </span>
            </p>
            <p className="other">Inclusive of all taxes</p>
          </div>
        </div>
      </div>
    </section>
  );
};