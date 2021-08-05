import React from "react";
import { saveToStorage } from "./storage";
import { useTextField, useBookmarks } from "./hooks";
import {
  Header,
  CompareUrl,
  InputForm,
  SaveButton,
  Bookmark,
  Layout,
} from "./components";

export const App = () => {
  const [bookmarkOrgs, addBookmarkOrgs, removeBookmarkOrgs] =
    useBookmarks("bookmarkOrgs");
  const [bookmarkRepos, addBookmarkRepos, removeBookmarkRepos] =
    useBookmarks("bookmarkRepos");

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

  const onSaveClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    saveToStorage("org", orgTextField.value);
    saveToStorage("repo", repoTextField.value);
    saveToStorage("start", startTextField.value);
    saveToStorage("end", endTextField.value);
  };

  return (
    <div>
      <Layout>
        <Header />
        <InputForm
          orgTextField={orgTextField}
          repoTextField={repoTextField}
          startTextField={startTextField}
          endTextField={endTextField}
          addBookmarkOrgs={addBookmarkOrgs}
          addBookmarkRepos={addBookmarkRepos}
        />
        <SaveButton onSaveClick={onSaveClick} />
        <CompareUrl compareUrl={compareUrl} />
        <Bookmark
          bookmarkOrgs={bookmarkOrgs}
          bookmarkRepos={bookmarkRepos}
          setOrg={setOrg}
          setRepo={setRepo}
          removeBookmarkOrgs={removeBookmarkOrgs}
          removeBookmarkRepos={removeBookmarkRepos}
        />
      </Layout>
    </div>
  );
};
