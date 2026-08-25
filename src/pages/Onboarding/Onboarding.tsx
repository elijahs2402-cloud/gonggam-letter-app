import { useNavigate } from "react-router-dom";
import styles from "./Onboarding.module.css";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logoArea}>
          <div className={styles.emblem}>✉</div>
          <h1 className={styles.title}>공감편지</h1>
          <p className={styles.subtitle}>낯선 사람에게 진심을 전하는 익명 편지</p>
        </div>

        <div className={styles.description}>
          <p className={styles.descText}>
            아무도 모르는 곳에 마음을 털어놓고 싶었던 적 있나요?
          </p>
          <p className={styles.descText}>
            공감편지는 익명으로 편지를 쓰고, 낯선 이의 공감을 받는 공간입니다.
          </p>
        </div>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>✍️</span>
            <span className={styles.featureText}>익명으로 솔직한 편지를 써요</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>💌</span>
            <span className={styles.featureText}>낯선 사람의 편지에 답장을 보내요</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🤝</span>
            <span className={styles.featureText}>공감으로 서로 연결돼요</span>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.startButton}
            onClick={() => navigate("/terms")}
            type="button"
          >
            시작하기
          </button>
          <p className={styles.loginHint}>
            이미 계정이 있으신가요?{" "}
            <button
              className={styles.loginLink}
              onClick={() => navigate("/home")}
              type="button"
            >
              바로 입장
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
