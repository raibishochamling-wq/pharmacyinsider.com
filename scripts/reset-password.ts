// Reset the admin password — usage: bun run scripts/reset-password.ts newpassword123
import { db } from '../src/lib/db';

async function main() {
  const newPass = process.argv[2];
  if (!newPass || newPass.length < 4) {
    console.error('Usage: bun run scripts/reset-password.ts <new-password>');
    console.error('Password must be at least 4 characters long.');
    process.exit(1);
  }

  await db.blogSetting.upsert({
    where: { key: 'adminPassword' },
    update: { value: newPass },
    create: { key: 'adminPassword', value: newPass },
  });

  console.log(`✓ Admin password updated successfully.`);
  console.log(`  New password: ${newPass}`);
  console.log(`  You can now log in at your-site.vercel.app/#admin`);
}

main().catch(console.error).finally(() => process.exit(0));
