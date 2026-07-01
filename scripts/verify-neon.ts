import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const postCount = await prisma.post.count();
  const settingsCount = await prisma.blogSetting.count();
  const featuredCount = await prisma.post.count({ where: { isFeatured: true } });
  const categories = await prisma.post.groupBy({ by: ['category'], _count: true });
  console.log('✓ Database verification:');
  console.log('  Total posts:', postCount);
  console.log('  Featured posts:', featuredCount);
  console.log('  Settings:', settingsCount);
  console.log('  Categories:', categories.map(c => `${c.category} (${c._count})`).join(', '));
}
main().finally(() => prisma.$disconnect());
