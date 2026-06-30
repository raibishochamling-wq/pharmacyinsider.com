import { db } from '../src/lib/db';
async function main() {
  const p = await db.post.findFirst({ where: { slug: 'magnesium-oxide' } });
  if (p) {
    console.log('TITLE:', p.title);
    console.log('EXCERPT:', p.excerpt);
    console.log('---CONTENT START---');
    console.log(p.content.slice(0, 400));
  }
}
main().catch(e => console.error(e)).finally(() => process.exit(0));
