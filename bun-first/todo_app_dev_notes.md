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
}
```

**Storage**: In-memory array (`let todos: Todo[]`). Data resets on server restart.

## API Endpoints

| Method | Path | Request Body | Response | Description |
|--------|------|--------------|----------|-------------|
| GET | `/todos` | - | `Todo[]` | Get all todos |
| POST | `/todos` | `{"text": "string"}` | `Todo` | Create new todo |
| PATCH | `/todos/:id` | `{"completed": boolean}` | `Todo` | Update todo |
| DELETE | `/todos/:id` | - | `204` | Delete todo |

### Example Usage

```bash
# Get all todos
curl http://localhost:3001/todos

# Add todo
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy milk"}'

# Toggle complete
curl -X PATCH http://localhost:3001/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

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
- **PATCH `/todos/:id`**: Parses ID from path, finds todo, updates fields from body
- **DELETE `/todos/:id`**: Parses ID, removes from array
- **GET `/` or `/index.html`**: Serves `Bun.file("public/index.html")`

## Frontend Code

The `public/index.html` contains:
- HTML form for adding todos
- List display with checkboxes
- Vanilla JavaScript for API communication

### Functions

| Function | Description |
|----------|-------------|
| `loadTodos()` | Fetches and renders all todos |
| `addTodo()` | POSTs new todo to server |
| `toggleTodo(id, completed)` | PATCHes completion status |
| `deleteTodo(id)` | DELETEs todo by ID |

## Running the App

```bash
# Development (with hot reload)
bun run dev

# Or run directly
bun index.ts
```

Server runs at **http://localhost:3001**

## Limitations

- **No persistence**: Data stored in memory, lost on restart
- **No authentication**: Anyone can modify todos
- **No validation**: Basic input handling only
- **Single instance**: No scaling (in-memory storage)

## Future Improvements

1. Add file/DB persistence (SQLite with Bun)
2. Add input validation
3. Add todo editing (text updates)
4. Add categories/tags
5. Add due dates
6. Implement localStorage for offline support
