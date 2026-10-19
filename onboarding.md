# crewclaro-web onboarding

The CrewClaro web dashboard used by office staff and project managers. It shows translated project chat, a scope & task board, and the subcontractor directory. It has no backend of its own: all data comes from `crewclaro-api`.

## Where it fits
- **Calls:** `crewclaro-api` over REST (`/v1/*`) and WebSocket (`/realtime`).
- **Shares types with:** `crewclaro-mobile`, via `@crewclaro/api-types` (generated from `crewclaro-api/openapi.yaml`).
- **Deployed by:** `crewclaro-infra` as a static export on S3 + CloudFront.

## Stack
Next.js 15 (App Router), TypeScript, Tailwind CSS + shadcn/ui, TanStack Query, Socket.IO client, next-intl (en, es, pt, pl).

## Run locally
```bash
cp .env.example .env.local   # points at the API on http://localhost:4000
npm install
npm run dev                  # http://localhost:3000
```
You need `crewclaro-api` running locally for any screen to load data.

## Screens
| Route | Screen | File |
|---|---|---|
| `/projects/[id]/chat` | Project chat in the reader's language, with a "show original" toggle | `src/app/(dashboard)/projects/[id]/chat/page.tsx` |
| `/projects/[id]/tasks` | Kanban task board grouped by trade | `src/app/(dashboard)/projects/[id]/tasks/page.tsx` |
| `/subcontractors` | Subcontractor directory with language and compliance status | `src/app/(dashboard)/subcontractors/page.tsx` |

## Code map
| Path | What's there |
|---|---|
| `src/lib/api-client.ts` | REST client for `crewclaro-api` |
| `src/lib/realtime.ts` | Socket.IO subscription: `message.created`, `message.translated`, `task.updated` |
| `src/components/` | `MessageBubble`, `TaskCard` |

## Gotchas
- Messages arrive untranslated first (`message.created`) and are updated when `message.translated` fires. The UI has to handle both states.
- API types come from the published `@crewclaro/api-types` package. If the API contract changes, bump that package; don't hand-edit types.
- CI (`.github/workflows/ci.yml`) runs `lint`, `typecheck` and `build` on every push and PR.
