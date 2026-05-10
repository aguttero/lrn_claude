# Project Management MVP — Implementation Plan

## Architecture Overview

```
                    Docker Container
 ┌─────────────────────────────────────────────┐
 │  FastAPI (uvicorn)                          │
 │  ├─ /api/*      → API routes (auth, board)  │
 │  ├─ /* (static) → Next.js export (out/)     │
 │  │                                          │
 │  ├─ SQLite DB (volume-mounted)              │
 │  ├─ OpenRouter API calls                    │
 │  └─ JWT auth (python-jose)                  │
 └─────────────────────────────────────────────┘
```

**Decisions:**
- Next.js static export (`output: 'export'`), FastAPI serves static files
- Normalized relational SQLite schema (users, columns, cards tables)
- `.env` file for `OPENROUTER_API_KEY`
- Docker Compose for start/stop scripts
- Proper users table with bcrypt-hashed passwords, seeded with one user
- JWT authentication via localStorage

---

## Part 1: Plan

- [x] AGENTS.md reviewed
- [x] PLAN.md reviewed
- [x] Frontend explored
- [x] Decisions collected
- [x] `frontend/AGENTS.md` created
- [ ] Get final plan approval

**Tests:** N/A

**Success criteria:**
- All design decisions documented and approved
- `frontend/AGENTS.md` accurately describes existing code structure, components, types, and dependencies
- User explicitly approves the plan before moving to Part 2

---

## Part 2: Scaffolding

- [ ] Create `Dockerfile` (Python 3.12+ base, uv for deps, copy static files + backend)
- [ ] Create `docker-compose.yml` (single service, volume for DB, env_file)
- [ ] Create `.env.example` with `OPENROUTER_API_KEY` placeholder
- [ ] Create `backend/` with barebones FastAPI app:
  - `main.py` — serves static files at `/`, health check at `/api/health`
  - `pyproject.toml` — FastAPI, uvicorn, uv managed
- [ ] Create `scripts/start.sh` and `scripts/stop.sh` (Mac/Linux)
- [ ] Create `scripts/start.bat` and `scripts/stop.bat` (Windows)

**Tests:**
- **Docker build test**: `docker compose build` completes without errors
- **Health check test**: `curl http://localhost:8000/api/health` returns `{"status": "ok"}`
- **Static file test**: A placeholder `index.html` at `/` returns 200 with expected content
- **Script test**: `scripts/start.sh` (and `.bat`) successfully starts the container, `scripts/stop.sh` (and `.bat`) stops and removes it

**Success criteria:**
- `Dockerfile` builds a working image using Python 3.12+ and `uv` for dependencies
- `docker-compose.yml` defines a single service mapping port 8000, with a volume for the SQLite DB and `env_file` for `.env`
- FastAPI app in `backend/` serves both API routes and static files from a known directory
- `.env.example` exists with `OPENROUTER_API_KEY` placeholder, no real keys committed
- `scripts/start.sh`, `scripts/stop.sh`, `scripts/start.bat`, `scripts/stop.bat` all work on their respective platforms

---

## Part 3: Add Frontend

- [ ] Update `frontend/next.config.ts` to set `output: 'export'` (and `images.unoptimized: true` if needed)
- [ ] Build frontend into `out/` directory
- [ ] Wire FastAPI to serve `out/` as static files at `/`
- [ ] Verify the existing Kanban demo renders at `/` in Docker

**Tests:**
- **Static export build test**: `cd frontend && npx next build` produces an `out/` directory with `index.html`
- **Existing unit tests pass**: All 6 Vitest tests in `KanbanBoard.test.tsx` and `kanban.test.ts` pass
- **Existing E2E tests pass**: All 3 Playwright tests in `kanban.spec.ts` pass
- **Docker integration test**: Container starts, `curl http://localhost:8000/` returns the Kanban board HTML

