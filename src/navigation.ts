export function getCurrentAppPath() {
  if (window.location.protocol === "file:") {
    const hashRoute = window.location.hash.replace(/^#/, "").split("?")[0];
    return hashRoute.replace(/\/$/, "") || "/intro";
  }

  return window.location.pathname.replace(/\/$/, "") || "/intro";
}

export function getCurrentAppSearchParams() {
  if (window.location.protocol === "file:") {
    const query = window.location.hash.split("?")[1] ?? "";
    return new URLSearchParams(query);
  }

  return new URLSearchParams(window.location.search);
}

let isPageNavigationInProgress = false;
let pageNavigationTimer: number | null = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getCurrentPage() {
  return document.querySelector<HTMLElement>(".mobile-prototype");
}

function getExitDuration(page: HTMLElement | null) {
  if (!page || prefersReducedMotion()) return 0;

  const duration = Number.parseFloat(
    window.getComputedStyle(page).getPropertyValue("--page-exit-duration"),
  );

  return Number.isFinite(duration) ? duration : 180;
}

function resetPageTransition() {
  isPageNavigationInProgress = false;
  if (pageNavigationTimer !== null) {
    window.clearTimeout(pageNavigationTimer);
    pageNavigationTimer = null;
  }

  const page = getCurrentPage();
  page?.classList.remove("is-page-leaving");
  page?.removeAttribute("aria-busy");
}

function leavePage(complete: () => void) {
  if (isPageNavigationInProgress) return;

  isPageNavigationInProgress = true;
  const page = getCurrentPage();
  const exitDuration = getExitDuration(page);

  if (!page || exitDuration === 0) {
    complete();
    return;
  }

  page.classList.add("is-page-leaving");
  page.setAttribute("aria-busy", "true");
  pageNavigationTimer = window.setTimeout(complete, exitDuration);
}

function isCurrentDestination(path: string) {
  if (window.location.protocol === "file:") {
    return window.location.hash.replace(/^#/, "") === path;
  }

  const destination = new URL(path, window.location.origin);
  return destination.pathname === window.location.pathname && destination.search === window.location.search;
}

function canGoBackInApp() {
  return (
    document.referrer !== "" &&
    new URL(document.referrer).origin === window.location.origin &&
    window.history.length > 1
  );
}

window.addEventListener("pageshow", resetPageTransition);

export function navigateTo(path: string) {
  if (isPageNavigationInProgress || isCurrentDestination(path)) return;

  leavePage(() => {
    if (window.location.protocol === "file:") {
      window.location.hash = path;
      window.location.reload();
      return;
    }

    window.location.href = path;
  });
}

export function replaceRoute(path: string) {
  if (isCurrentDestination(path)) return;

  if (window.location.protocol === "file:") {
    window.location.hash = path;
    window.location.reload();
    return;
  }

  window.location.replace(path);
}

export function navigateBack(fallbackPath: string) {
  if (isPageNavigationInProgress) return;

  if (!canGoBackInApp()) {
    navigateTo(fallbackPath);
    return;
  }

  leavePage(() => window.history.back());
}

export function replaceAppState(state: string) {
  if (window.location.protocol === "file:") {
    const params = getCurrentAppSearchParams();
    params.set("state", state);
    window.history.replaceState({}, "", `#${getCurrentAppPath()}?${params.toString()}`);
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("state", state);
  window.history.replaceState({}, "", url);
}
