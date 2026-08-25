import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/common/BottomNavigation/BottomNavigation";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const nickname = user?.anonymousNickname ?? "낯선 이";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.appName}>공감편지</h1>
        <button
          className={styles.profileButton}
          onClick={() => navigate("/my-space")}
          type="button"
          aria-label="내 공간"
        >
          👤
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.greetingBox}>
          <p className={styles.greetingLabel}>오늘의 인사</p>
          <p className={styles.greetingText}>
            안녕하세요, <span className={styles.nicknameHighlight}>{nickname}</span>님.
          </p>
          <p className={styles.greetingSubtext}>
            오늘 누군가의 편지가 당신을 기다리고 있어요.
          </p>
        </div>

        <div className={styles.menuGrid}>
          <button
            type="button"
            className={styles.menuCard}
            onClick={() => navigate("/waiting-letters")}
          >
            <span className={styles.menuIcon}>💌</span>
            <span className={styles.menuTitle}>편지 읽기</span>
            <span className={styles.menuDesc}>낯선 이의 편지에 공감을</span>
          </button>

          <button
            type="button"
            className={styles.menuCard}
            onClick={() => navigate("/write-letter")}
          >
            <span className={styles.menuIcon}>✍️</span>
            <span className={styles.menuTitle}>편지 쓰기</span>
            <span className={styles.menuDesc}>마음을 편지에 담아요</span>
          </button>

          <button
            type="button"
            className={styles.menuCard}
            onClick={() => navigate("/mailbox")}
          >
            <span className={styles.menuIcon}>📬</span>
            <span className={styles.menuTitle}>편지함</span>
            <span className={styles.menuDesc}>받은 공감과 답장 보기</span>
          </button>

          <button
            type="button"
            className={styles.menuCard}
            onClick={() => navigate("/my-space")}
          >
            <span className={styles.menuIcon}>🌿</span>
            <span className={styles.menuTitle}>내 공간</span>
            <span className={styles.menuDesc}>나의 편지 이야기</span>
          </button>
        </div>

        <div className={styles.quoteBox}>
          <p className={styles.quoteText}>
            "공감은 상대방의 감정 속으로 들어가는 것이다."
          </p>
          <p className={styles.quoteAuthor}>— 브레네 브라운</p>
        </div>
      </div>

      <BottomNavigation currentPath="/home" />
    </div>
  );
}
