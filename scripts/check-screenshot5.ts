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
        { type: 'text', text: 'This is a screenshot from a user uploading files to GitHub. Describe EXACTLY what you see: 1) What website/page are they on? 2) What files or folders are visible in the upload area? List them all. 3) Is there an error message? What does it say exactly? 4) What buttons are visible? 5) Is there a file that is too big or being rejected? 6) What should the user do next? Be very specific.' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
      ],
    }],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

console.log(await analyze('/home/z/my-project/upload/pasted_image_1782853734747.png'));
