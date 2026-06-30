# Contributing prompts

Thanks for making the library better! Adding a prompt takes about two minutes and only touches
one file: [`prompts.js`](prompts.js).

## How to add a prompt

1. Open `prompts.js`.
2. Find the section for your category (they're grouped by comment headers).
3. Copy an existing object in the `prompts` array and edit the fields.
4. Save, refresh the page, and confirm your prompt appears and copies correctly.
5. Open a pull request.

## Prompt object reference

```js
{
  id: 'qa-flaky',            // unique kebab-case slug (used for deep-links)
  title: 'Stabilize a flaky test',
  category: 'qa',            // MUST match one of categories[].id below
  roles: ['QA', 'Automation'],   // who benefits — shown as badges
  tags: ['playwright', 'flaky'], // lowercase keywords for search
  use: 'Use when a test passes locally but fails in CI.',
  prompt:
'Your prompt text.\n' +
'Use [SQUARE_BRACKETS] for placeholders the reader replaces.',
},
```

### Valid `category` values

| id | name |
|----|------|
| `qa` | QA & Test Automation |
| `manual` | Manual & Test Design |
| `dev` | Development |
| `review` | Code Review |
| `debug` | Debugging |
| `devops` | DevOps & CI/CD |
| `devsecops` | DevSecOps |
| `security` | Security Analysis |
| `data` | Data & SQL |
| `docs` | Documentation |
| `product` | Product & Analysis |
| `sales` | Sales & Customer |
| `leadership` | Leadership |
| `tips` | Copilot Tips |

Need a new category? Add an object to the `categories` array in `prompts.js`
(`{ id, name, blurb }`) and use that `id` on your prompt.

## Style guide for good prompts

- **Set a role.** Start with "You are a senior SDET…" — personas raise answer quality.
- **State the goal and the format.** Tell the model exactly what output you want.
- **Use placeholders, not descriptions.** Prefer `[PASTE CODE]` over "the code below".
- **Add guardrails.** e.g. "Do not invent selectors; mark them TODO instead."
- **Keep it reusable.** Avoid project-specific names, URLs, or credentials.
- **One job per prompt.** If it does two things, split it into two prompts.

## Technical rules (don't break the page)

- ⚠️ **Never** put a backtick `` ` `` or a `${` sequence inside `prompt` text — it breaks the JS string.
  Use plain words instead (say "wrap in a code fence" rather than typing fences).
- Use `\n` joined strings (as shown above) for multi-line prompts.
- `id` must be unique across the whole file.
- Never include real secrets, tokens, customer data, or internal URLs.

## Quick check before you PR

- [ ] The page loads with no errors in the browser console.
- [ ] Your prompt shows under the right category chip.
- [ ] The Copy button copies the full prompt text.
- [ ] No secrets or proprietary data included.
