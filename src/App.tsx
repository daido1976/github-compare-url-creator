import "./styles.css";
import githubLogo from "./img/github.png";
import React, { useState } from "react";

type StorageKey = "org" | "repo" | "start" | "end";

export const App = () => {
  const useTextField = ({
    placeholder,
    key,
  }: {
    placeholder: string;
    key: StorageKey;
  }) => {
    const type: "text" = "text";
    const initialValue = localStorage.getItem(key) || "";
    const [value, setValue] = useState(initialValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return {
      type,
      value,
      placeholder,
      onChange,
    };
  };

  const truncateCharsFrom = (text: string) => {
    return text.substr(0, 10);
  };

  const orgTextField = useTextField({ placeholder: "org", key: "org" });
  const repoTextField = useTextField({ placeholder: "repo", key: "repo" });
  const startTextField = useTextField({ placeholder: "start", key: "start" });
  const endTextField = useTextField({ placeholder: "end", key: "end" });

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
      <h2>GitHub Compare URL Creator</h2>
      <label>
        <input {...orgTextField} />
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
        <button onClick={onSaveClick}>save</button>
      </div>
      <div>
        <img className="github-logo" src={githubLogo} alt="github-logo" />
        <a
          className="url"
          href={compareUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {compareUrl}
        </a>
      </div>
    </div>
  );
};
