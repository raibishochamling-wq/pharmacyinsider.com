import { db } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

// Category mapping based on post slug
const CATEGORIES: Record<string, { category: string; tags: string; featured: boolean; coverColor: string }> = {
  'magnesium-oxide':    { category: 'Minerals',    tags: 'magnesium,magnesium oxide,constipation,heartburn,antacid', featured: true,  coverColor: '#0d9488' },
  'folic-acid':         { category: 'Vitamins',    tags: 'folic acid,folate,vitamin b9,pregnancy,womens health',     featured: true,  coverColor: '#db2777' },
  'vitamin-e':          { category: 'Vitamins',    tags: 'vitamin e,antioxidant,fat soluble,skin,immunity',          featured: false, coverColor: '#f59e0b' },
  'vitamin-c':          { category: 'Vitamins',    tags: 'vitamin c,ascorbic acid,water soluble,immunity,collagen',  featured: false, coverColor: '#ea580c' },
  'iron':               { category: 'Minerals',    tags: 'iron,anemia,blood,hemoglobin,deficiency',                  featured: true,  coverColor: '#b91c1c' },
  'magnesium-citrate':  { category: 'Minerals',    tags: 'magnesium,magnesium citrate,constipation,dosage',           featured: false, coverColor: '#0d9488' },
  'melatonin':          { category: 'Supplements', tags: 'melatonin,sleep,hormone,insomnia,circadian rhythm',        featured: false, coverColor: '#6366f1' },
  'magnesium-glycinate':{ category: 'Minerals',    tags: 'magnesium,magnesium glycinate,sleep,anxiety,calm',         featured: true,  coverColor: '#0d9488' },
  'biotin':             { category: 'Vitamins',    tags: 'biotin,vitamin b7,hair,skin,nails,keratin',                featured: false, coverColor: '#9333ea' },
  'omega-3':            { category: 'Supplements', tags: 'omega 3,fish oil,epa,dha,heart,brain',                     featured: true,  coverColor: '#0891b2' },
  'vitamin-d':          { category: 'Vitamins',    tags: 'vitamin d,sunshine vitamin,bones,immunity,qatar',           featured: false, coverColor: '#f59e0b' },
  'ashwagandha':        { category: 'Supplements', tags: 'ashwagandha,adaptogen,stress,cortisol,ayurvedic',          featured: false, coverColor: '#7c2d12' },
};

// Estimated read time: ~200 words per minute
function calcReadMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 200));
}

// Generate excerpt from first meaningful paragraph(s) — max ~180 chars
function makeExcerpt(text: string): string {
  // Remove the title (first line) and skip blogger navigation noise
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  let contentStart = 0;
  // Skip lines until we find the actual post content (after "Get link Facebook X Pinterest Email Other Apps - DATE")
  for (let i = 0; i < lines.length; i++) {
    if (/Other Apps/.test(lines[i]) || /^-\s*$/.test(lines[i]) || /^(June|July|May|January|February|March|April|August|September|October|November|December)\s+\d+,?\s+202\d$/.test(lines[i])) {
      contentStart = i + 1;
    }
  }
  // Take the next few meaningful lines
  let excerpt = '';
  for (let i = contentStart; i < lines.length; i++) {
    const line = lines[i];
    // Skip nav junk
    if (/^(Get link|Facebook|X|Pinterest|Email|Other Apps|Post a Comment|Read more|Home|Search This Blog|PharmacyInsider|Skip to main content|Posts|Share|Labels|No comments|Comments|Newer Posts|Older Posts|Subscribe)/i.test(line)) continue;
    if (/^&/.test(line)) continue;
    if (line.length < 15) continue;
    if (line === '&nbsp;') continue;
    excerpt += ' ' + line;
    if (excerpt.length > 220) break;
  }
  excerpt = excerpt.trim().replace(/\s+/g, ' ');
  if (excerpt.length > 180) {
    excerpt = excerpt.slice(0, 177).replace(/\s+\S*$/, '') + '…';
  }
  return excerpt || 'A pharmacy professional shares honest, research-backed health and wellness tips.';
}

