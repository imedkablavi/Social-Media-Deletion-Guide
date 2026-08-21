# Security & Privacy

This project is a static directory of links. It does **not** need, request, transmit, or store account passwords, authentication tokens, recovery codes, or deletion confirmations.

## Reporting a security issue

If you find a vulnerability in the site itself, please avoid posting exploit details publicly until it can be reviewed. Contact the repository owner through the GitHub profile associated with this project.

For broken or outdated provider links, use the repository's **Broken or outdated link** issue form instead; those are data-quality reports rather than security vulnerabilities.

## Trust boundaries

- External account actions happen on the provider's own domain.
- Users should verify the destination domain before entering credentials.
- A provider may require sign-in, re-authentication, subscription cancellation, or identity verification.
- This project cannot guarantee what a provider does after the user leaves this site.
- Links marked **Official** are intended to point to first-party provider destinations.

## Maintainer guidance

Do not add scripts that collect credentials or proxy provider login/deletion forms. Do not embed third-party account pages in iframes. Avoid analytics that collect unnecessary personal data. Keep external dependencies minimal and pinned to maintained release channels where practical.
