import styles from "./index.module.css";

type Props = {
  bookmarkValues: string[];
  setValue: (value: React.SetStateAction<string>) => void;
  removeBookmarkValues: (v: string) => void;
  toggleBookmark: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Bookmark: React.FC<Props> = ({
  bookmarkValues,
  setValue,
  removeBookmarkValues,
  toggleBookmark,
}) => {
  return (
    <div>
      {bookmarkValues.length > 1 ? (
        // FIXME: ↑ は空文字が配列に入っているためにこうしているので、配列に空文字が入らないようにして bookmarkValues.length ? ... 的な感じにする
        <ul className={styles.autoCompleteList}>
          {bookmarkValues.map((v, i) => {
            if (!v) {
              return;
            }

            return (
              <li key={i} className={styles.autoCompleteListItem}>
                <div
                  className={styles.autoCompleteWord}
                  onClick={(_e) => {
                    setValue(v);
                    toggleBookmark(false);
                  }}
                >
                  {v}
                </div>
                <button
                  className={styles.autoCompleteItemDeleteButton}
                  onClick={(_e) => removeBookmarkValues(v)}
                >
                  ✖️
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
