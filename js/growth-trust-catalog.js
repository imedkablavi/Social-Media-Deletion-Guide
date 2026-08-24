/**
 * Evidence-backed refresh for high-intent and high-usage services.
 *
 * These exact provider URLs were manually reviewed on 2026-08-24. Only the
 * resources verified in that review are replaced here; unrelated legacy resources
 * remain in the catalog without receiving synthetic freshness metadata.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });

    function replaceType(platform, type, resource) {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(item => item.type === type);
        if (index >= 0) platform.resources[index] = resource;
        else (platform.resources ||= []).push(resource);
    }

    const facebook = byId('facebook');
    if (facebook) {
        facebook.loginRequired = true;
        facebook.note = {
            en: 'Facebook documents permanent account deletion separately from temporary deactivation. The deletion flow is available through Accounts Center or Facebook settings; download anything you want to keep before confirming deletion.',
            ar: 'توضح Facebook أن حذف الحساب نهائياً يختلف عن إلغاء تنشيطه مؤقتاً. يمكن بدء الحذف من مركز الحسابات أو إعدادات Facebook، ويُنصح بتنزيل أي معلومات تريد الاحتفاظ بها قبل التأكيد.',
            fr: 'Facebook distingue la suppression définitive de la désactivation temporaire. La suppression peut être lancée depuis l’Espace Comptes ou les paramètres Facebook ; téléchargez les informations à conserver avant de confirmer.',
            tr: 'Facebook, kalıcı hesap silmeyi geçici devre dışı bırakmadan ayrı olarak açıklar. Silme işlemi Hesaplar Merkezi veya Facebook ayarlarından başlatılabilir; onaylamadan önce saklamak istediğiniz bilgileri indirin.'
        };
        replaceType(facebook, 'delete', {
            url: 'https://www.facebook.com/help/224562897555674',
            title: title('Permanently delete your Facebook account', 'حذف حساب Facebook نهائياً', 'Supprimer définitivement votre compte Facebook', 'Facebook hesabınızı kalıcı olarak silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const whatsapp = byId('whatsapp');
    if (whatsapp) {
        whatsapp.loginRequired = true;
        whatsapp.note = {
            en: 'WhatsApp maintains a dedicated Help Center article for deleting an account. Account deletion is an in-app account action; uninstalling the app is not the same as deleting the account.',
            ar: 'تحتفظ WhatsApp بمقالة مخصصة في مركز المساعدة لحذف الحساب. حذف الحساب إجراء يتم من داخل التطبيق، وحذف التطبيق من الجهاز لا يساوي حذف الحساب.',
            fr: 'WhatsApp maintient un article dédié dans son centre d’aide pour supprimer un compte. La suppression du compte est une action dans l’application ; désinstaller l’application ne supprime pas le compte.',
            tr: 'WhatsApp, hesap silme için özel bir Yardım Merkezi makalesi sağlar. Hesap silme uygulama içindeki bir hesap işlemidir; uygulamayı kaldırmak hesabı silmekle aynı değildir.'
        };
        replaceType(whatsapp, 'delete', {
            url: 'https://faq.whatsapp.com/2138577903196467',
            title: title('Delete your WhatsApp account', 'حذف حساب WhatsApp', 'Supprimer votre compte WhatsApp', 'WhatsApp hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const tiktok = byId('tiktok');
    if (tiktok) {
        tiktok.loginRequired = true;
        tiktok.note = {
            en: 'TikTok directs users to Profile → Menu → Settings and privacy → Account → Deactivate or delete account, then to follow the in-app deletion instructions.',
            ar: 'توجّه TikTok المستخدم إلى الملف الشخصي ← القائمة ← الإعدادات والخصوصية ← الحساب ← إلغاء تنشيط الحساب أو حذفه، ثم اتباع تعليمات الحذف داخل التطبيق.',
            fr: 'TikTok indique d’aller dans Profil → Menu → Paramètres et confidentialité → Compte → Désactiver ou supprimer le compte, puis de suivre les instructions de suppression dans l’application.',
            tr: 'TikTok, Profil → Menü → Ayarlar ve gizlilik → Hesap → Hesabı devre dışı bırak veya sil yolunu izleyip uygulama içindeki silme talimatlarını tamamlamanızı belirtir.'
        };
        replaceType(tiktok, 'delete', {
            url: 'https://support.tiktok.com/en/account-and-privacy/deleting-an-account/deleting-an-account',
            title: title('Delete your TikTok account', 'حذف حساب TikTok', 'Supprimer votre compte TikTok', 'TikTok hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const snapchat = byId('snapchat');
    if (snapchat) {
        snapchat.loginRequired = true;
        snapchat.note = {
            en: 'Snapchat first deactivates an account before permanent deletion. The timing differs in some regions; the provider article documents the current region-specific retention/deletion window.',
            ar: 'تقوم Snapchat أولاً بإلغاء تنشيط الحساب قبل الحذف النهائي. تختلف المدة في بعض المناطق، وتوضح مقالة المزود الحالية نافذة الاحتفاظ والحذف حسب المنطقة.',
            fr: 'Snapchat désactive d’abord le compte avant sa suppression définitive. Le délai varie dans certaines régions ; l’article du fournisseur décrit la fenêtre actuelle selon la région.',
            tr: 'Snapchat, kalıcı silmeden önce hesabı devre dışı bırakır. Süre bazı bölgelerde değişir; sağlayıcının güncel makalesi bölgeye göre saklama/silme süresini açıklar.'
        };
        replaceType(snapchat, 'delete', {
            url: 'https://help.snapchat.com/hc/en-us/articles/7012328360596-How-do-I-deactivate-or-delete-my-Snapchat-account',
            title: title('Deactivate or delete your Snapchat account', 'إلغاء تنشيط أو حذف حساب Snapchat', 'Désactiver ou supprimer votre compte Snapchat', 'Snapchat hesabınızı devre dışı bırakın veya silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const google = byId('google');
    if (google) {
        google.loginRequired = true;
        google.note = {
            en: 'Deleting a Google Account removes data and access across services such as Gmail, Drive, Calendar and Play. Removing Gmail or removing an account from a device is a different, narrower action.',
            ar: 'يؤدي حذف حساب Google إلى إزالة البيانات والوصول عبر خدمات مثل Gmail وDrive وCalendar وPlay. حذف Gmail فقط أو إزالة الحساب من جهاز إجراء مختلف وأضيق نطاقاً.',
            fr: 'Supprimer un compte Google retire les données et l’accès à des services comme Gmail, Drive, Calendar et Play. Supprimer seulement Gmail ou retirer un compte d’un appareil est une action différente et plus limitée.',
            tr: 'Google Hesabı silmek Gmail, Drive, Takvim ve Play gibi hizmetlerdeki veri ve erişimi kaldırır. Yalnızca Gmail’i silmek veya hesabı cihazdan kaldırmak farklı ve daha dar kapsamlı işlemlerdir.'
        };
        replaceType(google, 'delete', {
            url: 'https://support.google.com/accounts/answer/32046',
            title: title('Delete your Google Account', 'حذف حساب Google', 'Supprimer votre compte Google', 'Google Hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const microsoft = byId('microsoft');
    if (microsoft) {
        microsoft.loginRequired = true;
        microsoft.note = {
            en: 'Microsoft requires sign-in before an account can be marked for closure. The current provider flow offers a 30- or 60-day reopen window; after that window, the account data and content are deleted.',
            ar: 'تتطلب Microsoft تسجيل الدخول قبل وضع الحساب في حالة الإغلاق. يتيح المسار الحالي نافذة إعادة فتح لمدة 30 أو 60 يوماً، وبعد انتهائها تُحذف بيانات الحساب ومحتواه.',
            fr: 'Microsoft exige une connexion avant de marquer le compte pour fermeture. Le flux actuel propose une fenêtre de réouverture de 30 ou 60 jours ; une fois celle-ci écoulée, les données et le contenu du compte sont supprimés.',
            tr: 'Microsoft, hesabın kapatılmak üzere işaretlenmesinden önce oturum açılmasını ister. Güncel akış 30 veya 60 günlük yeniden açma süresi sunar; bu süre geçince hesap verileri ve içerikleri silinir.'
        };
        replaceType(microsoft, 'delete', {
            url: 'https://support.microsoft.com/en-US/accounts-billing/manage/how-to-close-your-microsoft-account',
            title: title('Close your Microsoft account', 'إغلاق حساب Microsoft', 'Fermer votre compte Microsoft', 'Microsoft hesabınızı kapatın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const discord = byId('discord');
    if (discord) {
        discord.loginRequired = true;
        discord.note = {
            en: 'Discord says account deletion enters a 15-day pending-deletion period. Server ownership must be transferred or the owned servers deleted before the account can be deleted.',
            ar: 'توضح Discord أن حذف الحساب يمر بفترة حذف معلّق لمدة 15 يوماً، ويجب نقل ملكية الخوادم التي تملكها أو حذفها قبل حذف الحساب.',
            fr: 'Discord indique que la suppression passe par une période de 15 jours. La propriété des serveurs doit être transférée ou les serveurs supprimés avant la suppression du compte.',
            tr: 'Discord, hesap silme işleminin 15 günlük bekleyen silme sürecine girdiğini belirtir. Hesap silinmeden önce sahip olunan sunucular devredilmeli veya silinmelidir.'
        };
        replaceType(discord, 'delete', {
            url: 'https://support.discord.com/hc/en-us/articles/212500837-How-to-Delete-your-Discord-Account',
            title: title('Delete your Discord account', 'حذف حساب Discord', 'Supprimer votre compte Discord', 'Discord hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const telegram = byId('telegram');
    if (telegram) {
        telegram.loginRequired = true;
        telegram.note = {
            en: 'Telegram says deletion is irreversible and must be confirmed through the Telegram account. The confirmation code is delivered in Telegram rather than by SMS.',
            ar: 'توضح Telegram أن حذف الحساب غير قابل للتراجع ويجب تأكيده عبر حساب Telegram، ويصل رمز التأكيد داخل Telegram وليس عبر SMS.',
            fr: 'Telegram indique que la suppression est irréversible et doit être confirmée via le compte Telegram ; le code arrive dans Telegram et non par SMS.',
            tr: 'Telegram, hesap silmenin geri alınamaz olduğunu ve Telegram hesabı üzerinden onaylanması gerektiğini belirtir; doğrulama kodu SMS yerine Telegram üzerinden gelir.'
        };
        replaceType(telegram, 'delete', {
            url: 'https://my.telegram.org/auth?to=deactivate',
            title: title('Delete your Telegram account', 'حذف حساب Telegram', 'Supprimer votre compte Telegram', 'Telegram hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-account-portal'
        });
    }

    const github = byId('github');
    if (github) {
        github.loginRequired = true;
        github.note = {
            en: 'GitHub warns that deleting a personal account removes account-owned repositories and other owned content, and the deleted content cannot be restored.',
            ar: 'تحذر GitHub من أن حذف الحساب الشخصي يزيل المستودعات والمحتوى المملوك للحساب، ولا يمكن استعادة المحتوى المحذوف.',
            fr: 'GitHub avertit que la suppression d’un compte personnel supprime les dépôts et autres contenus détenus par le compte, sans possibilité de restauration.',
            tr: 'GitHub, kişisel hesabın silinmesinin hesaba ait depoları ve diğer sahip olunan içerikleri kaldırdığını ve silinen içeriğin geri yüklenemediğini belirtir.'
        };
        replaceType(github, 'delete', {
            url: 'https://docs.github.com/en/account-and-profile/how-tos/account-management/deleting-your-personal-account',
            title: title('Delete your GitHub personal account', 'حذف حساب GitHub الشخصي', 'Supprimer votre compte personnel GitHub', 'GitHub kişisel hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-documentation'
        });
        replaceType(github, 'backup', {
            url: 'https://docs.github.com/en/get-started/archiving-your-github-personal-account-and-public-repositories/requesting-an-archive-of-your-personal-accounts-data',
            title: title('Request an archive of your GitHub account data', 'طلب أرشيف بيانات حساب GitHub', 'Demander une archive des données de votre compte GitHub', 'GitHub hesap verilerinizin arşivini isteyin'),
            type: 'backup', official: true, verified: VERIFIED,
            evidenceSource: 'provider-documentation'
        });
    }
})();
