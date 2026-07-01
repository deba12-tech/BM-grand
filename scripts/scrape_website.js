const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.bmgrandhotelandresort.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const DELAY_MS = 800; // 800ms politeness rate limit
const MAX_PAGES = 20;

const visitedUrls = new Set();
const queue = [BASE_URL];
const scrapedPages = [];
const imageList = []; // Array to track images to download

// Extracted structured data
const finalData = {
  branding: {
    logoUrl: null,
    faviconUrl: null,
    colors: [],
    name: 'BM Grand Hotel and Resort',
    tagline: ''
  },
  contact: {
    phones: [],
    emails: [],
    address: '',
    googleMapsLink: '',
    hours: ''
  },
  rooms: [],
  facilities: [],
  destinations: [],
  testimonials: [],
  pages: []
};

// Helper for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Clean URL: remove hash and query params, ensure correct absolute path
function cleanUrl(url) {
  try {
    const parsed = new URL(url, BASE_URL);
    parsed.hash = '';
    // Strip trailing slash except for root domain
    let cleaned = parsed.toString();
    if (cleaned.endsWith('/') && cleaned !== `${BASE_URL}/`) {
      cleaned = cleaned.slice(0, -1);
    }
    return cleaned;
  } catch (e) {
    return null;
  }
}

// Download file utility
async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`  [OK] Image: ${path.basename(destPath)}`);
    return true;
  } catch (err) {
    console.error(`  [FAIL] Image ${url}: ${err.message}`);
    return false;
  }
}

