/**
 * Final localization layer.
 *
 * The original catalog predates Turkish support and historically copied English
 * resource titles into `tr`. This layer replaces those fallbacks with curated
 * Turkish labels, completes runtime UI strings, and localizes service notes.
 * It loads after every catalog maintenance layer so browser and build output use
 * the same finalized translations.
 */
(() => {
    const patches = {
        en: {
            help: 'Help', close: 'Close', modalCloseLabel: 'Close dialog',
            connectionRestored: 'Connection restored', offlineNotice: 'You are offline',
            unexpectedError: 'An unexpected error occurred. Please refresh the page.',
            networkError: 'A network error occurred. Please check your connection.',
            initErrorTitle: 'Failed to load the application',
            initErrorText: 'The directory could not finish loading.',
            reloadPage: 'Reload page', technicalDetails: 'Technical details',
            githubRepositoryLabel: 'GitHub repository', navPrimaryLabel: 'Primary navigation',
            brandHomeLabel: 'Account Deletion Guide home', changeLanguageLabel: 'Change language',
            directoryStatsLabel: 'Directory statistics', directoryPrinciplesLabel: 'Directory principles',
            directoryAriaLabel: 'Account deletion directory', searchAriaLabel: 'Search platforms and resources',
            categoryFiltersLabel: 'Category filters', difficultyAriaLabel: 'Deletion difficulty',
            supportedPlatformsLabel: 'Supported platforms', resourcesCountLabel: 'resources',
            serviceGuidesTitle: 'Individual account deletion guides',
            serviceGuidesLead: 'Browse crawlable service-specific pages with official links, deletion difficulty and verification metadata. Available in:',
            popularSupportedList: 'OpenAI / ChatGPT, Claude, Google Gemini, Perplexity, Microsoft Copilot, Instagram, Facebook, X, TikTok, Discord, Telegram, WhatsApp, GitHub, GitLab, Google, Microsoft, Apple, Netflix, Spotify, Steam, PlayStation, Notion, Figma, Airbnb, Uber and more.',
            scopeGoogleAccount: 'Google account', scopeMicrosoftAccount: 'Microsoft account',
            noResultsDesc: 'Try another search or clear the filters.'
        },
        ar: {
            help: 'مساعدة', close: 'إغلاق', modalCloseLabel: 'إغلاق النافذة',
            connectionRestored: 'تمت استعادة الاتصال', offlineNotice: 'أنت غير متصل بالإنترنت',
            unexpectedError: 'حدث خطأ غير متوقع. حدّث الصفحة وحاول مرة أخرى.',
            networkError: 'حدث خطأ في الشبكة. تحقق من اتصالك بالإنترنت.',
            initErrorTitle: 'تعذر تحميل التطبيق',
            initErrorText: 'لم يكتمل تحميل الدليل.',
            reloadPage: 'إعادة تحميل الصفحة', technicalDetails: 'التفاصيل التقنية',
            githubRepositoryLabel: 'مستودع GitHub', navPrimaryLabel: 'التنقل الرئيسي',
            brandHomeLabel: 'الصفحة الرئيسية لدليل حذف الحسابات', changeLanguageLabel: 'تغيير اللغة',
            directoryStatsLabel: 'إحصاءات الدليل', directoryPrinciplesLabel: 'مبادئ الدليل',
            directoryAriaLabel: 'دليل حذف الحسابات', searchAriaLabel: 'البحث في الخدمات والمصادر',
            categoryFiltersLabel: 'فلاتر التصنيفات', difficultyAriaLabel: 'صعوبة الحذف',
            supportedPlatformsLabel: 'الخدمات المدعومة', resourcesCountLabel: 'مصادر',
            serviceGuidesTitle: 'أدلة حذف الحسابات لكل خدمة',
            serviceGuidesLead: 'تصفح صفحات مستقلة لكل خدمة تتضمن الروابط الرسمية وصعوبة الحذف وبيانات التحقق. متاحة باللغات:',
            popularSupportedList: 'OpenAI / ChatGPT، Claude، Google Gemini، Perplexity، Microsoft Copilot، Instagram، Facebook، X، TikTok، Discord، Telegram، WhatsApp، GitHub، GitLab، Google، Microsoft، Apple، Netflix، Spotify، Steam، PlayStation، Notion، Figma، Airbnb، Uber وغيرها.',
            scopeGoogleAccount: 'حساب Google', scopeMicrosoftAccount: 'حساب Microsoft',
            noResultsDesc: 'جرّب بحثًا آخر أو امسح الفلاتر.'
        },
        fr: {
            help: 'Aide', close: 'Fermer', modalCloseLabel: 'Fermer la boîte de dialogue',
            connectionRestored: 'Connexion rétablie', offlineNotice: 'Vous êtes hors ligne',
            unexpectedError: 'Une erreur inattendue est survenue. Actualisez la page.',
            networkError: 'Une erreur réseau est survenue. Vérifiez votre connexion.',
            initErrorTitle: 'Impossible de charger l’application',
            initErrorText: 'Le répertoire n’a pas pu terminer son chargement.',
            reloadPage: 'Recharger la page', technicalDetails: 'Détails techniques',
            githubRepositoryLabel: 'Dépôt GitHub', navPrimaryLabel: 'Navigation principale',
            brandHomeLabel: 'Accueil du guide de suppression de comptes', changeLanguageLabel: 'Changer de langue',
            directoryStatsLabel: 'Statistiques du répertoire', directoryPrinciplesLabel: 'Principes du répertoire',
            directoryAriaLabel: 'Répertoire de suppression de comptes', searchAriaLabel: 'Rechercher des services et ressources',
            categoryFiltersLabel: 'Filtres de catégories', difficultyAriaLabel: 'Difficulté de suppression',
            supportedPlatformsLabel: 'Services pris en charge', resourcesCountLabel: 'ressources',
            serviceGuidesTitle: 'Guides de suppression de compte par service',
            serviceGuidesLead: 'Parcourez des pages dédiées à chaque service avec liens officiels, difficulté de suppression et informations de vérification. Disponibles en :',
            popularSupportedList: 'OpenAI / ChatGPT, Claude, Google Gemini, Perplexity, Microsoft Copilot, Instagram, Facebook, X, TikTok, Discord, Telegram, WhatsApp, GitHub, GitLab, Google, Microsoft, Apple, Netflix, Spotify, Steam, PlayStation, Notion, Figma, Airbnb, Uber et d’autres.',
            scopeGoogleAccount: 'compte Google', scopeMicrosoftAccount: 'compte Microsoft',
            noResultsDesc: 'Essayez une autre recherche ou effacez les filtres.'
        },
        tr: {
            help: 'Yardım', close: 'Kapat', modalCloseLabel: 'İletişim penceresini kapat',
            connectionRestored: 'Bağlantı yeniden kuruldu', offlineNotice: 'Çevrimdışısınız',
            unexpectedError: 'Beklenmeyen bir hata oluştu. Sayfayı yenileyin.',
            networkError: 'Bir ağ hatası oluştu. İnternet bağlantınızı kontrol edin.',
            initErrorTitle: 'Uygulama yüklenemedi',
            initErrorText: 'Dizin yüklemesi tamamlanamadı.',
            reloadPage: 'Sayfayı yeniden yükle', technicalDetails: 'Teknik ayrıntılar',
            githubRepositoryLabel: 'GitHub deposu', navPrimaryLabel: 'Ana gezinme',
            brandHomeLabel: 'Hesap Silme Rehberi ana sayfası', changeLanguageLabel: 'Dili değiştir',
            directoryStatsLabel: 'Dizin istatistikleri', directoryPrinciplesLabel: 'Dizin ilkeleri',
            directoryAriaLabel: 'Hesap silme dizini', searchAriaLabel: 'Hizmetlerde ve kaynaklarda ara',
            categoryFiltersLabel: 'Kategori filtreleri', difficultyAriaLabel: 'Silme zorluğu',
            supportedPlatformsLabel: 'Desteklenen hizmetler', resourcesCountLabel: 'kaynak',
            serviceGuidesTitle: 'Hizmete göre hesap silme rehberleri',
            serviceGuidesLead: 'Resmî bağlantılar, silme zorluğu ve doğrulama bilgileri içeren hizmete özel sayfalara göz atın. Şu dillerde kullanılabilir:',
            popularSupportedList: 'OpenAI / ChatGPT, Claude, Google Gemini, Perplexity, Microsoft Copilot, Instagram, Facebook, X, TikTok, Discord, Telegram, WhatsApp, GitHub, GitLab, Google, Microsoft, Apple, Netflix, Spotify, Steam, PlayStation, Notion, Figma, Airbnb, Uber ve daha fazlası.',
            scopeGoogleAccount: 'Google hesabı', scopeMicrosoftAccount: 'Microsoft hesabı',
            noResultsDesc: 'Başka bir arama deneyin veya filtreleri temizleyin.'
        }
    };

    for (const [lang, patch] of Object.entries(patches)) {
        if (!translations[lang]) translations[lang] = { platforms: {} };
        Object.assign(translations[lang], patch);
    }

    // Curated translations for legacy titles that used to fall back to English in Turkish.
    const turkishByEnglish = new Map([
        ['How to deactivate X (Twitter) account', 'X (Twitter) hesabını devre dışı bırakma'],
        ['Download your tweet archive', 'Tweet arşivinizi indirin'],
        ['Account settings', 'Hesap ayarları'],
        ['Remove followers', 'Takipçileri kaldır'],
        ['Delete specific tweets', 'Belirli tweetleri sil'],
        ['Delete Instagram account permanently', 'Instagram hesabını kalıcı olarak sil'],
        ['Temporarily disable account', 'Hesabı geçici olarak devre dışı bırak'],
        ['Download your Instagram data', 'Instagram verilerinizi indirin'],
        ['Report hacked account', 'Ele geçirilmiş hesabı bildirin'],
        ['Manage privacy and security', 'Gizlilik ve güvenliği yönetin'],
        ['How to permanently delete Facebook account', 'Facebook hesabını kalıcı olarak sil'],
        ['Deactivate account temporarily', 'Hesabı geçici olarak devre dışı bırak'],
        ['Download your Facebook information', 'Facebook bilgilerinizi indirin'],
        ['Hacked account help', 'Ele geçirilmiş hesap yardımı'],
        ['Privacy settings', 'Gizlilik ayarları'],
        ['How to delete WhatsApp account', 'WhatsApp hesabını sil'],
        ['Export chats', 'Sohbetleri dışa aktar'],
        ['Recover compromised account', 'Ele geçirilmiş hesabı kurtar'],
        ['Privacy and security settings', 'Gizlilik ve güvenlik ayarları'],
        ['Delete TikTok account permanently', 'TikTok hesabını kalıcı olarak sil'],
        ['Request your TikTok data', 'TikTok verilerinizi talep edin'],
        ['Login issues', 'Giriş sorunları'],
        ['Account privacy settings', 'Hesap gizlilik ayarları'],
        ['Delete Snapchat account permanently', 'Snapchat hesabını kalıcı olarak sil'],
        ['Download my Snapchat data', 'Snapchat verilerimi indir'],
        ['Manage Snapchat account', 'Snapchat hesabını yönet'],
        ['If your account was hacked', 'Hesabınız ele geçirildiyse'],
        ['Delete Google account permanently', 'Google hesabını kalıcı olarak sil'],
        ['Download your data - Google Takeout', 'Verilerinizi indirin - Google Takeout'],
        ['Manage Google account', 'Google hesabını yönet'],
        ['Recover compromised Google account', 'Ele geçirilmiş Google hesabını kurtar'],
        ['Delete YouTube channel', 'YouTube kanalını sil'],
        ['Close Microsoft account permanently', 'Microsoft hesabını kalıcı olarak kapat'],
        ['Download your Microsoft data', 'Microsoft verilerinizi indirin'],
        ['Microsoft account recovery', 'Microsoft hesabını kurtarma'],
        ['Microsoft privacy settings', 'Microsoft gizlilik ayarları'],
        ['Check data breaches', 'Veri ihlallerini kontrol et'],
        ['Complete account deletion guide', 'Kapsamlı hesap silme rehberi'],
        ['Two-factor authentication directory', 'İki faktörlü kimlik doğrulama dizini'],
        ['Privacy and security tools', 'Gizlilik ve güvenlik araçları'],
        ['Direct account deletion guide', 'Doğrudan hesap silme rehberi'],
        ['Close LinkedIn Account', 'LinkedIn hesabını kapat'],
        ['Download your LinkedIn data', 'LinkedIn verilerinizi indirin'],
        ['Security & email settings', 'Güvenlik ve e-posta ayarları'],
        ['Close Pinterest account', 'Pinterest hesabını kapat'],
        ['Privacy & data settings', 'Gizlilik ve veri ayarları'],
        ['Delete Reddit account', 'Reddit hesabını sil'],
        ['Request Reddit data', 'Reddit verilerini talep et'],
        ['Delete Discord account', 'Discord hesabını sil'],
        ['Request a copy of your data', 'Verilerinizin bir kopyasını talep edin'],
        ['Security & authentication', 'Güvenlik ve kimlik doğrulama'],
        ['Deactivate / delete Telegram account', 'Telegram hesabını devre dışı bırak / sil'],
        ['Manage Telegram account', 'Telegram hesabını yönet'],
        ['Session security', 'Oturum güvenliği'],
        ['Delete GitHub account', 'GitHub hesabını sil'],
        ['Request your data', 'Verilerinizi talep edin'],
        ['Security settings', 'Güvenlik ayarları'],
        ['Request Amazon account deletion', 'Amazon hesabının silinmesini talep et'],
        ['Request your data download', 'Veri indirme talebinde bulun'],
        ['Login & security', 'Giriş ve güvenlik'],
        ['Cancel Netflix plan', 'Netflix planını iptal et'],
        ['Manage account', 'Hesabı yönet'],
        ['Close Spotify account', 'Spotify hesabını kapat'],
        ['Download your data', 'Verilerinizi indirin'],
        ['Password & security', 'Parola ve güvenlik'],
        ['Manage / delete Apple data', 'Apple verilerini yönet / sil'],
        ['Manage Apple ID', 'Apple ID’yi yönet'],
        ['Privacy & account deletion', 'Gizlilik ve hesap silme'],
        ['Security & access', 'Güvenlik ve erişim'],
        ['Delete Dropbox account', 'Dropbox hesabını sil'],
        ['Delete Twitch account', 'Twitch hesabını sil'],
        ['Disable account temporarily', 'Hesabı geçici olarak devre dışı bırak'],
        ['Request Steam account deletion', 'Steam hesabının silinmesini talep et'],
        ['Account data request', 'Hesap verilerini talep et'],
        ['Manage 2FA', 'İki faktörlü doğrulamayı yönet'],
        ['Account settings / deletion', 'Hesap ayarları / silme'],
        ['Security & password', 'Güvenlik ve parola'],
        ['Close PlayStation account', 'PlayStation hesabını kapat'],
        ['PlayStation data request', 'PlayStation verilerini talep et'],
        ['Deactivate Slack account', 'Slack hesabını devre dışı bırak'],
        ['Export workspace data', 'Çalışma alanı verilerini dışa aktar'],
        ['Delete Zoom account', 'Zoom hesabını sil'],
        ['Download Zoom data', 'Zoom verilerini indir'],
        ['Close PayPal account', 'PayPal hesabını kapat'],
        ['Close eBay account', 'eBay hesabını kapat'],
        ['eBay data request', 'eBay verilerini talep et'],
        ['Account security', 'Hesap güvenliği'],
        ['Delete / deactivate Quora account', 'Quora hesabını sil / devre dışı bırak'],
        ['Delete Medium account', 'Medium hesabını sil'],
        ['Export Medium data', 'Medium verilerini dışa aktar'],
        ['Delete StackOverflow account', 'Stack Overflow hesabını sil'],
        ['Delete Notion account', 'Notion hesabını sil'],
        ['Export Notion content', 'Notion içeriğini dışa aktar'],
        ['Delete Proton account', 'Proton hesabını sil'],
        ['Export emails', 'E-postaları dışa aktar'],
        ['Delete Yahoo account', 'Yahoo hesabını sil'],
        ['Yahoo data request', 'Yahoo verilerini talep et']
    ]);

    for (const platform of platforms) {
        for (const resource of platform.resources || []) {
            resource.title = resource.title || {};
            const english = resource.title.en;
            if ((!resource.title.tr || resource.title.tr === english) && turkishByEnglish.has(english)) {
                resource.title.tr = turkishByEnglish.get(english);
            }
        }
    }

    const notes = {
        openai: {
            en: 'ChatGPT account deletion is permanent. The Privacy Portal is also available for privacy requests.',
            ar: 'حذف حساب ChatGPT نهائي. تتوفر بوابة الخصوصية أيضًا لتقديم طلبات الخصوصية.',
            fr: 'La suppression du compte ChatGPT est définitive. Le portail de confidentialité est également disponible pour les demandes liées à la vie privée.',
            tr: 'ChatGPT hesabının silinmesi kalıcıdır. Gizlilik talepleri için Gizlilik Portalı da kullanılabilir.'
        },
        claude: {
            en: 'Paid subscriptions must be cancelled before account deletion becomes available.',
            ar: 'يجب إلغاء الاشتراكات المدفوعة قبل أن يصبح حذف الحساب متاحًا.',
            fr: 'Les abonnements payants doivent être annulés avant que la suppression du compte soit disponible.',
            tr: 'Hesabı silmeden önce ücretli aboneliklerin iptal edilmesi gerekir.'
        },
        gemini: {
            en: 'Gemini uses your Google Account. Deleting Gemini activity is different from deleting the entire Google Account.',
            ar: 'يستخدم Gemini حساب Google. حذف نشاط Gemini يختلف عن حذف حساب Google بالكامل.',
            fr: 'Gemini utilise votre compte Google. Supprimer l’activité Gemini est différent de supprimer l’intégralité du compte Google.',
            tr: 'Gemini, Google hesabınızı kullanır. Gemini etkinliğini silmek, Google hesabının tamamını silmekten farklıdır.'
        },
        perplexity: {
            en: 'Account deletion is initiated from account settings and can take up to 30 days to complete.',
            ar: 'يبدأ حذف الحساب من إعدادات الحساب وقد يستغرق اكتماله حتى 30 يومًا.',
            fr: 'La suppression du compte démarre depuis les paramètres et peut prendre jusqu’à 30 jours.',
            tr: 'Hesap silme işlemi hesap ayarlarından başlatılır ve tamamlanması 30 güne kadar sürebilir.'
        },
        copilot: {
            en: 'Copilot activity belongs to your Microsoft account. You can clear Copilot history without deleting the Microsoft account.',
            ar: 'يرتبط نشاط Copilot بحساب Microsoft. يمكنك مسح سجل Copilot دون حذف حساب Microsoft.',
            fr: 'L’activité Copilot est liée à votre compte Microsoft. Vous pouvez effacer l’historique Copilot sans supprimer le compte Microsoft.',
            tr: 'Copilot etkinliği Microsoft hesabınıza bağlıdır. Microsoft hesabını silmeden Copilot geçmişini temizleyebilirsiniz.'
        },
        mistral: {
            en: 'Paid accounts must settle or cancel applicable billing before permanent deletion.',
            ar: 'يجب تسوية الفوترة أو إلغاؤها في الحسابات المدفوعة قبل الحذف النهائي.',
            fr: 'Les comptes payants doivent régler ou annuler la facturation applicable avant la suppression définitive.',
            tr: 'Ücretli hesaplarda kalıcı silme öncesinde ilgili faturalandırmanın kapatılması veya iptal edilmesi gerekir.'
        },
        characterai: {
            en: 'Account deletion is permanent and available in account or data settings.',
            ar: 'حذف الحساب نهائي ومتاح من إعدادات الحساب أو البيانات.',
            fr: 'La suppression du compte est définitive et disponible dans les paramètres du compte ou des données.',
            tr: 'Hesap silme kalıcıdır ve hesap veya veri ayarlarından yapılabilir.'
        },
        elevenlabs: {
            en: 'Deletion is permanent. An account with an outstanding payment cannot be deleted until billing is resolved.',
            ar: 'الحذف نهائي. لا يمكن حذف حساب عليه دفعة مستحقة حتى تتم معالجة الفوترة.',
            fr: 'La suppression est définitive. Un compte avec un paiement en attente ne peut pas être supprimé avant résolution de la facturation.',
            tr: 'Silme işlemi kalıcıdır. Ödenmemiş borcu bulunan bir hesap, faturalandırma çözülmeden silinemez.'
        },
        poe: {
            en: 'Poe deletion has a 14-day reactivation window. A linked Quora account may also be affected.',
            ar: 'يوفر حذف Poe فترة 14 يومًا لإعادة التنشيط، وقد يتأثر أيضًا حساب Quora المرتبط.',
            fr: 'La suppression de Poe prévoit une fenêtre de réactivation de 14 jours. Un compte Quora lié peut également être affecté.',
            tr: 'Poe silme işleminde 14 günlük yeniden etkinleştirme süresi vardır. Bağlı bir Quora hesabı da etkilenebilir.'
        }
    };

    for (const platform of platforms) {
        if (notes[platform.id]) platform.note = notes[platform.id];
    }
})();
