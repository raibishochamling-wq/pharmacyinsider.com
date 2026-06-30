import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyzeImage(imagePath: string, label: string) {
  const zai = await ZAI.create();
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const response = await zai.chat.completions.createVision({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Screenshot "${label}" from a restaurant website. Look at the ENTIRE image. Is there any large empty WHITE or BLANK gap between sections that looks bad? If YES, describe where and how tall. If no obvious blank/white gaps, respond: NO WHITE SPACE ISSUES. Max 2 sentences.`,
          },
          {
            type: 'image_url',
            image_url: { url: `data:${mimeType};base64,${base64Image}` },
          },
        ],
      },
    ],
    thinking: { type: 'disabled' },
  });

  return response.choices[0]?.message?.content;
}

async function main() {
  const dir = '/home/z/my-project/scripts/screenshots';
  const files = ['fix-s3-services.png', 'fix-s7-cta-footer.png'];
  for (const file of files) {
    console.log(`\n=== ${file} ===`);
    try {
      console.log(await analyzeImage(`${dir}/${file}`, file));
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}
main();
