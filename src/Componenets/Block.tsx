/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const panelStyle = css`
  width: 90%;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px -6px  #486c1b;
  transition: all 0.3s ease;
  font-family:Open Sans;

 

  h4 {
    margin: 0 0 1.5rem 0;
    color: #486c1b;
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: 2px dotted  #486c1b;
    padding-bottom: 0.75rem;
  }
`;

const userListStyle = css`
  padding: 0;
  margin: 0;

  li {
    list-style: none;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 6px;
    transition: all 0.2s ease;

    &::before {
      content: "";
      width: 6px;
      height: 100%;
      background-color: #486c1b;
      position: absolute;
      left: 0;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    img {
      height: 60px;
      width: 60px;
      margin-left: 16px;
      margin-right: 1.5rem;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid rgba(72, 108, 27, 0.2);
    }

    h5 {
      margin: 4px 0;
      color: #365214;
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      margin: 4px 0;
      color: #486c1b;
    }

    p.designation {
      font-size: 0.9rem;
      font-weight: 500;
    }

    b big {
      color: #365214;
      font-size: 1rem;
      font-weight: 700;
    }

    .action-wrap {
      position: absolute;
      right: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      p {
        font-size: 0.8rem;
        color: #666;
      }

      hr {
        border: none;
        border-left: 1px dotted #486c1b;
        height: 30px;
        margin: 0;
      }
    }
  }
`;

 const dropdownStyles = css`
   text-align: left;

   span {
     cursor: pointer;
   }

   div {
     display: none;
     position: absolute;
     background-color: #ffffff;
     box-shadow: 0px 0px 10px -6px #ffffff;
     border-radius: 6px;
     z-index: 10;
   }

   div a {
     padding: 0.3rem;
     display: block;
     border-bottom: 1px dotted #486c1b;
     text-align: left;
     text-decoration: none;
     color: #486c1b;

     &:hover {
       background: #486c1b;
       color: #ffffff;
     }
   }

   &:hover div {
     display: block;
   }
 `;

const users = [
  {
    name: "Jane Muthoni Musyoka",
    designation: "Farm Manager",
    salary: "KES 500,000",
    img: "https://gravatar.com/avatar/3cacb983245e521381e6e128efa8216d?s=50",
    joinDate: "Jan 15, 2024",
  },
  {
    name: "Andrew Bada Komora",
    designation: "Admin/Accounts Assistant",
    salary: "KES 310,000",
    img: "https://avatars2.githubusercontent.com/u/5351212?s=460&v=4",
    joinDate: "Feb 10, 2024",
  },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const Block: React.FC<NavbarProps> = ({ setActiveTab }) => {
  return (
    <>
      {["Administration", "Goat Attendants"].map((title) => (
        <div key={title} css={panelStyle}>
          <h4>{title}</h4>
          <ul css={userListStyle}>
            {users.map((user, index) => (
              <li key={index}>
                <img src={user.img || "/placeholder.svg"} alt={user.name} />
                <div>
                  <h5>{user.name}</h5>
                  <p className="designation">{user.designation}</p>
                  <p>
                    <b>
                      <big>{user.salary}</big>
                    </b>
                  </p>
                </div>
                <div className="action-wrap">
                 <p>Joined on 2024, 1, 32.</p>
                   <hr />
                   <div css={dropdownStyles}>
                     <span style={{ color: "#486c1b" }}>Action &#9660;</span>
                     <div style={{ textAlign: "left" }}>
                       <a
                         href="."
                         onClick={(e) => {
                           e.preventDefault();
                           setActiveTab("Staff Review");
                         }}
                       >
                         Staff Review
                       </a>
                       <a href=".">Approve Employment</a>
                     </div>
                   </div>
                 </div> 
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
