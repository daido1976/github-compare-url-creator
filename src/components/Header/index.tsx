import styles from "./index.module.css";
import githubLogo from "../../img/github.png";

export const Header: React.FC = () => {
  return (
    <div>
      <h2 className={styles.title}>
        <a
          href="https://github.com/daido1976/github-compare-url-creator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.githubLogo}
            src={githubLogo}
            alt="github-logo"
          />
        </a>
        GitHub Compare URL Creator
      </h2>
    </div>
  );
};
