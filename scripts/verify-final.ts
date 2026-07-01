import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyze(p: string, l: string) {
  const zai = await ZAI.create();
  const b64 = fs.readFileSync(p).toString('base64');
  const r = await zai.chat.completions.createVision({
    messages: [{ role: 'user', content: [
      { type: 'text', text: `This is a screenshot of a blog post detail page from PharmacyInsider (a pharmacy/health blog). Check carefully: 1) Does the article text flow as readable paragraphs (NOT choppy one-line fragments)? 2) Are there any layout problems, white gaps, or broken elements? 3) Is the text easy to read? Rate 1-10 and be concise (2-3 sentences).` },
      { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
    ]}],
    thinking: { type: 'disabled' },
  });
  return r.choices[0]?.message?.content;
}

const dir = '/home/z/my-project/scripts/screenshots';
console.log('\n=== Post Detail (viewport) ===');
console.log(await analyze(`${dir}/bug-check-post-final.png`, 'post-detail'));
console.log('\n=== Post Detail (full page) ===');
console.log(await analyze(`${dir}/bug-check-post-full.png`, 'post-full'));
