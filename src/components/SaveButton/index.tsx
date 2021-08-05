import styles from "./index.module.css";

type Props = {
  onSaveClick: (_e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SaveButton: React.FC<Props> = ({ onSaveClick }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.saveButton} onClick={onSaveClick}>
        save
      </button>
    </div>
  );
};
