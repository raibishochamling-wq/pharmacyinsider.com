// Quick switch between SQLite (local) and PostgreSQL (production)
// Usage:
//   bun run scripts/switch-db.ts local    → use SQLite for local dev
//   bun run scripts/switch-db.ts prod     → use PostgreSQL for Vercel deployment
import fs from 'fs';

const schemaPath = 'prisma/schema.prisma';
const schema = fs.readFileSync(schemaPath, 'utf8');

const target = process.argv[2];
if (!target || !['local', 'prod'].includes(target)) {
  console.error('Usage: bun run scripts/switch-db.ts <local|prod>');
  process.exit(1);
}

const provider = target === 'local' ? 'sqlite' : 'postgresql';
const updated = schema.replace(
  /provider = "(sqlite|postgresql)"/,
  `provider = "${provider}"`
);

if (updated === schema) {
  console.log(`Already using ${provider} — no changes needed.`);
} else {
  fs.writeFileSync(schemaPath, updated);
  console.log(`✓ Switched database provider to: ${provider}`);
  console.log(`  Run "bun run db:generate" to regenerate the Prisma client.`);
}
