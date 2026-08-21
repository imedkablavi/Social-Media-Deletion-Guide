/**
 * Curated translation updates for the maintained catalog and current UI.
 * Loaded after translations.js so the legacy dictionary remains compatible.
 */
(() => {
    const updates = {
        en: {
            title: 'Account Deletion & Privacy Guide',
            description: 'Find official account deletion, AI activity, data export, security and privacy pages for popular online services.',
            author: 'imed_kablavi',
            skipDirectory: 'Skip to directory', brandLabel: 'Account Deletion Guide', navDirectory: 'Directory', navAI: 'AI services',
            heroKicker: 'Open-source · maintained links', browseDirectory: 'Browse directory', reportBrokenLink: 'Report a broken link',
            servicesLabel: 'services', resourcesLabel: 'official resources', selectedLabel: 'selected',
            principleOfficialTitle: 'First-party links', principleOfficialDesc: 'Provider-owned help centers and settings are preferred.',
            principleMaintainedTitle: 'Maintained catalog', principleMaintainedDesc: 'Automated link checks plus manual verification metadata.',
            principleScopeTitle: 'Clear scope', principleScopeDesc: 'Account deletion is separated from AI history and subscription cancellation.',
            findService: 'Find a service', findServiceDesc: 'Search by product name, platform category, or action.',
            filterAll: 'All', filterAI: 'AI', filterSocial: 'Social', filterMessaging: 'Messaging', filterServices: 'Services', filterSecurity: 'Security',
            difficultyAny: 'Any difficulty', difficultyEasy: 'Easy deletion', difficultyMedium: 'Medium deletion', difficultyHard: 'Hard deletion',
            difficultyEasyLabel: 'easy', difficultyMediumLabel: 'medium', difficultyHardLabel: 'hard',
            aboutGuide: 'Delete accounts without hunting through settings',
            editorialLinksTitle: 'What the directory links to',
            editorialLinksText: 'Each card points to a provider-owned deletion page, privacy dashboard, data export tool, security page, or official support article. If deletion only appears after sign-in, the directory labels that requirement.',
            editorialAITitle: 'AI accounts and AI activity are different',
            editorialAIText: 'For ChatGPT, Claude, Gemini, Perplexity and Copilot, the guide separates permanent account deletion from chat history, AI activity, privacy requests and parent-account controls.',
            editorialBeforeTitle: 'Before deleting an account',
            editorialBeforeText: 'Export anything you want to keep, check active subscriptions, review connected apps, and confirm whether deletion has a waiting period or grace period.',
            editorialMaintainTitle: 'How links stay useful',
            editorialMaintainText: 'Automated external-link checks and GitHub reports help identify provider pages that moved. Verification dates make manual review easier.',
            popularSupportedLabel: 'Popular supported services:', footerCredential: 'This directory never asks for account credentials.',
            footerSource: 'Source', footerContribute: 'Contribute', footerSecurity: 'Security',
            officialSource: 'Official source', lastVerified: 'Last verified', reportBroken: 'Found a broken link? Report it on GitHub.',
            resultServices: 'services', resultOfficialLinks: 'official links', official: 'Official', checked: 'Checked', signIn: 'Sign-in',
            selectedDynamic: 'selected', actionsDynamic: 'actions', clearSelection: 'Clear selection', openOfficialPage: 'Open official page', entireAccount: 'Entire account',
            platforms: {
                threads: 'Threads', bluesky: 'Bluesky', mastodon: 'Mastodon', tumblr: 'Tumblr', signal: 'Signal', viber: 'Viber', line: 'LINE',
                roblox: 'Roblox', nintendo: 'Nintendo', ea: 'EA', ubisoft: 'Ubisoft', riotgames: 'Riot Games', battlenet: 'Battle.net',
                gitlab: 'GitLab', atlassian: 'Atlassian', figma: 'Figma', openai: 'OpenAI / ChatGPT', airbnb: 'Airbnb', uber: 'Uber'
            }
        },
        ar: {
            title: 'دليل حذف الحسابات وحماية الخصوصية',
            description: 'دليل للوصول إلى صفحات حذف الحسابات ونشاط الذكاء الاصطناعي وتنزيل البيانات والأمان والخصوصية من المصادر الرسمية.',
            author: 'imed_kablavi',
            skipDirectory: 'الانتقال إلى الدليل', brandLabel: 'دليل حذف الحسابات', navDirectory: 'الدليل', navAI: 'خدمات الذكاء الاصطناعي',
            heroKicker: 'مفتوح المصدر · روابط تتم صيانتها', browseDirectory: 'تصفح الدليل', reportBrokenLink: 'الإبلاغ عن رابط لا يعمل',
            servicesLabel: 'خدمة', resourcesLabel: 'مصدر رسمي', selectedLabel: 'محدد',
            principleOfficialTitle: 'روابط رسمية', principleOfficialDesc: 'نعطي الأولوية لمراكز المساعدة والإعدادات التابعة لمقدم الخدمة.',
            principleMaintainedTitle: 'دليل تتم صيانته', principleMaintainedDesc: 'فحص آلي للروابط مع بيانات تحقق ومراجعة يدوية.',
            principleScopeTitle: 'نطاق واضح', principleScopeDesc: 'نميز بين حذف الحساب وحذف نشاط الذكاء الاصطناعي وإلغاء الاشتراك.',
            findService: 'ابحث عن خدمة', findServiceDesc: 'ابحث باسم المنتج أو التصنيف أو الإجراء المطلوب.',
            filterAll: 'الكل', filterAI: 'ذكاء اصطناعي', filterSocial: 'تواصل', filterMessaging: 'مراسلة', filterServices: 'خدمات', filterSecurity: 'أمان',
            difficultyAny: 'أي مستوى صعوبة', difficultyEasy: 'حذف سهل', difficultyMedium: 'حذف متوسط', difficultyHard: 'حذف صعب',
            difficultyEasyLabel: 'سهل', difficultyMediumLabel: 'متوسط', difficultyHardLabel: 'صعب',
            aboutGuide: 'احذف الحسابات بدون البحث الطويل داخل الإعدادات',
            editorialLinksTitle: 'إلى ماذا يوصلك الدليل؟',
            editorialLinksText: 'كل بطاقة تقود إلى صفحة حذف أو لوحة خصوصية أو أداة تصدير بيانات أو صفحة أمان أو مقال دعم رسمي تابع لمقدم الخدمة. إذا كان خيار الحذف يظهر بعد تسجيل الدخول فقط فنوضح ذلك.',
            editorialAITitle: 'حذف حساب الذكاء الاصطناعي يختلف عن حذف نشاطه',
            editorialAIText: 'في ChatGPT وClaude وGemini وPerplexity وCopilot نميز بين حذف الحساب نهائيًا وحذف المحادثات أو النشاط وطلبات الخصوصية والحساب الرئيسي.',
            editorialBeforeTitle: 'قبل حذف الحساب',
            editorialBeforeText: 'صدّر ما تريد الاحتفاظ به، تحقق من الاشتراكات النشطة والتطبيقات المرتبطة، وتأكد إن كانت هناك مهلة انتظار أو فترة يمكن خلالها استعادة الحساب.',
            editorialMaintainTitle: 'كيف نحافظ على فائدة الروابط؟',
            editorialMaintainText: 'نفحص الروابط الخارجية آليًا ونستقبل البلاغات عبر GitHub، كما تساعد تواريخ التحقق على معرفة الروابط التي تحتاج مراجعة جديدة.',
            popularSupportedLabel: 'من الخدمات المدعومة:', footerCredential: 'هذا الدليل لا يطلب كلمات المرور أو بيانات تسجيل الدخول.',
            footerSource: 'المصدر', footerContribute: 'المساهمة', footerSecurity: 'الأمان',
            officialSource: 'مصدر رسمي', lastVerified: 'آخر تحقق', reportBroken: 'وجدت رابطًا لا يعمل؟ بلّغ عنه على GitHub.',
            resultServices: 'خدمة', resultOfficialLinks: 'رابط رسمي', official: 'رسمي', checked: 'تم التحقق', signIn: 'يتطلب تسجيل الدخول',
            selectedDynamic: 'محدد', actionsDynamic: 'إجراء', clearSelection: 'مسح التحديد', openOfficialPage: 'فتح الصفحة الرسمية', entireAccount: 'الحساب بالكامل',
            platforms: {
                threads: 'ثريدز', bluesky: 'بلوسكاي', mastodon: 'ماستودون', tumblr: 'تمبلر', signal: 'سيغنال', viber: 'فايبر', line: 'لاين',
                roblox: 'روبلوكس', nintendo: 'نينتندو', ea: 'EA', ubisoft: 'يوبي سوفت', riotgames: 'Riot Games', battlenet: 'Battle.net',
                gitlab: 'GitLab', atlassian: 'Atlassian', figma: 'Figma', openai: 'OpenAI / ChatGPT', airbnb: 'Airbnb', uber: 'Uber'
            }
        },
        fr: {
            title: 'Guide de suppression de comptes et de confidentialité',
            description: 'Trouvez les pages officielles pour supprimer des comptes et activités IA, exporter des données et gérer sécurité et confidentialité.',
            author: 'imed_kablavi',
            skipDirectory: 'Aller au répertoire', brandLabel: 'Guide de suppression de comptes', navDirectory: 'Répertoire', navAI: 'Services IA',
            heroKicker: 'Open source · liens maintenus', browseDirectory: 'Parcourir le répertoire', reportBrokenLink: 'Signaler un lien cassé',
            servicesLabel: 'services', resourcesLabel: 'ressources officielles', selectedLabel: 'sélectionnés',
            principleOfficialTitle: 'Liens officiels', principleOfficialDesc: 'Nous privilégions les centres d’aide et paramètres appartenant aux fournisseurs.',
            principleMaintainedTitle: 'Catalogue maintenu', principleMaintainedDesc: 'Vérification automatique des liens et métadonnées de contrôle manuel.',
            principleScopeTitle: 'Portée claire', principleScopeDesc: 'La suppression du compte est distinguée de l’historique IA et de l’annulation d’abonnement.',
            findService: 'Trouver un service', findServiceDesc: 'Recherchez par produit, catégorie ou action.',
            filterAll: 'Tous', filterAI: 'IA', filterSocial: 'Social', filterMessaging: 'Messagerie', filterServices: 'Services', filterSecurity: 'Sécurité',
            difficultyAny: 'Toute difficulté', difficultyEasy: 'Suppression facile', difficultyMedium: 'Suppression moyenne', difficultyHard: 'Suppression difficile',
            difficultyEasyLabel: 'facile', difficultyMediumLabel: 'moyen', difficultyHardLabel: 'difficile',
            aboutGuide: 'Supprimez vos comptes sans fouiller dans les paramètres',
            editorialLinksTitle: 'Ce que le répertoire référence',
            editorialLinksText: 'Chaque carte mène vers une page de suppression, un tableau de confidentialité, un outil d’export, une page de sécurité ou un article officiel du fournisseur. Les actions nécessitant une connexion sont indiquées.',
            editorialAITitle: 'Compte IA et activité IA sont différents',
            editorialAIText: 'Pour ChatGPT, Claude, Gemini, Perplexity et Copilot, le guide distingue la suppression définitive du compte de l’historique, de l’activité IA et des contrôles du compte principal.',
            editorialBeforeTitle: 'Avant de supprimer un compte',
            editorialBeforeText: 'Exportez ce que vous souhaitez conserver, vérifiez les abonnements et applications connectées, puis confirmez les éventuels délais ou périodes de réactivation.',
            editorialMaintainTitle: 'Comment les liens restent utiles',
            editorialMaintainText: 'Des contrôles automatiques et les signalements GitHub détectent les pages déplacées. Les dates de vérification facilitent les revues manuelles.',
            popularSupportedLabel: 'Services populaires pris en charge :', footerCredential: 'Ce répertoire ne demande jamais vos identifiants de compte.',
            footerSource: 'Source', footerContribute: 'Contribuer', footerSecurity: 'Sécurité',
            officialSource: 'Source officielle', lastVerified: 'Dernière vérification', reportBroken: 'Un lien ne fonctionne plus ? Signalez-le sur GitHub.',
            resultServices: 'services', resultOfficialLinks: 'liens officiels', official: 'Officiel', checked: 'Vérifié', signIn: 'Connexion requise',
            selectedDynamic: 'sélectionnés', actionsDynamic: 'actions', clearSelection: 'Effacer la sélection', openOfficialPage: 'Ouvrir la page officielle', entireAccount: 'Compte entier',
            platforms: {
                threads: 'Threads', bluesky: 'Bluesky', mastodon: 'Mastodon', tumblr: 'Tumblr', signal: 'Signal', viber: 'Viber', line: 'LINE',
                roblox: 'Roblox', nintendo: 'Nintendo', ea: 'EA', ubisoft: 'Ubisoft', riotgames: 'Riot Games', battlenet: 'Battle.net',
                gitlab: 'GitLab', atlassian: 'Atlassian', figma: 'Figma', openai: 'OpenAI / ChatGPT', airbnb: 'Airbnb', uber: 'Uber'
            }
        },
        tr: {
            title: 'Hesap Silme ve Gizlilik Rehberi',
            description: 'Popüler hizmetlerde hesap ve yapay zekâ etkinliği silme, veri dışa aktarma, güvenlik ve gizlilik için resmî sayfaları bulun.',
            author: 'imed_kablavi',
            skipDirectory: 'Dizine geç', brandLabel: 'Hesap Silme Rehberi', navDirectory: 'Dizin', navAI: 'Yapay zekâ',
            heroKicker: 'Açık kaynak · bakımı yapılan bağlantılar', browseDirectory: 'Dizine göz at', reportBrokenLink: 'Bozuk bağlantı bildir',
            servicesLabel: 'hizmet', resourcesLabel: 'resmî kaynak', selectedLabel: 'seçili',
            principleOfficialTitle: 'Birinci taraf bağlantılar', principleOfficialDesc: 'Sağlayıcının kendi yardım merkezi ve ayar sayfaları tercih edilir.',
            principleMaintainedTitle: 'Bakımlı katalog', principleMaintainedDesc: 'Otomatik bağlantı kontrolleri ve manuel doğrulama bilgileri.',
            principleScopeTitle: 'Açık kapsam', principleScopeDesc: 'Hesap silme, yapay zekâ geçmişinden ve abonelik iptalinden ayrı gösterilir.',
            findService: 'Bir hizmet bul', findServiceDesc: 'Ürün adı, kategori veya işleme göre arayın.',
            filterAll: 'Tümü', filterAI: 'Yapay zekâ', filterSocial: 'Sosyal', filterMessaging: 'Mesajlaşma', filterServices: 'Hizmetler', filterSecurity: 'Güvenlik',
            difficultyAny: 'Tüm zorluklar', difficultyEasy: 'Kolay silme', difficultyMedium: 'Orta silme', difficultyHard: 'Zor silme',
            difficultyEasyLabel: 'kolay', difficultyMediumLabel: 'orta', difficultyHardLabel: 'zor',
            aboutGuide: 'Ayarlarda kaybolmadan hesaplarınızı silin',
            editorialLinksTitle: 'Dizin nereye bağlantı verir?',
            editorialLinksText: 'Her kart sağlayıcının hesap silme, gizlilik, veri dışa aktarma, güvenlik veya resmî destek sayfasına gider. Yalnızca giriş yaptıktan sonra görünen işlemler ayrıca belirtilir.',
            editorialAITitle: 'Yapay zekâ hesabı ile etkinliği aynı şey değildir',
            editorialAIText: 'ChatGPT, Claude, Gemini, Perplexity ve Copilot için kalıcı hesap silme; sohbet geçmişi, yapay zekâ etkinliği, gizlilik talepleri ve ana hesap kontrollerinden ayrılır.',
            editorialBeforeTitle: 'Bir hesabı silmeden önce',
            editorialBeforeText: 'Saklamak istediklerinizi dışa aktarın, aktif abonelikleri ve bağlı uygulamaları kontrol edin, ardından bekleme veya yeniden etkinleştirme süresi olup olmadığını doğrulayın.',
            editorialMaintainTitle: 'Bağlantılar nasıl güncel tutuluyor?',
            editorialMaintainText: 'Otomatik dış bağlantı kontrolleri ve GitHub bildirimleri taşınan sayfaları tespit eder. Doğrulama tarihleri manuel incelemeyi kolaylaştırır.',
            popularSupportedLabel: 'Desteklenen popüler hizmetler:', footerCredential: 'Bu dizin hiçbir zaman hesap giriş bilgilerinizi istemez.',
            footerSource: 'Kaynak', footerContribute: 'Katkıda bulun', footerSecurity: 'Güvenlik',
            officialSource: 'Resmî kaynak', lastVerified: 'Son kontrol', reportBroken: 'Çalışmayan bir bağlantı mı buldunuz? GitHub üzerinden bildirin.',
            resultServices: 'hizmet', resultOfficialLinks: 'resmî bağlantı', official: 'Resmî', checked: 'Kontrol edildi', signIn: 'Giriş gerekli',
            selectedDynamic: 'seçili', actionsDynamic: 'işlem', clearSelection: 'Seçimi temizle', openOfficialPage: 'Resmî sayfayı aç', entireAccount: 'Tüm hesap',
            platforms: {
                threads: 'Threads', bluesky: 'Bluesky', mastodon: 'Mastodon', tumblr: 'Tumblr', signal: 'Signal', viber: 'Viber', line: 'LINE',
                roblox: 'Roblox', nintendo: 'Nintendo', ea: 'EA', ubisoft: 'Ubisoft', riotgames: 'Riot Games', battlenet: 'Battle.net',
                gitlab: 'GitLab', atlassian: 'Atlassian', figma: 'Figma', openai: 'OpenAI / ChatGPT', airbnb: 'Airbnb', uber: 'Uber'
            }
        }
    };

    Object.entries(updates).forEach(([lang, patch]) => {
        if (!translations[lang]) return;
        const platformNames = patch.platforms || {};
        const { platforms: _platforms, ...textUpdates } = patch;
        Object.assign(translations[lang], textUpdates);
        translations[lang].platforms = translations[lang].platforms || {};
        Object.assign(translations[lang].platforms, platformNames);
    });
})();
