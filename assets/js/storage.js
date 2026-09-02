/**
 * Web Storage access that never throws when the store is unavailable — private
 * mode, disabled cookies, or quota. Reads yield `null` and writes silently
 * no-op, so callers fall back to their defaults instead of crashing.
 *
 * Ported from AgentMon's `lib/storage.ts`, signatures included, so the same
 * helper reads the same way in both codebases. The theme switch and the tab
 * groups share it instead of each re-wrapping getItem/setItem in try/catch.
 */

export function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

/** Writes `value`, or removes the key when `value` is `null`. */
export function safeSet(storage, key, value) {
  try {
    if (value === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, value);
    }
  } catch {
    /* storage unavailable — skip persistence */
  }
}
