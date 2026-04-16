export type BlogTheme = "light" | "dark";

const THEME_TOGGLE_EVENT = "theme-toggle";

export function getCurrentTheme(): BlogTheme {
  const localTheme = localStorage.getItem("theme");
  if (localTheme === "dark" || localTheme === "light") {
    return localTheme;
  }

  const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  const defaultTheme = prefersLightScheme ? "light" : "dark";
  localStorage.setItem("theme", defaultTheme);
  return defaultTheme;
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

  window.dispatchEvent(new CustomEvent(THEME_TOGGLE_EVENT, { detail: { theme: newTheme } }));
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
    if (event instanceof CustomEvent) {
      updateGiscus(event.detail.theme);
    }
  });

  window.addEventListener(
    "message",
    (event) => {
      if (event.origin !== "https://giscus.app") return;
      if (!(typeof event.data === "object" && event.data.giscus)) return;

      updateGiscus(getCurrentTheme());
    },
    { once: true }
  );
}
