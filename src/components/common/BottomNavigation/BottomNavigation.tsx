import { useNavigate } from "react-router-dom";
import styles from "./BottomNavigation.module.css";

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: "/home", icon: "🏠", label: "홈" },
  { path: "/waiting-letters", icon: "💌", label: "편지읽기" },
  { path: "/write-letter", icon: "✍️", label: "편지쓰기" },
  { path: "/mailbox", icon: "📬", label: "편지함" },
  { path: "/my-space", icon: "👤", label: "내공간" },
];

interface BottomNavigationProps {
  currentPath: string;
}

export default function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav} aria-label="하단 내비게이션">
      <div className={styles.inner}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              onClick={() => navigate(item.path)}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
