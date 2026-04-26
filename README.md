# Hexabot Template Starter

Minimal Hexabot v3 project template used by the Hexabot CLI to scaffold a custom bot application. The generated project depends on `@hexabot-ai/api` and only contains the app-specific Nest wrapper, environment examples, and optional Docker Compose overlays.

Not familiar with [Hexabot](https://hexabot.ai/)? It is an open-source chatbot / agent solution for creating and managing AI-powered, multi-channel, and multilingual chatbots. See the [Hexabot GitHub repository](https://github.com/Hexastack/Hexabot) for the full platform.

## Requirements

- Node.js `20.19.x` (`engines.node` is `^20.19.0`).
- npm, unless you change `hexabot.config.json` to another package manager.
- Docker Desktop/Engine only when using `hexabot ... --docker`.
- Hexabot CLI v3 alpha:

  ```sh
  npm install -g @hexabot-ai/cli@alpha
  ```

## Getting Started

Create a project with the CLI, then run local development mode:

```sh
npx @hexabot-ai/cli@alpha create support-bot
cd support-bot
hexabot dev
```

The CLI copies `.env.example` to `.env`, prompts for the first admin credentials, installs dependencies, and runs the configured `dev` script. Local development uses SQLite by default.

If you scaffold or run this template directly without the CLI prompt, edit `SEED_ADMIN_*` in `.env` before the first startup.

## Running

| Scenario | Command | Notes |
| --- | --- | --- |
| Local development | `npm run dev` or `hexabot dev` | Runs `nest start --watch` with SQLite by default. |
| Production build | `npm run build` | Outputs the Nest bundle to `dist/`. |
| Production start | `npm run start:prod` | Runs `node dist/main`. |
| CLI production start | `hexabot start` | Runs the configured `start` script. |
| Docker SQLite | `hexabot dev --docker` | Uses `docker/docker-compose.yml` plus the dev overlay. |
| Docker Postgres | `hexabot dev --docker --services postgres` | Adds the Postgres and pgAdmin overlays. |
| Docker Redis | `hexabot dev --docker --services redis` | Adds Redis and enables the Redis cache adapter. |
| Diagnostics | `hexabot check [--docker-only]` | Verifies project, env, Node, and Docker prerequisites. |

Environment files:

- `.env.example` -> `.env` for local runs.
- `.env.docker.example` -> `.env.docker` for Docker runs.

For Docker-first development, edit `SEED_ADMIN_*` in `.env.docker` before the first container boot if you want non-default admin credentials.

## Project Layout

| Path | Purpose |
| --- | --- |
| `src/main.ts` | Loads env vars and calls `bootstrapHexabotApp(AppModule)`. |
| `src/app.module.ts` | Root module decorated with `@HexabotModule`; import your app modules here. |
| `src/hello.controller.ts` | Minimal public endpoint showing how to add app-specific controllers. |
| `src/extensions/actions/` | Placeholder for custom Hexabot v3 workflow actions. |
| `src/extensions/helpers/` | Placeholder for custom helper services. |
| `src/extensions/channels/` | Placeholder for custom channel integrations. |
| `docker/` | Compose base file and optional Postgres/Redis overlays used by the CLI. |
| `hexabot.config.json` | CLI config for scripts, package manager, env paths, and Compose base file. |

## Extending The App

Add regular Nest modules under `src/` and import them in `AppModule` through the existing `@HexabotModule` metadata.

Custom Hexabot extensions live under `src/extensions`:

- `actions` for v3 workflow actions.
- `helpers` for helper integrations.
- `channels` for channel adapters.

Nest build assets are configured to copy extension i18n files and MJML templates when those folders exist.

## Docker Notes

Base Docker mode runs only the API and stores data in named volumes:

- `api-data` -> `/app/uploads`
- `api-sqlite-data` -> `/app/data`

The Postgres overlay sets `DB_TYPE=postgres` for the API container and starts `postgres`. The dev Postgres overlay also exposes Postgres on `${DB_PORT:-5432}` and starts pgAdmin on port `9000`.

The Redis overlay sets `REDIS_ENABLED=true` and starts `redis`. Combine overlays when needed:

```sh
hexabot dev --docker --services postgres,redis
```

Production-style Docker runs use the same base file without the dev overlay:

```sh
hexabot start --docker --services postgres,redis --build -d
```

## Useful CLI Commands

```sh
hexabot env init
hexabot env init --docker
hexabot env list
hexabot config show
hexabot config set packageManager npm
hexabot docker ps
hexabot docker logs api -f
```

This README is intended to be kept with generated projects. Update it when you add scripts, services, extensions, or deployment requirements.
