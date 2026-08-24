/**
 * Evidence-backed provider review batch 7.
 *
 * Runs after trust normalization and therefore writes derived trust fields explicitly.
 * Only exact public first-party resources reviewed on 2026-08-24 are included.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });
    const trust = (resource, evidenceSource = 'provider-support') => ({
        ...resource,
        official: true,
        verified: VERIFIED,
        evidenceSource,
        provenance: 'provider-reviewed',
        freshness: 'dated-review'
    });

    function replaceExact(platform, currentUrl, replacement, evidenceSource = 'provider-support') {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(resource => resource.url === currentUrl);
        if (index >= 0) platform.resources[index] = trust(replacement, evidenceSource);
    }

    function reviewExact(platform, url, evidenceSource = 'provider-support') {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(resource => resource.url === url);
        if (index >= 0) platform.resources[index] = trust(platform.resources[index], evidenceSource);
    }

    const reddit = byId('reddit');
    if (reddit) {
        reddit.loginRequired = true;
        replaceExact(reddit,
            'https://www.reddit.com/settings/data-request',
            {
                url: 'https://support.reddithelp.com/hc/en-us/articles/360043048352-How-do-I-request-a-copy-of-my-Reddit-data-and-information',
                title: title('Request a copy of your Reddit data', 'طلب نسخة من بيانات Reddit', 'Demander une copie de vos données Reddit', 'Reddit verilerinizin bir kopyasını isteyin'),
                type: 'backup'
            });
        replaceExact(reddit,
            'https://www.reddit.com/settings/privacy',
            {
                url: 'https://support.reddithelp.com/hc/en-us/articles/360043047952-How-can-I-control-how-Reddit-uses-my-information',
                title: title('Control how Reddit uses your information', 'التحكم بكيفية استخدام Reddit لمعلوماتك', 'Contrôler la manière dont Reddit utilise vos informations', 'Reddit’in bilgilerinizi nasıl kullandığını yönetin'),
                type: 'settings'
            });
        replaceExact(reddit,
            'https://www.reddit.com/settings/',
            {
                url: 'https://support.reddithelp.com/hc/en-us/articles/360043483511-Where-and-how-can-I-access-my-Reddit-data-and-information',
                title: title('Find and manage your Reddit account data', 'العثور على بيانات حساب Reddit وإدارتها', 'Trouver et gérer les données de votre compte Reddit', 'Reddit hesap verilerinizi bulun ve yönetin'),
                type: 'manage'
            });
    }

    const pinterest = byId('pinterest');
    if (pinterest) {
        pinterest.loginRequired = true;
        replaceExact(pinterest,
            'https://www.pinterest.com/settings/privacy-and-data',
            {
                url: 'https://help.pinterest.com/en/article/download-your-pinterest-data',
                title: title('Download your Pinterest data', 'تنزيل بيانات Pinterest', 'Télécharger vos données Pinterest', 'Pinterest verilerinizi indirin'),
                type: 'backup'
            });
        replaceExact(pinterest,
            'https://www.pinterest.com/settings/account-settings',
            {
                url: 'https://help.pinterest.com/en/article/your-privacy-and-data-settings',
                title: title('Manage Pinterest privacy and data settings', 'إدارة إعدادات خصوصية Pinterest والبيانات', 'Gérer les réglages de confidentialité et de données Pinterest', 'Pinterest gizlilik ve veri ayarlarını yönetin'),
                type: 'settings'
            });
    }

    const spotify = byId('spotify');
    if (spotify) {
        spotify.loginRequired = true;
        replaceExact(spotify,
            'https://www.spotify.com/account/privacy/',
            {
                url: 'https://support.spotify.com/us/article/data-rights-and-privacy-settings/',
                title: title('Spotify data rights and privacy choices', 'حقوق البيانات وخيارات الخصوصية في Spotify', 'Droits sur les données et choix de confidentialité Spotify', 'Spotify veri hakları ve gizlilik seçenekleri'),
                type: 'backup'
            });
        replaceExact(spotify,
            'https://www.spotify.com/account/change-password/',
            {
                url: 'https://support.spotify.com/us/article/protect-your-account/',
                title: title('Protect your Spotify account', 'حماية حساب Spotify', 'Protéger votre compte Spotify', 'Spotify hesabınızı koruyun'),
                type: 'security'
            });
    }

    const yahoo = byId('yahoo');
    reviewExact(yahoo,
        'https://legal.yahoo.com/xw/en/yahoo/privacy/dashboard/index.html',
        'provider-privacy-portal');

    const zoom = byId('zoom');
    if (zoom) {
        zoom.loginRequired = true;
        replaceExact(zoom,
            'https://support.zoom.us/hc/en-us/articles/201363003',
            {
                url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0057736',
                title: title('Use Zoom Data & Privacy to export account data', 'استخدام Zoom Data & Privacy لتصدير بيانات الحساب', 'Utiliser Zoom Data & Privacy pour exporter les données du compte', 'Hesap verilerini dışa aktarmak için Zoom Data & Privacy kullanın'),
                type: 'backup'
            });
        replaceExact(zoom,
            'https://zoom.us/profile/password',
            {
                url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061483',
                title: title('Manage your Zoom password', 'إدارة كلمة مرور Zoom', 'Gérer votre mot de passe Zoom', 'Zoom parolanızı yönetin'),
                type: 'security'
            });
    }
})();
