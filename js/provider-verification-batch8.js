/**
 * Evidence-backed provider review batch 8.
 *
 * Runs after the shared trust normalization pass. Every resource below is an exact
 * public first-party page manually reviewed on 2026-08-24. Auth-only settings and
 * third-party helper tools intentionally remain outside provider-reviewed status.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });
    const reviewed = (resource, evidenceSource = 'provider-support') => ({
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
        if (index >= 0) platform.resources[index] = reviewed(replacement, evidenceSource);
    }

    const linkedin = byId('linkedin');
    if (linkedin) {
        linkedin.loginRequired = true;
        replaceExact(linkedin, 'https://www.linkedin.com/psettings/member-data', {
            url: 'https://www.linkedin.com/help/linkedin/answer/a1339364',
            title: title('Download your LinkedIn account data', 'تنزيل بيانات حساب LinkedIn', 'Télécharger les données de votre compte LinkedIn', 'LinkedIn hesap verilerinizi indirin'),
            type: 'backup'
        });
        replaceExact(linkedin, 'https://www.linkedin.com/psettings/', {
            url: 'https://www.linkedin.com/help/linkedin/answer/a1337839',
            title: title('Manage LinkedIn account and privacy settings', 'إدارة إعدادات حساب LinkedIn والخصوصية', 'Gérer les réglages du compte et de confidentialité LinkedIn', 'LinkedIn hesap ve gizlilik ayarlarını yönetin'),
            type: 'settings'
        });
        replaceExact(linkedin, 'https://www.linkedin.com/psettings/email', {
            url: 'https://www.linkedin.com/help/linkedin/answer/a1375084',
            title: title('LinkedIn account security best practices', 'أفضل ممارسات أمان حساب LinkedIn', 'Bonnes pratiques de sécurité du compte LinkedIn', 'LinkedIn hesap güvenliği en iyi uygulamaları'),
            type: 'security'
        });
    }

    const github = byId('github');
    if (github) {
        replaceExact(github, 'https://github.com/settings/security', {
            url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication',
            title: title('Configure two-factor authentication on GitHub', 'إعداد المصادقة الثنائية على GitHub', 'Configurer l’authentification à deux facteurs sur GitHub', 'GitHub’da iki faktörlü kimlik doğrulamayı yapılandırın'),
            type: 'security'
        }, 'provider-documentation');
        replaceExact(github, 'https://github.com/settings/profile', {
            url: 'https://docs.github.com/en/account-and-profile/how-tos/account-settings',
            title: title('Manage your GitHub account settings', 'إدارة إعدادات حساب GitHub', 'Gérer les paramètres de votre compte GitHub', 'GitHub hesap ayarlarınızı yönetin'),
            type: 'settings'
        }, 'provider-documentation');
    }

    const adobe = byId('adobe');
    replaceExact(adobe, 'https://account.adobe.com/security', {
        url: 'https://helpx.adobe.com/account/individual/sign-in-and-security/security-and-recovery/set-up-two-step-verification.html',
        title: title('Set up two-step verification for your Adobe account', 'إعداد التحقق بخطوتين لحساب Adobe', 'Configurer la vérification en deux étapes pour votre compte Adobe', 'Adobe hesabınız için iki adımlı doğrulamayı ayarlayın'),
        type: 'security'
    });

    const dropbox = byId('dropbox');
    replaceExact(dropbox, 'https://www.dropbox.com/account/security', {
        url: 'https://help.dropbox.com/account-access/enable-2-factor-authentication',
        title: title('Turn on two-factor authentication for Dropbox', 'تشغيل المصادقة الثنائية في Dropbox', 'Activer l’authentification à deux facteurs sur Dropbox', 'Dropbox için iki faktörlü kimlik doğrulamayı açın'),
        type: 'security'
    });

    const twitch = byId('twitch');
    if (twitch) {
        replaceExact(twitch, 'https://www.twitch.tv/user/disable-account', {
            url: 'https://help.twitch.tv/s/article/twitch-account-settings',
            title: title('Disable your Twitch account temporarily', 'تعطيل حساب Twitch مؤقتاً', 'Désactiver temporairement votre compte Twitch', 'Twitch hesabınızı geçici olarak devre dışı bırakın'),
            type: 'disable'
        });
        replaceExact(twitch, 'https://www.twitch.tv/settings/security', {
            url: 'https://help.twitch.tv/s/article/two-factor-authentication',
            title: title('Set up two-factor authentication on Twitch', 'إعداد المصادقة الثنائية على Twitch', 'Configurer l’authentification à deux facteurs sur Twitch', 'Twitch’te iki faktörlü kimlik doğrulamayı ayarlayın'),
            type: 'security'
        });
    }

    const epic = byId('epicgames');
    if (epic) {
        epic.loginRequired = true;
        epic.note = {
            en: 'Epic Games account deletion is irreversible after the 14-day reactivation window. The account is deactivated when the request is submitted, the deletion request can be canceled by signing in during those 14 days, and Epic says permanent deletion completes in 30 days. Purchases, progress and account items are deleted with the account.',
            ar: 'يصبح طلب حذف حساب Epic Games غير قابل للتراجع بعد نافذة إعادة التفعيل البالغة 14 يوماً. يتم تعطيل الحساب عند إرسال الطلب، ويمكن إلغاء الطلب بتسجيل الدخول خلال هذه الأيام الـ14، وتوضح Epic أن الحذف النهائي يكتمل خلال 30 يوماً. تُحذف المشتريات والتقدم وعناصر الحساب معه.',
            fr: 'La demande de suppression du compte Epic Games devient irréversible après la fenêtre de réactivation de 14 jours. Le compte est désactivé dès la demande, celle-ci peut être annulée en se reconnectant pendant ces 14 jours, et Epic indique que la suppression définitive s’achève sous 30 jours. Les achats, la progression et les éléments du compte sont supprimés avec lui.',
            tr: 'Epic Games hesap silme isteği 14 günlük yeniden etkinleştirme süresinden sonra geri alınamaz hale gelir. İstek gönderildiğinde hesap devre dışı bırakılır, bu 14 gün içinde oturum açarak istek iptal edilebilir ve Epic kalıcı silmenin 30 gün içinde tamamlandığını belirtir. Satın alımlar, ilerleme ve hesap öğeleri hesapla birlikte silinir.'
        };
        replaceExact(epic, 'https://www.epicgames.com/account/personal', {
            url: 'https://www.epicgames.com/help/c-202300000001645/c-202300000001756/how-do-i-delete-my-epic-games-account-a202300000013730',
            title: title('Delete your Epic Games account', 'حذف حساب Epic Games', 'Supprimer votre compte Epic Games', 'Epic Games hesabınızı silin'),
            type: 'delete'
        });
        replaceExact(epic, 'https://www.epicgames.com/account/password', {
            url: 'https://www.epicgames.com/help/c-202300000001639/a202300000016452?lang=en-US',
            title: title('Enable two-factor authentication on Epic Games', 'تفعيل المصادقة الثنائية في Epic Games', 'Activer l’authentification à deux facteurs sur Epic Games', 'Epic Games’te iki faktörlü kimlik doğrulamayı etkinleştirin'),
            type: 'security'
        });
    }
})();
