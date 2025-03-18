/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  container: css`
    max-width: 400px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #486c1b;
  `,
  sectionHeader: css`
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 10px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid #333;
    color: #486c1b;
  `,
  modelList: css`
    display: flex;
    flex-direction: column;
    margin:5px;
  `,
  modelItem: css`
    display: flex;
    padding: 5px;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
    color: #486c1b;
    &:hover {
      background: #486c1b;
      color:#ffffff;
    }
  `,
  modelInfo: css`
    display: flex;
    width: 100%;
  `,
  modelName: css`
    font-size: 14px;
  `,
  modelCredit: css`
    font-size: 14px;
    margin-left: 8px;
    font-weight:bold;
  `,

};

const models = {
  standard: [
    { name: "Total Goat Count", credit: "400" },
    { name: "Kids Count", credit: "300" },
    { name: "Pregnant Goats", credit: "400" },
    { name: "Lactating Goats", credit: "500" },
    { name: "Total Deceased Goats", credit: "60"},
    { name: "Sick Goats", credit: "4" },
    { name: "Breeds", credit: "55" }
  ],
  thinking: [
    { name: "Today's production(Litres)", credit: "5000" },
    { name: "Feeding Program", credit: "View" },
    { name: "Vaccination Log", credit: "View"},
  ]
};

export const List = () => {
  return (
    <div css={styles.container}>
      <h2 >Livestock Log</h2>
      <div css={styles.sectionHeader}>Herd Metrics</div>
      <div css={styles.modelList}>
        {models.standard.map((model, index) => (
          <div key={index} css={styles.modelItem}>
            <div css={styles.modelInfo}>
              <div css={styles.modelName}>{"\u00BB"}{model.name}</div>
              <div css={styles.modelCredit}>{model.credit}</div>
            </div>
          </div>
        ))}
      </div>

      <div css={styles.sectionHeader}>Farm Operations</div>
      <div css={styles.modelList}>
        {models.thinking.map((model, index) => (
          <div key={index} css={styles.modelItem}>
            <div css={styles.modelInfo}>
              <div css={styles.modelName}>{"\u00BB"}{model.name}</div>
              <div css={styles.modelCredit}>{model.credit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
