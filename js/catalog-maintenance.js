/**
 * Final catalog maintenance layer.
 * Applies canonical replacements after the legacy catalog and maintained additions load.
 * Keeping replacements here means the UI and automated link checks use the same effective URLs.
 */
(() => {
    const replacements = new Map([
        ['https://github.com/settings/personal-data', 'https://docs.github.com/en/get-started/archiving-your-github-personal-account-and-public-repositories/requesting-an-archive-of-your-personal-accounts-data'],

        // TikTok moved older login/privacy article paths. Use durable official section pages
        // that expose the current Account Safety and Account Privacy navigation.
        ['https://support.tiktok.com/en/log-in-troubleshoot/log-in', 'https://support.tiktok.com/en/safety-hc/account-and-user-safety'],
        ['https://support.tiktok.com/en/account-and-privacy/account-privacy-settings', 'https://support.tiktok.com/en/privacy-safety/account-privacy-settings'],

        ['https://www.amazon.com/a/settings/security', 'https://pay.amazon.com/help/201754750'],
        ['https://www.playstation.com/en-us/support/account/playstation-information-request/', 'https://www.playstation.com/en-us/support/account/data-request/'],
        ['https://www.playstation.com/en-us/support/account/psn-security/', 'https://www.playstation.com/en-us/support/account/security-best-practice/'],
        ['https://stackoverflow.com/help/data-portability', 'https://stackoverflow.com/legal/gdpr/request'],
        ['https://proton.me/support/export-emails', 'https://proton.me/support/account/migrate'],
        ['https://requests.yahoo.com/', 'https://legal.yahoo.com/xw/en/yahoo/privacy/dashboard/index.html'],
        ['https://help.ea.com/en/help/account/close-ea-account/', 'https://help.ea.com/en/articles/ea-account/delete-ea-account/'],
        ['https://help.figma.com/hc/en-us/articles/360040328273-Manage-your-account-settings', 'https://help.figma.com/hc/en-us/articles/360039826814-Delete-your-Figma-account'],
        ['https://support.anthropic.com/en/articles/9028421-how-can-i-delete-my-claude-ai-account/', 'https://support.claude.com/en/articles/9028421-delete-your-claude-account'],
        ['https://support.microsoft.com/en-us/account-billing/how-to-close-your-microsoft-account-c1b2d13f-4de6-6e1b-4a31-d9d668849979', 'https://support.microsoft.com/en-US/accounts-billing/manage/how-to-close-your-microsoft-account'],
        ['https://us.battle.net/support/en/article/2659', 'https://us.support.blizzard.com/en/help/article/2659'],
        ['https://www.notion.so/help/delete-your-account', 'https://www.notion.com/help/delete-your-account'],
        ['https://www.notion.so/help/export-your-content', 'https://www.notion.com/help/export-your-content'],

        // eBay's previous privacy-rights article now redirects to an error page even though
        // the HTTP redirect itself is successful. Point directly at the current articles.
        ['https://www.ebay.com/help/account/account-settings/closing-ebay-account?id=4190', 'https://www.ebay.com/help/account/changing-account-settings/closing-account-deleting-data?id=4199'],
        ['https://www.ebay.com/help/account/protecting-account/privacy-rights-request?id=5316', 'https://www.ebay.com/help/account/requesting-personal-data/requesting-personal-data?id=5089'],

        // Riot consolidated the old League Help Center article into its unified support site.
        ['https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360050328454-Deleting-Your-Riot-Account-and-All-Your-Data', 'https://support.riotgames.com/riot/account/deleting-your-riot-account-and-all-your-data']
    ]);

    platforms.forEach(platform => {
        (platform.resources || []).forEach(resource => {
            const replacement = replacements.get(resource.url);
            if (replacement) resource.url = replacement;
        });
    });
})();
