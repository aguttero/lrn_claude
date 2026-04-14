# bun-first

## Commands

- `bun run dev` - Start dev server with hot reload (runs `bun --watch index.ts`)
- `bun run index.ts` - Run directly
- `bun test` - Run tests (uses bun:test)

## Project Structure

- `index.ts` - Main entrypoint (Bun.serve HTTP server on port 3000)
- `bun-rest-api/` - Separate sub-project using Elysia framework (also port 3000)
- No lint/typecheck scripts configured

## Notes

- Bun automatically loads `.env` files
- Use `bun-types` for TypeScript types (already in devDependencies)
- TypeScript config uses `bundler` moduleResolution
- Both projects use the same port - do not run simultaneously without changing port
