# ShowcaseGrid

**A lightweight, reusable showcase grid component** built with vanilla HTML, CSS, and JavaScript. ShowcaseGrid provides a clean, responsive card-based layout for displaying projects, articles, modules, and any other collection of items — ready to drop into any web page.

No frameworks. No dependencies. Just plug and play.

![ShowcaseGrid Preview](assets/thumbnails/thumb-01.svg)

---

## Features

- **Responsive Grid Layout** — Automatically adjusts columns from 1 to 3+ based on viewport width.
- **Category & Tag Filters** — Filter items by category and tags with a single click.
- **Full-text Search** — Instant search across titles, subtitles, descriptions, and tags.
- **Sorting** — Sort by newest, oldest, A–Z, or Z–A.
- **Detail Modal** — Click any card to view extended details in a smooth modal overlay.
- **Light / Dark Theme** — Built-in toggle with `localStorage` persistence.
- **Load More Pagination** — Progressive loading with a configurable page size.
- **Empty State Handling** — Friendly message and reset button when no results match.
- **Hover Effects** — Subtle card lift, shadow transitions, and thumbnail zoom on hover.
- **Keyboard Accessible** — Cards, modal, and controls are fully keyboard navigable with visible focus states.
- **Zero Dependencies** — Pure HTML, CSS, and JavaScript.

---

## Repository Structure

```
ShowcaseGrid/
├── index.html              Main demo page
├── styles.css              All styles (light/dark themes, responsive)
├── script.js               Application logic (modular architecture)
├── data/
│   └── items.json          Sample showcase data
├── assets/
│   ├── icons/              SVG icons (search, close, sun, moon, etc.)
│   └── thumbnails/         Placeholder thumbnail graphics (SVG)
├── docs/
│   ├── usage.md            How to embed ShowcaseGrid in any page
│   ├── configuration.md    Data structure & configuration options
│   └── integration.md      Integration examples for various project types
└── README.md               This file
```

---

## Getting Started

### Option A — Open Directly

Simply open `index.html` in a web browser. ShowcaseGrid loads data from `data/items.json` via `fetch()`, so you may need a local server if your browser blocks file:// requests.

### Option B — Local Server

Use any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

---

## Customization

### Changing Data

Replace or edit `data/items.json` with your own items. Each item requires these fields:

```json
{
    "id": 1,
    "title": "Item Title",
    "subtitle": "Short tagline",
    "description": "Full description text.",
    "tags": ["Tag1", "Tag2"],
    "category": "CategoryName",
    "link": "https://example.com",
    "thumbnail": "assets/thumbnails/thumb-01.svg",
    "date": "2025-01-15"
}
```

Categories and tags are extracted automatically — no extra configuration needed.

### Changing Styles

All visual properties use CSS custom properties. Override them in your own stylesheet:

```css
:root {
    --sg-accent: #e11d48; /* Primary color */
    --sg-max-width: 1400px; /* Container width */
    --sg-grid-gap: 32px; /* Gap between cards */
    --sg-radius-lg: 12px; /* Card border radius */
}
```

See `styles.css` for the full list of variables.

### Changing Behavior

Pass options when initializing:

```js
ShowcaseGrid.init({
    dataUrl: "path/to/custom-data.json",
    itemsPerPage: 12,
});
```

---

## Use Cases

- **Portfolio** — Showcase design work, development projects, or creative pieces.
- **Gallery** — Display image collections, photography, or artwork with metadata.
- **Feature List** — Present product features, integrations, or service offerings.
- **Case Studies** — Highlight client work, success stories, or research entries.
- **Blog/Article Index** — Filterable, searchable listing of written content.
- **Documentation Hub** — Organize guides, tutorials, and reference materials.
- **Admin Dashboard Widget** — Embed as a content overview panel.

---

## Script Architecture

`script.js` is organized into focused modules inside a single IIFE (`ShowcaseGrid`):

| Module       | Responsibility                                              |
| ------------ | ----------------------------------------------------------- |
| `State`      | Centralized reactive state store.                           |
| `DataLoader` | Fetches and parses `items.json`, extracts categories/tags.  |
| `Filters`    | Applies category and tag filters to the item list.          |
| `Search`     | Full-text search across title, subtitle, description, tags. |
| `Sorting`    | Sorts items by date or alphabetical order.                  |
| `Render`     | Generates card HTML, grid, empty states, load-more UI.      |
| `UIHelpers`  | Modal management, theme toggle, debounce, UI sync.          |
| `Pipeline`   | Orchestrates: filter → search → sort → render.              |

---

## Future Improvements

- [ ] **API Integration** — Load data from REST APIs or GraphQL endpoints.
- [ ] **Lazy Loading** — Intersection Observer for images and cards.
- [ ] **Infinite Scroll** — Automatic loading as the user scrolls.
- [ ] **Premium Animations** — Staggered card entrance, page transitions, micro-interactions.
- [ ] **Masonry Layout** — Optional masonry grid for varied card heights.
- [ ] **npm Package** — Publish as an installable module (`npm install showcase-grid`).
- [ ] **Web Component** — Encapsulate as a custom element (`<showcase-grid>`).
- [ ] **TypeScript Rewrite** — Type-safe source with declaration files.
- [ ] **i18n Support** — Localization for labels, dates, and empty states.
- [ ] **Bookmark/Favorites** — Allow users to mark and filter favorite items.

---

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2025 ShowcaseGrid Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
