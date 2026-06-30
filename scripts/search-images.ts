import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function search(query: string, count: number = 3) {
  const zai = await ZAI.create();
  const r = await zai.image.search({ query, count, gl: 'us', rank: false });
  return r.results || [];
}

async function main() {
  const queries = [
    { name: 'pharmacy', query: 'colorful vitamin supplements pills flat lay clean white background' },
    { name: 'pharmacist', query: 'pharmacist professional healthcare white coat pharmacy' },
  ];
  const out: Record<string, string[]> = {};
  for (const q of queries) {
    console.log(`Searching: ${q.query}`);
    try {
      const results = await search(q.query, 3);
      out[q.name] = results.map((r: any) => r.original_url);
      console.log(`  ✓ ${results.length} images`);
    } catch (e: any) {
      console.log(`  ✗ ${e.message?.slice(0, 80)}`);
      out[q.name] = [];
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  fs.writeFileSync('/home/z/my-project/scripts/blog-images.json', JSON.stringify(out, null, 2));
  console.log('\nResults:', JSON.stringify(out, null, 2));
}
main();
