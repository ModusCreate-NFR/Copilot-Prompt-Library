/*
 * Copilot Prompt Library — data file
 * -----------------------------------
 * This is the ONLY file most contributors need to edit.
 * Add a new prompt by copying an object in the `prompts` array below.
 *
 * Each prompt:
 *   id       Unique slug (kebab-case). Used for deep-links (#id).
 *   title    Short, action-oriented name.
 *   category Must match one of the `categories[].id` values.
 *   roles    Who benefits (free text chips): QA, Dev, Sales, Leadership, ...
 *   tags     Keywords for search (lowercase).
 *   use      One line: "use this when ...".
 *   prompt   The actual prompt text. Use [SQUARE_BRACKETS] for placeholders.
 *
 * Do NOT use backtick or dollar-brace sequences inside prompt text.
 */
globalThis.PROMPT_LIBRARY = {
  meta: {
    title: 'Copilot Prompt Library',
    subtitle: 'Battle-tested prompts for the whole team — QA, Dev, Sales & Leadership.',
    updated: '2026-06-30',
  },

  categories: [
    { id: 'qa', name: 'QA & Test Automation', blurb: 'Generate, stabilize and review automated tests.' },
    { id: 'manual', name: 'Manual & Test Design', blurb: 'Design cases, charters and exploratory sessions.' },
    { id: 'dev', name: 'Development', blurb: 'Write, refactor and scaffold production code.' },
    { id: 'review', name: 'Code Review', blurb: 'Review pull requests and raise quality.' },
    { id: 'debug', name: 'Debugging', blurb: 'Find root causes fast.' },
    { id: 'devops', name: 'DevOps & CI/CD', blurb: 'Pipelines, IaC and release automation.' },
    { id: 'data', name: 'Data & SQL', blurb: 'Queries, transforms and analysis.' },
    { id: 'docs', name: 'Documentation', blurb: 'READMEs, ADRs and explanations.' },
    { id: 'product', name: 'Product & Analysis', blurb: 'Requirements, stories and acceptance criteria.' },
    { id: 'sales', name: 'Sales & Customer', blurb: 'Outreach, demos and follow-ups.' },
    { id: 'leadership', name: 'Leadership', blurb: 'Status, decisions and communication.' },
    { id: 'tips', name: 'Copilot Tips', blurb: 'Get better answers from any AI assistant.' },
  ],

  prompts: [
    // ---------------- QA & Test Automation ----------------
    {
      id: 'qa-pw-scaffold',
      title: 'Scaffold a Playwright test from acceptance criteria',
      category: 'qa',
      roles: ['QA', 'Automation'],
      tags: ['playwright', 'typescript', 'e2e', 'scaffold'],
      use: 'Use when you have a story and want a runnable test skeleton fast.',
      prompt:
'You are a senior SDET working in Playwright with TypeScript.\n' +
'Here is a user story and its acceptance criteria:\n\n' +
'[PASTE STORY + ACCEPTANCE CRITERIA]\n\n' +
'Generate a Playwright test file that:\n' +
'- Uses the test and expect APIs from @playwright/test.\n' +
'- Has one describe block and one test per acceptance criterion.\n' +
'- Uses role-based and label-based locators (getByRole, getByLabel); avoid brittle CSS/XPath.\n' +
'- Adds web-first assertions (expect(locator).toBeVisible(), toHaveText, etc.).\n' +
'- Leaves a TODO comment where I must supply real test data or URLs.\n' +
'Do not invent selectors you cannot infer; mark them with a TODO instead.',
    },
    {
      id: 'qa-pom',
      title: 'Convert a test into a Page Object Model',
      category: 'qa',
      roles: ['QA', 'Automation'],
      tags: ['playwright', 'pom', 'refactor', 'maintainability'],
      use: 'Use to refactor inline selectors into a reusable page object.',
      prompt:
'Refactor the following Playwright test into the Page Object Model pattern.\n\n' +
'[PASTE TEST]\n\n' +
'Produce two files:\n' +
'1. A page object class exposing readable methods (e.g. login(user, pass)) and private locators.\n' +
'2. The spec file rewritten to use that page object.\n' +
'Keep locators role/label based, type everything, and do not change the assertions behaviour.',
    },
    {
      id: 'qa-flaky',
      title: 'Diagnose and stabilize a flaky test',
      category: 'qa',
      roles: ['QA', 'Automation'],
      tags: ['flaky', 'stability', 'waits', 'race-condition'],
      use: 'Use when a test passes locally but fails intermittently in CI.',
      prompt:
'This Playwright test is flaky in CI but usually passes locally.\n\n' +
'[PASTE TEST + the error/stack from a failing run]\n\n' +
'Identify the most likely causes of flakiness (timing, hard waits, shared state, animation, network).\n' +
'Rewrite it to be deterministic using web-first assertions and auto-waiting instead of fixed timeouts.\n' +
'List each change you made and the race condition it removes.',
    },
    {
      id: 'qa-wdio-migrate',
      title: 'Translate a WDIO test to Playwright (or vice versa)',
      category: 'qa',
      roles: ['QA', 'Automation'],
      tags: ['wdio', 'webdriverio', 'playwright', 'migration'],
      use: 'Use when migrating a suite between frameworks.',
      prompt:
'Convert the following WebdriverIO test to Playwright with TypeScript, preserving behaviour.\n\n' +
'[PASTE WDIO TEST]\n\n' +
'Map WDIO commands to their Playwright equivalents, replace browser.pause with web-first assertions,\n' +
'and note any WDIO feature that has no direct Playwright equivalent so I can review it.',
    },
    {
      id: 'qa-api-test',
      title: 'Write API tests from an endpoint spec',
      category: 'qa',
      roles: ['QA', 'Automation', 'Dev'],
      tags: ['api', 'rest', 'contract', 'playwright-request'],
      use: 'Use to cover an endpoint with happy-path and edge cases.',
      prompt:
'Here is an API endpoint description (method, path, request, responses):\n\n' +
'[PASTE ENDPOINT SPEC]\n\n' +
'Write API tests using Playwright request context that cover:\n' +
'- The happy path with status and schema assertions.\n' +
'- Auth failures (401/403), validation errors (400), and not-found (404).\n' +
'- One boundary case for each input field.\n' +
'Group them clearly and add a short comment per test explaining the risk it covers.',
    },
    {
      id: 'qa-locator-audit',
      title: 'Audit selectors for brittleness',
      category: 'qa',
      roles: ['QA', 'Automation'],
      tags: ['locators', 'selectors', 'best-practice', 'review'],
      use: 'Use to harden a page object before it causes failures.',
      prompt:
'Review the locators in this file for brittleness.\n\n' +
'[PASTE PAGE OBJECT / SELECTORS]\n\n' +
'For each locator: rate it (robust / risky / brittle), explain why, and suggest a more resilient\n' +
'role-, label- or test-id-based alternative. Recommend where a stable data-testid would help most.',
    },
    {
      id: 'qa-coverage-gaps',
      title: 'Find test coverage gaps for a feature',
      category: 'qa',
      roles: ['QA'],
      tags: ['coverage', 'risk', 'analysis'],
      use: 'Use to spot what your current tests are NOT checking.',
      prompt:
'Here is a feature description and the list of tests we already have.\n\n' +
'Feature:\n[PASTE FEATURE]\n\nExisting tests:\n[PASTE TEST TITLES]\n\n' +
'Identify coverage gaps. Group missing cases by: functional, negative, boundary, security,\n' +
'accessibility, and performance. Rank the top 5 by risk and explain the impact of each gap.',
    },
    {
      id: 'qa-bug-report',
      title: 'Turn a failure into a clean bug report',
      category: 'qa',
      roles: ['QA'],
      tags: ['bug', 'jira', 'repro', 'triage'],
      use: 'Use to write a crisp, reproducible defect ticket.',
      prompt:
'Turn these raw notes from a failed test into a structured bug report.\n\n' +
'[PASTE NOTES / ERROR / OBSERVATIONS]\n\n' +
'Output: Title, Environment, Preconditions, Steps to Reproduce (numbered), Expected Result,\n' +
'Actual Result, Severity with justification, and a Suspected Area. Keep it concise and factual.',
    },

    // ---------------- Manual & Test Design ----------------
    {
      id: 'manual-cases',
      title: 'Generate manual test cases (tool-agnostic CSV)',
      category: 'manual',
      roles: ['QA'],
      tags: ['test-cases', 'csv', 'testrail', 'xray', 'zephyr'],
      use: 'Use to draft cases you can import into any test management tool.',
      prompt:
'Design manual test cases for the requirement below.\n\n' +
'[PASTE REQUIREMENT]\n\n' +
'Return a CSV table with columns: Title, Preconditions, Steps, Expected Result, Priority, Type.\n' +
'Cover positive, negative, boundary and accessibility scenarios. One row per case, steps numbered\n' +
'inside the cell. Keep wording tool-neutral so it imports into TestRail, Xray or Zephyr.',
    },
    {
      id: 'manual-charter',
      title: 'Create an exploratory testing charter',
      category: 'manual',
      roles: ['QA'],
      tags: ['exploratory', 'charter', 'session-based'],
      use: 'Use to focus a timeboxed exploratory session.',
      prompt:
'Write an exploratory testing charter for this area:\n\n[PASTE FEATURE/AREA]\n\n' +
'Use the format: Explore [target] with [resources] to discover [information].\n' +
'Then list: areas of interest, risks to probe, test data ideas, oracles to judge correctness,\n' +
'and 5 starting questions. Keep it to a 60-minute session.',
    },
    {
      id: 'manual-bdd',
      title: 'Write Gherkin scenarios from a story',
      category: 'manual',
      roles: ['QA', 'Product'],
      tags: ['bdd', 'gherkin', 'cucumber', 'acceptance'],
      use: 'Use to express acceptance criteria as Given/When/Then.',
      prompt:
'Convert this user story into Gherkin scenarios.\n\n[PASTE STORY]\n\n' +
'Produce a Feature with a clear narrative and multiple Scenario blocks covering happy path,\n' +
'alternate flows and error cases. Use Scenario Outline with Examples where inputs vary.\n' +
'Keep steps declarative (business language), not UI-step-by-step.',
    },
    {
      id: 'manual-checklist',
      title: 'Build a release smoke-test checklist',
      category: 'manual',
      roles: ['QA'],
      tags: ['smoke', 'checklist', 'release', 'regression'],
      use: 'Use before sign-off to verify critical paths quickly.',
      prompt:
'Create a smoke-test checklist for a release of this product:\n\n[PASTE PRODUCT/MODULES]\n\n' +
'List the minimum critical-path checks needed to declare the build healthy, grouped by module.\n' +
'For each item give the check and the expected result. Keep it to what one person can run in 30 minutes.',
    },
    {
      id: 'manual-a11y',
      title: 'Accessibility test pass (WCAG)',
      category: 'manual',
      roles: ['QA'],
      tags: ['accessibility', 'a11y', 'wcag', 'keyboard'],
      use: 'Use to do a structured accessibility review of a screen.',
      prompt:
'Act as an accessibility specialist. For the screen described below, give me a WCAG 2.2 AA\n' +
'review checklist tailored to its elements.\n\n[PASTE SCREEN DESCRIPTION]\n\n' +
'Cover keyboard navigation, focus order, contrast, alt text, form labels, ARIA roles and\n' +
'screen-reader announcements. For each, state what to verify and the common failure to watch for.',
    },

    // ---------------- Development ----------------
    {
      id: 'dev-explain',
      title: 'Explain unfamiliar code',
      category: 'dev',
      roles: ['Dev', 'QA'],
      tags: ['explain', 'onboarding', 'comprehension'],
      use: 'Use to understand a file before changing it.',
      prompt:
'Explain what this code does, step by step, for someone new to the codebase.\n\n[PASTE CODE]\n\n' +
'Cover: its purpose, key inputs and outputs, side effects, external dependencies, and any\n' +
'edge cases or assumptions. End with the riskiest line to change and why.',
    },
    {
      id: 'dev-refactor',
      title: 'Refactor for readability without changing behaviour',
      category: 'dev',
      roles: ['Dev'],
      tags: ['refactor', 'clean-code', 'maintainability'],
      use: 'Use to clean up code while keeping it green.',
      prompt:
'Refactor this code for readability and maintainability WITHOUT changing its behaviour.\n\n' +
'[PASTE CODE]\n\n' +
'Improve naming, remove duplication, reduce nesting, and extract well-named functions.\n' +
'Do not add features or change the public API. List each change and why it is safe.',
    },
    {
      id: 'dev-tests-for-code',
      title: 'Write unit tests for existing code',
      category: 'dev',
      roles: ['Dev', 'QA'],
      tags: ['unit-tests', 'jest', 'vitest', 'coverage'],
      use: 'Use to add a safety net before refactoring.',
      prompt:
'Write thorough unit tests for the function below using [JEST/VITEST].\n\n[PASTE FUNCTION]\n\n' +
'Cover happy path, edge cases, invalid input and error handling. Use clear test names that read\n' +
'as specifications. Mock external dependencies. Point out any branch you could not test and why.',
    },
    {
      id: 'dev-implement-from-spec',
      title: 'Implement a function from a spec',
      category: 'dev',
      roles: ['Dev'],
      tags: ['implementation', 'typescript', 'spec'],
      use: 'Use to generate an implementation against a clear contract.',
      prompt:
'Implement the following specification in [LANGUAGE].\n\n[PASTE SPEC: inputs, outputs, constraints]\n\n' +
'Requirements: handle the documented edge cases, validate inputs at the boundary only, keep it\n' +
'pure where possible, and add concise comments only where intent is non-obvious. Then list the\n' +
'assumptions you made.',
    },
    {
      id: 'dev-regex',
      title: 'Build and explain a regular expression',
      category: 'dev',
      roles: ['Dev', 'QA'],
      tags: ['regex', 'validation', 'parsing'],
      use: 'Use to craft a regex you can actually maintain.',
      prompt:
'I need a regular expression that matches: [DESCRIBE WHAT TO MATCH] and must NOT match:\n' +
'[DESCRIBE COUNTER-EXAMPLES].\n\n' +
'Provide the regex, a plain-English breakdown of each part, 5 matching and 5 non-matching\n' +
'examples, and a note on any catastrophic-backtracking risk.',
    },
    {
      id: 'dev-error-handling',
      title: 'Add robust error handling',
      category: 'dev',
      roles: ['Dev'],
      tags: ['errors', 'resilience', 'edge-cases'],
      use: 'Use to harden code that touches I/O or external services.',
      prompt:
'Review this code and add appropriate error handling.\n\n[PASTE CODE]\n\n' +
'Only handle errors that can realistically occur (I/O, network, parsing, null/undefined at\n' +
'boundaries). Fail loudly with useful messages, avoid swallowing errors, and do not add handling\n' +
'for impossible states. Explain each case you added.',
    },

    // ---------------- Code Review ----------------
    {
      id: 'review-pr',
      title: 'Review a pull request diff',
      category: 'review',
      roles: ['Dev', 'QA'],
      tags: ['pull-request', 'review', 'quality'],
      use: 'Use to get a structured first-pass review of a diff.',
      prompt:
'Act as a senior reviewer. Review this diff and group feedback by severity\n' +
'(Blocking / Should-fix / Nit).\n\n[PASTE DIFF]\n\n' +
'Check correctness, edge cases, security, readability, tests and naming. For each point give the\n' +
'file/line, the issue, and a concrete suggested change. Praise anything done well briefly.',
    },
    {
      id: 'review-security',
      title: 'Security review against OWASP Top 10',
      category: 'review',
      roles: ['Dev', 'QA'],
      tags: ['security', 'owasp', 'vulnerability'],
      use: 'Use to catch common vulnerabilities before merge.',
      prompt:
'Review this code for security issues, focusing on the OWASP Top 10.\n\n[PASTE CODE]\n\n' +
'Look for injection, broken auth, sensitive-data exposure, SSRF, insecure deserialization and\n' +
'misconfigured access control. For each finding: severity, the vulnerable line, an exploit\n' +
'sketch, and the fix. If you find nothing, say so and state what you checked.',
    },
    {
      id: 'review-perf',
      title: 'Spot performance problems',
      category: 'review',
      roles: ['Dev'],
      tags: ['performance', 'optimization', 'complexity'],
      use: 'Use to find hotspots before they hit production.',
      prompt:
'Analyze this code for performance problems.\n\n[PASTE CODE]\n\n' +
'Identify hot paths, unnecessary work, N+1 queries, and avoidable allocations. Give the Big-O\n' +
'of the main operations, the single highest-impact optimization, and the trade-offs of making it.',
    },
    {
      id: 'review-pr-summary',
      title: 'Summarize a PR for reviewers',
      category: 'review',
      roles: ['Dev'],
      tags: ['pull-request', 'summary', 'communication'],
      use: 'Use to write a reviewer-friendly PR description.',
      prompt:
'Write a clear pull-request description from this diff.\n\n[PASTE DIFF OR COMMITS]\n\n' +
'Sections: What changed, Why, How to test, Risk/rollback, and Screenshots placeholder.\n' +
'Keep it skimmable and call out anything reviewers should look at closely.',
    },

    // ---------------- Debugging ----------------
    {
      id: 'debug-stacktrace',
      title: 'Root-cause a stack trace',
      category: 'debug',
      roles: ['Dev', 'QA'],
      tags: ['stacktrace', 'error', 'root-cause'],
      use: 'Use to turn an error into an action plan.',
      prompt:
'Here is an error and stack trace plus the relevant code.\n\n' +
'Error:\n[PASTE ERROR + STACK]\n\nCode:\n[PASTE CODE]\n\n' +
'Give the most likely root cause, ranked alternatives, the exact line to inspect first, and the\n' +
'minimal change to confirm the hypothesis. Do not propose a fix until the cause is identified.',
    },
    {
      id: 'debug-rubber-duck',
      title: 'Rubber-duck a bug with me',
      category: 'debug',
      roles: ['Dev', 'QA'],
      tags: ['debugging', 'reasoning', 'questions'],
      use: 'Use when you are stuck and need structured questions.',
      prompt:
'I am stuck on a bug. Act as a debugging partner. Here is what I know:\n\n[DESCRIBE SYMPTOMS,\n' +
'WHAT YOU EXPECTED, WHAT YOU TRIED]\n\n' +
'Ask me one focused question at a time to narrow down the cause. After each answer, update your\n' +
'list of suspected causes from most to least likely. Do not guess a fix yet.',
    },
    {
      id: 'debug-bisect',
      title: 'Plan a git bisect / change isolation',
      category: 'debug',
      roles: ['Dev'],
      tags: ['git', 'bisect', 'regression'],
      use: 'Use to isolate which change introduced a regression.',
      prompt:
'A regression appeared between two releases.\n\nWorking version: [REF]\nBroken version: [REF]\n' +
'Symptom: [DESCRIBE]\n\n' +
'Outline a git bisect plan: a good/bad starting point, a precise test command that reproduces the\n' +
'issue automatically, and how to interpret the result. Then suggest non-bisect signals (recent\n' +
'changes to relevant files) worth checking in parallel.',
    },
    {
      id: 'debug-logs',
      title: 'Add targeted logging to trap a bug',
      category: 'debug',
      roles: ['Dev'],
      tags: ['logging', 'observability', 'tracing'],
      use: 'Use when you cannot reproduce and need evidence.',
      prompt:
'I cannot reproduce this bug reliably.\n\n[DESCRIBE BUG + PASTE SUSPECT CODE]\n\n' +
'Suggest the minimum set of log statements (level, location, exact message and variables) that\n' +
'would let me confirm the cause from production logs. Avoid logging sensitive data and explain\n' +
'what each log will tell me.',
    },

    // ---------------- DevOps & CI/CD ----------------
    {
      id: 'devops-gha',
      title: 'Write a GitHub Actions workflow',
      category: 'devops',
      roles: ['Dev', 'QA'],
      tags: ['github-actions', 'ci', 'pipeline', 'yaml'],
      use: 'Use to set up CI for a project quickly.',
      prompt:
'Create a GitHub Actions workflow for this project.\n\n[DESCRIBE: language, package manager,\n' +
'test command, build command, deploy target]\n\n' +
'It should run on push and pull_request, cache dependencies, run lint and tests in parallel jobs,\n' +
'fail fast, and upload test artifacts. Pin action versions and explain each job briefly.',
    },
    {
      id: 'devops-bs-grid',
      title: 'Configure cross-browser runs on BrowserStack',
      category: 'devops',
      roles: ['QA', 'Automation'],
      tags: ['browserstack', 'cross-browser', 'playwright', 'parallel'],
      use: 'Use to fan a suite out across browsers/devices.',
      prompt:
'Help me run my Playwright suite on BrowserStack across multiple browsers and devices.\n\n' +
'[DESCRIBE current config / framework]\n\n' +
'Show the capabilities/config needed, how to parameterize the browser matrix, and how to keep\n' +
'credentials out of the repo using environment variables. Note parallelization limits to consider.',
    },
    {
      id: 'devops-dockerfile',
      title: 'Write and harden a Dockerfile',
      category: 'devops',
      roles: ['Dev'],
      tags: ['docker', 'container', 'security', 'image-size'],
      use: 'Use to containerize an app with a lean, safe image.',
      prompt:
'Write a production-ready Dockerfile for this app.\n\n[DESCRIBE: runtime, build steps, start command]\n\n' +
'Use multi-stage builds, a non-root user, a slim base image, and a .dockerignore. Minimize layers\n' +
'and final image size. Explain each stage and call out any security hardening you applied.',
    },
    {
      id: 'devops-explain-pipeline',
      title: 'Explain and improve an existing pipeline',
      category: 'devops',
      roles: ['Dev', 'QA'],
      tags: ['ci', 'pipeline', 'optimization', 'review'],
      use: 'Use to understand and speed up a slow CI config.',
      prompt:
'Explain what this CI pipeline does and how to make it faster and more reliable.\n\n' +
'[PASTE PIPELINE YAML]\n\n' +
'Summarize each stage, find the slowest or most fragile steps, and suggest concrete improvements\n' +
'(caching, parallelism, conditional runs, flaky-step isolation). Keep behaviour equivalent.',
    },

    // ---------------- Data & SQL ----------------
    {
      id: 'data-sql-from-question',
      title: 'Write SQL from a plain-English question',
      category: 'data',
      roles: ['Dev', 'QA', 'Product'],
      tags: ['sql', 'query', 'analytics'],
      use: 'Use to turn a business question into a query.',
      prompt:
'Given this schema:\n\n[PASTE TABLES + KEY COLUMNS]\n\n' +
'Write a SQL query that answers: [PLAIN-ENGLISH QUESTION].\n' +
'Use explicit JOINs, alias tables, and comment any non-obvious logic. Then explain what the query\n' +
'returns and one way it could be slow on large data.',
    },
    {
      id: 'data-explain-sql',
      title: 'Explain and optimize a SQL query',
      category: 'data',
      roles: ['Dev'],
      tags: ['sql', 'optimization', 'index', 'explain'],
      use: 'Use to understand and speed up an existing query.',
      prompt:
'Explain what this SQL query does and how to make it faster.\n\n[PASTE QUERY]\n\n' +
'Break it down step by step, identify likely full scans or missing indexes, and suggest indexes\n' +
'or rewrites. State the trade-offs of each suggestion. Do not change the result set.',
    },
    {
      id: 'data-testdata',
      title: 'Generate realistic test data',
      category: 'data',
      roles: ['QA', 'Dev'],
      tags: ['test-data', 'fixtures', 'edge-cases'],
      use: 'Use to create varied fixtures, including edge cases.',
      prompt:
'Generate [N] rows of realistic test data for this structure:\n\n[PASTE SCHEMA / TYPE]\n\n' +
'Output as [JSON/CSV]. Include normal values plus deliberate edge cases: empty strings, max-length,\n' +
'unicode, leading/trailing spaces, boundary numbers and null where allowed. Keep it valid against\n' +
'the schema and avoid real personal data.',
    },

    // ---------------- Documentation ----------------
    {
      id: 'docs-readme',
      title: 'Generate a project README',
      category: 'docs',
      roles: ['Dev', 'QA'],
      tags: ['readme', 'documentation', 'onboarding'],
      use: 'Use to create a clear README from a codebase.',
      prompt:
'Write a README for this project.\n\n[PASTE package.json / file tree / short description]\n\n' +
'Include: one-line summary, features, prerequisites, install, usage with examples, configuration,\n' +
'how to run tests, and how to contribute. Keep it skimmable with short sections and code blocks.',
    },
    {
      id: 'docs-adr',
      title: 'Draft an Architecture Decision Record',
      category: 'docs',
      roles: ['Dev', 'Leadership'],
      tags: ['adr', 'architecture', 'decision'],
      use: 'Use to record a technical decision and its trade-offs.',
      prompt:
'Draft an Architecture Decision Record for this decision:\n\n[DESCRIBE THE DECISION + OPTIONS]\n\n' +
'Use the format: Title, Status, Context, Decision, Consequences (positive and negative), and\n' +
'Alternatives considered with why they were rejected. Keep it objective and concise.',
    },
    {
      id: 'docs-comment',
      title: 'Document a function or module',
      category: 'docs',
      roles: ['Dev'],
      tags: ['docstring', 'jsdoc', 'comments'],
      use: 'Use to add accurate doc comments to code you wrote.',
      prompt:
'Add documentation comments to this code in [JSDOC/TSDOC/DOCSTRING] style.\n\n[PASTE CODE]\n\n' +
'Document purpose, parameters, return value, thrown errors and a short usage example. Describe\n' +
'behaviour, not implementation. Do not change the code itself.',
    },
    {
      id: 'docs-explain-to-audience',
      title: 'Explain a technical topic for a specific audience',
      category: 'docs',
      roles: ['Dev', 'QA', 'Sales', 'Leadership'],
      tags: ['explain', 'communication', 'audience'],
      use: 'Use to translate technical detail for non-experts.',
      prompt:
'Explain [TECHNICAL TOPIC] to a [TARGET AUDIENCE: e.g. non-technical manager / new hire / customer].\n\n' +
'Match their vocabulary, use one concrete analogy, keep it under 150 words, and end with why it\n' +
'matters to them specifically. Avoid jargon unless you define it.',
    },

    // ---------------- Product & Analysis ----------------
    {
      id: 'product-story',
      title: 'Write a user story with acceptance criteria',
      category: 'product',
      roles: ['Product', 'QA'],
      tags: ['user-story', 'acceptance-criteria', 'agile'],
      use: 'Use to turn an idea into a ready-to-build story.',
      prompt:
'Turn this idea into a well-formed user story.\n\n[DESCRIBE THE IDEA]\n\n' +
'Format: As a [role], I want [goal], so that [benefit]. Then add Acceptance Criteria in\n' +
'Given/When/Then form covering happy path and key edge cases, plus a short list of out-of-scope\n' +
'items and open questions.',
    },
    {
      id: 'product-refine',
      title: 'Find gaps and risks in requirements',
      category: 'product',
      roles: ['Product', 'QA', 'Dev'],
      tags: ['requirements', 'risk', 'analysis', 'questions'],
      use: 'Use during refinement to surface unknowns early.',
      prompt:
'Review these requirements as a critical analyst.\n\n[PASTE REQUIREMENTS]\n\n' +
'List ambiguities, missing edge cases, hidden assumptions, dependencies and risks. Then give the\n' +
'top 8 clarifying questions to ask before development starts, ordered by impact.',
    },
    {
      id: 'product-prd',
      title: 'Draft a lightweight PRD',
      category: 'product',
      roles: ['Product', 'Leadership'],
      tags: ['prd', 'spec', 'planning'],
      use: 'Use to frame a feature before kickoff.',
      prompt:
'Draft a one-page product requirements doc for this feature.\n\n[DESCRIBE FEATURE + GOAL]\n\n' +
'Sections: Problem, Target users, Goals and non-goals, Success metrics, Key user flows,\n' +
'Requirements (must/should/could), and Risks. Keep each section to a few bullets.',
    },
    {
      id: 'product-prioritize',
      title: 'Prioritize a backlog (RICE)',
      category: 'product',
      roles: ['Product', 'Leadership'],
      tags: ['prioritization', 'rice', 'backlog'],
      use: 'Use to rank competing items objectively.',
      prompt:
'Help me prioritize these backlog items using the RICE framework\n' +
'(Reach, Impact, Confidence, Effort).\n\n[PASTE ITEMS WITH ANY KNOWN NUMBERS]\n\n' +
'For each item, estimate the four factors with your reasoning, compute a RICE score, and present\n' +
'a ranked table. Flag any item where low confidence should make us validate before building.',
    },

    // ---------------- Sales & Customer ----------------
    {
      id: 'sales-outreach',
      title: 'Write a personalized cold outreach email',
      category: 'sales',
      roles: ['Sales'],
      tags: ['email', 'outreach', 'prospecting'],
      use: 'Use to draft a concise, relevant first-touch email.',
      prompt:
'Write a short cold outreach email.\n\nProspect: [ROLE, COMPANY, INDUSTRY]\n' +
'What we offer: [PRODUCT + KEY VALUE]\nTrigger/insight: [RECENT NEWS OR PAIN POINT]\n\n' +
'Keep it under 120 words, lead with their problem not our product, include one specific value\n' +
'point and one soft call to action. Give me two subject-line options.',
    },
    {
      id: 'sales-followup',
      title: 'Draft a follow-up after a demo',
      category: 'sales',
      roles: ['Sales'],
      tags: ['follow-up', 'demo', 'email'],
      use: 'Use to keep momentum after a sales call.',
      prompt:
'Write a follow-up email after a product demo.\n\nWho attended: [NAMES/ROLES]\n' +
'What resonated: [POINTS]\nOpen questions/objections: [LIST]\nNext step we want: [STEP]\n\n' +
'Recap the value in their words, address each objection briefly, attach-ready bullet of next\n' +
'steps with owners and dates, and a clear ask. Professional and concise.',
    },
    {
      id: 'sales-objection',
      title: 'Handle a sales objection',
      category: 'sales',
      roles: ['Sales'],
      tags: ['objection', 'negotiation', 'talk-track'],
      use: 'Use to prepare responses to a tough objection.',
      prompt:
'A prospect raised this objection: [PASTE OBJECTION].\n\n' +
'Context: [PRODUCT, PRICE POINT, COMPETITOR IF ANY].\n\n' +
'Give three response approaches (empathize-and-reframe, evidence-based, and trade-off), the\n' +
'discovery question to ask before responding, and one proof point to have ready. Keep it honest,\n' +
'no overpromising.',
    },
    {
      id: 'sales-onepager',
      title: 'Turn features into customer benefits',
      category: 'sales',
      roles: ['Sales', 'Product'],
      tags: ['value', 'messaging', 'benefits'],
      use: 'Use to translate a feature list into buyer language.',
      prompt:
'Translate these product features into customer benefits for [BUYER PERSONA].\n\n[PASTE FEATURES]\n\n' +
'For each feature give: the benefit (what they gain), the pain it removes, and a one-line proof.\n' +
'Then write a 3-sentence value summary I could say on a call.',
    },

    // ---------------- Leadership ----------------
    {
      id: 'lead-standup',
      title: 'Generate a status update / standup',
      category: 'leadership',
      roles: ['Leadership', 'QA', 'Dev'],
      tags: ['status', 'standup', 'reporting'],
      use: 'Use to turn raw notes into a crisp update.',
      prompt:
'Turn these notes into a concise status update.\n\n[PASTE NOTES / COMMITS / TICKETS]\n\n' +
'Format: Done, In progress, Next, Blockers/Risks. Lead with outcomes not activity, keep each\n' +
'bullet to one line, and flag anything that needs a decision or help.',
    },
    {
      id: 'lead-exec-summary',
      title: 'Write an executive summary',
      category: 'leadership',
      roles: ['Leadership'],
      tags: ['exec-summary', 'communication', 'reporting'],
      use: 'Use to brief leadership in under a minute of reading.',
      prompt:
'Write an executive summary of the information below for a busy leader.\n\n[PASTE DETAIL]\n\n' +
'Maximum 5 sentences. Lead with the bottom line, then the 2-3 facts that support it, then the ask\n' +
'or decision needed. No jargon. Add a one-line risk callout if relevant.',
    },
    {
      id: 'lead-decision',
      title: 'Structure a decision with trade-offs',
      category: 'leadership',
      roles: ['Leadership', 'Dev'],
      tags: ['decision', 'trade-offs', 'options'],
      use: 'Use to frame a choice for a group to decide.',
      prompt:
'Help me structure this decision.\n\nDecision: [WHAT WE MUST DECIDE]\nConstraints: [TIME/BUDGET/ETC]\n' +
'Options I see: [LIST]\n\n' +
'Present each option with pros, cons, cost and risk in a table, state your recommendation with the\n' +
'single most important reason, and list what we would need to be true to choose differently.',
    },
    {
      id: 'lead-retro',
      title: 'Facilitate a retrospective',
      category: 'leadership',
      roles: ['Leadership', 'QA', 'Dev'],
      tags: ['retro', 'agile', 'team', 'improvement'],
      use: 'Use to run a focused, action-oriented retro.',
      prompt:
'Help me run a 45-minute retrospective for this iteration.\n\n[PASTE WHAT HAPPENED / METRICS]\n\n' +
'Suggest a format, 5 framing questions, and how to timebox each part. Then, from the notes above,\n' +
'draft candidate action items as concrete, owned, time-bound commitments (not vague intentions).',
    },

    // ---------------- Copilot Tips ----------------
    {
      id: 'tips-context',
      title: 'Give Copilot the right context',
      category: 'tips',
      roles: ['QA', 'Dev', 'Sales', 'Leadership'],
      tags: ['prompting', 'context', 'best-practice'],
      use: 'Use as a checklist to write better prompts.',
      prompt:
'Before asking, include: (1) ROLE — who the AI should act as; (2) GOAL — what success looks like;\n' +
'(3) CONTEXT — paste the code/data/requirements, do not describe them; (4) CONSTRAINTS — language,\n' +
'style, length, what to avoid; (5) FORMAT — exactly how you want the output. Then ask the model to\n' +
'state its assumptions before answering if anything is ambiguous.',
    },
    {
      id: 'tips-iterate',
      title: 'Iterate instead of restarting',
      category: 'tips',
      roles: ['QA', 'Dev'],
      tags: ['prompting', 'iteration', 'refine'],
      use: 'Use to steer a near-miss answer to a great one.',
      prompt:
'When an answer is close but not right, do not start over. Say what was good, what was wrong, and\n' +
'the one change you want next. Example: Keep the structure, but use role-based locators instead of\n' +
'CSS and add a negative test case. Repeat in small steps until it is exactly right.',
    },
    {
      id: 'tips-constrain',
      title: 'Constrain output to avoid hallucination',
      category: 'tips',
      roles: ['QA', 'Dev'],
      tags: ['prompting', 'accuracy', 'hallucination'],
      use: 'Use to reduce made-up APIs, selectors or facts.',
      prompt:
'Add these guardrails to your prompt: Only use APIs/methods that exist in the version I specified.\n' +
'If you are unsure of a name, mark it with a TODO instead of inventing it. Do not assume file\n' +
'contents I have not shown you. If information is missing, ask me for it rather than guessing.',
    },
    {
      id: 'tips-review-ai',
      title: 'Review AI output critically',
      category: 'tips',
      roles: ['QA', 'Dev', 'Leadership'],
      tags: ['prompting', 'review', 'safety'],
      use: 'Use as a checklist before trusting generated code.',
      prompt:
'Before accepting AI-generated code, verify: Does it compile/run? Are the APIs real and current?\n' +
'Does it handle the edge cases I care about? Any security or licensing concern? Are there tests?\n' +
'Ask the model: List the assumptions you made and the top 3 ways this could be wrong.',
    },
    {
      id: 'tips-persona',
      title: 'Set a strong persona and standard',
      category: 'tips',
      roles: ['QA', 'Dev', 'Sales', 'Leadership'],
      tags: ['prompting', 'persona', 'quality'],
      use: 'Use to raise the quality bar of any answer.',
      prompt:
'Start prompts with a precise persona and standard, for example: You are a senior SDET who values\n' +
'deterministic tests and readable code. Hold this work to the standard of a staff engineer review.\n' +
'A specific persona plus an explicit quality bar produces noticeably better output than a generic ask.',
    },
  ],
};
