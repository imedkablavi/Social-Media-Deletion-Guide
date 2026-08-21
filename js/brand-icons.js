/**
 * Brand icon registry.
 * Primary logos are served as SVGs from Simple Icons. Every service also has a
 * text/fallback mark so a missing upstream icon never leaves a blank card.
 */
const brandIcons = {
    twitter: 'x', instagram: 'instagram', facebook: 'facebook', whatsapp: 'whatsapp',
    tiktok: 'tiktok', snapchat: 'snapchat', google: 'google', microsoft: 'microsoft',
    linkedin: 'linkedin', pinterest: 'pinterest', reddit: 'reddit', discord: 'discord',
    telegram: 'telegram', github: 'github', amazon: 'amazon', netflix: 'netflix',
    spotify: 'spotify', apple: 'apple', adobe: 'adobe', dropbox: 'dropbox', twitch: 'twitch',
    steam: 'steam', epicgames: 'epicgames', playstation: 'playstation', slack: 'slack',
    zoom: 'zoom', paypal: 'paypal', ebay: 'ebay', quora: 'quora', medium: 'medium',
    stackoverflow: 'stackoverflow', notion: 'notion', protonmail: 'protonmail', yahoo: 'yahoo',
    threads: 'threads', bluesky: 'bluesky', mastodon: 'mastodon', tumblr: 'tumblr',
    signal: 'signal', viber: 'viber', line: 'line', roblox: 'roblox', nintendo: 'nintendo',
    ea: 'ea', ubisoft: 'ubisoft', riotgames: 'riotgames', battlenet: 'battledotnet',
    gitlab: 'gitlab', atlassian: 'atlassian', figma: 'figma', airbnb: 'airbnb', uber: 'uber',
    claude: 'claude', gemini: 'googlegemini', perplexity: 'perplexity', mistral: 'mistralai',
    elevenlabs: 'elevenlabs', poe: 'poe'
};

const brandFallbacks = {
    other: '•', openai: 'OA', copilot: 'Co', characterai: 'C.ai'
};

function brandInitials(name = '') {
    const clean = String(name).replace(/[^a-zA-Z0-9. ]/g, ' ').trim();
    if (!clean) return '•';
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
}

function getBrandIconMeta(platform, displayName = '') {
    return {
        slug: brandIcons[platform.id] || null,
        fallback: brandFallbacks[platform.id] || brandInitials(displayName || platform.displayName || platform.name || platform.id)
    };
}
