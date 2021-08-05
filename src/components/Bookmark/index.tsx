import styles from "./index.module.css";

type Props = {
  bookmarkOrgs: string[];
  bookmarkRepos: string[];
  setOrg: (value: React.SetStateAction<string>) => void;
  setRepo: (value: React.SetStateAction<string>) => void;
  removeBookmarkOrgs: (v: string) => void;
  removeBookmarkRepos: (v: string) => void;
};

export const Bookmark: React.FC<Props> = ({
  bookmarkOrgs,
  bookmarkRepos,
  setOrg,
  setRepo,
  removeBookmarkOrgs,
  removeBookmarkRepos,
}) => {
  return (
    <div>
      <div>
        orgs:{" "}
        {bookmarkOrgs.map((v, i) => {
          if (!v) {
            return;
          }

          return (
            <span key={i}>
              <button onClick={(_e) => setOrg(v)}>{v + " "}</button>
              <button onClick={(_e) => removeBookmarkOrgs(v)}>x</button>
            </span>
          );
        })}
      </div>
      <div>
        repos:{" "}
        {bookmarkRepos.map((v, i) => {
          if (!v) {
            return;
          }

          return (
            <span key={i}>
              <button onClick={(_e) => setRepo(v)}>{v + " "}</button>
              <button onClick={(_e) => removeBookmarkRepos(v)}>x</button>
            </span>
          );
        })}
      </div>
    </div>
  );
};
