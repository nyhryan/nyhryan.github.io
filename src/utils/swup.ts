import type { HookName, HookOptions } from "swup";

export function bindSwupHook(
  hook: HookName,
  callback: () => void,
  options: Partial<HookOptions> = {}
): void {
  if (typeof window === "undefined") return;

  // Initial call to the callback when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", callback);

  // Once swup is enabled, bind the callback to the specified hook
  if (window.swup) {
    window.swup.hooks.on(hook, callback, options);
  } else {
    document.addEventListener("swup:enable", (e) => {
      window.swup.hooks.on(hook, callback, options);
    });
  }
}
