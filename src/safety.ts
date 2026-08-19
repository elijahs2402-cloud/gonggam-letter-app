export type SafetySeverity = "none" | "notice" | "warning" | "high_risk";
export type SafetyCategory = "personal_information" | "external_contact" | "meeting_request" | "harassment" | "hate" | "sexual_content" | "threat" | "self_harm_risk" | "suicide_risk" | "abuse_risk" | "violence_risk" | "illegal_activity" | "other";
export type SafetyStatus = "not_checked" | "clear" | "needs_revision" | "high_risk" | "under_review" | "blocked";
export type ModerationStatus = "not_required" | "pending" | "reviewing" | "approved" | "rejected";
export type SafetyMatch = { category: SafetyCategory; severity: SafetySeverity; matchedText?: string; startIndex?: number; endIndex?: number; message: string };
export type SafetyReviewResult = { id: string; targetType: "letter" | "reply"; targetId: string; checkedAt: string; severity: SafetySeverity; categories: SafetyCategory[]; matches: SafetyMatch[]; status: Exclude<SafetyStatus, "not_checked">; engine: "local_rules" | "remote_service" | "manual"; version: string };

const createId = () => `safety-${typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
const REVIEW_KEY = "gonggam_safety_reviews_v1";
function storeReview(review: SafetyReviewResult) { try { const previous: unknown = JSON.parse(localStorage.getItem(REVIEW_KEY) ?? "[]"); const list = Array.isArray(previous) ? previous : []; localStorage.setItem(REVIEW_KEY, JSON.stringify([review, ...list.filter((item) => (item as SafetyReviewResult).id !== review.id)].slice(0, 100))); } catch { /* Local safety review storage is best-effort. */ } }
const rules: ReadonlyArray<{ category: SafetyCategory; severity: SafetySeverity; pattern: RegExp; message: string }> = [
  { category: "personal_information", severity: "warning", pattern: /(?:\d{2,3}[-\s]?\d{3,4}[-\s]?\d{4}|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g, message: "나를 알아볼 수 있는 정보가 포함되어 있을 수 있어요." },
  { category: "external_contact", severity: "warning", pattern: /(카톡|카카오톡|인스타|연락처|전화번호).{0,14}(알려|보내|남겨|교환)/g, message: "앱 밖에서 연락하도록 권하는 표현이 포함되어 있을 수 있어요." },
  { category: "meeting_request", severity: "warning", pattern: /(만나자|직접 보자|어디 사는지|주소 알려)/g, message: "직접 만남이나 위치를 권하는 표현이 포함되어 있을 수 있어요." },
  { category: "harassment", severity: "warning", pattern: /(한심해|멍청해|네 탓이야|꺼져|죽어라)/g, message: "상대를 상처 입힐 수 있는 표현이 포함되어 있을 수 있어요." },
  { category: "sexual_content", severity: "warning", pattern: /(성관계|몸 사진|벗어)/g, message: "성적인 내용이 포함되어 있을 수 있어요." },
  { category: "self_harm_risk", severity: "high_risk", pattern: /(자해|나를 해칠|죽고 싶|목숨을 끊)/g, message: "지금은 편지보다 빠른 도움을 먼저 확인하는 것이 좋을 수 있어요." },
  { category: "violence_risk", severity: "high_risk", pattern: /(죽여|해치겠|폭력|칼로)/g, message: "지금은 편지보다 빠른 도움을 먼저 확인하는 것이 좋을 수 있어요." },
];

export function reviewSafety(content: string, targetType: "letter" | "reply", targetId: string): SafetyReviewResult {
  const matches: SafetyMatch[] = [];
  for (const rule of rules) for (const found of content.matchAll(rule.pattern)) matches.push({ category: rule.category, severity: rule.severity, matchedText: found[0], startIndex: found.index, endIndex: (found.index ?? 0) + found[0].length, message: rule.message });
  const severity: SafetySeverity = matches.some((match) => match.severity === "high_risk") ? "high_risk" : matches.length ? "warning" : "none";
  const review = { id: createId(), targetType, targetId, checkedAt: new Date().toISOString(), severity, categories: [...new Set(matches.map((match) => match.category))], matches, status: severity === "high_risk" ? "high_risk" : matches.length ? "needs_revision" : "clear", engine: "local_rules" as const, version: "local-rules-v1" };
  storeReview(review);
  return review;
}

export const reviewLetterSafety = (content: string, targetId: string) => reviewSafety(content, "letter", targetId);
export const reviewReplySafety = (content: string, targetId: string) => reviewSafety(content, "reply", targetId);
export const canSubmitLetter = (review: SafetyReviewResult) => review.status === "clear";
export const canSubmitReply = canSubmitLetter;
