import { useState } from "react";
import { getBlockedUsers, isUserBlocked } from "./blocks";
import { isContentHidden } from "./contentVisibility";
import { getCurrentUserId, getLetterById, getWaitingReplyLettersByUser, getReceivedRepliesByUser, markReplyOpened, type Letter } from "./letters";
import { deleteMockAccount, generateAnonymousName, getCurrentAnonymousName, getMockAuthSnapshot, logoutMockAccount, updateAnonymousName } from "./mockAuth";
import { navigateBack, navigateTo } from "./navigation";
import { isPrototypeQaMode } from "./prototypeQa";
import { getNotificationSettings } from "./notifications";
import { getReportForTarget, getReportsByUser } from "./reports";
import { getSealedExcerptsByReplyId, getSealedExcerptsByUser } from "./sealedExcerpts";

function Header({ title, fallback = "/my-space" }: { title: string; fallback?: string }) { return <header className="flow-header"><button type="button" onClick={() => navigateBack(fallback)} aria-label="이전으로 돌아가기">←</button><strong>{title}</strong><span /></header>; }
const short = (value: string, length = 52) => { const text = value.trim().replace(/\s+/g, " "); return text.length > length ? `${text.slice(0, length)}…` : text; };
const date = (value?: string) => value ? new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value)) : "도착 날짜를 알 수 없어요";

export function ReceivedRepliesScreen() {
  const userId = getCurrentUserId(); const [version, setVersion] = useState(0); const qaMode = isPrototypeQaMode(); const replies = getReceivedRepliesByUser(userId);
  const waitingLetters = getWaitingReplyLettersByUser(userId);
  return <main className="mobile-prototype received-replies-screen" data-version={version}><Header title="받은 답장" /><div className="received-replies-scroll"><section className="subpage-heading"><h1>받은 답장</h1><p>내 이야기를 읽은 사람이 전한 마음이에요.</p></section>{replies.length ? <section className="received-reply-list">{replies.map((letter) => <ReceivedReplyRow key={letter.id} letter={letter} userId={userId} onOpen={() => { markReplyOpened(letter.id, userId); setVersion((value) => value + 1); navigateTo(`/mailbox/my/${encodeURIComponent(letter.id)}`); }} />)}</section> : <section className="received-reply-empty"><h2>아직 도착한 답장이 없어요.</h2><p>{waitingLetters.length ? "보낸 편지들이 각자의 답장을 기다리고 있어요." : "마음을 남기면 한 사람이 읽고 답장을 전해요."}</p><button className="flow-primary-button" type="button" onClick={() => navigateTo(waitingLetters.length ? "/mailbox" : "/write-letter")}>{waitingLetters.length ? "내가 보낸 편지 보기" : "편지 쓰기"}</button></section>}{qaMode && <details className="prototype-test-panel"><summary>프로토타입 테스트</summary><p>데이터가 없는 상태는 새 사용자 또는 답장이 없는 계정에서 확인할 수 있어요.</p></details>}</div></main>;
}

function ReceivedReplyRow({ letter, userId, onOpen }: { letter: Letter; userId: string; onOpen: () => void }) {
  const reply = letter.reply!; const hidden = isContentHidden(userId, "reply", reply.id); const report = getReportForTarget(userId, "reply", reply.id); const blocked = isUserBlocked(userId, reply.writerId); const unavailable = reply.safetyStatus === "blocked"; const sealed = getSealedExcerptsByReplyId(reply.id, userId).length; const unread = !letter.replyOpenedAt;
  const state = unavailable ? ["이 답장은 더 이상 볼 수 없어요.", "연결된 내 편지는 계속 확인할 수 있어요."] : hidden || blocked ? ["숨긴 답장이에요.", "필요하면 다시 확인할 수 있어요."] : report ? ["신고한 답장이에요.", ({ submitted: "접수됨", reviewing: "확인 중", resolved: "처리 완료", dismissed: "검토 종료" } as const)[report.status]] : undefined;
  return <button type="button" className={`received-reply-row${unread ? " is-unread" : ""}`} onClick={onOpen}><span className="received-reply-top"><time>{date(reply.createdAt)}</time>{unread && <em>새 답장</em>}</span><strong>{reply.anonymousName ?? "익명의 누군가"}에게서 답장이 도착했어요.</strong><span>{state ? state[0] : `내 편지: ${short(letter.content)}`}</span>{state && <small>{state[1]}</small>}{sealed > 0 && <small>간직한 문구 {sealed}개</small>}</button>;
}

