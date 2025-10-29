// ---- Config ----
// Set your APK file path. When you upload to GitHub, place the APK at /assets/your-app.apk
const APK_URL = 'assets/your-app.apk';
const VERSION = 'v1.0.0';

// ---- Helpers ----
const $ = (sel, root = document) => root.querySelector(sel);
const fmtBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes < 0) return 'unknown size';
  const units = ['B','KB','MB','GB'];
  let i = 0; while (bytes >= 1024 && i < units.length-1) { bytes /= 1024; i++; }
  return `${bytes.toFixed(bytes >= 1024 ? 1 : 0)} ${units[i]}`;
};

// ---- State ----
const state = {
  size: null,
  hash: null,
  available: false,
  downloads: Number(localStorage.getItem('downloads') || 0)
};

// ---- UI Init ----
function initUI() {
  $('#year').textContent = new Date().getFullYear();
  $('#versionTag').textContent = VERSION;
  $('#downloadCount').textContent = `${state.downloads} downloads`;

  // Theme toggle
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.dataset.theme = saved;
  else document.documentElement.dataset.theme = prefersDark ? 'dark' : 'dark';
  $('#themeToggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  // Carousel autoplay
  const carousel = document.querySelector('.carousel');
  if (carousel && carousel.dataset.autoplay === 'true') {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % carousel.children.length;
      carousel.scrollTo({ left: i * carousel.clientWidth, behavior: 'smooth' });
    }, 3200);
  }
}

// ---- APK check ----
async function head(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    if (!res.ok) throw new Error('not ok');
    return res;
  } catch (e) { return null; }
}

async function computeHash(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const hashBuf = await crypto.subtle.digest('SHA-256', buf);
    const hashArr = Array.from(new Uint8Array(hashBuf), b => b.toString(16).padStart(2,'0'));
    return hashArr.join('');
  } catch (e) { return null; }
}

async function prepareDownload() {
  const btn = $('#downloadBtn');
  const sizeEl = $('#fileSize');
  const updatedAtEl = $('#updatedAt');

  sizeEl.textContent = '• checking…';
  const res = await head(APK_URL);
  if (!res) {
    btn.disabled = true;
    sizeEl.textContent = '• not uploaded yet';
    updatedAtEl.textContent = 'Upload your APK to /assets/your-app.apk';
    return;
  }

  state.available = true;
  const len = res.headers.get('content-length');
  state.size = len ? Number(len) : null;
  sizeEl.textContent = state.size ? `• ${fmtBytes(state.size)}` : '• size unknown';

  const lastMod = res.headers.get('last-modified');
  if (lastMod) {
    const d = new Date(lastMod);
    const fmt = new Intl.DateTimeFormat(undefined, { year:'numeric', month:'short', day:'2-digit' });
    updatedAtEl.textContent = `Updated ${fmt.format(d)}`;
  }

  // Pre-compute hash in background (optional)
  computeHash(APK_URL).then(h => {
    if (h) state.hash = h;
  });
}

// ---- Download action ----
function wireDownload() {
  const btn = $('#downloadBtn');
  const label = btn.querySelector('.btn-label');
  btn.addEventListener('click', async () => {
    if (!state.available) return;
    label.textContent = 'Preparing…';
    btn.disabled = true;
    try {
      // Trigger file download via navigating to APK_URL with a cache-busting query
      const url = `${APK_URL}?t=${Date.now()}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();

      state.downloads += 1;
      localStorage.setItem('downloads', String(state.downloads));
      $('#downloadCount').textContent = `${state.downloads} downloads`;
    } finally {
      btn.disabled = false;
      label.textContent = 'Download APK';
    }
  });
}

// ---- Hash copy ----
function wireCopyHash() {
  $('#copyHash').addEventListener('click', async (e) => {
    e.preventDefault();
    if (!state.hash) {
      alert('Hash is not ready yet. Try again in a moment after the file loads.');
      return;
    }
    await navigator.clipboard.writeText(state.hash);
    const el = e.currentTarget;
    const prev = el.textContent;
    el.textContent = 'Copied!';
    setTimeout(() => { el.textContent = prev; }, 1200);
  });
}

// ---- Start ----
window.addEventListener('DOMContentLoaded', async () => {
  initUI();
  await prepareDownload();
  wireDownload();
  wireCopyHash();
});
