###################################
# Shared base image
###################################
FROM node:20.19-bookworm-slim AS base
WORKDIR /app

###################################
# Install all dependencies (cached)
###################################
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

###################################
# Development image (watch mode)
###################################
FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

###################################
# Build the production bundle
###################################
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

###################################
# Install only production deps
###################################
FROM base AS prod-deps
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

###################################
# Production runtime image
###################################
FROM base AS production
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY hexabot.config.json ./hexabot.config.json
EXPOSE 3000
CMD ["node", "dist/main"]