// Recursive crawl worker
async function crawl() {
  let count = 0;
  
  while (queue.length > 0 && count < MAX_PAGES) {
    const currentUrl = queue.shift();
    const urlString = cleanUrl(currentUrl);
    
    if (!urlString || visitedUrls.has(urlString)) continue;
    
    // Ensure we stay on the same domain
    if (!urlString.startsWith(BASE_URL)) continue;

    visitedUrls.add(urlString);
    count++;
    console.log(`[Crawl ${count}/${MAX_PAGES}] Fetching: ${urlString}...`);

    try {
      await delay(DELAY_MS);
      const response = await fetch(urlString, {
        headers: { 'User-Agent': USER_AGENT }
      });

      if (!response.ok) {
        console.warn(`  [WARN] Failed to fetch page: ${urlString} (Status ${response.status})`);
        continue;
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Parse current page content
      parsePage($, urlString);
      
      // Extract links to crawl further
      $('a').each((_, elem) => {
        const href = $(elem).attr('href');
        if (href) {
          const absolute = cleanUrl(href);
          if (absolute && absolute.startsWith(BASE_URL) && !visitedUrls.has(absolute) && !queue.includes(absolute)) {
            queue.push(absolute);
          }
        }
      });

    } catch (error) {
      console.error(`  [ERROR] Page ${urlString} failed: ${error.message}`);
    }
  }

  // Once crawl completes, process image downloads
  console.log(`Scraping text phase finished. Discovered ${imageList.length} media candidates. Downloading...`);
  const websitePhotosDir = path.join(__dirname, '..', 'public', 'photos', 'website');
  
  for (let i = 0; i < imageList.length; i++) {
    const { url, category, filename } = imageList[i];
    const dest = path.join(websitePhotosDir, category, filename);
    await delay(100); // Politeness delay between media downloads
    await downloadImage(url, dest);
  }

  // Save the structured JSON
  const rawDir = path.join(__dirname, '..', 'data', 'raw');
  fs.mkdirSync(rawDir, { recursive: true });
  fs.writeFileSync(path.join(rawDir, 'website-scrape.json'), JSON.stringify(finalData, null, 2), 'utf-8');
  console.log('Successfully saved website-scrape.json.');
}

// Parser logic for single page content
function parsePage($, url) {
  const title = $('title').text().trim();
  const h1 = $('h1').first().text().trim();
  const pagePath = new URL(url).pathname;

  console.log(`  Parsing: Path="${pagePath}" | Title="${title}"`);

  // Track raw page text
  const rawText = [];
  $('p, li, h2, h3, h4').each((_, el) => {
    const txt = $(el).text().trim().replace(/\s+/g, ' ');
    if (txt && txt.length > 5) {
      rawText.push(txt);
    }
  });

  scrapedPages.push({ url, title, h1, text: rawText });

  // 1. Logo & Branding extraction
  if (!finalData.branding.logoUrl) {
    const logoImg = $('img[src*="logo"]').first();
    if (logoImg.length > 0) {
      const src = logoImg.attr('src') || logoImg.attr('data-src') || logoImg.attr('data-lazy');
      if (src) {
        finalData.branding.logoUrl = cleanUrl(src);
      }
    }
  }

  if (!finalData.branding.faviconUrl) {
    const fav = $('link[rel*="icon"]').first();
    if (fav.length > 0) {
      finalData.branding.faviconUrl = cleanUrl(fav.attr('href'));
    }
  }

  // Identify brand colors from root styles
  const styleContent = $('style').text();
  const colorMatches = styleContent.match(/--primary-color:\s*([^;]+)/);
  if (colorMatches && colorMatches[1]) {
    finalData.branding.colors.push({ name: 'primary', value: colorMatches[1].trim() });
  }
  const secColorMatches = styleContent.match(/--secondary-color:\s*([^;]+)/);
  if (secColorMatches && secColorMatches[1]) {
    finalData.branding.colors.push({ name: 'secondary', value: secColorMatches[1].trim() });
  }

  // 2. Contact details & location extraction
  const pageHtml = $.html();
  
  // Scrape phone numbers (matches Indian format patterns like +91 90460 04894 or 9046004894)
  const phoneRegex = /(?:\+91[\-\s]?)?[6789]\d{9}|[6789]\d{4}[\-\s]?\d{5}/g;
  const phonesFound = pageHtml.match(phoneRegex);
  if (phonesFound) {
    phonesFound.forEach(p => {
      const cleanPhone = p.replace(/[\-\s]/g, '');
      if (cleanPhone.length >= 10 && !finalData.contact.phones.includes(p.trim())) {
        finalData.contact.phones.push(p.trim());
      }
    });
  }

  // Scrape email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emailsFound = pageHtml.match(emailRegex);
  if (emailsFound) {
    emailsFound.forEach(e => {
      if (!finalData.contact.emails.includes(e.trim())) {
        finalData.contact.emails.push(e.trim());
      }
    });
  }

  // Address lookup (heuristic: looking for Malda, West Bengal, Sahapur, Setu More)
  $('p, div, address').each((_, el) => {
    const text = $(el).text();
    if (text.includes('Sahapur') && text.includes('Malda') && text.length < 150) {
      finalData.contact.address = text.replace(/\s+/g, ' ').trim();
    }
  });

  // Maps Link
  const mapLink = $('a[href*="google.com/maps"], a[href*="maps.app.goo.gl"]').first();
  if (mapLink.length > 0) {
    finalData.contact.googleMapsLink = mapLink.attr('href');
  }

  // 3. Rooms parsing
  // Rooms page parsing (heuristics for Room categories)
  if (pagePath.includes('room')) {
    $('.room-item, .room-card, .room_box, .room-wrapper, div[class*="room"]').each((_, el) => {
      const name = $(el).find('h3, h4, .title, .room-title').first().text().trim();
      const desc = $(el).find('p, .desc, .description').first().text().trim();
      const priceText = $(el).find('.price, .room-price, span[class*="price"]').text().trim();
      const amenitiesList = [];
      
      $(el).find('li, .amenity, .facility').each((_, am) => {
        amenitiesList.push($(am).text().trim());
      });

      if (name && name.length > 3) {
        finalData.rooms.push({
          name,
          description: desc,
          price: priceText || 'Price not listed',
          amenities: amenitiesList
        });
      }
    });
  }

  // 4. Testimonials
  $('.testimonial-item, .testimonial, blockquote').each((_, el) => {
    const text = $(el).find('p, .quote, .text').text().trim();
    const author = $(el).find('h4, .author, .name').text().trim();
    if (text && text.length > 10) {
      finalData.testimonials.push({
        text,
        author: author || 'Anonymous'
      });
    }
  });

  // 5. Gather images for downloading
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy');
    if (src) {
      const cleanImgUrl = cleanUrl(src);
      if (cleanImgUrl && !cleanImgUrl.includes('logo-small') && !cleanImgUrl.includes('favicon')) {
        // Classify image category by pathname / page context
        let category = 'general';
        if (pagePath.includes('room')) category = 'rooms';
        else if (pagePath.includes('gallery')) category = 'gallery';
        else if (pagePath.includes('destination')) category = 'destinations';

        // Filter duplicates and construct filename
        const parsedUrl = new URL(cleanImgUrl);
        const baseName = path.basename(parsedUrl.pathname) || `img_${Math.random().toString(36).substr(2, 9)}`;
        const ext = path.extname(baseName) || '.jpg';
        const filename = `${path.basename(baseName, ext)}_${idx()}${ext}`;

        // Ensure we don't request the exact same url multiple times
        if (!imageList.some(img => img.url === cleanImgUrl)) {
          imageList.push({ url: cleanImgUrl, category, filename });
        }
      }
    }
  });

  // Add pages array to final output
  finalData.pages.push({
    url,
    path: pagePath,
    title,
    h1,
    text: rawText
  });
}

let fileIndex = 0;
function idx() {
  fileIndex++;
  return fileIndex;
}

crawl().catch(console.error);
