import styles from "./index.module.css";
import octocatLogo from "../../img/octocat.png";

type Props = {
  compareUrl: string;
};

export const CompareUrl: React.FC<Props> = ({ compareUrl }) => {
  return (
    <div>
      <img
        className={styles.octocatLogo}
        src={octocatLogo}
        alt="octocat-logo"
      />
      <a
        className={styles.compareUrl}
        href={compareUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {compareUrl}
      </a>
    </div>
  );
};
