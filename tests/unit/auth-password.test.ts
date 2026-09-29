import {describe, expect, it} from 'vitest';
import {ADMIN_PASSWORD_MIN_LENGTH, assertStrongAdminPassword, hashAdminPassword, verifyAdminPassword} from '@/lib/auth/password';

describe('admin password policy', () => {
  it('rejects passwords shorter than the configured minimum', () => {
    expect(() => assertStrongAdminPassword('short-pass')).toThrow();
  });

  it('accepts a sufficiently long password', () => {
    expect(() => assertStrongAdminPassword('A-strong-admin-password-2026')).not.toThrow();
    expect(ADMIN_PASSWORD_MIN_LENGTH).toBeGreaterThanOrEqual(12);
  });

  it('hashes and verifies the admin password without storing plaintext', async () => {
    const password = 'A-strong-admin-password-2026';
    const hash = await hashAdminPassword(password);
    expect(hash).not.toBe(password);
    expect(await verifyAdminPassword(password, hash)).toBe(true);
    expect(await verifyAdminPassword('wrong-password', hash)).toBe(false);
  });
});
