/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const panelStyle = css`
  width: 90%;
  margin: 4rem auto;
  padding: 1.5rem;
  background: white;
  box-shadow: 0px 0px 10px -6px #486c1b;

  h6 {
    margin: 0;
    color: #486c1b;
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
    padding-right: 40px;
    position: relative;

    &::before {
      content: '';
      width: 8px;
      height: 100%;
      background-color: #486c1b;
      position: absolute;
      left: 0;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
    }

    img {
      height: 50px;
      width: 50px;
      margin-left: 16px;
      margin-right: 1rem;
      border-radius: 3px;
    }

    h5, p {
      margin: 4px 0;
      color: #486c1b;
    }

    p {
      font-size: 0.8rem;
    }

    .action-wrap {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;

      hr {
        border-top: 1px dotted #486c1b;
        width: 40px;
        margin: 0 8px;
      }

      .btn-action {
        display: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #486c1b;
        text-align: center;
        transition: all 0.3s ease-in-out;

        &.active {
          display: inline-block;
        }
      }

      .btn-invite, .btn-invited {
        color: #fff;
        &:hover, &:focus {
          opacity: 0.9;
        }
      }

      .btn-invite {
        background: #486c1b;
      }

      .btn-invited {
        background: #016699;
      }
    }
  }
`;

const users = [
  {
    name: "Jane Muthoni Musyoka",
    designation: "Farm Manager",
    salary: "KES500,000",
    img: "https://gravatar.com/avatar/3cacb983245e521381e6e128efa8216d?s=50",
  },
  {
    name: "Andrew Bada Komora",
    designation: "Admin/Accounts Assistant",
    salary: "KES310,000",
    img: "https://avatars2.githubusercontent.com/u/5351212?s=460&v=4",
  },
];

export const Block = () => {
  return (
    <>
      {["Administration", "Goat Attendants"].map((title) => (
        <div key={title} css={panelStyle}>
          <h4 style={{ color: "#486c1b" }}>{title}</h4>
          <ul css={userListStyle}>
            {users.map((user, index) => (
              <li key={index}>
                <img src={user.img} alt={user.name} />
                <div>
                  <h5>{user.name}</h5>
                  <p>{user.designation}</p>
                  <p><b><big>{user.salary}</big></b></p>
                </div>
                <div className="action-wrap">
                  <hr />
                 <p><b><big>Joined</big></b>: 2024, 1, 32. </p>
                 <p><b><big>Prev Employment</big></b>: Chef. </p>
                 <p><b><big>Credit</big></b>: employee of the year.</p>
                  <hr />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};