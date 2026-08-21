/**
 * Curated translation updates for the maintained platform catalog.
 * Loaded after translations.js so older entries stay backwards compatible.
 */
(() => {
    const updates = {
        ar: {
            title: "دليل حذف الحسابات وحماية الخصوصية",
            description: "دليل عملي للوصول إلى صفحات حذف الحسابات، تنزيل البيانات، الأمان والخصوصية من المصادر الرسمية لأشهر المنصات والخدمات.",
            author: "imed_kablavi",
            verificationNote: "نفضّل الروابط الرسمية ونراجع الروابط دوريًا. بعض الخدمات تتطلب تسجيل الدخول قبل ظهور خيار الحذف.",
            officialSource: "مصدر رسمي",
            lastVerified: "آخر تحقق",
            reportBroken: "وجدت رابطًا لا يعمل؟ بلّغ عنه على GitHub.",
            platforms: {
                threads: "ثريدز",
                bluesky: "بلوسكاي",
                mastodon: "ماستودون",
                tumblr: "تمبلر",
                signal: "سيغنال",
                viber: "فايبر",
                line: "لاين",
                roblox: "روبلوكس",
                nintendo: "نينتندو",
                ea: "EA",
                ubisoft: "يوبي سوفت",
                riotgames: "Riot Games",
                battlenet: "Battle.net",
                gitlab: "GitLab",
                atlassian: "Atlassian",
                figma: "Figma",
                openai: "OpenAI",
                airbnb: "Airbnb",
                uber: "Uber"
            }
        },
        en: {
            title: "Account Deletion & Privacy Guide",
            description: "A practical directory of official account deletion, data export, security and privacy pages for popular platforms and online services.",
            author: "imed_kablavi",
            verificationNote: "Official sources are preferred and links are reviewed regularly. Some services require you to sign in before the deletion option appears.",
            officialSource: "Official source",
            lastVerified: "Last verified",
            reportBroken: "Found a broken link? Report it on GitHub.",
            platforms: {
                threads: "Threads",
                bluesky: "Bluesky",
                mastodon: "Mastodon",
                tumblr: "Tumblr",
                signal: "Signal",
                viber: "Viber",
                line: "LINE",
                roblox: "Roblox",
                nintendo: "Nintendo",
                ea: "EA",
                ubisoft: "Ubisoft",
                riotgames: "Riot Games",
                battlenet: "Battle.net",
                gitlab: "GitLab",
                atlassian: "Atlassian",
                figma: "Figma",
                openai: "OpenAI",
                airbnb: "Airbnb",
                uber: "Uber"
            }
        },
        fr: {
            title: "Guide de Suppression de Comptes et Confidentialité",
            description: "Un répertoire pratique de pages officielles pour supprimer un compte, exporter ses données et gérer la sécurité et la confidentialité.",
            author: "imed_kablavi",
            verificationNote: "Les sources officielles sont privilégiées et les liens sont vérifiés régulièrement. Certains services demandent une connexion avant d'afficher l'option de suppression.",
            officialSource: "Source officielle",
            lastVerified: "Dernière vérification",
            reportBroken: "Un lien ne fonctionne plus ? Signalez-le sur GitHub.",
            platforms: {
                threads: "Threads",
                bluesky: "Bluesky",
                mastodon: "Mastodon",
                tumblr: "Tumblr",
                signal: "Signal",
                viber: "Viber",
                line: "LINE",
                roblox: "Roblox",
                nintendo: "Nintendo",
                ea: "EA",
                ubisoft: "Ubisoft",
                riotgames: "Riot Games",
                battlenet: "Battle.net",
                gitlab: "GitLab",
                atlassian: "Atlassian",
                figma: "Figma",
                openai: "OpenAI",
                airbnb: "Airbnb",
                uber: "Uber"
            }
        },
        tr: {
            title: "Hesap Silme ve Gizlilik Rehberi",
            description: "Popüler platformlar ve çevrimiçi hizmetler için resmi hesap silme, veri indirme, güvenlik ve gizlilik sayfalarını bir araya getiren pratik rehber.",
            author: "imed_kablavi",
            verificationNote: "Resmî kaynaklara öncelik verilir ve bağlantılar düzenli olarak kontrol edilir. Bazı hizmetlerde silme seçeneğini görmek için giriş yapmanız gerekir.",
            officialSource: "Resmî kaynak",
            lastVerified: "Son kontrol",
            reportBroken: "Çalışmayan bir bağlantı mı buldunuz? GitHub üzerinden bildirin.",
            platforms: {
                threads: "Threads",
                bluesky: "Bluesky",
                mastodon: "Mastodon",
                tumblr: "Tumblr",
                signal: "Signal",
                viber: "Viber",
                line: "LINE",
                roblox: "Roblox",
                nintendo: "Nintendo",
                ea: "EA",
                ubisoft: "Ubisoft",
                riotgames: "Riot Games",
                battlenet: "Battle.net",
                gitlab: "GitLab",
                atlassian: "Atlassian",
                figma: "Figma",
                openai: "OpenAI",
                airbnb: "Airbnb",
                uber: "Uber"
            }
        }
    };

    Object.entries(updates).forEach(([lang, patch]) => {
        if (!translations[lang]) return;

        const platformNames = patch.platforms || {};
        const { platforms: _platforms, ...textUpdates } = patch;
        Object.assign(translations[lang], textUpdates);
        translations[lang].platforms = translations[lang].platforms || {};
        Object.assign(translations[lang].platforms, platformNames);
    });
})();
