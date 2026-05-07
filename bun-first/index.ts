interface Todo {
    id: number;
    text: string;
    completed: boolean;
    dueDate: string | null;
}

function getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

let todos: Todo[] = [
    { id: 1, text: "Learn Bun", completed: true, dueDate: null },
    { id: 2, text: "Build a todo app", completed: false, dueDate: getTomorrowDate() }
];
let nextId = 3;

const server = Bun.serve({
    port: 3001,
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/todos" && req.method === "GET") {
            return Response.json(todos);
        }

        if (url.pathname === "/todos" && req.method === "POST") {
            const body = await req.json();
            const todo: Todo = { 
                id: nextId++, 
                text: body.text, 
                completed: false,
                dueDate: body.dueDate || getTomorrowDate()
            };
            todos.push(todo);
            return Response.json(todo, { status: 201 });
        }

        if (url.pathname.startsWith("/todos/") && req.method === "PATCH") {
            const id = parseInt(url.pathname.split("/")[2]);
            const todo = todos.find(t => t.id === id);
            if (!todo) return new Response("Not found", { status: 404 });
            const body = await req.json();
            if (body.completed !== undefined) todo.completed = body.completed;
            if (body.text !== undefined) todo.text = body.text;
            if (body.dueDate !== undefined) todo.dueDate = body.dueDate;
            return Response.json(todo);
        }

        if (url.pathname.startsWith("/todos/") && req.method === "DELETE") {
            const id = parseInt(url.pathname.split("/")[2]);
            const index = todos.findIndex(t => t.id === id);
            if (index === -1) return new Response("Not found", { status: 404 });
            todos.splice(index, 1);
            return new Response(null, { status: 204 });
        }

        if (url.pathname === "/" || url.pathname === "/index.html") {
            return new Response(Bun.file("public/index.html"));
        }

        return new Response("Not found", { status: 404 });
    }
})

console.log(`Listening on PORT http://localhost:${server.port}`);
