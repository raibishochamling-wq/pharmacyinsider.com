import { db } from '../src/lib/db';
async function main() {
  const count = await db.post.count();
  console.log('Post count:', count);
  const posts = await db.post.findMany({ take: 2 });
  console.log('First post:', posts[0]?.title);
}
main().catch(e => console.error('ERROR:', e.message)).finally(() => process.exit(0));
