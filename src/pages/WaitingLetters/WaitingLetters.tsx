import { useNavigate } from "react-router-dom";
import { mockWaitingLetters } from "../../data/mockLetters";
import LetterCard from "../../components/letter/LetterCard/LetterCard";
import BottomNavigation from "../../components/common/BottomNavigation/BottomNavigation";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import styles from "./WaitingLetters.module.css";

function formatSentDate(isoString: string): string {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일에 보냈어요`;
}

function getPreviewTitle(content: string): string {
  return content.length > 20 ? content.slice(0, 20) + "..." : content;
}

export default function WaitingLetters() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <PageHeader title="편지 읽기" onBack={() => navigate("/home")} />

      <div className={styles.body}>
        <p className={styles.description}>
          당신의 공감을 기다리는 편지들이에요.
          <br />
          마음이 닿는 편지에 답장을 보내보세요.
        </p>

        <div className={styles.letterList}>
          {mockWaitingLetters.map((letter, index) => (
            <div key={letter.id}>
              <LetterCard
                nickname={letter.senderNickname}
                previewTitle={getPreviewTitle(letter.content)}
                sentDateLabel={formatSentDate(letter.sentAt)}
                onClick={() => navigate(`/write-letter?replyTo=${letter.id}`)}
              />
              {index < mockWaitingLetters.length - 1 && (
                <div className={styles.divider} />
              )}
            </div>
          ))}
        </div>

        {mockWaitingLetters.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>📭</p>
            <p className={styles.emptyText}>지금은 대기 중인 편지가 없어요</p>
            <p className={styles.emptySubtext}>나중에 다시 확인해보세요</p>
          </div>
        )}
      </div>

      <BottomNavigation currentPath="/waiting-letters" />
    </div>
  );
}
