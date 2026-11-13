# REPOSITORY_AUDIT.md — cv-react

> Evidence-backed findings from `projects/repos/cv-react` (HEAD 764ab45, branch `master`, clean). Severity classes: P0 = security/data-loss/broken build, P1 = correctness/major debt, P2 = quality, P3 = nice-to-have. Secret values are redacted — locations only.

## 1. Repo identity

- Remote: `https://github.com/RasimAghayev/cv-react` (fetch + push)
- Branch: `master` only; HEAD `764ab45` "Merge pull request #21 from RasimAghayev/renovate/web-vitals-6.x"
- Working tree clean except untracked `package-lock.json` (no committed lockfile)
- Tracked files: 41 (source + assets + config), no `.github/`, no `Dockerfile*`, no `.nvmrc`, no `.env*`, no `tsconfig.json`

## 2. P0 — security / data-loss / broken build

| ID | Finding | Evidence (file:line) | Impact |
|---|---|---|---|
| P0-1 | `swiper@^11.0.0` critical prototype pollution (GHSA-hmx5-qpq5-p643) in the client bundle | `src/components/testimonials/Testimonials.jsx:8-14` imports swiper; fixed in 12.1.2+, latest 14.4.0 | Exploitable by any visitor; XSS/privilege escalation vector in client bundle |
| P0-2 | EmailJS service ID, template ID, and public key hardcoded in client-side source | `src/components/contact/Contact.jsx:6` import; `:13` `sendForm('<svc>', '<tmpl>', form.current, '<pubKey>')` | Credentials readable by every visitor; ties deployment to one EmailJS account; rotation = code change + redeploy |
| P0-3 | PII hardcoded in source | `Contact.jsx:30` email; `:37` Messenger profile; `:42,43` phone + WhatsApp deep-link | Sensitive personal data exposed in the repo |
| P0-4 | `npm audit`: 35 advisories — 1 critical, 13 high, 5 moderate, 16 low | `deps/cv-react.md:49-73` (container `npm audit --json`, exit 0) | Most high/critical transitive vulns (svgo, css-select, webpack-dev-server, serialize-javascript, etc.) trace to unmaintained `react-scripts@5.0.1`; cannot be fixed without a build-tool migration |

## 3. P1 — correctness / major debt

| ID | Finding | Evidence (file:line) |
|---|---|---|
| P1-1 | Create React App deprecated (maintenance mode, final release 5.0.1); blocks P0-4 remediation | `package.json:13`; `deps/cv-react.md:82` |
| P1-2 | `emailjs-com@3.2.0` deprecated, renamed to `@emailjs/browser` | `package.json:9`; `deps/cv-react.md:22`; `Contact.jsx:6` |
| P1-3 | React `^18.1.0` vs latest 19.3.1 — major gap | `package.json:10`; `deps/cv-react.md:23` |
| P1-4 | Zero tests — 0% coverage; no `*.test.*`/`*.spec.*` files | glob `src/**/*.{test,spec}.*` → no matches; `@testing-library/*` not imported anywhere |
| P1-5 | No CI/CD, no Docker | no `.github/workflows/`, no `Dockerfile*`, no `docker-compose.yml` |
| P1-6 | No Node version pin (no `.nvmrc`, no `engines`) | `package.json`; `deps/cv-react.md:125-127` |
| P1-7 | No lockfile committed | `git status` → `package-lock.json` untracked; `npm ci` impossible |
| P1-8 | No config externalization / `.env.example`; EmailJS config baked into client bundle | no `.env*` files; `Contact.jsx:13` |
| P1-9 | Placeholder business content | `Testimonials.jsx:21-39` gibberish reviews; `Services.jsx` "Lorem impuse dolor"; `About.jsx:38` "Lorem Testestsete" |
| P1-10 | All 6 Portfolio items point to the same repo (github + demo) | `Portfolio.jsx:14-50` — intent unconfirmed |

## 4. P2 — quality

| ID | Finding | Evidence (file:line) |
|---|---|---|
| P2-1 | No TypeScript (plain `.jsx`, no `tsconfig`) | all source files `.jsx` |
| P2-2 | No router; fragment navigation only; no lazy loading / code splitting | `Nav.jsx` `href="#..."`; `App.jsx` static sections |
| P2-3 | Commented-out dead code | `Nav.jsx:9` |
| P2-4 | Social links duplicated across two components | `HeaderSocials.jsx:9-12`, `Footer.jsx:21-23` |
| P2-5 | Images unoptimized (large JPGs/PNGs bundled) | `src/assets/images/` |
| P2-6 | Minimal SEO: no `<meta description>`, no Open Graph tags | `public/index.html:4-7` |
| P2-7 | Inconsistent formatting; no Prettier/editorconfig | source review |

## 5. P3 — nice-to-have

| ID | Finding | Evidence (file:line) |
|---|---|---|
| P3-1 | Accessibility gaps: `alt=""` avatars, single `aria-hidden`, no ARIA labels on nav/social links, no skip link; WCAG 2.1 AA unconfirmed | `Testimonials.jsx:58`, `About.jsx:16`, `Nav.jsx`, `HeaderSocials.jsx` |
| P3-2 | Footer typos | `Footer.jsx:14` "Expeirience"; `:26` "RASIMA Tutorials" |
| P3-3 | No `sitemap.xml` / `robots.txt` | directory listing |
| P3-4 | No favicon | `public/` contains only `index.html` |

## 6. Redacted secret scan (working tree)

Scan method: full read of every tracked `src/` file, `package.json`, README.md. Reported as `file:line` + `<REDACTED>`; values never printed.

| # | Location | Finding | Class |
|---|---|---|---|
| S1 | `src/components/contact/Contact.jsx:6,13` | EmailJS credentials hardcoded in client source (`emailjs-com` + `sendForm(service, template, form, publicKey)`) | credential exposure (client-side) |
| S2 | `src/components/contact/Contact.jsx:30` | Personal email address hardcoded | PII |
| S3 | `src/components/contact/Contact.jsx:37` | Messenger profile link hardcoded | PII/social |
| S4 | `src/components/contact/Contact.jsx:42,43` | Phone number hardcoded | PII |
| S5 | `src/components/contact/Contact.jsx:43` | WhatsApp deep-link containing phone number | PII |

No `.env`, `.npmrc`, `auth.json`, registry tokens, or CI secrets found. No git submodules or npm git/URL dependencies.

## 7. Cross-repo links (real)

| Source | Reference | Target |
|---|---|---|
| `Portfolio.jsx:14-50` (6×) | `https://github.com/RasimAghayev/rest-api-php` | RasimAghayev/rest-api-php |
| `HeaderSocials.jsx:10-12` | GitHub / LinkedIn / Dribbble profile URLs | RasimAghayev / external |
| `README.md:3` | `hits.sh/github.com/RasimAghayev/cv-react` badge | external hit counter |

## 8. Verification commands run (exit codes)

| Command | Exit code |
|---|---|
| `git -C ... log --oneline -1` | 0 |
| `git -C ... status --short` | 0 (only `?? package-lock.json`) |
| `git -C ... branch -a` | 0 (master only) |
| `ls src | grep -c test/spec` | no test files |
| `grep -rn "PropTypes" src/` | no matches |
| `grep -rn "createRoot" src/` | `index.js:1,5` |
| `grep -rn "process.env\|REACT_APP" src/` | no matches |
| `glob src/**/*.{test,spec}.*` | no matches |
| `glob {.nvmrc,Dockerfile*,docker-compose*,.github/**,.env*}` | no matches |
| `npm audit --json` (node:22-alpine container) | 0 (35 advisories reported) |
