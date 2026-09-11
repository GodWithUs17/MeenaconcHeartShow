# Meenaconc Heart Show 💖

A high-performance, responsive landing platform and frontend UI suite engineered for the **Meenaconc Heart Show**—an interactive event experience celebrating romance, matchmaking, and community connection.

---

## 🌟 Event Features & Component Architecture

* **Hero & Landing Section:** Captivating entrance background featuring optimized sunset and couple imagery (`lander-couple-2.jpg`, `silhouette-couple...jpg`).
* **Blind Date Showcase:** Dedicated visual module highlighting the event's signature blind date segment utilizing lightweight WebP assets (`blid date.webp`).
* **Founder Spotlight:** Branded profile showcase honoring the event organizer (`meena founder.jpg` & `meenaconc logo 1.jpg`).
* **Interactive Navigation:** Smooth-scrolling dynamic header with a custom back-to-top button trigger (`chevron-up.png`).
* **Dual-Build Asset Pipeline:** Includes source development files (`Meenaconc.css`, `Meenaconc.js`) alongside pre-minified production bundles (`Meenaconc.min.css`, `Meenaconc.min.js`).

---

## 📂 Project Architecture

```text
MeenaconcHeartShow/
├── asset/                                # Optimized media & visual assets
│   ├── blid date.webp                    # Blind Date section feature graphic
│   ├── chevron-up.png                    # Scroll-to-top dynamic control icon
│   ├── lander-couple-2.jpg               # Primary hero banner image
│   ├── meena founder.jpg                 # Organizer & founder profile media
│   ├── meenaconc logo 1.jpg              # Official event branding logo
│   └── silhouette-couple-...jpg          # Secondary thematic background
├── index.html                            # Core DOM layout & semantic markup
├── Meenaconc.css                         # Source design system & layout styles
├── Meenaconc.js                          # Client-side interactive logic
├── Meenaconc.min.css                     # Production-minified stylesheet
├── Meenaconc.min.js                      # Production-minified script bundle
└── .gitignore                            # Version control exclusion rules

```

---

## ⚡ Technical Specification

### Tech Stack

* **Markup:** Semantic HTML5 (`index.html`) optimized for search engines and accessibility.
* **Styling:** Custom CSS3 utilizing responsive flex/grid layouts, keyframe animations, and custom UI components.
* **Scripting:** Vanilla ES6+ JavaScript handling dynamic DOM manipulation and UI event listeners.

### Production Setup

In `index.html`, load the minified assets to maintain low page latency:

```html
<!-- Stylesheet Bundle -->
<link rel="stylesheet" href="Meenaconc.min.css">

<!-- Script Bundle -->
<script src="Meenaconc.min.js" defer></script>

```

---

## 🚀 Quick Start & Local Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/your-username/MeenaconcHeartShow.git](https://github.com/your-username/MeenaconcHeartShow.git)
cd MeenaconcHeartShow

```


2. **Run locally:**
Open `index.html` directly in your browser or run via **VS Code Live Server**.

---

## ⚠️ Recommended Code Hygiene

To prevent broken image paths on Linux hosting servers (Vercel, Render, Netlify):

* **Rename Spaced Assets:** Change filenames like `blid date.webp` to `blind-date.webp` and `meena founder.jpg` to `meena-founder.jpg`. Update their corresponding references inside `index.html` and `Meenaconc.css`.

---

## 👤 Author

**Emmanuel Oguntoke**

*Full-Stack Web Developer*

* **GitHub:** [@emmanueloguntoke](https://www.google.com/search?q=https://github.com/GodWithUs17)
* **LinkedIn:** [Emmanuel Oguntoke](https://www.google.com/search?q=https://linkedin.com/in/oguntoke-emmanuel)

---

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

```

```
