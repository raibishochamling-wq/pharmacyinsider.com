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
        { type: 'text', text: 'This is a screenshot showing errors during a Vercel deployment. Describe EXACTLY what you see: 1) What page are they on? 2) What are the error messages? Copy them EXACTLY word for word. 3) What files or lines are mentioned in the errors? 4) What is the error type (build error, runtime error, lint error, TypeScript error)? 5) Is there a stack trace? What does it say? Be extremely detailed and copy all error text exactly.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782933566984.png'));
