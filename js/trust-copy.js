/**
 * Trust-focused copy overrides.
 * Keep claims conservative: a resource is called first-party/verified only when
 * its catalog metadata explicitly supports that claim.
 */
(() => {
    const copy = {
        en: {
            description: 'Find maintained account deletion, AI activity, data export, security and privacy resources. First-party links are labeled only when provider provenance is confirmed.',
            heroKicker: 'Open-source · provenance-aware links',
            resourcesLabel: 'resources',
            reportBrokenLink: 'Suggest or report a link',
            principleMaintainedDesc: 'Freshness dates require review evidence; automated checks classify dead, sign-in and bot-blocked URLs separately.',
            editorialLinksText: 'The directory prefers provider-owned deletion pages, privacy dashboards, export tools, security pages and support articles. A resource is labeled official only when first-party provenance is explicitly recorded.',
            editorialMaintainText: 'Automated checks produce a stale-resource report and separate confirmed dead URLs from sign-in, rate-limit and bot-blocked behavior. Manual review dates are kept separate from automated reachability.',
            resultOfficialLinks: 'verified first-party links',
            official: 'First-party',
            checked: 'Reviewed',
            openOfficialPage: 'Open provider resource'
        },
        ar: {
            description: 'اعثر على موارد تتم صيانتها لحذف الحسابات والنشاط والبيانات والخصوصية. لا نضع وسم المصدر الرسمي إلا عندما تكون ملكية الرابط لمقدم الخدمة موثقة.',
            heroKicker: 'مفتوح المصدر · روابط ببيانات مصدر واضحة',
            resourcesLabel: 'مورد',
            reportBrokenLink: 'اقترح رابطاً أو بلّغ عن مشكلة',
            principleMaintainedDesc: 'تاريخ المراجعة يحتاج دليلاً، والفحص الآلي يميز بين الرابط الميت وتسجيل الدخول وحظر الروبوتات.',
            editorialLinksText: 'نعطي الأولوية لصفحات الحذف والخصوصية والتصدير والأمان التابعة لمقدم الخدمة. لا يظهر وسم «رسمي» إلا عندما تكون ملكية المصدر موثقة صراحة في بيانات الدليل.',
            editorialMaintainText: 'ينتج الفحص الآلي تقريراً للموارد القديمة ويفصل الرابط الميت المؤكد عن متطلبات تسجيل الدخول وتحديد المعدل وحظر أدوات الفحص. تاريخ المراجعة اليدوية مستقل عن نتيجة الوصول الآلي.',
            resultOfficialLinks: 'رابط موثق من مقدم الخدمة',
            official: 'من مقدم الخدمة',
            checked: 'تمت المراجعة',
            openOfficialPage: 'فتح مورد مقدم الخدمة'
        },
        fr: {
            description: 'Trouvez des ressources maintenues pour la suppression de comptes, les données et la confidentialité. Un lien n’est marqué comme officiel que si sa provenance fournisseur est confirmée.',
            heroKicker: 'Open source · provenance vérifiable',
            resourcesLabel: 'ressources',
            reportBrokenLink: 'Proposer ou signaler un lien',
            principleMaintainedDesc: 'Les dates exigent une preuve de revue ; les contrôles distinguent liens morts, connexion requise et blocage des robots.',
            editorialLinksText: 'Le répertoire privilégie les pages de suppression, confidentialité, export, sécurité et assistance appartenant au fournisseur. Le libellé officiel n’apparaît que lorsque cette provenance est explicitement enregistrée.',
            editorialMaintainText: 'Les contrôles automatisés produisent un rapport de fraîcheur et distinguent les liens réellement morts des pages nécessitant une connexion, limitées ou bloquant les robots. Les dates de revue manuelle restent séparées de la disponibilité automatisée.',
            resultOfficialLinks: 'liens fournisseur vérifiés',
            official: 'Fournisseur',
            checked: 'Revu',
            openOfficialPage: 'Ouvrir la ressource fournisseur'
        },
        tr: {
            description: 'Hesap silme, yapay zekâ etkinliği, veri dışa aktarma, güvenlik ve gizlilik için bakımı yapılan kaynakları bulun. Bir bağlantı yalnızca sağlayıcı kökeni doğrulandığında resmî olarak etiketlenir.',
            heroKicker: 'Açık kaynak · kaynak kökeni izlenebilir',
            resourcesLabel: 'kaynak',
            reportBrokenLink: 'Bağlantı öner veya sorun bildir',
            principleMaintainedDesc: 'İnceleme tarihleri kanıt gerektirir; otomatik kontroller ölü, oturum gerektiren ve bot engelli bağlantıları ayırır.',
            editorialLinksText: 'Dizin, sağlayıcıya ait silme, gizlilik, dışa aktarma, güvenlik ve destek sayfalarını tercih eder. Bir kaynak yalnızca birinci taraf kökeni açıkça kaydedilmişse resmî olarak etiketlenir.',
            editorialMaintainText: 'Otomatik kontroller güncellik raporu üretir ve doğrulanmış ölü bağlantıları oturum açma, hız sınırı ve bot engelleme durumlarından ayırır. Manuel inceleme tarihi otomatik erişilebilirlik sonucundan ayrıdır.',
            resultOfficialLinks: 'doğrulanmış sağlayıcı bağlantısı',
            official: 'Sağlayıcı',
            checked: 'İncelendi',
            openOfficialPage: 'Sağlayıcı kaynağını aç'
        }
    };

    Object.entries(copy).forEach(([lang, values]) => {
        if (translations?.[lang]) Object.assign(translations[lang], values);
    });
})();
