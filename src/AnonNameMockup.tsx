import { useState, useEffect } from "react";
import { generateAnonymousName } from "./mockAuth";
import { navigateTo } from "./navigation";

export function AnonNameMockupScreen() {
  const [name, setName] = useState(() => generateAnonymousName());
  const [fading, setFading] = useState(false);
  const [started, setStarted] = useState(false);

  const shuffle = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setName((prev) => generateAnonymousName(prev));
      setFading(false);
    }, 220);
  };

  const confirm = () => {
    setStarted(true);
    setTimeout(() => navigateTo("/home"), 1600);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: "100%",
      background: "#f5efe3",
      color: "#292522",
      fontFamily: "Pretendard, 'Noto Sans KR', sans-serif",
    }}>

      {/* 헤더 */}
      <div style={{ padding: "max(52px, env(safe-area-inset-top)) 24px 0" }}>
        <p style={{
          margin: "0 0 32px",
          fontFamily: '"Noto Serif KR", serif',
          fontSize: "11px",
          fontWeight: 700,
          color: "#73508d",
          letterSpacing: "0.08em",
        }}>공감편지</p>

        <h1 style={{
          margin: "0 0 10px",
          fontFamily: '"Noto Serif KR", serif',
          fontSize: "28px",
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: "-0.06em",
          color: "#292522",
        }}>
          나를 부를 이름을<br />정해볼까요?
        </h1>
        <p style={{
          margin: 0,
          fontSize: "13px",
          color: "#766c61",
          lineHeight: 1.65,
        }}>
          편지 속에서는 이 이름으로 서로를 불러요.
        </p>
      </div>

      {/* 편지 미리보기 카드 */}
      <div style={{ flex: 1, padding: "36px 24px 0" }}>

        {/* 안내 레이블 */}
        <p style={{
          margin: "0 0 12px",
          fontSize: "10px",
          fontWeight: 600,
          color: "#9a8e81",
          letterSpacing: "0.08em",
        }}>편지에서 이렇게 보여요</p>

        {/* 편지 페이퍼 카드 */}
        <div style={{
          border: "1px solid rgba(188,146,62,0.42)",
          borderRadius: "2px",
          background: "#fbf7ef",
          boxShadow: "0 2px 12px rgba(41,37,34,0.07)",
          overflow: "hidden",
        }}>
          {/* 편지 상단 — 이름 표시 영역 */}
          <div style={{
            padding: "24px 22px 20px",
            borderBottom: "1px solid rgba(188,146,62,0.25)",
          }}>
            <p style={{
              margin: "0 0 14px",
              fontSize: "10px",
              color: "#9a8e81",
              letterSpacing: "0.04em",
            }}>보낸 사람</p>

            {/* 이름 — 크게 */}
            <div style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(4px)" : "translateY(0)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}>
              <strong style={{
                display: "block",
                fontFamily: '"Noto Serif KR", serif',
                fontSize: "26px",
                fontWeight: 500,
                color: "#292522",
                letterSpacing: "-0.05em",
                lineHeight: 1.2,
              }}>{name}</strong>
              <span style={{
                display: "block",
                marginTop: "6px",
                fontSize: "12px",
                color: "#9c7c3d",
                fontFamily: '"Noto Serif KR", serif',
                letterSpacing: "-0.02em",
              }}>님이 보낸 편지</span>
            </div>
          </div>

          {/* 편지 본문 미리보기 — 흐림 처리 */}
          <div style={{ padding: "18px 22px 22px" }}>
            <div style={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: "14px",
              lineHeight: 1.9,
              color: "rgba(41,37,34,0.22)",
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}>
              <div style={{ height: "14px", background: "rgba(41,37,34,0.08)", borderRadius: "2px", marginBottom: "10px" }} />
              <div style={{ height: "14px", background: "rgba(41,37,34,0.06)", borderRadius: "2px", marginBottom: "10px", width: "85%" }} />
              <div style={{ height: "14px", background: "rgba(41,37,34,0.06)", borderRadius: "2px", marginBottom: "10px" }} />
              <div style={{ height: "14px", background: "rgba(41,37,34,0.05)", borderRadius: "2px", width: "60%" }} />
            </div>
          </div>
        </div>

        {/* 이름 바꾸기 버튼 */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button
            type="button"
            onClick={shuffle}
            disabled={fading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              border: "1px solid rgba(78,52,94,0.3)",
              borderRadius: "2px",
              background: "transparent",
              color: "#4e345e",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "Pretendard, sans-serif",
              cursor: "pointer",
              opacity: fading ? 0.5 : 1,
              transition: "opacity 0.15s",
            }}
          >
            <span style={{ fontSize: "15px", lineHeight: 1 }}>↻</span>
            다른 이름 받기
          </button>
        </div>

        {/* 직접 입력 안내 */}
        <p style={{
          margin: "20px 0 0",
          textAlign: "center",
          fontSize: "11px",
          color: "#9a8e81",
        }}>
          원하는 이름이 없으면{" "}
          <button
            type="button"
            style={{
              border: "none",
              background: "none",
              padding: 0,
              color: "#73508d",
              fontSize: "11px",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              cursor: "pointer",
            }}
          >
            직접 입력
          </button>
          할 수 있어요.
        </p>
      </div>

      {/* 하단 버튼 */}
      <div style={{
        padding: "16px 24px max(24px, env(safe-area-inset-bottom))",
        borderTop: "1px solid rgba(188,146,62,0.22)",
        background: "rgba(246,240,229,0.95)",
      }}>
        {started ? (
          <div style={{
            textAlign: "center",
            padding: "12px 0",
            fontFamily: '"Noto Serif KR", serif',
            fontSize: "16px",
            color: "#4e345e",
            letterSpacing: "-0.04em",
          }}>
            <strong>{name}</strong>님, 반가워요.
          </div>
        ) : (
          <button
            type="button"
            onClick={confirm}
            style={{
              display: "block",
              width: "100%",
              minHeight: "52px",
              border: "none",
              borderRadius: "1px",
              background: "#4e345e",
              color: "#fff",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.01em",
              cursor: "pointer",
            }}
          >
            이 이름으로 시작하기
          </button>
        )}
        <p style={{
          margin: "12px 0 0",
          textAlign: "center",
          fontSize: "11px",
          color: "#9a8e81",
        }}>
          언제든 나의 공간에서 바꿀 수 있어요.
        </p>
      </div>
    </div>
  );
}
