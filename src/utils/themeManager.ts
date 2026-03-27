export type BlogTheme = "light" | "dark";

const THEME_TOGGLE_EVENT = "theme-toggle";

class ThemeToggleEvent extends Event {
  public readonly theme: BlogTheme;
  constructor(theme: BlogTheme) {
    super(THEME_TOGGLE_EVENT);
    this.theme = theme;
  }
}

export function getCurrentTheme(): BlogTheme {
  let localTheme = localStorage.getItem("theme");
  if (localTheme === "dark" || localTheme === "light") {
    return localTheme;
  }

  const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  const defaultTheme = prefersLightScheme ? "light" : "dark";
  localStorage.setItem("theme", defaultTheme);
  return defaultTheme;
}

export function loadTheme(): void {
  const currentTheme = getCurrentTheme();
  if (currentTheme === "light") {
    document.documentElement.classList.add("latte");
  } else {
    document.documentElement.classList.remove("latte");
  }
}

export function toggleTheme(): void {
  const currentTheme = getCurrentTheme();

  if (currentTheme === "dark") {
    document.documentElement.classList.add("latte");
  } else {
    document.documentElement.classList.remove("latte");
  }
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  localStorage.setItem("theme", newTheme);

  window.dispatchEvent(new ThemeToggleEvent(newTheme));
}

export function updateGiscus(theme: BlogTheme) {
  const giscusTheme = theme === "light" ? "catppuccin_latte" : "catppuccin_frappe";
  const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

  if (!iframe) return;

  iframe.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: giscusTheme,
        },
      },
    },
    "https://giscus.app"
  );
}

export function initGiscusThemeSync() {
  window.addEventListener(THEME_TOGGLE_EVENT, (event) => {
    if (event instanceof ThemeToggleEvent) {
      updateGiscus(event.theme);
    }
  });

  const observer = new MutationObserver((_, obs) => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    if (iframe) {
      const currentTheme = getCurrentTheme();
      updateGiscus(currentTheme);
      obs.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
