# -------- Stage 1: Build --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# -------- Stage 2: Runtime --------
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app /app

USER appuser

EXPOSE 5000

CMD ["node", "src/server.js"]
