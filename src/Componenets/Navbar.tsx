/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const sidebarStyles = css`
  background: #ffffff;
  color: #486c1b;
  width: 250px;
  padding: 1rem;
  display: block;

  nav{
  margin-top:50px;
  }

  nav div a {
    margin-bottom: 1rem;
  }

  nav div a {
    text-decoration: none;
    color: #486c1b;
    padding: 0.5rem 1rem;
    display: block;
    border-radius: 5px;
  }

  nav div a:hover,
  nav div a.active {
    background: #486c1b;
    color: #ffffff;
  }

  nav div a:hover {
    background: #486c1b;
    color: #ffffff;
  }
`;


export const Navbar = () =>{


    
    return(
            <div css={sidebarStyles}>
               <img src="/2.png" alt="logo" style={{ width: "100%" }} />
                <nav>
                  <div>
                    <a href="." className="active">Dashboard</a>
                    <a href=".">Sales</a>
                    <a href=".">Expenses & Budget</a>
                    <a href=".">Livestock & Production</a>
                    <a href=".">Payroll</a>
                    <a href=".">Settings</a>
                    <a href=".">Logout</a>
                  </div>
                </nav>
              </div>
    )
}