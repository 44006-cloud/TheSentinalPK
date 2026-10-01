/**
 * The Daily Journal - Core Interactive Logic & Routing
 */
import { siteConfig, breakingNews, navigationCategories, articles, trendingStories } from '../data/newsData.js';

class NewspaperApp {
  constructor() {
    this.currentRoute = { view: 'home', param: null };
    this.currentTickerIndex = 0;
    this.tickerInterval = null;
    this.searchQuery = '';

    this.initElements();
    this.bindEvents();
    this.initTicker();
    this.handleRoute();
  }

  initElements() {
    // Top utility
    this.utilityDateEl = document.getElementById('utility-date');
    this.utilityWeatherEl = document.getElementById('utility-weather');
    this.marketTickersEl = document.getElementById('market-tickers-container');

    // Navigation
    this.navCategoriesEl = document.getElementById('nav-category-list');
    this.mobileDrawerLinksEl = document.getElementById('mobile-drawer-links');
    this.mobileDrawerEl = document.getElementById('mobile-nav-drawer');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileCloseBtn = document.getElementById('mobile-drawer-close');

    // Ticker
    this.tickerBadgeEl = document.getElementById('ticker-badge');
    this.tickerHeadlineEl = document.getElementById('ticker-headline');
    this.tickerTimeEl = document.getElementById('ticker-time');
    this.tickerPrevBtn = document.getElementById('ticker-prev');
    this.tickerNextBtn = document.getElementById('ticker-next');

    // Main App Views
    this.homeViewEl = document.getElementById('home-view-container');
    this.categoryViewEl = document.getElementById('category-view-container');
    this.articleViewEl = document.getElementById('article-view-container');

    // Search Modal
    this.searchModalEl = document.getElementById('search-modal');
    this.searchTriggerBtn = document.getElementById('search-trigger-btn');
    this.searchCloseBtn = document.getElementById('search-close-btn');
    this.searchInputEl = document.getElementById('search-input');
    this.searchResultsEl = document.getElementById('search-results');

    // Initialize Header data
    if (this.utilityDateEl) this.utilityDateEl.textContent = siteConfig.dateFormatted;
    if (this.utilityWeatherEl) {
      this.utilityWeatherEl.innerHTML = `<span>☀️</span> ${siteConfig.weather.city} ${siteConfig.weather.temp}`;
    }

    this.renderMarketTickers();
    this.renderNavigations();
  }

