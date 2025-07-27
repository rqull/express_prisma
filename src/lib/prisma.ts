import { PrismaClient } from "../generated/prisma";

// Create a single Prisma instance to be shared across the application
export const prisma = new PrismaClient();

// Graceful shutdown handler
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});
