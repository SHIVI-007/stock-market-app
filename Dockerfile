# ---------------------------------------------------------------------------
# Build stage — installs dependencies, generates the Prisma client and builds
# the Next.js app.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy manifests first so dependency layers cache well.
COPY package.json package-lock.json ./
RUN npm ci

# Prisma schema + config are needed for `prisma generate`.
COPY prisma ./prisma
COPY prisma.config.ts ./

# Generate the type-safe Prisma client. DATABASE_URL is not required for
# generation, so a placeholder keeps the step self-contained.
ENV DATABASE_URL="postgresql://user:password@localhost:5432/placeholder"
RUN npx prisma generate

# Copy the rest of the source and build.
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------------------------------------------------------------------------
# Runtime stage — a slim image that runs the standalone Next.js server.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
