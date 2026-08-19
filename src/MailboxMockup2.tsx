import { useState } from "react";
import { AppBottomNavigation } from "./AppBottomNavigation";

type StatusKind =
  | "reply_arrived_unread"
  | "reply_opened"
  | "assigned"
  | "reply_writing"
  | "waiting"
  | "sent"
  | "delayed"
  | "replied";

type MockLetter = {
  id: string;
  date: string;
  statusKind: StatusKind;
  preview: string;
  sender: string;
  hasUnreadReply?: boolean;
  requiresAttention?: boolean;
};

const STATUS_META: Record<StatusKind, { label: string; accent: string; group: string }> = {
  reply_arrived_unread: { label: "답장 도착", accent: "var(--deep-plum)", group: "새 소식" },
  reply_opened:         { label: "답장 받음",  accent: "var(--sage-deep)",  group: "지난 편지" },
  assigned:             { label: "읽는 중",    accent: "var(--gold-deep)",  group: "진행 중" },
  reply_writing:        { label: "답장 준비",  accent: "var(--gold-deep)",  group: "진행 중" },
  waiting:              { label: "기다리는 중", accent: "var(--faint-ink-2)", group: "진행 중" },
  sent:                 { label: "전달됨",     accent: "var(--faint-ink-2)", group: "진행 중" },
  delayed:              { label: "확인 필요",  accent: "var(--terracotta)", group: "진행 중" },
  replied:              { label: "답장 전달",  accent: "var(--sage-deep)",  group: "지난 편지" },
};

const SENT_LETTERS: MockLetter[] = [
  {
    id: "1",
    date: "8월 14일",
    statusKind: "reply_arrived_unread",
    preview: "어릴 때부터 늘 혼자라는 느낌이 있었어요. 가족이 있어도, 친구가 있어도 어딘가 혼자인 것 같은 그 감각이 지금도 가끔 찾아와요.",
    sender: "봄빛 한 줌",
    hasUnreadReply: true,
  },
  {
    id: "3",
    date: "8월 9일",
    statusKind: "assigned",
    preview: "퇴직하고 나서 처음에는 자유롭겠다 싶었는데, 막상 그 자유가 오니까 뭘 해야 할지 모르겠어요. 하루가 너무 길게 느껴져요.",
    sender: "들판 한 가운데",
  },
  {
    id: "4",
    date: "8월 7일",
    statusKind: "reply_writing",
    preview: "친구한테 상처를 줬어요. 나도 모르게 한 말인데 그 친구 표정이 아직도 눈에 밟혀요. 사과하고 싶은데 어떻게 말해야 할지 모르겠어요.",
    sender: "잔잔한 물결",
  },
  {
    id: "5",
    date: "8월 3일",
    statusKind: "delayed",
    preview: "요즘 매일 아침이 무거워요. 눈을 뜨는 게 힘든 날들이 계속돼요. 누군가한테 이 마음을 전할 수 있을까 싶어서 이렇게 써봐요.",
    sender: "새벽 안개",
    requiresAttention: true,
  },
  {
    id: "2",
    date: "8월 11일",
    statusKind: "reply_opened",
    preview: "오늘 처음으로 울었어요. 이유를 모르겠는데 그냥 눈물이 나서, 한참을 그렇게 있었어요. 괜찮다고 말하기가 점점 어려워지고 있어요.",
    sender: "조용한 오후",
  },
  {
    id: "6",
    date: "7월 28일",
    statusKind: "reply_opened",
    preview: "엄마가 많이 아파요. 곁에서 돌보고 있는데 지치는 마음이 드는 게 죄스러워요. 이런 마음을 어디다 털어놓아야 할지 몰라서요.",
    sender: "흐린 하늘 아래",
  },
];

const REPLIED_LETTERS: MockLetter[] = [
  {
    id: "r1",
    date: "8월 13일",
    statusKind: "replied",
    preview: "당신의 이야기가 마음에 남아요. 오래 걸려도 괜찮다고, 그렇게 전하고 싶었어요. 당신은 충분히 잘 하고 있어요.",
    sender: "봄빛 한 줌에게",
  },
  {
    id: "r2",
    date: "8월 10일",
    statusKind: "replied",
    preview: "혼자인 것 같은 느낌, 저도 알아요. 그래도 이렇게 쓸 수 있다는 것만으로도 용기 있는 일이라고 생각해요.",
    sender: "조용한 오후에게",
  },
  {
    id: "r3",
    date: "8월 5일",
    statusKind: "replied",
    preview: "울어도 괜찮아요. 이유를 몰라도 괜찮아요. 지금 이 마음 그대로도 충분해요.",
    sender: "새벽 안개에게",
  },
  {
    id: "r4",
    date: "7월 31일",
    statusKind: "replied",
    preview: "퇴직 후의 그 공허함이 얼마나 낯설고 힘든지 이해해요. 조금씩 하루를 채워가다 보면 새로운 리듬이 생길 거예요.",
    sender: "들판 한 가운데에게",
  },
];

