# Backend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY backend/backend/package*.json ./

# Instala dependências
RUN npm install

# Copia código-fonte
COPY backend/backend .

# Compila TypeScript
RUN npm run build

# Imagem final
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --production

EXPOSE 4000

CMD ["node", "dist/index.js"]
