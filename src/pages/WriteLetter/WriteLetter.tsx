import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LetterEmotion } from "../../types/letter";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import styles from "./WriteLetter.module.css";

const EMOTION_OPTIONS: { value: LetterEmotion; label: string; emoji: string }[] = [
  { value: "comfort", label: "위로", emoji: "🤗" },
  { value: "loneliness", label: "외로움", emoji: "🌙" },
  { value: "gratitude", label: "감사", emoji: "🌸" },
  { value: "anxiety", label: "불안", emoji: "🌊" },
  { value: "hope", label: "희망", emoji: "🌱" },
  { value: "sadness", label: "슬픔", emoji: "🍂" },
  { value: "joy", label: "기쁨", emoji: "☀️" },
];

const MAX_LENGTH = 500;

export default function WriteLetter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const replyToId = searchParams.get("replyTo");
  const isReply = Boolean(replyToId);

  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<LetterEmotion | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = content.trim().length >= 10 && !submitted;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate(isReply ? "/waiting-letters" : "/home");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successContent}>
          <p className={styles.successIcon}>✉️</p>
          <h2 className={styles.successTitle}>편지가 전달됐어요</h2>
          <p className={styles.successDesc}>
            {isReply ? "답장이 발송되었어요." : "누군가에게 닿기를 바랍니다."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader
        title={isReply ? "답장 쓰기" : "편지 쓰기"}
        onBack={() => navigate(-1)}
      />

      <div className={styles.body}>
        {!isReply && (
          <div className={styles.emotionSection}>
            <p className={styles.sectionLabel}>오늘의 감정을 골라요 (선택)</p>
            <div className={styles.emotionRow}>
              {EMOTION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.emotionChip} ${selectedEmotion === opt.value ? styles.emotionSelected : ""}`}
                  onClick={() =>
                    setSelectedEmotion(selectedEmotion === opt.value ? null : opt.value)
                  }
                >
                  <span>{opt.emoji}</span>
                  <span className={styles.emotionLabel}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.letterArea}>
          <div className={styles.letterPaper}>
            <p className={styles.fromLine}>
              보내는 이: <span className={styles.nicknameText}>{user?.anonymousNickname ?? "익명"}</span>
            </p>
            <textarea
              className={styles.textarea}
              placeholder={
                isReply
                  ? "따뜻한 한 마디를 건네보세요...\n(최소 10자)"
                  : "마음을 편지에 담아보세요...\n무엇이든 괜찮아요. (최소 10자)"
              }
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
              maxLength={MAX_LENGTH}
              rows={10}
            />
            <div className={styles.charRow}>
              <span className={`${styles.charCount} ${content.length >= MAX_LENGTH ? styles.charLimit : ""}`}>
                {content.length}/{MAX_LENGTH}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.sendButton}
          onClick={handleSubmit}
          disabled={!canSubmit}
          type="button"
        >
          {isReply ? "답장 보내기" : "편지 보내기"}
        </button>
      </div>
    </div>
  );
}
