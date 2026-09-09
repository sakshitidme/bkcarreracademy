const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const BASE_URL = 'https://bkeducation.in';
const PUBLIC_DIR = path.join(__dirname, '../../frontend/public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

const staticRoutes = [
  '',
  '/courses',
  '/about',
  '/syllabus',
  '/success-stories',
  '/mpsc',
  '/police',
  '/mahatet'
];

async function generateSitemap() {
  console.log('🚀 Starting Sitemap Generation...');
  
  let dynamicRoutes = [];
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    // Fetch dynamic content
    const items = await db.collection('portal_web_content').find({ 
      section: { $in: ['courses', 'upsc_hub', 'exams'] } 
    }).toArray();
    
    dynamicRoutes = items.map(item => {
      if (item.section === 'exams') {
        return `/exam/${encodeURIComponent(item.title)}`;
      }
      return `/courses`; // General courses page for others, or specific if implemented
    });
    
    await client.close();
    console.log(`✅ Fetched ${dynamicRoutes.length} dynamic routes from DB.`);
  } catch (err) {
    console.error('⚠️ Could not fetch dynamic routes, using static only:', err.message);
  }

  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])];
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  try {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    fs.writeFileSync(SITEMAP_PATH, sitemapContent);
    console.log(`✨ Sitemap successfully generated at: ${SITEMAP_PATH}`);
  } catch (err) {
    console.error('❌ Error writing sitemap file:', err);
  }
}

generateSitemap();