  bindEvents() {
    // Hash routing
    window.addEventListener('hashchange', () => this.handleRoute());

    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => this.openMobileDrawer());
    }
    if (this.mobileCloseBtn) {
      this.mobileCloseBtn.addEventListener('click', () => this.closeMobileDrawer());
    }
    if (this.mobileDrawerEl) {
      this.mobileDrawerEl.addEventListener('click', (e) => {
        if (e.target === this.mobileDrawerEl) this.closeMobileDrawer();
      });
    }

    // Ticker controls
    if (this.tickerPrevBtn) {
      this.tickerPrevBtn.addEventListener('click', () => this.prevTickerItem());
    }
    if (this.tickerNextBtn) {
      this.tickerNextBtn.addEventListener('click', () => this.nextTickerItem());
    }
    if (this.tickerHeadlineEl) {
      this.tickerHeadlineEl.addEventListener('click', () => {
        const item = breakingNews[this.currentTickerIndex];
        if (item && item.url) window.location.hash = item.url;
      });
    }

    // Search Modal
    if (this.searchTriggerBtn) {
      this.searchTriggerBtn.addEventListener('click', () => this.openSearchModal());
    }
    if (this.searchCloseBtn) {
      this.searchCloseBtn.addEventListener('click', () => this.closeSearchModal());
    }
    if (this.searchModalEl) {
      this.searchModalEl.addEventListener('click', (e) => {
        if (e.target === this.searchModalEl) this.closeSearchModal();
      });
    }
    if (this.searchInputEl) {
      this.searchInputEl.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
    }

    // Keyboard shortcuts ('/' to search, 'Escape' to close)
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.openSearchModal();
      }
      if (e.key === 'Escape') {
        this.closeSearchModal();
        this.closeMobileDrawer();
      }
    });

    // Fallback image error handler globally
    document.addEventListener('error', (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ETHE%20DAILY%20JOURNAL%3C%2Ftext%3E%3C%2Fsvg%3E';
      }
    }, true);
  }

  renderMarketTickers() {
    if (!this.marketTickersEl) return;
    this.marketTickersEl.innerHTML = siteConfig.markets
      .map(
        (m) => `
        <div class="market-item">
          <span class="market-symbol">${m.symbol}</span>
          <span class="market-value">${m.value}</span>
          <span class="market-change ${m.positive ? 'pos' : 'neg'}">${m.change}</span>
        </div>
      `
      )
      .join('');
  }

  renderNavigations() {
    const activeSlug = this.currentRoute.param || (this.currentRoute.view === 'home' ? 'home' : '');

    const linksHtml = navigationCategories
      .map(
        (cat) => `
        <li class="nav-item">
          <a href="${cat.slug === 'home' ? '#' : `#category/${cat.slug}`}" 
             class="nav-link ${activeSlug === cat.slug ? 'active' : ''}"
             data-category="${cat.slug}">
            ${cat.label}
          </a>
        </li>
      `
      )
      .join('');

    if (this.navCategoriesEl) this.navCategoriesEl.innerHTML = linksHtml;
    if (this.mobileDrawerLinksEl) this.mobileDrawerLinksEl.innerHTML = linksHtml;
  }

  // --- Breaking News Ticker ---
  initTicker() {
    this.updateTickerDisplay();
    this.tickerInterval = setInterval(() => {
      this.nextTickerItem();
    }, 6000);
  }

  updateTickerDisplay() {
    const item = breakingNews[this.currentTickerIndex];
    if (!item || !this.tickerHeadlineEl) return;

    this.tickerHeadlineEl.textContent = item.headline;
    if (this.tickerTimeEl) this.tickerTimeEl.textContent = item.timestamp;
  }

  nextTickerItem() {
    this.currentTickerIndex = (this.currentTickerIndex + 1) % breakingNews.length;
    this.updateTickerDisplay();
  }

  prevTickerItem() {
    this.currentTickerIndex = (this.currentTickerIndex - 1 + breakingNews.length) % breakingNews.length;
    this.updateTickerDisplay();
  }

  // --- Router & Views ---
  handleRoute() {
    const hash = window.location.hash.slice(1);
    this.closeMobileDrawer();

    if (!hash || hash === 'home') {
      this.currentRoute = { view: 'home', param: null };
      this.showView('home');
      this.renderHomePage();
    } else if (hash.startsWith('article/')) {
      const slug = hash.replace('article/', '');
      this.currentRoute = { view: 'article', param: slug };
      this.showView('article');
      this.renderArticlePage(slug);
    } else if (hash.startsWith('category/')) {
      const categorySlug = hash.replace('category/', '');
      this.currentRoute = { view: 'category', param: categorySlug };
      this.showView('category');
      this.renderCategoryPage(categorySlug);
    } else {
      this.currentRoute = { view: 'home', param: null };
      this.showView('home');
      this.renderHomePage();
    }

    this.renderNavigations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showView(viewName) {
    if (this.homeViewEl) this.homeViewEl.style.display = viewName === 'home' ? 'block' : 'none';
    if (this.categoryViewEl) this.categoryViewEl.style.display = viewName === 'category' ? 'block' : 'none';
    if (this.articleViewEl) this.articleViewEl.style.display = viewName === 'article' ? 'block' : 'none';
  }

  // --- 1. RENDER HOMEPAGE ---
  renderHomePage() {
    if (!this.homeViewEl) return;

    const leadArticle = articles.find((a) => a.isLead) || articles[0];
    const secondaryArticles = articles.filter((a) => a.section === 'secondary').slice(0, 3);
    const latestArticles = articles.filter((a) => a.id.startsWith('latest-')).slice(0, 6);
    const opinionArticles = articles.filter((a) => a.category === 'Opinion').slice(0, 3);

    // Categories to feature in separate blocks
    const pakArticles = articles.filter((a) => a.category === 'Pakistan' && !a.isLead).slice(0, 4);
    const worldArticles = articles.filter((a) => a.category === 'World').slice(0, 4);
    const bizArticles = articles.filter((a) => a.category === 'Business' && !a.isFeatured).slice(0, 4);
    const techArticles = articles.filter((a) => a.category === 'Technology' && !a.isFeatured).slice(0, 4);
    const sportsArticles = articles.filter((a) => a.category === 'Sports').slice(0, 4);
    const entArticles = articles.filter((a) => a.category === 'Entertainment').slice(0, 4);

    this.homeViewEl.innerHTML = `
      <!-- Multi-Column Editorial Front Page -->
      <section class="home-editorial-grid">
        <!-- Main Column (Lead + Secondary + Latest Feed) -->
        <div class="editorial-main-column">
          
          <!-- Top Hero Grid: Lead Story + Secondary Stack -->
          <div class="lead-and-secondary-grid">
            <!-- Lead Dominant Story -->
            <article class="lead-story-card">
              <a href="#article/${leadArticle.slug}" class="lead-image-wrap">
                <img src="${leadArticle.image}" alt="${leadArticle.title}" loading="eager" />
              </a>
              <span class="story-meta-badge">${leadArticle.category}</span>
              <h2 class="lead-headline">
                <a href="#article/${leadArticle.slug}">${leadArticle.title}</a>
              </h2>
              <p class="lead-summary">${leadArticle.summary}</p>
              <div class="story-byline-bar">
                <span>By <strong class="author-name">${leadArticle.author?.name || 'Staff Reporter'}</strong></span>
                <span>•</span>
                <span>${leadArticle.publishedAt}</span>
              </div>
            </article>

            <!-- Secondary Headlines Stack -->
            <div class="secondary-stories-stack">
              ${secondaryArticles
                .map(
                  (story) => `
                <article class="secondary-story-card">
                  <a href="#article/${story.slug}" class="secondary-img-wrap">
                    <img src="${story.image}" alt="${story.title}" loading="lazy" />
                  </a>
                  <span class="story-meta-badge">${story.category}</span>
                  <h3 class="secondary-headline">
                    <a href="#article/${story.slug}">${story.title}</a>
                  </h3>
                  <p class="secondary-summary">${story.summary}</p>
                  <div class="story-byline-bar">
                    <span>${story.publishedAt}</span>
                  </div>
                </article>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- LATEST NEWS CHRONOLOGICAL SECTION -->
          <div class="latest-news-section-header">
            <h3 class="section-title">Latest News</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">
              Updated Continuously
            </span>
          </div>

          <div class="latest-news-grid">
            ${latestArticles
              .map(
                (item) => `
              <article class="compact-news-item">
                <a href="#article/${item.slug}" class="thumb-wrap">
                  <img src="${item.image}" alt="${item.title}" loading="lazy" />
                </a>
                <span class="story-meta-badge" style="font-size: 0.65rem; margin-bottom: 0;">${item.category}</span>
                <h4 class="compact-headline">
                  <a href="#article/${item.slug}">${item.title}</a>
                </h4>
                <div class="compact-meta">
                  <span>${item.publishedAt}</span>
                  <span>•</span>
                  <span>${item.readTime}</span>
                </div>
              </article>
            `
              )
              .join('')}
          </div>

        </div>

        <!-- News Sidebar (Trending / Most Read, Opinion Columns, E-Paper) -->
        <aside class="editorial-sidebar">
          
          <!-- Trending Widget with Numbered Badges -->
          <div class="sidebar-widget">
            <div class="sidebar-widget-header">
              <h3 class="sidebar-title">Trending Stories</h3>
            </div>
            <div class="trending-numbered-list">
              ${trendingStories
                .map(
                  (story) => {
                    const article = articles.find((a) => a.id === story.id) || articles[0];
                    return `
                      <div class="trending-item">
                        <span class="trending-rank">0${story.rank}</span>
                        <div class="trending-details">
                          <span class="trending-category">${story.category}</span>
                          <h4 class="trending-headline">
                            <a href="#article/${article.slug}">${story.title}</a>
                          </h4>
                          <span class="trending-views">${story.views}</span>
                        </div>
                      </div>
                    `;
                  }
                )
                .join('')}
            </div>
          </div>

          <!-- Opinion Columns Mini-Widget -->
          <div class="sidebar-widget">
            <div class="sidebar-widget-header">
              <h3 class="sidebar-title">Opinion & Analysis</h3>
            </div>
            <div class="opinion-columns-list">
              ${opinionArticles
                .map(
                  (op) => `
                <div class="opinion-column-card">
                  <img src="${op.author?.avatar}" alt="${op.author?.name}" class="opinion-author-avatar" loading="lazy" />
                  <div class="opinion-column-body">
                    <span class="opinion-author-name">${op.author?.name}</span>
                    <h4 class="opinion-column-title">
                      <a href="#article/${op.slug}">${op.title}</a>
                    </h4>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- E-Paper Digital Replica Promo -->
          <div class="epaper-widget-card">
            <div class="epaper-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                <path d="M18 14h-8"/>
                <path d="M15 18h-5"/>
                <path d="M10 6h8v4h-8V6Z"/>
              </svg>
            </div>
            <h4 class="epaper-title">Daily E-Paper Replica</h4>
            <p class="epaper-desc">Browse today's broadsheet page-by-page as printed in Karachi, Lahore, and Islamabad.</p>
            <a href="#category/pakistan" class="epaper-btn">Read Today's Edition</a>
          </div>

        </aside>
      </section>

      <!-- PAKISTAN SECTION -->
      <section class="category-section-block">
        <div class="category-section-header">
          <h3 class="category-title">Pakistan</h3>
          <a href="#category/pakistan" class="view-all-link">More in Pakistan &rarr;</a>
        </div>
        <div class="category-articles-grid">
          ${pakArticles
            .map(
              (item) => `
            <article class="cat-article-card">
              <a href="#article/${item.slug}" class="cat-article-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
              </a>
              <h4 class="cat-article-headline">
                <a href="#article/${item.slug}">${item.title}</a>
              </h4>
              <p class="cat-article-summary">${item.summary}</p>
              <div class="cat-article-meta">
                <span>${item.publishedAt}</span>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- OPINION FULL EDITORIAL SECTION -->
      <section class="opinion-section-block">
        <div class="category-section-header" style="margin-bottom: 2rem;">
          <h3 class="category-title">Editorials & Columns</h3>
          <a href="#category/opinion" class="view-all-link">All Opinion &rarr;</a>
        </div>
        <div class="opinion-grid-3col">
          ${opinionArticles
            .map(
              (op) => `
            <article class="opinion-big-card">
              <div class="opinion-author-header">
                <img src="${op.author?.avatar}" alt="${op.author?.name}" class="opinion-author-avatar-large" />
                <div class="opinion-author-info">
                  <h4 class="opinion-author-name-large">${op.author?.name}</h4>
                  <span class="opinion-author-role">${op.author?.role}</span>
                </div>
              </div>
              <h3 class="opinion-article-title">
                <a href="#article/${op.slug}">${op.title}</a>
              </h3>
              <p class="opinion-article-excerpt">${op.summary}</p>
              <a href="#article/${op.slug}" class="opinion-read-link">Read Full Column &rarr;</a>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- WORLD NEWS SECTION -->
      <section class="category-section-block">
        <div class="category-section-header">
          <h3 class="category-title">World Affairs</h3>
          <a href="#category/world" class="view-all-link">More in World &rarr;</a>
        </div>
        <div class="category-articles-grid">
          ${worldArticles
            .map(
              (item) => `
            <article class="cat-article-card">
              <a href="#article/${item.slug}" class="cat-article-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
              </a>
              <h4 class="cat-article-headline">
                <a href="#article/${item.slug}">${item.title}</a>
              </h4>
              <p class="cat-article-summary">${item.summary}</p>
              <div class="cat-article-meta">
                <span>${item.publishedAt}</span>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- BUSINESS & TECHNOLOGY SPLIT -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem;">
        <!-- Business Block -->
        <section class="category-section-block" style="border-bottom: none;">
          <div class="category-section-header">
            <h3 class="category-title">Business & Markets</h3>
            <a href="#category/business" class="view-all-link">More &rarr;</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${bizArticles
              .map(
                (item) => `
              <article style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-rule);">
                <a href="#article/${item.slug}" style="width: 120px; aspect-ratio: 16/10; overflow: hidden; flex-shrink: 0; background: var(--bg-subtle);">
                  <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                </a>
                <div>
                  <h4 style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.35rem;">
                    <a href="#article/${item.slug}">${item.title}</a>
                  </h4>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">${item.publishedAt}</span>
                </div>
              </article>
            `
              )
              .join('')}
          </div>
        </section>

        <!-- Technology Block -->
        <section class="category-section-block" style="border-bottom: none;">
          <div class="category-section-header">
            <h3 class="category-title">Technology & Science</h3>
            <a href="#category/technology" class="view-all-link">More &rarr;</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${techArticles
              .map(
                (item) => `
              <article style="display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-rule);">
                <a href="#article/${item.slug}" style="width: 120px; aspect-ratio: 16/10; overflow: hidden; flex-shrink: 0; background: var(--bg-subtle);">
                  <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
                </a>
                <div>
                  <h4 style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 700; line-height: 1.35; margin-bottom: 0.35rem;">
                    <a href="#article/${item.slug}">${item.title}</a>
                  </h4>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">${item.publishedAt}</span>
                </div>
              </article>
            `
              )
              .join('')}
          </div>
        </section>
      </div>

      <!-- SPORTS & ENTERTAINMENT SECTION -->
      <section class="category-section-block" style="border-top: 1px solid var(--border-rule);">
        <div class="category-section-header">
          <h3 class="category-title">Sports</h3>
          <a href="#category/sports" class="view-all-link">More in Sports &rarr;</a>
        </div>
        <div class="category-articles-grid">
          ${sportsArticles
            .map(
              (item) => `
            <article class="cat-article-card">
              <a href="#article/${item.slug}" class="cat-article-img">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
              </a>
              <h4 class="cat-article-headline">
                <a href="#article/${item.slug}">${item.title}</a>
              </h4>
              <p class="cat-article-summary">${item.summary}</p>
              <div class="cat-article-meta">
                <span>${item.publishedAt}</span>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>
    `;
  }

  // --- 2. RENDER CATEGORY VIEW ---
  renderCategoryPage(categorySlug) {
    if (!this.categoryViewEl) return;

    const catObj = navigationCategories.find((c) => c.slug.toLowerCase() === categorySlug.toLowerCase()) || {
      label: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
      slug: categorySlug,
    };

    // Filter matching articles (by category or section)
    const matchingArticles = articles.filter(
      (a) => a.category.toLowerCase().replace(/[^a-z0-9]/g, '') === categorySlug.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    const leadItem = matchingArticles[0] || articles[0];
    const subItems = matchingArticles.slice(1);

    this.categoryViewEl.innerHTML = `
      <div style="padding: 1.5rem 0 3rem 0;">
        <!-- Breadcrumb -->
        <div class="breadcrumbs-bar">
          <a href="#">Home</a>
          <span class="breadcrumbs-separator">/</span>
          <span style="color: var(--text-main); font-weight: 700;">${catObj.label}</span>
        </div>

        <!-- Category Title Banner -->
        <div style="border-bottom: 2px solid var(--border-dark); padding-bottom: 0.65rem; margin-bottom: 2rem;">
          <h1 style="font-family: var(--font-serif); font-size: 2.25rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em;">
            ${catObj.label}
          </h1>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
            Reporting, in-depth investigations, and comprehensive coverage from our ${catObj.label} desk.
          </p>
        </div>

        <!-- Category Layout -->
        <div class="home-editorial-grid" style="border-bottom: none; padding-top: 0;">
          <div class="editorial-main-column">
            ${
              leadItem
                ? `
              <article style="display: flex; flex-direction: column; margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-rule);">
                <a href="#article/${leadItem.slug}" style="aspect-ratio: 16/9; overflow: hidden; background: var(--bg-subtle); margin-bottom: 1rem;">
                  <img src="${leadItem.image}" alt="${leadItem.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                </a>
                <h2 style="font-family: var(--font-serif); font-size: 1.75rem; font-weight: 800; line-height: 1.3; margin-bottom: 0.65rem;">
                  <a href="#article/${leadItem.slug}">${leadItem.title}</a>
                </h2>
                <p style="font-size: 0.95rem; color: var(--text-body); line-height: 1.55; margin-bottom: 0.75rem;">
                  ${leadItem.summary}
                </p>
                <div class="story-byline-bar">
                  <span>By <strong>${leadItem.author?.name || 'Staff Correspondent'}</strong></span>
                  <span>•</span>
                  <span>${leadItem.publishedAt}</span>
                </div>
              </article>
            `
                : ''
            }

            <div class="category-articles-grid" style="grid-template-columns: repeat(2, 1fr);">
              ${subItems
                .map(
                  (item) => `
                <article class="cat-article-card" style="padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-rule);">
                  <a href="#article/${item.slug}" class="cat-article-img">
                    <img src="${item.image}" alt="${item.title}" loading="lazy" />
                  </a>
                  <h3 class="cat-article-headline">
                    <a href="#article/${item.slug}">${item.title}</a>
                  </h3>
                  <p class="cat-article-summary">${item.summary}</p>
                  <div class="cat-article-meta">
                    <span>${item.publishedAt}</span>
                  </div>
                </article>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="editorial-sidebar">
            <div class="sidebar-widget">
              <div class="sidebar-widget-header">
                <h3 class="sidebar-title">Trending in ${catObj.label}</h3>
              </div>
              <div class="trending-numbered-list">
                ${trendingStories
                  .map(
                    (story) => {
                      const art = articles.find((a) => a.id === story.id) || articles[0];
                      return `
                        <div class="trending-item">
                          <span class="trending-rank">0${story.rank}</span>
                          <div class="trending-details">
                            <span class="trending-category">${story.category}</span>
                            <h4 class="trending-headline">
                              <a href="#article/${art.slug}">${story.title}</a>
                            </h4>
                          </div>
                        </div>
                      `;
                    }
                  )
                  .join('')}
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  // --- 3. RENDER REUSABLE ARTICLE DETAIL PAGE ---
  renderArticlePage(slug) {
    if (!this.articleViewEl) return;

    const article = articles.find((a) => a.slug === slug) || articles[0];
    const relatedStories = (article.relatedIds || [])
      .map((id) => articles.find((a) => a.id === id))
      .filter(Boolean);

    // If less than 3 related, pick other articles from same category
    if (relatedStories.length < 3) {
      const candidates = articles.filter((a) => a.id !== article.id && a.category === article.category);
      while (relatedStories.length < 3 && candidates.length > 0) {
        relatedStories.push(candidates.pop());
      }
    }

    const currentUrl = encodeURIComponent(window.location.href);
    const titleEncoded = encodeURIComponent(article.title);

    this.articleViewEl.innerHTML = `
      <article class="article-detail-view">
        <!-- Breadcrumb Navigation -->
        <nav class="breadcrumbs-bar" aria-label="Breadcrumb">
          <a href="#">Home</a>
          <span class="breadcrumbs-separator">/</span>
          <a href="#category/${article.category.toLowerCase().replace(/[^a-z0-9]/g, '')}">${article.category}</a>
          <span class="breadcrumbs-separator">/</span>
          <span style="color: var(--text-main); font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 400px;">
            ${article.title}
          </span>
        </nav>

        <!-- Two Column Article Layout -->
        <div class="article-page-layout">
          
          <!-- Main Article Content Column -->
          <div class="article-main-body-column">
            
            <header class="article-header-area">
              <span class="article-category-tag">${article.category}</span>
              <h1 class="article-main-title">${article.title}</h1>
              ${
                article.subtitle
                  ? `<p class="article-standfirst">${article.subtitle}</p>`
                  : `<p class="article-standfirst">${article.summary}</p>`
              }

              <!-- Author & Publication Date Row -->
              <div class="article-meta-row">
                <div class="article-author-byline">
                  <img src="${article.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" 
                       alt="${article.author?.name}" class="byline-avatar" />
                  <div class="byline-details">
                    <span class="byline-name">${article.author?.name || 'Staff Reporter'}</span>
                    <span class="byline-role">${article.author?.role || 'Special Correspondent'}</span>
                  </div>
                </div>

                <div class="article-pub-info">
                  <span class="pub-date">${article.publishedAt}</span>
                  <span class="pub-readtime">${article.readTime || '4 min read'} • Verified Reporting</span>
                </div>
              </div>

              <!-- Share Buttons Bar -->
              <div class="share-action-bar">
                <span class="share-label">Share This Story:</span>
                <div class="share-buttons">
                  <a href="https://twitter.com/intent/tweet?text=${titleEncoded}&url=${currentUrl}" target="_blank" rel="noopener noreferrer" class="share-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X
                  </a>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" rel="noopener noreferrer" class="share-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  <a href="https://api.whatsapp.com/send?text=${titleEncoded}%20${currentUrl}" target="_blank" rel="noopener noreferrer" class="share-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.115-.533-1.638-.689-2.704-2.348-2.784-2.457-.082-.109-.672-.892-.672-1.701 0-.809.423-1.206.574-1.37.151-.164.33-.205.441-.205.111 0 .222.002.318.006.103.005.241-.039.377.288.144.347.491 1.199.533 1.285.042.086.07.188.013.303-.058.115-.088.188-.174.288-.086.1-.182.223-.26.299-.088.086-.179.18-.077.355.102.175.454.748.974 1.212.67.596 1.235.782 1.41.868.175.086.278.072.381-.044.103-.116.441-.513.559-.688.118-.175.236-.145.395-.086s1.01.477 1.184.563c.174.086.29.13.333.204.043.074.043.43-.101.835z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <button type="button" class="share-btn" id="copy-article-link-btn" title="Copy article link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    <span id="copy-btn-text">Copy Link</span>
                  </button>
                </div>
              </div>
            </header>

            <!-- Main Lead Image with Caption -->
            <figure class="article-lead-image-box">
              <img src="${article.image}" alt="${article.title}" />
              <figcaption class="article-image-caption">
                <span class="caption-credit">PHOTO: REUTERS / AFP / EXPRESS ARCHIVES —</span>
                ${article.imageCaption || article.summary}
              </figcaption>
            </figure>

            <!-- Key Takeaways Callout -->
            <div class="key-takeaways-box">
              <h4 class="takeaways-heading">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Key Takeaways
              </h4>
              <ul class="takeaways-list">
                <li>${article.subtitle || article.summary}</li>
                <li>High-level discussions focus on regional resilience, institutional transparency, and long-term socio-economic pacts.</li>
                <li>Implementation frameworks slated for phased rollout across provincial jurisdictions.</li>
              </ul>
            </div>

            <!-- Body Paragraphs -->
            <div class="article-content-body">
              ${(article.content || [article.summary])
                .map((para) => `<p>${para}</p>`)
                .join('')}

              <blockquote>
                "Independent journalism holds power to account, gives voice to the unheard, and creates the foundational record of history."
              </blockquote>

              <p>
                As policy analysts continue to parse the long-term ramifications, observers across the region note that consistent execution will remain the determining metric for success in the coming quarters.
              </p>
            </div>

            <!-- Article Tags -->
            <div class="article-tags-wrap">
              <span class="tags-label">Related Topics:</span>
              ${(article.tags || [article.category, 'News', 'Pakistan'])
                .map((tag) => `<a href="#category/${article.category.toLowerCase()}" class="tag-badge">#${tag}</a>`)
                .join('')}
            </div>

            <!-- Related Articles Grid -->
            <section class="related-stories-section">
              <div class="latest-news-section-header">
                <h3 class="section-title">Related Stories</h3>
              </div>
              <div class="related-grid">
                ${relatedStories
                  .map(
                    (rel) => `
                  <article class="compact-news-item">
                    <a href="#article/${rel.slug}" class="thumb-wrap">
                      <img src="${rel.image}" alt="${rel.title}" loading="lazy" />
                    </a>
                    <span class="story-meta-badge" style="font-size: 0.65rem;">${rel.category}</span>
                    <h4 class="compact-headline">
                      <a href="#article/${rel.slug}">${rel.title}</a>
                    </h4>
                  </article>
                `
                  )
                  .join('')}
              </div>
            </section>

          </div>

          <!-- Article Page Sidebar -->
          <aside class="editorial-sidebar">
            <div class="sidebar-widget">
              <div class="sidebar-widget-header">
                <h3 class="sidebar-title">Trending Across Desks</h3>
              </div>
              <div class="trending-numbered-list">
                ${trendingStories
                  .map(
                    (story) => {
                      const item = articles.find((a) => a.id === story.id) || articles[0];
                      return `
                        <div class="trending-item">
                          <span class="trending-rank">0${story.rank}</span>
                          <div class="trending-details">
                            <span class="trending-category">${story.category}</span>
                            <h4 class="trending-headline">
                              <a href="#article/${item.slug}">${story.title}</a>
                            </h4>
                          </div>
                        </div>
                      `;
                    }
                  )
                  .join('')}
              </div>
            </div>

            <div class="epaper-widget-card" style="margin-top: 1rem;">
              <h4 class="epaper-title">Morning Briefing</h4>
              <p class="epaper-desc">Get the front page delivered straight to your email every morning at 6:00 AM PKT.</p>
              <button type="button" class="epaper-btn" onclick="alert('Thank you for subscribing to The Daily Journal Morning Briefing!')">
                Subscribe Free
              </button>
            </div>
          </aside>

        </div>
      </article>
    `;

    // Wire copy link button
    const copyBtn = document.getElementById('copy-article-link-btn');
    const copyText = document.getElementById('copy-btn-text');
    if (copyBtn && copyText) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          copyText.textContent = 'Copied!';
          setTimeout(() => {
            copyText.textContent = 'Copy Link';
          }, 2000);
        });
      });
    }
  }

  // --- 4. SEARCH MODAL LOGIC ---
  openSearchModal() {
    if (!this.searchModalEl) return;
    this.searchModalEl.classList.add('active');
    if (this.searchInputEl) {
      this.searchInputEl.value = '';
      this.searchInputEl.focus();
    }
    this.handleSearchInput('');
  }

  closeSearchModal() {
    if (!this.searchModalEl) return;
    this.searchModalEl.classList.remove('active');
  }

  handleSearchInput(query) {
    const q = query.trim().toLowerCase();
    if (!this.searchResultsEl) return;

    if (!q) {
      // Show default top articles
      const topArticles = articles.slice(0, 5);
      this.searchResultsEl.innerHTML = `
        <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.75rem;">
          Suggested Stories:
        </div>
        <div class="search-results-list">
          ${topArticles
            .map(
              (a) => `
            <div class="search-result-item" data-slug="${a.slug}">
              <img src="${a.image}" alt="${a.title}" class="search-result-thumb" />
              <div class="search-result-info">
                <span class="search-result-cat">${a.category}</span>
                <h4 class="search-result-title">${a.title}</h4>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    } else {
      const filtered = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary?.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
      );

      if (filtered.length === 0) {
        this.searchResultsEl.innerHTML = `
          <div class="search-no-results">
            No articles found matching "<strong>${query}</strong>". Try searching for "Pakistan", "Economy", "Climate", or "Technology".
          </div>
        `;
      } else {
        this.searchResultsEl.innerHTML = `
          <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.75rem;">
            ${filtered.length} Stories Found:
          </div>
          <div class="search-results-list">
            ${filtered
              .map(
                (a) => `
              <div class="search-result-item" data-slug="${a.slug}">
                <img src="${a.image}" alt="${a.title}" class="search-result-thumb" />
                <div class="search-result-info">
                  <span class="search-result-cat">${a.category}</span>
                  <h4 class="search-result-title">${a.title}</h4>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }
    }

    // Attach click handlers to search items
    this.searchResultsEl.querySelectorAll('.search-result-item').forEach((item) => {
      item.addEventListener('click', () => {
        const slug = item.getAttribute('data-slug');
        this.closeSearchModal();
        window.location.hash = `#article/${slug}`;
      });
    });
  }

  // --- 5. MOBILE DRAWER ---
  openMobileDrawer() {
    if (this.mobileDrawerEl) this.mobileDrawerEl.classList.add('active');
  }

  closeMobileDrawer() {
    if (this.mobileDrawerEl) this.mobileDrawerEl.classList.remove('active');
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new NewspaperApp();
});
