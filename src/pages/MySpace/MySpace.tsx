import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BottomNavigation from "../../components/common/BottomNavigation/BottomNavigation";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import styles from "./MySpace.module.css";

export default function MySpace() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const nickname = user?.anonymousNickname ?? "익명";
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "알 수 없음";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <PageHeader title="내 공간" onBack={() => navigate("/home")} />

      <div className={styles.body}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            <span className={styles.avatarChar}>{nickname[0]}</span>
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.nickname}>{nickname}</h2>
            <p className={styles.joinDate}>{joinDate}부터 편지를 시작했어요</p>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user?.lettersSent ?? 0}</span>
            <span className={styles.statLabel}>보낸 편지</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user?.lettersReceived ?? 0}</span>
            <span className={styles.statLabel}>받은 공감</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{user?.lettersReplied ?? 0}</span>
            <span className={styles.statLabel}>답장한 편지</span>
          </div>
        </div>

        <div className={styles.menuList}>
          <button type="button" className={styles.menuItem} onClick={() => navigate("/write-letter")}>
            <span className={styles.menuItemIcon}>✍️</span>
            <span className={styles.menuItemText}>새 편지 쓰기</span>
            <span className={styles.menuItemArrow}>›</span>
          </button>
          <button type="button" className={styles.menuItem} onClick={() => navigate("/mailbox")}>
            <span className={styles.menuItemIcon}>📬</span>
            <span className={styles.menuItemText}>편지함 보기</span>
            <span className={styles.menuItemArrow}>›</span>
          </button>
          <button type="button" className={styles.menuItem} onClick={() => navigate("/waiting-letters")}>
            <span className={styles.menuItemIcon}>💌</span>
            <span className={styles.menuItemText}>대기 중인 편지</span>
            <span className={styles.menuItemArrow}>›</span>
          </button>
        </div>

        <div className={styles.dangerZone}>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>

      <BottomNavigation currentPath="/my-space" />
    </div>
  );
}
