import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {prisma?: PrismaClient};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new Error('DATABASE_URL is not configured.');
  const adapter = new PrismaPg({connectionString});
  return new PrismaClient({adapter});
}

function getPrismaClient() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createPrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;
  return client;
}

// Delay creation until a database-backed code path is actually used. This keeps
// local/static catalogue rendering functional when DATABASE_URL is intentionally
// absent, while database/admin/API paths still fail fast with a clear error.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient();
    const value = Reflect.get(client as object, property, client);
    return typeof value === 'function' ? value.bind(client) : value;
  }
});
