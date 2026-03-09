/* ============================================
   ShowcaseGrid — script.js
   Modular showcase/portfolio grid component.
   ============================================ */

const ShowcaseGrid = (() => {
    "use strict";

    /* ----------------------------------------
     CONFIG
  ---------------------------------------- */
    const CONFIG = {
        dataUrl: "data/items.json",
        itemsPerPage: 6,
        defaultSort: "newest",
        animationDelay: 60,
        searchDebounce: 250,
    };

    /* ----------------------------------------
     STATE MODULE
  ---------------------------------------- */
    const State = (() => {
        let _state = {
            allItems: [],
            filteredItems: [],
            displayedCount: 0,
            searchQuery: "",
            activeCategory: "All",
            activeTag: "All",
            sortOrder: CONFIG.defaultSort,
            categories: [],
            tags: [],
        };

        const listeners = [];

        return {
            get(key) {
                return key ? _state[key] : { ..._state };
            },
            set(updates) {
                Object.assign(_state, updates);
                listeners.forEach((fn) => fn(_state));
            },
            subscribe(fn) {
                listeners.push(fn);
            },
            reset() {
                _state.searchQuery = "";
                _state.activeCategory = "All";
                _state.activeTag = "All";
                _state.sortOrder = CONFIG.defaultSort;
                _state.displayedCount = 0;
            },
        };
    })();

    /* ----------------------------------------
     DATA LOADER MODULE
  ---------------------------------------- */
    const DataLoader = (() => {
        async function load(url) {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`Failed to load data from ${url}`);
            const json = await resp.json();
            return json.items || [];
        }

        function extractCategories(items) {
            const cats = new Set(items.map((i) => i.category));
            return ["All", ...Array.from(cats).sort()];
        }

        function extractTags(items) {
            const tags = new Set(items.flatMap((i) => i.tags));
            return ["All", ...Array.from(tags).sort()];
        }

        return { load, extractCategories, extractTags };
    })();

    /* ----------------------------------------
     FILTERS MODULE
  ---------------------------------------- */
    const Filters = (() => {
        function byCategory(items, category) {
            if (category === "All") return items;
            return items.filter((i) => i.category === category);
        }

        function byTag(items, tag) {
            if (tag === "All") return items;
            return items.filter((i) => i.tags.includes(tag));
        }

        function apply(items) {
            const state = State.get();
            let result = byCategory(items, state.activeCategory);
            result = byTag(result, state.activeTag);
            return result;
        }

        return { byCategory, byTag, apply };
    })();

    /* ----------------------------------------
     SEARCH MODULE
  ---------------------------------------- */
    const Search = (() => {
        function execute(items, query) {
            if (!query || !query.trim()) return items;
            const q = query.trim().toLowerCase();
            return items.filter((item) => {
                const titleMatch = item.title.toLowerCase().includes(q);
                const descMatch = item.description.toLowerCase().includes(q);
                const subtitleMatch = item.subtitle.toLowerCase().includes(q);
                const tagMatch = item.tags.some((t) =>
                    t.toLowerCase().includes(q),
                );
                return titleMatch || descMatch || subtitleMatch || tagMatch;
            });
        }

        return { execute };
    })();

    /* ----------------------------------------
     SORTING MODULE
  ---------------------------------------- */
    const Sorting = (() => {
        const strategies = {
            newest: (a, b) => new Date(b.date) - new Date(a.date),
            oldest: (a, b) => new Date(a.date) - new Date(b.date),
            "a-z": (a, b) => a.title.localeCompare(b.title),
            "z-a": (a, b) => b.title.localeCompare(a.title),
        };

        function sort(items, order) {
            const fn = strategies[order];
            if (!fn) return items;
            return [...items].sort(fn);
        }

        return { sort };
    })();

    /* ----------------------------------------
     RENDER MODULE
  ---------------------------------------- */
    const Render = (() => {
        function escapeHtml(str) {
            const div = document.createElement("div");
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        function card(item, index) {
            const el = document.createElement("article");
            el.className = "sg-card";
            el.setAttribute("tabindex", "0");
            el.setAttribute("role", "button");
            el.setAttribute(
                "aria-label",
                `View details for ${escapeHtml(item.title)}`,
            );
            el.style.animationDelay = `${index * CONFIG.animationDelay}ms`;

            const tagsHtml = item.tags
                .map((t) => `<span class="sg-tag">${escapeHtml(t)}</span>`)
                .join("");

            const dateStr = new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            el.innerHTML = `
        <div class="sg-card__thumbnail">
          <img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>
        <div class="sg-card__body">
          <div class="sg-card__category">${escapeHtml(item.category)}</div>
          <h3 class="sg-card__title">${escapeHtml(item.title)}</h3>
          <p class="sg-card__subtitle">${escapeHtml(item.subtitle)}</p>
          <p class="sg-card__description">${escapeHtml(item.description)}</p>
          <div class="sg-card__tags">${tagsHtml}</div>
          <div class="sg-card__footer">
            <span class="sg-card__link">
              View more
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
            <span class="sg-card__date">${dateStr}</span>
          </div>
        </div>
      `;

            el.addEventListener("click", () => UIHelpers.openModal(item));
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    UIHelpers.openModal(item);
                }
            });

            return el;
        }

        function grid(items, count) {
            const gridEl = document.getElementById("sg-grid");
            gridEl.innerHTML = "";

            const visible = items.slice(0, count);

            if (visible.length === 0) {
                gridEl.appendChild(emptyState());
                return;
            }

            visible.forEach((item, i) => {
                gridEl.appendChild(card(item, i));
            });
        }

        function emptyState() {
            const el = document.createElement("div");
            el.className = "sg-empty";
            el.innerHTML = `
        <svg class="sg-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
        <h3 class="sg-empty__title">No items found</h3>
        <p class="sg-empty__text">Try adjusting your search or filters to find what you're looking for.</p>
        <button class="sg-empty__btn" id="sg-reset-filters">Reset all filters</button>
      `;

            const resetBtn = el.querySelector("#sg-reset-filters");
            resetBtn.addEventListener("click", () => {
                State.reset();
                Pipeline.run();
                UIHelpers.syncUI();
            });

            return el;
        }

        function loadMoreButton(filtered, displayed) {
            const wrapper = document.getElementById("sg-load-more");
            if (!wrapper) return;

            if (displayed >= filtered.length || filtered.length === 0) {
                wrapper.style.display = "none";
            } else {
                wrapper.style.display = "block";
                const remaining = filtered.length - displayed;
                const btn = wrapper.querySelector(".sg-load-more__btn");
                if (btn) {
                    btn.textContent = `Load more (${remaining} remaining)`;
                    btn.disabled = false;
                }
            }
        }

        function resultsInfo(filtered, displayed) {
            const el = document.getElementById("sg-results-info");
            if (!el) return;
            if (filtered.length === 0) {
                el.textContent = "";
            } else {
                el.textContent = `Showing ${Math.min(displayed, filtered.length)} of ${filtered.length} item${filtered.length === 1 ? "" : "s"}`;
            }
        }

        function categoryFilters(categories, active) {
            const container = document.getElementById("sg-category-filters");
            if (!container) return;
            const buttons = container.querySelectorAll(
                ".sg-filter-btn[data-category]",
            );
            buttons.forEach((btn) => {
                btn.classList.toggle("active", btn.dataset.category === active);
            });
        }

        function tagFilters(tags, active) {
            const container = document.getElementById("sg-tag-filters");
            if (!container) return;
            const buttons = container.querySelectorAll(
                ".sg-filter-btn[data-tag]",
            );
            buttons.forEach((btn) => {
                btn.classList.toggle("active", btn.dataset.tag === active);
            });
        }

        function buildFilterButtons(
            containerId,
            items,
            dataAttr,
            clickHandler,
        ) {
            const container = document.getElementById(containerId);
            if (!container) return;
            // Keep the label element
            const label = container.querySelector(".sg-filters__label");
            container.innerHTML = "";
            if (label) container.appendChild(label);

            items.forEach((item) => {
                const btn = document.createElement("button");
                btn.className = "sg-filter-btn";
                btn.dataset[dataAttr] = item;
                btn.textContent = item;
                btn.addEventListener("click", () => clickHandler(item));
                container.appendChild(btn);
            });
        }

        return {
            card,
            grid,
            emptyState,
            loadMoreButton,
            resultsInfo,
            categoryFilters,
            tagFilters,
            buildFilterButtons,
            escapeHtml,
        };
    })();

    /* ----------------------------------------
     UI HELPERS MODULE
  ---------------------------------------- */
    const UIHelpers = (() => {
        function openModal(item) {
            const overlay = document.getElementById("sg-modal-overlay");
            if (!overlay) return;

            const tagsHtml = item.tags
                .map(
                    (t) =>
                        `<span class="sg-tag">${Render.escapeHtml(t)}</span>`,
                )
                .join("");

            const dateStr = new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            const modal = overlay.querySelector(".sg-modal");
            modal.innerHTML = `
        <div class="sg-modal__header">
          <button class="sg-modal__close" aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="sg-modal__thumbnail">
            <img src="${Render.escapeHtml(item.thumbnail)}" alt="${Render.escapeHtml(item.title)}">
          </div>
        </div>
        <div class="sg-modal__body">
          <div class="sg-modal__category">${Render.escapeHtml(item.category)}</div>
          <h2 class="sg-modal__title">${Render.escapeHtml(item.title)}</h2>
          <p class="sg-modal__subtitle">${Render.escapeHtml(item.subtitle)}</p>
          <p class="sg-modal__description">${Render.escapeHtml(item.description)}</p>
          <div class="sg-modal__tags">${tagsHtml}</div>
          <div class="sg-modal__footer">
            <a href="${Render.escapeHtml(item.link)}" class="sg-modal__link" target="_blank" rel="noopener noreferrer">
              View project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <span class="sg-modal__date">${dateStr}</span>
          </div>
        </div>
      `;

            overlay.classList.add("open");
            document.body.style.overflow = "hidden";

            const closeBtn = modal.querySelector(".sg-modal__close");
            closeBtn.addEventListener("click", closeModal);
            closeBtn.focus();
        }

        function closeModal() {
            const overlay = document.getElementById("sg-modal-overlay");
            if (!overlay) return;
            overlay.classList.remove("open");
            document.body.style.overflow = "";
        }

        function initThemeToggle() {
            const stored = localStorage.getItem("sg-theme");
            if (stored === "dark") {
                document.documentElement.setAttribute("data-theme", "dark");
            }

            const btn = document.getElementById("sg-theme-toggle");
            if (!btn) return;

            btn.addEventListener("click", () => {
                const current =
                    document.documentElement.getAttribute("data-theme");
                const next = current === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", next);
                localStorage.setItem("sg-theme", next);
            });
        }

        function debounce(fn, ms) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => fn(...args), ms);
            };
        }

        function syncUI() {
            const state = State.get();
            const searchInput = document.getElementById("sg-search");
            const sortSelect = document.getElementById("sg-sort");

            if (searchInput) searchInput.value = state.searchQuery;
            if (sortSelect) sortSelect.value = state.sortOrder;

            Render.categoryFilters(state.categories, state.activeCategory);
            Render.tagFilters(state.tags, state.activeTag);

            // Toggle search clear button
            const clearBtn = document.querySelector(".sg-search__clear");
            if (clearBtn) {
                clearBtn.classList.toggle(
                    "visible",
                    state.searchQuery.length > 0,
                );
            }
        }

        return { openModal, closeModal, initThemeToggle, debounce, syncUI };
    })();

    /* ----------------------------------------
     PIPELINE (orchestrates filter → search → sort → render)
  ---------------------------------------- */
    const Pipeline = (() => {
        function run() {
            const state = State.get();
            let items = [...state.allItems];

            // 1. Filter
            items = Filters.apply(items);

            // 2. Search
            items = Search.execute(items, state.searchQuery);

            // 3. Sort
            items = Sorting.sort(items, state.sortOrder);

            // 4. Update state
            const displayedCount = state.displayedCount || CONFIG.itemsPerPage;
            State.set({ filteredItems: items, displayedCount });

            // 5. Render
            Render.grid(items, displayedCount);
            Render.loadMoreButton(items, displayedCount);
            Render.resultsInfo(items, displayedCount);
        }

        return { run };
    })();

    /* ----------------------------------------
     INIT
  ---------------------------------------- */
    async function init(options = {}) {
        const dataUrl = options.dataUrl || CONFIG.dataUrl;
        if (options.itemsPerPage) CONFIG.itemsPerPage = options.itemsPerPage;

        // Theme
        UIHelpers.initThemeToggle();

        // Load data
        try {
            const items = await DataLoader.load(dataUrl);
            const categories = DataLoader.extractCategories(items);
            const tags = DataLoader.extractTags(items);

            State.set({
                allItems: items,
                categories,
                tags,
                displayedCount: CONFIG.itemsPerPage,
            });

            // Build filter buttons
            Render.buildFilterButtons(
                "sg-category-filters",
                categories,
                "category",
                (cat) => {
                    State.set({
                        activeCategory: cat,
                        displayedCount: CONFIG.itemsPerPage,
                    });
                    Pipeline.run();
                    UIHelpers.syncUI();
                },
            );

            Render.buildFilterButtons("sg-tag-filters", tags, "tag", (tag) => {
                State.set({
                    activeTag: tag,
                    displayedCount: CONFIG.itemsPerPage,
                });
                Pipeline.run();
                UIHelpers.syncUI();
            });

            // Initial render
            Pipeline.run();
            UIHelpers.syncUI();
        } catch (err) {
            console.error("ShowcaseGrid: Failed to initialize", err);
            const gridEl = document.getElementById("sg-grid");
            if (gridEl) {
                gridEl.innerHTML = `<div class="sg-empty">
          <h3 class="sg-empty__title">Unable to load data</h3>
          <p class="sg-empty__text">Please ensure the data source is available and try again.</p>
        </div>`;
            }
            return;
        }

        // --- Bind Events ---

        // Search
        const searchInput = document.getElementById("sg-search");
        if (searchInput) {
            const debouncedSearch = UIHelpers.debounce((value) => {
                State.set({
                    searchQuery: value,
                    displayedCount: CONFIG.itemsPerPage,
                });
                Pipeline.run();
                UIHelpers.syncUI();
            }, CONFIG.searchDebounce);

            searchInput.addEventListener("input", (e) => {
                debouncedSearch(e.target.value);
            });
        }

        // Search clear
        const clearBtn = document.querySelector(".sg-search__clear");
        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                State.set({
                    searchQuery: "",
                    displayedCount: CONFIG.itemsPerPage,
                });
                Pipeline.run();
                UIHelpers.syncUI();
            });
        }

        // Sort
        const sortSelect = document.getElementById("sg-sort");
        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                State.set({
                    sortOrder: e.target.value,
                    displayedCount: CONFIG.itemsPerPage,
                });
                Pipeline.run();
            });
        }

        // Load more
        const loadMoreBtn = document.querySelector(".sg-load-more__btn");
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", () => {
                const state = State.get();
                State.set({
                    displayedCount: state.displayedCount + CONFIG.itemsPerPage,
                });
                Pipeline.run();
            });
        }

        // Modal overlay click to close
        const modalOverlay = document.getElementById("sg-modal-overlay");
        if (modalOverlay) {
            modalOverlay.addEventListener("click", (e) => {
                if (e.target === modalOverlay) {
                    UIHelpers.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                UIHelpers.closeModal();
            }
        });
    }

    /* ----------------------------------------
     PUBLIC API
  ---------------------------------------- */
    return { init, State, Pipeline };
})();

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    ShowcaseGrid.init();
});
