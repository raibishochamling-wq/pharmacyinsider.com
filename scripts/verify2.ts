import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyze(imagePath: string, label: string) {
  const zai = await ZAI.create();
  const buf = fs.readFileSync(imagePath);
  const b64 = buf.toString('base64');
  const mime = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const r = await zai.chat.completions.createVision({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: `Screenshot "${label}" of a restaurant website. Look at the ENTIRE image top-to-bottom. Is there any large empty WHITE or BLANK gap between sections that looks bad? If YES, describe exactly where and approx height. If no issues, respond: NO WHITE SPACE ISSUES. Max 2 sentences.` },
        { type: 'image_url', image_url: { url: `data:${mime};base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

const dir = '/home/z/my-project/scripts/screenshots';
console.log('\n=== fix2-s3-services.png ===');
console.log(await analyze(`${dir}/fix2-s3-services.png`, 'services-menu boundary'));
