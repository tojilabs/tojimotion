// Simple initialization
function initPage() {
  try {
    console.log('Initializing page...');
    
    // Set current year in footer if element exists
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Setup theme toggle if it exists
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
      // Set initial theme icon based on current theme
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      themeToggle.textContent = isDark ? '🌙' : '☀️';
    }
    
    // Setup download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Download button clicked');
        window.open('https://www.mediafire.com/file/o4k0dh95peuogxm/Toji_Motion_16_nov_ori.apk/file', '_blank');
      });
    }
    
    // Initialize any download buttons with class 'download-button'
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-download-url');
        if (url) {
          console.log('Downloading from:', url);
          window.open(url, '_blank');
        }
      });
    });
    
    console.log('Page initialized');
  } catch (error) {
    console.error('Error initializing page:', error);
  }
}

// Toggle between light and dark theme
function toggleTheme() {
  try {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    // Update the theme attribute
    html.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update the theme toggle button text
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = isDark ? '🌙' : '☀️';
    }
  } catch (error) {
    console.error('Error toggling theme:', error);
  }
}

// Initialize everything when the DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  // DOMContentLoaded has already fired
  initPage();
}
