# Arshi Enterprises (arshigps.com) - Dark Neon Smart City Website

A high-converting, static website redesign for **Arshi Enterprises (arshigps.com)** built in the **Dark Neon Isometric "Smart City" Theme** featuring an interactive Three.js 3D diorama city with live GPS pulse beacons, glassmorphism cards, and instant WhatsApp inquiry routing.

---

## 🎨 Design System Overview

- **Base Colors:** Deep Midnight Indigo (`#0a0630`), Alternating Sections (`#140d5c`)
- **Accents:** Warm Amber (`#e3ab84` / `#ff9452`), Electric Blue (`#3f6bff`), Cyan (`#4bc0ff`), Magenta (`#ff79e0`)
- **Typography:** Google Fonts `'Outfit'` (400, 500, 600, 700, 800)
- **Cards:** Glassmorphism with `rgba(20, 12, 80, 0.55)` background, `backdrop-filter: blur(16px)`, `1px border #3a2f9a`, and `14px border radius`. On hover: lifts 6px, border turns warm amber `#e3ab84` with ambient neon glow.
- **Buttons:** Pill-shaped with amber gradient for primary actions and electric blue outline for secondary actions.
- **Motion:** Smooth animations with full `prefers-reduced-motion` compliance.

---

## 📁 File Structure

```text
├── index.html        # Main HTML structure with semantic tags, SEO, and Open Graph metadata
├── style.css         # Complete CSS design system, glassmorphism, buttons, responsive rules
├── main.js           # Vanilla JS for WhatsApp enquiry triggers, FAQ accordion, category filter
├── neon-city.js      # Three.js 3D isometric city diorama with live GPS pins and orbit controls
├── assets/
│   └── images/       # All product images, logos, and icons
└── README.md         # Documentation & deployment guide
```

---

## ⚙️ How to Customize Placeholders

Search and replace the following placeholders in `index.html` and `main.js`:

| Placeholder | Description | Current Value |
| :--- | :--- | :--- |
| `{{PHONE}}` | Display Phone Number | `+91 77828 08063` |
| `{{WHATSAPP_NUMBER}}` | WhatsApp number for chat links (country code without `+` or spaces) | `917782808063` |

### In `main.js`:
Modify the `CONFIG` object at the top of `main.js`:
```javascript
const CONFIG = {
  PHONE: '+91 77828 08063',
  PHONE_RAW: '917782808063',
  WHATSAPP_NUMBER: '917782808063',
  EMAIL: 'arshiranjeet133@gmail.com',
  ADDRESS: 'Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India'
};
```

---

## 🚀 Netlify Deployment Steps

### Option A: Netlify Drop (Instant Drag & Drop - No CLI Needed)
1. Log in to your [Netlify Dashboard](https://app.netlify.com/).
2. Click on **"Sites"** and scroll to the bottom to find the **"Want to deploy a new site without connecting to Git? Drag and drop your site folder here"** area.
3. Drag and drop this website folder (containing `index.html`, `style.css`, `main.js`, `neon-city.js`, and `assets/`).
4. Netlify will upload and provide your live URL in seconds!

### Option B: GitHub / GitLab Repository
1. Push this folder to your GitHub repository.
2. In Netlify, click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Set:
   - **Build Command:** *(Leave blank - this is a pure static site)*
   - **Publish directory:** `.` (or root folder)
5. Click **"Deploy Site"**.

### Option C: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.
```

---

## ⚡ Performance & Mobile Optimizations

1. **Lazy Loading 3D City:** Loaded asynchronously so the initial page renders instantly.
2. **Battery & Power Saver:** Uses `IntersectionObserver` to pause Three.js rendering when scrolled away, and pauses when browser tab is inactive.
3. **Mobile Device Throttle:** Automatically reduces car count to 16 and caps pixel ratio at 1.25 on smartphones to run butter-smooth on budget Android phones without heating.
4. **Pre-filled WhatsApp Inquiries:** Every product button automatically pre-fills the exact model name and price into WhatsApp for high lead conversion.
