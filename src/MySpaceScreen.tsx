import { useState } from "react";
import { AppBottomNavigation } from "./AppBottomNavigation";
import { navigateTo } from "./navigation";
import { getMySpaceSummary } from "./MySpaceDetails";
import { isPrototypeQaMode } from "./prototypeQa";

type TestState = "normal" | "loading" | "error" | "partial-error";
const menuGroups = [
  { title: "마음에 남은 것", items: [{ label: "간직한 문구", description: "마음에 남은 문구를 다시 살펴봐요.", path: "/saved-excerpts" }, { label: "편지함", description: "내가 보낸 편지와 답한 편지를 확인해요.", path: "/mailbox" }] },
  { title: "나의 정보", items: [{ label: "익명 닉네임", description: "편지에서 보여지는 이름을 관리해요.", path: "/anonymous-name-settings" }, { label: "계정 관리", description: "로그아웃과 탈퇴 안내를 확인해요.", path: "/account-settings" }] },
  { title: "설정과 안전", items: [{ label: "알림 설정", description: "받고 싶은 소식을 설정해요.", path: "/notification-settings" }, { label: "신고·차단 관리", description: "접수한 신고와 차단한 사용자를 확인해요.", path: "/safety-management" }, { label: "이용 안내", description: "공감편지를 이용하는 방법이에요.", path: "/service-guide" }, { label: "안전 운영 안내", description: "안전하게 마음을 나누는 기준이에요.", path: "/safety-guide" }, { label: "개인정보 처리방침", description: "실제 서비스 문서 연결을 준비하고 있어요.", path: "/privacy-policy" }, { label: "서비스 이용약관", description: "실제 서비스 문서 연결을 준비하고 있어요.", path: "/terms-of-service" }, { label: "앱 정보", description: "프로토타입 버전과 안내를 확인해요.", path: "/app-info" }] },
];

export function MySpaceScreen() {
  const [state, setState] = useState<TestState>("normal"); const summary = getMySpaceSummary();
  const notificationText = summary.settings.pushPermission === "granted" ? "휴대폰 알림 켜짐" : summary.settings.pushPermission === "denied" ? "휴대폰 알림 꺼짐" : "앱 내부 알림만 사용 중";
  const qaMode = isPrototypeQaMode();
  return <main className="mobile-prototype my-space-screen"><div className="my-space-scroll-region"><header className="my-space-heading"><p>공감편지</p><h1>나의 공간</h1><span>내가 남기고 받은 마음을 조용히 살펴볼 수 있어요.</span></header>{state === "loading" ? <section className="my-space-skeleton" aria-label="나의 공간 불러오는 중"><i /><i /><i /></section> : state === "error" ? <section className="my-space-error"><h2>나의 공간을 불러오지 못했어요.</h2><p>잠시 후 다시 확인해주세요.</p><button className="flow-primary-button" type="button" onClick={() => setState("normal")}>다시 시도</button></section> : <><section className="my-space-identity"><div><p>편지에서는 이 이름으로 보여요.</p><strong>{summary.name}</strong></div><button type="button" onClick={() => navigateTo("/anonymous-name-settings")}>익명 이름 관리</button></section>{state === "partial-error" && <p className="my-space-partial-error">일부 기록을 불러오지 못했어요. 잠시 후 다시 확인해주세요.</p>}{menuGroups.map((group) => <section className="my-space-menu-group" key={group.title}><h2>{group.title}</h2><div className="my-space-menu">{group.items.map((item) => <button key={item.label} type="button" onClick={() => navigateTo(item.path)}><span><strong>{item.label}</strong><small>{item.label === "알림 설정" ? notificationText : item.label === "신고·차단 관리" ? `차단 ${summary.blocks.length}명 · 신고 ${summary.reports.length}건` : item.description}</small></span><i aria-hidden="true">›</i></button>)}</div></section>)}</>}{qaMode && <details className="prototype-test-panel my-space-test"><summary>프로토타입 테스트</summary><p>나의 공간 로딩 및 오류 상태를 확인할 수 있어요.</p><div><button type="button" onClick={() => setState("normal")}>정상</button><button type="button" onClick={() => setState("loading")}>로딩</button><button type="button" onClick={() => setState("partial-error")}>부분 오류</button><button type="button" onClick={() => setState("error")}>전체 오류</button></div></details>}</div><AppBottomNavigation active="my-space" /></main>;
}
