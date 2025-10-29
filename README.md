# Toji Motion — APK Download Site

A simple, static App Store–style landing page to publish and download your Android APK. Built with plain HTML/CSS/JS and ready for GitHub Pages.

## Quick start

1. Clone or upload these files to a new GitHub repository.
2. Place your APK at `assets/your-app.apk` (create the `assets` folder if it doesn't exist).
3. Commit and push.
4. In GitHub, open Settings → Pages → Build and deployment → Source → select `Deploy from a branch` and choose `main` branch, `/ (root)` folder.
5. Wait for Pages to deploy, then visit your site URL shown in the Pages settings.

## Customize

- File path: update the APK path or version in `app.js`:
  ```js
  const APK_URL = 'assets/your-app.apk';
  const VERSION = 'v1.0.0';
  ```
- Branding/text: edit titles and content in `index.html`.
- Colors/animations: tweak tokens and styles in `styles.css`.

## How it works

- The site attempts a `HEAD` request to your APK to detect availability, size, and last modified time.
- If the APK is missing, the Download button is disabled and a hint is shown.
- When available, clicking Download starts the file download and increments a local (browser-only) counter.
- The SHA-256 hash is computed in the background. Use “Copy file hash” in the footer once ready.

## Notes

- This is a static site; no backend or analytics are included. The download counter is per-browser via `localStorage`.
- GitHub Pages serves static files; large APKs are fine, but keep repo size in mind.
- You can use a release asset URL instead of committing the APK to the repo. For example, set `APK_URL` to a GitHub Releases direct link.

## License

MIT
