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

    img {
      height: 50px;
      width: 50px;
      margin-right: 1rem;
      border-radius: 3px;
    }

    h5,
    p {
      margin: 4px 0;
      color: #486c1b;
    }

    p {
      font-size: 0.8rem;
    }

    .action-wrap {
      position: absolute;
      right: 0;

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

      .btn-invite,
      .btn-invited {
        color: #fff;
        &:hover,
        &:focus {
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

const btnSecondary = css`
  padding: 0.5rem 1rem;
  border: 2px solid #486c1b;
  border-radius: 8px;
  background: #fff;
  color: #486c1b;
  cursor: pointer;
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
          <h4  style={{ color: "#486c1b" }}>{title}</h4>
          <ul css={userListStyle}>
            {users.map((user, index) => (
              <li key={index}>
                <img src={user.img} alt={user.name} />
                <div>
                  <h5>{user.name}</h5>
                  <p>{user.designation}</p>
                  <hr style={{ borderTop: "1px dotted #333" }} />
                  <p><b><big>{user.salary}</big></b></p>
                </div>
                <div className="action-wrap">
                  <button css={btnSecondary}>View Profile {"\u00BB"}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
