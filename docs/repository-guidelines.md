# Repository guidelines

Keep credentials, machine-specific settings, generated artifacts and client reference originals outside Git. Commit application source, reviewed configuration, the pnpm lockfile, safe environment templates and useful documentation.

## Environment variables and secrets

For local development, copy the tracked template and edit the ignored copy:

```bash
cp .env.example .env.local
```

Compose reads an ignored `.env` beside `compose.yaml`. Deployment credentials belong in the deployment platform's secret configuration. Never copy a populated environment file into an image or commit it as a template.

| Variable                     | Scope and intended value                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_BASE_URL`   | Public browser/API address including `/api/v1`; never credentials.                                     |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | Optional public media address; never a private document token or signed URL.                           |
| `API_INTERNAL_BASE_URL`      | Server-only API address including `/api/v1`; optional server override.                                 |
| `API_TLS_SERVERNAME`         | Optional verified TLS certificate name for the configured API; keeps certificate verification enabled. |
| `SITE_URL`                   | Optional public website origin for sitemap URLs; separate from the backend API.                        |
| `NEXT_PUBLIC_USE_MOCK_DATA`  | Explicit catalog fixtures only when no live API is configured.                                         |
| `NEXT_PUBLIC_ENABLE_MOCK_*`  | Development-only auth switches; defaults stay false and production forces mocks off.                   |

`NEXT_PUBLIC_*` values are visible in browser bundles and are frozen at production build time. Prefixing a secret this way exposes it even if the environment file is ignored. Unprefixed server values must still stay out of client props, logs, responses and generated public files. `.env.example` may document variable names, blank values, safe defaults and clearly synthetic examples only. See [development setup](DEVELOPMENT.md) and [Docker deployment](DOCKER.md) for runtime details.

## Files that stay local

The [root ignore file](../.gitignore) excludes:

- Populated `.env` files and local environment variants; safe `.env.example` templates remain trackable.
- Private keys and certificate key material (`*.key`, `*.pem`) and machine-specific `*.local` files.
- The original `/Design/` reference tree. Preserve its local bytes; do not import its scripts, fonts or frameworks into the application.
- Dependencies and package caches (`node_modules/`, `.pnpm-store/`).
- Next.js output (`.next/`, `out/`), build output (`dist/`, `build/`), coverage and incremental TypeScript state.
- Logs, temporary/cache directories, local generated exports (`output/`), OS metadata and local IDE settings.
- Local GeoIP databases under `data/`.

Do not place secrets, national IDs, customer documents, chat exports or private uploads under `public/`: Next.js serves that directory directly. Local export/debug files must also stay outside source control, even when a broad ignore pattern does not match their names. Do not use `git add -f` to bypass an ignore rule for sensitive material. Preserve necessary reviewed configuration such as `.npmrc`, `pnpm-workspace.yaml`, `.env.example` and shared editor rules.

Ignore rules affect untracked files only. Check tracking and ignore behavior explicitly:

```bash
git ls-files -- .env .env.local ':(glob)**/.env*'
git check-ignore -v -- .env.local Design/index.html
```

When a local file is already tracked and should be excluded, remove only its index entry:

```bash
git rm --cached -- path/to/local-file
test -e path/to/local-file
```

Replace `path/to/local-file` with the reviewed path and verify its local copy remains. Never use a working-tree deletion, reset or cleanup command to remove someone else's local data.

## Review and commit discipline

Use the configured pnpm version and commit `pnpm-lock.yaml` with an intentional dependency change. Use `pnpm install --frozen-lockfile` when validating a fixed dependency tree.

Inspect the working tree before editing and the complete staged diff before committing:

```bash
git status --short
git diff
git add -- path/to/reviewed-file
git diff --cached --check
git diff --cached --stat
git diff --cached
```

Replace `path/to/reviewed-file` with explicit paths relevant to the change. For files containing unrelated work, stage only reviewed hunks with `git add -p -- path/to/reviewed-file`. Do not indiscriminately stage the entire repository. Check staged content for secrets without printing secret values into logs. Do not reset, stash or discard another developer's changes to make validation easier.

Run checks appropriate to the change: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm audit` for dependency review. Report actual failures and limitations. Do not use a full-repository formatter to alter protected UI or unrelated files. Security and maintenance work must preserve Header, Footer, authentication/registration UI, Kalameh and original `Design/` sources.

## Previously committed credentials

Removing a secret from the current tree or Git index does not remove it from prior commits. Treat any committed live credential as exposed. Identify affected files and credential types without copying values into issues, documentation or commit messages. The credential owner must revoke or rotate affected values and review dependent deployments.

Git history remediation is separate, coordinated work: it can require rewriting shared history, force pushes and cleanup of clones, forks or cached exports. Do not rewrite history or rotate credentials without the necessary access and authorization. Follow the verified application boundaries and outstanding actions in [security.md](security.md).

## Documentation maintenance

Start with the [documentation index](README.md). Keep current integration guidance aligned with source code and actual API responses. Generated API schemas are dated snapshots; historical plans in `history/` preserve decisions and do not override shipped routes or current security controls.

Use lowercase kebab-case names for new guides, keep established guide names stable, and update incoming links when removing or moving a document. Remove duplicates only after preserving unique information and confirming the replacement. Retain useful architecture, functional and historical context; a past validation report is evidence for its recorded revision, not a guarantee for a later build.
