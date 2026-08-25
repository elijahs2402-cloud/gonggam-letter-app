import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ANONYMOUS_NICKNAME_POOL } from "../../data/mockUser";
import styles from "./AnonymousName.module.css";

export default function AnonymousName() {
  const navigate = useNavigate();
  const { setNickname } = useAuth();

  const [selectedNickname, setSelectedNickname] = useState<string>("");
  const [customInput, setCustomInput] = useState<string>("");
  const [useCustom, setUseCustom] = useState(false);

  const displayedPool = ANONYMOUS_NICKNAME_POOL.slice(0, 12);

  const activeNickname = useCustom ? customInput.trim() : selectedNickname;
  const canProceed = activeNickname.length >= 2;

  const handleConfirm = () => {
    if (!canProceed) return;
    setNickname(activeNickname);
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          type="button"
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h2 className={styles.headerTitle}>익명 닉네임</h2>
      </div>

      <div className={styles.body}>
        <div className={styles.guideBox}>
          <p className={styles.guideTitle}>익명 닉네임을 정해요</p>
          <p className={styles.guideDesc}>
            이 이름으로 편지가 발송돼요. 언제든지 바꿀 수 있어요.
          </p>
        </div>

        {!useCustom && (
          <div className={styles.poolSection}>
            <p className={styles.poolLabel}>추천 닉네임에서 고르기</p>
            <div className={styles.chipGrid}>
              {displayedPool.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`${styles.chip} ${selectedNickname === name ? styles.chipSelected : ""}`}
                  onClick={() => setSelectedNickname(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.toggleRow}>
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => {
              setUseCustom((prev) => !prev);
              setSelectedNickname("");
              setCustomInput("");
            }}
          >
            {useCustom ? "추천 닉네임에서 고르기" : "직접 입력하기"}
          </button>
        </div>

        {useCustom && (
          <div className={styles.inputSection}>
            <input
              type="text"
              className={styles.textInput}
              placeholder="닉네임을 입력하세요 (2~10자)"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.slice(0, 10))}
              maxLength={10}
            />
            <span className={styles.charCount}>{customInput.length}/10</span>
          </div>
        )}

        {activeNickname && (
          <div className={styles.previewBox}>
            <p className={styles.previewLabel}>이렇게 보일 거예요</p>
            <p className={styles.previewName}>{activeNickname}</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={!canProceed}
          type="button"
        >
          이 이름으로 시작하기
        </button>
      </div>
    </div>
  );
}