**Success criteria:**
- `frontend/next.config.ts` sets `output: 'export'`
- FastAPI serves `out/` as static files at `/`
- The full Kanban demo (5 columns, 8 sample cards, drag-and-drop, add/rename/delete) works at `http://localhost:8000/` inside Docker
- No console errors or broken assets

---

## Part 4: Authentication

- [ ] Create `users` table in SQLite (id, username, password_hash)
- [ ] Seed user: `user` / `password` (bcrypt hashed, run on startup if not exists)
- [ ] Backend: `POST /api/auth/login` — validates credentials, returns JWT
- [ ] Backend: `GET /api/auth/me` — validates JWT, returns user info
- [ ] Backend: shared dependency (`get_current_user`) to extract/validate JWT from `Authorization: Bearer` header
- [ ] Frontend: Login form component, shows if no JWT
- [ ] Frontend: Store JWT in localStorage, attach to API calls via `Authorization: Bearer`
- [ ] Frontend: Logout button clears JWT

**Tests (pytest + Vitest + Playwright):**
- Backend — `POST /api/auth/login` with valid credentials returns 200 + JWT
- Backend — `POST /api/auth/login` with wrong password returns 401
- Backend — `POST /api/auth/login` with nonexistent user returns 401
- Backend — `GET /api/auth/me` with valid JWT returns `{"username": "user", "id": ...}`
- Backend — `GET /api/auth/me` with invalid/expired JWT returns 401
- Backend — `GET /api/auth/me` with no token returns 401
- Frontend — Login form renders when no JWT is stored
- Frontend — Submitting valid credentials stores JWT in localStorage and shows board
- Frontend — Submitting invalid credentials shows error message
- Frontend — Logout clears JWT from localStorage and shows login form
- E2E — User visits `/`, sees login form (not the board)
- E2E — User logs in with `user`/`password`, sees the Kanban board
- E2E — User logs out, sees login form again
- E2E — After logout, refreshing the page still shows login form
- Integration — Protected API endpoint returns 401 without token, 200 with valid token

**Success criteria:**
- `users` table created with `id`, `username`, `password_hash` columns
- Single user `user` / `password` seeded on first startup (bcrypt hashed)
- JWT tokens expire after 24 hours
- All board API endpoints (Part 6) are protected behind JWT validation

---

## Part 5: Database Schema

- [ ] Propose schema in `docs/database.md`:
  - `users(id, username, password_hash)`
  - `columns(id, user_id FK, title, position)`
  - `cards(id, column_id FK, title, details, position)`
- [ ] Get user sign-off

**Tests:**
- **Schema validation test**: Verify all tables (`users`, `columns`, `cards`) exist with correct columns and types
- **Foreign key integrity test**: Insert card with invalid `column_id` fails; deleting a column with cards cascades or errors as designed
- **Uniqueness test**: Inserting duplicate username fails
- **Seed data test**: On fresh DB, exactly one user exists with username `user`

**Success criteria:**
- `docs/database.md` documents the full schema with column names, types, constraints, and relationships
- Schema supports:
  - Multiple users (each with their own board)
  - Multiple columns per user with ordering (`position`)
  - Multiple cards per column with ordering (`position`)
  - Card fields: `id`, `title`, `details`, `column_id`, `position`
- User approves the schema before Part 6 begins

---

## Part 6: Backend API

- [ ] Create database models using SQLite (plain `aiosqlite` or `sqlite3`, no ORM)
- [ ] API routes (all JWT-protected):
  - `GET /api/board` — returns full board for user
  - `PUT /api/columns/{id}/rename` — rename column
  - `POST /api/cards` — create card in column
  - `PUT /api/cards/{id}` — edit card title/details
  - `DELETE /api/cards/{id}` — delete card
  - `PUT /api/cards/{id}/move` — move card to column at position
- [ ] Board data returned in format matching frontend's `BoardData` type
- [ ] Database auto-created on startup if `.db` file doesn't exist

