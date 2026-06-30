import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyze(imagePath: string, label: string) {
  const zai = await ZAI.create();
  const buf = fs.readFileSync(imagePath);
  const b64 = buf.toString('base64');
  const mime = 'image/png';
  const r = await zai.chat.completions.createVision({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `Screenshot "${label}" of a restaurant website. Is there any large empty WHITE or BLANK gap between sections that looks bad? If YES, describe where and height. If no, respond: NO WHITE SPACE ISSUES. Max 2 sentences.` },
        { type: 'image_url', image_url: { url: `data:${mime};base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

const dir = '/home/z/my-project/scripts/screenshots';
const files = ['final-s1.png','final-s2.png','final-s3.png','final-s4.png','final-s5.png','final-s6.png','final-s7.png'];
for (const f of files) {
  console.log(`\n=== ${f} ===`);
  try { console.log(await analyze(`${dir}/${f}`, f)); } catch(e) { console.log('Error:', e.message); }
}
