import styles from "./LetterCard.module.css";

interface LetterCardProps {
  nickname: string;
  previewTitle: string;
  sentDateLabel: string;
  onClick?: () => void;
}

export default function LetterCard({
  nickname,
  previewTitle,
  sentDateLabel,
  onClick,
}: LetterCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.top}>
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <p className={styles.previewTitle}>{previewTitle}</p>
      <p className={styles.sentDate}>{sentDateLabel}</p>
    </button>
  );
}
