import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyze(p: string, l: string) {
  const zai = await ZAI.create();
  const b64 = fs.readFileSync(p).toString('base64');
  const r = await zai.chat.completions.createVision({
    messages: [{ role: 'user', content: [
      { type: 'text', text: `This is screenshot "${l}" from a pharmacy/health blog website called PharmacyInsider. Rate the visual design from 1-10 and briefly describe what you see. Is it professional, clean, and good-looking? Are there any obvious visual problems (white space gaps, broken layout, ugly elements)? Be concise (3-4 sentences max).` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
    ]}],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

const dir = '/home/z/my-project/scripts/screenshots';
const files = ['final-home.png', 'final-posts.png', 'final-about.png', 'blog-admin-dashboard.png'];
for (const f of files) {
  console.log(`\n=== ${f} ===`);
  try { console.log(await analyze(`${dir}/${f}`, f)); } catch(e) { console.log('Error:', e.message); }
}
