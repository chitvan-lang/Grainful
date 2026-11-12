# Grainful website: all code and backups

Grainful (grainful.in) rice and ghee exporter website, static HTML/CSS/JS.

## site/
The current, chosen build (the "Himon" base template), latest as of 29 Oct 2026. Open `site/index.html`
in a browser, or serve the folder with any static server. Pages:
home, about-us, our-products, grainful-basmati-rice, grainful-non-basmati-rice, natural-wonder-ghee,
we-make-your-brand, grainful-private-label, grainful-white-label-packaging, contact-us.
Images are in `site/assets/img` (real photos; soft ones were sharpened with Real-ESRGAN, grade photos supplied by the client).
The contact form is mailto-only (no backend).

## backups/
- `client-preview-github-pages/deployed-files`: the copy published as the client preview at
  https://ketanahlawat11.github.io/grainful/ . Same as `site/` plus a `noindex, nofollow` tag on every page
  (so the preview never competes with grainful.in in Google) and `.nojekyll`.
- `client-preview-github-pages/preview-repo-full-history.bundle`: the preview repository with its full history
  (55 commits, 24 to 29 Oct 2026). Restore with `git clone preview-repo-full-history.bundle grainful-preview`.
- `old-rejected-build (grainful redesign)`: the earlier design that was rejected; kept for reference only.
- `image-generation-pre-resize`: image work before resizing (generated and source images, private label set).

## Going live
Copy `site/` to the hosting for grainful.in. Do NOT use the preview copy: its pages carry `noindex`.
