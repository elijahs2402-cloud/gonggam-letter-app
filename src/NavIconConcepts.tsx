/**
 * 하단 내비게이션 아이콘 시안 갤러리 (빌드 전 검토용)
 * 세트 A — 세필 선형 / 세트 B — 온기 혼합 / 세트 C — 각인 굵은선
 */

const PLUM = "#4e345e";
const GOLD = "#bc923e";
const MUTED = "#8a7e74";
const FAINT = "#b0a496";
const NAV_BG = "rgba(246,240,229,0.97)";
const serif = '"Noto Serif KR", serif';
const sans = "Pretendard, sans-serif";

/* ══════════════════════════════════════════════════════════════════
   세트 A — 세필 선형
   1px 균일 선폭 · 채우기 없음 · 라운드 선끝 · 단순한 형태
══════════════════════════════════════════════════════════════════ */
const IconSetA = {
  Bell: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 C9 3.5 7 6 7 9.5 L7 15 L17 15 L17 9.5 C17 6 15 3.5 12 3.5Z" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="12" y1="15" x2="12" y2="17.5" />
      <circle cx="12" cy="18.5" r="1" />
      <path d="M10.5 3.5 Q12 2 13.5 3.5" />
    </svg>
  ),
  Home: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,11 12,4 21,11" />
      <rect x="6" y="11" width="12" height="9" />
      <rect x="9.5" y="15" width="5" height="5" />
    </svg>
  ),
  Mailbox: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="0.5" />
      <polyline points="3,7 12,14 21,7" />
    </svg>
  ),
  Space: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4.5 L4 19.5 Q4 20.5 5 20.5 L20 20.5 L20 4.5 Q20 3.5 19 3.5 L5 3.5 Q4 3.5 4 4.5Z" />
      <line x1="12" y1="3.5" x2="12" y2="20.5" />
      <line x1="6" y1="9" x2="10" y2="9" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="14" y1="9" x2="18" y2="9" />
      <line x1="14" y1="12" x2="18" y2="12" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════
   세트 B — 온기 혼합
   1.2px 선폭 · 아이콘 핵심부 부분 채우기 · 활성 시 골드 포인트
══════════════════════════════════════════════════════════════════ */
const IconSetB = {
  Bell: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 C9 4 7 6.5 7 10 L7 15.5 L17 15.5 L17 10 C17 6.5 15 4 12 4Z"
        fill={active ? "rgba(78,52,94,0.1)" : "rgba(138,126,116,0.08)"} />
      <line x1="5" y1="15.5" x2="19" y2="15.5" />
      <line x1="12" y1="15.5" x2="12" y2="17.5" />
      <circle cx="12" cy="18.5" r="1.2" fill={active ? GOLD : "none"} stroke={active ? GOLD : MUTED} />
      <path d="M10.5 4 Q12 2.5 13.5 4" />
    </svg>
  ),
  Home: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3,11.5 12,4.5 21,11.5"
        fill={active ? "rgba(78,52,94,0.15)" : "rgba(138,126,116,0.08)"} />
      <polyline points="3,11.5 12,4.5 21,11.5" />
      <rect x="6.5" y="11.5" width="11" height="8.5" />
      <rect x="9.5" y="15" width="5" height="5"
        fill={active ? "rgba(188,146,62,0.2)" : "none"}
        stroke={active ? GOLD : MUTED} strokeWidth="1" />
    </svg>
  ),
  Mailbox: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="0.5"
        fill={active ? "rgba(78,52,94,0.08)" : "none"} />
      <polygon points="3,7 12,14 21,7"
        fill={active ? "rgba(78,52,94,0.12)" : "rgba(138,126,116,0.05)"}
        stroke={active ? PLUM : MUTED} strokeWidth="1.2" />
      {active && <circle cx="12" cy="14" r="2" fill={GOLD} opacity="0.35" />}
    </svg>
  ),
  Space: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : MUTED} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4 L12 20.5 L19.5 20.5 L19.5 4Z"
        fill={active ? "rgba(78,52,94,0.08)" : "rgba(138,126,116,0.05)"} />
      <path d="M4.5 4 L4.5 20 Q4.5 21 5.5 21 L19.5 21 L19.5 4 Q19.5 3 18.5 3 L5.5 3 Q4.5 3 4.5 4Z" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="6.5" y1="8.5" x2="10" y2="8.5" />
      <line x1="6.5" y1="11.5" x2="10" y2="11.5" />
      <line x1="6.5" y1="14.5" x2="10" y2="14.5" />
      <path d="M16 3 L16 8 L18 6.5 L20 8 L20 3"
        fill={active ? GOLD : "none"} stroke={active ? GOLD : "none"} strokeWidth="1" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════
   세트 C — 각인 굵은선
   1.8px 선폭 · 간결하고 대담한 형태 · 활성 시 진한 자주색 솔리드
