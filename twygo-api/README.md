Projeto full-stack com React (Vite + Chakra UI) no frontend e Rails API no backend. Inclui fluxo de criação/edição de cursos com upload/substituição de vídeos (Active Storage), cache de lista com React Query, e ambiente de execução via Docker.


Sumário

Arquitetura

Requisitos

Primeiros passos (Docker)

Ambiente local sem Docker (opcional)

Variáveis de ambiente

Comandos úteis

API (Rails)

Frontend (React)

Upload/Substituição de vídeos

Estrutura de pastas

Dicas & Troubleshooting

Arquitetura

backend/: Rails API com Active Storage (armazenamento local em dev).

frontend/: React + Vite + Chakra UI (TanStack Query para cache/fetch).

Comunicação: frontend → backend via API_URL (ex.: http://localhost:3001/api).

Upload de vídeos por arquivos (FormData) e substituição com rota dedicada.


Requisitos

Docker e Docker Compose instalados.

(Opcional) Ruby, Node.js e Postgres se quiser rodar sem Docker.


Primeiros passos (Docker)

Clone o repositório:


git clone <repo-url>
cd <repo>

Suba tudo:

docker compose up --build

Acesse:

Frontend: http://localhost:5173

Backend API: http://localhost:3001/api

Backend
cd backend
cp .env.example .env   # ajuste variáveis
bundle install
bin/rails db:setup
bin/rails s -p 3001


Frontend
cd frontend
cp .env.example .env   # ajuste API_URL
npm i
npm run dev


