import { Letter } from "../types/letter";

export const mockWaitingLetters: Letter[] = [
  {
    id: "letter-001",
    senderId: "user-002",
    senderNickname: "달빛고양이",
    content:
      "오늘 하루도 너무 지쳐서 그냥 아무도 모르는 곳에 이 마음을 털어놓고 싶었어요. 가끔은 아무것도 아닌 사람이 되고 싶다는 생각이 드는데, 그게 도망이라는 걸 알면서도 멈출 수가 없어요.",
    sentAt: "2026-08-15T09:30:00.000Z",
    status: "waiting",
    isAnonymous: true,
    emotion: "loneliness",
  },
  {
    id: "letter-002",
    senderId: "user-003",
    senderNickname: "새벽별",
    content:
      "요즘 잠을 잘 못 자요. 눈을 감으면 별별 생각이 다 나서요. 내가 지금 잘 살고 있는 건지, 이 선택이 맞는 건지 자꾸 의심이 들어요. 누군가 그냥 괜찮다고 말해주면 좋겠는데.",
    sentAt: "2026-08-18T23:10:00.000Z",
    status: "waiting",
    isAnonymous: true,
    emotion: "anxiety",
  },
  {
    id: "letter-003",
    senderId: "user-004",
    senderNickname: "구름조각",
    content:
      "엄마한테 미안하다는 말을 못 했어요. 항상 투정만 부리고 짜증만 냈는데, 이제 와서 어떻게 말을 꺼내야 할지 모르겠어서요.",
    sentAt: "2026-08-20T14:55:00.000Z",
    status: "waiting",
    isAnonymous: true,
    emotion: "sadness",
  },
  {
    id: "letter-004",
    senderId: "user-005",
    senderNickname: "소나기향기",
    content:
      "오늘 오랜만에 혼자 카페에 갔어요. 창밖을 보며 커피 한 잔 마셨는데, 이상하게 눈물이 나려 했어요. 슬픈 것도 아닌데. 그냥 나를 위한 시간이 이렇게 낯설다는 게.",
    sentAt: "2026-08-22T11:20:00.000Z",
    status: "waiting",
    isAnonymous: true,
    emotion: "comfort",
  },
  {
    id: "letter-005",
    senderId: "user-006",
    senderNickname: "하늘바람",
    content:
      "취업 준비가 너무 힘들어요. 벌써 몇 달째인지. 포기하고 싶은데 포기하면 안 될 것 같고. 이 불안이 언제쯤 끝날지 모르겠어서 그냥 어딘가에 써 놓고 싶었어요.",
    sentAt: "2026-08-23T16:40:00.000Z",
    status: "waiting",
    isAnonymous: true,
    emotion: "anxiety",
  },
];

export const mockMailboxLetters: Letter[] = [
  {
    id: "letter-101",
    senderId: "user-007",
    senderNickname: "봄비소리",
    recipientId: "user-001",
    content:
      "당신의 편지를 읽고 많이 울었어요. 저도 비슷한 마음이었거든요. 혼자가 아니에요, 우리 같이 버텨요.",
    sentAt: "2026-08-21T08:15:00.000Z",
    status: "read",
    isAnonymous: true,
    emotion: "comfort",
  },
  {
    id: "letter-102",
    senderId: "user-008",
    senderNickname: "은하수",
    recipientId: "user-001",
    content:
      "당신이 쓴 말 중에 '그냥 괜찮다고 말해주면 좋겠다'는 부분이 마음에 걸렸어요. 괜찮아요. 정말로요.",
    sentAt: "2026-08-24T20:00:00.000Z",
    status: "replied",
    isAnonymous: true,
    emotion: "hope",
  },
];
