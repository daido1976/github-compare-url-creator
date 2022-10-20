import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