**Tests (pytest, using test database with seeded data):**
- `GET /api/board` — returns board with correct structure matching `BoardData` type
- `GET /api/board` — returns empty board for user with no data
- `GET /api/board` — returns 401 without valid token
- `GET /api/board` — board is scoped to the authenticated user only (user A can't see user B's board)
- `PUT /api/columns/{id}/rename` — renames column successfully, returns updated column
- `PUT /api/columns/{id}/rename` — returns 404 for nonexistent column
- `PUT /api/columns/{id}/rename` — returns 403 for column belonging to another user
- `PUT /api/columns/{id}/rename` — returns 400 for empty title
- `POST /api/cards` — creates card in specified column with correct position
- `POST /api/cards` — returns 400 for missing title
- `POST /api/cards` — returns 404 for nonexistent column
- `POST /api/cards` — card appears in `GET /api/board` output
- `PUT /api/cards/{id}` — updates title and details
- `PUT /api/cards/{id}` — returns 404 for nonexistent card
- `PUT /api/cards/{id}` — returns 403 for card belonging to another user's board
- `DELETE /api/cards/{id}` — deletes card, removes from column ordering
- `DELETE /api/cards/{id}` — returns 404 for nonexistent card
- `DELETE /api/cards/{id}` — card no longer appears in `GET /api/board`
- `PUT /api/cards/{id}/move` — moves card to different column, updates positions correctly
- `PUT /api/cards/{id}/move` — moves card within same column to new position, reorders siblings
- `PUT /api/cards/{id}/move` — returns 400 for invalid column_id
- `PUT /api/cards/{id}/move` — position ordering remains consistent (no gaps, no duplicates)
- Database creation test — deleting the `.db` file and restarting auto-creates a fresh database with seeded user

**Success criteria:**
- All API endpoints return JSON matching frontend `BoardData` types
- Database auto-created on startup if `.db` file doesn't exist
- No ORM used (plain `aiosqlite` or `sqlite3` for simplicity)
- All tests pass with >= 90% coverage on backend routes

---

## Part 7: Frontend + Backend Integration

- [ ] Replace local `useState` board data with `fetch` calls to `/api/board`
- [ ] Wire all CRUD operations (add, edit, delete, rename column, move) to API
- [ ] Add loading states (spinner/skeleton while fetching)
- [ ] Add error states (toast or inline error message on API failure)
- [ ] Remove hardcoded sample data as primary data source

**Tests (Vitest + Playwright):**
- Frontend unit — Board loads from `GET /api/board` on mount
- Frontend unit — Adding a card calls `POST /api/cards` and updates board on success
- Frontend unit — Deleting a card calls `DELETE /api/cards/{id}` and removes it from UI
- Frontend unit — Renaming a column calls `PUT /api/columns/{id}/rename`
- Frontend unit — Moving a card calls `PUT /api/cards/{id}/move`
- E2E — Log in, add a card, reload page — card persists
- E2E — Log in, delete a card, reload page — card still gone
- E2E — Log in, rename a column, reload page — name persists
- E2E — Log in, move a card between columns, reload page — card stays in new column
- E2E — Changes in tab A are visible in tab B after refresh
- E2E — Login as user A, user A's board is different from a fresh user B's board

**Success criteria:**
- All local state management replaced with API calls
- Board data is fetched on mount and after every mutation (refetch pattern)
- Frontend handles loading states
- Frontend handles error states
- Playwright E2E tests run against the full Docker setup end-to-end

---

## Part 8: AI Connectivity

- [ ] Backend: Add OpenRouter client (direct HTTP to `https://openrouter.ai/api/v1/chat/completions`)
- [ ] Read API key from `OPENROUTER_API_KEY` env var
- [ ] Test endpoint: `POST /api/ai/test` — sends "2+2", verifies response
- [ ] Protected by JWT

