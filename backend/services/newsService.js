const axios = require('axios');

// In-memory cache for live news
let newsCache = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

const TOPIC_IMAGES = {
    DIPLOMACY: [
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    ],
    LAW: [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80'
    ],
    HEALTH: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
    ],
    ENERGY: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
    ],
    TECH_AI: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
    ],
    SPACE: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80'
    ],
    FINANCE: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
    ],
    TRADE: [
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    ENVIRONMENT: [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    ],
    DEFENCE: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    ]
};

function getRelevantImageForTitle(title, category, index) {
    const text = (title + ' ' + category).toLowerCase();

    let pool = null;

    if (text.includes('brics') || text.includes('modi') || text.includes('summit') || text.includes('jaishankar') || text.includes('diplomat') || text.includes('minister') || text.includes('bilateral') || text.includes('eam') || text.includes('president') || text.includes('foreign')) {
        pool = TOPIC_IMAGES.DIPLOMACY;
    } else if (text.includes('court') || text.includes('supreme') || text.includes('law') || text.includes('judge') || text.includes('tribunal') || text.includes('justice') || text.includes('verdict')) {
        pool = TOPIC_IMAGES.LAW;
    } else if (text.includes('health') || text.includes('medical') || text.includes('hospital') || text.includes('medicine') || text.includes('doctor') || text.includes('pharma')) {
        pool = TOPIC_IMAGES.HEALTH;
    } else if (text.includes('petroleum') || text.includes('oil') || text.includes('energy') || text.includes('gas') || text.includes('fuel') || text.includes('coal') || text.includes('power')) {
        pool = TOPIC_IMAGES.ENERGY;
    } else if (text.includes('ai') || text.includes('google') || text.includes('tech') || text.includes('cyber') || text.includes('digital') || text.includes('robot') || text.includes('software')) {
        pool = TOPIC_IMAGES.TECH_AI;
    } else if (text.includes('space') || text.includes('isro') || text.includes('nasa') || text.includes('satellite') || text.includes('rocket') || text.includes('orbit')) {
        pool = TOPIC_IMAGES.SPACE;
    } else if (text.includes('trade') || text.includes('export') || text.includes('import') || text.includes('ship') || text.includes('port') || text.includes('cargo')) {
        pool = TOPIC_IMAGES.TRADE;
    } else if (text.includes('rbi') || text.includes('bank') || text.includes('inflation') || text.includes('gdp') || text.includes('gst') || text.includes('tax') || text.includes('economy') || text.includes('finance')) {
        pool = TOPIC_IMAGES.FINANCE;
    } else if (text.includes('environment') || text.includes('climate') || text.includes('forest') || text.includes('tiger') || text.includes('wildlife') || text.includes('green') || text.includes('rainfall')) {
        pool = TOPIC_IMAGES.ENVIRONMENT;
    } else if (text.includes('defense') || text.includes('defence') || text.includes('army') || text.includes('navy') || text.includes('drdo') || text.includes('missile')) {
        pool = TOPIC_IMAGES.DEFENCE;
    }

    if (!pool) {
        // Fallback by category
        if (category === 'POLITY') pool = TOPIC_IMAGES.DIPLOMACY;
        else if (category === 'ECONOMY') pool = TOPIC_IMAGES.FINANCE;
        else if (category === 'SCIENCE') pool = TOPIC_IMAGES.TECH_AI;
        else if (category === 'INTERNATIONAL') pool = TOPIC_IMAGES.DIPLOMACY;
        else pool = TOPIC_IMAGES.ENVIRONMENT;
    }

    const imgIndex = index % pool.length;
    return pool[imgIndex];
}

