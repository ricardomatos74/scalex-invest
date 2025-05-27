# scalex-invest
Plataforma ScaleX Invest - backend Node/Prisma e frontend Next/Tailwind

## Setup

```bash
# clone
# git clone <repo> && cd scalex-invest

cd backend
npm install
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run dev
```

## Deploy da API (Render)

1. Crie um novo **Web Service** no [Render](https://render.com/).
2. Selecione este repositório e a pasta `backend` como diretório de build.
3. O Render detectará automaticamente o arquivo `render.yaml` com as seguintes configurações:
   - **Build Command**: `cd backend && npm install && npx prisma generate`
   - **Start Command**: `node dist/index.js`
   - **Health Check Path**: `/health`
4. Defina as variáveis de ambiente:
   - `DATABASE_URL` – string de conexão do banco PostgreSQL
   - `NODE_ENV=production`
5. Salve e aguarde o deploy. Os logs em tempo real ficarão disponíveis no painel do serviço.

> Use o endpoint `/health` para monitorar a disponibilidade da API.

## Deploy do Frontend (Vercel)

1. No [Vercel](https://vercel.com/), clique em **Import Project** e selecione este repositório.
2. Defina a pasta `frontend` como **Root Directory**.
3. O Vercel detectará automaticamente o framework **Next.js** e utilizará o arquivo `frontend/vercel.json` para configuração.
4. Configure a variável de ambiente:
   - `NEXT_PUBLIC_API_URL` – URL pública da API
   - 

## Ambiente Docker (Local)

```bash
docker-compose up --build
```

- Backend: http://localhost:4000
- Frontend: http://localhost:3000

## Provisionamento com Terraform

1. Instale o [Terraform](https://terraform.io).
2. Acesse a pasta `infra/terraform`.
3. Configure suas credenciais AWS (`aws configure` ou variáveis de ambiente).
4. Execute:

```bash
terraform init
terraform plan
terraform apply
```

Será criado um bucket S3 de exemplo e exibido o endpoint nos *outputs*. Ajuste os arquivos `.tf` conforme a infraestrutura desejada (ECS, RDS, etc.).
 Render (ex.: https://scalex-invest-api.onrender.com)
5. Finalize a importação e aguarde o build. Após o deploy, o frontend estará acessível no domínio gerado pela Vercel.

## Testes

```bash
# Backend
cd backend
npm test

cd frontend
# Frontend
npm run cypress run
```
