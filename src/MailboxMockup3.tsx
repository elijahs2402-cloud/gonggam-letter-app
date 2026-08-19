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
  month: string;
  day: string;
  statusKind: StatusKind;
  preview: string;
  sender: string;
  requiresAttention?: boolean;
};

const STATUS_CONFIG: Record<StatusKind, { label: string; dotColor: string; textColor: string }> = {
  reply_arrived_unread: { label: "답장이 도착했어요",        dotColor: "var(--deep-plum)", textColor: "var(--deep-plum)" },
  reply_opened:         { label: "답장을 받았어요",          dotColor: "var(--sage-deep)",  textColor: "var(--sage-deep)" },
  assigned:             { label: "한 사람이 읽고 있어요",    dotColor: "var(--gold-deep)",  textColor: "var(--gold-deep)" },
  reply_writing:        { label: "답장을 준비하고 있어요",   dotColor: "var(--gold-deep)",  textColor: "var(--gold-deep)" },
  waiting:              { label: "읽어줄 사람을 기다려요",   dotColor: "var(--faint-ink-2)", textColor: "var(--faint-ink)" },
  delayed:              { label: "확인이 필요해요",           dotColor: "var(--terracotta)", textColor: "var(--terracotta)" },
  replied:              { label: "답장을 전했어요",           dotColor: "var(--sage-deep)",  textColor: "var(--sage-deep)" },
};

const SENT_LETTERS: MockLetter[] = [
  {
    id: "1",
    month: "8월",
    day: "14",
    statusKind: "reply_arrived_unread",
    preview: "어릴 때부터 늘 혼자라는 느낌이 있었어요. 가족이 있어도, 친구가 있어도 어딘가 혼자인 것 같은 그 감각이 지금도 가끔 찾아와요.",
    sender: "봄빛 한 줌",
  },
  {
    id: "3",
    month: "8월",
    day: "9",
    statusKind: "assigned",
    preview: "퇴직하고 나서 처음에는 자유롭겠다 싶었는데, 막상 그 자유가 오니까 뭘 해야 할지 모르겠어요. 하루가 너무 길게 느껴져요.",
    sender: "들판 한 가운데",
  },
  {
    id: "4",
    month: "8월",
    day: "7",
    statusKind: "reply_writing",
    preview: "친구한테 상처를 줬어요. 나도 모르게 한 말인데 그 친구 표정이 아직도 눈에 밟혀요. 사과하고 싶은데 어떻게 말해야 할지 모르겠어요.",
    sender: "잔잔한 물결",
  },
  {
    id: "5",
    month: "8월",
    day: "3",
    statusKind: "delayed",
    preview: "요즘 매일 아침이 무거워요. 눈을 뜨는 게 힘든 날들이 계속돼요. 누군가한테 이 마음을 전할 수 있을까 싶어서 이렇게 써봐요.",
    sender: "새벽 안개",
    requiresAttention: true,
  },
  {
    id: "2",
    month: "8월",
    day: "11",
    statusKind: "reply_opened",
    preview: "오늘 처음으로 울었어요. 이유를 모르겠는데 그냥 눈물이 나서, 한참을 그렇게 있었어요. 괜찮다고 말하기가 점점 어려워지고 있어요.",
    sender: "조용한 오후",
  },
  {
    id: "6",
    month: "7월",
    day: "28",
    statusKind: "waiting",
    preview: "엄마가 많이 아파요. 곁에서 돌보고 있는데 지치는 마음이 드는 게 죄스러워요. 이런 마음을 어디다 털어놓아야 할지 몰라서요.",
    sender: "흐린 하늘 아래",
  },
];

const REPLIED_LETTERS: MockLetter[] = [
  {
    id: "r1",
    month: "8월",
    day: "13",
    statusKind: "replied",
    preview: "당신의 이야기가 마음에 남아요. 오래 걸려도 괜찮다고, 그렇게 전하고 싶었어요. 당신은 충분히 잘 하고 있어요.",
    sender: "봄빛 한 줌에게",
  },
  {
    id: "r2",
    month: "8월",
    day: "10",
    statusKind: "replied",
    preview: "혼자인 것 같은 느낌, 저도 알아요. 그래도 이렇게 쓸 수 있다는 것만으로도 용기 있는 일이라고 생각해요.",
    sender: "조용한 오후에게",
  },
  {
    id: "r3",
    month: "8월",
    day: "5",
    statusKind: "replied",
    preview: "울어도 괜찮아요. 이유를 몰라도 괜찮아요. 지금 이 마음 그대로도 충분해요.",
    sender: "새벽 안개에게",
  },
  {
    id: "r4",
    month: "7월",
    day: "31",
    statusKind: "replied",
    preview: "퇴직 후의 그 공허함이 얼마나 낯설고 힘든지 이해해요. 조금씩 하루를 채워가다 보면 새로운 리듬이 생길 거예요.",
    sender: "들판 한 가운데에게",
  },
];

