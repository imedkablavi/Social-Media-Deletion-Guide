<div align="center">
<h1>🛡️ Social Media Deletion Guide<br>دليل حذف وإدارة الحسابات</h1>
<p><strong>Find • Export • Secure • Delete</strong><br>Multi‑language privacy toolkit to reach official deletion / backup / security pages fast.</p>
<p>
<img src="https://img.shields.io/badge/Platforms-50%2B-blueviolet" />
<img src="https://img.shields.io/badge/Languages-AR | EN | FR | TR-green" />
<img src="https://img.shields.io/badge/Design-Animated%20UI-orange" />
</p>
</div>

## ✨ Highlights
* 4 Languages: Arabic (RTL), English, French, Turkish (auto-detect + manual switch)
* 50+ Platforms (Social • Messaging • Services • Gaming • Productivity)
* Smart Search + Live Stats + Animated Counters
* Grouped Resources (Delete / Backup / Security / Settings / Guides / Tools)
* Modern Hero + Floating Glass Shapes + Glow Layers
* Animated Footer (Marquee + Gradient Text + Scroll-To-Top)
* Single CSS Architecture (scalable, effects-rich)
* Modular JS (data / i18n / UI / app bootstrap)
* RTL / LTR aware + semantic structure
* Extensible for new languages & platforms

## 📂 Structure
```
p/
  css/components.css        # All styling (layout, animations, hero, footer, cards)
  js/translations.js        # i18n content (AR/EN/FR/TR)
  js/language-manager.js    # Detection + switching + DOM binding
  js/platforms.js           # Platforms + categorized resources
  js/ui-manager.js          # Rendering + interactions + animations
  js/app.js                 # Initialization + lifecycle + observers
  index.html                # Main document
```

## 🌍 Internationalization (i18n)
Auto-detects language using browser locale. Arabic triggers RTL direction + layout flip. Text nodes carry `data-key` attributes for easy runtime swapping.

Add a language:
1. Add entry to `translations`.
2. Add code to `supportedLangs` in `language-manager.js`.
3. Provide platform name map under `platforms` key.

## 🧩 Data Model (Platform Entry Example)
```js
{
  id: "twitter",
  name: "twitter",           // translation key
  icon: "fab fa-x-twitter",  // Font Awesome icon
  color: "#000000",          // Accent color
  category: "social",        // Category key
  resources: [
    {
      url: "https://...",
      title: { ar: "...", en: "...", fr: "..." },
      type: "delete"          // One of resourceTypes
    }
  ]
}
```

## ➕ Add a Platform
1. Edit `platforms.js` → push new object (id, name, icon, color, category, resources[]).
2. Add its display name in each language (`translations.platforms`).
3. (Optional) Extend `resourceTypes` if a new type is needed.

## 🎨 Visual & Motion System
| Area      | Effects |
|-----------|---------|
| Hero      | Glow circles, floating glass tiles, rotating ring, gradient title |
| Counters  | Eased incremental number animation |
| Cards     | Staggered entrance, scale feedback on select |
| Footer    | Marquee, gradient text cycle, ambient blobs, scroll-to-top |
| Resources | Type-colored border + icon taxonomy |

Reduced motion support can be added by toggling a `reduce-animations` class (scaffolding prepared).

## ♿ Accessibility Notes
- Semantic grouping of sections.
- Focus outlines preserved.
- Color contrasts chosen for dark surfaces.
- Screen-reader friendly text via visible labels.

## 🚀 Performance Tips
- All scripts deferred at bottom.
- Minimal DOM reflows (batch innerHTML updates, then animate).
- Optionally convert large glow layers to static PNG for ultra-low-end devices.

## 🔐 Resource Types
Defined in `platforms.js`:
- delete, disable, backup, security, settings, manage, guide, tools
Each has: localized label, icon, and color.

## � Roadmap (Ideas)
* Persist selected platforms (localStorage sync)
* Theme toggle (light / dark)
* Category filter chips
* PWA + offline caching
* Export (PDF / JSON) selected resources
* Favorite / star platforms
* Reduced-motion automatic detection

## ✅ Quick Test
- Change language: all static text + platform names update.
- Search input: filters platforms live (try partials & case-insensitive).
- Select multiple platforms: resources section groups by type.
- Reset button: clears selection + stats update.
- Scroll: hero fades into content smoothly.
- Footer marquee animates & pauses on hover.

## 🧵 Styling Conventions
- Single authoritative stylesheet: `components.css`.
- Custom properties (CSS variables) could be centralized (future refactor).
- Utility animation keyframes grouped by feature region.

## 🔍 Dev Helpers
In console:
```js
app.debug();
uiManager.selectedPlatforms;
languageManager.getCurrentLanguage();
```

## 👤 Credits
Data concept & attribution tag (translations)
GitHub Profile: https://github.com/imedkablavi
Interface & structural implementation: automated generation workflow.

## 📜 License
Add a `LICENSE` file (MIT recommended) before publishing publicly.

## ✅ Deployment
Static hosting compatible (GitHub Pages / Netlify / Vercel). Just deploy the `/p` directory contents maintaining structure.

## ⚠️ Disclaimer
Links provided point to official or commonly referenced support / account removal pages. Always verify current validity, as platforms frequently update URLs and flows.

---
Contributions (new platforms / languages) are welcome. Fork → Extend → PR.
