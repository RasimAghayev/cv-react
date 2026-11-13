# IMPROVEMENT_ROADMAP.md — cv-react

> Sequenced work per phase for cv-react. Derived from the Phase 3 audit (REPOSITORY_AUDIT.md, TECHNICAL_DEBT.md, analysis/cv-react.md). Docs only in this phase; execution starts after Gate 10 approval. No code was modified in Phase 3.

## Sequencing principles

- Standing decision #1: latest stable versions, one upgrade at a time, each built and tested in Docker.
- Standing decision #2: Docker-first — nothing runs on the host until the image builds and its test stage passes.
- Standing decision #3: no new library without a dependency decision entry (Vite/Vitest replacing react-scripts needs one).
- Standing decision #7: KISS and YAGNI win conflicts — do not over-abstract this small static SPA.
- One PR per phase per repo; conventional commit titles; no AI attribution (CLAUDE.md #12).

## Roadmap by phase

### Phase 4 — Git hygiene
1. Run gitleaks over full history (working tree already scanned; no history secrets expected).
2. Add `.github/dependabot.yml`: weekly, Monday 06:00 UTC; npm + Docker + GitHub Actions; limits 10/5/5; prefixes `build(deps)`/`build(deps-dev)`/`ci(deps)`.
3. Harden `.gitignore`: add IDE artifacts (`.idea/`, `.vscode/`, editor swap files).
4. Branch hygiene: only `master` exists; `master`→`main` rename is Gate 4 — **parked, needs approval, do not execute**.
- Exit: dependabot config merged, `.gitignore` updated, branch question recorded.

### Phase 5 — Container baseline
1. Multi-stage Dockerfile: `node:20-alpine` build stage → `nginx:alpine` runtime serving static build; non-root user; HEALTHCHECK; exec-form ENTRYPOINT; SIGTERM handling.
2. `.dockerignore`: exclude `.git`, `.env*`, `node_modules`, `build`, docs, coverage.
3. `docker-compose.yml` with `COMPOSE_PROJECT_NAME=cv-react-p5`; port from `ports.md`.
4. `Makefile`: `build`, `test`, `verify` (= build + test), `up` (depends on verify), `run`, `down`, `lint`, `security`.
5. `.env.example` with EmailJS placeholders only (no real values).
6. Baseline snapshot: `npm run build` output + manual smoke test recorded in `docs/BASELINE.md` (no existing tests to characterize).
- Exit: `make verify` green; `make up` starts only after verify.

### Phase 6 — Upgrade to latest (topological order)
1. Node pin `.nvmrc` = 20; commit `package-lock.json`.
2. Build-tool migration **Create React App → Vite** (decision entry required): replace `react-scripts` scripts with `vite`/`vite build`/`vitest run`; migrate jest/browserslist; move `public/` assets per Vite conventions. Verify build parity against Phase 5 baseline.
3. React 19.3.1 + react-dom 19.3.1 (`createRoot` already used; no `PropTypes`/`ReactDOM.render` → compatible).
4. swiper 14.4.0 (resolves D-1/P0-1); verify `Testimonials.jsx` imports/CSS paths.
5. `emailjs-com` → `@emailjs/browser` (drop-in `sendForm`-compatible; resolves D-2).
6. react-icons 5.7.0 (named-import API stable; resolves D-6).
7. @testing-library/* latest + web-vitals 6.2.3.
8. `npm audit`: 0 critical, 0 high; document any remaining with blockers.
- Exit: every dependency/runtime at latest stable or documented blocker; `make verify` green; no regression vs baseline.

### Phase 7 — Dead code & restructure
1. Remove commented-out code (`Nav.jsx:9`).
2. Owner review of placeholder content (D-12/D-13): testimonial gibberish, lorem services, identical portfolio links — delete only if confirmed unintentional.
3. Dedup social links across HeaderSocials/Footer; extract repeated section data where it reduces duplication (DRY only where real repetition exists).
4. Restructure layout to Vite conventions; `make verify` green after each batch.
- Exit: no known dead code; structure matches upgraded stack.

### Phase 8 — Architecture
- **n/a** for this repo: single-page static SPA with no external-system boundary (no DB, queue, or service to swap behind an adapter). Clean/Hexagonal, EDA, DDD, Modular Monolith do not earn their place; KISS/YAGNI win. DRY micro-refactors (social-link dedup) are done in Phase 7. No ADR required.

### Phase 9 — Hardening
1. Externalize EmailJS config to env (build-time or runtime) so credentials are not in the client bundle (D-2/P0-2); rotate exposed credentials — owner action.
2. Remove or relocate PII from source (D-3/P0-3) — owner decision.
3. Dependency vulnerability remediation via Phase 6 (D-1, D-4).
4. CSP headers on the static host; contact-form input validation; pre-commit secret-scan hook; CI secret-scan job.
5. nginx healthcheck covers `/health/live` + `/health/ready` (static SPA).
- Exit: security checklist documented with results; health endpoints work in the container.

### Phase 10 — CI/CD (GitHub Actions)
1. PR pipeline ≤ 10 min wall-clock: install+cache → format/lint → secret scan → test → build → `npm audit` (parallel cheap checks first).
2. Build the Docker image once; reuse across jobs (`docker/build-push-action` cache-from/to).
3. `concurrency` with `cancel-in-progress`; `timeout-minutes` on every job; actions pinned by SHA; least-privilege `permissions:`; no secrets for fork PRs.
4. Nightly full image scan (not on every PR); publish only on tag from protected branch.
- Exit: real CI run green and within time budget (recorded in `docs/TEST_REPORT.md`).

### Phase 11 — Tests
1. Vitest + React Testing Library: smoke render of `App`; Contact submit handler (EmailJS mocked); Nav active-tab state.
2. Characterization tests only where no existing tests exist.
3. Regression vs `docs/BASELINE.md`; `docs/TEST_REPORT.md` with real results and honest coverage.
4. Test cases as `TC_<MODULE>_<SCENARIO>_<NUMBER>`; statuses PASS/FAIL/BLOCKED/NOT RUN/SKIPPED/N/A.
- Exit: suite green in Docker and in CI.

### Phases 12–17 (not part of Phase 3; noted for completeness)
- 12 Merge small repos: n/a (single repo).
- 13 Shared library: n/a (no duplication across ≥3 repos).
- 14 Rename: n/a (no rename proposed).
- 15 Docs/manifest/diagrams: Phase 3 writes ARCHITECTURE/REPOSITORY_AUDIT/TECHNICAL_DEBT/IMPROVEMENT_ROADMAP; remaining community files (README refresh, CODE_OF_CONDUCT, CONTRIBUTING, SECURITY.md, issue/PR templates, SUPPORT, CHANGELOG, CODEOWNERS, ACCESSIBILITY, repo-manifest.yaml) in Phase 15.
- 16 Platform repo: n/a (single static SPA).
- 17 Final report: at program close.

## Open decisions needing approval (Gate 10)
- CRA → Vite migration (Phase 6 step 2): the one breaking build change; behavior preserved otherwise.
- `master` → `main` default-branch rename (Phase 4): Gate 4, parked.
- EmailJS credential rotation and PII removal (Phase 9): owner actions.
