import styles from "./index.module.css";
import githubLogo from "../../img/github.png";
import { GithubCorner } from "../GithubCorner";

export const Header: React.FC = () => {
  return (
    <div>
      <GithubCorner url="https://github.com/daido1976/github-compare-url-creator" />
      <h2 className={styles.title}>
        <img className={styles.githubLogo} src={githubLogo} alt="github-logo" />
        GitHub Compare URL Creator
      </h2>
    </div>
  );
};