function groupLetters(letters: MockLetter[]) {
  const order = ["새 소식", "진행 중", "지난 편지"];
  const map: Record<string, MockLetter[]> = {};
  for (const l of letters) {
    const g = STATUS_META[l.statusKind].group;
    if (!map[g]) map[g] = [];
    map[g].push(l);
  }
  return order.filter((g) => map[g]).map((g) => ({ group: g, items: map[g] }));
}

function LetterCard({ letter }: { letter: MockLetter }) {
  const meta = STATUS_META[letter.statusKind];
  const isUnread = letter.statusKind === "reply_arrived_unread";

  return (
    <button
      type="button"
      className="mailbox-card-item"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "3px 1fr",
        gap: "0 16px",
        border: 0,
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {/* 상태 컬러 바 */}
      <span
        aria-hidden="true"
        style={{
          display: "block",
          borderRadius: "2px",
          background: isUnread ? "var(--deep-plum)" : meta.accent,
          opacity: isUnread ? 1 : 0.55,
          alignSelf: "stretch",
          minHeight: "100%",
        }}
      />

      {/* 카드 본체 */}
      <span
        style={{
          display: "grid",
          gap: "8px",
          padding: "15px 0 17px",
          borderBottom: "1px solid var(--rule-light)",
        }}
      >
        {/* 상단: 날짜 + 상태 태그 */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <time
            style={{
              color: "var(--faint-ink)",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "var(--fs-nano)",
            }}
          >
            {letter.date}
          </time>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "2px 7px",
              borderRadius: "2px",
              border: `1px solid ${isUnread ? "rgba(78,52,94,0.35)" : "rgba(41,37,34,0.14)"}`,
              background: isUnread ? "rgba(78,52,94,0.07)" : "transparent",
              color: isUnread ? "var(--deep-plum)" : "var(--faint-ink)",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "var(--fs-nano)",
              fontWeight: isUnread ? 700 : 500,
              letterSpacing: "0.02em",
            }}
          >
            {isUnread && (
              <i
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--deep-plum)",
                  flexShrink: 0,
                }}
              />
            )}
            {meta.label}
          </span>
        </span>

        {/* 편지 미리보기 */}
        <strong
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontFamily: '"Noto Serif KR", serif',
            fontSize: "var(--fs-mid)",
            fontWeight: isUnread ? 600 : 400,
            lineHeight: "var(--lh-snug)",
            letterSpacing: "-0.045em",
            color: "var(--ink)",
          }}
        >
          {letter.preview}
        </strong>

        {/* 하단: 익명 이름 */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "var(--muted-ink)",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "var(--fs-xs)",
            }}
          >
            {letter.sender}
          </span>
          {letter.requiresAttention && (
            <span
              style={{
                color: "var(--terracotta)",
                fontFamily: "Pretendard, sans-serif",
                fontSize: "var(--fs-nano)",
                fontWeight: 600,
              }}
            >
              확인 필요
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

export function MailboxMockup2Screen() {
  const [tab, setTab] = useState<"mine" | "replied">("mine");
  const letters = tab === "mine" ? SENT_LETTERS : REPLIED_LETTERS;
  const groups = groupLetters(letters);

  return (
    <main className="mobile-prototype mailbox-screen">
      <div className="mailbox-scroll-region">
        {/* 헤더 */}
        <header className="mailbox-heading" aria-labelledby="mailbox-mock2-title">
          <p>공감편지</p>
          <h1 id="mailbox-mock2-title">편지함</h1>
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

        {/* 그룹별 목록 */}
        <div style={{ marginTop: "24px", display: "grid", gap: "28px" }}>
          {groups.map(({ group, items }) => (
            <section key={group} aria-label={group}>
              {/* 그룹 레이블 */}
              <h2
                style={{
                  margin: "0 0 12px",
                  color: "var(--faint-ink)",
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                }}
              >
                {group}
              </h2>

              {/* 카드 목록 */}
              <div
                style={{
                  display: "grid",
                  gap: 0,
                  borderTop: "1px solid var(--rule-light)",
                }}
              >
                {items.map((letter) => (
                  <LetterCard key={letter.id} letter={letter} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AppBottomNavigation active="mailbox" />
    </main>
  );
}
