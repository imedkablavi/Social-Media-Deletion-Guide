#!/usr/bin/env node
/**
 * Production static-site build.
 *
 * The interactive directory remains the homepage. This build creates crawlable,
 * no-JavaScript service pages in EN / AR / FR / TR, adds curated editorial depth
 * only where it has been reviewed, generates useful topic hubs, and builds the
 * sitemap from the same effective catalog users see in the interactive UI.
 */
const fs = require('fs');
const path = require('path');
const { loadCatalog } = require('./load-catalog.js');
const { GUIDE_CONTENT, TOPIC_PAGES } = require('./growth-content.js');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BASE_URL = 'https://imedkablavi.github.io/Social-Media-Deletion-Guide/';
const { platforms, categories, resourceTypes, translations } = loadCatalog();

const LANGS = {
    en: {
        dir: 'ltr', name: 'English', locale: 'en_US', site: 'Account Deletion & Privacy Guide',
        indexTitle: 'Account Deletion Guides by Service | Privacy Guide',
        indexDescription: 'Browse official account deletion, privacy, data export and AI activity guides for supported online services.',
        eyebrow: 'Official account & privacy resources', category: 'Category', difficulty: 'Deletion difficulty', resources: 'Official resources', verified: 'Last verified',
        easy: 'Easy', medium: 'Medium', hard: 'Hard', unknown: 'Not rated',
        officialActions: 'Official actions for this service', beforeTitle: 'Before you delete the account', relatedTitle: 'Related account deletion guides',
        before: ['Export any data you want to keep.', 'Review active subscriptions and cancel billing separately when required.', 'Check connected apps, recovery methods and security settings.', 'Use the provider-owned links below; this directory never asks for your password.'],
        signIn: 'Sign-in may be required', official: 'Official source', checked: 'Checked', entireAccount: 'Affects the entire account',
        back: 'All service guides', home: 'Directory home', language: 'Read this guide in another language', breadcrumbLabel: 'Breadcrumb', languagesLabel: 'Languages', servicesLabel: 'services',
        scopeGoogleAccount: 'Google account', scopeMicrosoftAccount: 'Microsoft account',
        topics: 'Deletion topics', topicsLead: 'Browse focused guides for AI accounts, social media, messaging accounts and data export.', topicsBack: 'All deletion topics',
        keyThings: 'Important things to know', reviewed: 'Editorial review', exploreTopics: 'Related privacy and deletion topics',
        intro: name => `Use the provider-owned resources below to delete or manage your ${name} account, export data, review privacy controls, or remove activity when those options are available.`,
        indexLead: 'Each page is generated from the maintained catalog and links directly to provider-owned resources. Choose a service to see deletion difficulty, verification metadata and available account actions.'
    },
    ar: {
        dir: 'rtl', name: 'العربية', locale: 'ar_AR', site: 'دليل حذف الحسابات والخصوصية',
        indexTitle: 'أدلة حذف الحسابات حسب الخدمة | دليل الخصوصية',
        indexDescription: 'تصفح روابط وأدلة رسمية لحذف الحسابات والبيانات ونشاط الذكاء الاصطناعي وإدارة الخصوصية للخدمات المدعومة.',
        eyebrow: 'روابط رسمية للحساب والخصوصية', category: 'الفئة', difficulty: 'صعوبة الحذف', resources: 'المصادر الرسمية', verified: 'آخر تحقق',
        easy: 'سهل', medium: 'متوسط', hard: 'صعب', unknown: 'غير مصنف',
        officialActions: 'الإجراءات الرسمية لهذه الخدمة', beforeTitle: 'قبل حذف الحساب', relatedTitle: 'أدلة حذف حسابات مرتبطة',
        before: ['صدّر أي بيانات تريد الاحتفاظ بها.', 'راجع الاشتراكات النشطة وألغِ الفوترة بشكل منفصل عند الحاجة.', 'تحقق من التطبيقات المرتبطة وطرق الاسترداد وإعدادات الأمان.', 'استخدم روابط مزود الخدمة أدناه؛ هذا الدليل لا يطلب كلمة مرورك أبداً.'],
        signIn: 'قد يلزم تسجيل الدخول', official: 'مصدر رسمي', checked: 'تم التحقق', entireAccount: 'يؤثر على الحساب بالكامل',
        back: 'كل أدلة الخدمات', home: 'الصفحة الرئيسية', language: 'اقرأ هذا الدليل بلغة أخرى', breadcrumbLabel: 'مسار التنقل', languagesLabel: 'اللغات', servicesLabel: 'خدمة',
        scopeGoogleAccount: 'حساب Google', scopeMicrosoftAccount: 'حساب Microsoft',
        topics: 'مواضيع الحذف والخصوصية', topicsLead: 'تصفح أدلة مركزة لحسابات الذكاء الاصطناعي والتواصل والمراسلة وتصدير البيانات.', topicsBack: 'كل مواضيع الحذف',
        keyThings: 'معلومات مهمة قبل الحذف', reviewed: 'مراجعة المحتوى', exploreTopics: 'مواضيع مرتبطة بالخصوصية والحذف',
        intro: name => `استخدم المصادر الرسمية أدناه لحذف أو إدارة حساب ${name} أو تصدير البيانات أو مراجعة إعدادات الخصوصية أو حذف النشاط عند توفر هذه الخيارات.`,
        indexLead: 'يتم إنشاء كل صفحة من الكتالوج الذي تتم صيانته وتربط مباشرة بالمصادر الرسمية للخدمة. اختر خدمة لعرض صعوبة الحذف وتاريخ التحقق والإجراءات المتاحة.'
    },
    fr: {
        dir: 'ltr', name: 'Français', locale: 'fr_FR', site: 'Guide de suppression de comptes et confidentialité',
        indexTitle: 'Guides de suppression de compte par service | Confidentialité',
        indexDescription: 'Consultez les ressources officielles pour supprimer des comptes, exporter des données, gérer la confidentialité et effacer l’activité IA.',
        eyebrow: 'Ressources officielles de compte et confidentialité', category: 'Catégorie', difficulty: 'Difficulté de suppression', resources: 'Ressources officielles', verified: 'Dernière vérification',
        easy: 'Facile', medium: 'Moyenne', hard: 'Difficile', unknown: 'Non évaluée',
        officialActions: 'Actions officielles pour ce service', beforeTitle: 'Avant de supprimer le compte', relatedTitle: 'Guides de suppression associés',
        before: ['Exportez les données que vous souhaitez conserver.', 'Vérifiez les abonnements actifs et annulez la facturation séparément si nécessaire.', 'Vérifiez les applications connectées, les méthodes de récupération et les paramètres de sécurité.', 'Utilisez les liens du fournisseur ci-dessous ; ce guide ne demande jamais votre mot de passe.'],
        signIn: 'Connexion parfois requise', official: 'Source officielle', checked: 'Vérifié', entireAccount: 'Affecte le compte entier',
        back: 'Tous les guides', home: 'Accueil du répertoire', language: 'Lire ce guide dans une autre langue', breadcrumbLabel: 'Fil d’Ariane', languagesLabel: 'Langues', servicesLabel: 'services',
        scopeGoogleAccount: 'compte Google', scopeMicrosoftAccount: 'compte Microsoft',
        topics: 'Thèmes de suppression', topicsLead: 'Parcourez les guides dédiés aux comptes IA, réseaux sociaux, messageries et à l’export des données.', topicsBack: 'Tous les thèmes',
        keyThings: 'Points importants à connaître', reviewed: 'Révision éditoriale', exploreTopics: 'Thèmes associés de confidentialité et suppression',
        intro: name => `Utilisez les ressources officielles ci-dessous pour supprimer ou gérer votre compte ${name}, exporter vos données, contrôler la confidentialité ou supprimer l’activité lorsque ces options existent.`,
        indexLead: 'Chaque page est générée depuis le catalogue maintenu et renvoie directement vers les ressources du fournisseur. Choisissez un service pour voir la difficulté, les dates de vérification et les actions disponibles.'
    },
    tr: {
        dir: 'ltr', name: 'Türkçe', locale: 'tr_TR', site: 'Hesap Silme ve Gizlilik Rehberi',
        indexTitle: 'Hizmete Göre Hesap Silme Rehberleri | Gizlilik',
        indexDescription: 'Desteklenen çevrimiçi hizmetler için resmî hesap silme, veri dışa aktarma, gizlilik ve yapay zekâ etkinliği bağlantılarını inceleyin.',
        eyebrow: 'Resmî hesap ve gizlilik kaynakları', category: 'Kategori', difficulty: 'Silme zorluğu', resources: 'Resmî kaynaklar', verified: 'Son doğrulama',
        easy: 'Kolay', medium: 'Orta', hard: 'Zor', unknown: 'Derecelendirilmedi',
        officialActions: 'Bu hizmet için resmî işlemler', beforeTitle: 'Hesabı silmeden önce', relatedTitle: 'İlgili hesap silme rehberleri',
        before: ['Saklamak istediğiniz verileri dışa aktarın.', 'Etkin abonelikleri kontrol edin ve gerekiyorsa faturalandırmayı ayrıca iptal edin.', 'Bağlı uygulamaları, kurtarma yöntemlerini ve güvenlik ayarlarını gözden geçirin.', 'Aşağıdaki sağlayıcı bağlantılarını kullanın; bu rehber hiçbir zaman parolanızı istemez.'],
        signIn: 'Oturum açmanız gerekebilir', official: 'Resmî kaynak', checked: 'Kontrol edildi', entireAccount: 'Tüm hesabı etkiler',
        back: 'Tüm hizmet rehberleri', home: 'Dizin ana sayfası', language: 'Bu rehberi başka dilde okuyun', breadcrumbLabel: 'Gezinti yolu', languagesLabel: 'Diller', servicesLabel: 'hizmet',
        scopeGoogleAccount: 'Google hesabı', scopeMicrosoftAccount: 'Microsoft hesabı',
        topics: 'Hesap silme konuları', topicsLead: 'Yapay zekâ, sosyal medya, mesajlaşma hesapları ve veri dışa aktarma için odaklanmış rehberlere göz atın.', topicsBack: 'Tüm silme konuları',
        keyThings: 'Bilmeniz gereken önemli noktalar', reviewed: 'Editoryal inceleme', exploreTopics: 'İlgili gizlilik ve silme konuları',
        intro: name => `Aşağıdaki sağlayıcı kaynaklarını kullanarak ${name} hesabınızı silebilir veya yönetebilir, verilerinizi dışa aktarabilir, gizlilik ayarlarını inceleyebilir ya da mevcutsa etkinliği silebilirsiniz.`,
        indexLead: 'Her sayfa bakımı yapılan katalogdan üretilir ve doğrudan sağlayıcıya ait kaynaklara bağlanır. Silme zorluğu, doğrulama bilgisi ve kullanılabilir işlemler için bir hizmet seçin.'
    }
};

