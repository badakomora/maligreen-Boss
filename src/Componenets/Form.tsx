/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// Theme Colors
const colors = {
  primary: "#486c1b",
  white: "#ffffff",
  background: "#ffffff",
  border: "#486c1b",
};

// Styles
const styles = {
  page: css`
    background-color: ${colors.background};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    padding: 20px;
  `,
  container: css`
    height: 100%;
    padding: 40px;
    border-radius: 12px;
    background-color: ${colors.white};
    border: 2px solid ${colors.border};
    margin: auto;
  `,
  heading: css`
    color: ${colors.primary};
    font-size: 26px;
    margin-bottom: 20px;
  `,
  label: css`
    font-size: 14px;
    color: ${colors.primary};
    margin-bottom: 8px;
    display: block;
  `,
  inputcontainer: css`
    width: 100%;
  `,
  input: css`
    font-size: 16px;
    color: ${colors.primary};
    background-color: ${colors.white};
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid ${colors.border};
    border-radius: 8px;
    box-sizing: border-box;
    &::placeholder {
      color: ${colors.border};
    }
    &:focus {
      border-color: ${colors.primary};
      outline: none;
    }
  `,
  button: css`
    font-size: 18px;
    color: ${colors.white};
    background-color: ${colors.primary};
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;
    &:hover {
      background-color: ${colors.white};
      color: ${colors.primary};
      border: 2px solid ${colors.primary};
    }
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `,
  row: css`
    display: flex;
    gap: 10px;
    & > input,
    & > select {
      flex: 1;
    }
  `,
};

const buttonStyles = css`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 5px;
`;

const btnPrimary = css`
  ${buttonStyles}
  background: #486c1b;
  border: none;
  color: #ffffff;

  &:hover {
    background: #365214;
    color: #ffffff;
  }
`;

const btnSecondary = css`
  ${buttonStyles}
  background: #ffffff;
  border: 1px solid #486c1b;
  color: #486c1b;

  &:hover {
    background: #486c1b;
    color: #ffffff;
  }
`;

interface NavbarProps {
  activeTab: string;
}

// eslint-disable-next-line no-empty-pattern
export const Form: React.FC<NavbarProps> = ({}) => {
  return (
    <div css={styles.page}>
      <div css={styles.container}>
        <form>
          <h1 css={styles.heading}>Briefing Details</h1>
          <hr style={{ border: `1px dotted ${colors.primary}` }} />
          <label css={styles.label}>Purpose</label>
          <input css={styles.input} type="text" placeholder="Reason" />

          <div css={styles.row}>
            <div css={styles.inputcontainer}>
              <label css={styles.label}>Date</label>
              <input css={styles.input} type="date" placeholder="date" />
            </div>
            <div css={styles.inputcontainer}>
              <label css={styles.label}>Venue</label>
              <input css={styles.input} type="text" placeholder="Address" />
            </div>
          </div>

          <label css={styles.label}>Note</label>
          <input css={styles.input} type="text" placeholder="note" />

          <button css={btnPrimary}>
            <b>Schedule</b>
          </button>
          <button css={btnSecondary}>
            <b>Schedule & New</b>
          </button>
        </form>
      </div>
    </div>
  );
};
