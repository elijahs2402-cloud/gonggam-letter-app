import { getReplyDraftsByWriter } from "./letterDraft";
import { getLetterDraft } from "./letterDraft";
import { getOpenDeliveryIssues, type DeliveryIssue } from "./deliveryIssues";
import { isLetterDelayEligible } from "./letterStatus";
import { getLetters, getMyLetters, getUnreadReplyLettersByUser, type Letter } from "./letters";

export type MailboxAttentionReason = "safety-review" | "unread-replies" | "delivery-failure" | "delayed-letters" | "assigned-letter" | "reply-draft" | "letter-draft";

export type MailboxAttention = {
  reasons: MailboxAttentionReason[];
  unreadReplies: Letter[];
  delayedLetters: Letter[];
  assignedLetters: Letter[];
  replyDraftLetterIds: string[];
  hasLetterDraft: boolean;
  safetyNeedsReview: boolean;
  deliveryIssues: DeliveryIssue[];
};

export function getDelayedLettersByUser(userId: string) {
  return getMyLetters(userId).filter((letter) => isLetterDelayEligible(letter));
}

export function getMailboxAttention(userId: string, hasLetterDraft = false): MailboxAttention {
  const unreadReplies = getUnreadReplyLettersByUser(userId);
  const delayedLetters = getDelayedLettersByUser(userId);
  const assignedLetters = getLetters().filter((letter) => letter.assignedReaderId === userId && ["assigned", "read", "waiting_for_reply"].includes(letter.status));
  const replyDraftLetterIds = getReplyDraftsByWriter(userId)
    .filter((draft) => draft.content.trim() && assignedLetters.some((letter) => letter.id === draft.letterId))
    .map((draft) => draft.letterId);
  const allReplyDrafts = getReplyDraftsByWriter(userId);
  const safetyNeedsReview = getLetterDraft(userId)?.lastSafetyStatus === "high_risk" || allReplyDrafts.some((draft) => draft.lastSafetyStatus === "high_risk");
  const deliveryIssues = getOpenDeliveryIssues(userId);
  const reasons: MailboxAttentionReason[] = [];
  if (safetyNeedsReview) reasons.push("safety-review");
  if (unreadReplies.length) reasons.push("unread-replies");
  if (deliveryIssues.length) reasons.push("delivery-failure");
  if (delayedLetters.length) reasons.push("delayed-letters");
  if (assignedLetters.some((letter) => !replyDraftLetterIds.includes(letter.id))) reasons.push("assigned-letter");
  if (replyDraftLetterIds.length) reasons.push("reply-draft");
  if (hasLetterDraft) reasons.push("letter-draft");
  return { reasons, unreadReplies, delayedLetters, assignedLetters, replyDraftLetterIds, hasLetterDraft, safetyNeedsReview, deliveryIssues };
}

export function hasMailboxAttention(userId: string, hasLetterDraft = false) {
  return getMailboxAttention(userId, hasLetterDraft).reasons.length > 0;
}
