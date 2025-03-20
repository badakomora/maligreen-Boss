/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const sidebarStyles = css`
  background: #ffffff;
  color: #486c1b;
  width: 250px;
  padding: 1rem;
  display: block;

  nav {
    margin-top: 50px;
  }

  nav div a {
    text-decoration: none;
    color: #486c1b;
    padding: 0.5rem 1rem;
    display: block;
    border-radius: 5px;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-size: 16px;
  }

  nav div a:hover,
  nav div button.active {
    background: #486c1b;
    color: #ffffff;
  }
`;

const tabs = [
  "Dashboard",
  "Sales",
  "Expenses & Budget",
  "Livestock & Production",
  "Payroll",
  // "Settings",
  // "Logout",
];

type NavbarProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  return (
    <div css={sidebarStyles}>
      <img src="/2.png" alt="logo" style={{ width: "100%" }} />
      <nav>
        <div>
          {tabs.map((tab) => (
          <a
          href="."
          key={tab}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(tab);
          }}
              className={activeTab === tab ? "active" : ""}
            >
              {tab}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};
