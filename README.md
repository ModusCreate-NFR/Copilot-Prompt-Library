# ⚡ Copilot Prompt Library

A curated, **searchable** library of battle-tested AI prompts for the whole organization —
QA, developers, DevOps, data, product, sales and leadership.

Zero dependencies. Zero build step. Zero credentials. Just open it, search, and **copy**.

> Built with GitHub Copilot, to help everyone get more out of GitHub Copilot.

---

## Why this exists

Most people use AI assistants at 10% of their potential because they don't know _what_ to ask.
This library packages the prompts that actually work into one place the whole team can search,
copy, and contribute to.

- **For everyone** — filter by role (QA, Dev, Sales, Leadership…) or search free-text.
- **Copy-ready** — every prompt has placeholders like `[PASTE CODE]` so you just fill in the blanks.
- **Self-contained** — a single static site, no server, no login, no data leaves the page.
- **Team-owned** — add a prompt by editing one file and opening a pull request.

## Features

- Instant client-side search across titles, prompt text, tags and roles
- Category filter chips with live counts
- One-click **Copy** for any prompt (works on GitHub Pages and from a local file)
- **Export visible** — copy every prompt currently shown as a Markdown bundle
- Light / dark theme (remembers your choice)
- Keyboard shortcut: press <kbd>/</kbd> to jump to search
- Fully responsive and accessible

## Run it locally

It's plain HTML/CSS/JS, so you can simply open the file:

```bash
open index.html        # macOS
# or just double-click index.html
```

Or serve it (recommended, so clipboard works everywhere):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages

**Option A — automatic (included workflow):**

1. Push this folder to a GitHub repository (default branch `main`).
2. In the repo, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) publishes the
   site on every push to `main`. Your URL appears in the Actions run summary.

**Option B — no workflow:**

1. **Settings → Pages → Source: Deploy from a branch → `main` / root**.
2. Wait a minute, then open the published URL.

## Add your own prompt

The entire dataset lives in [prompts.js](prompts.js). To add a prompt, copy one object in the
`prompts` array, change the fields, and open a PR. Full details in
[CONTRIBUTING.md](CONTRIBUTING.md).

```js
{
  id: 'qa-my-new-prompt',
  title: 'Short, action-oriented name',
  category: 'qa',                       // must match a categories[].id
  roles: ['QA', 'Dev'],
  tags: ['playwright', 'example'],
  use: 'Use this when ...',
  prompt:
'Your prompt text here.\n' +
'Use [SQUARE_BRACKETS] for placeholders the user fills in.',
},
```

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup |
| `styles.css` | Styling + light/dark theme |
| `app.js` | Search, filter, copy, export, theme |
| `prompts.js` | **The content** — edit this to add prompts |
| `.github/workflows/deploy.yml` | Auto-deploy to GitHub Pages |

## License

Internal/company use. Add a license file if you open-source it.
