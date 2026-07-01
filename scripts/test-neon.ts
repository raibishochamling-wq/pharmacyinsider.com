import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    // Just try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✓ Database connection works!', JSON.stringify(result));
  } catch (e: any) {
    console.log('✗ Connection failed:', e.message?.slice(0, 200));
  }
}
main().finally(() => prisma.$disconnect());
