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
        { type: 'text', text: 'This is a screenshot from a user deploying a website. Describe EXACTLY what you see: 1) What website are they on (GitHub, Vercel, Neon, etc.)? 2) What page/step are they on? 3) What form fields are visible and what is entered? 4) Are there any buttons visible and what do they say? 5) Is there any error message? 6) What do you think the user should do next? Be very specific and detailed.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782853420315.png'));
