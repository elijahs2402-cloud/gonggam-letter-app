import { useEffect, useRef, useState } from "react";

export type DraftSaveState = "idle" | "saving" | "saved" | "error";

export function useDraftAutosave<T>(value: T, save: (value: T) => boolean, enabled = true) {
  const latest = useRef(value);
  const [state, setState] = useState<DraftSaveState>("idle");
  latest.current = value;

  const saveNow = () => {
    if (!enabled) return true;
    setState("saving");
    const saved = save(latest.current);
    setState(saved ? "saved" : "error");
    return saved;
  };

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(saveNow, 700);
    return () => window.clearTimeout(timer);
  }, [value, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const onVisibility = () => { if (document.visibilityState === "hidden") saveNow(); };
    const onBeforeUnload = () => { saveNow(); };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => { document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("beforeunload", onBeforeUnload); };
  }, [enabled]);

  return { state, saveNow };
}
