import { useState } from "react";
import { navigateTo } from "./navigation";
import { AppBottomNavigation } from "./AppBottomNavigation";
import { getCurrentUserId, getLetterById, getLettersRepliedByUser, getMyLetters, type Letter } from "./letters";
import { getReplyDraftsByWriter } from "./letterDraft";
import { getSentLetterDisplayStatus, sortSentLettersByActivity } from "./mailboxStatus";

export type MailboxKey = "sent" | "replied" | "favorite";

export const MAILBOX_RECORDS: ReadonlyArray<{ id: MailboxKey; title: string; description: string; count: number }> = [
  { id: "sent", title: "내가 보낸 편지", description: "내 마음을 털어놓았던 기록", count: 8 },
  { id: "replied", title: "내가 답한 편지", description: "누군가에게 건넨 마음", count: 12 },
  { id: "favorite", title: "즐겨찾기", description: "오래 간직하고 싶은 편지", count: 4 },
];

export function formatMailboxCount(count: number) { return `${count > 999 ? "999+" : count}통`; }

export function MailboxNavigation({ onUnavailable }: { onUnavailable: (label: string) => void }) {
  return <nav className="app-bottom-navigation" aria-label="주요 메뉴"><button type="button" onClick={() => navigateTo("/home")}><img className="app-nav-mark app-nav-mark--home" src="/assets/home_icon.png" alt="" aria-hidden="true" /><span>홈</span></button><button type="button" className="is-active" aria-current="page"><img className="app-nav-mark app-nav-mark--mailbox" src="/assets/letter_icon.png" alt="" aria-hidden="true" /><span>편지함</span></button><button type="button" onClick={() => onUnavailable("나의 공간")}><img className="app-nav-mark app-nav-mark--space" src="/assets/notebook_icon.png" alt="" aria-hidden="true" /><span>나의 공간</span></button></nav>;
}

export function MailboxScreen() {
  const [activeTab, setActiveTab] = useState<"mine" | "replied">("mine");
  const userId = getCurrentUserId();
  const myLetters = sortSentLettersByActivity(getMyLetters(userId), userId);
  const repliedLetters = getLettersRepliedByUser(userId);
  const letters = activeTab === "mine" ? myLetters : repliedLetters;
  const replyDrafts = getReplyDraftsByWriter(userId).map((draft) => ({ draft, letter: getLetterById(draft.letterId) })).filter((item): item is { draft: ReturnType<typeof getReplyDraftsByWriter>[number]; letter: Letter } => Boolean(item.letter && item.letter.assignedReaderId === userId && ["assigned", "read", "waiting_for_reply"].includes(item.letter.status)));
  const changeTab = (next: "mine" | "replied") => setActiveTab(next);
  return <main className="mobile-prototype mailbox-screen"><div className="mailbox-scroll-region"><header className="mailbox-heading" aria-labelledby="mailbox-title"><p>공감편지</p><h1 id="mailbox-title">편지함</h1><span>주고받은 마음을 한 통의 편지로 다시 꺼내볼 수 있어요.</span></header><div className="mailbox-tabs" role="tablist" aria-label="편지함 분류"><button type="button" role="tab" aria-selected={activeTab === "mine"} className={activeTab === "mine" ? "is-active" : ""} onClick={() => changeTab("mine")}>내가 보낸 편지</button><button type="button" role="tab" aria-selected={activeTab === "replied"} className={activeTab === "replied" ? "is-active" : ""} onClick={() => changeTab("replied")}>내가 답한 편지</button></div>{activeTab === "replied" && replyDrafts.length > 0 && <section className="mailbox-reply-drafts" aria-label="작성 중인 답장"><h2>답장 작성 중</h2>{replyDrafts.map(({ draft, letter }) => <button type="button" key={draft.id} onClick={() => navigateTo(`/write-reply/${encodeURIComponent(letter.id)}`)}><strong>{letter.anonymousName || "누군가의 편지"}</strong><span>{draft.content.trim().replace(/\s+/g, " ").slice(0, 68)}</span><small>이어서 쓰기</small></button>)}</section>}{letters.length ? <section className="mailbox-letter-list" aria-label={activeTab === "mine" ? "내가 보낸 편지" : "내가 답한 편지"}>{letters.map((letter) => <MailboxLetterListItem key={letter.id} letter={letter} mode={activeTab} userId={userId} onClick={() => navigateTo(activeTab === "mine" ? `/mailbox/my/${encodeURIComponent(letter.id)}` : `/mailbox/replied/${encodeURIComponent(letter.id)}`)} />)}</section> : <MailboxEmpty mode={activeTab} />}</div><AppBottomNavigation active="mailbox" /></main>;
}

function MailboxEmpty({ mode }: { mode: "mine" | "replied" }) { const mine = mode === "mine"; return <section className="mailbox-letter-empty"><p>{mine ? "아직 보낸 편지가 없어요." : "아직 답장을 전한 편지가 없어요."}</p><span>{mine ? "마음을 남기면 한 사람이 읽고 답장을 전해요." : "기다리는 마음을 만나 천천히 답장을 전해보세요."}</span><button type="button" onClick={() => navigateTo(mine ? "/write-letter" : "/waiting-letters")}>{mine ? "편지 쓰기" : "기다리는 편지 보기"}</button></section>; }

export function MailboxLetterListItem({ letter, mode, userId, onClick, statusOverride, previewOverride }: { letter: Letter; mode: "mine" | "replied"; userId: string; onClick: () => void; statusOverride?: string; previewOverride?: string }) {
  const date = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(new Date(letter.updatedAt));
  const sentStatus = getSentLetterDisplayStatus(letter, userId);
  const status = statusOverride ?? (mode === "replied" ? "답장을 전했어요" : sentStatus.label);
  const preview = previewOverride ?? (mode === "replied" ? letter.reply?.content : letter.content);
  const aria = mode === "mine" ? `${date}에 보낸 편지, ${status}${sentStatus.hasUnreadReply ? ", 읽지 않은 새 답장 있음" : ""}` : `${date}에 답한 편지, ${status}`;
  return <button type="button" className={`mailbox-letter-item mailbox-letter-item--${mode}${sentStatus.hasUnreadReply && mode === "mine" ? " is-unread" : ""}${sentStatus.isRestricted ? " is-restricted" : ""}`} onClick={onClick} aria-label={aria}><span className="mailbox-letter-meta"><time dateTime={letter.updatedAt}>{date}</time><em>{sentStatus.hasUnreadReply && mode === "mine" && <i className="mailbox-unread-dot" aria-hidden="true" />}{status}</em></span><strong>{preview || "내용을 준비하고 있어요."}</strong><span>{mode === "replied" ? "내가 건넨 답장" : letter.anonymousName || "익명으로 보낸 편지"}</span>{mode === "mine" && sentStatus.requiresAttention && <small>확인 필요</small>}</button>;
}
