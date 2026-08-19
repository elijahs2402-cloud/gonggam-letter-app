import type { ReplyDraft } from "./replyDraft";

const LETTER_PREVIEW_DRAFT_KEY = "gonggam-letter-preview-draft";

function getStorage() {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function readLetterPreviewDraft(): ReplyDraft | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const value = storage.getItem(LETTER_PREVIEW_DRAFT_KEY);
    if (!value) return null;
    const draft = JSON.parse(value) as Partial<ReplyDraft>;
    if (typeof draft.replyBody !== "string") return null;

    return {
      replyBody: draft.replyBody,
      recipientName: typeof draft.recipientName === "string" ? draft.recipientName : "새벽구름",
      sourceLetterId: typeof draft.sourceLetterId === "string" ? draft.sourceLetterId : "emotion-letter",
      draftId: typeof draft.draftId === "string" ? draft.draftId : "letter-preview",
      editedAt: typeof draft.editedAt === "string" ? draft.editedAt : new Date().toISOString(),
      cursorPosition: typeof draft.cursorPosition === "number" ? draft.cursorPosition : draft.replyBody.length,
    };
  } catch {
    return null;
  }
}

export function writeLetterPreviewDraft({
  title,
  body,
  anonymousName,
}: {
  title: string;
  body: string;
  anonymousName: string;
}) {
  const storage = getStorage();
  if (!storage) return;

  const draft: ReplyDraft = {
    recipientName: anonymousName.trim() || "새벽구름",
    replyBody: body,
    sourceLetterId: "emotion-letter",
    draftId: "letter-preview",
    editedAt: new Date().toISOString(),
    cursorPosition: body.length,
  };

  storage.setItem(LETTER_PREVIEW_DRAFT_KEY, JSON.stringify({ ...draft, title }));
}

export function clearLetterPreviewDraft() {
  getStorage()?.removeItem(LETTER_PREVIEW_DRAFT_KEY);
}