const CATEGORY_TOPICS = [
    {
        category: 'POLITY',
        query: 'Supreme Court OR Parliament OR Cabinet India OR Polity when:1d',
        defaultSnippet: 'Latest judicial and constitutional developments, parliamentary bills, and governance updates essential for competitive exams.'
    },
    {
        category: 'ECONOMY',
        query: 'RBI OR Indian Economy OR Finance Ministry OR GST India when:1d',
        defaultSnippet: 'Key monetary policy decisions, economic growth projections, fiscal updates, and banking sector developments.'
    },
    {
        category: 'SCIENCE',
        query: 'ISRO OR DRDO OR Science Technology India OR Artificial Intelligence India when:1d',
        defaultSnippet: 'Milestones in space missions, defence technologies, scientific innovations, and digital tech infrastructure.'
    },
    {
        category: 'INTERNATIONAL',
        query: 'India Foreign Affairs OR Ministry External Affairs India OR Bilateral Summit OR G20 when:1d',
        defaultSnippet: 'Bilateral trade pacts, international summits, foreign diplomatic engagements, and global geopolitical strategic updates.'
    },
    {
        category: 'ENVIRONMENT',
        query: 'Environment Ministry India OR Tiger Reserve OR Climate Change India OR Renewable Energy India when:1d',
        defaultSnippet: 'Biodiversity conservation efforts, national parks, renewable energy targets, and environmental policy directives.'
    }
];

function calculateTimeAgo(pubDateObj) {
    if (!pubDateObj || isNaN(pubDateObj.getTime())) return 'Today';
    
    const diffMs = Date.now() - pubDateObj.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) {
        return diffMins <= 5 ? 'Just now' : `${diffMins} Mins Ago`;
    }
    if (diffHours < 24) {
        return diffHours === 1 ? '1 Hour Ago' : `${diffHours} Hours Ago`;
    }
    
    const timeStr = pubDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `Today at ${timeStr}`;
}

function cleanText(raw) {
    if (!raw) return '';
    return raw
        .replace(/<!\[CDATA\[/g, '')
        .replace(/\]\]>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .trim();
}

async function fetchCategoryNews(topicObj) {
    try {
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(topicObj.query)}&hl=en-IN&gl=IN&ceid=IN:en`;
        const response = await axios.get(rssUrl, {
            timeout: 6000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const xml = response.data;
        const items = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;
        const now = Date.now();
        const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

        while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
            const itemXml = match[1];
            const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
            const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
            const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
            const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/);

            let rawTitle = titleMatch ? cleanText(titleMatch[1]) : '';
            let title = rawTitle.replace(/\s*-\s*[^-]+$/, '');
            let link = linkMatch ? cleanText(linkMatch[1]) : 'https://news.google.com';
            let pubDateRaw = pubDateMatch ? cleanText(pubDateMatch[1]) : '';
            let source = sourceMatch ? cleanText(sourceMatch[1]) : 'Live News';

            let pubDate = pubDateRaw ? new Date(pubDateRaw) : new Date();

            const ageMs = now - pubDate.getTime();
            if (isNaN(pubDate.getTime()) || ageMs > TWENTY_FOUR_HOURS_MS || ageMs < 0) {
                continue;
            }

            if (title) {
                const dynamicImage = getRelevantImageForTitle(title, topicObj.category, items.length);
                items.push({
                    id: `today-${topicObj.category.toLowerCase()}-${items.length}-${Date.now()}`,
                    title: title,
                    category: topicObj.category,
                    time: calculateTimeAgo(pubDate),
                    pubDateMs: pubDate.getTime(),
                    image: dynamicImage,
                    snippet: `${source}: ${title}. ${topicObj.defaultSnippet}`,
                    sourceUrl: link
                });
            }
        }

        return items;
    } catch (error) {
        console.error(`[NewsService] Failed to fetch ${topicObj.category}:`, error.message);
        return [];
    }
}

async function getLiveDailyNews(forceRefresh = false) {
    const now = Date.now();
    if (!forceRefresh && newsCache && (now - lastCacheTime < CACHE_TTL_MS)) {
        console.log('[NewsService] Returning cached TODAY news');
        return newsCache;
    }

    console.log('[NewsService] Fetching TODAY live news feeds with dynamic title-based images...');
    const fetchPromises = CATEGORY_TOPICS.map(topic => fetchCategoryNews(topic));
    const results = await Promise.all(fetchPromises);
    let allNews = results.flat();

    allNews.sort((a, b) => b.pubDateMs - a.pubDateMs);

    if (allNews.length > 0) {
        newsCache = allNews;
        lastCacheTime = now;
        console.log(`[NewsService] Successfully fetched ${allNews.length} TODAY live news items.`);
        return allNews;
    }

    return newsCache || [];
}

module.exports = {
    getLiveDailyNews
};
