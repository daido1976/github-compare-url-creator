import styles from "./index.module.css";
import { TextField } from "../../App";

type Props = {
  orgTextField: TextField;
  repoTextField: TextField;
  startTextField: TextField;
  endTextField: TextField;
  addBookmarkOrgs: (v: string) => void;
  addBookmarkRepos: (v: string) => void;
};

export const InputForm: React.FC<Props> = ({
  orgTextField,
  repoTextField,
  startTextField,
  endTextField,
  addBookmarkOrgs,
  addBookmarkRepos,
}) => {
  return (
    <div>
      <label>
        <input className={styles.inputForm} {...orgTextField} />{" "}
        <button onClick={(_e) => addBookmarkOrgs(orgTextField.value)}>
          💾
        </button>
      </label>
      <br />
      <label>
        <input className={styles.inputForm} {...repoTextField} />{" "}
        <button onClick={(_e) => addBookmarkRepos(repoTextField.value)}>
          💾
        </button>
      </label>
      <br />
      <label>
        <input className={styles.inputForm} {...startTextField} />
      </label>
      <br />
      <label>
        <input className={styles.inputForm} {...endTextField} />
      </label>
      <br />
    </div>
  );
};
