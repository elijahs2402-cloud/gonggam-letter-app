export type LetterStatus = "waiting" | "read" | "replied" | "sent";

export interface Letter {
  id: string;
  senderId: string;
  senderNickname: string;
  recipientId?: string;
  recipientNickname?: string;
  title?: string;
  content: string;
  sentAt: string; // ISO date string
  status: LetterStatus;
  isAnonymous: boolean;
  emotion?: LetterEmotion;
  replyId?: string;
}

export type LetterEmotion =
  | "comfort"
  | "loneliness"
  | "gratitude"
  | "anxiety"
  | "hope"
  | "sadness"
  | "joy";

export interface LetterReply {
  id: string;
  letterId: string;
  senderId: string;
  senderNickname: string;
  content: string;
  sentAt: string;
}

export interface WriteLetterInput {
  content: string;
  emotion?: LetterEmotion;
}
