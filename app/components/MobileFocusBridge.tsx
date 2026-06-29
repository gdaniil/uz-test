"use client";

const BRIDGE_ID = "passenger-keyboard-focus-bridge";
const REQUEST_KEY = "uz-passenger-keyboard-request";

export function requestPassengerKeyboardFocus() {
  window.sessionStorage.setItem(REQUEST_KEY, "1");
  window.setTimeout(() => window.sessionStorage.removeItem(REQUEST_KEY), 1500);

  const bridge = document.getElementById(BRIDGE_ID) as HTMLInputElement | null;
  bridge?.focus({ preventScroll: true });
}

export function shouldRestorePassengerKeyboardFocus() {
  return window.sessionStorage.getItem(REQUEST_KEY) === "1";
}

export function MobileFocusBridge() {
  return (
    <input
      id={BRIDGE_ID}
      className="mobile-focus-bridge"
      aria-label="Keyboard focus bridge"
      autoCapitalize="words"
      autoComplete="off"
      autoCorrect="off"
      inputMode="text"
      spellCheck={false}
      tabIndex={-1}
    />
  );
}
