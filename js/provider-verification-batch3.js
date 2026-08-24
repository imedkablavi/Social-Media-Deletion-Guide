/**
 * Evidence-backed provider review batch 3.
 *
 * Only exact provider resources manually reviewed on 2026-08-24 receive fresh
 * verification metadata. Scope corrections (for example Slack deactivation) are
 * intentional and avoid presenting non-deletion actions as permanent deletion.
 */
(() => {
    const VERIFIED = '2026-08-24';
    const byId = id => platforms.find(platform => platform.id === id);
    const title = (en, ar, fr, tr) => ({ en, ar, fr, tr });

    function replaceSlot(platform, existingType, resource) {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(item => item.type === existingType);
        if (index >= 0) platform.resources[index] = resource;
        else (platform.resources ||= []).push(resource);
    }

    const spotify = byId('spotify');
    if (spotify) {
        spotify.loginRequired = true;
        spotify.note = {
            en: 'Spotify distinguishes closing an account from canceling Premium. Closing the account permanently deletes Spotify data; Spotify emails a reactivation link that works for 7 days, after which data deletion begins.',
            ar: 'تميز Spotify بين إغلاق الحساب وإلغاء Premium. يؤدي إغلاق الحساب إلى حذف بيانات Spotify نهائياً، وترسل Spotify رابط إعادة تفعيل يعمل لمدة 7 أيام، وبعدها تبدأ عملية حذف البيانات.',
            fr: 'Spotify distingue la fermeture du compte de l’annulation de Premium. La fermeture supprime définitivement les données Spotify ; Spotify envoie un lien de réactivation valable 7 jours, après quoi la suppression des données commence.',
            tr: 'Spotify, hesabı kapatmayı Premium iptalinden ayırır. Hesabı kapatmak Spotify verilerini kalıcı olarak siler; Spotify 7 gün geçerli bir yeniden etkinleştirme bağlantısı gönderir ve bu süreden sonra veri silme süreci başlar.'
        };
        replaceSlot(spotify, 'delete', {
            url: 'https://support.spotify.com/us/article/how-can-i-close-my-spotify-account/',
            title: title('Close your Spotify account and delete your data', 'إغلاق حساب Spotify وحذف بياناتك', 'Fermer votre compte Spotify et supprimer vos données', 'Spotify hesabınızı kapatın ve verilerinizi silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const apple = byId('apple');
    if (apple) {
        apple.loginRequired = true;
        apple.note = {
            en: 'Apple’s Data and Privacy portal provides separate self-service options to download data, temporarily deactivate an Apple Account, or permanently delete the Apple Account and associated data.',
            ar: 'توفر بوابة البيانات والخصوصية من Apple خيارات مستقلة لتنزيل البيانات أو إلغاء تنشيط حساب Apple مؤقتاً أو حذف حساب Apple والبيانات المرتبطة به نهائياً.',
            fr: 'Le portail Données et confidentialité d’Apple propose des options distinctes pour télécharger les données, désactiver temporairement un compte Apple ou supprimer définitivement le compte Apple et les données associées.',
            tr: 'Apple’ın Veri ve Gizlilik portalı; verileri indirme, Apple Hesabını geçici olarak devre dışı bırakma veya Apple Hesabını ve ilişkili verileri kalıcı olarak silme işlemlerini ayrı seçenekler olarak sunar.'
        };
        replaceSlot(apple, 'delete', {
            url: 'https://privacy.apple.com/',
            title: title('Delete or deactivate your Apple Account', 'حذف حساب Apple أو إلغاء تنشيطه', 'Supprimer ou désactiver votre compte Apple', 'Apple Hesabınızı silin veya devre dışı bırakın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-privacy-portal'
        });
    }

    const adobe = byId('adobe');
    if (adobe) {
        adobe.loginRequired = true;
        adobe.note = {
            en: 'Adobe says account deletion removes personal information and content and ends access to Adobe apps, cloud files, purchase history and account settings. Active subscriptions and organization/admin obligations must be resolved first; Adobe allows reactivation for 27 days after deletion.',
            ar: 'توضح Adobe أن حذف الحساب يزيل المعلومات الشخصية والمحتوى وينهي الوصول إلى التطبيقات والملفات السحابية وسجل الشراء وإعدادات الحساب. يجب معالجة الاشتراكات النشطة والتزامات المؤسسة أو الإدارة أولاً، وتتيح Adobe إعادة التفعيل خلال 27 يوماً من الحذف.',
            fr: 'Adobe indique que la suppression retire les informations personnelles et le contenu et met fin à l’accès aux applications, fichiers cloud, achats et paramètres. Les abonnements actifs et obligations d’organisation/administration doivent être réglés auparavant ; la réactivation reste possible pendant 27 jours.',
            tr: 'Adobe, hesap silmenin kişisel bilgileri ve içeriği kaldırdığını; uygulamalara, bulut dosyalarına, satın alma geçmişine ve ayarlara erişimi sonlandırdığını belirtir. Aktif abonelikler ile kuruluş/yönetici yükümlülükleri önce çözülmelidir; Adobe silmeden sonra 27 gün içinde yeniden etkinleştirmeye izin verir.'
        };
        replaceSlot(adobe, 'delete', {
            url: 'https://helpx.adobe.com/account/individual/manage-your-account/delete-adobe-account.html',
            title: title('Delete your Adobe account', 'حذف حساب Adobe', 'Supprimer votre compte Adobe', 'Adobe hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const dropbox = byId('dropbox');
    if (dropbox) {
        dropbox.loginRequired = true;
        dropbox.note = {
            en: 'Dropbox says permanent account deletion cannot be undone. It deletes account and private-file data and unlinks devices; paid subscriptions may need cancellation first, and team members may need an admin to delete their account.',
            ar: 'توضح Dropbox أن حذف الحساب نهائياً لا يمكن التراجع عنه. يؤدي ذلك إلى حذف بيانات الحساب والملفات الخاصة وفصل الأجهزة؛ وقد يلزم إلغاء الاشتراك المدفوع أولاً، بينما قد يحتاج أعضاء الفرق إلى مسؤول لحذف حسابهم.',
            fr: 'Dropbox indique que la suppression définitive est irréversible. Elle supprime les données du compte et des fichiers privés et dissocie les appareils ; un abonnement payant peut devoir être annulé auparavant et les membres d’équipe peuvent devoir passer par un administrateur.',
            tr: 'Dropbox, kalıcı hesap silmenin geri alınamayacağını belirtir. Hesap ve özel dosya verileri silinir ve cihazların bağlantısı kaldırılır; ücretli aboneliğin önce iptal edilmesi gerekebilir, ekip üyeleri ise hesap silme için yöneticilerine ihtiyaç duyabilir.'
        };
        replaceSlot(dropbox, 'delete', {
            url: 'https://help.dropbox.com/account-access/delete-account',
            title: title('Permanently delete your Dropbox account', 'حذف حساب Dropbox نهائياً', 'Supprimer définitivement votre compte Dropbox', 'Dropbox hesabınızı kalıcı olarak silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const ebay = byId('ebay');
    if (ebay) {
        ebay.loginRequired = true;
        ebay.note = {
            en: 'eBay requires balances, fees, open bids, pending transactions and subscriptions to be resolved before closure. Account closure generally takes 14 days and can take up to 60 days after recent transactions; after the process, the account is permanently closed and eligible personal data is deleted.',
            ar: 'تتطلب eBay تسوية الأرصدة والرسوم والمزايدات المفتوحة والمعاملات المعلقة والاشتراكات قبل الإغلاق. يستغرق إغلاق الحساب عادةً 14 يوماً وقد يصل إلى 60 يوماً بعد المعاملات الحديثة؛ وبعد اكتمال العملية يُغلق الحساب نهائياً وتُحذف البيانات الشخصية المؤهلة.',
            fr: 'eBay exige de régler soldes, frais, enchères ouvertes, transactions en attente et abonnements avant la fermeture. Celle-ci prend généralement 14 jours et peut aller jusqu’à 60 jours après des transactions récentes ; le compte est ensuite fermé définitivement et les données personnelles éligibles sont supprimées.',
            tr: 'eBay, hesap kapatılmadan önce bakiye ve ücretlerin, açık tekliflerin, bekleyen işlemlerin ve aboneliklerin çözülmesini ister. Kapatma genellikle 14 gün sürer, yakın tarihli işlemlerde 60 güne kadar uzayabilir; süreç sonunda hesap kalıcı olarak kapatılır ve uygun kişisel veriler silinir.'
        };
        replaceSlot(ebay, 'delete', {
            url: 'https://www.ebay.com/help/account/default/closing-account?id=4199',
            title: title('Close your eBay account', 'إغلاق حساب eBay', 'Fermer votre compte eBay', 'eBay hesabınızı kapatın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const slack = byId('slack');
    if (slack) {
        slack.loginRequired = true;
        slack.note = {
            en: 'Slack account deactivation applies per workspace and does not automatically delete messages or files. Workspace Primary Owners must transfer ownership before deactivation; deleting profile information is a separate owner-assisted step after deactivation.',
            ar: 'ينطبق إلغاء تنشيط Slack على كل مساحة عمل بشكل منفصل ولا يحذف الرسائل أو الملفات تلقائياً. يجب على المالك الأساسي نقل الملكية قبل إلغاء التنشيط، وحذف معلومات الملف الشخصي خطوة منفصلة بمساعدة المالك بعد إلغاء التنشيط.',
            fr: 'La désactivation Slack s’applique séparément à chaque espace de travail et ne supprime pas automatiquement messages ou fichiers. Le propriétaire principal doit transférer la propriété avant désactivation ; la suppression des informations de profil est une étape distincte assistée par le propriétaire après désactivation.',
            tr: 'Slack hesap devre dışı bırakma işlemi her çalışma alanı için ayrıdır ve mesajları veya dosyaları otomatik silmez. Birincil çalışma alanı sahipleri önce sahipliği devretmelidir; profil bilgilerinin silinmesi ise devre dışı bırakmadan sonra sahip yardımıyla yapılan ayrı bir işlemdir.'
        };
        replaceSlot(slack, 'delete', {
            url: 'https://slack.com/help/articles/203953146-Deactivate-your-Slack-account',
            title: title('Deactivate your Slack account in a workspace', 'إلغاء تنشيط حساب Slack في مساحة عمل', 'Désactiver votre compte Slack dans un espace de travail', 'Bir çalışma alanındaki Slack hesabınızı devre dışı bırakın'),
            type: 'disable', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const zoom = byId('zoom');
    if (zoom) {
        zoom.loginRequired = true;
        zoom.note = {
            en: 'Zoom says Basic (free) account owners can permanently delete their account. Paid accounts must first cancel the subscription and wait until the current billing cycle ends before account termination is available.',
            ar: 'توضح Zoom أن مالك الحساب Basic المجاني يمكنه حذف حسابه نهائياً. يجب على الحسابات المدفوعة إلغاء الاشتراك أولاً والانتظار حتى نهاية دورة الفوترة الحالية قبل توفر إنهاء الحساب.',
            fr: 'Zoom indique que les propriétaires d’un compte Basic gratuit peuvent supprimer définitivement leur compte. Les comptes payants doivent d’abord annuler l’abonnement et attendre la fin du cycle de facturation en cours avant de pouvoir résilier le compte.',
            tr: 'Zoom, Basic (ücretsiz) hesap sahiplerinin hesaplarını kalıcı olarak silebildiğini belirtir. Ücretli hesaplarda, hesap sonlandırılmadan önce abonelik iptal edilmeli ve mevcut faturalandırma döneminin bitmesi beklenmelidir.'
        };
        replaceSlot(zoom, 'delete', {
            url: 'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067341',
            title: title('Permanently delete your Zoom account', 'حذف حساب Zoom نهائياً', 'Supprimer définitivement votre compte Zoom', 'Zoom hesabınızı kalıcı olarak silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }
})();
