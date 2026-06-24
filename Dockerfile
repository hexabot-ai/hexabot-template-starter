###################################
# Shared base image
###################################
FROM node:24.17-bookworm-slim AS base
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
COPY --chown=node:node --from=prod-deps /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node package.json ./
COPY --chown=node:node hexabot.config.json ./hexabot.config.json
RUN mkdir -p /app/uploads /app/data && chown -R node:node /app/uploads /app/data
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
