# Theynujan Thangavelu: Portfolio

Static site: HTML, CSS and vanilla JavaScript. No build step. The only external request is Google Fonts (Newsreader and Instrument Sans); the site falls back to Georgia and system fonts if it is blocked.

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── cv.pdf          <- your CV (currently the uploaded one)
│   ├── profile.jpg     <- add this (see below)
│   └── projects/       <- project figures go here
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Replace the profile photo

1. Save a portrait as `assets/profile.jpg`. Use a 4:5 ratio (for example 800 x 1000 px), under 200 KB.
2. Until the file exists, the page shows a "TT" placeholder automatically.

## Replace the CV

Overwrite `assets/cv.pdf`, keeping the same file name.

**Before you publish:** the current CV lists your two referees' personal phone numbers and emails. Anything in a public repo or site is scrapeable. Make a public version of the CV without the References block and use that as `assets/cv.pdf`. Give the full version to employers directly.

## Add project images

1. Put images in `assets/projects/` (WebP or JPG, around 1200 px wide).
2. In `index.html`, replace a placeholder such as
   `<div class="plate plate-sonar" ...></div>`
   with
   `<img class="plate" src="assets/projects/sonar.jpg" alt="Describe the figure" loading="lazy" width="1200" height="525">`
   and add `object-fit: cover; width: 100%;` to `.plate` in `style.css` if needed.

## Fill the marked gaps

Search `index.html` for `class="placeholder"`. The yellow highlighted text marks content your CV does not contain yet (your role details and measured results for the YOLOv11 research). Replace it with real facts or delete the line.

## Connect the contact form

The form currently opens the visitor's email app. To receive messages directly:

1. Create a free form at https://formspree.io and copy the form ID.
2. In `index.html`, change `https://formspree.io/f/YOUR_FORM_ID` to your real URL.

## Deploy

### GitHub Pages (account: Theynujan)

1. Create a repo named exactly `theynujan.github.io`.
2. Upload the contents of this folder so `index.html` sits at the repo root.
3. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. The site goes live at https://theynujan.github.io/ within a few minutes.

### Netlify

1. Log in at netlify.com > Add new site > Deploy manually.
2. Drag the `portfolio` folder onto the page. You get a live URL immediately.
3. Optional: connect the GitHub repo for automatic deploys.

## Pre-publish checklist

- [ ] Public CV without referee contact details in `assets/cv.pdf`
- [ ] `assets/profile.jpg` added
- [ ] Yellow placeholders resolved
- [ ] Formspree ID set
- [ ] Add `og:image` meta tag once you have a share image