export function AnonymousNameSettingsScreen() {
  const [current, setCurrent] = useState(getCurrentAnonymousName()); const [candidate, setCandidate] = useState<string>(); const [confirm, setConfirm] = useState(false); const [failed, setFailed] = useState(false); const [toast, setToast] = useState("");
  const propose = () => { setCandidate(generateAnonymousName(current)); setFailed(false); };
  const save = () => { if (!candidate || new URLSearchParams(window.location.search).get("state") === "error") { setFailed(true); return; } const account = updateAnonymousName(candidate); if (!account) { setFailed(true); return; } setCurrent(account.anonymousName ?? candidate); setCandidate(undefined); setConfirm(false); setToast("익명 이름을 바꿨어요."); window.setTimeout(() => setToast(""), 2200); };
  return <main className="mobile-prototype anonymous-name-screen"><Header title="익명 닉네임" /><div className="my-detail-scroll"><section className="subpage-heading"><h1>{current}</h1><p>앞으로 보내는 편지와 답장에 이 이름이 보여요.</p><small>이전에 보낸 편지와 답장에는 당시의 이름이 그대로 남아요.</small></section>{candidate ? <section className="name-candidate"><p>새로운 이름</p><strong>{candidate}</strong><button className="flow-primary-button" type="button" onClick={() => setConfirm(true)}>이 이름으로 바꾸기</button><button className="flow-secondary-button" type="button" onClick={() => { setCandidate(undefined); setFailed(false); }}>기존 이름 유지하기</button><button className="flow-text-button" type="button" onClick={propose}>다른 이름 다시 받기</button>{failed && <div className="flow-notice"><strong>익명 이름을 바꾸지 못했어요.</strong><span>잠시 후 다시 시도해주세요.</span><button type="button" onClick={() => setFailed(false)}>다시 시도</button></div>}</section> : <button className="flow-primary-button" type="button" onClick={propose}>새로운 이름 받기</button>}{toast && <p className="notification-toast" role="status">{toast}</p>}</div>{confirm && <div className="auth-dialog-backdrop"><section className="auth-dialog" role="dialog" aria-modal="true"><p>익명 닉네임</p><h2>익명 이름을 바꿀까요?</h2><span>앞으로 작성하는 편지와 답장에는 새로운 이름이 보여요.<br />이전에 작성한 기록의 이름은 바뀌지 않아요.</span><button className="auth-primary" type="button" onClick={save}>이름 바꾸기</button><button className="auth-secondary" type="button" onClick={() => setConfirm(false)}>취소</button></section></div>}</main>;
}

const guideContent = [
  ["공감편지는", "익명으로 마음을 담은 편지를 남기고, 한 사람이 읽어 답장을 전하는 서비스예요."],
  ["답장이 도착하기까지", "답장은 바로 도착하지 않을 수 있어요. 편지를 맡은 사람이 천천히 마음을 읽고 답장을 전해요."],
  ["편지와 답장", "여러 통의 편지를 보낼 수 있고, 각 편지는 저마다의 여정을 이어가요. 편지를 맡은 뒤 답장이 어렵다면 조용히 돌려보낼 수 있어요."],
  ["안전하게 이용하기", "신고와 차단을 사용할 수 있어요. 공감편지는 전문 상담이나 진단 서비스가 아니며, 긴급한 상황에서는 더 빠른 도움을 우선해주세요."],
];
const safetyContent = [
  ["개인정보", "실명, 연락처, 주소, SNS 계정은 적지 않도록 해요."], ["서로를 존중하기", "상대방을 비난하거나 모욕하는 표현은 사용할 수 없어요."], ["제한되는 내용", "성적·불법·위협 콘텐츠와 자해·타해를 부추기는 표현은 제한돼요."], ["신고와 차단", "편지와 답장은 신고될 수 있으며, 차단하면 해당 사용자와 다시 연결되지 않아요."], ["프로토타입 안내", "AI 또는 규칙 기반 안전 검토는 오판할 수 있어요. 실제 서비스에서는 중요한 제재에 운영 검토가 필요해요."],
];

export function GuideScreen({ kind }: { kind: "service" | "safety" }) { const isSafety = kind === "safety"; const content = isSafety ? safetyContent : guideContent; return <main className="mobile-prototype guide-screen"><Header title={isSafety ? "안전하게 마음을 나누기 위해" : "이용 안내"} /><div className="my-detail-scroll"><section className="subpage-heading"><h1>{isSafety ? "안전하게 마음을\n나누기 위해" : "공감편지를\n이용하는 방법"}</h1><p>{isSafety ? "서로의 마음이 안전하게 머물 수 있도록 함께 지켜주세요." : "마음을 담은 편지가 조용히 오가는 방식이에요."}</p></section><section className="guide-sections">{content.map(([title, body]) => <article key={title}><h2>{title}</h2><p>{body}</p></article>)}</section>{isSafety && <p className="guide-todo">TODO · 실제 서비스 개발 시 운영 정책과 검토 절차를 연결해야 해요.</p>}</div></main>; }

