import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
async function analyze(p: string, l: string) {
  const zai = await ZAI.create();
  const b64 = fs.readFileSync(p).toString('base64');
  const r = await zai.chat.completions.createVision({
    messages: [{ role: 'user', content: [
      { type: 'text', text: `Screenshot "${l}" of a restaurant website. Is there any large empty WHITE or BLANK gap between sections that looks bad? If YES describe where+height. If no: NO WHITE SPACE ISSUES. Max 2 sentences.` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
    ]}],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}
const dir = '/home/z/my-project/scripts/screenshots';
const files = ['v-s1.png','v-s2.png','v-s3.png','v-s4.png','v-s5.png','v-s6.png','v-s7.png'];
for (const f of files) {
  console.log(`\n=== ${f} ===`);
  try { console.log(await analyze(`${dir}/${f}`, f)); } catch(e) { console.log('Error:', e.message); }
}
