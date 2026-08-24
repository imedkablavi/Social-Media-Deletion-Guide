/**
 * Final evidence-backed trust review and normalization layer.
 *
 * `verified` means the exact effective URL was manually reviewed on that date.
 * Automated reachability never writes review metadata. Every explicit review below
 * clears legacy absence markers, then one final normalization pass derives
 * `provenance` and `freshness` consistently for the whole catalog.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const LEGACY_DEFAULT_DATE = '2026-08-21';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });

    function clearLegacyMarkers(resource) {
        try { delete resource.__verifiedWasMissing; } catch (_) {}
        try { delete resource.__officialWasMissing; } catch (_) {}
    }

    function reviewed(resource, evidenceSource = 'provider-support') {
        const next = {
            ...resource,
            official: true,
            verified: VERIFIED,
            evidenceSource
        };
        clearLegacyMarkers(next);
        return next;
    }

    function reviewExact(platform, url, evidenceSource = 'provider-support', patch = {}) {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(resource => resource.url === url);
        if (index < 0) return;
        const resource = platform.resources[index];
        Object.assign(resource, patch, {
            official: true,
            verified: VERIFIED,
            evidenceSource
        });
        clearLegacyMarkers(resource);
    }

    function replaceExact(platform, currentUrl, replacement, evidenceSource = 'provider-support') {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(resource => resource.url === currentUrl);
        if (index >= 0) platform.resources[index] = reviewed(replacement, evidenceSource);
    }

    // -------------------------------------------------------------------------
    // Provider review batch 5: high-impact privacy/security/export resources.
    // -------------------------------------------------------------------------
    const google = byId('google');
    if (google) {
        google.loginRequired = true;
        google.note = {
            en: 'Google Account deletion and YouTube channel deletion are separate actions. Deleting or hiding a YouTube channel affects the channel and its content; it does not delete the parent Google Account. Google Takeout, account recovery and My Account are separate export, security and settings workflows.',
            ar: 'حذف حساب Google وحذف قناة YouTube إجراءان منفصلان. حذف قناة YouTube أو إخفاؤها يؤثر في القناة ومحتواها ولا يحذف حساب Google الأساسي. Google Takeout واسترداد الحساب وMy Account مسارات مستقلة للتصدير والأمان والإعدادات.',
            fr: 'La suppression d’un compte Google et celle d’une chaîne YouTube sont deux actions distinctes. Supprimer ou masquer une chaîne YouTube affecte la chaîne et son contenu sans supprimer le compte Google parent. Google Takeout, la récupération du compte et My Account sont des flux séparés pour l’export, la sécurité et les réglages.',
            tr: 'Google Hesabı silme ile YouTube kanalını silme ayrı işlemlerdir. Bir YouTube kanalını silmek veya gizlemek kanalı ve içeriğini etkiler; bağlı Google Hesabını silmez. Google Takeout, hesap kurtarma ve My Account dışa aktarma, güvenlik ve ayarlar için ayrı akışlardır.'
        };
        reviewExact(google, 'https://takeout.google.com/', 'provider-account-action', {
            title: title('Download your Google data with Takeout', 'تنزيل بيانات Google عبر Takeout', 'Télécharger vos données Google avec Takeout', 'Google verilerinizi Takeout ile indirin')
        });
        reviewExact(google, 'https://myaccount.google.com/', 'provider-account-action', {
            title: title('Manage your Google Account', 'إدارة حساب Google', 'Gérer votre compte Google', 'Google Hesabınızı yönetin')
        });
        reviewExact(google, 'https://support.google.com/accounts/answer/6294825', 'provider-support', {
            title: title('Secure a hacked or compromised Google Account', 'تأمين حساب Google مخترق أو معرّض للاختراق', 'Sécuriser un compte Google piraté ou compromis', 'Ele geçirilmiş veya güvenliği ihlal edilmiş Google Hesabını güvene alın')
        });
        replaceExact(google, 'https://support.google.com/youtube/answer/55770', {
            url: 'https://support.google.com/youtube/answer/55759',
            title: title('Delete or hide your YouTube channel', 'حذف قناة YouTube أو إخفاؤها', 'Supprimer ou masquer votre chaîne YouTube', 'YouTube kanalınızı silin veya gizleyin'),
            type: 'delete'
        });
    }

    const whatsapp = byId('whatsapp');
    if (whatsapp) {
        whatsapp.loginRequired = true;
        whatsapp.note = {
            en: 'WhatsApp account deletion, chat export, compromised-account recovery and privacy settings are separate workflows. Exporting chat history does not delete the account, and changing privacy settings is not an account-deletion action.',
            ar: 'حذف حساب WhatsApp وتصدير سجل المحادثات واسترداد الحساب المخترق وإعدادات الخصوصية مسارات منفصلة. تصدير المحادثات لا يحذف الحساب، وتغيير إعدادات الخصوصية ليس إجراءً لحذف الحساب.',
            fr: 'La suppression du compte WhatsApp, l’export des discussions, la récupération d’un compte compromis et les réglages de confidentialité sont des flux distincts. Exporter l’historique des discussions ne supprime pas le compte et modifier les réglages de confidentialité n’est pas une suppression de compte.',
            tr: 'WhatsApp hesap silme, sohbet dışa aktarma, ele geçirilmiş hesap kurtarma ve gizlilik ayarları ayrı işlemlerdir. Sohbet geçmişini dışa aktarmak hesabı silmez; gizlilik ayarlarını değiştirmek de hesap silme işlemi değildir.'
        };
        reviewExact(whatsapp, 'https://faq.whatsapp.com/1180414079177245', 'provider-support', {
            title: title('Export your WhatsApp chat history', 'تصدير سجل محادثات WhatsApp', 'Exporter l’historique de vos discussions WhatsApp', 'WhatsApp sohbet geçmişinizi dışa aktarın')
        });
        replaceExact(whatsapp, 'https://faq.whatsapp.com/1061611991749160', {
            url: 'https://faq.whatsapp.com/1131652977717250',
            title: title('Recover a compromised WhatsApp account', 'استرداد حساب WhatsApp مخترق', 'Récupérer un compte WhatsApp compromis', 'Ele geçirilmiş WhatsApp hesabını kurtarın'),
            type: 'security'
        });
        replaceExact(whatsapp, 'https://faq.whatsapp.com/539178204879377', {
            url: 'https://faq.whatsapp.com/3307102709559968',
            title: title('Change your WhatsApp privacy settings', 'تغيير إعدادات خصوصية WhatsApp', 'Modifier vos réglages de confidentialité WhatsApp', 'WhatsApp gizlilik ayarlarınızı değiştirin'),
            type: 'settings'
        });
    }

    const snapchat = byId('snapchat');
    if (snapchat) {
        snapchat.loginRequired = true;
        snapchat.note = {
            en: 'Snapchat My Data export, account management and compromised-account recovery are separate from account deletion. The My Data export can take time to prepare, and unexpected export notifications should be treated as a security signal.',
            ar: 'تصدير My Data في Snapchat وإدارة الحساب واسترداد الحساب المخترق إجراءات منفصلة عن حذف الحساب. قد يستغرق تجهيز ملف My Data بعض الوقت، ويجب اعتبار إشعارات التصدير غير المتوقعة إشارة أمنية.',
            fr: 'L’export My Data de Snapchat, la gestion du compte et la récupération d’un compte compromis sont distincts de la suppression du compte. La préparation de l’export peut prendre du temps et une notification d’export inattendue doit être traitée comme un signal de sécurité.',
            tr: 'Snapchat My Data dışa aktarma, hesap yönetimi ve ele geçirilmiş hesap kurtarma işlemleri hesap silmeden ayrıdır. My Data arşivinin hazırlanması zaman alabilir; beklenmeyen dışa aktarma bildirimleri bir güvenlik işareti olarak ele alınmalıdır.'
        };
        replaceExact(snapchat, 'https://support.snapchat.com/en-US/a/download-my-data', {
            url: 'https://help.snapchat.com/hc/en-us/articles/7012305371156-How-do-I-download-my-data-from-Snapchat',
            title: title('Download your data from Snapchat', 'تنزيل بياناتك من Snapchat', 'Télécharger vos données depuis Snapchat', 'Snapchat verilerinizi indirin'),
            type: 'backup'
        });
        replaceExact(snapchat, 'https://support.snapchat.com/en-US/a/hacked-howto', {
            url: 'https://help.snapchat.com/hc/en-us/articles/7012305621908-My-account-is-compromised',
            title: title('Recover a compromised Snapchat account', 'استرداد حساب Snapchat مخترق', 'Récupérer un compte Snapchat compromis', 'Ele geçirilmiş Snapchat hesabını kurtarın'),
            type: 'security'
        });
        replaceExact(snapchat, 'https://accounts.snapchat.com/accounts/login', {
            url: 'https://accounts.snapchat.com/',
            title: title('Open the Snapchat account portal', 'فتح بوابة حساب Snapchat', 'Ouvrir le portail de compte Snapchat', 'Snapchat hesap portalını açın'),
            type: 'settings'
        }, 'provider-account-action');
    }

    const tiktok = byId('tiktok');
    if (tiktok) {
        tiktok.loginRequired = true;
        tiktok.note = {
            en: 'TikTok data download, account-safety controls and account-privacy settings are separate from permanent account deletion. Account Safety covers security checkup, two-step verification, trusted devices and recovery options.',
            ar: 'تنزيل بيانات TikTok وضوابط أمان الحساب وإعدادات خصوصية الحساب إجراءات منفصلة عن حذف الحساب نهائياً. تغطي صفحة Account Safety فحص الأمان والتحقق بخطوتين والأجهزة الموثوقة وخيارات الاسترداد.',
            fr: 'Le téléchargement des données TikTok, les contrôles de sécurité du compte et les réglages de confidentialité sont distincts de la suppression définitive du compte. La page Account Safety couvre la vérification de sécurité, l’authentification en deux étapes, les appareils de confiance et les options de récupération.',
            tr: 'TikTok veri indirme, hesap güvenliği denetimleri ve hesap gizlilik ayarları kalıcı hesap silmeden ayrıdır. Account Safety sayfası güvenlik kontrolü, iki adımlı doğrulama, güvenilir cihazlar ve kurtarma seçeneklerini kapsar.'
        };
        reviewExact(tiktok, 'https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data', 'provider-support', {
            title: title('Request and download your TikTok data', 'طلب بيانات TikTok وتنزيلها', 'Demander et télécharger vos données TikTok', 'TikTok verilerinizi isteyin ve indirin')
        });
        replaceExact(tiktok, 'https://support.tiktok.com/en/safety-hc/account-and-user-safety', {
            url: 'https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-safety',
            title: title('TikTok account safety and recovery', 'أمان حساب TikTok واسترداده', 'Sécurité et récupération du compte TikTok', 'TikTok hesap güvenliği ve kurtarma'),
            type: 'security'
        });
        reviewExact(tiktok, 'https://support.tiktok.com/en/privacy-safety/account-privacy-settings', 'provider-support', {
            title: title('TikTok account privacy settings', 'إعدادات خصوصية حساب TikTok', 'Réglages de confidentialité du compte TikTok', 'TikTok hesap gizlilik ayarları')
        });
    }

    const microsoft = byId('microsoft');
    if (microsoft) {
        microsoft.loginRequired = true;
        microsoft.note = {
            en: 'Microsoft account closure, privacy-dashboard export, account recovery and privacy controls are separate actions. The privacy dashboard requires sign-in to view or clear activity and download available data; the recovery form is for regaining account access.',
            ar: 'إغلاق حساب Microsoft وتصدير البيانات من لوحة الخصوصية واسترداد الحساب وضوابط الخصوصية إجراءات منفصلة. تتطلب لوحة الخصوصية تسجيل الدخول لعرض النشاط أو مسحه وتنزيل البيانات المتاحة، بينما نموذج الاسترداد مخصص لاستعادة الوصول إلى الحساب.',
            fr: 'La fermeture du compte Microsoft, l’export depuis le tableau de bord de confidentialité, la récupération du compte et les contrôles de confidentialité sont des actions distinctes. Le tableau de bord nécessite une connexion pour consulter ou effacer l’activité et télécharger les données disponibles ; le formulaire de récupération sert à retrouver l’accès au compte.',
            tr: 'Microsoft hesabını kapatma, gizlilik panosundan veri dışa aktarma, hesap kurtarma ve gizlilik denetimleri ayrı işlemlerdir. Gizlilik panosu etkinliği görüntülemek veya temizlemek ve mevcut verileri indirmek için oturum açmayı gerektirir; kurtarma formu hesaba yeniden erişim içindir.'
        };
        reviewExact(microsoft, 'https://account.microsoft.com/privacy/download-data', 'provider-account-action', {
            title: title('Download Microsoft privacy data', 'تنزيل بيانات الخصوصية من Microsoft', 'Télécharger vos données de confidentialité Microsoft', 'Microsoft gizlilik verilerinizi indirin')
        });
        reviewExact(microsoft, 'https://account.live.com/acsr', 'provider-account-action', {
            title: title('Microsoft account recovery form', 'نموذج استرداد حساب Microsoft', 'Formulaire de récupération du compte Microsoft', 'Microsoft hesap kurtarma formu')
        });
        reviewExact(microsoft, 'https://account.microsoft.com/privacy', 'provider-privacy-portal', {
            title: title('Microsoft privacy dashboard', 'لوحة خصوصية Microsoft', 'Tableau de bord de confidentialité Microsoft', 'Microsoft gizlilik panosu')
        });
    }

    const amazon = byId('amazon');
    if (amazon) {
        reviewExact(amazon, 'https://pay.amazon.com/help/201754750', 'provider-support', {
            title: title('Amazon account password and two-step security', 'أمان كلمة مرور Amazon والتحقق بخطوتين', 'Sécurité du mot de passe Amazon et validation en deux étapes', 'Amazon parola ve iki adımlı doğrulama güvenliği')
        });
    }

    // -------------------------------------------------------------------------
    // Provider review batch 6: public export/data/security resources.
    // -------------------------------------------------------------------------
    const discord = byId('discord');
    replaceExact(discord,
        'https://support.discord.com/hc/en-us/articles/360004957991-Requesting-a-Copy-of-your-Data',
        {
            url: 'https://support.discord.com/hc/en-us/articles/360004027692-Requesting-a-Copy-of-your-Data',
            title: title('Request a copy of your Discord data', 'طلب نسخة من بيانات Discord', 'Demander une copie de vos données Discord', 'Discord verilerinizin bir kopyasını isteyin'),
            type: 'backup'
        });

    const slack = byId('slack');
    reviewExact(slack, 'https://slack.com/help/articles/201658943-Export-your-workspace-data');

    const ebay = byId('ebay');
    replaceExact(ebay,
        'https://www.ebay.com/help/account/requesting-personal-data/requesting-personal-data?id=5089',
        {
            url: 'https://www.ebay.com/help/requesting-personal-data/account/requesting-personal-data?id=5089',
            title: title('Request your personal data from eBay', 'طلب بياناتك الشخصية من eBay', 'Demander vos données personnelles à eBay', 'eBay kişisel verilerinizi isteyin'),
            type: 'backup'
        });
    replaceExact(ebay,
        'https://www.ebay.com/help/account/protecting-account/keeping-your-account-secure?id=4191',
        {
            url: 'https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872',
            title: title('Keep your eBay account secure', 'الحفاظ على أمان حساب eBay', 'Sécuriser votre compte eBay', 'eBay hesabınızı güvende tutun'),
            type: 'security'
        });

    const playstation = byId('playstation');
    reviewExact(playstation, 'https://www.playstation.com/en-us/support/account/data-request/');
    reviewExact(playstation, 'https://www.playstation.com/en-us/support/account/security-best-practice/');

    const notion = byId('notion');
    reviewExact(notion, 'https://www.notion.com/help/export-your-content');

    const proton = byId('protonmail');
    replaceExact(proton,
        'https://proton.me/support/account/migrate',
        {
            url: 'https://proton.me/support/proton-mail-export-tool',
            title: title('Export and back up Proton Mail', 'تصدير Proton Mail ونسخه احتياطياً', 'Exporter et sauvegarder Proton Mail', 'Proton Mail’i dışa aktarın ve yedekleyin'),
            type: 'backup'
        });

    const stackoverflow = byId('stackoverflow');
    replaceExact(stackoverflow,
        'https://stackoverflow.com/legal/gdpr/request',
        {
            url: 'https://policies.stackoverflow.co/data-request/',
            title: title('Submit a Stack Overflow data request', 'إرسال طلب بيانات إلى Stack Overflow', 'Envoyer une demande de données Stack Overflow', 'Stack Overflow veri isteği gönderin'),
            type: 'backup'
        });

    const telegram = byId('telegram');
    replaceExact(telegram,
        'https://telegram.org/faq#q-how-do-i-log-out',
        {
            url: 'https://telegram.org/faq#q-my-phone-was-stolen-what-do-i-do',
            title: title('Secure Telegram after a lost or stolen phone', 'تأمين Telegram بعد فقدان الهاتف أو سرقته', 'Sécuriser Telegram après la perte ou le vol du téléphone', 'Kayıp veya çalınan telefondan sonra Telegram’ı güvene alın'),
            type: 'security'
        });

    // -------------------------------------------------------------------------
    // Provider review batch 7: public privacy/data/security guidance.
    // -------------------------------------------------------------------------
    const reddit = byId('reddit');
    if (reddit) {
        reddit.loginRequired = true;
        replaceExact(reddit, 'https://www.reddit.com/settings/data-request', {
            url: 'https://support.reddithelp.com/hc/en-us/articles/360043048352-How-do-I-request-a-copy-of-my-Reddit-data-and-information',
            title: title('Request a copy of your Reddit data', 'طلب نسخة من بيانات Reddit', 'Demander une copie de vos données Reddit', 'Reddit verilerinizin bir kopyasını isteyin'),
            type: 'backup'
        });
        replaceExact(reddit, 'https://www.reddit.com/settings/privacy', {
            url: 'https://support.reddithelp.com/hc/en-us/articles/360043047952-How-can-I-control-how-Reddit-uses-my-information',
            title: title('Control how Reddit uses your information', 'التحكم بكيفية استخدام Reddit لمعلوماتك', 'Contrôler la manière dont Reddit utilise vos informations', 'Reddit’in bilgilerinizi nasıl kullandığını yönetin'),
            type: 'settings'
        });
        replaceExact(reddit, 'https://www.reddit.com/settings/', {
            url: 'https://support.reddithelp.com/hc/en-us/articles/360043483511-Where-and-how-can-I-access-my-Reddit-data-and-information',
            title: title('Find and manage your Reddit account data', 'العثور على بيانات حساب Reddit وإدارتها', 'Trouver et gérer les données de votre compte Reddit', 'Reddit hesap verilerinizi bulun ve yönetin'),
            type: 'manage'
        });
    }

    const pinterest = byId('pinterest');
    if (pinterest) {
        pinterest.loginRequired = true;
        replaceExact(pinterest, 'https://www.pinterest.com/settings/privacy-and-data', {
            url: 'https://help.pinterest.com/en/article/download-your-pinterest-data',
            title: title('Download your Pinterest data', 'تنزيل بيانات Pinterest', 'Télécharger vos données Pinterest', 'Pinterest verilerinizi indirin'),
            type: 'backup'
        });
        replaceExact(pinterest, 'https://www.pinterest.com/settings/account-settings', {
            url: 'https://help.pinterest.com/en/article/your-privacy-and-data-settings',
            title: title('Manage Pinterest privacy and data settings', 'إدارة إعدادات خصوصية Pinterest والبيانات', 'Gérer les réglages de confidentialité et de données Pinterest', 'Pinterest gizlilik ve veri ayarlarını yönetin'),
            type: 'settings'
        });
    }

    const spotify = byId('spotify');
    if (spotify) {
        spotify.loginRequired = true;
        replaceExact(spotify, 'https://www.spotify.com/account/privacy/', {
            url: 'https://support.spotify.com/us/article/data-rights-and-privacy-settings/',
            title: title('Spotify data rights and privacy choices', 'حقوق البيانات وخيارات الخصوصية في Spotify', 'Droits sur les données et choix de confidentialité Spotify', 'Spotify veri hakları ve gizlilik seçenekleri'),
            type: 'backup'
        });
        replaceExact(spotify, 'https://www.spotify.com/account/change-password/', {
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
        replaceExact(zoom, 'https://support.zoom.us/hc/en-us/articles/201363003', {
            url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0057736',
            title: title('Use Zoom Data & Privacy to export account data', 'استخدام Zoom Data & Privacy لتصدير بيانات الحساب', 'Utiliser Zoom Data & Privacy pour exporter les données du compte', 'Hesap verilerini dışa aktarmak için Zoom Data & Privacy kullanın'),
            type: 'backup'
        });
        replaceExact(zoom, 'https://zoom.us/profile/password', {
            url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061483',
            title: title('Manage your Zoom password', 'إدارة كلمة مرور Zoom', 'Gérer votre mot de passe Zoom', 'Zoom parolanızı yönetin'),
            type: 'security'
        });
    }

    // Final normalization: legacy compatibility defaults never become review evidence.
    platforms.forEach(platform => {
        (platform.resources || []).forEach(resource => {
            if (resource.__verifiedWasMissing && resource.verified === LEGACY_DEFAULT_DATE) {
                delete resource.verified;
            }
            if (resource.__officialWasMissing && resource.official === true) {
                resource.official = false;
            }

            resource.provenance = resource.official === true ? 'provider-reviewed' : 'unverified';
            resource.freshness = resource.verified ? 'dated-review' : 'unverified';
            clearLegacyMarkers(resource);
        });
    });
})();
