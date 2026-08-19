import { useState } from "react";
import { navigateTo } from "./navigation";
import { AppBottomNavigation } from "./AppBottomNavigation";

type MockLetter = {
  id: string;
  date: string;
  status: string;
  statusKind: "reply_arrived_unread" | "reply_opened" | "assigned" | "reply_writing" | "waiting" | "sent" | "delayed" | "replied";
  preview: string;
  sender: string;
  hasUnreadReply?: boolean;
  requiresAttention?: boolean;
};

const SENT_LETTERS: MockLetter[] = [
  {
    id: "1",
    date: "8월 14일",
    status: "답장이 도착했어요",
    statusKind: "reply_arrived_unread",
    preview: "어릴 때부터 늘 혼자라는 느낌이 있었어요. 가족이 있어도, 친구가 있어도 어딘가 혼자인 것 같은 그 감각이 지금도 가끔 찾아와요.",
    sender: "봄빛 한 줌",
    hasUnreadReply: true,
  },
  {
    id: "2",
    date: "8월 11일",
    status: "답장을 받았어요",
    statusKind: "reply_opened",
    preview: "오늘 처음으로 울었어요. 이유를 모르겠는데 그냥 눈물이 나서, 한참을 그렇게 있었어요. 괜찮다고 말하기가 점점 어려워지고 있어요.",
    sender: "조용한 오후",
  },
  {
    id: "3",
    date: "8월 9일",
    status: "한 사람이 편지를 맡았어요",
    statusKind: "assigned",
    preview: "퇴직하고 나서 처음에는 자유롭겠다 싶었는데, 막상 그 자유가 오니까 뭘 해야 할지 모르겠어요. 하루가 너무 길게 느껴져요.",
    sender: "들판 한 가운데",
  },
  {
    id: "4",
    date: "8월 7일",
    status: "답장을 준비하고 있어요",
    statusKind: "reply_writing",
    preview: "친구한테 상처를 줬어요. 나도 모르게 한 말인데 그 친구 표정이 아직도 눈에 밟혀요. 사과하고 싶은데 어떻게 말해야 할지 모르겠어요.",
    sender: "잔잔한 물결",
  },
  {
    id: "5",
    date: "8월 3일",
    status: "조금 오래 기다리고 있어요",
    statusKind: "delayed",
    preview: "요즘 매일 아침이 무거워요. 눈을 뜨는 게 힘든 날들이 계속돼요. 누군가한테 이 마음을 전할 수 있을까 싶어서 이렇게 써봐요.",
    sender: "새벽 안개",
    requiresAttention: true,
  },
  {
    id: "6",
    date: "7월 28일",
    status: "답장을 기다리고 있어요",
    statusKind: "waiting",
    preview: "엄마가 많이 아파요. 곁에서 돌보고 있는데 지치는 마음이 드는 게 죄스러워요. 이런 마음을 어디다 털어놓아야 할지 몰라서요.",
    sender: "흐린 하늘 아래",
  },
];

const REPLIED_LETTERS: MockLetter[] = [
  {
    id: "r1",
    date: "8월 13일",
    status: "답장을 전했어요",
    statusKind: "replied",
    preview: "당신의 이야기가 마음에 남아요. 오래 걸려도 괜찮다고, 그렇게 전하고 싶었어요. 당신은 충분히 잘 하고 있어요.",
    sender: "내가 건넨 답장",
  },
  {
    id: "r2",
    date: "8월 10일",
    status: "답장을 전했어요",
    statusKind: "replied",
    preview: "혼자인 것 같은 느낌, 저도 알아요. 그래도 누군가 이렇게 쓸 수 있다는 것, 그것만으로도 용기 있는 일이라고 생각해요.",
    sender: "내가 건넨 답장",
  },
  {
    id: "r3",
    date: "8월 5일",
    status: "답장을 전했어요",
    statusKind: "replied",
    preview: "울어도 괜찮아요. 이유를 몰라도 괜찮아요. 지금 이 마음 그대로도 충분해요.",
    sender: "내가 건넨 답장",
  },
  {
    id: "r4",
    date: "7월 31일",
    status: "답장을 전했어요",
    statusKind: "replied",
    preview: "퇴직 후의 그 공허함이 얼마나 낯설고 힘든지 이해해요. 조금씩 하루를 채워가다 보면 언젠가 새로운 리듬이 생길 거예요.",
    sender: "내가 건넨 답장",
  },
];

function StatusLabel({ kind, hasUnread }: { kind: MockLetter["statusKind"]; hasUnread?: boolean }) {
  const colors: Record<string, string> = {
    reply_arrived_unread: "var(--deep-plum)",
    reply_opened: "var(--sage-deep)",
    assigned: "var(--muted-ink)",
    reply_writing: "var(--muted-ink)",
    waiting: "var(--faint-ink)",
    sent: "var(--faint-ink)",
    delayed: "var(--gold-dark)",
    replied: "var(--sage-deep)",
  };
  return (
    <em style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: colors[kind] ?? "var(--faint-ink)", fontStyle: "normal" }}>
      {hasUnread && <i className="mailbox-unread-dot" aria-hidden="true" />}
      {kind === "reply_arrived_unread" ? "답장이 도착했어요" :
       kind === "reply_opened" ? "답장을 받았어요" :
       kind === "assigned" ? "한 사람이 편지를 맡았어요" :
       kind === "reply_writing" ? "답장을 준비하고 있어요" :
       kind === "waiting" ? "답장을 기다리고 있어요" :
       kind === "sent" ? "편지를 맡아두었어요" :
       kind === "delayed" ? "조금 오래 기다리고 있어요" :
       "답장을 전했어요"}
    </em>
  );
}

function LetterItem({ letter, mode }: { letter: MockLetter; mode: "mine" | "replied" }) {
  const isUnread = letter.statusKind === "reply_arrived_unread";
  const classes = [
    "mailbox-letter-item",
    `mailbox-letter-item--${mode}`,
    isUnread ? "is-unread" : "",
    letter.requiresAttention ? "" : "",
  ].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} onClick={() => {}}>
      <span className="mailbox-letter-meta">
        <time>{letter.date}</time>
        <StatusLabel kind={letter.statusKind} hasUnread={letter.hasUnreadReply} />
      </span>
      <strong>{letter.preview}</strong>
      <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "var(--muted-ink)", fontSize: "var(--fs-xs)" }}>{letter.sender}</span>
        {letter.requiresAttention && (
          <small style={{ color: "var(--gold-dark)", fontSize: "var(--fs-nano)", fontFamily: "Pretendard, sans-serif" }}>확인 필요</small>
        )}
      </span>
    </button>
  );
}

export function MailboxMockupScreen() {
  const [tab, setTab] = useState<"mine" | "replied">("mine");
  const letters = tab === "mine" ? SENT_LETTERS : REPLIED_LETTERS;

  return (
    <main className="mobile-prototype mailbox-screen">
      <div className="mailbox-scroll-region">
        <header className="mailbox-heading" aria-labelledby="mailbox-mock-title">
          <p>공감편지</p>
          <h1 id="mailbox-mock-title">편지함</h1>
          <span>주고받은 마음을 한 통의 편지로 다시 꺼내볼 수 있어요.</span>
        </header>

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

        <section className="mailbox-letter-list" aria-label={tab === "mine" ? "내가 보낸 편지" : "내가 답한 편지"}>
          {letters.map((letter) => (
            <LetterItem key={letter.id} letter={letter} mode={tab} />
          ))}
        </section>
      </div>

      <AppBottomNavigation active="mailbox" />
    </main>
  );
}
