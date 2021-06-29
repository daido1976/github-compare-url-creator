import "./styles.css";
import githubLogo from "./img/github.png";
import React, { useState } from "react";

export const App = () => {
  const useTextField = (props: { placeholder: string }) => {
    const type: "text" = "text";
    const [value, setValue] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return {
      type,
      value,
      placeholder: props.placeholder,
      onChange,
    };
  };
  const truncateCharsFrom = (text: string) => {
    return text.substr(0, 10);
  };

  const orgTextField = useTextField({ placeholder: "org" });
  const repoTextField = useTextField({ placeholder: "repo" });
  const startTextField = useTextField({ placeholder: "start" });
  const endTextField = useTextField({ placeholder: "end" });

  const compareUrl = `https://github.com/${orgTextField.value}/${
    repoTextField.value
  }/compare/${truncateCharsFrom(startTextField.value)}...${truncateCharsFrom(
    endTextField.value
  )}`;

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