export function PolicyScreen({ kind }: { kind: "privacy" | "terms" }) { const privacy = kind === "privacy"; const title = privacy ? "개인정보 처리방침" : "서비스 이용약관"; const notice = privacy ? "최종 개인정보 처리방침은 실제 서비스 개발과 법률 검토 후 연결됩니다." : "최종 이용약관은 실제 서비스 정책과 법률 검토 후 연결됩니다."; return <main className="mobile-prototype policy-screen"><Header title={title} /><div className="my-detail-scroll"><section className="policy-document"><p>문서 템플릿</p><h1>{title}</h1><span>적용 예정일 · 실제 서비스 준비 후 확정</span><div className="policy-notice"><strong>{notice}</strong><p>개발 단계에서 실제 URL 또는 CMS 문서로 교체해야 합니다.</p></div><h2>목차</h2><ol><li>문서의 목적과 적용 범위</li><li>서비스 이용과 사용자 보호</li><li>정보 처리 및 보관 기준</li><li>문의와 변경 사항 안내</li></ol></section></div></main>; }

export function AppInfoScreen() { return <main className="mobile-prototype app-info-screen"><Header title="공감편지 정보" /><div className="my-detail-scroll"><section className="app-info-card"><p>공감편지</p><h1>Prototype 0.1.0</h1><span>실제 운영 앱이 아닌 디자인 프로토타입 버전이에요.</span><dl><div><dt>오픈소스 라이선스</dt><dd>실제 개발 단계에서 사용 패키지 기준으로 연결합니다.</dd></div><div><dt>문의 경로</dt><dd>문의 경로는 실제 서비스 운영 준비 후 연결됩니다.</dd></div></dl><button type="button" onClick={() => navigateTo("/privacy-policy")}>개인정보 처리방침</button><button type="button" onClick={() => navigateTo("/terms-of-service")}>서비스 이용약관</button></section></div></main>; }

function providerLabel(provider?: string) {
  if (provider === "apple") return "Apple";
  if (provider === "google") return "Google";
  if (provider === "kakao") return "카카오";
  return "mock";
}

export function AccountSettingsScreen() {
  const account = getMockAuthSnapshot().account;
  const [dialog, setDialog] = useState<"logout" | "delete" | undefined>();

  const logout = () => {
    logoutMockAccount();
    navigateTo("/intro");
  };

  const removeAccount = () => {
    deleteMockAccount();
    navigateTo("/intro");
  };

  return <main className="mobile-prototype account-settings-screen"><Header title="계정 관리" /><div className="my-detail-scroll"><section className="subpage-heading"><h1>계정 관리</h1><p>이 기기에서 공감편지를 어떻게 이어갈지 정할 수 있어요.</p></section><section className="account-state-card"><p>현재 연결된 mock 계정</p><strong>{account?.anonymousName ?? "익명 사용자"}</strong><span>{providerLabel(account?.authProvider)}로 연결된 프로토타입 계정이에요.</span></section><section className="account-action-list" aria-label="계정 행동"><button type="button" onClick={() => setDialog("logout")}><span><strong>로그아웃</strong><small>다시 로그인하면 이 기기의 기록을 이어서 볼 수 있어요.</small></span><i aria-hidden="true">›</i></button><button className="is-danger" type="button" onClick={() => setDialog("delete")}><span><strong>회원 탈퇴</strong><small>프로토타입에서는 실제 서버 데이터 삭제 대신 계정 연결만 해제해요.</small></span><i aria-hidden="true">›</i></button></section><p className="account-settings-note">TODO · 실제 서비스에서는 인증 세션 종료, 계정 삭제 요청, 법정 보관 기간, 문의 경로를 별도 API와 정책 문서로 연결해야 해요.</p></div>{dialog === "logout" && <div className="auth-dialog-backdrop"><section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="logout-dialog-title"><p>계정 관리</p><h2 id="logout-dialog-title">로그아웃할까요?</h2><span>편지와 간직한 문구는 이 기기에 그대로 남아요.<br />다시 로그인하면 이어서 볼 수 있어요.</span><button className="auth-primary" type="button" onClick={logout}>로그아웃</button><button className="auth-secondary" type="button" onClick={() => setDialog(undefined)}>계속 머물기</button></section></div>}{dialog === "delete" && <div className="auth-dialog-backdrop"><section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title"><p>계정 관리</p><h2 id="delete-dialog-title">탈퇴 처리를 진행할까요?</h2><span>이 화면은 프로토타입 확인용이에요.<br />편지, 답장, 간직한 문구 데이터는 개발 검수를 위해 삭제하지 않아요.</span><button className="auth-primary" type="button" onClick={removeAccount}>탈퇴 처리하기</button><button className="auth-secondary" type="button" onClick={() => setDialog(undefined)}>취소</button></section></div>}</main>;
}

export function getMySpaceSummary(userId = getCurrentUserId()) { const excerpts = getSealedExcerptsByUser(userId); const replies = getReceivedRepliesByUser(userId); const reports = getReportsByUser(userId); return { name: getCurrentAnonymousName(), excerpts, replies, settings: getNotificationSettings(userId), blocks: getBlockedUsers(userId), reports }; }
