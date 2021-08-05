import "./styles.css";
import octocatLogo from "./img/octocat.png";
import React, { useState, useCallback } from "react";
import { Header } from "./components/Header";

type StorageKey =
  | "org"
  | "repo"
  | "start"
  | "end"
  | "bookmarkOrgs"
  | "bookmarkRepos";

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

  const useBookmarks = (
    key: StorageKey
  ): [string[], (v: string) => void, (v: string) => void] => {
    const initialState = localStorage.getItem(key)?.split(",") || [];
    const [bookmarks, setBookmarks] = useState(initialState);

    const addBookmarks = useCallback(
      (v: string) => {
        if (bookmarks.includes(v)) {
          return;
        }
        const newBookmarks = [v, ...bookmarks];
        setBookmarks(newBookmarks);
        saveToStorage(key, newBookmarks.toString());
      },
      [bookmarks]
    );

    const removeBookmarks = useCallback(
      (v: string) => {
        const newBookmarks = bookmarks.filter((b) => b !== v);
        setBookmarks(newBookmarks);
        saveToStorage(key, newBookmarks.toString());
      },
      [bookmarks]
    );

    return [bookmarks, addBookmarks, removeBookmarks];
  };

  const [bookmarkOrgs, addBookmarkOrgs, removeBookmarkOrgs] =
    useBookmarks("bookmarkOrgs");
  const [bookmarkRepos, addBookmarkRepos] = useBookmarks("bookmarkRepos");

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
      <Header />
      <label>
        <input {...orgTextField} />{" "}
        <button onClick={(_e) => addBookmarkOrgs(orgTextField.value)}>
          💾
        </button>
      </label>
      <br />
      <label>
        <input {...repoTextField} />{" "}
        <button onClick={(_e) => addBookmarkRepos(repoTextField.value)}>
          💾
        </button>
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
            <div key={i}>
              <button onClick={(_e) => setOrg(v)}>{v + " "}</button>
              <button onClick={(_e) => removeBookmarkOrgs(v)}>x</button>
            </div>
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
