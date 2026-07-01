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
        { type: 'text', text: 'This is a screenshot from a user who says "there is nothing" on their deployed website. Describe EXACTLY what you see: 1) Is the page blank/white/empty? 2) Is there any text visible at all? What does it say? 3) Are there any error messages? Copy them exactly. 4) What URL is shown in the browser address bar? 5) Is there a loading spinner? 6) Are there any console errors visible? 7) What color is the background? Be very specific about EVERYTHING you see, even if the page appears empty.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782934769746.png'));
