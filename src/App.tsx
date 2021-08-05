import React, { useState, useCallback } from "react";
import { StorageKey, fetchFromStorage, saveToStorage } from "./storage";
import { useTextField } from "./hooks";
import {
  Header,
  CompareUrl,
  InputForm,
  SaveButton,
  Bookmark,
  Layout,
} from "./components";

export const App = () => {
  const useBookmarks = (
    key: StorageKey
  ): [string[], (v: string) => void, (v: string) => void] => {
    const initialState = fetchFromStorage(key).split(",") || [];
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
