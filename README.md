# Au Bon Cake — standalone static site

Self-hosted export of [auboncake.com](https://www.auboncake.com) for **GitHub Pages** (no Wix account or runtime required).

## What’s included

- All main pages (Home, Galleries, Order, Contact)
- Local copies of images/fonts used by those pages
- Relative internal links (works on GitHub Pages and locally)
- Galleries dropdown that works offline

## Preview locally

```bash
cd ~/AI/auboncake-site
python3 -m http.server 8080
```

Open http://localhost:8080/

## Deploy to GitHub Pages

```bash
cd ~/AI/auboncake-site
git init
git add .
git commit -m "Add standalone Au Bon Cake site"
gh repo create auboncake --public --source=. --remote=origin --push
```

Then: **Settings → Pages → Deploy from branch → `main` / root**.

Or drag-and-drop this folder into a new GitHub repo via the web UI.

### Custom domain

In Pages settings, set custom domain to `auboncake.com` and point DNS:

- `A` / `ALIAS` records per GitHub Pages docs, or
- `CNAME` to `YOURUSER.github.io`

Keep the included `.nojekyll` file so GitHub Pages serves folders like `static.wixstatic.com` correctly.

## Limitations (Wix → static)

- Contact / Order forms no longer submit to Wix. Connect them to Formspree, Basin, Netlify Forms, etc.
- Member account / store / Wix apps will not work.
- Some decorative Wix motion/effects may not animate.

## Image paths

Images are stored under `assets/images/` with short filenames (Wix CDN paths break on GitHub Pages).

After pulling updates, **re-upload the whole `auboncake-site` folder**, including:
- `assets/images/`
- `.nojekyll`
- all `*.html` files
