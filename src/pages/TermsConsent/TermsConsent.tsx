import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./TermsConsent.module.css";

interface TermsSection {
  id: number;
  heading: string;
  body: string;
}

const termsSections: TermsSection[] = [
  {
    id: 1,
    heading: "이용약관 동의",
    body: "공감편지를 이용함으로써 본 이용약관에 동의하게 됩니다. 이용약관은 서비스 이용에 관한 기본적인 사항을 규정하며, 이용자와 운영자 간의 권리와 의무를 명확히 합니다.",
  },
  {
    id: 2,
    heading: "서비스 이용 방식",
    body: "공감편지는 익명으로 편지를 작성하고, 다른 사용자의 편지를 읽으며 답장을 보낼 수 있는 서비스입니다. 모든 편지는 익명으로 처리되어 개인 정보가 드러나지 않도록 보호됩니다.",
  },
  {
    id: 3,
    heading: "사용자 행동 규칙",
    body: "혐오 발언, 스팸, 타인의 개인정보 요구, 성적 수치심을 유발하는 내용, 폭력적이거나 위협적인 표현은 엄격히 금지됩니다. 이를 위반할 경우 서비스 이용이 제한될 수 있습니다.",
  },
  {
    id: 4,
    heading: "콘텐츠 안전검토 및 신고",
    body: "모든 편지는 자동화된 안전 시스템의 검토를 거칩니다. 부적절한 콘텐츠를 발견하면 신고 기능을 이용해 주세요. 신고된 콘텐츠는 운영팀이 검토 후 조치합니다.",
  },
  {
    id: 5,
    heading: "계정 및 콘텐츠 이용 제한",
    body: "이용약관을 반복적으로 위반하거나 다른 사용자에게 피해를 주는 경우, 사전 통보 없이 서비스 이용이 제한되거나 계정이 정지될 수 있습니다.",
  },
  {
    id: 6,
    heading: "서비스의 범위",
    body: "공감편지는 감정 공유와 소통을 위한 플랫폼입니다. 본 서비스는 의료 서비스, 심리치료, 또는 전문 상담을 대체하지 않습니다. 전문적인 도움이 필요하신 경우 전문가에게 문의하세요.",
  },
  {
    id: 7,
    heading: "이용 연령",
    body: "공감편지는 만 14세 이상의 사용자를 대상으로 합니다. 만 14세 미만의 경우 부모 또는 법정 대리인의 동의가 필요합니다. 연령 확인은 서비스 이용 시 진행될 수 있습니다.",
  },
];

export default function TermsConsent() {
  const navigate = useNavigate();
  const { agreeToTerms } = useAuth();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    agreeToTerms();
    navigate("/anonymous-name");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          type="button"
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h2 className={styles.headerTitle}>이용약관</h2>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.intro}>
          <p className={styles.introText}>
            공감편지를 시작하기 전에 아래 약관을 읽어보세요.
          </p>
        </div>

        <div className={styles.sectionList}>
          {termsSections.map((section) => (
            <div key={section.id} className={styles.section}>
              <h3 className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>{section.id}</span>
                {section.heading}
              </h3>
              <p className={styles.sectionBody}>{section.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.checkRow}>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className={styles.checkText}>
              위 약관을 모두 읽었으며 동의합니다
            </span>
          </label>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.agreeButton}
          onClick={handleAgree}
          disabled={!agreed}
          type="button"
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  );
}
