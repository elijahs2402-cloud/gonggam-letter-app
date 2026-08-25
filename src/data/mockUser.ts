import { User } from "../types/user";

export const mockUser: User = {
  id: "user-001",
  anonymousNickname: "달콤한고독",
  agreedToTerms: true,
  agreedAt: "2026-08-10T12:00:00.000Z",
  createdAt: "2026-08-10T12:00:00.000Z",
  lettersSent: 3,
  lettersReceived: 5,
  lettersReplied: 2,
};

export const ANONYMOUS_NICKNAME_POOL: string[] = [
  "달빛고양이",
  "새벽별",
  "구름조각",
  "소나기향기",
  "하늘바람",
  "봄비소리",
  "은하수",
  "이슬맺힘",
  "겨울나무",
  "모래시계",
  "그리운향",
  "파란노을",
  "별똥별",
  "잔잔한물결",
  "따뜻한손",
  "안개꽃길",
  "눈꽃송이",
  "아침이슬",
  "저녁노을",
  "바다내음",
];

export function pickRandomNickname(): string {
  const idx = Math.floor(Math.random() * ANONYMOUS_NICKNAME_POOL.length);
  return ANONYMOUS_NICKNAME_POOL[idx];
}
