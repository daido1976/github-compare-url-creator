import "./styles.css";
import githubLogo from "./img/github.png";
import React, { useState } from "react";

export const App = () => {
  const useTextField = (placeholder: string) => {
    const [value, setValue] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return {
      type: "text",
      value,
      placeholder,
      onChange,
    };
  };

  const org = useTextField("org");
  const repo = useTextField("repo");
  const startCommit = useTextField("startCommit");
  const endCommit = useTextField("endCommit");

  const compareUrl = `https://github.com/${org.value}/${
    repo.value
  }/compare/${startCommit.value.substr(0, 10)}...${endCommit.value.substr(
    0,
    10
  )}`;

  return (
    <div className="container">
      <h2>GitHub Compare URL Creator</h2>
      <label>
        <input {...org} />
      </label>
      <br />
      <label>
        <input {...repo} />
      </label>
      <br />
      <label>
        <input {...startCommit} />
      </label>
      <br />
      <label>
        <input {...endCommit} />
      </label>
      <br />
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
