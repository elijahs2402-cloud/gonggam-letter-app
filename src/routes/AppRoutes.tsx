import { Routes, Route } from "react-router-dom";
import Onboarding from "../pages/Onboarding/Onboarding";
import TermsConsent from "../pages/TermsConsent/TermsConsent";
import AnonymousName from "../pages/AnonymousName/AnonymousName";
import Home from "../pages/Home/Home";
import WaitingLetters from "../pages/WaitingLetters/WaitingLetters";
import WriteLetter from "../pages/WriteLetter/WriteLetter";
import Mailbox from "../pages/Mailbox/Mailbox";
import MySpace from "../pages/MySpace/MySpace";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/terms" element={<TermsConsent />} />
      <Route path="/anonymous-name" element={<AnonymousName />} />
      <Route path="/home" element={<Home />} />
      <Route path="/waiting-letters" element={<WaitingLetters />} />
      <Route path="/write-letter" element={<WriteLetter />} />
      <Route path="/mailbox" element={<Mailbox />} />
      <Route path="/my-space" element={<MySpace />} />
    </Routes>
  );
}
