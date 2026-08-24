/**
 * Evidence-backed provider review batch 2.
 *
 * Only resources manually reviewed on 2026-08-24 are given fresh verification
 * metadata here. Unrelated resources remain unchanged and must be reviewed
 * independently before they receive provider-reviewed status.
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

    const linkedin = byId('linkedin');
    if (linkedin) {
        linkedin.loginRequired = true;
        linkedin.note = {
            en: 'LinkedIn says closing an account permanently deletes the profile and removes access to account information. Premium, group ownership or enterprise-related obligations may need to be resolved first; in most cases an account closed for less than 14 days can be reopened with some data not recoverable.',
            ar: 'توضح LinkedIn أن إغلاق الحساب يحذف الملف الشخصي نهائياً ويزيل الوصول إلى معلومات الحساب. قد يلزم أولاً معالجة اشتراك Premium أو ملكية المجموعات أو الارتباطات المؤسسية؛ ويمكن في معظم الحالات إعادة فتح الحساب خلال أقل من 14 يوماً مع عدم إمكانية استعادة بعض البيانات.',
            fr: 'LinkedIn indique que la fermeture supprime définitivement le profil et l’accès aux informations du compte. Les obligations Premium, de groupe ou d’entreprise peuvent devoir être réglées auparavant ; dans la plupart des cas, un compte fermé depuis moins de 14 jours peut être rouvert, avec certaines données non récupérables.',
            tr: 'LinkedIn, hesabı kapatmanın profili kalıcı olarak sildiğini ve hesap bilgilerine erişimi kaldırdığını belirtir. Premium, grup sahipliği veya kurumsal bağlantılar önce çözülmek zorunda olabilir; çoğu durumda 14 günden kısa süre önce kapatılan hesap yeniden açılabilir ancak bazı veriler geri getirilemez.'
        };
        replaceType(linkedin, 'delete', {
            url: 'https://www.linkedin.com/help/linkedin/answer/a1379064?lang=en',
            title: title('Close and delete your LinkedIn account', 'إغلاق حساب LinkedIn وحذفه', 'Fermer et supprimer votre compte LinkedIn', 'LinkedIn hesabınızı kapatın ve silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const reddit = byId('reddit');
    if (reddit) {
        reddit.loginRequired = true;
        reddit.note = {
            en: 'Reddit says account deletion cannot be reversed. Deleting the account does not delete posts or comments, and it does not cancel Reddit Premium; remove content and cancel the subscription separately if needed.',
            ar: 'توضح Reddit أن حذف الحساب غير قابل للتراجع. حذف الحساب لا يحذف المنشورات أو التعليقات ولا يلغي Reddit Premium؛ احذف المحتوى وألغِ الاشتراك بشكل منفصل عند الحاجة.',
            fr: 'Reddit indique que la suppression du compte est irréversible. Elle ne supprime pas les publications ou commentaires et n’annule pas Reddit Premium ; supprimez le contenu et annulez l’abonnement séparément si nécessaire.',
            tr: 'Reddit, hesap silme işleminin geri alınamayacağını belirtir. Hesabı silmek gönderileri veya yorumları silmez ve Reddit Premium aboneliğini iptal etmez; gerekirse içeriği silin ve aboneliği ayrıca iptal edin.'
        };
        replaceType(reddit, 'delete', {
            url: 'https://support.reddithelp.com/hc/en-us/articles/204579509-How-do-I-delete-my-account',
            title: title('Delete your Reddit account', 'حذف حساب Reddit', 'Supprimer votre compte Reddit', 'Reddit hesabınızı silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const pinterest = byId('pinterest');
    if (pinterest) {
        pinterest.loginRequired = true;
        pinterest.note = {
            en: 'Pinterest distinguishes permanent deletion from temporary deactivation. The public profile is deactivated immediately after a deletion request, and Pinterest says the account and personal data are permanently deleted after 7 days; email confirmation is required.',
            ar: 'تميز Pinterest بين الحذف النهائي وإلغاء التنشيط المؤقت. يتم تعطيل الملف العام فور طلب الحذف، وتوضح Pinterest أن الحساب والبيانات الشخصية تُحذف نهائياً بعد 7 أيام؛ ويتطلب الإجراء تأكيداً عبر البريد الإلكتروني.',
            fr: 'Pinterest distingue la suppression définitive de la désactivation temporaire. Le profil public est désactivé immédiatement après la demande et Pinterest indique que le compte et les données personnelles sont supprimés définitivement après 7 jours ; une confirmation par e-mail est requise.',
            tr: 'Pinterest, kalıcı silmeyi geçici devre dışı bırakmadan ayırır. Silme isteğinden sonra herkese açık profil hemen devre dışı bırakılır ve Pinterest hesap ile kişisel verilerin 7 gün sonra kalıcı olarak silindiğini belirtir; e-posta onayı gerekir.'
        };
        replaceType(pinterest, 'delete', {
            url: 'https://help.pinterest.com/en/article/deactivate-or-close-your-account',
            title: title('Delete or temporarily deactivate your Pinterest account', 'حذف حساب Pinterest أو إلغاء تنشيطه مؤقتاً', 'Supprimer ou désactiver temporairement votre compte Pinterest', 'Pinterest hesabınızı silin veya geçici olarak devre dışı bırakın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const paypal = byId('paypal');
    if (paypal) {
        paypal.loginRequired = true;
        paypal.note = {
            en: 'PayPal says a closed account cannot be reopened. A remaining balance, account limitation or other unresolved issue prevents closure, so resolve those items and remove funds before closing the account.',
            ar: 'توضح PayPal أن الحساب المغلق لا يمكن إعادة فتحه. يمنع الرصيد المتبقي أو تقييد الحساب أو أي مشكلة غير محلولة إغلاقه، لذلك يجب معالجة هذه الأمور وسحب الأموال قبل الإغلاق.',
            fr: 'PayPal indique qu’un compte fermé ne peut pas être rouvert. Un solde restant, une restriction de compte ou un autre problème non résolu empêche la fermeture ; réglez ces éléments et retirez les fonds avant de fermer le compte.',
            tr: 'PayPal, kapatılan bir hesabın yeniden açılamayacağını belirtir. Kalan bakiye, hesap kısıtlaması veya çözülmemiş başka bir sorun kapatmayı engeller; hesabı kapatmadan önce bunları çözün ve bakiyeyi çekin.'
        };
        replaceType(paypal, 'delete', {
            url: 'https://www.paypal.com/us/cshelp/article/how-do-i-close-my-paypal-account-help247',
            title: title('Close your PayPal account', 'إغلاق حساب PayPal', 'Fermer votre compte PayPal', 'PayPal hesabınızı kapatın'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
    }

    const netflix = byId('netflix');
    if (netflix) {
        netflix.loginRequired = true;
        netflix.note = {
            en: 'Netflix distinguishes membership cancellation from permanent account deletion. Netflix says canceled accounts are normally deleted automatically after 24 months, while an earlier permanent deletion can be requested; for an active membership, deletion normally takes effect after the current billing period.',
            ar: 'تميز Netflix بين إلغاء العضوية وحذف الحساب نهائياً. توضح Netflix أن الحسابات الملغاة تُحذف عادةً تلقائياً بعد 24 شهراً، ويمكن طلب حذف نهائي أبكر؛ وبالنسبة للعضوية النشطة يسري الحذف عادةً بعد انتهاء فترة الفوترة الحالية.',
            fr: 'Netflix distingue l’annulation de l’abonnement de la suppression définitive du compte. Netflix indique que les comptes annulés sont normalement supprimés automatiquement après 24 mois, mais qu’une suppression définitive plus précoce peut être demandée ; pour un abonnement actif, elle prend généralement effet après la période de facturation en cours.',
            tr: 'Netflix, üyelik iptalini kalıcı hesap silmeden ayırır. Netflix, iptal edilen hesapların normalde 24 ay sonra otomatik olarak silindiğini, daha erken kalıcı silme talep edilebildiğini ve aktif üyeliklerde silmenin genellikle mevcut faturalandırma dönemi sonunda gerçekleştiğini belirtir.'
        };
        replaceType(netflix, 'delete', {
            url: 'https://help.netflix.com/en/node/126558',
            title: title('Permanently delete your Netflix account', 'حذف حساب Netflix نهائياً', 'Supprimer définitivement votre compte Netflix', 'Netflix hesabınızı kalıcı olarak silin'),
            type: 'delete', official: true, verified: VERIFIED,
            evidenceSource: 'provider-support'
        });
        replaceType(netflix, 'disable', {
            url: 'https://www.netflix.com/cancelplan',
            title: title('Cancel your Netflix membership', 'إلغاء عضوية Netflix', 'Annuler votre abonnement Netflix', 'Netflix üyeliğinizi iptal edin'),
            type: 'disable', official: true, verified: VERIFIED,
            evidenceSource: 'provider-account-action'
        });
    }
})();
