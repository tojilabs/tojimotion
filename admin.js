// --- Simple gate ---
// IMPORTANT: Set your passcode here. This is only client-side gating; do not rely on it as strong security.
const PASSCODE = 'changeme'; // TODO: change this to your private passcode

const $ = (sel, root = document) => root.querySelector(sel);

function initGate() {
  const input = $('#pass');
  const unlock = $('#unlock');
  const panel = document.querySelector('.panel');

  unlock.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value.trim() === PASSCODE) {
      panel.hidden = false;
      document.querySelector('.gate').hidden = true;
    } else {
      alert('Incorrect passcode');
    }
  });
}

// --- Hash helper ---
async function sha256Hex(file) {
  const buf = await file.arrayBuffer();
  const hashBuf = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuf), b => b.toString(16).padStart(2, '0')).join('');
}

function base64FromArrayBuffer(buf) {
  // Convert ArrayBuffer to Base64
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

// --- GitHub upload via Contents API ---
async function getFileSha({ owner, repo, path, ref, token }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`;
  const res = await fetch(url, { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to get file info: ${res.status}`);
  const data = await res.json();
  return data.sha || null;
}

async function putFile({ owner, repo, path, ref, token, contentBase64, message, sha }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
  const body = { message, content: contentBase64, branch: ref };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Upload failed: ${res.status} ${t}`);
  }
  return res.json();
}

function initUploadForm() {
  const form = $('#uploadForm');
  const status = $('#status');
  const hashOut = $('#hashOut');
  const hashBtn = $('#hashBtn');
  const fileInput = $('#appFile');
  const versionInput = $('#version');
  const appTypeSelect = $('#appType');

  hashBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return alert('Select a file first');
    hashOut.textContent = 'Computing SHA-256…';
    const hash = await sha256Hex(file);
    hashOut.textContent = `SHA-256: ${hash}`;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';

    const file = fileInput.files[0];
    const appType = appTypeSelect.value;

    if (!file) {
      status.textContent = '❌ No file selected';
      return;
    }

    // Validate file extension based on selected type
    const fileExt = file.name.split('.').pop().toLowerCase();
    if ((appType === 'android' && fileExt !== 'apk') || 
        (appType === 'ios' && fileExt !== 'ipa')) {
      status.textContent = `❌ Please select a .${appType === 'android' ? 'apk' : 'ipa'} file for ${appType}`;
      return;
    }

    const owner = $('#owner').value.trim();
    const repo = $('#repo').value.trim();
    const branch = $('#branch').value.trim() || 'main';
    const ext = appType === 'android' ? 'apk' : 'ipa';
    const pathInput = $('#path');
    const path = pathInput.value || `releases/app-${appType}-${Date.now()}.${ext}`;
    const token = $('#token').value.trim();
    const version = versionInput.value.trim();

    if (!owner || !repo || !path || !token || !file) {
      alert('Please fill all fields and select a file.');
      return;
    }

    try {
      const labelEl = form.querySelector('button[type="submit"] .btn-label');
      const prevLabel = labelEl.textContent;
      labelEl.textContent = 'Uploading…';

      const buf = await file.arrayBuffer();
      const base64 = base64FromArrayBuffer(buf);
      const sha = await getFileSha({ owner, repo, path, ref: branch, token });
      const message = `Upload APK ${path}${version ? ` (${version})` : ''}`;

      status.textContent = 'Sending to GitHub…';
      const res = await putFile({ owner, repo, path, ref: branch, token, contentBase64: base64, message, sha });

      status.textContent = `Done. Commit ${res.commit.sha.substring(0, 7)}\nURL: ${res.content.html_url}`;
      labelEl.textContent = prevLabel;
    } catch (err) {
      status.textContent = String(err);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initGate();
  initUploadForm();
});
