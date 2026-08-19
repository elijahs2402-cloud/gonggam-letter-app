import { useState } from "react";
import { generateAnonymousName } from "./mockAuth";
import { navigateTo, navigateBack } from "./navigation";

export function AnonNameMockup3Screen() {
  const [suggested, setSuggested] = useState(() => generateAnonymousName());
  const [custom, setCustom] = useState("");
  const [mode, setMode] = useState<"suggested" | "custom">("suggested");
  const [shuffling, setShuffling] = useState(false);

  const activeName = mode === "custom" ? custom : suggested;
  const valid = activeName.trim().length > 0 && activeName.trim().length <= 12;

  const shuffle = () => {
    if (shuffling) return;
    setShuffling(true);
    setTimeout(() => {
      setSuggested((prev) => generateAnonymousName(prev));
      setMode("suggested");
      setShuffling(false);
    }, 220);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustom(e.target.value);
    setMode("custom");
  };

  const handleCustomFocus = () => {
    setMode("custom");
  };

  return (
    <main className="mobile-prototype auth-screen anonymous-name-screen">

      {/* 상단 네비게이션 */}
      <header className="auth-header">
        <button type="button" onClick={() => navigateBack("/terms-consent")} aria-label="이전 화면으로 돌아가기">←</button>
        <span>공감편지</span>
        <i aria-hidden="true" />
      </header>

      {/* 스크롤 영역 */}
      <div className="auth-scroll">
        <section className="auth-intro-copy auth-intro-copy--name">
          <p>공감편지</p>
          <h1>나를 부를 이름을<br />정해볼까요?</h1>
          <p className="auth-helper anonymous-name-intro-helper">편지 속에서는 이 이름으로 서로를 불러요.</p>
        </section>

        {/* ── 이름 봉인 카드 ── */}
        <div style={{
          position: "relative",
          margin: "32px 0 0",
          padding: "36px 24px 32px",
          background: "#fdfaf4",
          border: "1px solid rgba(188,146,62,0.45)",
          borderRadius: "2px",
          textAlign: "center",
        }}>
          {/* 상단 장식 선 */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "16px",
            right: "16px",
            height: "1px",
            background: "rgba(188,146,62,0.25)",
          }} />

          {/* 장식 심볼 */}
          <p style={{
            margin: "0 0 18px",
            fontFamily: '"Noto Serif KR", serif',
            fontSize: "10px",
            fontWeight: 700,
            color: "#bc923e",
            letterSpacing: "0.2em",
          }}>✦ 추천 이름 ✦</p>

          {/* 이름 크게 */}
          <div style={{
            opacity: shuffling ? 0 : 1,
            transform: shuffling ? "scale(0.96)" : "scale(1)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            minHeight: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <strong style={{
              display: "block",
              fontFamily: '"Noto Serif KR", serif',
              fontSize: "28px",
              fontWeight: 500,
              color: mode === "suggested" ? "#292522" : "#b8a898",
              letterSpacing: "-0.06em",
              lineHeight: 1.3,
            }}>
              {suggested}
            </strong>
          </div>

          {/* 하단 장식 선 */}
          <div style={{
            margin: "20px 0 18px",
            height: "1px",
            background: "rgba(188,146,62,0.25)",
          }} />

          {/* 이 이름 선택 버튼 */}
          <button
            type="button"
            onClick={() => { setMode("suggested"); setCustom(""); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 20px",
              border: mode === "suggested"
                ? "1px solid rgba(78,52,94,0.6)"
                : "1px solid rgba(41,37,34,0.18)",
              borderRadius: "1px",
              background: mode === "suggested" ? "rgba(78,52,94,0.08)" : "transparent",
              color: mode === "suggested" ? "#4e345e" : "#9a8e81",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "12px",
              fontWeight: mode === "suggested" ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {mode === "suggested" && (
              <span style={{ fontSize: "10px", color: "#4e345e" }}>✓</span>
            )}
            이 이름 쓰기
          </button>
        </div>

        {/* 다른 이름 추천 버튼 */}
        <button
          type="button"
          onClick={shuffle}
          disabled={shuffling}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            marginTop: "10px",
            padding: "11px 0",
            border: "1px solid rgba(188,146,62,0.35)",
            borderRadius: "1px",
            background: "transparent",
            color: "#766c61",
            fontFamily: "Pretendard, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            cursor: shuffling ? "default" : "pointer",
            opacity: shuffling ? 0.5 : 1,
            transition: "opacity 0.15s",
          }}
        >
          <span style={{
            display: "inline-block",
            fontSize: "15px",
            lineHeight: 1,
            transform: shuffling ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease",
          }}>↻</span>
          다른 이름 추천받기
        </button>

        {/* 구분선 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "28px 0 20px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(188,146,62,0.28)" }} />
          <span style={{
            fontSize: "10px",
            color: "#9a8e81",
            fontWeight: 500,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}>또는 직접 입력</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(188,146,62,0.28)" }} />
        </div>

        {/* ── 직접 입력 필드 ── */}
        <div>
          <label
            htmlFor="anon-name-input-3"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "11px",
              fontWeight: 700,
              color: mode === "custom" ? "#4e345e" : "#9a8e81",
              letterSpacing: "0.03em",
              transition: "color 0.15s",
            }}
          >
            익명 닉네임
          </label>

          <div style={{ position: "relative" }}>
            <input
              id="anon-name-input-3"
              type="text"
              value={custom}
              maxLength={12}
              onChange={handleCustomChange}
              onFocus={handleCustomFocus}
              placeholder="예: 잔잔한 나무"
              style={{
                display: "block",
                width: "100%",
                height: "52px",
                padding: "0 48px 0 16px",
                border: mode === "custom"
                  ? "1px solid rgba(78,52,94,0.55)"
                  : "1px solid rgba(188,146,62,0.45)",
                borderRadius: "1px",
                outline: "none",
                background: mode === "custom" ? "rgba(78,52,94,0.03)" : "rgba(255,253,248,0.7)",
                color: "#292522",
                fontFamily: '"Noto Serif KR", serif',
                fontSize: "17px",
                fontWeight: 400,
                letterSpacing: "-0.04em",
                boxSizing: "border-box",
                transition: "border-color 0.15s, background 0.15s",
              }}
            />
            {custom && (
              <button
                type="button"
                onClick={() => { setCustom(""); setMode("suggested"); }}
                aria-label="지우기"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  width: "26px",
                  height: "26px",
                  border: "none",
                  background: "transparent",
                  color: "#9a8e81",
                  fontSize: "18px",
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >×</button>
            )}
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "7px",
            fontSize: "11px",
            color: "#9a8e81",
          }}>
            <span>닉네임은 편지를 보낼 때만 사용돼요.</span>
            <span style={{
              color: custom.length > 12 ? "#a8563d" : mode === "custom" ? "#73508d" : "#9a8e81",
              fontWeight: 600,
            }}>
              {custom.length} / 12
            </span>
          </div>
        </div>

        {/* 안내 문구 */}
        <p style={{
          margin: "24px 0 0",
          textAlign: "center",
          fontSize: "11px",
          color: "#b0a496",
          letterSpacing: "-0.01em",
        }}>
          언제든 나의 공간에서 바꿀 수 있어요.
        </p>
      </div>

      {/* 하단 버튼 */}
      <footer className="auth-actions">
        <button
          type="button"
          className={valid ? "auth-primary" : "auth-primary"}
          disabled={!valid}
          onClick={() => navigateTo("/home")}
          style={{
            opacity: valid ? 1 : 0.45,
            cursor: valid ? "pointer" : "default",
          }}
        >
          이 이름으로 시작하기
        </button>
      </footer>
    </main>
  );
}
