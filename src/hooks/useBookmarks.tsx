import { useState, useCallback } from "react";
import { StorageKey, fetchFromStorage, saveToStorage } from "../storage";

export const useBookmarks = (key: StorageKey) => {
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

  return { bookmarks, addBookmarks, removeBookmarks };
};
