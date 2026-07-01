const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid requiring dotenv
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file is missing!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const tokenLine = envContent.split('\n').find(line => line.startsWith('APIFY_TOKEN='));
if (!tokenLine) {
  console.error('APIFY_TOKEN is missing in .env.local!');
  process.exit(1);
}

const APIFY_TOKEN = tokenLine.split('=')[1].trim();

const REEL_CODE = 'DY6tSYURB1s';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function run() {
  console.log(`Starting Apify run to fetch reel: ${REEL_CODE}...`);
  
  // Call Apify Instagram Scraper Actor
  const runResponse = await fetch(`https://api.apify.com/v2/acts/apify~instagram-scraper/runs?token=${APIFY_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      directUrls: [`https://www.instagram.com/reel/${REEL_CODE}/`],
      resultsType: 'details',
      searchType: 'hashtag',
      searchLimit: 1
    })
  });

  if (!runResponse.ok) {
    console.error(`Apify Run failed: ${runResponse.status} ${await runResponse.text()}`);
    process.exit(1);
  }

  const runData = await runResponse.json();
  const datasetId = runData.data.defaultDatasetId;
  const runId = runData.data.id;
  console.log(`Apify Actor run started. Run ID: ${runId}. Default Dataset ID: ${datasetId}. Waiting for completion...`);

  // Poll for completion
  let isFinished = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 10000)); // wait 10 seconds
    const statusResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    const statusData = await statusResponse.json();
    const status = statusData.data.status;
    console.log(`[Poll ${i+1}] Run Status: ${status}`);
    if (status === 'SUCCEEDED') {
      isFinished = true;
      break;
    } else if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT') {
      console.error(`Apify Actor run finished with failure status: ${status}`);
      process.exit(1);
    }
  }

  if (!isFinished) {
    console.error('Apify Actor run timed out waiting for completion.');
    process.exit(1);
  }

  // Get dataset items
  const itemsResponse = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`);
  const items = await itemsResponse.json();
  if (items.length === 0) {
    console.error('No items returned from Apify dataset.');
    process.exit(1);
  }

  const post = items[0];
  const videoUrl = post.videoUrl;
  if (!videoUrl) {
    console.error('No videoUrl found in the Instagram post item!', post);
    process.exit(1);
  }

  console.log(`Found Video URL: ${videoUrl}`);
  
  // Download video
  const destDir = path.join(__dirname, '..', 'public', 'videos');
  fs.mkdirSync(destDir, { recursive: true });
  const destFile = path.join(destDir, 'hero-reel.mp4');
  
  console.log('Downloading video file to public/videos/hero-reel.mp4...');
  const res = await fetch(videoUrl, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) {
    console.error(`Failed to download video: ${res.status}`);
    process.exit(1);
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(destFile, Buffer.from(buffer));
  console.log('[OK] Video downloaded successfully!');
}

run().catch(console.error);