// Clean the full post content — remove blogger navigation noise, keep the article body
function cleanContent(text: string, title: string): string {
  const lines = text.split('\n').map((l) => l.trim());
  let startIdx = 0;
  let endIdx = lines.length;

  // Find where the actual post content starts (after the date line that follows "Other Apps")
  let foundOtherApps = false;
  for (let i = 0; i < lines.length; i++) {
    if (/Other Apps/.test(lines[i])) {
      foundOtherApps = true;
      continue;
    }
    if (foundOtherApps && /^(June|July|May|January|February|March|April|August|September|October|November|December)\s+\d+,?\s+202\d$/.test(lines[i])) {
      startIdx = i + 1;
      break;
    }
  }

  // Find where content ends (before "Post a Comment" or "Read more" or footer)
  for (let i = startIdx; i < lines.length; i++) {
    if (/^(Post a Comment|Read more|Labels|Share to|Posted by|Email This|BlogThis!|Share|No comments|Comments|Newer Posts|Older Posts|Subscribe to|You might also like|Related Posts)/i.test(lines[i])) {
      endIdx = i;
      break;
    }
  }

  let body = lines.slice(startIdx, endIdx)
    .filter((line) => {
      // Filter out blogger UI junk
      if (!line) return false;
      if (/^&/.test(line) && line.length < 10) return false;
      if (/^(Get link|Facebook|X|Pinterest|Email|Other Apps)$/i.test(line)) return false;
      if (line === '&nbsp;') return false;
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return body;
}

async function main() {
  console.log('Seeding blog posts...');

  const postsDir = '/home/z/my-project/scripts/posts';
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.json'));

  let count = 0;
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf8'));
    const slug = data.slug;
    const meta = CATEGORIES[slug];
    if (!meta) {
      console.log(`  ⚠ No category meta for ${slug}, skipping`);
      continue;
    }

    const title = data.title
      .replace(/\s+/g, ' ')
      .replace(/\s+—\s+/g, ' — ')
      .trim();

    const content = cleanContent(data.text, title);
    const excerpt = makeExcerpt(data.text);
    const readMinutes = calcReadMinutes(content);

    // Parse published date
    let publishedAt = new Date();
    if (data.publishedTime) {
      const d = new Date(data.publishedTime);
      if (!isNaN(d.getTime())) publishedAt = d;
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: null, // we'll use gradient covers
        category: meta.category,
        tags: meta.tags,
        author: 'PharmacyInsider',
        isPublished: true,
        isFeatured: meta.featured,
        views: Math.floor(Math.random() * 800) + 120, // demo views
        readMinutes,
        publishedAt,
      },
    });

    count++;
    console.log(`  ✓ ${slug} [${meta.category}] — ${title.slice(0, 55)}... (${readMinutes} min read)`);
  }

  // Seed blog settings
  const settings = [
    { key: 'blogName', value: 'PharmacyInsider' },
    { key: 'tagline', value: 'Honest, research-backed health tips from a pharmacy professional' },
    { key: 'about', value: 'I am a pharmacy professional with hands-on experience in medicines, supplements, and patient care. Through PharmacyInsider, I share honest, research-backed health and wellness tips to help you make better decisions about your health. Your health is my priority.' },
    { key: 'authorName', value: 'PharmacyInsider' },
    { key: 'authorRole', value: 'Pharmacy Professional · 3+ years in Qatar' },
    { key: 'adminPassword', value: 'admin123' },
    { key: 'socialEmail', value: 'hello@pharmacyinsider.com' },
    { key: 'socialInstagram', value: '' },
    { key: 'socialFacebook', value: '' },
    { key: 'socialX', value: '' },
    { key: 'footerNote', value: 'Your health is my priority.' },
  ];
  for (const s of settings) {
    await db.blogSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log(`\nSeeded ${count} posts + ${settings.length} settings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
