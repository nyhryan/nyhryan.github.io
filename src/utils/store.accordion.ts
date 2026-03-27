import { map } from "nanostores";

const STORAGE_KEY = "components:common:accordion";
export const $accordionOpen = map<Record<string, boolean>>({});

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function initAccordionStore() {
  if (!isBrowser()) return;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) $accordionOpen.set(JSON.parse(raw));
  } catch {}
}

export function setAccordionOpen(key: string, isOpen: boolean) {
  $accordionOpen.setKey(key, isOpen);
}

export function getAccordionOpen(key: string, fallback: boolean): boolean {
  const state = $accordionOpen.get();
  return key in state ? state[key] : fallback;
}

if (isBrowser()) {
  $accordionOpen.listen((next) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  })
}
