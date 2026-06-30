import { db } from '../src/lib/db';

// Remove Blogger junk lines
function isJunkLine(line: string): boolean {
  const l = line.trim();
  if (!l) return true;
  if (/image is for illustrative/i.test(l)) return true;
  if (/does not represent a specific brand/i.test(l)) return true;
  if (/^&[a-z]+;?$/.test(l)) return true;
  if (l === '&nbsp;') return true;
  if (/^(Get link|Facebook|Pinterest|Email|Other Apps|Post a Comment|Read more|Labels|Posted|Share|Subscribe|No comments|Comments|Home|Search This Blog|Skip to main content|Posts|BlogThis!|Email This|Share to Twitter|Share to Facebook|Share to Pinterest|Newer Post|Older Post|You might also like|Related Posts)$/i.test(l)) return true;
  return false;
}

// Check if a line is a section divider
function isDivider(line: string): boolean {
  return /^-{3,}$/.test(line.trim());
}

// Check if a line starts a numbered list
function isNumberedItem(line: string): boolean {
  return /^\d+\.\s/.test(line.trim());
}

// Check if a line starts a bullet list
function isBulletItem(line: string): boolean {
  return /^[•·\-]\s/.test(line.trim());
}

// Check if a line looks like a heading (short, no ending punctuation, not a list item)
function isLikelyHeading(line: string): boolean {
  const l = line.trim();
  if (l.length < 3 || l.length > 80) return false;
  if (isNumberedItem(l) || isBulletItem(l)) return false;
  if (/[.!?,;:]$/.test(l)) return false;  // ends with punctuation = not heading
  if (/^(What|How|Why|When|Where|Who|Which|The Bottom Line|Key Takeaway|Summary|Important|Final Thoughts|Quick|Introduction|Conclusion|Disclaimer|Note)\b/.test(l)) return true;
  return false;
}

// Clean and reformat content into proper paragraphs
function cleanContent(raw: string): string {
  const lines = raw.split('\n').map((l) => l.trim());

  const output: string[] = [];
  let currentParagraph: string[] = [];
  let inList: 'numbered' | 'bullet' | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').replace(/\s+/g, ' ').trim();
      if (text) output.push(text);
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      // Join list items with newlines, prefix with marker
      listItems.forEach((item, i) => {
        if (inList === 'numbered') {
          output.push(`${i + 1}. ${item}`);
        } else {
          output.push(`• ${item}`);
        }
      });
      // Add blank line after list
      output.push('');
      listItems = [];
      inList = null;
    }
  };

  for (const line of lines) {
    // Skip junk
    if (isJunkLine(line)) continue;

    // Section divider
    if (isDivider(line)) {
      flushParagraph();
      flushList();
      output.push('');
      output.push('---');
      output.push('');
      continue;
    }

    // Numbered list item
    if (isNumberedItem(line)) {
      flushParagraph();
      if (inList !== 'numbered') flushList();
      inList = 'numbered';
      const text = line.replace(/^\d+\.\s*/, '').trim();
      listItems.push(text);
      continue;
    }

    // Bullet list item
    if (isBulletItem(line)) {
      flushParagraph();
      if (inList !== 'bullet') flushList();
      inList = 'bullet';
      const text = line.replace(/^[•·\-]\s*/, '').trim();
      listItems.push(text);
      continue;
    }

    // Heading
    if (isLikelyHeading(line)) {
      flushParagraph();
      flushList();
      output.push('');
      output.push(`## ${line}`);
      output.push('');
      continue;
    }

    // Regular text line — add to current paragraph
    if (inList) flushList();
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();

  // Clean up: remove multiple blank lines, trim
  let result = output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  return result;
}

async function main() {
  const posts = await db.post.findMany();
  console.log(`Cleaning content for ${posts.length} posts...`);

  for (const p of posts) {
    const cleaned = cleanContent(p.content);
    if (cleaned !== p.content) {
      const oldLines = p.content.split('\n').length;
      const newLines = cleaned.split('\n').length;
      await db.post.update({ where: { id: p.id }, data: { content: cleaned } });
      console.log(`  ✓ ${p.slug}: ${oldLines} lines → ${newLines} lines`);
    }
  }
  console.log('Done!');
}

main().catch(console.error).finally(() => process.exit(0));
