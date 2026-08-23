#!/usr/bin/env node
/**
 * Make generated SEO copy match the evidence state in the effective catalog.
 *
 * `build-site.js` predates provenance-aware metadata and contains optimistic
 * generic copy such as "Official resources". This post-build pass is deliberately
 * narrow: it only softens those generic labels. Explicit first-party badges remain
 * untouched and are still rendered only when resource.official === true.
 */
const fs = require('fs');
const path = require('path');
const { loadCatalog } = require('./load-catalog.js');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const { platforms } = loadCatalog();
const slugFor = platform => String(platform.id || platform.name || 'service')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const replacements = {
    en: [
        ['Official account & privacy resources', 'Account & privacy resources'],
        ['Official resources', 'Provider-reviewed resources'],
        ['Official actions for this service', 'Account and privacy resources for this service'],
        ['Official links to delete or manage your ', 'Maintained links to delete or manage your '],
        ['Browse official account deletion, privacy, data export and AI activity guides for supported online services.', 'Browse maintained account deletion, privacy, data export and AI activity guides for supported online services.'],
        ['Each page is generated from the maintained catalog and links directly to provider-owned resources.', 'Each page is generated from the maintained catalog; provider-owned resources are labeled when provenance is confirmed.']
    ],
    ar: [
        ['روابط رسمية للحساب والخصوصية', 'موارد الحساب والخصوصية'],
        ['المصادر الرسمية', 'المصادر المراجعة من مقدم الخدمة'],
        ['الإجراءات الرسمية لهذه الخدمة', 'موارد الحساب والخصوصية لهذه الخدمة'],
        ['روابط رسمية لحذف أو إدارة حساب ', 'روابط تتم صيانتها لحذف أو إدارة حساب '],
        ['تصفح روابط وأدلة رسمية لحذف الحسابات والبيانات ونشاط الذكاء الاصطناعي وإدارة الخصوصية للخدمات المدعومة.', 'تصفح موارد تتم صيانتها لحذف الحسابات والبيانات ونشاط الذكاء الاصطناعي وإدارة الخصوصية للخدمات المدعومة.'],
        ['يتم إنشاء كل صفحة من الكتالوج الذي تتم صيانته وتربط مباشرة بالمصادر الرسمية للخدمة.', 'يتم إنشاء كل صفحة من الكتالوج الذي تتم صيانته، وتظهر صفة المصدر التابع لمقدم الخدمة فقط عند توثيقها.']
    ],
    fr: [
        ['Ressources officielles de compte et confidentialité', 'Ressources de compte et de confidentialité'],
        ['Ressources officielles', 'Ressources fournisseur vérifiées'],
        ['Actions officielles pour ce service', 'Ressources de compte et confidentialité pour ce service'],
        ['Liens officiels pour supprimer ou gérer votre compte ', 'Liens maintenus pour supprimer ou gérer votre compte '],
        ['Consultez les ressources officielles pour supprimer des comptes, exporter des données, gérer la confidentialité et effacer l’activité IA.', 'Consultez des ressources maintenues pour supprimer des comptes, exporter des données, gérer la confidentialité et effacer l’activité IA.'],
        ['Chaque page est générée depuis le catalogue maintenu et renvoie directement vers les ressources du fournisseur.', 'Chaque page est générée depuis le catalogue maintenu ; la provenance fournisseur est indiquée lorsqu’elle est confirmée.']
    ],
    tr: [
        ['Resmî hesap ve gizlilik kaynakları', 'Hesap ve gizlilik kaynakları'],
        ['Resmî kaynaklar', 'Doğrulanmış sağlayıcı kaynakları'],
        ['Bu hizmet için resmî işlemler', 'Bu hizmet için hesap ve gizlilik kaynakları'],
        [' hesabını silmek veya yönetmek, verileri dışa aktarmak ve gizlilik, güvenlik ya da etkinlik ayarlarını açmak için resmî bağlantılar.', ' hesabını silmek veya yönetmek, verileri dışa aktarmak ve gizlilik, güvenlik ya da etkinlik ayarlarını açmak için bakımı yapılan bağlantılar.'],
        ['Desteklenen çevrimiçi hizmetler için resmî hesap silme, veri dışa aktarma, gizlilik ve yapay zekâ etkinliği bağlantılarını inceleyin.', 'Desteklenen çevrimiçi hizmetler için bakımı yapılan hesap silme, veri dışa aktarma, gizlilik ve yapay zekâ etkinliği kaynaklarını inceleyin.'],
        ['Her sayfa bakımı yapılan katalogdan üretilir ve doğrudan sağlayıcıya ait kaynaklara bağlanır.', 'Her sayfa bakımı yapılan katalogdan üretilir; sağlayıcı kökeni yalnızca doğrulandığında etiketlenir.']
    ]
};

function replaceAll(content, pairs) {
    let result = content;
    for (const [from, to] of pairs) result = result.split(from).join(to);
    return result;
}

let changed = 0;
for (const platform of platforms) {
    const hasUnverified = (platform.resources || []).some(resource => resource.official !== true || !resource.verified);
    if (!hasUnverified) continue;

    for (const [lang, pairs] of Object.entries(replacements)) {
        const file = path.join(DIST, lang, 'services', slugFor(platform), 'index.html');
        if (!fs.existsSync(file)) continue;
        const before = fs.readFileSync(file, 'utf8');
        const after = replaceAll(before, pairs);
        if (after !== before) {
            fs.writeFileSync(file, after, 'utf8');
            changed += 1;
        }
    }
}

// Service indexes summarize the whole catalog, so conservative copy is always used.
for (const [lang, pairs] of Object.entries(replacements)) {
    const file = path.join(DIST, lang, 'services', 'index.html');
    if (!fs.existsSync(file)) continue;
    const before = fs.readFileSync(file, 'utf8');
    const after = replaceAll(before, pairs);
    if (after !== before) {
        fs.writeFileSync(file, after, 'utf8');
        changed += 1;
    }
}

console.log(`Trust post-build normalized ${changed} generated page(s).`);
