import { db } from '../src/lib/db';

// Better excerpt: take the first 2-3 meaningful lines from the post content itself
function makeExcerpt(content: string): string {
  // Normalize literal \n to real newlines
  const normalized = content.replace(/\\n/g, '\n');
  const lines = normalized.split('\n').map((l) => l.trim()).filter(Boolean);
  const meaningful: string[] = [];
  for (const line of lines) {
    // Skip junk
    if (line.length < 15) continue;
    if (/^(Get link|Facebook|Pinterest|Email|Other Apps|Post a Comment|Read more|Labels|Posted|Share|Subscribe|No comments|Comments|Home|Search)/i.test(line)) continue;
    if (line === '&nbsp;') continue;
    if (/^&[a-z]+;?$/.test(line)) continue;
    // Skip image captions and disclaimers
    if (/image is for illustrative/i.test(line)) continue;
    if (/does not represent a specific brand/i.test(line)) continue;
    if (/disclaimer/i.test(line)) continue;
    // Skip markdown headings and dividers
    if (/^##\s+/.test(line)) continue;
    if (/^-{3,}$/.test(line)) continue;
    // Skip numbered/bullet list items
    if (/^\d+\.\s/.test(line)) continue;
    if (/^[•·\-]\s/.test(line)) continue;
    meaningful.push(line);
    if (meaningful.join(' ').length > 200) break;
  }
  let excerpt = meaningful.join(' ').replace(/\s+/g, ' ').trim();
  if (excerpt.length > 180) {
    excerpt = excerpt.slice(0, 177).replace(/\s+\S*$/, '') + '…';
  }
  return excerpt || 'A pharmacy professional shares honest, research-backed health and wellness tips.';
}

async function main() {
  const posts = await db.post.findMany();
  console.log(`Updating excerpts for ${posts.length} posts...`);
  for (const p of posts) {
    const newExcerpt = makeExcerpt(p.content);
    if (newExcerpt !== p.excerpt) {
      await db.post.update({ where: { id: p.id }, data: { excerpt: newExcerpt } });
      console.log(`  ✓ ${p.slug}: ${newExcerpt.slice(0, 80)}...`);
    }
  }
  console.log('Done!');
}

main().catch(console.error).finally(() => process.exit(0));
