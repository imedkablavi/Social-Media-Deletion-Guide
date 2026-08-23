/**
 * Evidence-backed refresh for the next high-intent SEO cohort.
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
