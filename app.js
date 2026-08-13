(function () {
  'use strict';

  // --- Theme ---
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  var saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
  if (themeToggle) {
    themeToggle.innerHTML = saved === 'dark'
      ? '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
      : '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
    themeToggle.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.innerHTML = next === 'dark'
        ? '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
        : '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
    });
  }

  // --- Search toggle ---
  var searchToggle = document.getElementById('searchToggle');
  var searchInput = document.getElementById('searchInput');
  if (searchToggle && searchInput) {
    searchToggle.addEventListener('click', function () {
      searchInput.classList.toggle('open');
      if (searchInput.classList.contains('open')) {
        searchInput.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-wrap') && !e.target.closest('#searchToggle')) {
        searchInput.classList.remove('open');
      }
    });
  }

  // --- Today date ---
  var todayEl = document.getElementById('todayDate');
  if (todayEl) {
    var d = new Date();
    var opts = { weekday: 'long', month: 'long', day: 'numeric' };
    todayEl.textContent = d.toLocaleDateString('en-US', opts).toUpperCase();
  }

  // --- Year ---
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // --- Get button opens MediaFire ---
  document.addEventListener('click', function (e) {
    var getBtn = e.target.closest('.app-get:not(.detail-get-btn):not(.today-get)');
    if (!getBtn) return;
    var row = getBtn.closest('.app-row');
    if (!row) return;
    var appId = row.getAttribute('data-app');
    var data = appData[appId];
    if (data && data.url) {
      e.preventDefault();
      window.open(data.url, '_blank');
    }
  });

  // --- Scroll reveal ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { return observer.observe(el); });

  // --- Smooth nav ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var id = link.getAttribute('href');
    if (id === '#') return;
    link.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // App Detail Overlay
  // ==========================================

  var appData = {
    editingviews: {
      icon: 'photo_2026-07-28_16-49-17.jpg',
      title: 'Editing Views',
      subtitle: 'Video Editing Templates',
      bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a1a2a 100%)',
      rating: 5,
      ratingNum: '4.6',
      screenshots: [
        'photo_2026-07-28_16-50-08.jpg'
      ],
      desc: 'Editing Views offers a curated collection of professional video editing templates and presets for Android.\n\nBrowse through dozens of ready-to-use templates designed for trending social media content. One-tap import into your favorite video editor.\n\nIncludes trending transition packs, text animations, color grading presets, and effect overlays. Updated weekly with new templates.',
      info: [
        { label: 'Category', value: 'Video & Photo Editing' },
        { label: 'Size', value: '25 MB' },
        { label: 'Compatibility', value: 'Android 8.0+' },
        { label: 'Version', value: '1.0' },
        { label: 'Price', value: 'Free' }
      ],
      whatsnew: '• Curated template library\n• One-tap import\n• Weekly updates\n• Trending social media presets',
      url: 'https://www.mediafire.com/file/sbnpz02l6y10w80/Editing+Views_1.0.0.apk/file',
      version: '1.0',
      price: 'Free'
    },
    aemotion: {
      icon: 'photo_2026-07-26_12-40-32.jpg',
      title: 'AE Motion',
      subtitle: 'After Effects Style Animation',
      bg: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 50%, #0a2a3a 100%)',
      rating: 5,
      ratingNum: '4.8',
      screenshots: [
        'photo_2026-07-26_12-41-56.jpg',
        'photo_2026-07-26_12-42-15.jpg',
        'photo_2026-07-26_12-42-14.jpg',
        'photo_2026-07-26_12-42-13.jpg',
        'photo_2026-07-26_12-42-06.jpg',
        'photo_2026-07-26_12-42-03.jpg',
        'photo_2026-07-26_12-42-02.jpg',
        'photo_2026-07-26_12-42-00.jpg'
      ],
      desc: 'AE Motion brings professional After Effects-style animation and compositing tools to your iOS device.\n\nCreate stunning motion graphics with keyframe animation, expression-based controls, and real-time GPU rendering. Features include shape layers, text animators, null objects, and a timeline with bezier curve editing.\n\nExport in 4K with full alpha channel support. Includes built-in effects like blur, glow, color correction, and particle systems. Everything you need for professional-grade mobile motion design.',
      info: [
        { label: 'Category', value: 'Video & Animation' },
        { label: 'Size', value: '85 MB' },
        { label: 'Compatibility', value: 'iOS 15.0+' },
        { label: 'Version', value: '2.8' },
        { label: 'Price', value: 'Free' }
      ],
      whatsnew: '• Shape layer system\n• Expression-based keyframe controls\n• GPU-accelerated rendering engine\n• 4K alpha channel export',
      url: 'https://www.mediafire.com/file/6wdngbam5x8osaq/AE+Motion+2.8.ipa/file',
      version: '2.8',
      price: 'Free'
    },
    spidy: {
      icon: 'photo_2026-07-17_17-35-55.jpg',
      title: 'Spidy Motion',
      subtitle: 'Web Slinging Animation Tool',
      bg: 'linear-gradient(135deg, #1a0a0a 0%, #4a0a0a 50%, #1a0a2e 100%)',
      rating: 5,
      ratingNum: '4.9',
      screenshots: [
        'photo_2026-07-17_17-43-33.jpg',
        'photo_2026-07-17_17-43-46.jpg',
        'photo_2026-07-17_17-43-42.jpg'
      ],
      desc: 'Spidy Motion brings web-slinging action and dynamic character animation to your mobile device.\n\nCreate stunning spider-themed animations with intuitive controls, real-time physics simulation, and fluid motion capture. Perfect for fans and creators who want to bring their ideas to life.\n\nFeatures include pose-to-pose animation, web-swing physics engine, dynamic camera controls, and high-frame-rate export. Every tool is designed for speed and creative freedom.',
      info: [
        { label: 'Category', value: 'Animation' },
        { label: 'Size', value: '45 MB' },
        { label: 'Compatibility', value: 'iOS 14.0+' },
        { label: 'Version', value: '1.0.0' },
        { label: 'Price', value: 'Free' }
      ],
      whatsnew: '• Web-swing physics engine\n• Pose-to-pose animation system\n• High-frame-rate export\n• Dynamic camera controls',
      url: 'https://www.mediafire.com/file/1e2la8dvnjeqkyh/Spidy_Motion_v1.ipa/file',
      version: '1.0.0',
      price: 'Free'
    },
    motion: {
      icon: 'photo_2025-10-30_12-57-09.jpg',
      title: 'Toji Motion',
      subtitle: 'Mobile Motion Graphics & Animation',
      bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      rating: 5,
      ratingNum: '4.8',
      screenshots: [
        'photo_1_2026-07-13_17-28-56.jpg',
        'photo_2_2026-07-13_17-28-56.jpg',
        'photo_3_2026-07-13_17-28-56.jpg',
        'photo_4_2026-07-13_17-28-56.jpg',
        'photo_5_2026-07-13_17-28-56.jpg',
        'photo_6_2026-07-13_17-28-56.jpg',
        'photo_7_2026-07-13_17-28-56.jpg'
      ],
      desc: 'Toji Motion is a powerful mobile motion graphics and animation tool, popular for creating smooth, stylized video edits with professional visual effects.\n\nBuilt on a multi-threading graphics engine, it handles complex layer densities with desktop-class fluidity. Features include keyframe animation with an advanced vector graph system, parent-child hierarchy layer management, and GPU-accelerated rendering for real-time preview.\n\nExport your projects in up to 4K at 60fps or 120fps on supported devices. The tool offers full particle effects (smoke, fire, neon lights), unlimited keyframes per layer, and deep graph control with custom Ease-in/Ease-out curves for precise non-linear motion.',
      info: [
        { label: 'Category', value: 'Video & Animation' },
        { label: 'Size', value: '100 MB' },
        { label: 'Compatibility', value: 'Android 6.0+' },
        { label: 'Version', value: '5.0.161' },
        { label: 'Price', value: 'Free' }
      ],
      whatsnew: '• Dynamic vector graph system for precise motion curves\n• Enhanced multi-threading rendering engine\n• 4K 60fps export support\n• Improved GPU particle effects',
      url: 'https://www.mediafire.com/file/pyqtukcvnxyvc3p/Toji_Motion_4_Jul.apk/download',
      version: '5.0.161',
      price: 'Free'
    },
    preset: {
      icon: 'photo_2026-04-18_12-37-22.jpg',
      title: 'Toji Preset',
      subtitle: 'Stunning Presets & Filters',
      bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1a4e 50%, #1a1a2e 100%)',
      rating: 5,
      ratingNum: '4.7',
      screenshots: ['photo_2026-04-18_12-37-22.jpg'],
      desc: 'Professional presets for your creative projects. Elevate your content with stunning effects.\n\nToji Preset gives you access to a growing library of professional-grade presets and filters. Apply stunning looks to your photos and videos with a single tap.\n\nFeatures include one-tap application, custom adjustments, real-time preview, regular preset updates, and seamless integration with your favorite creative apps.',
      info: [
        { label: 'Category', value: 'Photo & Video' },
        { label: 'Size', value: '18 MB' },
        { label: 'Compatibility', value: 'Android 8.0+' },
        { label: 'Version', value: '1.0.0' },
        { label: 'Price', value: 'Free' }
      ],
      whatsnew: '• 10 new presets added\n• Custom adjustment controls\n• Performance optimizations',
      url: 'https://www.mediafire.com/file/t4r3zttpchbhjsb/Toji_Preset_1.0.0.apk/download',
      version: '1.0.0',
      price: 'Free'
    }
  };

  var detailOverlay = document.getElementById('detailOverlay');
  var detailSheet = document.getElementById('detailSheet');
  var detailBackdrop = document.getElementById('detailBackdrop');
  var detailDesc = document.getElementById('detailDesc');
  var detailMoreBtn = document.getElementById('detailMoreBtn');
  var descExpanded = false;

  function openDetail(appId) {
    var data = appData[appId];
    if (!data) return;

    document.getElementById('detailIcon').src = data.icon;
    document.getElementById('detailTitle').textContent = data.title;
    document.getElementById('detailSubtitle').textContent = data.subtitle;
    document.getElementById('detailHeroBg').style.background = data.bg;
    document.getElementById('detailPrice').textContent = data.price || 'Free';
    document.getElementById('detailGetBtn').href = data.url;

    var ratingHtml = '';
    for (var i = 0; i < 5; i++) {
      ratingHtml += '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="#ff9500" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    ratingHtml += '<span class="detail-rating-num">' + data.ratingNum + '</span>';
    document.getElementById('detailRating').innerHTML = ratingHtml;

    var shotsHtml = '';
    data.screenshots.forEach(function (src) {
      var webpSrc = src.replace(/\.jpg$/, '.webp');
      shotsHtml += '<div class="screenshot-item"><picture><source srcset="' + webpSrc + '" type="image/webp"><img src="' + src + '" alt="" loading="lazy" width="180" height="320"></picture></div>';
    });
    document.getElementById('detailScreenshots').innerHTML = shotsHtml;

    var infoHtml = '';
    data.info.forEach(function (item) {
      infoHtml += '<div class="info-row"><span class="info-label">' + item.label + '</span><span class="info-value">' + item.value + '</span></div>';
    });
    document.getElementById('detailInfo').innerHTML = infoHtml;

    descExpanded = false;
    if (detailMoreBtn) detailMoreBtn.textContent = 'more';
    if (detailDesc) {
      detailDesc.textContent = data.desc;
      detailDesc.classList.remove('expanded');
    }

    var wnHtml = data.whatsnew.replace(/\n/g, '<br>');
    if (data.version) wnHtml = '<span class="detail-version-badge">Version ' + data.version + '</span><br>' + wnHtml;
    document.getElementById('detailWhatsNew').innerHTML = wnHtml;

    if (detailSheet) detailSheet.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    detailOverlay.classList.add('open');
    requestAnimationFrame(function () {
      detailSheet.classList.add('open');
    });
  }

  function closeDetail() {
    detailSheet.classList.remove('open');
    detailOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (detailMoreBtn) {
    detailMoreBtn.addEventListener('click', function () {
      descExpanded = !descExpanded;
      detailDesc.classList.toggle('expanded', descExpanded);
      detailMoreBtn.textContent = descExpanded ? 'less' : 'more';
    });
  }

  // Open on app row / today card click (not on Get button)
  document.addEventListener('click', function (e) {
    var item = e.target.closest('.app-row, .today-card');
    if (!item) return;
    if (e.target.closest('.app-get, .today-get')) return;
    var appId = item.getAttribute('data-app');
    if (appId) openDetail(appId);
  });

  document.querySelectorAll('#detailClose, #detailTopClose, #detailBackdrop').forEach(function (el) {
    if (el) el.addEventListener('click', closeDetail);
  });

  // --- Bottom tab switching ---
  document.querySelectorAll('.tab-item').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      document.querySelectorAll('.tab-item').forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  // Update nav active state based on scroll
  var scrollSections = ['#products', '#about', '#contact'];
  var scrollMap = { '#products': 'apps', '#about': 'about', '#contact': 'contact' };
  var headerNavItems = document.querySelectorAll('.header-nav-item');
  document.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 120;
    var activeTab = 'home';
    scrollSections.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el && el.offsetTop <= scrollY) activeTab = scrollMap[sel];
    });
    headerNavItems.forEach(function (item) {
      var href = item.getAttribute('href');
      item.classList.toggle('active', (activeTab === 'home' && href === '#') || href === '#' + activeTab);
    });
    document.querySelectorAll('.tab-item').forEach(function (item) {
      var isActive = item.getAttribute('data-tab') === activeTab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
  });

})();
