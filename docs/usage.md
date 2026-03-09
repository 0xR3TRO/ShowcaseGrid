# Usage Guide

This document explains how to embed ShowcaseGrid in any web page or project.

---

## Quick Start

### 1. Include the Files

Copy `styles.css`, `script.js`, and the `data/` folder into your project. Then add the following to your HTML:

```html
<link rel="stylesheet" href="path/to/styles.css" />
<script src="path/to/script.js"></script>
```

### 2. Add the Container Markup

Place the following HTML where you want the grid to appear:

```html
<div id="showcase-grid-root">
    <!-- Search + Sort -->
    <div class="sg-toolbar">
        <div class="sg-toolbar__top">
            <div class="sg-search">
                <svg
                    class="sg-search__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    class="sg-search__input"
                    id="sg-search"
                    placeholder="Search items..."
                    autocomplete="off"
                />
                <button class="sg-search__clear" aria-label="Clear search">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
            <div class="sg-sort">
                <select
                    class="sg-sort__select"
                    id="sg-sort"
                    aria-label="Sort items"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="a-z">A → Z</option>
                    <option value="z-a">Z → A</option>
                </select>
            </div>
        </div>
        <div class="sg-toolbar__bottom">
            <div class="sg-filters" id="sg-category-filters">
                <span class="sg-filters__label">Category:</span>
            </div>
        </div>
        <div class="sg-toolbar__bottom">
            <div class="sg-filters" id="sg-tag-filters">
                <span class="sg-filters__label">Tags:</span>
            </div>
        </div>
    </div>

    <!-- Results info -->
    <div class="sg-results-info" id="sg-results-info"></div>

    <!-- Grid -->
    <div class="sg-grid" id="sg-grid"></div>

    <!-- Load More -->
    <div class="sg-load-more" id="sg-load-more" style="display: none;">
        <button class="sg-load-more__btn">Load more</button>
    </div>

    <!-- Modal -->
    <div class="sg-modal-overlay" id="sg-modal-overlay">
        <div class="sg-modal" role="dialog" aria-modal="true"></div>
    </div>
</div>
```

### 3. Initialize

ShowcaseGrid initializes automatically on `DOMContentLoaded`. If you need manual control:

```html
<script>
    document.addEventListener("DOMContentLoaded", () => {
        ShowcaseGrid.init({
            dataUrl: "path/to/your/items.json",
            itemsPerPage: 8,
        });
    });
</script>
```

---

## Customizing the Data Source

By default, ShowcaseGrid loads items from `data/items.json`. You can point to a different file:

```js
ShowcaseGrid.init({
    dataUrl: "https://api.example.com/items.json",
});
```

The JSON must follow the structure described in [configuration.md](configuration.md).

---

## Customizing Styles

All CSS uses custom properties defined in `:root`. Override them in your own stylesheet:

```css
:root {
    --sg-accent: #e11d48;
    --sg-accent-hover: #be123c;
    --sg-radius-lg: 8px;
    --sg-max-width: 1400px;
}
```

You can also override the dark theme palette under `[data-theme="dark"]`.

---

## Selective Embedding

You can omit optional parts of the markup:

- **No search bar**: Remove the `.sg-search` div.
- **No sorting**: Remove the `.sg-sort` div.
- **No category filters**: Remove the `#sg-category-filters` div.
- **No tag filters**: Remove the `#sg-tag-filters` div.
- **No load more**: Remove the `#sg-load-more` div (all items will render at once if `itemsPerPage` is set high enough).

---

## Theme Toggle

To add the light/dark toggle, include this button anywhere on the page:

```html
<button class="sg-theme-toggle" id="sg-theme-toggle" aria-label="Toggle theme">
    <svg
        class="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
    <svg
        class="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
</button>
```

The preference is automatically saved to `localStorage` under the key `sg-theme`.
