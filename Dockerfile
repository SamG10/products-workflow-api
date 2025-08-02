# Étape 1 : Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY wait-for-it.sh ./wait-for-it.sh
COPY wait-for-postgres.sh ./wait-for-postgres.sh

RUN chmod +x ./wait-for-it.sh
RUN chmod +x ./wait-for-postgres.sh
RUN npm install --production

COPY . .

RUN npm run build

# Étape 2 : Runtime
FROM node:22-alpine

# Installer postgresql-client pour pg_isready si besoin
RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/wait-for-it.sh ./wait-for-it.sh
COPY --from=builder /app/wait-for-postgres.sh ./wait-for-postgres.sh

RUN chmod +x ./wait-for-it.sh
RUN chmod +x ./wait-for-postgres.sh

EXPOSE 8080

# 🔧 Tu peux temporairement override la commande via docker-compose.yml
CMD ["npm", "run", "start:prod"]
