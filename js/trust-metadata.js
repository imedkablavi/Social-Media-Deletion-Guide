/**
 * Final evidence-backed trust review layer.
 *
 * Batch 5 runs after catalog maintenance so URL corrections, provider evidence and
 * trust normalization all apply to the exact resources used by the browser, build
 * and automated audits. Only resources manually reviewed on 2026-08-24 receive a
 * new `verified` date; automated reachability never writes review metadata.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });

    function replaceExact(platform, currentUrl, replacement) {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(resource => resource.url === currentUrl);
        if (index >= 0) platform.resources[index] = replacement;
    }

    function reviewExact(platform, url, evidenceSource, patch = {}) {
        const resource = (platform?.resources || []).find(item => item.url === url);
        if (!resource) return;
        Object.assign(resource, patch, {
            official: true,
            verified: VERIFIED,
            evidenceSource
        });
    }

    // Google: full-account deletion and YouTube channel deletion are different scopes.
    // The legacy 55770 URL is currently a video-deletion article; 55759 is the
    // provider's current channel hide/delete guidance and explicitly does not delete
    // the parent Google Account.
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
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    // WhatsApp: two legacy article IDs now resolve to unrelated or superseded help
    // content. Replace them with the provider's current compromised-account and
    // privacy-settings guidance; chat export remains a separate backup workflow.
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
            type: 'security', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
        replaceExact(whatsapp, 'https://faq.whatsapp.com/539178204879377', {
            url: 'https://faq.whatsapp.com/3307102709559968',
            title: title('Change your WhatsApp privacy settings', 'تغيير إعدادات خصوصية WhatsApp', 'Modifier vos réglages de confidentialité WhatsApp', 'WhatsApp gizlilik ayarlarınızı değiştirin'),
            type: 'settings', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    // Snapchat: use the current canonical Help Center routes rather than old
    // support.snapchat.com aliases, while retaining the authenticated account portal.
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
            type: 'backup', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
        replaceExact(snapchat, 'https://support.snapchat.com/en-US/a/hacked-howto', {
            url: 'https://help.snapchat.com/hc/en-us/articles/7012305621908-My-account-is-compromised',
            title: title('Recover a compromised Snapchat account', 'استرداد حساب Snapchat مخترق', 'Récupérer un compte Snapchat compromis', 'Ele geçirilmiş Snapchat hesabını kurtarın'),
            type: 'security', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
        replaceExact(snapchat, 'https://accounts.snapchat.com/accounts/login', {
            url: 'https://accounts.snapchat.com/',
            title: title('Open the Snapchat account portal', 'فتح بوابة حساب Snapchat', 'Ouvrir le portail de compte Snapchat', 'Snapchat hesap portalını açın'),
            type: 'settings', official: true, verified: VERIFIED,
            evidenceSource: 'provider-account-action'
        });
    }

    // TikTok: replace the broad safety category with the provider's exact Account
    // Safety article and retain explicit first-party data/privacy guidance.
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
            type: 'security', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
        reviewExact(tiktok, 'https://support.tiktok.com/en/privacy-safety/account-privacy-settings', 'provider-support', {
            title: title('TikTok account privacy settings', 'إعدادات خصوصية حساب TikTok', 'Réglages de confidentialité du compte TikTok', 'TikTok hesap gizlilik ayarları')
        });
    }

    // Microsoft: the privacy dashboard and recovery form are authenticated provider
    // account actions. Reachability may classify them as auth-required; that does not
    // make them dead and is kept separate from this manual evidence review.
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

    // Amazon: only the exact Amazon Pay security guidance was content-reviewed in
    // this batch. Amazon.com deletion/data-request routes remain unverified until an
    // authenticated/manual review can confirm their current destructive/export scope.
    const amazon = byId('amazon');
    if (amazon) {
        reviewExact(amazon, 'https://pay.amazon.com/help/201754750', 'provider-support', {
            title: title('Amazon account password and two-step security', 'أمان كلمة مرور Amazon والتحقق بخطوتين', 'Sécurité du mot de passe Amazon et validation en deux étapes', 'Amazon parola ve iki adımlı doğrulama güvenliği')
        });
    }
})();

/**
 * Normalize trust metadata after every catalog maintenance and manual-review layer.
 *
 * `verified` means the exact effective URL was manually reviewed on that date.
 * Automated reachability checks never write this field. Legacy compatibility
 * defaults are removed when the original resource had no evidence-bearing field.
 */
(() => {
    const LEGACY_DEFAULT_DATE = '2026-08-21';

    platforms.forEach(platform => {
        (platform.resources || []).forEach(resource => {
            if (resource.__verifiedWasMissing && resource.verified === LEGACY_DEFAULT_DATE) {
                delete resource.verified;
            }

            if (resource.__officialWasMissing && resource.official === true) {
                // `false` here means first-party provenance is not confirmed by the
                // maintained metadata; it does not assert that the URL is third-party.
                resource.official = false;
            }

            resource.provenance = resource.official === true ? 'provider-reviewed' : 'unverified';
            resource.freshness = resource.verified ? 'dated-review' : 'unverified';

            try { delete resource.__verifiedWasMissing; } catch (_) {}
            try { delete resource.__officialWasMissing; } catch (_) {}
        });
    });
})();