══════════════════════════════════════════════════════════════════ */
const IconSetC = {
  Bell: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : FAINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4.5 C9.5 4.5 7.5 6.5 7.5 9.5 L7.5 16 L16.5 16 L16.5 9.5 C16.5 6.5 14.5 4.5 12 4.5Z" />
      <line x1="4.5" y1="16" x2="19.5" y2="16" />
      <line x1="12" y1="16" x2="12" y2="18" />
      <circle cx="12" cy="19" r="1" fill={active ? PLUM : FAINT} />
      <line x1="10.5" y1="4.5" x2="13.5" y2="4.5" />
    </svg>
  ),
  Home: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : FAINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2.5,12 12,4 21.5,12" />
      <polyline points="5,12 5,21 19,21 19,12" />
      <polyline points="9.5,21 9.5,15.5 14.5,15.5 14.5,21" />
    </svg>
  ),
  Mailbox: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : FAINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" />
      <polyline points="3,7 12,14.5 21,7" />
    </svg>
  ),
  Space: ({ active }: { active?: boolean }) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
      stroke={active ? PLUM : FAINT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3.5 L5 20.5 L20 20.5 L20 3.5 L5 3.5Z" />
      <line x1="12" y1="3.5" x2="12" y2="20.5" />
      <line x1="14.5" y1="9" x2="17.5" y2="9" />
      <line x1="14.5" y1="12.5" x2="17.5" y2="12.5" />
      <line x1="14.5" y1="16" x2="17.5" y2="16" />
    </svg>
  ),
};

/* ─── 내비게이션 바 미리보기 ─── */
type IconSet = typeof IconSetA;

