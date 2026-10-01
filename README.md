# The Sentinel PK (TheSentinalPK)

A modern, broadsheet-style editorial news publication web application inspired by the visual aesthetics, layout conventions, and compact information density of **The Express Tribune** (`tribune.com.pk`).

---

## Features

- **Traditional Broadsheet Identity**: Distinctive editorial typography (*Merriweather* serif headlines, *Playfair Display* masthead, *Inter* UI), crisp dividers, double rules, and restrained red accents (`#b91c1c`).
- **Utility Header & Masthead**:
  - Live formatted publication date & weather widget.
  - Edition switcher (*Pakistan / Global*).
  - Quick utility links (*E-Paper, Videos, Opinion, Contact*).
  - Instant live search modal with keyboard shortcut (`/`).
- **Breaking News Ticker & Financial Markets**:
  - Horizontal ticker with animated pulsing badge and headline carousel.
  - Real-time financial indicators (*KSE-100, S&P 500, PKR/USD, Gold, Brent Crude*).
- **Multi-Column Editorial Grid**:
  - Large photographic lead story.
  - Secondary stories stack with vertical column dividers.
  - Chronological 3-column *Latest News* feed.
  - Editorial sidebar featuring *Trending / Most Read* with numbered rankings (01–05), columnist opinions with author portraits, and digital E-Paper replica promo.
- **Dedicated Category Desks**:
  - Pakistan National Affairs
  - World & International Diplomacy
  - Business & Financial Markets
  - Technology, AI & Science
  - Sports & Cricket
  - Editorials & Columns
  - Life & Style
- **Full Article Reader (SPA Routing)**:
  - Breadcrumbs navigation.
  - Author bylines, verified reporting status, and reading time.
  - Social sharing actions (*X/Twitter, Facebook, WhatsApp, Copy Link*).
  - High-resolution editorial photography with photo captions and credits.
  - Key Takeaways highlight box.
  - Classic drop-cap opening paragraph, pull quotes, and related topic tags.
  - Related stories grid and trending sidebar.
- **Mobile Responsive**: Custom hamburger menu and slide-out navigation drawer.

---

## Project Structure

```text
├── index.html          # Semantic HTML5 newspaper template
├── styles/
│   └── main.css        # Broadsheet editorial stylesheet & design system
├── js/
│   └── app.js          # Client-side router, search engine, ticker & rendering
├── data/
│   └── newsData.js     # Structured mock editorial news dataset
├── server.js           # Zero-dependency Node.js HTTP server
├── package.json        # Project metadata and start scripts
└── README.md           # Documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)

### Running Locally

1. Start the local server:
   ```bash
   npm start
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000/
   ```

---

## License

ISC License.
