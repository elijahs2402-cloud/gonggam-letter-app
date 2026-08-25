import { useNavigate } from "react-router-dom";
import { mockMailboxLetters } from "../../data/mockLetters";
import BottomNavigation from "../../components/common/BottomNavigation/BottomNavigation";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import styles from "./Mailbox.module.css";

const STATUS_LABEL: Record<string, string> = {
  waiting: "대기중",
  read: "읽음",
  replied: "답장함",
  sent: "발송",
};

export default function Mailbox() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <PageHeader title="편지함" onBack={() => navigate("/home")} />

      <div className={styles.body}>
        <div className={styles.tabs}>
          <button type="button" className={`${styles.tab} ${styles.tabActive}`}>
            받은 편지
          </button>
          <button type="button" className={styles.tab}>
            보낸 편지
          </button>
        </div>

        {mockMailboxLetters.length > 0 ? (
          <div className={styles.letterList}>
            {mockMailboxLetters.map((letter) => {
              const date = new Date(letter.sentAt);
              const dateStr = `${date.getMonth() + 1}월 ${date.getDate()}일`;

              return (
                <div key={letter.id} className={styles.letterItem}>
                  <div className={styles.letterMeta}>
                    <span className={styles.senderName}>{letter.senderNickname}</span>
                    <span
                      className={`${styles.statusBadge} ${styles[`status_${letter.status}`]}`}
                    >
                      {STATUS_LABEL[letter.status]}
                    </span>
                  </div>
                  <p className={styles.letterPreview}>
                    {letter.content.length > 60
                      ? letter.content.slice(0, 60) + "..."
                      : letter.content}
                  </p>
                  <p className={styles.letterDate}>{dateStr}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>📪</p>
            <p className={styles.emptyText}>받은 편지가 없어요</p>
            <p className={styles.emptySubtext}>편지에 답장하면 여기에 쌓여요</p>
          </div>
        )}
      </div>

      <BottomNavigation currentPath="/mailbox" />
    </div>
  );
}
