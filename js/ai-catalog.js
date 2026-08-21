/**
 * AI service catalog.
 * These entries distinguish account deletion from AI-history/activity deletion.
 * Sources are first-party support/settings destinations and were reviewed 2026-08-21.
 */
(() => {
    const VERIFIED = '2026-08-21';
    const t = (ar, en, fr, tr) => ({ ar, en, fr, tr: tr || en });
    const r = (url, title, type, extra = {}) => ({
        url,
        title,
        type,
        official: true,
        verified: VERIFIED,
        ...extra
    });

    categories.ai = {
        ar: 'الذكاء الاصطناعي',
        en: 'AI Services',
        fr: 'Services IA',
        tr: 'Yapay Zekâ'
    };

    resourceTypes.activity = {
        ar: 'حذف النشاط والسجل',
        en: 'Delete AI Activity',
        fr: "Supprimer l’activité IA",
        tr: 'Yapay Zekâ Etkinliğini Sil',
        icon: 'fas fa-clock-rotate-left',
        color: '#0ea5e9'
    };

    resourceTypes.privacy = {
        ar: 'الخصوصية والبيانات',
        en: 'Privacy & Data',
        fr: 'Confidentialité et données',
        tr: 'Gizlilik ve Veriler',
        icon: 'fas fa-user-shield',
        color: '#14b8a6'
    };

    const aiPlatforms = [
        {
            id: 'openai', name: 'openai', displayName: 'OpenAI / ChatGPT', icon: 'fas fa-wand-magic-sparkles', color: '#10a37f', category: 'ai',
            difficulty: 'easy', loginRequired: true, featured: true,
            note: 'ChatGPT account deletion is permanent. The Privacy Portal is also available for privacy requests.',
            resources: [
                r('https://help.openai.com/en/articles/6378407-how-to-delete-your-account', t('حذف حساب ChatGPT / OpenAI', 'Delete your ChatGPT / OpenAI account', 'Supprimer votre compte ChatGPT / OpenAI', 'ChatGPT / OpenAI hesabını sil'), 'delete'),
                r('https://privacy.openai.com/', t('بوابة خصوصية OpenAI', 'OpenAI Privacy Portal', 'Portail de confidentialité OpenAI', 'OpenAI Gizlilik Portalı'), 'privacy'),
                r('https://chatgpt.com/#settings/DataControls', t('عناصر التحكم بالبيانات', 'ChatGPT data controls', 'Contrôles des données ChatGPT', 'ChatGPT veri kontrolleri'), 'settings')
            ]
        },
        {
            id: 'claude', name: 'claude', displayName: 'Claude', icon: 'fas fa-sparkles', color: '#d97757', category: 'ai',
            difficulty: 'easy', loginRequired: true, featured: true,
            note: 'Paid subscriptions must be cancelled before account deletion becomes available.',
            resources: [
                r('https://support.anthropic.com/en/articles/9028421-how-can-i-delete-my-claude-ai-account/', t('حذف حساب Claude', 'Delete your Claude account', 'Supprimer votre compte Claude', 'Claude hesabını sil'), 'delete'),
                r('https://claude.ai/settings/profile', t('إعدادات حساب Claude', 'Claude account settings', 'Paramètres du compte Claude', 'Claude hesap ayarları'), 'settings')
            ]
        },
        {
            id: 'gemini', name: 'gemini', displayName: 'Google Gemini', icon: 'fas fa-gem', color: '#4285f4', category: 'ai',
            difficulty: 'easy', loginRequired: true, featured: true,
            note: 'Gemini uses your Google Account. Deleting Gemini activity is different from deleting the entire Google Account.',
            resources: [
                r('https://support.google.com/gemini/answer/13278892', t('إدارة وحذف نشاط Gemini', 'Manage and delete Gemini Apps activity', "Gérer et supprimer l’activité Gemini", 'Gemini etkinliğini yönet ve sil'), 'activity'),
                r('https://myactivity.google.com/product/gemini', t('نشاط Gemini مباشرة', 'Open Gemini activity', "Ouvrir l’activité Gemini", 'Gemini etkinliğini aç'), 'activity'),
                r('https://takeout.google.com/', t('تصدير بيانات Google', 'Export Google data', 'Exporter les données Google', 'Google verilerini dışa aktar'), 'backup'),
                r('https://support.google.com/accounts/answer/32046', t('حذف حساب Google بالكامل', 'Delete the entire Google Account', 'Supprimer le compte Google entier', 'Tüm Google hesabını sil'), 'delete', { destructiveScope: 'google-account' })
            ]
        },
        {
            id: 'perplexity', name: 'perplexity', displayName: 'Perplexity', icon: 'fas fa-magnifying-glass-chart', color: '#20808d', category: 'ai',
            difficulty: 'easy', loginRequired: true, featured: true,
            note: 'Account deletion is initiated from account settings and can take up to 30 days to complete.',
            resources: [
                r('https://www.perplexity.ai/help-center/en/articles/10354879-account-deletion', t('تعليمات حذف حساب Perplexity', 'Perplexity account deletion guide', 'Guide de suppression Perplexity', 'Perplexity hesap silme rehberi'), 'delete'),
                r('https://www.perplexity.ai/account/details', t('إعدادات وحذف الحساب', 'Account settings and deletion', 'Paramètres et suppression du compte', 'Hesap ayarları ve silme'), 'settings'),
                r('https://www.perplexity.ai/help-center/en/articles/11564562-self-serve-data-deletion', t('حذف السجل والبيانات', 'Delete history and data', 'Supprimer historique et données', 'Geçmişi ve verileri sil'), 'activity')
            ]
        },
        {
            id: 'copilot', name: 'copilot', displayName: 'Microsoft Copilot', icon: 'fab fa-microsoft', color: '#7c3aed', category: 'ai',
            difficulty: 'easy', loginRequired: true,
            note: 'Copilot activity belongs to your Microsoft account. You can clear Copilot history without deleting the Microsoft account.',
            resources: [
                r('https://support.microsoft.com/en-us/privacy/manage-your-copilot-activity-history-in-the-privacy-dashboard', t('إدارة وحذف سجل Copilot', 'Manage and delete Copilot activity history', "Gérer et supprimer l’historique Copilot", 'Copilot etkinlik geçmişini yönet ve sil'), 'activity'),
                r('https://account.microsoft.com/privacy', t('لوحة خصوصية Microsoft', 'Microsoft privacy dashboard', 'Tableau de confidentialité Microsoft', 'Microsoft gizlilik panosu'), 'privacy'),
                r('https://support.microsoft.com/en-us/account-billing/how-to-close-your-microsoft-account-c1b2d13f-4de6-6e1b-4a31-d9d668849979', t('إغلاق حساب Microsoft بالكامل', 'Close the entire Microsoft account', 'Fermer le compte Microsoft entier', 'Tüm Microsoft hesabını kapat'), 'delete', { destructiveScope: 'microsoft-account' })
            ]
        },
        {
            id: 'mistral', name: 'mistral', displayName: 'Mistral AI', icon: 'fas fa-wind', color: '#ff7000', category: 'ai',
            difficulty: 'medium', loginRequired: true,
            note: 'Paid accounts must settle/cancel applicable billing before permanent deletion.',
            resources: [
                r('https://help.mistral.ai/en/articles/347619-how-can-i-delete-my-account', t('حذف حساب Mistral', 'Delete your Mistral account', 'Supprimer votre compte Mistral', 'Mistral hesabını sil'), 'delete'),
                r('https://help.mistral.ai/en/collections/789667-data-governance', t('إدارة البيانات والخصوصية', 'Mistral data governance and privacy', 'Gouvernance des données Mistral', 'Mistral veri yönetimi ve gizlilik'), 'privacy')
            ]
        },
        {
            id: 'characterai', name: 'characterai', displayName: 'Character.AI', icon: 'fas fa-comments', color: '#111827', category: 'ai',
            difficulty: 'easy', loginRequired: true,
            note: 'Account deletion is permanent and available in account/data settings.',
            resources: [
                r('https://support.character.ai/hc/en-us/articles/15063461160475-How-do-I-delete-my-account', t('حذف حساب Character.AI', 'Delete your Character.AI account', 'Supprimer votre compte Character.AI', 'Character.AI hesabını sil'), 'delete')
            ]
        },
        {
            id: 'elevenlabs', name: 'elevenlabs', displayName: 'ElevenLabs', icon: 'fas fa-wave-square', color: '#111111', category: 'ai',
            difficulty: 'easy', loginRequired: true,
            note: 'Deletion is permanent. An account with an outstanding payment cannot be deleted until billing is resolved.',
            resources: [
                r('https://help.elevenlabs.io/hc/en-us/articles/13313906314641-How-can-I-delete-my-account', t('حذف حساب ElevenLabs', 'Delete your ElevenLabs account', 'Supprimer votre compte ElevenLabs', 'ElevenLabs hesabını sil'), 'delete'),
                r('https://elevenlabs.io/app/settings', t('إعدادات ElevenLabs', 'ElevenLabs settings', 'Paramètres ElevenLabs', 'ElevenLabs ayarları'), 'settings')
            ]
        },
        {
            id: 'poe', name: 'poe', displayName: 'Poe', icon: 'fas fa-robot', color: '#5d5fef', category: 'ai',
            difficulty: 'medium', loginRequired: true,
            note: 'Poe deletion has a 14-day reactivation window. A linked Quora account may also be affected.',
            resources: [
                r('https://help.poe.com/hc/en-us/articles/19944206309524-Poe-FAQs', t('حذف حساب Poe', 'Delete your Poe account', 'Supprimer votre compte Poe', 'Poe hesabını sil'), 'delete'),
                r('https://poe.com/settings', t('إعدادات Poe وحذف السجل', 'Poe settings and chat deletion', 'Paramètres Poe et suppression des chats', 'Poe ayarları ve sohbet silme'), 'activity')
            ]
        }
    ];

    aiPlatforms.forEach(entry => {
        const index = platforms.findIndex(platform => platform.id === entry.id);
        if (index >= 0) platforms[index] = entry;
        else platforms.push(entry);
    });

    // Ensure translated labels exist even when the base translation file predates these services.
    const names = {
        openai: 'OpenAI / ChatGPT', claude: 'Claude', gemini: 'Google Gemini', perplexity: 'Perplexity',
        copilot: 'Microsoft Copilot', mistral: 'Mistral AI', characterai: 'Character.AI', elevenlabs: 'ElevenLabs', poe: 'Poe'
    };
    Object.values(translations).forEach(lang => {
        lang.platforms = lang.platforms || {};
        Object.assign(lang.platforms, names);
    });
})();
