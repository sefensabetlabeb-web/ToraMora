import bcrypt from 'bcryptjs';

export const ADMIN_PASSWORD_MIN_LENGTH = 12;
export const ADMIN_PASSWORD_ROUNDS = 12;

export function assertStrongAdminPassword(password: string) {
  if (password.length < ADMIN_PASSWORD_MIN_LENGTH) {
    throw new Error(`ADMIN_PASSWORD must contain at least ${ADMIN_PASSWORD_MIN_LENGTH} characters.`);
  }
}

export async function hashAdminPassword(password: string) {
  assertStrongAdminPassword(password);
  return bcrypt.hash(password, ADMIN_PASSWORD_ROUNDS);
}

export async function verifyAdminPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
