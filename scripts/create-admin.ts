import {config as loadEnv} from 'dotenv';

for (const path of ['.env.production.local', '.env.local', '.env.production', '.env']) {
  loadEnv({path});
}
import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../src/generated/prisma/client';
import {assertStrongAdminPassword, hashAdminPassword} from '../src/lib/auth/password';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error('DATABASE_URL is required.');
if (!email || !email.includes('@')) throw new Error('ADMIN_EMAIL must be a valid email.');
if (!password) throw new Error('ADMIN_PASSWORD is required.');
assertStrongAdminPassword(password);

const prisma = new PrismaClient({adapter: new PrismaPg({connectionString})});
const passwordHash = await hashAdminPassword(password);
await prisma.adminUser.upsert({
  where: {email},
  update: {passwordHash, isActive: true, sessionVersion: {increment: 1}},
  create: {email, passwordHash, role: 'admin'},
});
console.log(`Admin account ready: ${email}`);
await prisma.$disconnect();
