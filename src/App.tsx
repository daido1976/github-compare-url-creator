import "./styles.css";
import githubLogo from "./img/github.png";
import octocatLogo from "./img/octocat.png";
import React, { useState } from "react";

type StorageKey = "org" | "repo" | "start" | "end" | "bookmarkOrgs";

export const App = () => {
  const useTextField = ({
    placeholder,
    key,
  }: {
    placeholder: string;
    key: StorageKey;
  }): [
    {
      type: "text";
      value: string;
      placeholder: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    },
    React.Dispatch<React.SetStateAction<string>>
  ] => {
    const type: "text" = "text";
    const initialValue = localStorage.getItem(key) || "";
    const [value, setValue] = useState(initialValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return [
      {
        type,
        value,
        placeholder,
        onChange,
      },
      setValue,
    ];
  };

  const initialBookmarkOrgs =
    localStorage.getItem("bookmarkOrgs")?.split(",") || [];
  const initialBookmarkRepos =
    localStorage.getItem("bookmarkRepos")?.split(",") || [];
  const [bookmarkOrgs, setBookmarkOrgs] = useState(initialBookmarkOrgs);
  const [bookmarkRepos, setBookmarkRepos] = useState(initialBookmarkRepos);

  const truncateCharsFrom = (text: string) => {
    return text.substr(0, 10);
  };

  const [orgTextField, setOrg] = useTextField({
    placeholder: "org",
    key: "org",
  });
  const [repoTextField, setRepo] = useTextField({
    placeholder: "repo",
    key: "repo",
  });
  const [startTextField] = useTextField({
    placeholder: "start",
    key: "start",
  });
  const [endTextField] = useTextField({
    placeholder: "end",
    key: "end",
  });

  const compareUrl = `https://github.com/${orgTextField.value}/${
    repoTextField.value
  }/compare/${truncateCharsFrom(startTextField.value)}...${truncateCharsFrom(
    endTextField.value
  )}`;

  const saveToStorage = (key: StorageKey, value: string) => {
    localStorage.setItem(key, value);
  };

  const onSaveClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    saveToStorage("org", orgTextField.value);
    saveToStorage("repo", repoTextField.value);
    saveToStorage("start", startTextField.value);
    saveToStorage("end", endTextField.value);
  };

  return (
    <div className="container">
      <h2 className="title">
        <a
          href="https://github.com/daido1976/github-compare-url-creator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="github-logo" src={githubLogo} alt="github-logo" />
        </a>
        GitHub Compare URL Creator
      </h2>
      <label>
        <input {...orgTextField} />{" "}
        <button
          onClick={(_e) => {
            const newBookmarkOrgs = [orgTextField.value, ...bookmarkOrgs];
            setBookmarkOrgs(newBookmarkOrgs);
            saveToStorage("bookmarkOrgs", newBookmarkOrgs.toString());
          }}
        >
          💾
        </button>
      </label>
      <br />
      <label>
        <input {...repoTextField} />
      </label>
      <br />
      <label>
        <input {...startTextField} />
      </label>
      <br />
      <label>
        <input {...endTextField} />
      </label>
      <br />
      <div className="button-wrapper">
        <button className="button-save" onClick={onSaveClick}>
          save
        </button>
      </div>
      <div>
        <img className="octocat-logo" src={octocatLogo} alt="octocat-logo" />
        <a
          className="url"
          href={compareUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {compareUrl}
        </a>
      </div>
      <br />
      <div>
        orgs:{" "}
        {bookmarkOrgs.map((v, i) => {
          return (
            <button key={i} onClick={(_e) => setOrg(v)}>
              {v + " "}
            </button>
          );
        })}
      </div>
      <br />
      <div>
        repos:{" "}
        {bookmarkRepos.map((v, i) => {
          return (
            <button key={i} onClick={(_e) => setRepo(v)}>
              {v + " "}
            </button>
          );
        })}
      </div>
    </div>
  );
};
