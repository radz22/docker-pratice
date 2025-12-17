# ---------- Stage 1: Build ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install OpenSSL for Prisma
    RUN apk add --no-cache openssl libc6-compat
    
    # Copy only package files first (for caching)
    COPY package*.json tsconfig.json ./
    
    # Install dependencies (all, since we're building)
    RUN npm install
    
    # Copy your source and Prisma files
    COPY prisma ./prisma
    COPY src ./src
    
    # Generate Prisma client for Alpine Linux
    RUN npx prisma generate
    
    # Build TypeScript
    RUN npm run build
    
    # ---------- Stage 2: Production ----------
    FROM node:20-alpine AS production
    
    ENV NODE_ENV=production
    
    WORKDIR /app
    
    # Install OpenSSL for Prisma in production
    RUN apk add --no-cache openssl libc6-compat
    
    # Copy only necessary files
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/package*.json ./
    
    # Expose port for Express
    EXPOSE 3001
    
    # Health check (optional)
    HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
      CMD node -e "require('http').get('http://localhost:3001/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
    
    # Run your app
    CMD ["node", "dist/server.js"]
    