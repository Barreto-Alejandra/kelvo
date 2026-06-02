// Kelvo Pro — client-side license state. One-time purchase via Lemon Squeezy.
// The License API activate/validate endpoints are public (no secret key) and
// CORS-enabled, so this works from a fully static site with no server.
// The Pro flag is cached in localStorage so Pro keeps working offline / if the
// API is unreachable.
import { PRO } from '@/config';

const KEY = PRO.storageKey;
const API = 'https://api.lemonsqueezy.com/v1/licenses';

export function isPro(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function emit(pro: boolean) {
  document.dispatchEvent(new CustomEvent('kelvo-pro-change', { detail: { pro } }));
}

/** Activate a license key on this device. Returns ok=true on success. */
export async function activateLicense(
  licenseKey: string,
): Promise<{ ok: boolean; error?: 'empty' | 'invalid' | 'network' }> {
  const key = (licenseKey || '').trim();
  if (!key) return { ok: false, error: 'empty' };
  try {
    const res = await fetch(`${API}/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ license_key: key, instance_name: `kelvo-${navigator.platform || 'web'}` }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data && data.activated) {
      try {
        localStorage.setItem(KEY, '1');
        localStorage.setItem(`${KEY}_key`, key);
        if (data.instance?.id) localStorage.setItem(`${KEY}_inst`, String(data.instance.id));
      } catch {
        /* private mode — Pro lasts for the session only */
      }
      emit(true);
      return { ok: true };
    }
    return { ok: false, error: 'invalid' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

/** Remove Pro from this device. */
export function deactivate(): void {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(`${KEY}_key`);
    localStorage.removeItem(`${KEY}_inst`);
  } catch {
    /* ignore */
  }
  emit(false);
}
