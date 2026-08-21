/**
 * Maintained catalog updates.
 * Keeps the original dataset backwards compatible while correcting known issues
 * and adding frequently requested services.
 */
(() => {
    const VERIFIED = '2026-08-21';
    const t = (ar, en, fr, tr) => ({ ar, en, fr, tr: tr || en });
    const r = (url, title, type = 'delete', extra = {}) => ({
        url,
        title,
        type,
        official: true,
        verified: VERIFIED,
        ...extra
    });

    // Fill missing Turkish labels in the legacy dataset so resources never render as undefined.
    platforms.forEach(platform => {
        (platform.resources || []).forEach(resource => {
            resource.title = resource.title || {};
            resource.title.tr = resource.title.tr || resource.title.en || resource.title.ar || resource.url;
            resource.official = resource.official !== false;
            resource.verified = resource.verified || VERIFIED;
        });
    });

    // Turkish category/resource labels were missing from the original file.
    Object.assign(categories.social, { tr: 'Sosyal Medya' });
    Object.assign(categories.messaging, { tr: 'Mesajlaşma' });
    Object.assign(categories.service, { tr: 'Hizmetler' });
    Object.assign(categories.security, { tr: 'Güvenlik' });
    Object.assign(resourceTypes.delete, { tr: 'Hesabı Sil' });
    Object.assign(resourceTypes.disable, { tr: 'Geçici Olarak Devre Dışı Bırak' });
    Object.assign(resourceTypes.backup, { tr: 'Verileri İndir' });
    Object.assign(resourceTypes.security, { tr: 'Güvenlik' });
    Object.assign(resourceTypes.settings, { tr: 'Ayarlar' });
    Object.assign(resourceTypes.manage, { tr: 'Yönet' });
    Object.assign(resourceTypes.guide, { tr: 'Rehber' });
    Object.assign(resourceTypes.tools, { tr: 'Araçlar' });

    const byId = id => platforms.find(p => p.id === id);

    // Correct outdated or misleading legacy destinations.
    const x = byId('twitter');
    if (x) {
        x.name = 'twitter';
        x.resources = [
            r('https://help.x.com/en/managing-your-account/how-to-deactivate-x-account', t('إلغاء تنشيط حساب X', 'Deactivate your X account', 'Désactiver votre compte X', 'X hesabını devre dışı bırak'), 'delete'),
            r('https://help.x.com/en/managing-your-account/how-to-download-your-x-archive', t('تنزيل أرشيف X', 'Download your X archive', 'Télécharger votre archive X', 'X arşivini indir'), 'backup'),
            r('https://x.com/settings/account', t('إعدادات حساب X', 'X account settings', 'Paramètres du compte X', 'X hesap ayarları'), 'settings')
        ];
    }

    const instagram = byId('instagram');
    if (instagram) {
        instagram.resources = [
            r('https://www.instagram.com/accounts/remove/request/permanent/', t('حذف حساب Instagram نهائيًا', 'Permanently delete Instagram account', 'Supprimer définitivement le compte Instagram', 'Instagram hesabını kalıcı olarak sil'), 'delete'),
            r('https://accountscenter.instagram.com/info_and_permissions/dyi/', t('تنزيل معلومات Instagram', 'Download your Instagram information', 'Télécharger vos informations Instagram', 'Instagram bilgilerini indir'), 'backup'),
            r('https://www.instagram.com/hacked/', t('استعادة حساب Instagram مخترق', 'Recover a hacked Instagram account', 'Récupérer un compte Instagram piraté', 'Ele geçirilen Instagram hesabını kurtar'), 'security'),
            r('https://accountscenter.instagram.com/password_and_security/', t('الأمان وتسجيل الدخول', 'Password and security', 'Mot de passe et sécurité', 'Şifre ve güvenlik'), 'security')
        ];
    }

    const netflix = byId('netflix');
    if (netflix) {
        netflix.resources = [
            r('https://help.netflix.com/en/node/100625', t('حذف معلومات وحساب Netflix', 'Delete Netflix account information', 'Supprimer les informations du compte Netflix', 'Netflix hesap bilgilerini sil'), 'delete'),
            r('https://www.netflix.com/cancelplan', t('إلغاء عضوية Netflix', 'Cancel Netflix membership', "Annuler l'abonnement Netflix", 'Netflix üyeliğini iptal et'), 'disable'),
            r('https://www.netflix.com/account/getmyinfo', t('تنزيل بيانات Netflix', 'Download Netflix data', 'Télécharger les données Netflix', 'Netflix verilerini indir'), 'backup'),
            r('https://www.netflix.com/account', t('إدارة حساب Netflix', 'Manage Netflix account', 'Gérer le compte Netflix', 'Netflix hesabını yönet'), 'settings')
        ];
    }

    const additions = [
        {
            id: 'threads', name: 'threads', icon: 'fab fa-threads', color: '#000000', category: 'social',
            resources: [
                r('https://help.instagram.com/313703828012423', t('حذف أو تعطيل ملف Threads', 'Delete or deactivate a Threads profile', 'Supprimer ou désactiver un profil Threads', 'Threads profilini sil veya devre dışı bırak'), 'delete'),
                r('https://www.threads.com/settings/account', t('إعدادات حساب Threads', 'Threads account settings', 'Paramètres du compte Threads', 'Threads hesap ayarları'), 'settings')
            ]
        },
        {
            id: 'bluesky', name: 'bluesky', icon: 'fas fa-cloud', color: '#1185FE', category: 'social',
            resources: [
                r('https://bsky.app/settings/account', t('إعدادات وحذف حساب Bluesky', 'Bluesky account settings and deletion', 'Paramètres et suppression du compte Bluesky', 'Bluesky hesap ayarları ve silme'), 'delete'),
                r('https://bsky.app/settings/privacy-and-security', t('الخصوصية والأمان', 'Privacy and security', 'Confidentialité et sécurité', 'Gizlilik ve güvenlik'), 'security')
            ]
        },
        {
            id: 'mastodon', name: 'mastodon', icon: 'fab fa-mastodon', color: '#6364FF', category: 'social',
            resources: [
                r('https://docs.joinmastodon.org/user/moving/#delete', t('حذف حساب Mastodon', 'Delete a Mastodon account', 'Supprimer un compte Mastodon', 'Mastodon hesabını sil'), 'delete'),
                r('https://docs.joinmastodon.org/user/moving/', t('نقل أو تصدير حساب Mastodon', 'Move or export a Mastodon account', 'Déplacer ou exporter un compte Mastodon', 'Mastodon hesabını taşı veya dışa aktar'), 'backup')
            ]
        },
        {
            id: 'tumblr', name: 'tumblr', icon: 'fab fa-tumblr', color: '#001935', category: 'social',
            resources: [
                r('https://help.tumblr.com/knowledge-base/delete-your-account-or-blog/', t('حذف حساب أو مدونة Tumblr', 'Delete a Tumblr account or blog', 'Supprimer un compte ou blog Tumblr', 'Tumblr hesabını veya blogunu sil'), 'delete'),
                r('https://www.tumblr.com/settings/account', t('إعدادات Tumblr', 'Tumblr account settings', 'Paramètres Tumblr', 'Tumblr hesap ayarları'), 'settings')
            ]
        },
        {
            id: 'signal', name: 'signal', icon: 'fas fa-comment-dots', color: '#3A76F0', category: 'messaging',
            resources: [
                r('https://support.signal.org/hc/en-us/articles/360007061192-Delete-Account', t('حذف حساب Signal', 'Delete Signal account', 'Supprimer le compte Signal', 'Signal hesabını sil'), 'delete'),
                r('https://support.signal.org/hc/en-us/articles/360007059752-Backup-and-Restore-Messages', t('النسخ الاحتياطي والاستعادة', 'Backup and restore messages', 'Sauvegarder et restaurer les messages', 'Mesajları yedekle ve geri yükle'), 'backup')
            ]
        },
        {
            id: 'viber', name: 'viber', icon: 'fab fa-viber', color: '#7360F2', category: 'messaging',
            resources: [
                r('https://help.viber.com/hc/en-us/articles/9173394715037-Deactivate-or-uninstall-Rakuten-Viber-on-your-phone', t('إلغاء تنشيط حساب Viber', 'Deactivate Viber account', 'Désactiver le compte Viber', 'Viber hesabını devre dışı bırak'), 'delete'),
                r('https://help.viber.com/hc/en-us/categories/9063200845085-Privacy-and-security', t('خصوصية وأمان Viber', 'Viber privacy and security', 'Confidentialité et sécurité Viber', 'Viber gizlilik ve güvenlik'), 'security')
            ]
        },
        {
            id: 'line', name: 'line', icon: 'fab fa-line', color: '#06C755', category: 'messaging',
            resources: [
                r('https://help.line.me/line/?contentId=20000120', t('حذف حساب LINE', 'Delete LINE account', 'Supprimer le compte LINE', 'LINE hesabını sil'), 'delete'),
                r('https://help.line.me/line/?contentId=20000062', t('نسخ سجل المحادثات احتياطيًا', 'Back up chat history', "Sauvegarder l'historique des chats", 'Sohbet geçmişini yedekle'), 'backup')
            ]
        },
        {
            id: 'roblox', name: 'roblox', icon: 'fas fa-cube', color: '#111111', category: 'service',
            resources: [
                r('https://en.help.roblox.com/hc/en-us/articles/203313050-How-do-I-deactivate-or-delete-my-account', t('تعطيل أو حذف حساب Roblox', 'Deactivate or delete Roblox account', 'Désactiver ou supprimer le compte Roblox', 'Roblox hesabını devre dışı bırak veya sil'), 'delete'),
                r('https://www.roblox.com/my/account#!/security', t('أمان حساب Roblox', 'Roblox account security', 'Sécurité du compte Roblox', 'Roblox hesap güvenliği'), 'security')
            ]
        },
        {
            id: 'nintendo', name: 'nintendo', icon: 'fas fa-gamepad', color: '#E60012', category: 'service',
            resources: [
                r('https://en-americas-support.nintendo.com/app/answers/detail/a_id/15986', t('حذف حساب Nintendo', 'Delete Nintendo Account', 'Supprimer un compte Nintendo', 'Nintendo hesabını sil'), 'delete'),
                r('https://accounts.nintendo.com/', t('إدارة حساب Nintendo', 'Manage Nintendo Account', 'Gérer le compte Nintendo', 'Nintendo hesabını yönet'), 'settings')
            ]
        },
        {
            id: 'ea', name: 'ea', icon: 'fas fa-gamepad', color: '#FF4747', category: 'service',
            resources: [
                r('https://help.ea.com/en/help/account/close-ea-account/', t('إغلاق أو حذف حساب EA', 'Close or delete EA account', 'Fermer ou supprimer le compte EA', 'EA hesabını kapat veya sil'), 'delete'),
                r('https://myaccount.ea.com/cp-ui/security/index', t('أمان حساب EA', 'EA account security', 'Sécurité du compte EA', 'EA hesap güvenliği'), 'security')
            ]
        },
        {
            id: 'ubisoft', name: 'ubisoft', icon: 'fas fa-gamepad', color: '#0070FF', category: 'service',
            resources: [
                r('https://www.ubisoft.com/help/account/article/closing-your-ubisoft-account/000063467', t('إغلاق حساب Ubisoft', 'Close Ubisoft account', 'Fermer le compte Ubisoft', 'Ubisoft hesabını kapat'), 'delete'),
                r('https://account.ubisoft.com/', t('إدارة حساب Ubisoft', 'Manage Ubisoft account', 'Gérer le compte Ubisoft', 'Ubisoft hesabını yönet'), 'settings')
            ]
        },
        {
            id: 'riotgames', name: 'riotgames', icon: 'fas fa-fist-raised', color: '#D32936', category: 'service',
            resources: [
                r('https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360050328454-Deleting-Your-Riot-Account-and-All-Your-Data', t('حذف حساب Riot وبياناته', 'Delete Riot account and data', 'Supprimer le compte Riot et ses données', 'Riot hesabını ve verilerini sil'), 'delete'),
                r('https://account.riotgames.com/', t('إدارة حساب Riot', 'Manage Riot account', 'Gérer le compte Riot', 'Riot hesabını yönet'), 'settings')
            ]
        },
        {
            id: 'battlenet', name: 'battlenet', icon: 'fas fa-gamepad', color: '#148EFF', category: 'service',
            resources: [
                r('https://us.battle.net/support/en/article/2659', t('حذف حساب Battle.net', 'Delete Battle.net account', 'Supprimer le compte Battle.net', 'Battle.net hesabını sil'), 'delete'),
                r('https://account.battle.net/security', t('أمان Battle.net', 'Battle.net security', 'Sécurité Battle.net', 'Battle.net güvenliği'), 'security')
            ]
        },
        {
            id: 'gitlab', name: 'gitlab', icon: 'fab fa-gitlab', color: '#FC6D26', category: 'service',
            resources: [
                r('https://docs.gitlab.com/user/profile/account/delete_account/', t('حذف حساب GitLab', 'Delete GitLab account', 'Supprimer le compte GitLab', 'GitLab hesabını sil'), 'delete'),
                r('https://gitlab.com/-/profile/account', t('إعدادات حساب GitLab', 'GitLab account settings', 'Paramètres du compte GitLab', 'GitLab hesap ayarları'), 'settings')
            ]
        },
        {
            id: 'atlassian', name: 'atlassian', icon: 'fab fa-atlassian', color: '#1868DB', category: 'service',
            resources: [
                r('https://support.atlassian.com/atlassian-account/docs/delete-your-atlassian-account/', t('حذف حساب Atlassian', 'Delete Atlassian account', 'Supprimer le compte Atlassian', 'Atlassian hesabını sil'), 'delete'),
                r('https://id.atlassian.com/manage-profile/profile-and-visibility', t('إدارة ملف Atlassian', 'Manage Atlassian profile', 'Gérer le profil Atlassian', 'Atlassian profilini yönet'), 'settings')
            ]
        },
        {
            id: 'figma', name: 'figma', icon: 'fab fa-figma', color: '#A259FF', category: 'service',
            resources: [
                r('https://help.figma.com/hc/en-us/articles/360040328273-Manage-your-account-settings', t('إدارة أو حذف حساب Figma', 'Manage or delete Figma account', 'Gérer ou supprimer le compte Figma', 'Figma hesabını yönet veya sil'), 'delete'),
                r('https://www.figma.com/settings', t('إعدادات Figma', 'Figma settings', 'Paramètres Figma', 'Figma ayarları'), 'settings')
            ]
        },
        {
            id: 'openai', name: 'openai', icon: 'fas fa-brain', color: '#10A37F', category: 'service',
            resources: [
                r('https://help.openai.com/en/articles/6378407', t('حذف حساب OpenAI', 'Delete OpenAI account', 'Supprimer le compte OpenAI', 'OpenAI hesabını sil'), 'delete'),
                r('https://privacy.openai.com/', t('بوابة خصوصية OpenAI', 'OpenAI Privacy Portal', 'Portail de confidentialité OpenAI', 'OpenAI Gizlilik Portalı'), 'manage')
            ]
        },
        {
            id: 'airbnb', name: 'airbnb', icon: 'fab fa-airbnb', color: '#FF385C', category: 'service',
            resources: [
                r('https://www.airbnb.com/help/article/240', t('تعطيل أو حذف حساب Airbnb', 'Deactivate or delete Airbnb account', 'Désactiver ou supprimer le compte Airbnb', 'Airbnb hesabını devre dışı bırak veya sil'), 'delete'),
                r('https://www.airbnb.com/account-settings/privacy-and-sharing', t('خصوصية Airbnb', 'Airbnb privacy settings', 'Paramètres de confidentialité Airbnb', 'Airbnb gizlilik ayarları'), 'settings')
            ]
        },
        {
            id: 'uber', name: 'uber', icon: 'fas fa-car', color: '#000000', category: 'service',
            resources: [
                r('https://myprivacy.uber.com/privacy/deleteyouraccount', t('حذف حساب Uber', 'Delete Uber account', 'Supprimer le compte Uber', 'Uber hesabını sil'), 'delete'),
                r('https://myprivacy.uber.com/privacy/exploreyourdata', t('استكشاف وتنزيل بيانات Uber', 'Explore and download Uber data', 'Explorer et télécharger les données Uber', 'Uber verilerini incele ve indir'), 'backup')
            ]
        }
    ];

    const existingIds = new Set(platforms.map(p => p.id));
    additions.forEach(platform => {
        if (!existingIds.has(platform.id)) platforms.push(platform);
    });
})();
