const fs = require('fs');
const path = require('path');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const REFERER = 'https://www.instagram.com/';

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Referer': REFERER
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP status ${res.status}`);
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`  [OK] Downloaded: ${path.basename(destPath)}`);
    return true;
  } catch (err) {
    console.error(`  [FAIL] Failed downloading ${url}: ${err.message}`);
    return false;
  }
}

async function run() {
  const rawDir = path.join(__dirname, '..', 'data', 'raw');
  const photosDir = path.join(__dirname, '..', 'public', 'photos');
  const videosDir = path.join(__dirname, '..', 'public', 'videos');

  // Ensure directories exist
  fs.mkdirSync(photosDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  const profilePath = path.join(rawDir, 'profile.json');
  const postsPath = path.join(rawDir, 'posts.json');

  // 1. Download profile picture
  if (fs.existsSync(profilePath)) {
    try {
      const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
      const user = Array.isArray(profile) ? profile[0] : profile;
      if (user && user.profilePicUrl) {
        console.log('Downloading profile picture...');
        await downloadFile(user.profilePicUrl, path.join(photosDir, 'profile_pic.jpg'));
      }
    } catch (e) {
      console.error('Error parsing profile.json:', e.message);
    }
  } else {
    console.log('No profile.json found, skipping profile picture download.');
  }

  // 2. Download posts images and videos
  if (fs.existsSync(postsPath)) {
    try {
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
      console.log(`Processing ${posts.length} posts for media download...`);

      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postId = post.id || post.shortCode || `post_${i}`;
        console.log(`Processing Post ${i + 1}/${posts.length} (ID: ${postId})...`);

        // Check for videos
        if (post.videoUrl) {
          const videoDest = path.join(videosDir, `${postId}.mp4`);
          await downloadFile(post.videoUrl, videoDest);
        }

        // Check for main image
        if (post.displayUrl || post.imageUrl) {
          const imgUrl = post.displayUrl || post.imageUrl;
          const imgDest = path.join(photosDir, `${postId}.jpg`);
          await downloadFile(imgUrl, imgDest);
        }

        // Check for carousel images
        if (Array.isArray(post.images) && post.images.length > 0) {
          for (let j = 0; j < post.images.length; j++) {
            const carouselImgUrl = post.images[j];
            const imgDest = path.join(photosDir, `${postId}_carousel_${j}.jpg`);
            await downloadFile(carouselImgUrl, imgDest);
          }
        }
      }
    } catch (e) {
      console.error('Error parsing posts.json:', e.message);
    }
  } else {
    console.log('No posts.json found, skipping posts media download.');
  }

  console.log('Media download phase completed.');
}

run().catch(console.error);
