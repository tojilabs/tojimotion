'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.getElementById('year')!.textContent = new Date().getFullYear().toString();
    
    // Mouse tracking for button shine effect
    document.querySelectorAll('.btn-primary').forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (btn as HTMLElement).style.setProperty('--mx', x + '%');
        (btn as HTMLElement).style.setProperty('--my', y + '%');
      });
    });
  }, []);

  return (
    <>
      <div className="bg-effects">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <img src="/Project%201292%20Copy%20%5B4A988C4%5D.png" alt="Toji Labs Logo" className="brand-logo" />
            <div className="brand-text">
              <h1>Toji Labs</h1>
              <p className="muted">Creative Tools</p>
            </div>
          </div>
          <div className="header-actions">
            <a className="btn-ghost" href="#products">Products</a>
            <a className="btn-ghost" href="#about">About</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-content">
            <div className="hero-badge">Now Available</div>
            <h2 className="headline">Creative Tools for<br/><span className="gradient-text">Modern Creators</span></h2>
            <p className="subhead">Professional motion graphics and preset tools designed for speed, quality, and creative freedom.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">2</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-value">10K+</span>
                <span className="stat-label">Downloads</span>
              </div>
              <div className="stat">
                <span className="stat-value">4.9</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="container section products-section">
          <h3 className="section-title">Our Products</h3>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-glow"></div>
              <div className="product-header">
                <img src="/photo_2025-10-30_12-57-09.jpg" alt="Toji Motion Icon" className="product-icon" />
                <div className="product-info">
                  <h4 className="product-name">Toji Motion</h4>
                  <p className="product-tagline">Motion Graphics Tool</p>
                </div>
              </div>
              <p className="product-description">Create stunning motion graphics with ease. Professional animation tools packed in an intuitive interface.</p>
              <ul className="product-features">
                <li>Keyframe animation</li>
                <li>Real-time preview</li>
                <li>Export to multiple formats</li>
                <li>GPU acceleration</li>
              </ul>
              <a href="https://www.mediafire.com/file/o4k0dh95peuogxm/Toji_Motion_16_nov_ori.apk/file" 
                 className="btn-primary" 
                 target="_blank" rel="noopener">
                <span className="btn-shine"></span>
                <svg className="platform-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M3,4H21A1,1 0 0,1 22,5V19A1,1 0 0,1 21,20H3A1,1 0 0,1 2,19V5A1,1 0 0,1 3,4M4,18H20V6H4V18M5,8H10V15H5V8M6,9V14H9V9H6M11,8H13V9H14V16H11V15H13V10H11V8M15,8H17V9H18V16H15V15H17V10H15V8Z" />
                </svg>
                Download APK
                <span className="btn-sub">v2.1.0</span>
              </a>
            </div>

            <div className="product-card">
              <div className="product-glow"></div>
              <div className="product-header">
                <img src="/photo_2026-04-18_12-37-22.jpg" alt="Toji Preset Icon" className="product-icon" />
                <div className="product-info">
                  <h4 className="product-name">Toji Preset</h4>
                  <p className="product-tagline">Preset Collection</p>
                </div>
              </div>
              <p className="product-description">Curated collection of professional presets. Elevate your projects with one-click styling solutions.</p>
              <ul className="product-features">
                <li>500+ premium presets</li>
                <li>Color grading LUTs</li>
                <li>Transition effects</li>
                <li>Regular updates</li>
              </ul>
              <a href="#" 
                 className="btn-primary" 
                 target="_blank" rel="noopener">
                <span className="btn-shine"></span>
                <svg className="platform-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="currentColor" d="M3,4H21A1,1 0 0,1 22,5V19A1,1 0 0,1 21,20H3A1,1 0 0,1 2,19V5A1,1 0 0,1 3,4M4,18H20V6H4V18M5,8H10V15H5V8M6,9V14H9V9H6M11,8H13V9H14V16H11V15H13V10H11V8M15,8H17V9H18V16H15V15H17V10H15V8Z" />
                </svg>
                Download APK
                <span className="btn-sub">v1.0.0</span>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="container section">
          <h3 className="section-title">About Toji Labs</h3>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                </svg>
              </div>
              <h4>Our Mission</h4>
              <p>Building powerful, intuitive creative tools that empower artists and creators to bring their visions to life without barriers.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13.03,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.65,20.06C17.26,19.67 17.26,19.04 17.65,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11.03 19.46,10.13L20.67,8.05C21.5,9.5 22,11.18 22,13Z" />
                </svg>
              </div>
              <h4>Performance First</h4>
              <p>Every tool is optimized for speed and efficiency. We believe creativity shouldn't be held back by slow software.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25Z" />
                </svg>
              </div>
              <h4>Community Driven</h4>
              <p>We listen to our users. Feature requests, bug reports, and feedback directly shape our roadmap.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="container section">
          <h3 className="section-title">FAQ</h3>
          <div className="faq">
            <details>
              <summary>How do I install the APK?</summary>
              <p>Download the file, tap it on your device, and allow installs from your browser or file manager when prompted. Make sure "Install from unknown sources" is enabled in settings.</p>
            </details>
            <details>
              <summary>Are these apps safe?</summary>
              <p>All our apps are scanned and verified. We serve downloads directly with full transparency. Check file hashes to verify authenticity.</p>
            </details>
            <details>
              <summary>Do the apps auto-update?</summary>
              <p>Currently, updates are manual. Check this page or follow our channels for new releases. We recommend checking monthly for updates.</p>
            </details>
            <details>
              <summary>What devices are supported?</summary>
              <p>Android 8.0 (Oreo) or newer. ARM64 devices recommended for best performance. Both phones and tablets are supported.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="footer-logo-text">Toji Labs</span>
            <span className="footer-copy">© <span id="year"></span> All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="#products" className="footer-link">Products</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#faq" className="footer-link">FAQ</a>
          </div>
        </div>
      </footer>
    </>
  );
}
