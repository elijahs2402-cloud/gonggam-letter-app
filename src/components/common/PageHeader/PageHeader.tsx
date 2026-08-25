import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export default function PageHeader({ title, onBack, rightElement }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      {onBack ? (
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="뒤로가기"
        >
          ←
        </button>
      ) : (
        <div className={styles.placeholder} />
      )}

      <h2 className={styles.title}>{title}</h2>

      {rightElement ? (
        <div className={styles.right}>{rightElement}</div>
      ) : (
        <div className={styles.placeholder} />
      )}
    </header>
  );
}
