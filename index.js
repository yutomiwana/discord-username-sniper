import fs from 'fs';
import initCycleTLS from 'cycletls';
import { checkUsername } from './utils/check.js';
import { claimUsername } from './utils/claim.js';

function readLines(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8').trim();
    if (!data) throw new Error(`${filePath} is empty`);

    return data
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  } catch (err) {
    console.error(`❌ Error reading ${filePath}:`, err.message);
    process.exit(1);
  }
}

function parseTokenPassword(line, index) {
  const separatorIndex = line.indexOf(':');

  if (separatorIndex === -1) {
    console.error(`❌ Invalid tokens.txt format on line ${index + 1}`);
    console.error('Expected format: token:password');
    process.exit(1);
  }

  const token = line.slice(0, separatorIndex).trim();
  const password = line.slice(separatorIndex + 1).trim();

  if (!token || !password) {
    console.error(`❌ Missing token or password on line ${index + 1}`);
    process.exit(1);
  }

  return { token, password };
}

async function main() {
  const tokenLines = readLines('tokens.txt');
  const usernames = readLines('usernames.txt');

  if (tokenLines.length !== usernames.length) {
    console.error('❌ Token count must match username count');
    process.exit(1);
  }

  const cycleTLS = await initCycleTLS();

  const targets = usernames.map((username, i) => {
    const { token, password } = parseTokenPassword(tokenLines[i], i);
    return { username, token, password };
  });

  console.log(`🌐 Monitoring ${targets.length} username(s) in parallel\n`);

  const processTargets = async () => {
    await Promise.all(targets.map(async (target) => {
      const available = await checkUsername(cycleTLS, target.username, target.token);
      if (available) {
        await claimUsername(cycleTLS, target.username, target.token, target.password);
      }
    }));
  };

  // Initial check
  await processTargets();

  console.log(`⏳ Monitoring: ${targets.map(t => `@${t.username}`).join(', ')}\n`);

  // Interval check
  setInterval(processTargets, 5000);

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n👋 Shutting down...');
    await cycleTLS.exit();
    process.exit();
  });
}

main().catch(console.error);
