import "./styles.css";
import { useState } from "react";

export const App = () => {
  const [org, setOrg] = useState("");
  const [repo, setRepo] = useState("");
  const [startCommit, setStartCommit] = useState("");
  const [endCommit, setEndCommit] = useState("");
  const compareUrl = () => {
    return `https://github.com/${org}/${repo}/compare/${startCommit}...${endCommit}`;
  };

  return (
    <div>
      <label>
        Organization/User:&nbsp;
        <input
          type="text"
          name="org"
          onChange={(e) => setOrg(e.target.value)}
          value={org}
        />
      </label>
      <br />
      <label>
        Repository:&nbsp;
        <input
          type="text"
          name="repo"
          onChange={(e) => setRepo(e.target.value)}
          value={repo}
        />
      </label>
      <br />
      <label>
        StartCommit:&nbsp;
        <input
          type="text"
          name="startCommit"
          onChange={(e) => setStartCommit(e.target.value)}
          value={startCommit}
        />
      </label>
      <br />
      <label>
        EndCommit:&nbsp;
        <input
          type="text"
          name="endCommit"
          onChange={(e) => setEndCommit(e.target.value)}
          value={endCommit}
        />
      </label>
      <br />
      <div>
        <a href={compareUrl()} target="_blank" rel="noopener noreferrer">
          {compareUrl()}
        </a>
      </div>
    </div>
  );
};
