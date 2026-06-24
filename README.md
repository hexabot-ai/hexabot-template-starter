# Hexabot Template Starter

A small launchpad for building Hexabot AI automation apps.

This template gives you a ready-to-run Nest app powered by `@hexabot-ai/api`. That dependency brings the Hexabot runtime, workflow engine, extension discovery, and built admin frontend, so this repo can stay focused on your project-specific code.

Hexabot lets you build agentic workflows across channels: conversational, manual, scheduled, tool-calling, memory-aware, or whatever your automation needs next.

## Quick Start

Requirements:

- Node.js `24.17.x`
- npm, unless you change `hexabot.config.json`
- Docker only for `hexabot ... --docker`

Install the CLI and create an app:

```sh
npm install -g @hexabot-ai/cli@latest
npx @hexabot-ai/cli@latest create support-bot
cd support-bot
hexabot dev
```

The CLI creates `.env`, asks for the first admin credentials, installs dependencies, and starts local development with SQLite.

The admin UI runs at `http://localhost:3000`.

If you run this template directly, edit `SEED_ADMIN_*` in `.env` before the first startup.

## What You Can Build Here

- Workflow actions with typed Zod input, output, and settings.
- Channel integrations for chat, messaging, widgets, and other entry points.
- Helper services for reusable integrations.
- Binding and memory extensions when your workflows need shared capabilities or LLM-oriented context.
- App-specific Nest modules, controllers, and services.

The starter action lives at `src/extensions/actions/dummy.action.ts`. Copy it, rename it, and make it do real work.

## Commands

| Task | Command |
| --- | --- |
| Local dev | `npm run dev` or `hexabot dev` |
| Build | `npm run build` |
| Production start | `npm run start:prod` |
| CLI start | `hexabot start` |
| Diagnostics | `hexabot check [--docker-only]` |

## Docker

```sh
hexabot dev --docker
hexabot dev --docker --services postgres
hexabot dev --docker --services redis
hexabot dev --docker --services postgres,redis
```

SQLite is the default. The Postgres overlay sets `DB_TYPE=postgres`, starts `postgres`, and exposes pgAdmin on port `9000` in dev mode.

Docker compose reads `.env.docker`. Copy `.env.docker.example` to `.env.docker` before running Docker and change all `dev_only` secrets before exposing the app. The defaults keep `DB_SYNCHRONIZE=true` so a fresh Postgres volume boots; review that setting before running against an existing production database.

Production-style Docker run:

```sh
hexabot start --docker --services postgres,redis --build -d
```

## Project Map

| Path | Purpose |
| --- | --- |
| `src/main.ts` | Boots the Hexabot app. |
| `src/app.module.ts` | Root module; import your app modules here. |
| `src/hello.controller.ts` | Tiny example controller. |
| `src/extensions/actions/` | Custom workflow actions and translations. |
| `src/extensions/helpers/` | Helper integrations. |
| `src/extensions/channels/` | Channel integrations. |
| `docker/` | Compose base file and optional service overlays. |
| `hexabot.config.json` | CLI scripts, env paths, package manager, and Docker config. |

## Handy CLI

```sh
hexabot env init
hexabot env init --docker
hexabot env list
hexabot config show
hexabot docker ps
hexabot docker logs api -f
```

Keep this README close to the app. Update it when your project gains new scripts, services, extensions, or deployment rules.
