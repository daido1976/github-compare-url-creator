import React, { useState } from "react";
import { saveToStorage } from "./storage";
import { useTextField, useBookmarks } from "./hooks";
import { truncateCharsFrom } from "./utils";
import {
  Header,
  CompareUrl,
  InputForm,
  SaveButton,
  Bookmark,
  Layout,
} from "./components";

export const App = () => {
  const [orgBookmarkOpen, toggleOrgBookmark] = useState(false);
  const [repoBookmarkOpen, toggleRepoBookmark] = useState(false);
  const [startBookmarkOpen, toggleStartBookmark] = useState(false);
  const [endBookmarkOpen, toggleEndBookmark] = useState(false);

  const {
    bookmarks: bookmarkOrgs,
    addBookmarks: addBookmarkOrgs,
    removeBookmarks: removeBookmarkOrgs,
  } = useBookmarks("bookmarkOrgs");
  const {
    bookmarks: bookmarkRepos,
    addBookmarks: addBookmarkRepos,
    removeBookmarks: removeBookmarkRepos,
  } = useBookmarks("bookmarkRepos");
  const {
    bookmarks: bookmarkStarts,
    addBookmarks: addBookmarkStarts,
    removeBookmarks: removeBookmarkStarts,
  } = useBookmarks("bookmarkStarts");
  const {
    bookmarks: bookmarkEnds,
    addBookmarks: addBookmarkEnds,
    removeBookmarks: removeBookmarkEnds,
  } = useBookmarks("bookmarkEnds");

  const [orgTextField, setOrg] = useTextField({
    placeholder: "org",
    key: "org",
  });
  const [repoTextField, setRepo] = useTextField({
    placeholder: "repo",
    key: "repo",
  });
  const [startTextField, setStart] = useTextField({
    placeholder: "start",
    key: "start",
  });
  const [endTextField, setEnd] = useTextField({
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
    addBookmarkOrgs(orgTextField.value);
    addBookmarkRepos(repoTextField.value);
    addBookmarkStarts(startTextField.value);
    addBookmarkEnds(endTextField.value);
  };

  const orgBookmarkComponent = (
    <Bookmark
      bookmarkValues={bookmarkOrgs}
      setValue={setOrg}
      removeBookmarkValues={removeBookmarkOrgs}
      toggleBookmark={toggleOrgBookmark}
    />
  );
  const repoBookmarkComponent = (
    <Bookmark
      bookmarkValues={bookmarkRepos}
      setValue={setRepo}
      removeBookmarkValues={removeBookmarkRepos}
      toggleBookmark={toggleRepoBookmark}
    />
  );
  const startBookmarkComponent = (
    <Bookmark
      bookmarkValues={bookmarkStarts}
      setValue={setStart}
      removeBookmarkValues={removeBookmarkStarts}
      toggleBookmark={toggleStartBookmark}
    />
  );
  const endBookmarkComponent = (
    <Bookmark
      bookmarkValues={bookmarkEnds}
      setValue={setEnd}
      removeBookmarkValues={removeBookmarkEnds}
      toggleBookmark={toggleEndBookmark}
    />
  );

  return (
    <div>
      <Layout>
        <Header />
        <InputForm
          orgTextField={orgTextField}
          repoTextField={repoTextField}
          startTextField={startTextField}
          endTextField={endTextField}
          orgBookmarkComponent={orgBookmarkComponent}
          orgBookmarkOpen={orgBookmarkOpen}
          toggleOrgBookmark={toggleOrgBookmark}
          repoBookmarkComponent={repoBookmarkComponent}
          repoBookmarkOpen={repoBookmarkOpen}
          toggleRepoBookmark={toggleRepoBookmark}
          startBookmarkComponent={startBookmarkComponent}
          startBookmarkOpen={startBookmarkOpen}
          toggleStartBookmark={toggleStartBookmark}
          endBookmarkComponent={endBookmarkComponent}
          endBookmarkOpen={endBookmarkOpen}
          toggleEndBookmark={toggleEndBookmark}
        />
        <SaveButton onSaveClick={onSaveClick} />
        <CompareUrl compareUrl={compareUrl} />
      </Layout>
    </div>
  );
};
