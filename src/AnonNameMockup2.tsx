import { useState } from "react";
import { generateAnonymousName } from "./mockAuth";
import { navigateTo } from "./navigation";

export function AnonNameMockup2Screen() {
  const [name, setName] = useState(() => generateAnonymousName());
  const [fading, setFading] = useState(false);

  const shuffle = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setName((prev) => generateAnonymousName(prev));
      setFading(false);
    }, 200);
  };

  const valid = Boolean(name.trim()) && name.trim().length <= 12;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: "100%",
      background: "#f5efe3",
      fontFamily: "Pretendard, 'Noto Sans KR', sans-serif",
      color: "#292522",
    }}>

      {/* 스크롤 영역 */}
      <div style={{
        flex: 1,
        padding: "max(56px, env(safe-area-inset-top)) 24px 40px",
        overflowY: "auto",
      }}>

        {/* 브랜드 */}
        <p style={{
          margin: "0 0 28px",
          fontFamily: '"Noto Serif KR", serif',
          fontSize: "11px",
          fontWeight: 700,
          color: "#73508d",
          letterSpacing: "0.08em",
        }}>공감편지</p>

        {/* 타이틀 */}
        <h1 style={{
          margin: "0 0 12px",
          fontFamily: '"Noto Serif KR", serif',
          fontSize: "28px",
          fontWeight: 500,
          lineHeight: 1.42,
          letterSpacing: "-0.065em",
          color: "#292522",
        }}>
          나를 부를 이름을<br />정해볼까요?
        </h1>
        <p style={{
          margin: "0 0 44px",
          fontSize: "13px",
          color: "#766c61",
          lineHeight: 1.65,
          letterSpacing: "-0.01em",
        }}>
          편지 속에서는 이 이름으로 서로를 불러요.
        </p>

        {/* ── 이름 표시 카드 ── */}
        <div style={{
          padding: "20px 20px 16px",
          marginBottom: "10px",
          border: "1px solid rgba(188,146,62,0.38)",
          borderRadius: "2px",
          background: "#fbf7ef",
        }}>
          <p style={{
            margin: "0 0 10px",
            fontSize: "10px",
            fontWeight: 600,
            color: "#9a8e81",
            letterSpacing: "0.08em",
          }}>추천 이름</p>

          {/* 이름 크게 */}
          <div style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(3px)" : "translateY(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            marginBottom: "14px",
          }}>
            <strong style={{
              display: "block",
              fontFamily: '"Noto Serif KR", serif',
              fontSize: "24px",
              fontWeight: 500,
              color: "#292522",
              letterSpacing: "-0.05em",
              lineHeight: 1.25,
            }}>{name}</strong>
          </div>

          {/* 이 이름 쓰기 + 다른 이름 */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => setName(name)}
              style={{
                flex: 1,
                minHeight: "38px",
                border: "1px solid rgba(78,52,94,0.45)",
                borderRadius: "1px",
                background: "rgba(78,52,94,0.07)",
                color: "#4e345e",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "Pretendard, sans-serif",
                cursor: "pointer",
              }}
            >
              이 이름 쓰기
            </button>
            <button
              type="button"
              onClick={shuffle}
              disabled={fading}
              style={{
                minHeight: "38px",
                padding: "0 14px",
                border: "1px solid rgba(41,37,34,0.18)",
                borderRadius: "1px",
                background: "transparent",
                color: "#766c61",
                fontSize: "12px",
                fontFamily: "Pretendard, sans-serif",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                opacity: fading ? 0.5 : 1,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "14px", lineHeight: 1 }}>↻</span>
              다른 이름
            </button>
          </div>
        </div>

        {/* 구분선 + 직접 입력 레이블 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "28px 0 18px",
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

        {/* ── 직접 입력 ── */}
        <div>
          <label
            htmlFor="anon-name-input-2"
            style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#4e345e",
              letterSpacing: "0.03em",
            }}
          >익명 닉네임</label>

          {/* input wrap */}
          <div style={{ position: "relative" }}>
            <input
              id="anon-name-input-2"
              type="text"
              value={name}
              maxLength={12}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 잔잔한 나무"
              style={{
                display: "block",
                width: "100%",
                height: "56px",
                padding: "0 48px 0 16px",
                border: "1px solid rgba(188,146,62,0.65)",
                borderRadius: "1px",
                outline: "none",
                background: "rgba(255,253,248,0.8)",
                color: "#292522",
                fontFamily: '"Noto Serif KR", serif',
                fontSize: "18px",
                fontWeight: 500,
                letterSpacing: "-0.05em",
                boxSizing: "border-box",
              }}
            />
            {name && (
              <button
                type="button"
                onClick={() => setName("")}
                aria-label="지우기"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  width: "28px",
                  height: "28px",
                  border: "none",
                  borderRadius: "50%",
                  background: "transparent",
                  color: "#9a8e81",
                  fontSize: "20px",
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >×</button>
            )}
          </div>

          {/* 메타 */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontSize: "11px",
            color: "#9a8e81",
          }}>
            <span>최대 12자까지 입력할 수 있어요.</span>
            <span style={{ color: name.length > 12 ? "#a8563d" : "#73508d", fontWeight: 700 }}>
              {name.length} / 12
            </span>
          </div>
        </div>

      </div>

      {/* ── 하단 버튼 ── */}
      <div style={{
        padding: "14px 24px max(24px, env(safe-area-inset-bottom))",
        borderTop: "1px solid rgba(188,146,62,0.22)",
        background: "rgba(245,239,227,0.97)",
      }}>
        <button
          type="button"
          disabled={!valid}
          onClick={() => navigateTo("/home")}
          style={{
            display: "block",
            width: "100%",
            minHeight: "52px",
            border: "none",
            borderRadius: "1px",
            background: valid ? "#4e345e" : "#d8cfc1",
            color: valid ? "#fff" : "#c4b6a7",
            fontFamily: "Pretendard, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            cursor: valid ? "pointer" : "default",
            transition: "background 0.15s",
          }}
        >
          이 이름으로 시작하기
        </button>
        <p style={{
          margin: "10px 0 0",
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
