# scalex-invest
Plataforma ScaleX Invest - backend Node/Prisma e frontend Next/Tailwind

## Deploy da API (Render)

1. Crie um novo **Web Service** no [Render](https://render.com/).
2. Selecione este repositório e a pasta `backend/backend` como diretório de build.
3. O Render detectará automaticamente o arquivo `render.yaml` com as seguintes configurações:
   - **Build Command**: `cd backend/backend && npm install && npx prisma generate`
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
   - `NEXT_PUBLIC_API_URL` – URL pública da API Render (ex.: https://scalex-invest-api.onrender.com)
5. Finalize a importação e aguarde o build. Após o deploy, o frontend estará acessível no domínio gerado pela Vercel.
