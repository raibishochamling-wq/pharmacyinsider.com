import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
async function analyze(p: string, l: string) {
  const zai = await ZAI.create();
  const b64 = fs.readFileSync(p).toString('base64');
  const r = await zai.chat.completions.createVision({
    messages: [{ role: 'user', content: [
      { type: 'text', text: `Screenshot "${l}" of a restaurant website. Is there any large empty WHITE or BLANK gap between sections? If YES describe where+height. If no: NO WHITE SPACE ISSUES. Max 2 sentences.` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
    ]}],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}
console.log('\n=== final2-s3 (Services-Menu boundary) ===');
console.log(await analyze('/home/z/my-project/scripts/screenshots/final2-s3.png', 'services-menu'));
