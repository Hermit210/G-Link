# G-Link – Send Gold, Spread Blessings

A working demo of the G-Link platform: Gold Links (Tiplink for Gold), Wedding Registries, Family Tree visualization, and Smart Vaults.

## Features

- **Homepage** – Landing page with value proposition, how it works, live metrics, and use cases
- **Gold Links** – Create sharable gold gift links with amount, message, and theme
- **Claiming Experience** – Recipients claim gold via vault, cash out, or crypto
- **Wedding Registry** – Guest view with family tree placeholder and blessing contribution
- **Dashboard** – Vault overview, gold links sent, recent activity, portfolio metrics

## Tech Stack

HTML, CSS, JavaScript (no build step). Data persists in `localStorage` for demo purposes.

## Run the Demo

1. Open `index.html` in a browser, or serve the folder locally:
   ```bash
   npx serve .
   ```
   or use any static file server.

2. Navigate through:
   - **Create Gold Link** → Fill form → Redirects to claim page
   - **Claim** → Choose option → Confirms and updates dashboard
   - **Wedding Registry** → Click "Bless Us With Gold" → Add contribution
   - **Dashboard** → View vault, links, and activity

## Color Theme

All colors are gold-related:
- Primary: `#D4AF37`
- Dark: `#B8860B`
- Light: `#FFD700`
- Backgrounds: dark brown/gold tones

## Responsive

Layout adapts to mobile, tablet, and desktop via CSS Grid and flexible layouts.
