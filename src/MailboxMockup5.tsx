import { AppBottomNavigation } from "./AppBottomNavigation";

type LetterType = "sent" | "replied";
type StatusKind =
  | "reply_arrived_unread"
  | "reply_opened"
  | "assigned"
  | "reply_writing"
  | "waiting"
  | "delayed"
  | "replied";

type MockLetter = {
  id: string;
  date: string;
  dateSort: string;
  type: LetterType;
  sender: string;
  title: string;
  statusKind: StatusKind;
};

const STATUS_CONFIG: Record<StatusKind, { label: string; color: string }> = {
  reply_arrived_unread: { label: "답장이 도착했어요",      color: "#4e345e" },
  reply_opened:         { label: "답장을 받았어요",        color: "#52665a" },
  assigned:             { label: "한 사람이 맡았어요",     color: "#9c7c3d" },
  reply_writing:        { label: "답장을 준비하고 있어요", color: "#9c7c3d" },
  waiting:              { label: "답장을 기다리고 있어요", color: "#9a8e81" },
  delayed:              { label: "확인이 필요해요",        color: "#a8563d" },
  replied:              { label: "답장을 전했어요",        color: "#52665a" },
};

const ALL_LETTERS = ([
  { id: "1",  date: "8월 14일", dateSort: "2026-08-14", type: "sent",    sender: "봄빛 한 줌",        title: "늘 혼자인 것 같은 느낌에 대해",   statusKind: "reply_arrived_unread" },
  { id: "r1", date: "8월 13일", dateSort: "2026-08-13", type: "replied", sender: "여름 한 조각에게",   title: "괜찮다고 말하기 어려울 때",         statusKind: "replied" },
  { id: "2",  date: "8월 11일", dateSort: "2026-08-11", type: "sent",    sender: "조용한 오후",        title: "이유도 모르고 울었던 날",           statusKind: "reply_opened" },
  { id: "r2", date: "8월 10일", dateSort: "2026-08-10", type: "replied", sender: "새벽별 하나에게",    title: "아무것도 하기 싫은 마음에 대해",   statusKind: "replied" },
  { id: "3",  date: "8월 9일",  dateSort: "2026-08-09", type: "sent",    sender: "들판 한 가운데",     title: "퇴직 후 텅 빈 하루들",             statusKind: "assigned" },
  { id: "4",  date: "8월 7일",  dateSort: "2026-08-07", type: "sent",    sender: "잔잔한 물결",        title: "친구에게 상처를 줬어요",           statusKind: "reply_writing" },
  { id: "r3", date: "8월 5일",  dateSort: "2026-08-05", type: "replied", sender: "안개 속 목소리에게", title: "울어도 괜찮다고 말하고 싶었어요", statusKind: "replied" },
  { id: "5",  date: "8월 3일",  dateSort: "2026-08-03", type: "sent",    sender: "새벽 안개",          title: "매일 아침이 무거워요",             statusKind: "delayed" },
  { id: "r4", date: "7월 31일", dateSort: "2026-07-31", type: "replied", sender: "흰 구름 아래에게",   title: "새로운 리듬을 찾아가는 중",        statusKind: "replied" },
  { id: "6",  date: "7월 28일", dateSort: "2026-07-28", type: "sent",    sender: "흐린 하늘 아래",     title: "엄마 곁에서 지치는 마음",          statusKind: "waiting" },
] as MockLetter[]).sort((a, b) => b.dateSort.localeCompare(a.dateSort));

function LetterCard({ letter }: { letter: MockLetter }) {
  const cfg = STATUS_CONFIG[letter.statusKind];
  const isUnread = letter.statusKind === "reply_arrived_unread";
  const isSent = letter.type === "sent";

  return (
    <button
      type="button"
      style={{
        display: "block",
        width: "100%",
        padding: "0",
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          padding: "16px 18px",
          border: `1px solid ${isUnread ? "rgba(78,52,94,0.28)" : "rgba(188,146,62,0.28)"}`,
          borderRadius: "2px",
          background: isUnread
            ? "linear-gradient(135deg, rgba(237,228,248,0.32) 0%, #f8f2e7 70%)"
            : "#f8f2e7",
          boxShadow: isUnread
            ? "0 2px 10px rgba(78,52,94,0.10)"
            : "0 1px 3px rgba(41,37,34,0.05)",
        }}
      >
        {/* 날짜 + 유형 태그 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <time style={{ fontFamily: "Pretendard, sans-serif", fontSize: "11px", color: "#9a8e81" }}>
            {letter.date}
          </time>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "2px",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              background: isSent ? "rgba(78,52,94,0.09)" : "rgba(82,102,90,0.09)",
              color: isSent ? "#4e345e" : "#52665a",
            }}
          >
            {isSent ? "내가 보낸 편지" : "내가 답한 편지"}
          </span>
        </div>

        {/* 닉네임 */}
        <div
          style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: "20px",
            fontWeight: isUnread ? 500 : 400,
            color: "#292522",
            letterSpacing: "-0.04em",
            lineHeight: 1.25,
            marginBottom: "10px",
          }}
        >
          {letter.sender}
        </div>

        {/* 구분선 */}
        <div style={{ height: "1px", background: "rgba(188,146,62,0.22)", marginBottom: "10px" }} />

        {/* 제목 */}
        <div
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: "13px",
            color: "#766c61",
            lineHeight: 1.5,
            marginBottom: "12px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {letter.title}
        </div>

        {/* 상태 */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: cfg.color,
              flexShrink: 0,
              opacity: isUnread ? 1 : 0.75,
            }}
          />
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "11px",
              fontWeight: isUnread ? 700 : 500,
              color: cfg.color,
            }}
          >
            {cfg.label}
          </span>
        </div>
      </div>
    </button>
  );
}

export function MailboxMockup5Screen() {
  return (
    <main className="mobile-prototype mailbox-screen">
      <div className="mailbox-scroll-region">
        <header className="mailbox-heading" aria-labelledby="mailbox-mock5-title">
          <p>공감편지</p>
          <h1 id="mailbox-mock5-title">편지함</h1>
          <span>주고받은 마음을 한 통의 편지로 다시 꺼내볼 수 있어요.</span>
        </header>

        <section
          aria-label="편지 기록"
          style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {ALL_LETTERS.map((letter) => (
            <LetterCard key={letter.id} letter={letter} />
          ))}
        </section>
      </div>

      <AppBottomNavigation active="mailbox" />
    </main>
  );
}
