from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse
from pathlib import Path

app = FastAPI()


@app.get("/api/health")
async def health():
    return {"status": "ok"}


static_dir = Path(__file__).parent.parent / "frontend" / "out"


@app.get("/{full_path:path}", response_class=HTMLResponse)
async def serve_frontend(full_path: str):
    file_path = static_dir / full_path

    if file_path.is_file():
        return FileResponse(file_path)

    return FileResponse(static_dir / "index.html")
