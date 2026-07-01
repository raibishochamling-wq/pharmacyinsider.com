import { db } from '../src/lib/db';
async function main() {
  const zinc = await db.post.findFirst({ where: { slug: { contains: 'zinc' } } });
  if (!zinc) { console.log('Zinc post not found'); return; }
  console.log('Before:', JSON.stringify(zinc.content.slice(0, 100)));
  // Replace literal \n with real newlines
  const fixed = zinc.content.replace(/\\n/g, '\n');
  await db.post.update({ where: { id: zinc.id }, data: { content: fixed } });
  console.log('After:', JSON.stringify(fixed.slice(0, 100)));
}
main().finally(() => process.exit(0));
