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
        { type: 'text', text: 'This is a screenshot from a user on Vercel. Look carefully and tell me: 1) What page are they on? 2) Is there a URL visible anywhere on the page? Copy it EXACTLY. 3) Is there a "Visit" button or link? Where is it? 4) What is the deployment status (Building, Ready, Error)? 5) Are there any links that would take them to their live website? List all URLs you can see. Be very specific and copy ALL URLs exactly.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782934769746.png'));
