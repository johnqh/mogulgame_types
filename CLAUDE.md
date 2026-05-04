# MogulGame Types

Shared TypeScript type definitions for the MogulGame API ecosystem.

**npm**: `@sudobility/mogulgame_types` (public)

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Runtime**: Bun
- **Package Manager**: Bun (do not use npm/yarn/pnpm for installing dependencies)
- **Build**: TypeScript compiler (dual ESM/CJS output)
- **Test**: Vitest

## Project Structure

```
src/
├── index.ts           # All types, interfaces, and response helpers
└── index.test.ts      # Tests
```

## Commands

```bash
bun run build          # Build dual ESM/CJS (build:esm + build:cjs)
bun run dev            # Watch mode
bun test               # Run Vitest tests (src/index.test.ts)
bun run typecheck      # TypeScript check
bun run lint           # Run ESLint
bun run verify         # All checks + build (use before commit)
bun run prepublishOnly # Clean + verify (runs on publish)
```

## Key Types

### History

Core data type with fields: `id`, `user_id`, `datetime`, `value`, `created_at`, `updated_at`.

### Request Types

- `HistoryCreateRequest` — `{ datetime, value }`
- `HistoryUpdateRequest` — `{ datetime?, value? }`
- `HistoryTotalResponse` — `{ total }`

### Response Helpers

- `successResponse<T>(data)` — wraps data in `BaseResponse<T>` with `success: true`
- `errorResponse(error)` — wraps error string in `BaseResponse<never>` with `success: false`

### Re-exports from @sudobility/types

`ApiResponse`, `BaseResponse`, `NetworkClient`, `Optional`

## Peer Dependencies

- `@sudobility/types` — shared infrastructure types

## Architecture

```
@sudobility/mogulgame_types (this package)
    ^
mogulgame_api
mogulgame_client
mogulgame_lib
mogulgame_app
mogulgame_app_rn
```

Foundation layer — all other MogulGame projects depend on this package.

## Related Projects

- **mogulgame_api** — Backend API server (Hono + PostgreSQL); imports types for request/response validation
- **mogulgame_client** — API client SDK with TanStack Query hooks; imports types for API contracts
- **mogulgame_lib** — Business logic library with Zustand stores; imports types transitively via mogulgame_client
- **mogulgame_app** — Web application (React + Vite); imports types transitively via mogulgame_client and mogulgame_lib
- **mogulgame_app_rn** — React Native mobile app (Expo); imports types via file: links

All other mogulgame_* projects depend on this package. This package depends on `@sudobility/types` for base infrastructure types (`BaseResponse`, `NetworkClient`, etc.).

## Coding Patterns

- Pure type definitions only -- no runtime logic except the `successResponse` and `errorResponse` helper functions
- Dual CJS/ESM build output: `build:esm` produces ES modules, `build:cjs` produces CommonJS
- All public types and helpers are exported from a single `src/index.ts` barrel file
- Re-export base types from `@sudobility/types` so consumers only need to depend on this package
- Use `interface` for object shapes and `type` for unions/aliases
- Keep type names consistent with API naming: `History`, `HistoryCreateRequest`, `HistoryUpdateRequest`, `HistoryTotalResponse`

## Gotchas

- Changes here affect ALL consumer projects (mogulgame_api, mogulgame_client, mogulgame_lib, mogulgame_app, mogulgame_app_rn) -- always consider downstream impact
- Must build both ESM and CJS targets; consumers may use either module system
- Always run `bun run verify` before publishing to catch type errors, lint issues, and build failures
- The `BaseResponse<T>` wrapper is the standard API envelope -- all API responses must conform to it
- Do not add runtime dependencies; this package should remain a lightweight type-only dependency (response helpers are the sole exception)
