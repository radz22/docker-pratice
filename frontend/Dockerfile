# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # this creates .next folder

# ---------- Production ----------
FROM node:20-alpine AS production
WORKDIR /app

# Copy dependencies
COPY --from=builder /app/node_modules ./node_modules
# Copy built Next.js files
COPY --from=builder /app/.next ./.next
# Copy public folder if any
COPY --from=builder /app/public ./public
# Copy package.json
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
