// Check if we can still query the local SQLite database
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    const count = await prisma.post.count();
    console.log('✓ Local DB works — post count:', count);
  } catch (e: any) {
    console.log('✗ DB error:', e.message?.slice(0, 100));
  }
}
main().finally(() => prisma.$disconnect());
