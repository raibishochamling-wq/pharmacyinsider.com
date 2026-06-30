import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

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
            text: `This is a screenshot labeled "${label}" from a restaurant website. Look at the ENTIRE image carefully from top to bottom. 

Tell me: Is there any large empty WHITE or BLANK space, or an unwanted gap between sections that looks bad? 

If YES: describe EXACTLY where (e.g. "below the hero image", "between the menu and reviews", "at the very bottom", "in the middle of the about section") and approximately how tall the white gap is (small/medium/large).

If the page looks full with no obvious blank/white gaps, respond with exactly: NO WHITE SPACE ISSUES

Be concise (max 3 sentences).`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
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
  const files = [
    's1-hero.png',
    's2-about.png',
    's3-services.png',
    's4-menu.png',
    's5-reviews.png',
    's6-location.png',
    's7-cta-footer.png',
  ];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) {
      console.log(`${file}: FILE NOT FOUND`);
      continue;
    }
    console.log(`\n=== ${file} ===`);
    try {
      const result = await analyzeImage(fullPath, file);
      console.log(result);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

main();
