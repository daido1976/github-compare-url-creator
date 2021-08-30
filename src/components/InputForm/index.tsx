import styles from "./index.module.css";
import { TextField } from "../../hooks/useTextField";

type Props = {
  orgTextField: TextField;
  repoTextField: TextField;
  startTextField: TextField;
  endTextField: TextField;
  orgBookmarkComponent: JSX.Element;
  orgBookmarkOpen: boolean;
  toggleOrgBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  repoBookmarkComponent: JSX.Element;
  repoBookmarkOpen: boolean;
  toggleRepoBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  startBookmarkComponent: JSX.Element;
  startBookmarkOpen: boolean;
  toggleStartBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  endBookmarkComponent: JSX.Element;
  endBookmarkOpen: boolean;
  toggleEndBookmark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputForm: React.FC<Props> = ({
  orgTextField,
  repoTextField,
  startTextField,
  endTextField,
  orgBookmarkComponent,
  orgBookmarkOpen,
  toggleOrgBookmark,
  repoBookmarkComponent,
  repoBookmarkOpen,
  toggleRepoBookmark,
  startBookmarkComponent,
  startBookmarkOpen,
  toggleStartBookmark,
  endBookmarkComponent,
  endBookmarkOpen,
  toggleEndBookmark,
}) => {
  return (
    <div>
      <div className={styles.inputFormWrapper}>
        <label>
          <input
            className={styles.inputForm}
            {...orgTextField}
            onClick={(_e) => {
              if (!orgBookmarkOpen) {
                toggleRepoBookmark(false);
                toggleStartBookmark(false);
                toggleEndBookmark(false);
              }
              toggleOrgBookmark(!orgBookmarkOpen);
            }}
          />{" "}
        </label>
        {orgBookmarkOpen ? orgBookmarkComponent : null}
      </div>
      <div className={styles.inputFormWrapper}>
        <label>
          <input
            className={styles.inputForm}
            {...repoTextField}
            onClick={(_e) => {
              if (!repoBookmarkOpen) {
                toggleOrgBookmark(false);
                toggleStartBookmark(false);
                toggleEndBookmark(false);
              }
              toggleRepoBookmark(!repoBookmarkOpen);
            }}
          />{" "}
        </label>
        {repoBookmarkOpen ? repoBookmarkComponent : null}
      </div>
      <div className={styles.inputFormWrapper}>
        <label>
          <input
            className={styles.inputForm}
            {...startTextField}
            onClick={(_e) => {
              if (!startBookmarkOpen) {
                toggleOrgBookmark(false);
                toggleRepoBookmark(false);
                toggleEndBookmark(false);
              }
              toggleStartBookmark(!startBookmarkOpen);
            }}
          />{" "}
        </label>
        {startBookmarkOpen ? startBookmarkComponent : null}
      </div>
      <div className={styles.inputFormWrapper}>
        <label>
          <input
            className={styles.inputForm}
            {...endTextField}
            onClick={(_e) => {
              if (!endBookmarkOpen) {
                toggleOrgBookmark(false);
                toggleRepoBookmark(false);
                toggleStartBookmark(false);
              }
              toggleEndBookmark(!endBookmarkOpen);
            }}
          />{" "}
        </label>
        {endBookmarkOpen ? endBookmarkComponent : null}
      </div>
    </div>
  );
};
