# Ecommerce + Content Boilerplate (NestJS, Prisma, BullMQ)

Domain-first monolith for furniture ecommerce + content (HipVan x Communa style), optimized for delivery slot locking and async payment callbacks.

## Structure

```
apps/
  api/       # NestJS REST API
  worker/    # BullMQ workers
packages/
  domain/    # Pure business logic
  infra/     # Prisma repositories, Redis/BullMQ helpers
  shared/    # Shared constants/types
prisma/      # Schema + migrations
docker-compose.yml # Postgres + Redis
```

## Tech
- NestJS + TypeScript
- Prisma + PostgreSQL
- Redis + BullMQ
- JWT auth
- pnpm workspaces

## Core Domains
- Product & Variant stock (variant-level)
- Cart (user-based, no hard stock lock)
- Delivery slots (capacity + atomic lock)
- Orders (PENDING → PAID → CONFIRMED → DELIVERED)
- Payments (mock gateway, async callbacks)
- Content (articles, collections, tags, product links)

## Delivery Slot Locking (highlight)
Delivery lock uses a Prisma transaction to guard capacity and increments `lockedCount`. Worker `delivery-slot-release` can release slots on timeout.

## API (high level)
- `GET /products`, `GET /products/:id`
- `POST /cart/items`, `GET /cart`, `DELETE /cart/items/:id`
- `POST /orders`, `GET /orders/:id`
- `GET /delivery/slots`, `POST /delivery/lock`
- `POST /payments/checkout`, `POST /payments/callback`
- `GET /articles`, `GET /articles/:slug`
- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`

## Local Setup
1) Install deps: `pnpm install`
2) Run services: `docker-compose up -d` (Postgres + Redis)
3) Set env: copy `.env.example` to `.env` and adjust
4) Generate Prisma client / migrate as needed: `pnpm prisma generate`
5) Start API: `pnpm dev:api` (http://localhost:3000)
6) Start workers: `pnpm dev:worker`

## Testing
- Unit (domain): `pnpm --filter @pkg/domain test`
- API integration (lightweight mocks): `pnpm --filter @app/api test`

## What to showcase
- Domain-first layering (controllers thin, domain pure TS)
- Delivery slot locking via DB transaction
- Async payment callback + BullMQ workers
- Clear monorepo separation (api / worker / domain / infra / shared)

