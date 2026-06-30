import { db } from '../src/lib/db';
async function main() {
  const posts = await db.post.findMany({ select: { slug: true, title: true, content: true } });
  for (const p of posts) {
    const firstBlock = p.content.split('\n\n')[0];
    const lineCount = firstBlock.split('\n').length;
    console.log(`${p.slug}: first block has ${lineCount} lines, ${firstBlock.length} chars`);
    console.log(`  Preview: ${firstBlock.slice(0, 120).replace(/\n/g, ' | ')}`);
    console.log();
  }
}
main().finally(() => process.exit(0));
