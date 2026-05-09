# Frontend - Project Management MVP

## Stack

- Next.js 16.1.6 (static export via `output: 'export'`)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- @dnd-kit for drag-and-drop (core, sortable, utilities)
- clsx for conditional class merging

## Directory Structure

```
frontend/
  src/
    app/
      layout.tsx          -- Root layout (Google Fonts, metadata)
      page.tsx            -- Home page: renders <KanbanBoard />
      globals.css         -- CSS custom properties + Tailwind import
    components/
      KanbanBoard.tsx     -- Main board (DndContext, board state)
      KanbanColumn.tsx    -- Single column (droppable + sortable context)
      KanbanCard.tsx      -- Single card (sortable via dnd-kit)
      KanbanCardPreview.tsx -- Drag overlay preview
      NewCardForm.tsx     -- Inline form to add a card to a column
    lib/
      kanban.ts           -- Types, moveCard(), createId(), initialData
    test/
      setup.ts            -- @testing-library/jest-dom import
  tests/
    kanban.spec.ts        -- Playwright E2E tests
  vitest.config.ts
  playwright.config.ts
  next.config.ts
  tsconfig.json
```

## Data Model

Defined in `src/lib/kanban.ts`:

```typescript
type Card = { id: string, title: string, details: string }
type Column = { id: string, title: string, cardIds: string[] }
type BoardData = { cards: Record<string, Card>, columns: Column[] }
```

`initialData` provides 5 columns (Backlog, Discovery, In Progress, Review, Done) with 8 hardcoded sample cards.

## Current State

This is a **frontend-only demo**. All board state lives in `useState<BoardData>` inside `KanbanBoard.tsx`. No persistence, no API calls, no auth. Everything resets on page reload.

## Operations Supported

- **Rename column**: inline input on column title
- **Add card**: via `NewCardForm` (title + details), generates ID via `createId()`
- **Delete card**: "Remove" button on each card
- **Move/reorder cards**: drag-and-drop via dnd-kit (within and between columns)

## Drag and Drop

- `DndContext` with `PointerSensor` (activation distance: 6px)
- `closestCorners` collision detection
- `DragOverlay` shows `KanbanCardPreview` during drag
- Columns use `useDroppable`, cards use `useSortable` with `verticalListSortingStrategy`

## Tests

### Vitest (unit)
- `src/components/KanbanBoard.test.tsx` — 3 tests (renders columns, renames column, adds/removes card)
- `src/lib/kanban.test.ts` — 3 tests (reorder within column, move between columns, drop to end)

### Playwright (E2E)
- `tests/kanban.spec.ts` — 3 tests (board loads, adds card, moves card between columns)

All tests currently pass.

## Color Scheme

- Accent Yellow: `#ecad0a`
- Blue Primary: `#209dd7`
- Purple Secondary: `#753991`
- Dark Navy: `#032147`
- Gray Text: `#888888`