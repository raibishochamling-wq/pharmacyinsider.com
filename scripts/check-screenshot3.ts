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
        { type: 'text', text: 'This is a screenshot from a user who needs help. Describe EXACTLY what you see in detail: 1) What website or app is shown? 2) What page/step are they on? 3) Is there any error message? What does it say? 4) What form fields are visible and what is entered in them? 5) What buttons are visible? 6) What do you think the user is trying to do and what problem are they facing? Be very specific.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782852242613.png'));
