export type ReplyDraft = {
  recipientName: string;
  replyBody: string;
  sourceLetterId: string;
  draftId: string;
  editedAt: string;
  cursorPosition?: number;
};

const REPLY_DRAFT_KEY = "gonggam-letter:reply-draft";

function createDraftId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `reply-${Date.now()}`;
}

export function readReplyDraft(): ReplyDraft | null {
  try {
    const stored = window.sessionStorage.getItem(REPLY_DRAFT_KEY);
    if (!stored) return null;

    const value = JSON.parse(stored) as Partial<ReplyDraft>;
    if (typeof value.replyBody !== "string" || typeof value.recipientName !== "string") {
      return null;
    }

    return {
      recipientName: value.recipientName,
      replyBody: value.replyBody,
      sourceLetterId: typeof value.sourceLetterId === "string" ? value.sourceLetterId : "sample-letter-001",
      draftId: typeof value.draftId === "string" ? value.draftId : createDraftId(),
      editedAt: typeof value.editedAt === "string" ? value.editedAt : new Date().toISOString(),
      cursorPosition: typeof value.cursorPosition === "number" ? value.cursorPosition : undefined,
    };
  } catch {
    return null;
  }
}

export function writeReplyDraft({
  replyBody,
  recipientName = "새벽구름",
  sourceLetterId = "sample-letter-001",
  cursorPosition,
}: {
  replyBody: string;
  recipientName?: string;
  sourceLetterId?: string;
  cursorPosition?: number;
}) {
  const previous = readReplyDraft();
  const next: ReplyDraft = {
    recipientName,
    replyBody,
    sourceLetterId,
    draftId: previous?.draftId ?? createDraftId(),
    editedAt: new Date().toISOString(),
    cursorPosition,
  };

  try {
    window.sessionStorage.setItem(REPLY_DRAFT_KEY, JSON.stringify(next));
  } catch {
    // The prototype remains usable when session storage is unavailable.
  }

  return next;
}

export function clearReplyDraft() {
  try {
    window.sessionStorage.removeItem(REPLY_DRAFT_KEY);
  } catch {
    // Ignore storage restrictions in file previews or private browser modes.
  }
}
