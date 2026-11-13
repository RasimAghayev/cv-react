# TECHNICAL_DEBT.md — cv-react

> Every debt item with impact and origin. Derived from the real source at `projects/repos/cv-react` (HEAD 764ab45) and `projects/info/deps/cv-react.md`. No code changed in this phase.

## Register

| ID | Debt item | Origin (file / cause) | Impact | Phase to address |
|---|-----------|----------------------|--------|------------------|
| D-1 | `swiper@^11.0.0` vulnerable (critical prototype pollution GHSA-hmx5-qpq5-p643) | `package.json:14`; `Testimonials.jsx:8-14` | Client-side exploit vector; blocks production deploy | Phase 6 |
| D-2 | EmailJS credentials hardcoded in client bundle | `Contact.jsx:6,13`; deprecated `emailjs-com@3.2.0` (`package.json:9`) | Credential exposure; single-account coupling; rotation = redeploy | Phase 6, Phase 9 |
| D-3 | PII hardcoded in source (email, phone, Messenger, WhatsApp) | `Contact.jsx:30,37,42,43` | Sensitive data exposure in repo | Phase 9 (owner decision) |
| D-4 | `react-scripts@5.0.1` unmaintained/deprecated; blocks all high/critical transitive vuln fixes | `package.json:13`; CRA deprecated | 35 npm advisories (1 critical, 13 high) unfixable without migration | Phase 6 |
| D-5 | React `^18.1.0` vs latest 19.3.1 | `package.json:10-11` | Missing React 19 fixes/features; compatibility drift | Phase 6 |
| D-6 | `react-icons@^4.3.1` vs latest 5.7.0 | `package.json:12` | One major behind; missing icon-set updates | Phase 6 |
| D-7 | Zero tests; `@testing-library/*` installed but unused | no `*.test.*` files; grep no matches | 0% coverage; no regression safety net | Phase 11 |
| D-8 | No CI/CD, no Docker | missing `.github/`, `Dockerfile*`, `docker-compose.yml` | No automated verify; no reproducible environment | Phase 5, Phase 10 |
| D-9 | No lockfile committed (`package-lock.json` untracked) | git status `?? package-lock.json` | Non-reproducible installs; `npm ci` impossible | Phase 4 / Phase 6 step 1 |
| D-10 | No Node version pin (no `.nvmrc`, no `engines`) | `package.json` | Undefined runtime; build may break on new Node | Phase 5 / Phase 6 step 1 |
| D-11 | Create React App-specific config (jest, browserslist, eslint react-app) ties build to deprecated tooling | `package.json:17-40` | Must be migrated with CRA→Vite | Phase 6 |
| D-12 | Placeholder / lorem business content | `Testimonials.jsx:21-39`, `Services.jsx`, `About.jsx:38` | Unfinished content; unclear business intent | Phase 7 (owner review) |
| D-13 | All 6 Portfolio items identical links (rest-api-php) | `Portfolio.jsx:14-50` | Likely placeholder links; dead/demo endpoints | Phase 7 (owner review) |
| D-14 | Commented-out dead code | `Nav.jsx:9` | Noise; minor maintainability | Phase 7 |
| D-15 | Social links duplicated across HeaderSocials + Footer | `HeaderSocials.jsx`, `Footer.jsx:21-23` | Inconsistency risk when profiles change | Phase 7 |
| D-16 | No TypeScript | all `.jsx`, no `tsconfig` | No type safety; refactoring hazard | Phase 6 (optional, KISS/YAGNI) |
| D-17 | No router / no code splitting | `Nav.jsx` fragment links | Full bundle on every load; no route structure | Phase 7 (optional) |
| D-18 | Images unoptimized; minimal SEO (no description/Open Graph) | `src/assets/images/`, `public/index.html` | Larger bundle; poor social sharing | Phase 7 (optional) |
| D-19 | Accessibility gaps (`alt=""`, no ARIA labels, no skip link) | `Testimonials.jsx:58`, `About.jsx:16`, `Nav.jsx` | WCAG 2.1 AA not met; exclusion risk | Phase 9 / Phase 15 |
| D-20 | Footer typos ("Expeirience", "RASIMA Tutorials") | `Footer.jsx:14,26` | Polish / brand quality | Phase 7 (optional) |

## Notes

- D-1, D-4 are security-critical (P0) and must be fixed before any production deploy.
- D-2/D-3 involve exposed credentials/PII — treat as compromised per CLAUDE.md security rules; rotation is an owner action, not an agent rewrite.
- D-12/D-13 require owner confirmation before deletion (content may be intentional placeholders).
- D-16/D-17 are optional: this is a small static SPA; per KISS/YAGNI (CLAUDE.md decision #7) TypeScript and a router are not added unless a real need appears.
