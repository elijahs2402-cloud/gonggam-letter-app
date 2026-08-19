import { useState } from "react";
import { AppBottomNavigation } from "./AppBottomNavigation";

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
  statusKind: StatusKind;
  sender: string;
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

const SENT: MockLetter[] = [
  { id: "1", date: "8월 14일", statusKind: "reply_arrived_unread", sender: "봄빛 한 줌" },
  { id: "3", date: "8월 9일",  statusKind: "assigned",             sender: "들판 한 가운데" },
  { id: "4", date: "8월 7일",  statusKind: "reply_writing",        sender: "잔잔한 물결" },
  { id: "5", date: "8월 3일",  statusKind: "delayed",              sender: "새벽 안개" },
  { id: "2", date: "8월 11일", statusKind: "reply_opened",         sender: "조용한 오후" },
  { id: "6", date: "7월 28일", statusKind: "waiting",              sender: "흐린 하늘 아래" },
];

const REPLIED: MockLetter[] = [
  { id: "r1", date: "8월 13일", statusKind: "replied", sender: "봄빛 한 줌에게" },
  { id: "r2", date: "8월 10일", statusKind: "replied", sender: "조용한 오후에게" },
  { id: "r3", date: "8월 5일",  statusKind: "replied", sender: "새벽 안개에게" },
  { id: "r4", date: "7월 31일", statusKind: "replied", sender: "들판 한 가운데에게" },
];

function LetterRow({ letter }: { letter: MockLetter }) {
  const cfg = STATUS_CONFIG[letter.statusKind];
  const isUnread = letter.statusKind === "reply_arrived_unread";

  return (
    <button
      type="button"
      style={{
        display: "block",
        width: "100%",
        padding: "16px 24px 17px",
        border: "none",
        borderBottom: "1px solid rgba(41,37,34,0.10)",
        background: isUnread
          ? "linear-gradient(90deg, rgba(226,216,237,0.38) 0%, transparent 85%)"
          : "transparent",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      {/* 날짜 + 상태 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          {isUnread && (
            <span style={{
              display: "inline-block",
              width: "6px", height: "6px",
              borderRadius: "50%",
              background: "#4e345e",
              boxShadow: "0 0 0 2px rgba(78,52,94,0.18)",
              flexShrink: 0,
            }} />
          )}
          <time style={{ fontFamily: "Pretendard, sans-serif", fontSize: "11px", color: "#9a8e81" }}>
            {letter.date}
          </time>
        </div>
        <span style={{
          fontFamily: "Pretendard, sans-serif",
          fontSize: "11px",
          fontWeight: isUnread ? 700 : 500,
          color: cfg.color,
          whiteSpace: "nowrap",
        }}>
          {cfg.label}
        </span>
      </div>

      {/* 닉네임 + 화살표 */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: "22px",
          fontWeight: isUnread ? 500 : 400,
          color: isUnread ? "#292522" : "#5a5249",
          letterSpacing: "-0.04em",
          lineHeight: 1.2,
        }}>
          {letter.sender}
        </span>
        <span style={{ fontFamily: "system-ui, sans-serif", fontSize: "18px", color: "#c0b5ab", lineHeight: 1 }}>
          ›
        </span>
      </div>
    </button>
  );
}

export function MailboxMockup4Screen() {
  const [tab, setTab] = useState<"mine" | "replied">("mine");
  const letters = tab === "mine" ? SENT : REPLIED;

  return (
    <main className="mobile-prototype mailbox-screen">
      <div className="mailbox-scroll-region">
        <header className="mailbox-heading" aria-labelledby="mailbox-mock4-title">
          <p>공감편지</p>
          <h1 id="mailbox-mock4-title">편지함</h1>
          <span>주고받은 마음을 한 통의 편지로 다시 꺼내볼 수 있어요.</span>
        </header>

        {/* 탭 */}
        <div className="mailbox-tabs" role="tablist" aria-label="편지함 분류">
          <button type="button" role="tab" aria-selected={tab === "mine"}
            className={tab === "mine" ? "is-active" : ""}
            onClick={() => setTab("mine")}>
            내가 보낸 편지
          </button>
          <button type="button" role="tab" aria-selected={tab === "replied"}
            className={tab === "replied" ? "is-active" : ""}
            onClick={() => setTab("replied")}>
            내가 답한 편지
          </button>
        </div>

        {/* 리스트 */}
        <section
          aria-label={tab === "mine" ? "내가 보낸 편지" : "내가 답한 편지"}
          style={{ borderTop: "1px solid rgba(41,37,34,0.10)", marginTop: "20px" }}
        >
          {letters.map((letter) => (
            <LetterRow key={letter.id} letter={letter} />
          ))}
        </section>
      </div>

      <AppBottomNavigation active="mailbox" />
    </main>
  );
}
