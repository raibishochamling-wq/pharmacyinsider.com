import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyze(imagePath: string) {
  const zai = await ZAI.create();
  const buf = fs.readFileSync(imagePath);
  const b64 = buf.toString('base64');
  const r = await zai.chat.completions.createVision({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'This is a screenshot from a user deploying a website on Vercel. Describe EXACTLY what you see: 1) What page are they on (Vercel dashboard, deploy screen, domains page, etc.)? 2) What text/heading is visible? 3) What form fields are visible? 4) What buttons are visible and what do they say? 5) Are they asking about adding a domain or is there a domain field? 6) Is this required or optional? Be very specific.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782854333559.png'));
