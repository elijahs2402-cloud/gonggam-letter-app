# 공감편지 (GonggamLetter)

익명 편지 공감 앱 — 낯선 사람에게 진심 어린 편지를 쓰고, 공감으로 연결되는 서비스

## 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite 5
- **라우팅**: react-router-dom v6
- **스타일링**: CSS Modules
- **모바일**: Capacitor 6

## 시작하기

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
  components/    # 재사용 가능한 UI 컴포넌트
  context/       # React Context (전역 상태)
  data/          # 목(Mock) 데이터
  pages/         # 페이지 컴포넌트
  routes/        # 라우팅 설정
  styles/        # 전역 CSS
  types/         # TypeScript 타입 정의
```

## 라우팅

| 경로 | 페이지 |
|------|--------|
| `/` | 온보딩 |
| `/terms` | 이용약관 동의 |
| `/anonymous-name` | 익명 닉네임 설정 |
| `/home` | 홈 |
| `/waiting-letters` | 대기 중인 편지 |
| `/write-letter` | 편지 쓰기 |
| `/mailbox` | 편지함 |
| `/my-space` | 내 공간 |

## 모바일 앱 빌드 (Capacitor)

```bash
npm run build
npx cap add android
npx cap add ios
npx cap sync
npx cap open android
npx cap open ios
```
