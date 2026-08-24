# Contributing

For local setup, start with [SETUP.md](SETUP.md)

## Package Management

Use Vite+ for package work. It manages the pinned pnpm version for the project:

```sh
vp install
vp add <package>
vp remove <package>
```

Direct pnpm also works without a global Vite+ install. Use the version pinned in `package.json`, run `pnpm install`, then invoke built-in Vite+ commands through `pnpm exec vp`. Do not use npm, Bun or yarn to install dependencies

## Code Style

- Use kebab-case for TypeScript filenames and directories
- Use named exports
- Omit explicit TypeScript return types when inference is clear
- Put user facing text in `src/i18n/messages` and read it through the i18n helpers

## Generated Files

Do not edit generated API contracts or `public/environments/*.json` directly

```sh
vp run api:generate
vp run api:regen
```

`api:regen` fetches fresh OpenAPI snapshots and requires network access. Commit refreshed snapshots and generated contracts together

## Checks

Run the full check before committing:

```sh
vp run verify
```

## Commits

Our commit style is `{feature}: {change_summary} (#{issue_number})` <sub>(sometimes maintainers are naughty and bypass the need for an issue number, do not be like the maintainers)</sub>

Example:

```text
rank-request: fix comment wrapping (#55)
denyah: destroy the page some more (#1)
```
