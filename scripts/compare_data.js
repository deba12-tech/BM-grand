const fs = require('fs');
const path = require('path');

const scrapePath = path.join(__dirname, '..', 'data', 'raw', 'website-scrape.json');
if (!fs.existsSync(scrapePath)) {
  console.error('No website-scrape.json found!');
  process.exit(1);
}

const websiteData = JSON.parse(fs.readFileSync(scrapePath, 'utf8'));

console.log('=== OFFICIAL WEBSITE PAGES ===');
websiteData.pages.forEach(p => {
  console.log(`- ${p.path} (Title: "${p.title}")`);
});

console.log('\n=== OFFICIAL ROOM CATEGORIES & PRICING ===');
const parsedRooms = new Set();
websiteData.rooms.forEach(r => {
  if (r.name && r.name !== 'Amenities' && r.name !== 'Write a review' && r.name !== 'Related Rooms') {
    const key = r.name + ' - ' + r.price;
    if (!parsedRooms.has(key)) {
      parsedRooms.add(key);
      console.log(`- ${r.name}`);
      console.log(`  Price text: "${r.price.replace(/\s+/g, ' ')}"`);
      console.log(`  Description: "${r.description.slice(0, 200)}..."`);
      console.log(`  Amenities: ${JSON.stringify(r.amenities)}`);
    }
  }
});

console.log('\n=== ABOUT US PAGE COPY SAMPLES ===');
const aboutPage = websiteData.pages.find(p => p.path === '/about-us');
if (aboutPage && aboutPage.text) {
  // Print unique text paragraphs
  const uniqueText = [...new Set(aboutPage.text)].filter(t => t.length > 20);
  uniqueText.slice(0, 10).forEach((t, i) => console.log(`${i+1}. ${t}`));
} else {
  console.log('No /about-us page found or no text extracted.');
}

console.log('\n=== DESTINATIONS PAGE COPY SAMPLES ===');
const destPage = websiteData.pages.find(p => p.path === '/must-see-destinations');
if (destPage && destPage.text) {
  const uniqueText = [...new Set(destPage.text)].filter(t => t.length > 20);
  uniqueText.slice(0, 15).forEach((t, i) => console.log(`${i+1}. ${t}`));
} else {
  console.log('No /must-see-destinations page found.');
}
