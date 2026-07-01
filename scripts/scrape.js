const fs = require('fs');
const path = require('path');

// Helper to load env variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local file not found.');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      env[key] = val;
    }
  });
  return env;
}

async function run() {
  const env = loadEnv();
  const token = env.APIFY_TOKEN;
  const instagramUrl = env.NEXT_PUBLIC_INSTAGRAM_URL;

  if (!token || !instagramUrl) {
    console.error('Error: APIFY_TOKEN or NEXT_PUBLIC_INSTAGRAM_URL is missing in .env.local.');
    process.exit(1);
  }

  // Extract username from URL
  // e.g. https://www.instagram.com/bmgrand_hotel_and_resort?igsh=em5xYXB5aGEzOGti -> bmgrand_hotel_and_resort
  let username = 'bmgrand_hotel_and_resort';
  try {
    const urlObj = new URL(instagramUrl);
    const pathParts = urlObj.pathname.split('/').filter(p => p);
    if (pathParts.length > 0) {
      username = pathParts[0];
    }
  } catch (e) {
    console.warn('Could not parse username from URL, using default:', username);
  }

  console.log(`Scraping Instagram profile for username: "${username}"...`);

  // Ensure data directories exist
  const rawDir = path.join(__dirname, '..', 'data', 'raw');
  fs.mkdirSync(rawDir, { recursive: true });

  // 1. Profile Scraper
  try {
    const profileRes = await fetch('https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usernames: [username] })
    });

    if (!profileRes.ok) {
      const text = await profileRes.text();
      throw new Error(`Profile scraper HTTP error ${profileRes.status}: ${text}`);
    }

    const profileData = await profileRes.json();
    fs.writeFileSync(path.join(rawDir, 'profile.json'), JSON.stringify(profileData, null, 2), 'utf8');
    console.log('Successfully saved profile.json.');
  } catch (err) {
    console.error('Profile scrape failed:', err.message);
  }

  // 2. Posts Scraper
  console.log(`Scraping Instagram posts for URL: "${instagramUrl}"...`);
  try {
    const cleanInstagramUrl = instagramUrl.split('?')[0].replace(/\/$/, '');
    const postsRes = await fetch('https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        directUrls: [cleanInstagramUrl],
        resultsType: 'posts',
        resultsLimit: 30
      })
    });

    if (!postsRes.ok) {
      const text = await postsRes.text();
      throw new Error(`Posts scraper HTTP error ${postsRes.status}: ${text}`);
    }

    const postsData = await postsRes.json();
    fs.writeFileSync(path.join(rawDir, 'posts.json'), JSON.stringify(postsData, null, 2), 'utf8');
    console.log('Successfully saved posts.json.');
  } catch (err) {
    console.error('Posts scrape failed:', err.message);
  }

  console.log('Scrape phase completed.');
}

run().catch(console.error);
