/** @jsxImportSource @emotion/react */
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
  color: #486c1b;
  > a{
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    color: #486c1b;
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
    color:  #ffffff;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s;

  &:hover {
    padding: 10px
  }}
`;


export const Data = () => {
  return (
  <div>
      <center>
        <h1 style={{color:"#486c1b"}}>Sales Revenue Overtime KES30000</h1>
      </center>
      <div css={pricingGridStyles}>
        <div css={[planStyles, plan1Styles]}>
          <h3>Overtime Cash Revenue</h3>
          <div>
            <p>Farm Pickup<big><b>KES400</b></big></p>
            <hr />
            <p>Delivery<big><b>KES3,200</b></big></p>
            <hr />
            <p>Wholesale<big><b>KES2,000</b></big></p>
            <hr />
          </div>
          <a href=".">Total KES 5,800</a>
        </div>

        <div css={[planStyles, plan2Styles]}>
          <h3>Overtime Till 4367608 Revenue</h3>
          <div>
            <p>Farm Pickup<big><b>KES400</b></big></p>
            <hr />
            <p>Delivery<big><b>KES3,200</b></big></p>
            <hr />
            <p>Wholesale<big><b>KES2,000</b></big></p>
            <hr />
          </div>
          <a href=".">Total KES 5,100</a>
        </div>

        <div css={[planStyles, plan1Styles]}>
          <h3>Overtime Stanbic Bank Revenue</h3>
          <div>
            <p>Farm Pickup<big><b>KES400</b></big></p>
            <hr />
            <p>Delivery<big><b>KES3,200</b></big></p>
            <hr />
            <p>Wholesale<big><b>KES2,000</b></big></p>
            <hr />
          </div>
          <a href=".">Total KES 5,200</a>
        </div>
      </div>
  </div>
  );
};

