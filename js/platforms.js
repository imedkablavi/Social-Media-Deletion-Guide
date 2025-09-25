/**
 * Platform Data for Social Media Deletion Guide
 * Contains all social media platforms with working deletion/management links
 */

const platforms = [
    {
        id: "twitter",
        name: "twitter",
        icon: "fab fa-x-twitter",
        color: "#000000",
        category: "social",
        resources: [
            {
                url: "https://help.twitter.com/en/managing-your-account/how-to-deactivate-twitter-account",
                title: {
                    ar: "كيفية إلغاء تنشيط حساب X (تويتر)",
                    en: "How to deactivate X (Twitter) account",
                    fr: "Comment désactiver le compte X (Twitter)"
                },
                type: "delete"
            },
            {
                url: "https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive",
                title: {
                    ar: "تحميل أرشيف تغريداتك",
                    en: "Download your tweet archive",
                    fr: "Télécharger votre archive de tweets"
                },
                type: "backup"
            },
            {
                url: "https://twitter.com/settings/account",
                title: {
                    ar: "إعدادات الحساب",
                    en: "Account settings",
                    fr: "Paramètres du compte"
                },
                type: "settings"
            },
            {
                url: "https://help.twitter.com/en/safety-and-security/remove-followers",
                title: {
                    ar: "إزالة المتابعين",
                    en: "Remove followers",
                    fr: "Supprimer les abonnés"
                },
                type: "manage"
            },
            {
                url: "https://help.twitter.com/en/managing-your-account/how-to-delete-specific-tweets",
                title: {
                    ar: "حذف تغريدات محددة",
                    en: "Delete specific tweets",
                    fr: "Supprimer des tweets spécifiques"
                },
                type: "manage"
            }
        ]
    },
    {
        id: "instagram",
        name: "instagram",
        icon: "fab fa-instagram",
        color: "#E4405F",
        category: "social",
        resources: [
            {
                url: "https://help.instagram.com/contact/1652567838289083",
                title: {
                    ar: "حذف حساب Instagram نهائياً",
                    en: "Delete Instagram account permanently",
                    fr: "Supprimer définitivement le compte Instagram"
                },
                type: "delete"
            },
            {
                url: "https://help.instagram.com/contact/186020218683230",
                title: {
                    ar: "إيقاف الحساب مؤقتاً",
                    en: "Temporarily disable account",
                    fr: "Désactiver temporairement le compte"
                },
                type: "disable"
            },
            {
                url: "https://help.instagram.com/1701261696756992",
                title: {
                    ar: "تنزيل بياناتك من Instagram",
                    en: "Download your Instagram data",
                    fr: "Télécharger vos données Instagram"
                },
                type: "backup"
            },
            {
                url: "https://help.instagram.com/contact/1652567838289083",
                title: {
                    ar: "الإبلاغ عن حساب مخترق",
                    en: "Report hacked account",
                    fr: "Signaler un compte piraté"
                },
                type: "security"
            },
            {
                url: "https://help.instagram.com/116024195217477",
                title: {
                    ar: "إدارة الخصوصية والأمان",
                    en: "Manage privacy and security",
                    fr: "Gérer la confidentialité et la sécurité"
                },
                type: "settings"
            }
        ]
    },
    {
        id: "facebook",
        name: "facebook",
        icon: "fab fa-facebook",
        color: "#1877F2",
        category: "social",
        resources: [
            {
                url: "https://www.facebook.com/help/224562897555674",
                title: {
                    ar: "كيفية حذف حساب Facebook نهائياً",
                    en: "How to permanently delete Facebook account",
                    fr: "Comment supprimer définitivement le compte Facebook"
                },
                type: "delete"
            },
            {
                url: "https://www.facebook.com/help/214376678584711",
                title: {
                    ar: "إيقاف الحساب مؤقتاً",
                    en: "Deactivate account temporarily",
                    fr: "Désactiver le compte temporairement"
                },
                type: "disable"
            },
            {
                url: "https://www.facebook.com/dyi",
                title: {
                    ar: "تنزيل معلوماتك من Facebook",
                    en: "Download your Facebook information",
                    fr: "Télécharger vos informations Facebook"
                },
                type: "backup"
            },
            {
                url: "https://www.facebook.com/hacked",
                title: {
                    ar: "مساعدة الحساب المخترق",
                    en: "Hacked account help",
                    fr: "Aide compte piraté"
                },
                type: "security"
            },
            {
                url: "https://www.facebook.com/settings?tab=privacy",
                title: {
                    ar: "إعدادات الخصوصية",
                    en: "Privacy settings",
                    fr: "Paramètres de confidentialité"
                },
                type: "settings"
            }
        ]
    },
    {
        id: "whatsapp",
        name: "whatsapp",
        icon: "fab fa-whatsapp",
        color: "#25D366",
        category: "messaging",
        resources: [
            {
                url: "https://faq.whatsapp.com/527562428390447",
                title: {
                    ar: "كيفية حذف حساب WhatsApp",
                    en: "How to delete WhatsApp account",
                    fr: "Comment supprimer le compte WhatsApp"
                },
                type: "delete"
            },
            {
                url: "https://faq.whatsapp.com/1180414079177245",
                title: {
                    ar: "تصدير المحادثات",
                    en: "Export chats",
                    fr: "Exporter les conversations"
                },
                type: "backup"
            },
            {
                url: "https://faq.whatsapp.com/1061611991749160",
                title: {
                    ar: "استعادة حساب مخترق",
                    en: "Recover compromised account",
                    fr: "Récupérer un compte compromis"
                },
                type: "security"
            },
            {
                url: "https://faq.whatsapp.com/539178204879377",
                title: {
                    ar: "إعدادات الخصوصية والأمان",
                    en: "Privacy and security settings",
                    fr: "Paramètres de confidentialité et sécurité"
                },
                type: "settings"
            }
        ]
    },
    {
        id: "tiktok",
        name: "tiktok",
        icon: "fab fa-tiktok",
        color: "#000000",
        category: "social",
        resources: [
            {
                url: "https://support.tiktok.com/en/account-and-privacy/deleting-an-account",
                title: {
                    ar: "حذف حساب TikTok نهائياً",
                    en: "Delete TikTok account permanently",
                    fr: "Supprimer définitivement le compte TikTok"
                },
                type: "delete"
            },
            {
                url: "https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data",
                title: {
                    ar: "طلب بياناتك من TikTok",
                    en: "Request your TikTok data",
                    fr: "Demander vos données TikTok"
                },
                type: "backup"
            },
            {
                url: "https://support.tiktok.com/en/log-in-troubleshoot/log-in",
                title: {
                    ar: "مشاكل تسجيل الدخول",
                    en: "Login issues",
                    fr: "Problèmes de connexion"
                },
                type: "security"
            },
            {
                url: "https://support.tiktok.com/en/account-and-privacy/account-privacy-settings",
                title: {
                    ar: "إعدادات خصوصية الحساب",
                    en: "Account privacy settings",
                    fr: "Paramètres de confidentialité du compte"
                },
                type: "settings"
            }
        ]
    },
    {
        id: "snapchat",
        name: "snapchat",
        icon: "fab fa-snapchat-ghost",
        color: "#FFFC00",
        category: "social",
        resources: [
            {
                url: "https://support.snapchat.com/en-US/a/delete-my-account1",
                title: {
                    ar: "حذف حساب Snapchat نهائياً",
                    en: "Delete Snapchat account permanently",
                    fr: "Supprimer définitivement le compte Snapchat"
                },
                type: "delete"
            },
            {
                url: "https://support.snapchat.com/en-US/a/download-my-data",
                title: {
                    ar: "تنزيل بياناتي من Snapchat",
                    en: "Download my Snapchat data",
                    fr: "Télécharger mes données Snapchat"
                },
                type: "backup"
            },
            {
                url: "https://accounts.snapchat.com/accounts/login",
                title: {
                    ar: "إدارة حساب Snapchat",
                    en: "Manage Snapchat account",
                    fr: "Gérer le compte Snapchat"
                },
                type: "settings"
            },
            {
                url: "https://support.snapchat.com/en-US/a/hacked-howto",
                title: {
                    ar: "إذا تم اختراق حسابك",
                    en: "If your account was hacked",
                    fr: "Si votre compte a été piraté"
                },
                type: "security"
            }
        ]
    },
    {
        id: "google",
        name: "google",
        icon: "fab fa-google",
        color: "#EA4335",
        category: "service",
        resources: [
            {
                url: "https://support.google.com/accounts/answer/32046",
                title: {
                    ar: "حذف حساب Google نهائياً",
                    en: "Delete Google account permanently",
                    fr: "Supprimer définitivement le compte Google"
                },
                type: "delete"
            },
            {
                url: "https://takeout.google.com/",
                title: {
                    ar: "تنزيل بياناتك - Google Takeout",
                    en: "Download your data - Google Takeout",
                    fr: "Télécharger vos données - Google Takeout"
                },
                type: "backup"
            },
            {
                url: "https://myaccount.google.com/",
                title: {
                    ar: "إدارة حساب Google",
                    en: "Manage Google account",
                    fr: "Gérer le compte Google"
                },
                type: "settings"
            },
            {
                url: "https://support.google.com/accounts/answer/6294825",
                title: {
                    ar: "استرداد حساب Google مخترق",
                    en: "Recover compromised Google account",
                    fr: "Récupérer un compte Google compromis"
                },
                type: "security"
            },
            {
                url: "https://support.google.com/youtube/answer/55770",
                title: {
                    ar: "حذف قناة YouTube",
                    en: "Delete YouTube channel",
                    fr: "Supprimer la chaîne YouTube"
                },
                type: "delete"
            }
        ]
    },
    {
        id: "microsoft",
        name: "microsoft",
        icon: "fab fa-microsoft",
        color: "#00A4EF",
        category: "service",
        resources: [
            {
                url: "https://support.microsoft.com/en-us/account-billing/how-to-close-your-microsoft-account-c1b2d13f-4de6-6e1b-4a31-d9d668849979",
                title: {
                    ar: "إغلاق حساب Microsoft نهائياً",
                    en: "Close Microsoft account permanently",
                    fr: "Fermer définitivement le compte Microsoft"
                },
                type: "delete"
            },
            {
                url: "https://account.microsoft.com/privacy/download-data",
                title: {
                    ar: "تنزيل بياناتك من Microsoft",
                    en: "Download your Microsoft data",
                    fr: "Télécharger vos données Microsoft"
                },
                type: "backup"
            },
            {
                url: "https://account.live.com/acsr",
                title: {
                    ar: "استرداد حساب Microsoft",
                    en: "Microsoft account recovery",
                    fr: "Récupération de compte Microsoft"
                },
                type: "security"
            },
            {
                url: "https://account.microsoft.com/privacy",
                title: {
                    ar: "إعدادات الخصوصية Microsoft",
                    en: "Microsoft privacy settings",
                    fr: "Paramètres de confidentialité Microsoft"
                },
                type: "settings"
            }
        ]
    },
    {
        id: "other",
        name: "other",
        icon: "fas fa-shield-alt",
        color: "#6366f1",
        category: "security",
        resources: [
            {
                url: "https://haveibeenpwned.com/",
                title: {
                    ar: "فحص تسريب البيانات",
                    en: "Check data breaches",
                    fr: "Vérifier les fuites de données"
                },
                type: "security"
            },
            {
                url: "https://www.accountkiller.com/",
                title: {
                    ar: "دليل حذف الحسابات الشامل",
                    en: "Complete account deletion guide",
                    fr: "Guide complet de suppression de compte"
                },
                type: "guide"
            },
            {
                url: "https://2fa.directory/",
                title: {
                    ar: "دليل التحقق الثنائي",
                    en: "Two-factor authentication directory",
                    fr: "Répertoire d'authentification à deux facteurs"
                },
                type: "security"
            },
            {
                url: "https://www.privacytools.io/",
                title: {
                    ar: "أدوات الخصوصية والأمان",
                    en: "Privacy and security tools",
                    fr: "Outils de confidentialité et sécurité"
                },
                type: "tools"
            },
            {
                url: "https://justdeleteme.xyz/",
                title: {
                    ar: "دليل حذف الحسابات المباشر",
                    en: "Direct account deletion guide",
                    fr: "Guide de suppression directe de compte"
                },
                type: "guide"
            }
        ]
    }
    ,
    {
        id: "linkedin",
        name: "linkedin",
        icon: "fab fa-linkedin",
        color: "#0A66C2",
        category: "social",
        resources: [
            {
                url: "https://www.linkedin.com/psettings/account-management/close-submit",
                title: { ar: "إغلاق حساب LinkedIn", en: "Close LinkedIn Account", fr: "Fermer le compte LinkedIn" },
                type: "delete"
            },
            {
                url: "https://www.linkedin.com/psettings/member-data",
                title: { ar: "تنزيل بياناتك من LinkedIn", en: "Download your LinkedIn data", fr: "Télécharger vos données LinkedIn" },
                type: "backup"
            },
            {
                url: "https://www.linkedin.com/psettings/",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "settings"
            },
            {
                url: "https://www.linkedin.com/psettings/email",
                title: { ar: "إعدادات الأمان والبريد", en: "Security & email settings", fr: "Paramètres sécurité & e-mail" },
                type: "security"
            }
        ]
    },
    {
        id: "pinterest",
        name: "pinterest",
        icon: "fab fa-pinterest",
        color: "#E60023",
        category: "social",
        resources: [
            {
                url: "https://help.pinterest.com/en/article/deactivate-or-close-your-account",
                title: { ar: "إغلاق حساب Pinterest", en: "Close Pinterest account", fr: "Fermer le compte Pinterest" },
                type: "delete"
            },
            {
                url: "https://www.pinterest.com/settings/privacy-and-data",
                title: { ar: "تنزيل / إدارة البيانات", en: "Privacy & data settings", fr: "Paramètres confidentialité & données" },
                type: "backup"
            },
            {
                url: "https://www.pinterest.com/settings/account-settings",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "settings"
            }
        ]
    },
    {
        id: "reddit",
        name: "reddit",
        icon: "fab fa-reddit",
        color: "#FF4500",
        category: "social",
        resources: [
            {
                url: "https://www.reddit.com/prefs/delete/",
                title: { ar: "حذف حساب Reddit", en: "Delete Reddit account", fr: "Supprimer le compte Reddit" },
                type: "delete"
            },
            {
                url: "https://www.reddit.com/settings/data-request",
                title: { ar: "طلب بيانات Reddit", en: "Request Reddit data", fr: "Demander vos données Reddit" },
                type: "backup"
            },
            {
                url: "https://www.reddit.com/settings/privacy",
                title: { ar: "إعدادات الخصوصية", en: "Privacy settings", fr: "Paramètres de confidentialité" },
                type: "settings"
            },
            {
                url: "https://www.reddit.com/settings/",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "manage"
            }
        ]
    },
    {
        id: "discord",
        name: "discord",
        icon: "fab fa-discord",
        color: "#5865F2",
        category: "messaging",
        resources: [
            {
                url: "https://support.discord.com/hc/en-us/articles/212500837-How-do-I-delete-my-account-",
                title: { ar: "حذف حساب Discord", en: "Delete Discord account", fr: "Supprimer le compte Discord" },
                type: "delete"
            },
            {
                url: "https://support.discord.com/hc/en-us/articles/360004957991-Requesting-a-Copy-of-your-Data",
                title: { ar: "طلب نسخة من بياناتك", en: "Request a copy of your data", fr: "Demander une copie de vos données" },
                type: "backup"
            },
            {
                url: "https://discord.com/settings/profile",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "settings"
            },
            {
                url: "https://discord.com/settings/security",
                title: { ar: "الأمان و المصادقة", en: "Security & authentication", fr: "Sécurité & authentification" },
                type: "security"
            }
        ]
    },
    {
        id: "telegram",
        name: "telegram",
        icon: "fab fa-telegram",
        color: "#229ED9",
        category: "messaging",
        resources: [
            {
                url: "https://my.telegram.org/auth?to=deactivate",
                title: { ar: "تعطيل / حذف حساب Telegram", en: "Deactivate / delete Telegram account", fr: "Désactiver / supprimer le compte Telegram" },
                type: "delete"
            },
            {
                url: "https://my.telegram.org/",
                title: { ar: "إدارة حساب Telegram", en: "Manage Telegram account", fr: "Gérer le compte Telegram" },
                type: "settings"
            },
            {
                url: "https://telegram.org/faq#q-how-do-i-log-out",
                title: { ar: "أمان الجلسات", en: "Session security", fr: "Sécurité des sessions" },
                type: "security"
            }
        ]
    },
    {
        id: "github",
        name: "github",
        icon: "fab fa-github",
        color: "#181717",
        category: "service",
        resources: [
            {
                url: "https://github.com/settings/admin",
                title: { ar: "حذف حساب GitHub", en: "Delete GitHub account", fr: "Supprimer le compte GitHub" },
                type: "delete"
            },
            {
                url: "https://github.com/settings/personal-data",
                title: { ar: "طلب بياناتك", en: "Request your data", fr: "Demander vos données" },
                type: "backup"
            },
            {
                url: "https://github.com/settings/security",
                title: { ar: "إعدادات الأمان", en: "Security settings", fr: "Paramètres de sécurité" },
                type: "security"
            },
            {
                url: "https://github.com/settings/profile",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "settings"
            }
        ]
    },
    {
        id: "amazon",
        name: "amazon",
        icon: "fab fa-amazon",
        color: "#FF9900",
        category: "service",
        resources: [
            {
                url: "https://www.amazon.com/privacy/data-deletion",
                title: { ar: "طلب حذف حساب Amazon", en: "Request Amazon account deletion", fr: "Demander la suppression du compte Amazon" },
                type: "delete"
            },
            {
                url: "https://www.amazon.com/hz/privacy-central/data-requests/preview.html",
                title: { ar: "طلب تنزيل بياناتك", en: "Request your data download", fr: "Demander le téléchargement de vos données" },
                type: "backup"
            },
            {
                url: "https://www.amazon.com/a/settings/security",
                title: { ar: "الأمان وتسجيل الدخول", en: "Login & security", fr: "Connexion & sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "netflix",
        name: "netflix",
        icon: "fab fa-netflix",
        color: "#E50914",
        category: "service",
        resources: [
            {
                url: "https://www.netflix.com/cancelplan",
                title: { ar: "إلغاء خطة Netflix", en: "Cancel Netflix plan", fr: "Annuler l'abonnement Netflix" },
                type: "delete"
            },
            {
                url: "https://www.netflix.com/YourAccount",
                title: { ar: "إدارة الحساب", en: "Manage account", fr: "Gérer le compte" },
                type: "settings"
            }
        ]
    },
    {
        id: "spotify",
        name: "spotify",
        icon: "fab fa-spotify",
        color: "#1DB954",
        category: "service",
        resources: [
            {
                url: "https://support.spotify.com/article/close-account/",
                title: { ar: "إغلاق حساب Spotify", en: "Close Spotify account", fr: "Fermer le compte Spotify" },
                type: "delete"
            },
            {
                url: "https://www.spotify.com/account/privacy/",
                title: { ar: "تنزيل بياناتك", en: "Download your data", fr: "Télécharger vos données" },
                type: "backup"
            },
            {
                url: "https://www.spotify.com/account/change-password/",
                title: { ar: "تغيير كلمة المرور / الأمان", en: "Password & security", fr: "Mot de passe & sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "apple",
        name: "apple",
        icon: "fab fa-apple",
        color: "#000000",
        category: "service",
        resources: [
            {
                url: "https://privacy.apple.com/",
                title: { ar: "إدارة / حذف بيانات Apple", en: "Manage / delete Apple data", fr: "Gérer / supprimer les données Apple" },
                type: "delete"
            },
            {
                url: "https://appleid.apple.com/",
                title: { ar: "إدارة Apple ID", en: "Manage Apple ID", fr: "Gérer l'identifiant Apple" },
                type: "settings"
            }
        ]
    },
    {
        id: "adobe",
        name: "adobe",
        icon: "fab fa-adobe",
        color: "#FF0000",
        category: "service",
        resources: [
            {
                url: "https://account.adobe.com/privacy",
                title: { ar: "الخصوصية وحذف الحساب", en: "Privacy & account deletion", fr: "Confidentialité & suppression de compte" },
                type: "delete"
            },
            {
                url: "https://account.adobe.com/security",
                title: { ar: "الأمان و الوصول", en: "Security & access", fr: "Sécurité & accès" },
                type: "security"
            }
        ]
    },
    {
        id: "dropbox",
        name: "dropbox",
        icon: "fab fa-dropbox",
        color: "#0061FF",
        category: "service",
        resources: [
            {
                url: "https://www.dropbox.com/account/delete",
                title: { ar: "حذف حساب Dropbox", en: "Delete Dropbox account", fr: "Supprimer le compte Dropbox" },
                type: "delete"
            },
            {
                url: "https://www.dropbox.com/account/security",
                title: { ar: "إعدادات الأمان", en: "Security settings", fr: "Paramètres de sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "twitch",
        name: "twitch",
        icon: "fab fa-twitch",
        color: "#9146FF",
        category: "social",
        resources: [
            {
                url: "https://www.twitch.tv/user/delete-account",
                title: { ar: "حذف حساب Twitch", en: "Delete Twitch account", fr: "Supprimer le compte Twitch" },
                type: "delete"
            },
            {
                url: "https://www.twitch.tv/user/disable-account",
                title: { ar: "تعطيل الحساب مؤقتاً", en: "Disable account temporarily", fr: "Désactiver le compte temporairement" },
                type: "disable"
            },
            {
                url: "https://www.twitch.tv/settings/security",
                title: { ar: "إعدادات الأمان", en: "Security settings", fr: "Paramètres de sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "steam",
        name: "steam",
        icon: "fab fa-steam",
        color: "#171A21",
        category: "service",
        resources: [
            {
                url: "https://help.steampowered.com/en/wizard/HelpWithAccountDataQuestion?issueid=123",
                title: { ar: "طلب حذف حساب Steam", en: "Request Steam account deletion", fr: "Demander la suppression du compte Steam" },
                type: "delete"
            },
            {
                url: "https://help.steampowered.com/en/accountdata",
                title: { ar: "طلب بيانات الحساب", en: "Account data request", fr: "Demande de données du compte" },
                type: "backup"
            },
            {
                url: "https://store.steampowered.com/twofactor/manage",
                title: { ar: "إدارة الحماية الثنائية", en: "Manage 2FA", fr: "Gérer l'A2F" },
                type: "security"
            }
        ]
    },
    {
        id: "epicgames",
        name: "epicgames",
        icon: "fas fa-gamepad",
        color: "#313131",
        category: "service",
        resources: [
            {
                url: "https://www.epicgames.com/account/personal",
                title: { ar: "إعدادات / حذف الحساب", en: "Account settings / deletion", fr: "Paramètres / suppression du compte" },
                type: "delete"
            },
            {
                url: "https://www.epicgames.com/account/password",
                title: { ar: "الأمان وكلمة المرور", en: "Security & password", fr: "Sécurité & mot de passe" },
                type: "security"
            }
        ]
    },
    {
        id: "playstation",
        name: "playstation",
        icon: "fab fa-playstation",
        color: "#003791",
        category: "service",
        resources: [
            {
                url: "https://www.playstation.com/en-us/support/account/close-account/",
                title: { ar: "إغلاق حساب PlayStation", en: "Close PlayStation account", fr: "Fermer le compte PlayStation" },
                type: "delete"
            },
            {
                url: "https://www.playstation.com/en-us/support/account/playstation-information-request/",
                title: { ar: "طلب بيانات PlayStation", en: "PlayStation data request", fr: "Demande de données PlayStation" },
                type: "backup"
            },
            {
                url: "https://www.playstation.com/en-us/support/account/psn-security/",
                title: { ar: "إعدادات الأمان", en: "Security settings", fr: "Paramètres de sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "slack",
        name: "slack",
        icon: "fab fa-slack",
        color: "#4A154B",
        category: "messaging",
        resources: [
            {
                url: "https://slack.com/help/articles/203953146-Deactivate-your-Slack-account",
                title: { ar: "تعطيل حساب Slack", en: "Deactivate Slack account", fr: "Désactiver le compte Slack" },
                type: "delete"
            },
            {
                url: "https://slack.com/help/articles/201658943-Export-your-workspace-data",
                title: { ar: "تصدير بيانات مساحة العمل", en: "Export workspace data", fr: "Exporter les données de l'espace" },
                type: "backup"
            },
            {
                url: "https://my.slack.com/account/settings",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "settings"
            }
        ]
    },
    {
        id: "zoom",
        name: "zoom",
        icon: "fas fa-video",
        color: "#0B5CFF",
        category: "messaging",
        resources: [
            {
                url: "https://zoom.us/account/terminate",
                title: { ar: "حذف حساب Zoom", en: "Delete Zoom account", fr: "Supprimer le compte Zoom" },
                type: "delete"
            },
            {
                url: "https://support.zoom.us/hc/en-us/articles/201363003",
                title: { ar: "تنزيل بيانات Zoom", en: "Download Zoom data", fr: "Télécharger vos données Zoom" },
                type: "backup"
            },
            {
                url: "https://zoom.us/profile/password",
                title: { ar: "إعدادات الأمان", en: "Security settings", fr: "Paramètres de sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "paypal",
        name: "paypal",
        icon: "fab fa-paypal",
        color: "#003087",
        category: "service",
        resources: [
            {
                url: "https://www.paypal.com/myaccount/settings/",
                title: { ar: "إغلاق حساب PayPal", en: "Close PayPal account", fr: "Fermer le compte PayPal" },
                type: "delete"
            },
            {
                url: "https://www.paypal.com/myaccount/privacy/data/settings",
                title: { ar: "طلب بياناتك", en: "Request your data", fr: "Demander vos données" },
                type: "backup"
            },
            {
                url: "https://www.paypal.com/myaccount/settings/security",
                title: { ar: "إعدادات الأمان", en: "Security settings", fr: "Paramètres de sécurité" },
                type: "security"
            }
        ]
    },
    {
        id: "ebay",
        name: "ebay",
        icon: "fab fa-ebay",
        color: "#E53238",
        category: "service",
        resources: [
            {
                url: "https://www.ebay.com/help/account/account-settings/closing-ebay-account?id=4190",
                title: { ar: "إغلاق حساب eBay", en: "Close eBay account", fr: "Fermer le compte eBay" },
                type: "delete"
            },
            {
                url: "https://www.ebay.com/help/account/protecting-account/privacy-rights-request?id=5316",
                title: { ar: "طلب بيانات eBay", en: "eBay data request", fr: "Demande de données eBay" },
                type: "backup"
            },
            {
                url: "https://www.ebay.com/help/account/protecting-account/keeping-your-account-secure?id=4191",
                title: { ar: "أمان الحساب", en: "Account security", fr: "Sécurité du compte" },
                type: "security"
            }
        ]
    },
    {
        id: "quora",
        name: "quora",
        icon: "fas fa-question-circle",
        color: "#B92B27",
        category: "social",
        resources: [
            {
                url: "https://www.quora.com/settings/privacy",
                title: { ar: "حذف / إلغاء تنشيط حساب Quora", en: "Delete / deactivate Quora account", fr: "Supprimer / désactiver le compte Quora" },
                type: "delete"
            },
            {
                url: "https://www.quora.com/settings/privacy",
                title: { ar: "تنزيل بياناتك", en: "Download your data", fr: "Télécharger vos données" },
                type: "backup"
            },
            {
                url: "https://www.quora.com/settings",
                title: { ar: "إعدادات الحساب", en: "Account settings", fr: "Paramètres du compte" },
                type: "settings"
            }
        ]
    },
    {
        id: "medium",
        name: "medium",
        icon: "fab fa-medium",
        color: "#000000",
        category: "social",
        resources: [
            {
                url: "https://medium.com/me/settings",
                title: { ar: "حذف حساب Medium", en: "Delete Medium account", fr: "Supprimer le compte Medium" },
                type: "delete"
            },
            {
                url: "https://medium.com/me/settings",
                title: { ar: "تصدير بيانات Medium", en: "Export Medium data", fr: "Exporter les données Medium" },
                type: "backup"
            }
        ]
    },
    {
        id: "stackoverflow",
        name: "stackoverflow",
        icon: "fab fa-stack-overflow",
        color: "#F48024",
        category: "service",
        resources: [
            {
                url: "https://stackoverflow.com/help/deleting-account",
                title: { ar: "حذف حساب StackOverflow", en: "Delete StackOverflow account", fr: "Supprimer le compte StackOverflow" },
                type: "delete"
            },
            {
                url: "https://stackoverflow.com/help/data-portability",
                title: { ar: "تنزيل بياناتك", en: "Download your data", fr: "Télécharger vos données" },
                type: "backup"
            }
        ]
    },
    {
        id: "notion",
        name: "notion",
        icon: "fas fa-file-alt",
        color: "#000000",
        category: "service",
        resources: [
            {
                url: "https://www.notion.so/help/delete-your-account",
                title: { ar: "حذف حساب Notion", en: "Delete Notion account", fr: "Supprimer le compte Notion" },
                type: "delete"
            },
            {
                url: "https://www.notion.so/help/export-your-content",
                title: { ar: "تصدير محتوى Notion", en: "Export Notion content", fr: "Exporter le contenu Notion" },
                type: "backup"
            }
        ]
    },
    {
        id: "protonmail",
        name: "protonmail",
        icon: "fas fa-lock",
        color: "#6D4AFF",
        category: "service",
        resources: [
            {
                url: "https://proton.me/support/delete-account",
                title: { ar: "حذف حساب Proton", en: "Delete Proton account", fr: "Supprimer le compte Proton" },
                type: "delete"
            },
            {
                url: "https://proton.me/support/export-emails",
                title: { ar: "تصدير البريد", en: "Export emails", fr: "Exporter les e-mails" },
                type: "backup"
            }
        ]
    },
    {
        id: "yahoo",
        name: "yahoo",
        icon: "fab fa-yahoo",
        color: "#6001D2",
        category: "service",
        resources: [
            {
                url: "https://login.yahoo.com/account/delete-user",
                title: { ar: "حذف حساب Yahoo", en: "Delete Yahoo account", fr: "Supprimer le compte Yahoo" },
                type: "delete"
            },
            {
                url: "https://requests.yahoo.com/",
                title: { ar: "طلب بيانات Yahoo", en: "Yahoo data request", fr: "Demande de données Yahoo" },
                type: "backup"
            }
        ]
    }
];

// Platform categories
const categories = {
    social: {
        ar: "وسائل التواصل",
        en: "Social Media",
        fr: "Médias Sociaux"
    },
    messaging: {
        ar: "المراسلة",
        en: "Messaging",
        fr: "Messagerie"
    },
    service: {
        ar: "الخدمات",
        en: "Services",
        fr: "Services"
    },
    security: {
        ar: "الأمان",
        en: "Security",
        fr: "Sécurité"
    }
};

// Resource types
const resourceTypes = {
    delete: {
        ar: "حذف الحساب",
        en: "Delete Account",
        fr: "Supprimer le Compte",
        icon: "fas fa-trash-alt",
        color: "#ef4444"
    },
    disable: {
        ar: "إيقاف مؤقت",
        en: "Temporary Disable",
        fr: "Désactiver Temporairement",
        icon: "fas fa-pause",
        color: "#f59e0b"
    },
    backup: {
        ar: "نسخ احتياطي",
        en: "Backup Data",
        fr: "Sauvegarder les Données",
        icon: "fas fa-download",
        color: "#10b981"
    },
    security: {
        ar: "الأمان",
        en: "Security",
        fr: "Sécurité",
        icon: "fas fa-shield-alt",
        color: "#6366f1"
    },
    settings: {
        ar: "الإعدادات",
        en: "Settings",
        fr: "Paramètres",
        icon: "fas fa-cog",
        color: "#64748b"
    },
    manage: {
        ar: "إدارة",
        en: "Manage",
        fr: "Gérer",
        icon: "fas fa-edit",
        color: "#8b5cf6"
    },
    guide: {
        ar: "دليل",
        en: "Guide",
        fr: "Guide",
        icon: "fas fa-book",
        color: "#06b6d4"
    },
    tools: {
        ar: "أدوات",
        en: "Tools",
        fr: "Outils",
        icon: "fas fa-tools",
        color: "#84cc16"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { platforms, categories, resourceTypes };
}