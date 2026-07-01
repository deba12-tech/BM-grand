const fs = require('fs');
const path = require('path');

const LOGO_URL = 'https://bmgrandhotelandresort.com/storage/logo/logo.png';
const FAVICON_URL = 'https://bmgrandhotelandresort.com/storage/logo/logo-small.png';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function download(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) throw new Error(`HTTP status ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`[OK] Downloaded: ${url} -> ${dest}`);
    return true;
  } catch (err) {
    console.error(`[FAIL] Downloaded: ${url} -> ${err.message}`);
    return false;
  }
}

async function run() {
  const logoDir = path.join(__dirname, '..', 'public', 'logo');
  await download(LOGO_URL, path.join(logoDir, 'logo.png'));
  await download(FAVICON_URL, path.join(logoDir, 'logo-small.png'));
  console.log('Logo downloads completed.');
}

run();
