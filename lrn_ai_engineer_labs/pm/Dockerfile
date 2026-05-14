FROM node:22-slim AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM python:3.12-slim

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY backend/ /app/backend/
RUN cd /app/backend && uv sync

COPY --from=frontend-builder /app/frontend/out/ /app/frontend/out/

CMD ["uv", "run", "--directory", "/app/backend", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
