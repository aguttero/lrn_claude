# Todo App - Developer Notes

## Project Overview

A full-stack todo list application built with Bun (JavaScript runtime). It provides a RESTful API for CRUD operations on todos and serves a vanilla HTML/JS frontend.

## Framework

- **Runtime**: Bun (`bun-types` for TypeScript support)
- **Server**: `Bun.serve()` - Built-in HTTP server
- **TypeScript**: Bundler module resolution

## Dependencies

### Production
None - Uses only Bun's built-in features.

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| `@types/bun` | ^1.3.9 | TypeScript types for Bun |
| `typescript` | ^5 | Peer dependency for type checking |

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Bun.serve                       │
│                   :3001                         │
├─────────────────────────────────────────────────┤
│  HTTP Endpoints         │  Static Files         │
│  ─────────────────     │  ─────────────         │
│  GET    /todos         │  GET  /index.html     │
│  POST   /todos         │                        │
│  PATCH  /todos/:id     │                        │
│  DELETE /todos/:id     │                        │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              public/index.html                   │
│  (Browser - Vanilla JS Frontend)                │
└─────────────────────────────────────────────────┘
```

## File Structure

```
bun-first/
├── index.ts              # Main server (API + static serving)
├── public/
│   └── index.html       # Frontend UI
├── package.json         # Project config
├── tsconfig.json        # TypeScript config
└── todo_app_dev_notes.md # This file
```

## Data Model

```typescript
interface Todo {
    id: number;          // Unique identifier (auto-incremented)
    text: string;        // Todo description
    completed: boolean;  // Completion status
    dueDate: string | null;  // Due date (YYYY-MM-DD), defaults to tomorrow
}
```

**Storage**: In-memory array (`let todos: Todo[]`). Data resets on server restart.

**Helper Functions**:
- `getTomorrowDate()`: Returns tomorrow's date as YYYY-MM-DD string

## API Endpoints

| Method | Path | Request Body | Response | Description |
|--------|------|--------------|----------|-------------|
| GET | `/todos` | - | `Todo[]` | Get all todos |
| POST | `/todos` | `{"text": "string", "dueDate": "YYYY-MM-DD"}` | `Todo` | Create new todo |
| PATCH | `/todos/:id` | `{"completed": boolean, "dueDate": "YYYY-MM-DD"}` | `Todo` | Update todo |
| DELETE | `/todos/:id` | - | `204` | Delete todo |

**Note**: `dueDate` is optional on POST. If omitted, defaults to tomorrow's date.

### Example Usage

```bash
# Get all todos
curl http://localhost:3001/todos

# Add todo with due date
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy milk", "dueDate": "2026-04-20"}'

# Add todo (due date defaults to tomorrow)
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Call mom"}'

# Toggle complete
curl -X PATCH http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Update due date
curl -X PATCH http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"dueDate": "2026-04-25"}'

# Delete todo
curl -X DELETE http://localhost:3001/todos/1
```

## Server Code Functions

### `Bun.serve()`
Main HTTP server entry point. Handles all requests via the `fetch` handler.

**Key logic:**
1. Parse URL and method from request
2. Match against route patterns (`/todos`, `/todos/:id`, `/index.html`)
3. Execute corresponding logic
4. Return appropriate `Response`

### Route Handling

- **GET `/todos`**: Returns JSON of all todos
- **POST `/todos`**: Parses JSON body, creates new `Todo` with auto-incremented ID
  - Uses `body.dueDate || getTomorrowDate()` for default due date
- **PATCH `/todos/:id`**: Parses ID from path, finds todo, updates fields from body
  - Supports `completed`, `text`, and `dueDate` updates
- **DELETE `/todos/:id`**: Parses ID, removes from array
- **GET `/` or `/index.html`**: Serves `Bun.file("public/index.html")`

## Frontend Code

The `public/index.html` contains:
- HTML form with text input + date picker
- List display with checkboxes, due dates, and delete buttons
- Vanilla JavaScript for API communication
- Overdue date styling (red text for past dates)

### Functions

| Function | Description |
|----------|-------------|
| `getTomorrowDate()` | Returns tomorrow's date string |
| `isOverdue(dueDate)` | Checks if date is in the past |
| `formatDate(date)` | Formats YYYY-MM-DD for display |
| `loadTodos()` | Fetches and renders all todos |
| `addTodo()` | POSTs new todo to server with due date |
| `toggleTodo(id, completed)` | PATCHes completion status |
| `deleteTodo(id)` | DELETEs todo by ID |

### UI Features
- Date picker defaults to tomorrow
- Overdue todos shown in red
- Completed todos shown with strikethrough

## Running the App

```bash
# Development (with hot reload)
bun run dev

# Or run directly
bun index.ts
```

Server runs at **http://localhost:3001**

## Limitations

- **No persistence**: Data stored in memory, lost on server restart
- **No authentication**: Anyone can modify todos
- **No validation**: Basic input handling only
- **Single instance**: No scaling (in-memory storage)
- **No due date clearing**: Cannot set due date to null from UI

## Future Improvements

1. Add file/DB persistence (SQLite with Bun)
2. Add input validation
3. Add todo editing (text updates)
4. Add categories/tags
5. Allow clearing due date (set to null)
6. Implement localStorage for offline support