function LetterCard({ letter }: { letter: MockLetter }) {
  const cfg = STATUS_CONFIG[letter.statusKind];
  const isUnread = letter.statusKind === "reply_arrived_unread";

  return (
    <button
      type="button"
      style={{
        appearance: "none",
        display: "block",
        width: "100%",
        border: `1px solid ${isUnread ? "rgba(78,52,94,0.38)" : "var(--gold-rule-light)"}`,
        borderRadius: "2px",
        background: isUnread
          ? "linear-gradient(135deg, rgba(246,240,229,1) 0%, rgba(237,228,248,0.35) 100%)"
          : "var(--paper-warm)",
        boxShadow: isUnread
          ? "0 2px 12px rgba(78,52,94,0.10), 0 1px 3px rgba(41,37,34,0.06)"
          : "0 1px 4px rgba(41,37,34,0.05)",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
        overflow: "hidden",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      }}
    >
      {/* 카드 상단 — 발신 이름 + 날짜 소인 */}
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          padding: "14px 16px 0",
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: "var(--fs-xs)",
            fontWeight: 600,
            color: "var(--muted-ink)",
            letterSpacing: "0.01em",
          }}
        >
          {letter.sender}
        </span>

        {/* 날짜 소인 스타일 */}
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderLeft: "1px solid var(--gold-rule-faint)",
            paddingLeft: "10px",
            marginLeft: "10px",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "9px",
              color: "var(--faint-ink-2)",
              letterSpacing: "0.08em",
              marginBottom: "1px",
            }}
          >
            {letter.month}
          </span>
          <span
            style={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: "18px",
              fontWeight: 400,
              color: "var(--faint-ink)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {letter.day}
          </span>
        </span>
      </span>

      {/* 구분선 */}
      <span
        style={{
          display: "block",
          margin: "12px 16px",
          height: "1px",
          background: isUnread ? "rgba(78,52,94,0.12)" : "var(--gold-rule-faint)",
        }}
      />

      {/* 편지 본문 미리보기 */}
      <span
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          padding: "0 16px",
          fontFamily: '"Noto Serif KR", serif',
          fontSize: "var(--fs-mid)",
          fontWeight: isUnread ? 500 : 400,
          color: "var(--ink)",
          lineHeight: "1.75",
          letterSpacing: "-0.04em",
        } as React.CSSProperties}
      >
        {letter.preview}
      </span>

      {/* 카드 하단 — 상태 */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px 14px",
          marginTop: "4px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "Pretendard, sans-serif",
            fontSize: "var(--fs-nano)",
            fontWeight: isUnread ? 700 : 400,
            color: cfg.textColor,
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: cfg.dotColor,
              flexShrink: 0,
              opacity: isUnread ? 1 : 0.7,
            }}
          />
          {cfg.label}
        </span>

        {letter.requiresAttention ? (
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "var(--fs-nano)",
              fontWeight: 600,
              color: "var(--terracotta)",
            }}
          >
            확인 필요
          </span>
        ) : (
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "16px",
              color: "var(--faint-ink-2)",
              lineHeight: 1,
            }}
          >
            ›
          </span>
        )}
      </span>
    </button>
  );
}

export function MailboxMockup3Screen() {
  const [tab, setTab] = useState<"mine" | "replied">("mine");
  const letters = tab === "mine" ? SENT_LETTERS : REPLIED_LETTERS;

  return (
    <main className="mobile-prototype mailbox-screen">
      <div className="mailbox-scroll-region">
        {/* 헤더 */}
        <header className="mailbox-heading" aria-labelledby="mailbox-mock3-title">
          <p>공감편지</p>
          <h1 id="mailbox-mock3-title">편지함</h1>
          <span>주고받은 마음을 한 통의 편지로 다시 꺼내볼 수 있어요.</span>
        </header>

        {/* 탭 */}
        <div className="mailbox-tabs" role="tablist" aria-label="편지함 분류">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "mine"}
            className={tab === "mine" ? "is-active" : ""}
            onClick={() => setTab("mine")}
          >
            내가 보낸 편지
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "replied"}
            className={tab === "replied" ? "is-active" : ""}
            onClick={() => setTab("replied")}
          >
            내가 답한 편지
          </button>
        </div>

        {/* 카드 목록 */}
        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          {letters.map((letter) => (
            <LetterCard key={letter.id} letter={letter} />
          ))}
        </div>
      </div>

      <AppBottomNavigation active="mailbox" />
    </main>
  );
}
