/**
 * 익명 닉네임 입력 화면 — 3종 시안 갤러리 (이미지 확인용, 빌드 전)
 * 입력 필드 우선, 추천이름 카드/버튼 제거
 */

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div style={{
        width: "260px",
        height: "562px",
        borderRadius: "32px",
        border: "6px solid #292522",
        overflow: "hidden",
        boxShadow: "0 16px 48px rgba(41,37,34,0.22)",
        position: "relative",
        background: "#f5efe3",
        flexShrink: 0,
      }}>
        {children}
      </div>
      <span style={{
        fontFamily: "Pretendard, sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        color: "#766c61",
        letterSpacing: "0.06em",
      }}>{label}</span>
    </div>
  );
}

/* ─── 공통 색상 / 토큰 ─── */
const C = {
  bg: "#f5efe3",
  ink: "#292522",
  plum: "#4e345e",
  gold: "#bc923e",
  goldFaint: "rgba(188,146,62,0.3)",
  muted: "#766c61",
  faint: "#9a8e81",
  rule: "rgba(188,146,62,0.28)",
  inputBg: "rgba(255,253,248,0.85)",
};

const serif = '"Noto Serif KR", serif';
const sans = "Pretendard, sans-serif";

/* ─── 공통 헤더 ─── */
function MockHeader({ back = "←" }: { back?: string }) {
  return (
    <div style={{
      height: "52px",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${C.rule}`,
      flexShrink: 0,
    }}>
      <span style={{ fontFamily: serif, fontSize: "17px", color: C.plum, lineHeight: 1 }}>{back}</span>
      <span style={{ fontFamily: sans, fontSize: "11px", fontWeight: 600, color: C.muted }}>공감편지</span>
      <span style={{ width: "20px" }} />
    </div>
  );
}

/* ─── 시안 A: 입력 우선형 ─────────────────────────────────────── */
function ConceptA() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.bg }}>
      <MockHeader />

      {/* 스크롤 영역 */}
      <div style={{ flex: 1, padding: "28px 20px 20px", overflow: "hidden" }}>

        {/* 타이틀 */}
        <p style={{ margin: "0 0 10px", fontFamily: serif, fontSize: "8px", fontWeight: 700, color: C.plum, letterSpacing: "0.06em" }}>
          공감편지
        </p>
        <h1 style={{ margin: "0 0 8px", fontFamily: serif, fontSize: "18px", fontWeight: 500, lineHeight: 1.42, letterSpacing: "-0.06em", color: C.ink }}>
          나를 부를 이름을<br />정해볼까요?
        </h1>
        <p style={{ margin: "0 0 28px", fontFamily: sans, fontSize: "9px", color: C.muted, lineHeight: 1.6 }}>
          편지 속에서는 이 이름으로 서로를 불러요.
        </p>

        {/* 입력 필드 */}
        <label style={{ display: "block", marginBottom: "6px", fontFamily: sans, fontSize: "8px", fontWeight: 700, color: C.plum, letterSpacing: "0.04em" }}>
          익명 닉네임
        </label>
        <div style={{
          height: "44px",
          border: `1.5px solid ${C.plum}`,
          borderRadius: "1px",
          background: C.inputBg,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: "8px",
        }}>
          <span style={{ flex: 1, fontFamily: serif, fontSize: "14px", color: C.ink, letterSpacing: "-0.04em" }}>잔잔한 나무</span>
          <span style={{ fontFamily: sans, fontSize: "8px", color: C.faint }}>5 / 12</span>
        </div>

        {/* 안내 */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <span style={{ fontFamily: sans, fontSize: "7.5px", color: C.faint }}>닉네임은 편지를 보낼 때만 사용돼요.</span>
        </div>

        {/* 구분선 */}
        <div style={{ height: "1px", background: C.rule, margin: "22px 0 16px" }} />

        {/* 추천 이름 — 텍스트 링크 형태 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <span style={{ fontFamily: sans, fontSize: "8px", color: C.faint }}>이름이 떠오르지 않는다면</span>
          <span style={{
            fontFamily: sans, fontSize: "8px", fontWeight: 700,
            color: C.plum,
            borderBottom: `1px solid rgba(78,52,94,0.35)`,
            paddingBottom: "1px",
          }}>↻ 추천 이름 받기</span>
        </div>

        {/* 바텀 노트 */}
        <p style={{ margin: "28px 0 0", textAlign: "center", fontFamily: sans, fontSize: "7.5px", color: C.faint }}>
          언제든 나의 공간에서 바꿀 수 있어요.
        </p>
      </div>

      {/* 하단 버튼 */}
      <div style={{
        padding: "10px 20px 16px",
        borderTop: `1px solid rgba(188,146,62,0.22)`,
        background: "rgba(245,239,227,0.97)",
      }}>
        <div style={{
          height: "40px",
          borderRadius: "1px",
          background: C.plum,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontFamily: sans, fontSize: "11px", fontWeight: 700, color: "#fff" }}>이 이름으로 시작하기</span>
        </div>
      </div>
    </div>
  );
}

/* ─── 시안 B: 추천 이름 칩 방식 ─────────────────────────────────── */
function ConceptB() {
  const chips = ["봄빛 한 줌", "조용한 오후", "새벽 안개"];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.bg }}>
      <MockHeader />

      <div style={{ flex: 1, padding: "28px 20px 20px", overflow: "hidden" }}>

        <p style={{ margin: "0 0 10px", fontFamily: serif, fontSize: "8px", fontWeight: 700, color: C.plum, letterSpacing: "0.06em" }}>
          공감편지
        </p>
        <h1 style={{ margin: "0 0 8px", fontFamily: serif, fontSize: "18px", fontWeight: 500, lineHeight: 1.42, letterSpacing: "-0.06em", color: C.ink }}>
          나를 부를 이름을<br />정해볼까요?
        </h1>
        <p style={{ margin: "0 0 28px", fontFamily: sans, fontSize: "9px", color: C.muted, lineHeight: 1.6 }}>
          편지 속에서는 이 이름으로 서로를 불러요.
        </p>

        {/* 입력 필드 */}
        <label style={{ display: "block", marginBottom: "6px", fontFamily: sans, fontSize: "8px", fontWeight: 700, color: C.plum, letterSpacing: "0.04em" }}>
          익명 닉네임
        </label>
        <div style={{
          height: "44px",
          border: `1.5px solid ${C.plum}`,
          borderRadius: "1px",
          background: C.inputBg,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
        }}>
          <span style={{ flex: 1, fontFamily: serif, fontSize: "14px", color: C.ink, letterSpacing: "-0.04em" }}>잔잔한 나무</span>
          <span style={{ fontFamily: sans, fontSize: "8px", color: C.faint }}>5 / 12</span>
        </div>
        <span style={{ display: "block", marginTop: "5px", fontFamily: sans, fontSize: "7.5px", color: C.faint }}>닉네임은 편지를 보낼 때만 사용돼요.</span>

        {/* 추천 이름 칩 섹션 */}
        <div style={{ marginTop: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontFamily: sans, fontSize: "8px", fontWeight: 600, color: C.faint, letterSpacing: "0.06em" }}>추천 이름</span>
            <span style={{ fontFamily: sans, fontSize: "8px", color: C.plum, display: "flex", alignItems: "center", gap: "3px" }}>
              <span>↻</span> <span style={{ borderBottom: `1px solid rgba(78,52,94,0.3)` }}>다시 추천</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {chips.map((chip, i) => (
              <div key={chip} style={{
                padding: "6px 12px",
                border: i === 0
                  ? `1px solid rgba(78,52,94,0.55)`
                  : `1px solid rgba(188,146,62,0.4)`,
                borderRadius: "20px",
                background: i === 0 ? "rgba(78,52,94,0.07)" : "transparent",
                fontFamily: serif,
                fontSize: "9.5px",
                color: i === 0 ? C.plum : C.muted,
                letterSpacing: "-0.03em",
              }}>
                {chip}
              </div>
            ))}
          </div>
        </div>

        <p style={{ margin: "26px 0 0", textAlign: "center", fontFamily: sans, fontSize: "7.5px", color: C.faint }}>
          언제든 나의 공간에서 바꿀 수 있어요.
        </p>
      </div>

      <div style={{
        padding: "10px 20px 16px",
        borderTop: "1px solid rgba(188,146,62,0.22)",
        background: "rgba(245,239,227,0.97)",
      }}>
        <div style={{
          height: "40px",
          borderRadius: "1px",
          background: C.plum,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontFamily: sans, fontSize: "11px", fontWeight: 700, color: "#fff" }}>이 이름으로 시작하기</span>
        </div>
      </div>
    </div>
  );
}

/* ─── 시안 C: 편지지 스타일 ─────────────────────────────────────── */
function ConceptC() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.bg }}>
      <MockHeader />

      <div style={{ flex: 1, padding: "28px 20px 20px", overflow: "hidden" }}>

        <p style={{ margin: "0 0 10px", fontFamily: serif, fontSize: "8px", fontWeight: 700, color: C.plum, letterSpacing: "0.06em" }}>
          공감편지
        </p>
        <h1 style={{ margin: "0 0 8px", fontFamily: serif, fontSize: "18px", fontWeight: 500, lineHeight: 1.42, letterSpacing: "-0.06em", color: C.ink }}>
          나를 부를 이름을<br />정해볼까요?
        </h1>
        <p style={{ margin: "0 0 32px", fontFamily: sans, fontSize: "9px", color: C.muted, lineHeight: 1.6 }}>
          편지 속에서는 이 이름으로 서로를 불러요.
        </p>

        {/* 편지지 스타일 입력 영역 */}
        <div style={{
          padding: "18px 16px 16px",
          background: "#fdfaf4",
          border: `1px solid ${C.goldFaint}`,
          borderRadius: "2px",
          position: "relative",
        }}>
          {/* 상단 가로줄 장식 */}
          <div style={{ position: "absolute", top: "10px", left: "12px", right: "12px", height: "1px", background: C.rule }} />

          {/* 레이블 */}
          <label style={{
            display: "block",
            marginBottom: "10px",
            fontFamily: sans,
            fontSize: "7.5px",
            fontWeight: 700,
            color: C.plum,
            letterSpacing: "0.08em",
          }}>
            보내는 이
          </label>

          {/* 밑줄 스타일 입력 */}
          <div style={{
            borderBottom: `1.5px solid ${C.plum}`,
            paddingBottom: "8px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}>
            <span style={{
              fontFamily: serif,
              fontSize: "20px",
              fontWeight: 400,
              color: C.ink,
              letterSpacing: "-0.05em",
              flex: 1,
            }}>잔잔한 나무</span>
            <span style={{ fontFamily: sans, fontSize: "7.5px", color: C.faint }}>5 / 12</span>
          </div>

          {/* 안내 + 추천 버튼 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{ fontFamily: sans, fontSize: "7.5px", color: C.faint }}>닉네임은 편지를 보낼 때만 사용돼요.</span>
            <button style={{
              border: "none",
              background: "transparent",
              padding: "0",
              fontFamily: sans,
              fontSize: "7.5px",
              color: C.plum,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}>
              <span>↻</span> 다른 이름
            </button>
          </div>
        </div>

        {/* 추천 이름 표시 (작게) */}
        <div style={{
          marginTop: "12px",
          padding: "8px 12px",
          background: "rgba(78,52,94,0.05)",
          border: `1px solid rgba(78,52,94,0.12)`,
          borderRadius: "1px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <span style={{ fontFamily: sans, fontSize: "7.5px", color: C.faint }}>추천</span>
          <span style={{ fontFamily: serif, fontSize: "11px", color: C.muted, letterSpacing: "-0.04em" }}>봄빛 한 줌</span>
          <span style={{ fontFamily: sans, fontSize: "7.5px", color: C.faint, marginLeft: "auto" }}>탭하여 적용</span>
        </div>

        <p style={{ margin: "26px 0 0", textAlign: "center", fontFamily: sans, fontSize: "7.5px", color: C.faint }}>
          언제든 나의 공간에서 바꿀 수 있어요.
        </p>
      </div>

      <div style={{
        padding: "10px 20px 16px",
        borderTop: "1px solid rgba(188,146,62,0.22)",
        background: "rgba(245,239,227,0.97)",
      }}>
        <div style={{
          height: "40px",
          borderRadius: "1px",
          background: C.plum,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontFamily: sans, fontSize: "11px", fontWeight: 700, color: "#fff" }}>이 이름으로 시작하기</span>
        </div>
      </div>
    </div>
  );
}

/* ─── 갤러리 페이지 ─────────────────────────────────────────────── */
export function AnonNameConceptsScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ede7da",
      padding: "40px 24px 56px",
      fontFamily: sans,
    }}>
      {/* 페이지 헤더 */}
      <div style={{ marginBottom: "36px" }}>
        <p style={{
          margin: "0 0 6px",
          fontFamily: serif,
          fontSize: "10px",
          fontWeight: 700,
          color: C.plum,
          letterSpacing: "0.08em",
        }}>공감편지 · 시안</p>
        <h1 style={{
          margin: "0 0 6px",
          fontFamily: serif,
          fontSize: "22px",
          fontWeight: 500,
          letterSpacing: "-0.06em",
          color: C.ink,
        }}>익명 닉네임 입력 화면</h1>
        <p style={{ margin: 0, fontSize: "11px", color: C.muted }}>입력 필드 우선 · 3종 방향 검토</p>
      </div>

      {/* 3종 시안 */}
      <div style={{
        display: "flex",
        gap: "28px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        <PhoneFrame label="시안 A — 입력 우선형">
          <ConceptA />
        </PhoneFrame>
        <PhoneFrame label="시안 B — 추천 칩 방식">
          <ConceptB />
        </PhoneFrame>
        <PhoneFrame label="시안 C — 편지지 스타일">
          <ConceptC />
        </PhoneFrame>
      </div>

      {/* 방향 설명 */}
      <div style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "32px",
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        {[
          { label: "시안 A", desc: "입력 필드 단독 강조. 추천 이름은 텍스트 링크로 최소화. 가장 단정하고 단순." },
          { label: "시안 B", desc: "추천 이름을 칩(태그)으로 제공. 탭하면 입력 필드에 적용. 직관적 선택." },
          { label: "시안 C", desc: "편지지 느낌의 밑줄 입력. 추천 이름은 하단에 조용히 제시. 앱 분위기와 가장 가까운 질감." },
        ].map((item) => (
          <div key={item.label} style={{
            flex: "1 1 220px",
            maxWidth: "260px",
            padding: "14px 16px",
            background: "rgba(255,253,248,0.7)",
            border: `1px solid rgba(188,146,62,0.3)`,
            borderRadius: "2px",
          }}>
            <p style={{ margin: "0 0 5px", fontFamily: serif, fontSize: "11px", fontWeight: 700, color: C.plum }}>{item.label}</p>
            <p style={{ margin: 0, fontSize: "11px", color: C.muted, lineHeight: 1.65 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
