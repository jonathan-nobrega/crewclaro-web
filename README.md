# crewclaro-web

> **Hackathon demo repo.** Mock code for testing a multi-repo agent. Not affiliated with or endorsed by CrewClaro.

Web dashboard for CrewClaro: translated project chat, scope & task board, and subcontractor directory.

## Stack
- Next.js 15 (App Router), TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query for server state
- Socket.IO client for realtime (`message.created`, `message.translated`, `task.updated`)
- next-intl for UI strings (en, es, pt, pl)
- `@crewclaro/api-types`, generated from `crewclaro-api/openapi.yaml`

## Screens
| Route | Screen |
|---|---|
| `/projects/[id]/chat` | Project Chat, each message shown in the reader's language, "show original" toggle |
| `/projects/[id]/tasks` | Scope & Tasks board, Kanban grouped by trade |
| `/subcontractors` | Subcontractor directory with language + compliance status |

## Getting started
```bash
cp .env.example .env.local
npm install
npm run dev
```

## Depends on
- `crewclaro-api` (REST `/v1/*` and WebSocket `/realtime`)
- Deployed by `crewclaro-infra` (S3 + CloudFront static export)
