// app/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// PrismaClient es adjuntado al objeto global en desarrollo para prevenir
// múltiples instancias del Prisma Client en desarrollo
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;