# Integration Guide

This document shows how to integrate ShowcaseGrid into different types of projects.

---

## 1. Simple Portfolio Page

Use ShowcaseGrid as the main content of a personal or team portfolio.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Portfolio</title>
        <link rel="stylesheet" href="styles.css" />
        <style>
            .portfolio-header {
                text-align: center;
                padding: 60px 24px 20px;
                max-width: 800px;
                margin: 0 auto;
            }
            .portfolio-header h1 {
                font-size: 2.5rem;
            }
            .portfolio-header p {
                color: #666;
                margin-top: 8px;
            }
        </style>
    </head>
    <body>
        <div class="portfolio-header">
            <h1>My Work</h1>
            <p>A collection of recent projects and experiments.</p>
        </div>

        <div class="sg-container">
            <div class="sg-toolbar">
                <div class="sg-toolbar__top">
                    <div class="sg-search">
                        <svg
                            class="sg-search__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            class="sg-search__input"
                            id="sg-search"
                            placeholder="Search..."
                            autocomplete="off"
                        />
                        <button class="sg-search__clear" aria-label="Clear">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div class="sg-sort">
                        <select class="sg-sort__select" id="sg-sort">
                            <option value="newest">Newest</option>
                            <option value="a-z">A→Z</option>
                        </select>
                    </div>
                </div>
                <div class="sg-toolbar__bottom">
                    <div class="sg-filters" id="sg-category-filters">
                        <span class="sg-filters__label">Category:</span>
                    </div>
                </div>
            </div>
            <div class="sg-results-info" id="sg-results-info"></div>
            <div class="sg-grid" id="sg-grid"></div>
            <div class="sg-load-more" id="sg-load-more" style="display:none">
                <button class="sg-load-more__btn">Load more</button>
            </div>
            <div class="sg-modal-overlay" id="sg-modal-overlay">
                <div class="sg-modal" role="dialog" aria-modal="true"></div>
            </div>
        </div>

        <script src="script.js"></script>
        <script>
            document.addEventListener("DOMContentLoaded", () => {
                ShowcaseGrid.init({
                    dataUrl: "data/items.json",
                    itemsPerPage: 9,
                });
            });
        </script>
    </body>
</html>
```

---

## 2. Admin Dashboard Widget

Embed ShowcaseGrid as a widget inside an admin panel to display recent projects or content entries.

```html
<div class="dashboard-panel">
    <h2>Recent Content</h2>

    <!-- Minimal ShowcaseGrid -->
    <div class="sg-container" style="--sg-max-width: 100%;">
        <div class="sg-toolbar">
            <div class="sg-toolbar__top">
                <div class="sg-search">
                    <svg
                        class="sg-search__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        class="sg-search__input"
                        id="sg-search"
                        placeholder="Filter content..."
                        autocomplete="off"
                    />
                    <button class="sg-search__clear" aria-label="Clear">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="sg-results-info" id="sg-results-info"></div>
        <div class="sg-grid" id="sg-grid"></div>
        <div class="sg-load-more" id="sg-load-more" style="display:none">
            <button class="sg-load-more__btn">Show more</button>
        </div>
        <div class="sg-modal-overlay" id="sg-modal-overlay">
            <div class="sg-modal" role="dialog" aria-modal="true"></div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="styles.css" />
<script src="script.js"></script>
<script>
    ShowcaseGrid.init({ dataUrl: "/api/content.json", itemsPerPage: 4 });
</script>
```

Tip: Override `--sg-max-width: 100%` so the grid fills the dashboard panel.

---

## 3. Product Feature Showcase

Display features, integrations, or product modules on a marketing page.

```html
<section class="features-section">
    <div class="sg-container">
        <h2 style="text-align:center; margin-bottom:16px;">
            Features &amp; Integrations
        </h2>

        <!-- Category filters only (no search or sort) -->
        <div class="sg-toolbar">
            <div class="sg-toolbar__bottom">
                <div class="sg-filters" id="sg-category-filters">
                    <span class="sg-filters__label">Filter:</span>
                </div>
            </div>
        </div>
        <div class="sg-results-info" id="sg-results-info"></div>
        <div class="sg-grid" id="sg-grid"></div>
        <div class="sg-load-more" id="sg-load-more" style="display:none">
            <button class="sg-load-more__btn">See more features</button>
        </div>
        <div class="sg-modal-overlay" id="sg-modal-overlay">
            <div class="sg-modal" role="dialog" aria-modal="true"></div>
        </div>
    </div>
</section>

<link rel="stylesheet" href="styles.css" />
<style>
    /* Product page overrides */
    :root {
        --sg-accent: #059669;
        --sg-accent-hover: #047857;
        --sg-radius-lg: 12px;
    }
</style>
<script src="script.js"></script>
<script>
    ShowcaseGrid.init({ dataUrl: "data/features.json", itemsPerPage: 12 });
</script>
```

---

## 4. Documentation / Knowledge Base

Use ShowcaseGrid to present documentation entries, guides, or tutorials:

```html
<div class="docs-wrapper">
    <aside class="docs-sidebar">
        <!-- Your sidebar navigation -->
    </aside>

    <main class="docs-content">
        <h1>Documentation</h1>

        <div class="sg-container" style="--sg-max-width: 100%; padding: 0;">
            <div class="sg-toolbar">
                <div class="sg-toolbar__top">
                    <div class="sg-search">
                        <svg
                            class="sg-search__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            class="sg-search__input"
                            id="sg-search"
                            placeholder="Search docs..."
                            autocomplete="off"
                        />
                        <button class="sg-search__clear" aria-label="Clear">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div class="sg-sort">
                        <select class="sg-sort__select" id="sg-sort">
                            <option value="a-z">A→Z</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
                <div class="sg-toolbar__bottom">
                    <div class="sg-filters" id="sg-category-filters">
                        <span class="sg-filters__label">Section:</span>
                    </div>
                </div>
                <div class="sg-toolbar__bottom">
                    <div class="sg-filters" id="sg-tag-filters">
                        <span class="sg-filters__label">Topic:</span>
                    </div>
                </div>
            </div>
            <div class="sg-results-info" id="sg-results-info"></div>
            <div class="sg-grid" id="sg-grid"></div>
            <div class="sg-load-more" id="sg-load-more" style="display:none">
                <button class="sg-load-more__btn">Load more guides</button>
            </div>
            <div class="sg-modal-overlay" id="sg-modal-overlay">
                <div class="sg-modal" role="dialog" aria-modal="true"></div>
            </div>
        </div>
    </main>
</div>

<link rel="stylesheet" href="styles.css" />
<script src="script.js"></script>
<script>
    ShowcaseGrid.init({ dataUrl: "data/docs.json" });
</script>
```

---

## Tips for Integration

- **CSS isolation**: All ShowcaseGrid classes are prefixed with `sg-`. Conflicts with your existing styles are unlikely.
- **Multiple instances**: Currently, ShowcaseGrid uses fixed DOM element IDs. For multiple instances, duplicate and rename the IDs and call `init()` per instance (requires minor script modifications).
- **Performance**: For large datasets (100+ items), consider implementing server-side pagination or lazy loading through a custom data loader.
- **Accessibility**: ShowcaseGrid includes keyboard navigation, ARIA attributes, and focus states. Ensure your surrounding markup follows similar practices.
