/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const sidebarStyles = css`
  background: #ffffff;
  color: #486c1b;
  width: 250px;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 2rem;
  }

  nav ul {
    list-style: none;
  }

  nav ul li {
    margin-bottom: 1rem;
  }

  nav ul li a {
    text-decoration: none;
    color: #486c1b;
    padding: 0.5rem 1rem;
    display: block;
    border-radius: 8px;
  }

  nav ul li a:hover,
  nav ul li a.active {
    background: #486c1b;
   color: #ffffff;
  }
    nav ul li a:hover {
    background: #486c1b;
    color: #ffffff;
  }
`;


export const Navbar = () =>{


    
    return(
         <aside css={sidebarStyles}>
               <img src="/2.png" alt="logo" style={{ width: "100%" }} />
                <nav>
                  <ul>
                    <li><a href="." className="active">Dashboard</a></li>
                    <li><a href=".">Sales & Production</a></li>
                    <li><a href=".">Expenses & Budget</a></li>
                    <li><a href=".">Livestock Log</a></li>
                    <li><a href=".">Payroll</a></li>
                    <li><a href=".">Customers</a></li>
                    <li><a href=".">Logout</a></li>
                  </ul>
                </nav>
              </aside>
    )
}