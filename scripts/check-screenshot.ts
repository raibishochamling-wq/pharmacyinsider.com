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
        { type: 'text', text: 'This is a screenshot from a user trying to open a website link. Describe EXACTLY what you see in the image — what page is shown, what text/errors are visible, what the user is trying to do, and any error messages. Be very specific and detailed.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782845954571.png'));
