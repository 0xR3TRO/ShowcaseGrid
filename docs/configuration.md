# Configuration Guide

This document describes the data structure and configuration options for ShowcaseGrid.

---

## Data Structure (`items.json`)

ShowcaseGrid expects a JSON file with the following root structure:

```json
{
  "items": [ ... ]
}
```

### Item Fields

Each item in the `items` array supports the following fields:

| Field         | Type       | Required | Description                                        |
| ------------- | ---------- | -------- | -------------------------------------------------- |
| `id`          | `number`   | Yes      | Unique identifier for the item.                    |
| `title`       | `string`   | Yes      | Display title of the item.                         |
| `subtitle`    | `string`   | Yes      | Short secondary heading.                           |
| `description` | `string`   | Yes      | Full description text. Shown in cards and modal.   |
| `tags`        | `string[]` | Yes      | Array of tag labels (e.g., `["CSS", "Layout"]`).   |
| `category`    | `string`   | Yes      | Category label (e.g., `"Projects"`, `"Articles"`). |
| `link`        | `string`   | Yes      | URL the "View more" button points to.              |
| `thumbnail`   | `string`   | Yes      | Path or URL to a thumbnail image.                  |
| `date`        | `string`   | Yes      | ISO date string (`YYYY-MM-DD`) for sorting.        |

### Example Item

```json
{
    "id": 1,
    "title": "Weather Dashboard",
    "subtitle": "Real-time Weather Tracking App",
    "description": "A comprehensive weather dashboard displaying current conditions...",
    "tags": ["JavaScript", "API", "Charts", "Responsive"],
    "category": "Projects",
    "link": "https://example.com/weather",
    "thumbnail": "assets/thumbnails/thumb-01.svg",
    "date": "2025-12-15"
}
```

---

## Adding Categories

Categories are automatically extracted from the `category` field of all items. To add a new category, simply set the `category` field of a new item to the desired value:

```json
{
  "id": 13,
  "title": "My New Tutorial",
  "category": "Tutorials",
  ...
}
```

A "Tutorials" filter button will appear automatically.

---

## Adding Tags

Tags are also extracted automatically from all items. Add any new tag string to the `tags` array:

```json
{
    "tags": ["TypeScript", "React", "Testing"]
}
```

New tags will appear in the tag filter bar.

---

## Configuration Options

When initializing ShowcaseGrid, you can pass an options object:

```js
ShowcaseGrid.init({
    dataUrl: "data/items.json", // Path to your JSON data file
    itemsPerPage: 6, // Number of items to show per page/load
});
```

### Available Options

| Option         | Type     | Default             | Description                         |
| -------------- | -------- | ------------------- | ----------------------------------- |
| `dataUrl`      | `string` | `'data/items.json'` | Path or URL to the data source.     |
| `itemsPerPage` | `number` | `6`                 | Items displayed before "Load more". |

---

## Default Sorting

The default sort order is `"newest"` (by date, descending). Available sort values:

| Value    | Description              |
| -------- | ------------------------ |
| `newest` | Most recent first.       |
| `oldest` | Oldest first.            |
| `a-z`    | Alphabetical ascending.  |
| `z-a`    | Alphabetical descending. |

To change the default, modify `CONFIG.defaultSort` inside `script.js`:

```js
const CONFIG = {
  defaultSort: 'a-z',
  ...
};
```

---

## Thumbnail Guidelines

- Recommended size: **400 × 240 px** (or any 5:3 ratio).
- Supported formats: SVG, PNG, JPG, WebP.
- Thumbnails are displayed with `object-fit: cover`.
- Use placeholder SVGs (included in `/assets/thumbnails/`) for testing.

---

## CSS Custom Properties

Override these in your stylesheet to customize the appearance:

```css
:root {
    /* Colors */
    --sg-accent: #4f46e5;
    --sg-accent-hover: #4338ca;
    --sg-bg: #ffffff;
    --sg-bg-card: #ffffff;
    --sg-text: #1a1a2e;

    /* Layout */
    --sg-max-width: 1200px;
    --sg-grid-gap: 24px;

    /* Borders */
    --sg-radius-sm: 6px;
    --sg-radius-md: 10px;
    --sg-radius-lg: 16px;

    /* Transitions */
    --sg-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

See `styles.css` for the full list of custom properties.
