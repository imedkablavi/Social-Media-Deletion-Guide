/**
 * Evidence-backed provider review batch 9.
 *
 * Public first-party help resources manually reviewed on 2026-08-24 replace
 * auth-only/direct settings links only where the provider documentation clearly
 * describes the same user intent. Unreviewed backup/settings routes remain unchanged.
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

    function replaceSlot(platform, type, currentUrl, replacement, evidenceSource = 'provider-support') {
        if (!platform) return;
        const index = (platform.resources || []).findIndex(resource => resource.type === type && resource.url === currentUrl);
        if (index >= 0) platform.resources[index] = reviewed(replacement, evidenceSource);
    }

    const facebook = byId('facebook');
    if (facebook) {
        replaceSlot(facebook, 'disable', 'https://www.facebook.com/help/214376678584711', {
            url: 'https://www.facebook.com/help/173842726002516/list/',
            title: title('Understand Facebook account deactivation vs deletion', 'فهم الفرق بين تعطيل حساب Facebook وحذفه', 'Comprendre la désactivation et la suppression du compte Facebook', 'Facebook hesabını devre dışı bırakma ve silme farkını anlayın'),
            type: 'disable'
        });
        replaceSlot(facebook, 'security', 'https://www.facebook.com/hacked', {
            url: 'https://www.facebook.com/help/1216349518398524/',
            title: title('Recover a hacked Facebook account', 'استرداد حساب Facebook مخترق', 'Récupérer un compte Facebook piraté', 'Ele geçirilmiş Facebook hesabını kurtarın'),
            type: 'security'
        });
        replaceSlot(facebook, 'settings', 'https://www.facebook.com/settings?tab=privacy', {
            url: 'https://www.facebook.com/help/193677450678703/',
            title: title('View and adjust Facebook privacy settings', 'عرض إعدادات خصوصية Facebook وتعديلها', 'Afficher et ajuster les paramètres de confidentialité Facebook', 'Facebook gizlilik ayarlarını görüntüleyin ve düzenleyin'),
            type: 'settings'
        });
    }

    const steam = byId('steam');
    replaceSlot(steam, 'security', 'https://store.steampowered.com/twofactor/manage', {
        url: 'https://help.steampowered.com/en/faqs/view/6891-E071-C9D9-0134',
        title: title('Set up the Steam Guard mobile authenticator', 'إعداد مصادقة Steam Guard عبر الهاتف', 'Configurer l’authentificateur mobile Steam Guard', 'Steam Guard mobil kimlik doğrulayıcısını ayarlayın'),
        type: 'security'
    });

    const quora = byId('quora');
    if (quora) {
        quora.loginRequired = true;
        quora.note = {
            en: 'Quora account deletion is irreversible after the 14-day grace period. The account is deactivated immediately when deletion is confirmed; logging in during the next 14 days cancels deletion. Community-owned questions may remain without public association to your account. A separate Help Center flow lets you request an archive of your content and personal data.',
            ar: 'يصبح حذف حساب Quora غير قابل للتراجع بعد مهلة 14 يوماً. يتم تعطيل الحساب فور تأكيد الحذف، ويؤدي تسجيل الدخول خلال الأيام الـ14 التالية إلى إلغاء الحذف. قد تبقى الأسئلة المملوكة للمجتمع دون ربط علني بحسابك. ويوجد مسار منفصل في مركز المساعدة لطلب أرشيف من محتواك وبياناتك الشخصية.',
            fr: 'La suppression du compte Quora devient irréversible après un délai de grâce de 14 jours. Le compte est désactivé immédiatement après confirmation ; une connexion pendant les 14 jours suivants annule la suppression. Les questions appartenant à la communauté peuvent rester sans association publique avec votre compte. Un flux distinct permet de demander une archive de votre contenu et de vos données personnelles.',
            tr: 'Quora hesap silme işlemi 14 günlük bekleme süresinden sonra geri alınamaz. Silme onaylandığında hesap hemen devre dışı bırakılır; sonraki 14 gün içinde oturum açmak silmeyi iptal eder. Topluluğa ait sorular hesabınızla herkese açık şekilde ilişkilendirilmeden kalabilir. İçerik ve kişisel verilerinizin arşivini istemek için ayrı bir Yardım Merkezi akışı vardır.'
        };
        replaceSlot(quora, 'delete', 'https://www.quora.com/settings/privacy', {
            url: 'https://help.quora.com/hc/en-us/articles/115004250866-How-do-I-delete-my-Quora-account-',
            title: title('Delete your Quora account', 'حذف حساب Quora', 'Supprimer votre compte Quora', 'Quora hesabınızı silin'),
            type: 'delete'
        });
        replaceSlot(quora, 'backup', 'https://www.quora.com/settings/privacy', {
            url: 'https://help.quora.com/hc/en-us/articles/360000839503-Can-I-get-a-copy-of-my-data',
            title: title('Request a copy of your Quora data', 'طلب نسخة من بيانات Quora', 'Demander une copie de vos données Quora', 'Quora verilerinizin bir kopyasını isteyin'),
            type: 'backup'
        });
    }

    const medium = byId('medium');
    if (medium) {
        medium.loginRequired = true;
        medium.note = {
            en: 'Medium separates reversible account deactivation from permanent account deletion. Permanent deletion removes account data according to Medium’s Privacy Policy. Medium also provides a separate export flow that packages personal data and stories as HTML files in a ZIP archive and emails a download link when ready.',
            ar: 'تفصل Medium بين تعطيل الحساب القابل للاستعادة وحذف الحساب نهائياً. يؤدي الحذف الدائم إلى إزالة بيانات الحساب وفق سياسة خصوصية Medium. كما توفر Medium مسار تصدير منفصلاً يجمع البيانات الشخصية والقصص كملفات HTML داخل أرشيف ZIP ويرسل رابط التنزيل بالبريد الإلكتروني عند الجاهزية.',
            fr: 'Medium distingue la désactivation réversible de la suppression définitive du compte. La suppression permanente retire les données du compte conformément à la politique de confidentialité de Medium. Un flux d’export distinct regroupe les données personnelles et les histoires en fichiers HTML dans une archive ZIP, puis envoie un lien de téléchargement par e-mail.',
            tr: 'Medium, geri alınabilir hesap devre dışı bırakma ile kalıcı hesap silmeyi ayırır. Kalıcı silme, Medium Gizlilik Politikası uyarınca hesap verilerini kaldırır. Medium ayrıca kişisel verileri ve hikâyeleri ZIP arşivindeki HTML dosyaları olarak hazırlayan ve hazır olduğunda e-posta ile indirme bağlantısı gönderen ayrı bir dışa aktarma akışı sunar.'
        };
        replaceSlot(medium, 'delete', 'https://medium.com/me/settings', {
            url: 'https://help.medium.com/hc/en-us/articles/115004914748-Delete-or-deactivate-your-account',
            title: title('Delete or deactivate your Medium account', 'حذف حساب Medium أو تعطيله', 'Supprimer ou désactiver votre compte Medium', 'Medium hesabınızı silin veya devre dışı bırakın'),
            type: 'delete'
        });
        replaceSlot(medium, 'backup', 'https://medium.com/me/settings', {
            url: 'https://help.medium.com/hc/en-us/articles/115004745787-Export-your-account-data',
            title: title('Export your Medium account data', 'تصدير بيانات حساب Medium', 'Exporter les données de votre compte Medium', 'Medium hesap verilerinizi dışa aktarın'),
            type: 'backup'
        });
    }
})();
