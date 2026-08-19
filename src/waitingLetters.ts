import { isUserBlocked } from "./blocks";
import { isContentHidden } from "./contentVisibility";
import { getLetters, type Letter } from "./letters";
import { getLetterReturn } from "./letterReturns";
import { getReportForTarget } from "./reports";

const VIEWED_KEY = "gonggam_waiting_letters_viewed_v1";
const ORDER_KEY = "gonggam_waiting_letters_order_v1";

function sessionRead(key: string) { try { return window.sessionStorage.getItem(key); } catch { return null; } }
function sessionWrite(key: string, value: string) { try { window.sessionStorage.setItem(key, value); } catch { /* session ordering is optional */ } }
function viewedIds() { try { const value: unknown = JSON.parse(sessionRead(VIEWED_KEY) ?? "[]"); return Array.isArray(value) ? new Set(value.filter((id): id is string => typeof id === "string")) : new Set<string>(); } catch { return new Set<string>(); } }
function hash(value: string) { return [...value].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7); }

export function waitingLetterPreview(content: string, maxLength = 112) {
  const clean = content.replace(/\s+/g, " ").replace(/(?:\d{2,3}[-\s]?\d{3,4}[-\s]?\d{4}|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g, "•••").trim();
  return clean.length > maxLength ? `${clean.slice(0, maxLength)}…` : clean;
}

export function waitingLetterTimeText(value: string) {
  const hours = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 3_600_000));
  if (hours < 24) return "오늘 도착한 편지";
  if (hours < 48) return "어제 도착한 편지";
  return `${Math.floor(hours / 24)}일째 기다리는 편지`;
}

export function isAvailableWaitingLetter(letter: Letter, userId: string) {
  return !letter.isPrototypeFixture
    && letter.status === "waiting_for_reader"
    && !letter.assignedReaderId
    && !letter.reply
    && letter.senderId !== userId
    && !letter.withdrawnAt
    && !["high_risk", "needs_revision", "under_review", "blocked"].includes(letter.safetyStatus ?? "clear")
    && !["pending", "reviewing", "rejected"].includes(letter.moderationStatus ?? "not_required")
    && !isUserBlocked(userId, letter.senderId)
    && !isUserBlocked(letter.senderId, userId)
    && !isContentHidden(userId, "letter", letter.id)
    && !getReportForTarget(userId, "letter", letter.id)
    && !getLetterReturn(letter.id, userId);
}

export function getAvailableWaitingLetters(userId: string, refresh = 0) {
  const viewed = viewedIds(); const rotation = Number(sessionRead(ORDER_KEY) ?? "0") + refresh;
  return getLetters().filter((letter) => isAvailableWaitingLetter(letter, userId)).sort((left, right) => {
    const leftViewed = viewed.has(left.id) ? 1 : 0; const rightViewed = viewed.has(right.id) ? 1 : 0;
    if (leftViewed !== rightViewed) return leftViewed - rightViewed;
    const leftAge = Date.now() - new Date(left.createdAt).getTime(); const rightAge = Date.now() - new Date(right.createdAt).getTime();
    const leftScore = (hash(left.id) + rotation * 97) % 1000 - Math.min(700, Math.floor(leftAge / 3_600_000) * 8);
    const rightScore = (hash(right.id) + rotation * 97) % 1000 - Math.min(700, Math.floor(rightAge / 3_600_000) * 8);
    return leftScore - rightScore;
  });
}

export function markWaitingLetterViewed(letterId: string) { const next = viewedIds(); next.add(letterId); sessionWrite(VIEWED_KEY, JSON.stringify([...next].slice(-80))); }
export function refreshWaitingLetterOrder() { const next = Number(sessionRead(ORDER_KEY) ?? "0") + 1; sessionWrite(ORDER_KEY, String(next)); return next; }
