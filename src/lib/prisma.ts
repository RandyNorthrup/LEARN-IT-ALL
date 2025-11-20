import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use DATABASE_URL from environment or fallback
const databaseUrl = process.env.DATABASE_URL || "file:./prisma/learn-it-all.db";

console.log('[Prisma] Creating adapter with URL:', databaseUrl);
console.log('[Prisma] URL type:', typeof databaseUrl);
console.log('[Prisma] URL value:', JSON.stringify(databaseUrl));

const adapterConfig = {
  url: databaseUrl
};

console.log('[Prisma] Adapter config:', JSON.stringify(adapterConfig));

const adapter = new PrismaBetterSqlite3(adapterConfig);

console.log('[Prisma] Adapter created:', adapter);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
