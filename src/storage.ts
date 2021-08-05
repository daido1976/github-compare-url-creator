export type StorageKey =
  | "org"
  | "repo"
  | "start"
  | "end"
  | "bookmarkOrgs"
  | "bookmarkRepos";

export const saveToStorage = (key: StorageKey, value: string) => {
  localStorage.setItem(key, value);
};

export const fetchFromStorage = (key: StorageKey) => {
  return localStorage.getItem(key) || "";
};
