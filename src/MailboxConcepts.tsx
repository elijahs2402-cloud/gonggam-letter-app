import { useState } from "react";
import {
  MAILBOX_RECORDS,
  MailboxNavigation,
  formatMailboxCount,
  type MailboxKey,
} from "./MailboxScreen";

type MailboxConcept = "a" | "b" | "c" | "d";

const conceptLabels: Record<MailboxConcept, string> = {
  a: "에디토리얼 인덱스",
  b: "보관 서랍",
  c: "기록 아카이브",
  d: "기록 패널",
};

const panelObjects: Record<MailboxKey, string> = {
  sent: "/assets/write-letter-object-tight.png",
  replied: "/assets/read-letter-object-tight.png",
  favorite: "/assets/reply-sent-lavender-envelope.png",
};

const archiveMarks: Record<MailboxKey, string> = {
  sent: "I",
  replied: "II",
  favorite: "III",
};

function MailboxConceptHeading({ concept }: { concept: MailboxConcept }) {
  return (
    <header className="mailbox-concept-heading" aria-labelledby={`mailbox-concept-${concept}-title`}>
      <p>공감편지</p>
      <span className="mailbox-concept-kicker">{conceptLabels[concept]}</span>
      <h1 id={`mailbox-concept-${concept}-title`}>편지함</h1>
      <span className="mailbox-concept-description">
        마음에 남은 기록을 다시 꺼내볼 수 있어요.
      </span>
    </header>
  );
}

function MailboxConceptNotice({ notice }: { notice: string }) {
  return (
    <p className="mailbox-concept-notice" role="status" aria-live="polite">
      {notice}
    </p>
  );
}

export function MailboxConceptScreen({ concept }: { concept: MailboxConcept }) {
  const [notice, setNotice] = useState("");

  function showUnavailable(label: string) {
    setNotice(`${label} 목록은 준비 중이에요.`);
  }

  return (
    <main className={`mobile-prototype mailbox-concept-screen mailbox-concept-${concept}`}>
      <div className="mailbox-concept-scroll">
        <MailboxConceptHeading concept={concept} />

        {concept === "c" && (
          <p className="mailbox-archive-note">
            건넨 마음과 도착한 온기가
            <br />한 권의 기록처럼 머무는 곳
          </p>
        )}

        <section className="mailbox-concept-records" aria-label="편지 기록">
          {MAILBOX_RECORDS.map((record, index) => (
            <button
              key={record.id}
              type="button"
              className="mailbox-concept-record"
              onClick={() => showUnavailable(record.title)}
              aria-label={`${record.title}, ${formatMailboxCount(record.count)}. 목록은 준비 중입니다.`}
            >
              {concept === "a" && (
                <span className="mailbox-index-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}

              {concept === "b" && (
                <span className={`mailbox-drawer-tab mailbox-drawer-tab--${record.id}`} aria-hidden="true" />
              )}

              {concept === "c" && (
                <span className="mailbox-archive-mark" aria-hidden="true">
                  {archiveMarks[record.id]}
                </span>
              )}

              {concept === "d" && (
                <span className={`mailbox-panel-object mailbox-panel-object--${record.id}`} aria-hidden="true">
                  <img src={panelObjects[record.id]} alt="" />
                </span>
              )}

              <span className="mailbox-concept-record-copy">
                <strong>{record.title}</strong>
                <span>{record.description}</span>
              </span>
              <span className="mailbox-concept-record-meta">
                <span>{formatMailboxCount(record.count)}</span>
                <i aria-hidden="true">›</i>
              </span>
            </button>
          ))}
        </section>

        {concept === "b" && (
          <span className="mailbox-paper-corner" aria-hidden="true">
            <i />
            <i />
          </span>
        )}

        <MailboxConceptNotice notice={notice} />
      </div>
      <MailboxNavigation onUnavailable={showUnavailable} />
    </main>
  );
}

export function MailboxConceptAScreen() {
  return <MailboxConceptScreen concept="a" />;
}

export function MailboxConceptBScreen() {
  return <MailboxConceptScreen concept="b" />;
}

export function MailboxConceptCScreen() {
  return <MailboxConceptScreen concept="c" />;
}

export function MailboxConceptDScreen() {
  return <MailboxConceptScreen concept="d" />;
}