function NavPreview({ set, activeItem }: { set: IconSet; activeItem: string }) {
  const items = [
    { id: "bell",    label: "알림",    Icon: set.Bell },
    { id: "home",    label: "홈",      Icon: set.Home },
    { id: "mailbox", label: "편지함",  Icon: set.Mailbox },
    { id: "space",   label: "나의 공간", Icon: set.Space },
  ];

  return (
    <div style={{
      width: "100%",
      background: NAV_BG,
      borderTop: `1px solid rgba(188,146,62,0.35)`,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      padding: "6px 0 10px",
    }}>
      {items.map(({ id, label, Icon }) => {
        const isActive = id === activeItem;
        return (
          <div key={id} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            borderTop: `2px solid ${isActive ? PLUM : "transparent"}`,
            paddingTop: "6px",
          }}>
            <Icon active={isActive} />
            <span style={{
              fontFamily: sans,
              fontSize: "9px",
              fontWeight: isActive ? 700 : 400,
              color: isActive ? PLUM : MUTED,
              letterSpacing: "-0.01em",
            }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── 아이콘 상세 그리드 ─── */
function IconGrid({ set }: { set: IconSet }) {
  const icons = [
    { label: "알림", Icon: set.Bell },
    { label: "홈", Icon: set.Home },
    { label: "편지함", Icon: set.Mailbox },
    { label: "나의공간", Icon: set.Space },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
      {icons.map(({ label, Icon }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "14px 8px 10px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <Icon active={false} />
              <span style={{ fontFamily: sans, fontSize: "7px", color: MUTED }}>off</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <Icon active={true} />
              <span style={{ fontFamily: sans, fontSize: "7px", color: PLUM, fontWeight: 700 }}>on</span>
            </div>
          </div>
          <span style={{ fontFamily: sans, fontSize: "8px", color: MUTED, textAlign: "center" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── 세트 카드 ─── */
function SetCard({ label, desc, set, accent }: {
  label: string;
  desc: string;
  set: IconSet;
  accent: string;
}) {
  return (
    <div style={{
      flex: "1 1 280px",
      maxWidth: "340px",
      background: "#fdfaf4",
      border: "1px solid rgba(188,146,62,0.35)",
      borderRadius: "3px",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "16px 18px 14px",
        borderBottom: "1px solid rgba(188,146,62,0.2)",
        background: "rgba(245,239,227,0.6)",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
          <span style={{
            fontFamily: serif, fontSize: "13px", fontWeight: 700,
            color: accent, letterSpacing: "-0.02em",
          }}>{label}</span>
        </div>
        <p style={{ margin: 0, fontFamily: sans, fontSize: "11px", color: MUTED, lineHeight: 1.6 }}>{desc}</p>
      </div>

      <IconGrid set={set} />

      <div style={{ borderTop: "1px solid rgba(188,146,62,0.2)" }}>
        <div style={{ padding: "6px 12px 4px", fontFamily: sans, fontSize: "8px", color: FAINT, letterSpacing: "0.04em" }}>
          활성 상태 — 홈
        </div>
        <NavPreview set={set} activeItem="home" />
      </div>

      <div style={{ borderTop: "1px solid rgba(188,146,62,0.15)" }}>
        <div style={{ padding: "6px 12px 4px", fontFamily: sans, fontSize: "8px", color: FAINT, letterSpacing: "0.04em" }}>
          활성 상태 — 편지함
        </div>
        <NavPreview set={set} activeItem="mailbox" />
      </div>
    </div>
  );
}

/* ─── 갤러리 페이지 ─── */
export function NavIconConceptsScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ede7da",
      padding: "40px 28px 56px",
      fontFamily: sans,
    }}>
      <div style={{ marginBottom: "36px" }}>
        <p style={{
          margin: "0 0 6px",
          fontFamily: serif, fontSize: "10px", fontWeight: 700,
          color: PLUM, letterSpacing: "0.08em",
        }}>공감편지 · 아이콘 시안</p>
        <h1 style={{
          margin: "0 0 6px",
          fontFamily: serif, fontSize: "22px", fontWeight: 500,
          letterSpacing: "-0.06em", color: "#292522",
        }}>하단 내비게이션 아이콘</h1>
        <p style={{ margin: 0, fontSize: "11px", color: MUTED }}>
          알림 · 홈 · 편지함 · 나의공간 — 3종 방향 검토
        </p>
      </div>

      <div style={{
        display: "flex", gap: "20px",
        justifyContent: "center", flexWrap: "wrap",
      }}>
        <SetCard
          label="세트 A — 세필 선형"
          desc="1px 균일 선폭, 채우기 없음. 편집적이고 가벼운 인상. 활성 시 자주색 획."
          set={IconSetA}
          accent={PLUM}
        />
        <SetCard
          label="세트 B — 온기 혼합"
          desc="선형 기반 + 핵심부 연한 채우기. 활성 시 골드 포인트 요소. 가장 따뜻한 인상."
          set={IconSetB}
          accent={GOLD}
        />
        <SetCard
          label="세트 C — 각인 굵은선"
          desc="1.8px 굵은 획, 단순한 형태. 대담하고 선명한 인상. 확대 시에도 뚜렷."
          set={IconSetC}
          accent="#5a5249"
        />
      </div>

      <div style={{
        display: "flex", gap: "16px",
        justifyContent: "center", flexWrap: "wrap",
        marginTop: "32px",
      }}>
        {[
          { label: "비활성", color: MUTED },
          { label: "활성 (자주)", color: PLUM },
          { label: "포인트 (골드)", color: GOLD },
          { label: "탭 상단선", color: PLUM },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "2px", background: s.color }} />
            <span style={{ fontFamily: sans, fontSize: "10px", color: MUTED }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
