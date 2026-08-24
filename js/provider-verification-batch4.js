/**
 * Evidence-backed provider review batch 4.
 *
 * Only the exact first-party deletion guidance reviewed on 2026-08-24 receives
 * fresh verification metadata. Backup, security and settings resources remain
 * unchanged unless independently reviewed.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });

    function replaceDelete(platform, resource) {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(item => item.type === 'delete');
        if (index >= 0) platform.resources[index] = resource;
        else (platform.resources ||= []).push(resource);
    }

    const twitch = byId('twitch');
    if (twitch) {
        twitch.loginRequired = true;
        twitch.note = {
            en: 'Twitch separates temporary account disabling from permanent deletion. After a deletion request, Twitch provides a 90-day window before content is permanently removed; signing in during that period cancels deletion. Partners and Affiliates must leave the program first.',
            ar: 'تفصل Twitch بين تعطيل الحساب مؤقتاً وحذفه نهائياً. بعد طلب الحذف توجد نافذة لمدة 90 يوماً قبل إزالة المحتوى نهائياً، ويؤدي تسجيل الدخول خلالها إلى إلغاء الحذف. يجب على Partners وAffiliates مغادرة البرنامج أولاً.',
            fr: 'Twitch distingue la désactivation temporaire de la suppression définitive. Après une demande de suppression, Twitch prévoit 90 jours avant la suppression définitive du contenu ; une connexion pendant cette période annule la demande. Les Partners et Affiliates doivent d’abord quitter le programme.',
            tr: 'Twitch, geçici hesap devre dışı bırakma ile kalıcı silmeyi ayırır. Silme isteğinden sonra içerik kalıcı olarak kaldırılmadan önce 90 günlük bir süre vardır; bu sürede oturum açmak silme işlemini iptal eder. Partner ve Affiliate kullanıcıların önce programdan ayrılması gerekir.'
        };
        replaceDelete(twitch, {
            url: 'https://help.twitch.tv/s/article/delete-twitch-account',
            title: title('Delete your Twitch account', 'حذف حساب Twitch', 'Supprimer votre compte Twitch', 'Twitch hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const steam = byId('steam');
    if (steam) {
        steam.loginRequired = true;
        steam.note = {
            en: 'Steam Support verifies account ownership before deletion. The account is restricted and queued for deletion for 30 days, during which the request can be canceled. After deletion, licenses, inventory, wallet funds and associated account information cannot be recovered; some community posts may remain without account identity.',
            ar: 'تتحقق Steam Support من ملكية الحساب قبل الحذف. يُقيّد الحساب ويوضع في قائمة الحذف لمدة 30 يوماً ويمكن إلغاء الطلب خلالها. بعد الحذف لا يمكن استعادة التراخيص أو المخزون أو رصيد المحفظة أو معلومات الحساب المرتبطة، وقد تبقى بعض منشورات المجتمع دون هوية الحساب.',
            fr: 'Steam Support vérifie la propriété du compte avant suppression. Le compte est restreint et mis en attente de suppression pendant 30 jours, période durant laquelle la demande peut être annulée. Après suppression, licences, inventaire, solde du portefeuille et informations du compte ne sont plus récupérables ; certains contenus communautaires peuvent rester sans identité de compte.',
            tr: 'Steam Support, silmeden önce hesap sahipliğini doğrular. Hesap 30 gün boyunca kısıtlanır ve silme kuyruğuna alınır; bu sürede istek iptal edilebilir. Silme sonrasında lisanslar, envanter, cüzdan bakiyesi ve ilişkili hesap bilgileri geri getirilemez; bazı topluluk gönderileri hesap kimliği olmadan kalabilir.'
        };
        replaceDelete(steam, {
            url: 'https://help.steampowered.com/en/faqs/view/21A6-7C93-6CFE-100B',
            title: title('Request permanent Steam account deletion', 'طلب حذف حساب Steam نهائياً', 'Demander la suppression définitive du compte Steam', 'Steam hesabınızı kalıcı olarak silme isteği gönderin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const playstation = byId('playstation');
    if (playstation) {
        playstation.loginRequired = true;
        playstation.note = {
            en: 'PlayStation says account closure permanently deletes all associated data and content and prevents future sign-in with that account. The provider directs users to contact support or use the supported PlayStation Family app closure flow.',
            ar: 'توضح PlayStation أن إغلاق الحساب يحذف نهائياً جميع البيانات والمحتوى المرتبط به ويمنع تسجيل الدخول لاحقاً باستخدامه. يوجّه المزود المستخدم إلى الدعم أو إلى مسار الإغلاق المدعوم في تطبيق PlayStation Family.',
            fr: 'PlayStation indique que la fermeture du compte supprime définitivement toutes les données et tout le contenu associés et empêche toute connexion ultérieure avec ce compte. Le fournisseur oriente vers l’assistance ou le flux de fermeture pris en charge dans l’application PlayStation Family.',
            tr: 'PlayStation, hesabın kapatılmasının ilişkili tüm veri ve içeriği kalıcı olarak sildiğini ve bu hesapla gelecekte oturum açmayı engellediğini belirtir. Sağlayıcı, destek ile iletişime geçilmesini veya PlayStation Family uygulamasındaki desteklenen kapatma akışının kullanılmasını ister.'
        };
        replaceDelete(playstation, {
            url: 'https://www.playstation.com/en-us/support/account/close-account/',
            title: title('Close your PlayStation account', 'إغلاق حساب PlayStation', 'Fermer votre compte PlayStation', 'PlayStation hesabınızı kapatın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const notion = byId('notion');
    if (notion) {
        notion.loginRequired = true;
        notion.note = {
            en: 'Notion describes account deletion as permanent. Private workspaces where you are the only member are deleted, and shared workspaces where you are the only admin can be deleted for everyone. Export data first and confirm the account email before deleting.',
            ar: 'تصف Notion حذف الحساب بأنه إجراء دائم. تُحذف مساحات العمل الخاصة التي تكون العضو الوحيد فيها، وقد تُحذف مساحات العمل المشتركة للجميع إذا كنت المسؤول الوحيد عنها. صدّر البيانات أولاً وأكد بريد الحساب قبل الحذف.',
            fr: 'Notion décrit la suppression du compte comme permanente. Les espaces privés dont vous êtes l’unique membre sont supprimés, et les espaces partagés dont vous êtes l’unique administrateur peuvent être supprimés pour tous. Exportez d’abord les données et confirmez l’adresse e-mail du compte.',
            tr: 'Notion, hesap silmeyi kalıcı bir işlem olarak açıklar. Tek üyesi olduğunuz özel çalışma alanları silinir; tek yöneticisi olduğunuz paylaşılan çalışma alanları ise herkes için silinebilir. Önce verilerinizi dışa aktarın ve silmeden önce hesap e-postasını doğrulayın.'
        };
        replaceDelete(notion, {
            url: 'https://www.notion.com/help/delete-your-account',
            title: title('Delete your Notion account', 'حذف حساب Notion', 'Supprimer votre compte Notion', 'Notion hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const proton = byId('protonmail');
    if (proton) {
        proton.loginRequired = true;
        proton.note = {
            en: 'Deleting a Proton Account permanently deletes the account and its data across Proton Mail, Calendar, VPN, Pass, Drive and other Proton services. Proton says the account cannot be recovered and deleted usernames are not recycled.',
            ar: 'يؤدي حذف حساب Proton إلى حذف الحساب وبياناته نهائياً عبر Proton Mail وCalendar وVPN وPass وDrive وبقية خدمات Proton. توضح Proton أن الحساب لا يمكن استعادته وأن أسماء المستخدمين المحذوفة لا يعاد استخدامها.',
            fr: 'La suppression d’un compte Proton supprime définitivement le compte et ses données dans Proton Mail, Calendar, VPN, Pass, Drive et les autres services Proton. Proton indique que le compte ne peut pas être récupéré et que les noms d’utilisateur supprimés ne sont pas recyclés.',
            tr: 'Proton Hesabı silindiğinde hesap ve verileri Proton Mail, Calendar, VPN, Pass, Drive ve diğer Proton hizmetlerinde kalıcı olarak silinir. Proton, hesabın geri getirilemeyeceğini ve silinen kullanıcı adlarının yeniden kullanılmadığını belirtir.'
        };
        replaceDelete(proton, {
            url: 'https://proton.me/support/delete-account',
            title: title('Permanently delete your Proton Account', 'حذف حساب Proton نهائياً', 'Supprimer définitivement votre compte Proton', 'Proton Hesabınızı kalıcı olarak silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const stackoverflow = byId('stackoverflow');
    if (stackoverflow) {
        stackoverflow.loginRequired = true;
        stackoverflow.note = {
            en: 'Stack Overflow says profile deletion is irreversible. Votes are revoked and account content is anonymized rather than necessarily erased. Profiles with posts or more than 101 reputation are normally scheduled for deletion after 24 hours; network-wide deletion uses a separate data request.',
            ar: 'توضح Stack Overflow أن حذف الملف الشخصي غير قابل للتراجع. تُلغى الأصوات ويصبح محتوى الحساب مجهول الهوية بدلاً من حذفه بالضرورة. الملفات التي لديها منشورات أو أكثر من 101 سمعة تُجدول عادة للحذف بعد 24 ساعة، أما حذف الحساب عبر شبكة Stack بالكامل فيستخدم طلب بيانات منفصلاً.',
            fr: 'Stack Overflow indique que la suppression du profil est irréversible. Les votes sont révoqués et le contenu du compte est anonymisé plutôt que nécessairement effacé. Les profils ayant des publications ou plus de 101 points de réputation sont normalement supprimés après un délai de 24 heures ; la suppression à l’échelle du réseau passe par une demande de données distincte.',
            tr: 'Stack Overflow, profil silmenin geri alınamaz olduğunu belirtir. Oylar geri çekilir ve hesap içeriği zorunlu olarak silinmek yerine anonimleştirilir. Gönderisi olan veya 101’den fazla itibara sahip profiller normalde 24 saat sonra silinmek üzere planlanır; ağ genelindeki hesap silme işlemi ayrı bir veri isteğiyle yapılır.'
        };
        replaceDelete(stackoverflow, {
            url: 'https://stackoverflow.com/help/deleting-account',
            title: title('Delete your Stack Overflow profile', 'حذف ملف Stack Overflow', 'Supprimer votre profil Stack Overflow', 'Stack Overflow profilinizi silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const yahoo = byId('yahoo');
    if (yahoo) {
        yahoo.loginRequired = true;
        yahoo.note = {
            en: 'Yahoo requires paid subscriptions and outstanding balances to be resolved before closure. Recovery is region-dependent: generally 30 days, 90 days for Australia/New Zealand, and 180 days for Brazil, Hong Kong, India or Taiwan. Closing removes access to Yahoo Mail, Calendar, Finance and Fantasy data.',
            ar: 'تتطلب Yahoo معالجة الاشتراكات المدفوعة والأرصدة المتبقية قبل الإغلاق. تختلف نافذة الاستعادة حسب المنطقة: عادة 30 يوماً، و90 يوماً لأستراليا ونيوزيلندا، و180 يوماً للبرازيل وهونغ كونغ والهند وتايوان. يؤدي الإغلاق إلى فقدان الوصول إلى بيانات Yahoo Mail وCalendar وFinance وFantasy.',
            fr: 'Yahoo exige de régler les abonnements payants et les soldes restants avant fermeture. La fenêtre de récupération dépend de la région : généralement 30 jours, 90 jours pour l’Australie/Nouvelle-Zélande et 180 jours pour le Brésil, Hong Kong, l’Inde ou Taïwan. La fermeture retire l’accès aux données Yahoo Mail, Calendar, Finance et Fantasy.',
            tr: 'Yahoo, hesap kapatılmadan önce ücretli aboneliklerin ve kalan bakiyelerin çözülmesini ister. Kurtarma süresi bölgeye göre değişir: genellikle 30 gün, Avustralya/Yeni Zelanda için 90 gün, Brezilya, Hong Kong, Hindistan veya Tayvan için 180 gündür. Kapatma Yahoo Mail, Calendar, Finance ve Fantasy verilerine erişimi kaldırır.'
        };
        replaceDelete(yahoo, {
            url: 'https://help.yahoo.com/kb/close-yahoo-account-sln2044.html',
            title: title('Close your Yahoo account', 'إغلاق حساب Yahoo', 'Fermer votre compte Yahoo', 'Yahoo hesabınızı kapatın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }
})();
