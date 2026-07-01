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
        { type: 'text', text: 'This is a screenshot from a user deploying a website on Vercel. Describe EXACTLY what you see in detail: 1) What page/screen are they on? 2) What is the main heading or title? 3) What form fields are visible and what is in them? 4) What buttons are visible and what do they say? 5) Is there any error message? What does it say exactly? 6) Is there a domain field visible? Is it required or optional? 7) What should the user do next? Be very specific.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782933120896.png'));
