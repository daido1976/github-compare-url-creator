import "./styles.css";
import React, { useState } from "react";

export const App = () => {
  const useTextField = () => {
    const [value, setValue] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return {
      type: "text",
      value,
      onChange,
    };
  };

  const org = useTextField();
  const repo = useTextField();
  const startCommit = useTextField();
  const endCommit = useTextField();

  const compareUrl = `https://github.com/${org.value}/${repo.value}/compare/${startCommit.value}...${endCommit.value}`;

  return (
    <div>
      <label>
        Organization/User:&nbsp;
        <input {...org} />
      </label>
      <br />
      <label>
        Repository:&nbsp;
        <input {...repo} />
      </label>
      <br />
      <label>
        StartCommit:&nbsp;
        <input {...startCommit} />
      </label>
      <br />
      <label>
        EndCommit:&nbsp;
        <input {...endCommit} />
      </label>
      <br />
      <div>
        <a href={compareUrl} target="_blank" rel="noopener noreferrer">
          {compareUrl}
        </a>
      </div>
    </div>
  );
};
