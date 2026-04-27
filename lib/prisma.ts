import { PrismaClient } from "@prisma/client";
import { resolvePrismaDatasourceUrl } from "@/lib/prisma-datasource";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};
const resolvedDatasourceUrl = resolvePrismaDatasourceUrl();

if (!process.env.DATABASE_URL && resolvedDatasourceUrl) {
  process.env.DATABASE_URL = resolvedDatasourceUrl;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolvedDatasourceUrl,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
