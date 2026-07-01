import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const POSTS = [
  { slug: 'magnesium-oxide', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/magnesium-oxide-cheapest-magnesium-form.html' },
  { slug: 'folic-acid', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/folic-acid-what-pharmacy-worker-wants.html' },
  { slug: 'vitamin-e', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/vitamin-e-fat-soluble-antioxidant-that.html' },
  { slug: 'vitamin-c', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/vitamin-c-water-soluble-vitamin-your.html' },
  { slug: 'iron', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/iron-most-important-mineral-for-your.html' },
  { slug: 'magnesium-citrate', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/magnesium-citrate-for-constipation-what.html' },
  { slug: 'melatonin', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/melatonin-is-not-vitamin-or-mineral-i.html' },
  { slug: 'magnesium-glycinate', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/magnesium-glycinate-what-3-years-behind.html' },
  { slug: 'biotin', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/biotin-benefits-complete-guide-to-hair.html' },
  { slug: 'omega-3', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/omega-3-everything-you-need-to-know.html' },
  { slug: 'vitamin-d', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/vitamin-d-everything-you-need-to-know.html' },
  { slug: 'ashwagandha', url: 'https://pharmacyinsiderblog.blogspot.com/2026/06/ashwagandha-what-i-learned-after-3.html' },
];

async function fetchOne(zai: any, slug: string, url: string) {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await zai.functions.invoke('page_reader', { url });
      const d = result.data || result;
      const html = d.html || '';
      // Convert HTML to plain text, preserving paragraph breaks
      let text = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/h[1-6]>/gi, '\n\n')
        .replace(/<\/li>/gi, '\n')
        .replace(/<li[^>]*>/gi, '• ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      return {
        slug,
        url,
        title: d.title || '',
        publishedTime: d.publishedTime || '',
        text,
        textLength: text.length,
      };
    } catch (e: any) {
      console.log(`  [${slug}] attempt ${attempt} failed: ${e.message?.slice(0, 80)}`);
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 5000 * attempt));
      }
    }
  }
  return { slug, url, title: '', publishedTime: '', text: '', textLength: 0, error: 'failed' };
}

async function main() {
  const zai = await ZAI.create();
  const outDir = '/home/z/my-project/scripts/posts';
  fs.mkdirSync(outDir, { recursive: true });

  // Fetch in batches of 3 to avoid rate limits
  for (let i = 0; i < POSTS.length; i += 3) {
    const batch = POSTS.slice(i, i + 3);
    console.log(`\n=== Batch ${Math.floor(i / 3) + 1}: ${batch.map((b) => b.slug).join(', ')} ===`);
    const results = await Promise.all(batch.map((p) => fetchOne(zai, p.slug, p.url)));
    for (const r of results) {
      const outPath = path.join(outDir, `${r.slug}.json`);
      fs.writeFileSync(outPath, JSON.stringify(r, null, 2));
      console.log(`  ✓ ${r.slug}: ${r.textLength} chars — ${r.title.slice(0, 60)}`);
    }
    // Delay between batches
    if (i + 3 < POSTS.length) {
      console.log('  (pausing 8s to avoid rate limit...)');
      await new Promise((r) => setTimeout(r, 8000));
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  let total = 0;
  for (const p of POSTS) {
    const fp = path.join(outDir, `${p.slug}.json`);
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      console.log(`${p.slug}: ${data.textLength} chars — ${data.title.slice(0, 50)}`);
      total += data.textLength;
    }
  }
  console.log(`\nTotal content: ${total} chars across ${POSTS.length} posts`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
