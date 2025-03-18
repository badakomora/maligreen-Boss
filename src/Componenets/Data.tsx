/** @jsxImportSource @emotion/react */
// https://codepen.io/Yashi-Singh/pen/EaYemax
import { css } from '@emotion/react';

const pricingGridStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding:20px;
`;

const planStyles = css`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 250px;
  box-shadow: 0px 0px 10px #486c1b;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const plan1Styles = css`
  background: #ffffff;
  color: #486c1b;
  > a{
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background:  #486c1b;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s;

  &:hover {
    padding: 10px
  }}
`;

const plan2Styles = css`
  background: #486c1b;
  color: #ffffff;
  > a{
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background:  #ffffff;
    color: #486c1b;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s;

  &:hover {
    padding: 10px
  }}
`;


export const Data = () => {
  return (
    <div css={pricingGridStyles}>
   <p style={{color:"#486c1b"}}> <big><b>Today's Sale Revenue </b></big> <br />remained steady across <br />all channels, <br /> with <b>farm pickups</b> <br /> leading in volume.</p>
      <div css={[planStyles, plan1Styles]}>
        <h2>Cash Revenue</h2>
        <div>
          <p>Farm Pickup<big><b>KES400</b></big></p>
          <hr />
          <p>Delivery<big><b>KES3,200</b></big></p>
          <hr />
          <p>Wholesale<big><b>KES2,000</b></big></p>
          <hr />
        </div>
        <a  href=".">KES 5,800</a>
      </div>

      <div css={[planStyles, plan2Styles]}>
        <h2>Till 4367608 Revenue</h2>
        <div>
        <p>Farm Pickup<big><b>KES400</b></big></p>
          <hr />
          <p>Delivery<big><b>KES3,200</b></big></p>
          <hr />
          <p>Wholesale<big><b>KES2,000</b></big></p>
          <hr />
        </div>
        <a  href=".">KES 5,100</a>
      </div>

      <div css={[planStyles, plan1Styles]}>
        <h2>Sanbic Bank Revenue</h2>
        <div>
        <p>Farm Pickup<big><b>KES400</b></big></p>
          <hr />
          <p>Delivery<big><b>KES3,200</b></big></p>
          <hr />
          <p>Wholesale<big><b>KES2,000</b></big></p>
          <hr />
        </div>
        <a  href=".">KES 5,200</a>
      </div>
    </div>
  );
};

