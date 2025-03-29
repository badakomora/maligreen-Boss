/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const pricingGridStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
`;

const planStyles = css`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 280px;
  box-shadow: 0px 4px 12px rgba(72, 108, 27, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(72, 108, 27, 0.3);
  }
`;

const plan1Styles = css`
  color: #486c1b;

  > a {
    display: inline-block;
    margin-top: 10px;
    padding: 12px 18px;
    color: #486c1b;
    text-decoration: none;
    border-radius: 5px;
    border: 2px solid #486c1b;
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: #486c1b;
      color: #fff;
    }
  }
`;

const plan2Styles = css`
  background: #486c1b;
  color: #ffffff;

  > a {
    display: inline-block;
    margin-top: 10px;
    padding: 12px 18px;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    border: 2px solid #ffffff;
    transition: background 0.3s, color 0.3s;

    &:hover {
      background: #fff;
      color: #486c1b;
    }
  }
`;

export const Data = () => {
  return (
    <div>
      <center>
        <h1 css={css`color: #486c1b; margin-bottom: 20px;`}>
          Sales Revenue Over Time
        </h1>
      </center>
      <div css={pricingGridStyles}>
        <div css={[planStyles, plan1Styles]}>
          <h3>Cash Revenue</h3>
          <div>
            <p>Farm Pickup: <big><b>KES 400</b></big></p>
            <hr />
            <p>Delivery: <big><b>KES 3,200</b></big></p>
            <hr />
            <p>Wholesale: <big><b>KES 2,000</b></big></p>
            <hr />
          </div>
          <a href=".">Total: KES 5,800</a>
        </div>

        <div css={[planStyles, plan2Styles]}>
          <h3>Overtime Till 4367608 Revenue</h3>
          <div>
            <p>Farm Pickup: <big><b>KES 400</b></big></p>
            <hr />
            <p>Delivery: <big><b>KES 3,200</b></big></p>
            <hr />
            <p>Wholesale: <big><b>KES 2,000</b></big></p>
            <hr />
          </div>
          <a href=".">Total: KES 5,100</a>
        </div>

        <div css={[planStyles, plan1Styles]}>
          <h3>Overtime Stanbic Bank Revenue</h3>
          <div>
            <p>Farm Pickup: <big><b>KES 400</b></big></p>
            <hr />
            <p>Delivery: <big><b>KES 3,200</b></big></p>
            <hr />
            <p>Wholesale: <big><b>KES 2,000</b></big></p>
            <hr />
          </div>
          <a href=".">Total: KES 5,200</a>
        </div>
      </div>
    </div>
  );
};
// https://codepen.io/a7rarpress/pen/XWxOZMN