**Tests:**
- **Mocked OpenRouter test**: Mock HTTP response, verify backend sends correct payload `{"model": "openai/gpt-oss-120b:free", "messages": [{"role": "user", "content": "2+2"}]}` and parses response correctly
- **API key test**: Missing `OPENROUTER_API_KEY` env var returns 500 with clear error
- **Network error test**: Simulated network timeout returns 502 gracefully
- **Optional live test**: If `OPENROUTER_API_KEY` is set, `POST /api/ai/test` returns the AI's response (skip in CI without key)

**Success criteria:**
- Backend can call OpenRouter with the correct model, API key, and message format
- `POST /api/ai/test` endpoint is protected by JWT
- API key is never logged or exposed in error responses
- Request timeout is set (30 seconds)

---

## Part 9: AI Kanban Integration

- [ ] Backend: `POST /api/chat` — accepts `{ messages: [...] }`
- [ ] On each call, serializes current board JSON, appends to messages as system context
- [ ] AI responds with structured output: `{ reply: string, board_updates?: BoardUpdate[] }`
- [ ] If `board_updates` present, apply them to DB (create/edit/move/delete cards)
- [ ] Board updates validated before applying (column exists, card exists, etc.)
- [ ] Invalid board updates from AI rejected gracefully, reply still returned
- [ ] Protected by JWT, scoped to authenticated user

**Tests (mocked AI responses):**
- Context test — `POST /api/chat` sends the full serialized board JSON as part of the prompt
- Conversation history test — previous messages in the conversation are included in the API call
- AI returns `create_card` update → card is created in DB
- AI returns `move_card` update → card is moved
- AI returns `edit_card` update → card is edited
- AI returns `delete_card` update → card is deleted
- AI returns no `board_updates` → no board changes, reply returned
- AI returns malformed `board_updates` → graceful error, reply still shown
- Scoping test — AI can only modify the authenticated user's board

**Success criteria:**
- `POST /api/chat` endpoint returns `{"reply": "...", "board_updates_applied": [...]}`
- AI prompt includes: board JSON, conversation history, and instructions for structured output format
- Board updates are validated before applying
- Invalid board updates from the AI are rejected gracefully with the reply still returned

---

## Part 10: AI Chat Sidebar

- [ ] Frontend: Add chat sidebar component (collapsible panel on right side)
- [ ] Chat UI: message list, input field, styled per color scheme
- [ ] Sends messages to `POST /api/chat`, displays AI replies
- [ ] On AI board update, refreshes board from API automatically
- [ ] Sidebar state (open/closed) survives page reloads (localStorage)
- [ ] Conversation persists within session (state in memory)

**Tests (Vitest + Playwright):**
- Frontend unit — Chat sidebar renders as a collapsible panel (open/close toggle)
- Frontend unit — Sending a message calls `POST /api/chat` and displays the reply
- Frontend unit — Multiple messages accumulate in the chat window
- Frontend unit — Loading state shows while waiting for AI response
- Frontend unit — Error state shows if API call fails
- Frontend unit — When `board_updates_applied` is non-empty, board refreshes
- E2E — Log in, open chat sidebar, send "create a card called Test in Backlog"
- E2E — Verify card appears on board and AI reply appears in chat
- E2E — Send "move that card to In Progress", verify card moved and AI reply appears
- E2E — Close and reopen sidebar, conversation persists (within session)
- E2E — Sidebar is responsive (doesn't break board layout on narrow screens)

**Success criteria:**
- Collapsible sidebar on the right side of the board
- Chat input at bottom, message list scrolls above
- Color scheme applied: Accent Yellow (`#ecad0a`) for AI icon/highlights, Purple (`#753991`) for send button, Dark Navy (`#032147`) for headings
- AI can perform all four board operations (create, edit, move, delete cards) via chat
- Board auto-refreshes within 1 second of AI applying changes
- Sidebar state (open/closed) survives page reloads
- All E2E tests pass against the full Docker setup
