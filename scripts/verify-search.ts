import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyze(p: string, l: string) {
  const zai = await ZAI.create();
  const b64 = fs.readFileSync(p).toString('base64');
  const r = await zai.chat.completions.createVision({
    messages: [{ role: 'user', content: [
      { type: 'text', text: `Screenshot "${l}" of a blog website. Describe what you see: Is there a search bar visible? Are search results shown? Is the layout working properly? Be concise (2-3 sentences).` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
    ]}],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

const dir = '/home/z/my-project/scripts/screenshots';
console.log('\n=== search-fix-2 (after search) ===');
console.log(await analyze(`${dir}/search-fix-2.png`, 'search results'));
