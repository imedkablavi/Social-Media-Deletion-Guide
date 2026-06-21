<div align="center">
<h1>🛡️ Social Media Deletion Guide</h1>

<p>
<strong>Find • Export • Secure • Delete</strong><br>
A multilingual privacy toolkit for quickly reaching official account deletion, backup, security, and settings pages.
</p>

<p>
<img src="https://img.shields.io/badge/Platforms-50%2B-blueviolet" />
<img src="https://img.shields.io/badge/Languages-AR%20%7C%20EN%20%7C%20FR%20%7C%20TR-green" />
<img src="https://img.shields.io/badge/Design-Animated%20UI-orange" />
</p>
</div>

---

## ✨ Features

* 🌍 **4 Languages**: Arabic, English, French, and Turkish
* ↔️ **RTL Support**: Proper layout handling for Arabic
* 🗂️ **50+ Platforms**: Social media, messaging, gaming, productivity, and online services
* 🔎 **Search & Filtering**: Quickly find the platform or resource you need
* 📚 **Organized Resources**: Delete, backup, security, settings, guides, and tools
* 🎨 **Modern Interface**: Animated hero section, cards, glass-style surfaces, and responsive layout
* ♿ **Accessibility**: Semantic HTML, keyboard-friendly structure, and clear visual hierarchy

---

## 📂 Project Structure

```text
/
├─ css/
│  └─ components.css          # Layout, cards, animations, footer, and responsive styles
├─ js/
│  ├─ translations.js         # Language content for AR / EN / FR / TR
│  ├─ language-manager.js     # Language detection and switching
│  ├─ platforms.js            # Platform data and categorized resource links
│  ├─ ui-manager.js           # Rendering, counters, cards, and UI updates
│  └─ app.js                  # Application initialization and lifecycle
└─ index.html                 # Main document
```

---

## 🚀 Live Demo

Visit the live version:

[Social Media Deletion Guide](https://imedkablavi.github.io/Social-Media-Deletion-Guide/)

---

## 🌍 Internationalization

The project uses a simple JavaScript-based translation system.

* Browser language detection
* Arabic RTL layout support
* Separate translation content in `translations.js`
* Easy extension through `translations.js` and `language-manager.js`

Current languages:

```text
Arabic / English / French / Turkish
```

---

## 🛠️ Local Development

This is a static web project. No build step is required.

You can open the project directly in a browser:

```text
index.html
```

Or serve it locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

---

## 🚀 Deployment

The project is fully static and can be deployed on:

* GitHub Pages
* Netlify
* Vercel
* Any static hosting provider

For GitHub Pages, publish the repository from the main branch or from the configured Pages source.

---

## 🤝 Contributing

Contributions are welcome.

You can help by:

* Adding new platforms
* Updating official deletion or backup links
* Improving translations
* Fixing layout issues
* Enhancing accessibility

Recommended workflow:

```text
Fork → Create Branch → Make Changes → Open Pull Request
```

Main files to edit:

* Add or update platforms in `js/platforms.js`
* Add or improve translations in `js/translations.js`
* Adjust layout and animations in `css/components.css`

---

## 📜 License

[MIT License](LICENSE) © [Imed Kablavi](https://github.com/imedkablavi)

---

## 💰 Support

If you like this project, you can support it here:

[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge\&logo=buy-me-a-coffee\&logoColor=black)](https://buymeacoffee.com/imed_kablavi)

---