const difficultyDefaults = {
    twitter: 'medium', instagram: 'medium', facebook: 'medium', whatsapp: 'medium', tiktok: 'medium', snapchat: 'medium',
    google: 'hard', microsoft: 'hard', apple: 'hard', amazon: 'hard', netflix: 'medium', spotify: 'easy',
    discord: 'easy', telegram: 'medium', github: 'hard', gitlab: 'hard', reddit: 'easy', linkedin: 'medium',
    paypal: 'hard', ebay: 'medium', steam: 'hard', epicgames: 'medium', playstation: 'hard', notion: 'easy',
    slack: 'medium', zoom: 'easy', dropbox: 'easy', adobe: 'medium', yahoo: 'medium', protonmail: 'easy'
};

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const slugFor = platform => String(platform.id || platform.name || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const nameFor = (platform, lang) => platform.displayName || translations?.[lang]?.platforms?.[platform.name] || translations?.[lang]?.platforms?.[platform.id] || platform.name || platform.id;
const categoryFor = (platform, lang) => categories?.[platform.category]?.[lang] || categories?.[platform.category]?.en || platform.category || 'Service';
const resourceTitleFor = (resource, lang) => resource?.title?.[lang] || resource?.title?.en || resource?.title?.ar || resource?.url || '';
const resourceTypeFor = (resource, lang) => resourceTypes?.[resource.type]?.[lang] || resourceTypes?.[resource.type]?.en || resource.type || 'Resource';
const difficultyFor = platform => platform.difficulty || difficultyDefaults[platform.id] || 'medium';
const latestVerified = platform => (platform.resources || []).map(resource => resource.verified).filter(Boolean).sort().at(-1) || null;
const officialCount = platform => (platform.resources || []).filter(resource => resource.official !== false).length;
const guideFor = (platform, lang) => GUIDE_CONTENT?.[platform.id]?.[lang] || null;
const guideReviewed = platform => GUIDE_CONTENT?.[platform.id]?.reviewed || null;

const noteFor = (platform, lang) => {
    if (!platform?.note) return '';
    if (typeof platform.note === 'string') return lang === 'en' ? platform.note : '';
    return platform.note[lang] || platform.note.en || '';
};
const scopeFor = (scope, lang) => {
    const key = String(scope || '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const prop = `scope${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    return LANGS[lang]?.[prop] || String(scope || '').replaceAll('-', ' ');
};

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(relativePath, content) { const target = path.join(DIST, relativePath); ensureDir(path.dirname(target)); fs.writeFileSync(target, content, 'utf8'); }
function copy(relativePath) { const source = path.join(ROOT, relativePath); const target = path.join(DIST, relativePath); if (!fs.existsSync(source)) return; ensureDir(path.dirname(target)); fs.cpSync(source, target, { recursive: true }); }

function pageTitle(platform, lang) {
    const curated = guideFor(platform, lang);
    if (curated?.title) return curated.title;
    const name = nameFor(platform, lang);
    if (lang === 'ar') return `كيفية حذف حساب ${name} وإدارة بياناته | دليل الخصوصية`;
    if (lang === 'fr') return `Supprimer le compte ${name} et gérer ses données | Guide`;
    if (lang === 'tr') return `${name} Hesabı Nasıl Silinir ve Veriler Nasıl Yönetilir | Rehber`;
    return `How to Delete ${name} Account & Manage Data | Privacy Guide`;
}

function pageDescription(platform, lang) {
    const curated = guideFor(platform, lang);
    if (curated?.description) return curated.description;
    const name = nameFor(platform, lang);
    if (lang === 'ar') return `روابط رسمية لحذف أو إدارة حساب ${name}، تصدير البيانات، مراجعة الخصوصية والأمان وحذف النشاط عند توفره.`;
    if (lang === 'fr') return `Liens officiels pour supprimer ou gérer votre compte ${name}, exporter vos données et contrôler la confidentialité, la sécurité et l’activité.`;
    if (lang === 'tr') return `${name} hesabını silmek veya yönetmek, verileri dışa aktarmak ve gizlilik, güvenlik ya da etkinlik ayarlarını açmak için resmî bağlantılar.`;
    return `Official links to delete or manage your ${name} account, export data, and review privacy, security or activity controls.`;
}

function serviceAlternateLinks(platform = null) {
    const slug = platform ? slugFor(platform) : null;
    return Object.keys(LANGS).map(lang => {
        const href = slug ? `${BASE_URL}${lang}/services/${slug}/` : `${BASE_URL}${lang}/services/`;
        return `<link rel="alternate" hreflang="${lang}" href="${href}">`;
    }).concat(`<link rel="alternate" hreflang="x-default" href="${slug ? `${BASE_URL}en/services/${slug}/` : `${BASE_URL}en/services/`}">`).join('\n    ');
}

function topicAlternateLinks(slug = null) {
    return Object.keys(LANGS).map(lang => `<link rel="alternate" hreflang="${lang}" href="${BASE_URL}${lang}/topics/${slug ? `${slug}/` : ''}">`)
        .concat(`<link rel="alternate" hreflang="x-default" href="${BASE_URL}en/topics/${slug ? `${slug}/` : ''}">`).join('\n    ');
}

function serviceJsonLd(platform, lang, url) {
    const name = nameFor(platform, lang);
    const modified = guideReviewed(platform) || latestVerified(platform);
    const items = (platform.resources || []).map((resource, index) => ({ '@type': 'ListItem', position: index + 1, name: resourceTitleFor(resource, lang), url: resource.url }));
    const webpage = {
        '@type': 'WebPage', '@id': url, url, name: pageTitle(platform, lang), description: pageDescription(platform, lang), inLanguage: lang,
        isPartOf: { '@type': 'WebSite', name: LANGS[lang].site, url: BASE_URL }, breadcrumb: { '@id': `${url}#breadcrumb` }, mainEntity: { '@id': `${url}#resources` }
    };
    if (modified) webpage.dateModified = modified;
    return { '@context': 'https://schema.org', '@graph': [webpage,
        { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
            { '@type': 'ListItem', position: 1, name: LANGS[lang].home, item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: LANGS[lang].back, item: `${BASE_URL}${lang}/services/` },
            { '@type': 'ListItem', position: 3, name }
        ]},
        { '@type': 'ItemList', '@id': `${url}#resources`, name: LANGS[lang].officialActions, itemListElement: items }
    ]};
}

function commonHead({ lang, title, description, canonical, alternates, jsonLd }) {
    return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    ${alternates}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${LANGS[lang].locale}">
    <meta property="og:site_name" content="${escapeHtml(LANGS[lang].site)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${BASE_URL}assets/social-preview.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${BASE_URL}assets/social-preview.png">
    <link rel="icon" href="${BASE_URL}assets/favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="${BASE_URL}site.webmanifest">
    <link rel="stylesheet" href="${BASE_URL}css/service-page.css">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function serviceLanguageLinks(platform) {
    const slug = slugFor(platform);
    return Object.entries(LANGS).map(([lang, cfg]) => `<a hreflang="${lang}" lang="${lang}" href="${BASE_URL}${lang}/services/${slug}/">${escapeHtml(cfg.name)}</a>`).join('');
}

function topicLanguageLinks(slug) {
    return Object.entries(LANGS).map(([lang, cfg]) => `<a hreflang="${lang}" lang="${lang}" href="${BASE_URL}${lang}/topics/${slug}/">${escapeHtml(cfg.name)}</a>`).join('');
}

function relatedLinks(platform, lang) {
    return platforms.filter(item => item.id !== platform.id && item.category === platform.category).slice(0, 6)
        .map(item => `<a href="${BASE_URL}${lang}/services/${slugFor(item)}/">${escapeHtml(nameFor(item, lang))}</a>`).join('');
}

function topicMatchesPlatform(topic, platform) {
    if (topic.kind === 'category') return platform.category === topic.value;
    if (topic.kind === 'resourceType') return (platform.resources || []).some(resource => resource.type === topic.value);
    return false;
}

function relatedTopicLinks(platform, lang) {
    return Object.entries(TOPIC_PAGES).filter(([, topic]) => topicMatchesPlatform(topic, platform)).map(([slug, topic]) => {
        const content = topic[lang] || topic.en;
        return `<a href="${BASE_URL}${lang}/topics/${slug}/">${escapeHtml(content.heading)}</a>`;
    }).join('');
}

function curatedInsight(platform, lang) {
    const guide = guideFor(platform, lang);
    if (!guide) return '';
    const cfg = LANGS[lang];
    const reviewed = guideReviewed(platform);
    return `<section class="guide-insight" aria-labelledby="key-things">
        <div class="editorial-review">${escapeHtml(cfg.reviewed)}: <time datetime="${escapeHtml(reviewed)}">${escapeHtml(reviewed)}</time></div>
        <h2 id="key-things">${escapeHtml(guide.heading || cfg.keyThings)}</h2>
        <p>${escapeHtml(guide.overview)}</p>
        <ul class="insight-list">${guide.points.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ul>
    </section>`;
}

function renderServicePage(platform, lang) {
    const cfg = LANGS[lang];
    const name = nameFor(platform, lang);
    const slug = slugFor(platform);
    const canonical = `${BASE_URL}${lang}/services/${slug}/`;
    const verified = latestVerified(platform);
    const difficulty = difficultyFor(platform);
    const resources = platform.resources || [];
    const localizedNote = noteFor(platform, lang);
    const note = localizedNote ? `<p class="note">${escapeHtml(localizedNote)}</p>` : '';
    const resourceCards = resources.map(resource => {
        const warning = resource.destructiveScope ? `<span class="scope-warning">${escapeHtml(cfg.entireAccount)}: ${escapeHtml(scopeFor(resource.destructiveScope, lang))}</span>` : '';
        return `<li class="resource-card"><a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(resourceTitleFor(resource, lang))}</a><div class="resource-meta"><span>${escapeHtml(resourceTypeFor(resource, lang))}</span>${resource.official !== false ? `<span class="official">${escapeHtml(cfg.official)}</span>` : ''}${resource.verified ? `<span>${escapeHtml(cfg.checked)} ${escapeHtml(resource.verified)}</span>` : ''}${platform.loginRequired !== false ? `<span>${escapeHtml(cfg.signIn)}</span>` : ''}${warning}</div></li>`;
    }).join('');
    const topics = relatedTopicLinks(platform, lang);
    const h1 = guideFor(platform, lang)?.heading || pageTitle(platform, lang).replace(/\s*\|.*$/, '');
    return `<!doctype html>
<html lang="${lang}" dir="${cfg.dir}">
<head>${commonHead({ lang, title: pageTitle(platform, lang), description: pageDescription(platform, lang), canonical, alternates: serviceAlternateLinks(platform), jsonLd: serviceJsonLd(platform, lang, canonical) })}</head>
<body>
<header class="site-header"><div class="container"><a class="brand" href="${BASE_URL}">${escapeHtml(cfg.site)}</a><div class="header-links"><a href="${BASE_URL}${lang}/services/">${escapeHtml(cfg.back)}</a><a href="${BASE_URL}${lang}/topics/">${escapeHtml(cfg.topics)}</a><a href="${BASE_URL}">${escapeHtml(cfg.home)}</a></div></div></header>
<main class="container">
    <nav class="breadcrumbs" aria-label="${escapeHtml(cfg.breadcrumbLabel)}"><a href="${BASE_URL}">${escapeHtml(cfg.home)}</a> / <a href="${BASE_URL}${lang}/services/">${escapeHtml(cfg.back)}</a> / <span>${escapeHtml(name)}</span></nav>
    <p class="eyebrow">${escapeHtml(cfg.eyebrow)}</p>
    <h1>${escapeHtml(h1)}</h1>
    <p class="lead">${escapeHtml(guideFor(platform, lang)?.overview || cfg.intro(name))}</p>
    <div class="summary-grid">
        <div class="summary-item"><span>${escapeHtml(cfg.category)}</span><strong>${escapeHtml(categoryFor(platform, lang))}</strong></div>
        <div class="summary-item"><span>${escapeHtml(cfg.difficulty)}</span><strong>${escapeHtml(cfg[difficulty] || cfg.unknown)}</strong></div>
        <div class="summary-item"><span>${escapeHtml(cfg.resources)}</span><strong>${officialCount(platform)} / ${resources.length}</strong></div>
        <div class="summary-item"><span>${escapeHtml(cfg.verified)}</span><strong>${escapeHtml(verified || '—')}</strong></div>
    </div>
    ${curatedInsight(platform, lang)}
    ${note}
    <section aria-labelledby="official-actions"><h2 id="official-actions">${escapeHtml(cfg.officialActions)}</h2><ul class="resource-list">${resourceCards}</ul></section>
    <section aria-labelledby="before-delete"><h2 id="before-delete">${escapeHtml(cfg.beforeTitle)}</h2><ul class="checklist">${cfg.before.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
    ${topics ? `<section aria-labelledby="related-topics"><h2 id="related-topics">${escapeHtml(cfg.exploreTopics)}</h2><div class="related-grid topic-links">${topics}</div></section>` : ''}
    <section aria-labelledby="related-guides"><h2 id="related-guides">${escapeHtml(cfg.relatedTitle)}</h2><div class="related-grid">${relatedLinks(platform, lang)}</div></section>
    <section aria-labelledby="language-options"><h2 id="language-options">${escapeHtml(cfg.language)}</h2><div class="language-links" aria-label="${escapeHtml(cfg.languagesLabel)}">${serviceLanguageLinks(platform)}</div></section>
</main>
<footer><div class="container">© 2026 imedkablavi · <a href="https://github.com/imedkablavi/Social-Media-Deletion-Guide">GitHub</a></div></footer>
</body></html>`;
}

function serviceIndexJsonLd(lang) {
    const url = `${BASE_URL}${lang}/services/`;
    return { '@context': 'https://schema.org', '@type': 'CollectionPage', url, name: LANGS[lang].indexTitle, description: LANGS[lang].indexDescription, inLanguage: lang,
        mainEntity: { '@type': 'ItemList', itemListElement: platforms.map((platform, index) => ({ '@type': 'ListItem', position: index + 1, name: nameFor(platform, lang), url: `${url}${slugFor(platform)}/` })) } };
}

function renderServiceIndex(lang) {
    const cfg = LANGS[lang];
    const canonical = `${BASE_URL}${lang}/services/`;
    const cards = [...platforms].sort((a, b) => nameFor(a, lang).localeCompare(nameFor(b, lang))).map(platform => `<a href="${canonical}${slugFor(platform)}/"><strong>${escapeHtml(nameFor(platform, lang))}</strong><small>${escapeHtml(categoryFor(platform, lang))} · ${escapeHtml(cfg[difficultyFor(platform)] || cfg.unknown)}</small></a>`).join('');
    const langSwitch = Object.entries(LANGS).map(([code, item]) => `<a hreflang="${code}" lang="${code}" href="${BASE_URL}${code}/services/">${escapeHtml(item.name)}</a>`).join('');
    return `<!doctype html><html lang="${lang}" dir="${cfg.dir}"><head>${commonHead({ lang, title: cfg.indexTitle, description: cfg.indexDescription, canonical, alternates: serviceAlternateLinks(), jsonLd: serviceIndexJsonLd(lang) })}</head><body>
<header class="site-header"><div class="container"><a class="brand" href="${BASE_URL}">${escapeHtml(cfg.site)}</a><div class="header-links"><a href="${BASE_URL}${lang}/topics/">${escapeHtml(cfg.topics)}</a><a href="${BASE_URL}">${escapeHtml(cfg.home)}</a></div></div></header>
<main class="container"><p class="eyebrow">${escapeHtml(cfg.eyebrow)}</p><h1>${escapeHtml(cfg.indexTitle.replace(/\s*\|.*$/, ''))}</h1><p class="lead">${escapeHtml(cfg.indexLead)}</p><p><a href="${BASE_URL}${lang}/topics/">${escapeHtml(cfg.topicsLead)}</a></p><div class="language-links" aria-label="${escapeHtml(cfg.languagesLabel)}">${langSwitch}</div><div class="service-index">${cards}</div></main>
<footer><div class="container">${platforms.length} ${escapeHtml(cfg.servicesLabel)} · <a href="https://github.com/imedkablavi/Social-Media-Deletion-Guide">GitHub</a></div></footer></body></html>`;
}

function matchingPlatforms(topic) { return platforms.filter(platform => topicMatchesPlatform(topic, platform)); }

function topicJsonLd(slug, lang) {
    const topic = TOPIC_PAGES[slug];
    const content = topic[lang] || topic.en;
    const url = `${BASE_URL}${lang}/topics/${slug}/`;
    const matches = matchingPlatforms(topic);
    return { '@context': 'https://schema.org', '@type': 'CollectionPage', url, name: content.title, description: content.description, inLanguage: lang,
        mainEntity: { '@type': 'ItemList', itemListElement: matches.map((platform, index) => ({ '@type': 'ListItem', position: index + 1, name: nameFor(platform, lang), url: `${BASE_URL}${lang}/services/${slugFor(platform)}/` })) } };
}

function renderTopicPage(slug, lang) {
    const cfg = LANGS[lang];
    const topic = TOPIC_PAGES[slug];
    const content = topic[lang] || topic.en;
    const canonical = `${BASE_URL}${lang}/topics/${slug}/`;
    const cards = matchingPlatforms(topic).sort((a, b) => nameFor(a, lang).localeCompare(nameFor(b, lang))).map(platform => `<a href="${BASE_URL}${lang}/services/${slugFor(platform)}/"><strong>${escapeHtml(nameFor(platform, lang))}</strong><small>${escapeHtml(categoryFor(platform, lang))} · ${officialCount(platform)} ${escapeHtml(cfg.resources.toLowerCase())}</small></a>`).join('');
    const sections = content.sections.map(([title, body]) => `<section class="topic-copy"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></section>`).join('');
    return `<!doctype html><html lang="${lang}" dir="${cfg.dir}"><head>${commonHead({ lang, title: content.title, description: content.description, canonical, alternates: topicAlternateLinks(slug), jsonLd: topicJsonLd(slug, lang) })}</head><body>
<header class="site-header"><div class="container"><a class="brand" href="${BASE_URL}">${escapeHtml(cfg.site)}</a><div class="header-links"><a href="${BASE_URL}${lang}/topics/">${escapeHtml(cfg.topicsBack)}</a><a href="${BASE_URL}${lang}/services/">${escapeHtml(cfg.back)}</a></div></div></header>
<main class="container"><nav class="breadcrumbs" aria-label="${escapeHtml(cfg.breadcrumbLabel)}"><a href="${BASE_URL}">${escapeHtml(cfg.home)}</a> / <a href="${BASE_URL}${lang}/topics/">${escapeHtml(cfg.topics)}</a> / <span>${escapeHtml(content.heading)}</span></nav><p class="eyebrow">${escapeHtml(cfg.topics)}</p><h1>${escapeHtml(content.heading)}</h1><p class="lead">${escapeHtml(content.lead)}</p>${sections}<h2>${escapeHtml(cfg.servicesLabel)}</h2><div class="service-index topic-service-index">${cards}</div><section aria-labelledby="topic-languages"><h2 id="topic-languages">${escapeHtml(cfg.language)}</h2><div class="language-links">${topicLanguageLinks(slug)}</div></section></main>
<footer><div class="container"><a href="${BASE_URL}${lang}/topics/">${escapeHtml(cfg.topicsBack)}</a> · <a href="https://github.com/imedkablavi/Social-Media-Deletion-Guide">GitHub</a></div></footer></body></html>`;
}

function topicIndexJsonLd(lang) {
    const url = `${BASE_URL}${lang}/topics/`;
    return { '@context': 'https://schema.org', '@type': 'CollectionPage', url, name: LANGS[lang].topics, description: LANGS[lang].topicsLead, inLanguage: lang,
        mainEntity: { '@type': 'ItemList', itemListElement: Object.entries(TOPIC_PAGES).map(([slug, topic], index) => ({ '@type': 'ListItem', position: index + 1, name: (topic[lang] || topic.en).heading, url: `${url}${slug}/` })) } };
}

function renderTopicIndex(lang) {
    const cfg = LANGS[lang];
    const canonical = `${BASE_URL}${lang}/topics/`;
    const cards = Object.entries(TOPIC_PAGES).map(([slug, topic]) => { const content = topic[lang] || topic.en; return `<a href="${canonical}${slug}/"><strong>${escapeHtml(content.heading)}</strong><small>${escapeHtml(content.description)}</small></a>`; }).join('');
    const langSwitch = Object.entries(LANGS).map(([code, item]) => `<a hreflang="${code}" lang="${code}" href="${BASE_URL}${code}/topics/">${escapeHtml(item.name)}</a>`).join('');
    return `<!doctype html><html lang="${lang}" dir="${cfg.dir}"><head>${commonHead({ lang, title: `${cfg.topics} | ${cfg.site}`, description: cfg.topicsLead, canonical, alternates: topicAlternateLinks(), jsonLd: topicIndexJsonLd(lang) })}</head><body>
<header class="site-header"><div class="container"><a class="brand" href="${BASE_URL}">${escapeHtml(cfg.site)}</a><div class="header-links"><a href="${BASE_URL}${lang}/services/">${escapeHtml(cfg.back)}</a><a href="${BASE_URL}">${escapeHtml(cfg.home)}</a></div></div></header>
<main class="container"><p class="eyebrow">${escapeHtml(cfg.eyebrow)}</p><h1>${escapeHtml(cfg.topics)}</h1><p class="lead">${escapeHtml(cfg.topicsLead)}</p><div class="language-links">${langSwitch}</div><div class="service-index topic-index">${cards}</div></main>
<footer><div class="container"><a href="${BASE_URL}${lang}/services/">${escapeHtml(cfg.back)}</a> · <a href="https://github.com/imedkablavi/Social-Media-Deletion-Guide">GitHub</a></div></footer></body></html>`;
}

function enrichHomepage() {
    let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const headMarker = '<!-- build:seo-head -->';
    if (!html.includes(headMarker)) {
        const extra = `${headMarker}\n    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">\n    <link rel="manifest" href="site.webmanifest">\n    <meta property="og:image" content="${BASE_URL}assets/social-preview.png">\n    <meta property="og:image:width" content="1200">\n    <meta property="og:image:height" content="630">\n    <meta name="twitter:image" content="${BASE_URL}assets/social-preview.png">`;
        html = html.replace('</head>', `    ${extra}\n</head>`).replace('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">');
    }
    const bodyMarker = '<!-- build:service-guides -->';
    if (!html.includes(bodyMarker)) {
        const links = Object.entries(LANGS).map(([lang, cfg]) => `<a href="${lang}/services/" hreflang="${lang}" lang="${lang}">${escapeHtml(cfg.name)}</a>`).join(' · ');
        const block = `${bodyMarker}\n            <section class="editorial-content" aria-labelledby="service-guide-index"><h2 id="service-guide-index" data-key="serviceGuidesTitle">Individual account deletion guides</h2><p><span data-key="serviceGuidesLead">Browse crawlable service-specific pages with official links, deletion difficulty and verification metadata. Available in:</span> ${links}</p></section>`;
        html = html.replace('</main>', `${block}\n        </main>`);
    }
    write('index.html', html);
}

function sitemapXml(entries) {
    const body = entries.map(entry => `  <url>\n    <loc>${escapeHtml(entry.loc)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}\n  </url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function build() {
    fs.rmSync(DIST, { recursive: true, force: true });
    ensureDir(DIST);
    ['css', 'js', 'assets'].forEach(copy);
    ['LICENSE', '.nojekyll', 'site.webmanifest'].forEach(copy);
    enrichHomepage();

    const latestCatalogDate = platforms.map(latestVerified).filter(Boolean).sort().at(-1) || undefined;
    const sitemap = [{ loc: BASE_URL, lastmod: latestCatalogDate }];

    for (const lang of Object.keys(LANGS)) {
        write(`${lang}/services/index.html`, renderServiceIndex(lang));
        sitemap.push({ loc: `${BASE_URL}${lang}/services/`, lastmod: latestCatalogDate });
        write(`${lang}/topics/index.html`, renderTopicIndex(lang));
        sitemap.push({ loc: `${BASE_URL}${lang}/topics/`, lastmod: '2026-08-22' });
        for (const [topicSlug] of Object.entries(TOPIC_PAGES)) {
            write(`${lang}/topics/${topicSlug}/index.html`, renderTopicPage(topicSlug, lang));
            sitemap.push({ loc: `${BASE_URL}${lang}/topics/${topicSlug}/`, lastmod: '2026-08-22' });
        }
        for (const platform of platforms) {
            const slug = slugFor(platform);
            write(`${lang}/services/${slug}/index.html`, renderServicePage(platform, lang));
            sitemap.push({ loc: `${BASE_URL}${lang}/services/${slug}/`, lastmod: guideReviewed(platform) || latestVerified(platform) || undefined });
        }
    }

    write('sitemap.xml', sitemapXml(sitemap));
    write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}sitemap.xml\n`);
    write('404.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><link rel="stylesheet" href="${BASE_URL}css/service-page.css"></head><body><main class="container"><h1>Page not found</h1><p><a href="${BASE_URL}">Return to the account deletion directory</a></p></main></body></html>`);
    const curatedGuides = Object.keys(GUIDE_CONTENT).length;
    const topicPages = Object.keys(TOPIC_PAGES).length * Object.keys(LANGS).length;
    write('build-report.json', JSON.stringify({ services: platforms.length, languages: Object.keys(LANGS).length, servicePages: platforms.length * Object.keys(LANGS).length, curatedGuides, topicPages, topicIndexes: Object.keys(LANGS).length, sitemapUrls: sitemap.length }, null, 2) + '\n');
    console.log(`Built ${platforms.length * Object.keys(LANGS).length} localized service pages, ${topicPages} topic pages and ${sitemap.length} sitemap URLs.`);
}

build();
