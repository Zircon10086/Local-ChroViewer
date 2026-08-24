# syntax=docker/dockerfile:1.7

ARG VITE_PLUS_VERSION=0.2.8

FROM ghcr.io/voidzero-dev/vite-plus:${VITE_PLUS_VERSION} AS builder

WORKDIR /app

ENV VP_GIT_HOOKS=0

COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version ./
COPY --chown=vp:vp patches ./patches
RUN vp install --frozen-lockfile

ARG VITE_BEATSAVER_API_URL=https://api.beatsaver.com
ARG VITE_SCORESABER_API_URL=https://scoresaber.com
ARG VITE_BEATLEADER_API_URL=https://api.beatleader.com
ARG VITE_LUDUS_URL=https://ludus-1.scoresaber.com
ARG VITE_ENABLED_SOURCES=beatsaver,scoresaber,beatleader

ENV NODE_ENV=production \
    VITE_BEATSAVER_API_URL=${VITE_BEATSAVER_API_URL} \
    VITE_SCORESABER_API_URL=${VITE_SCORESABER_API_URL} \
    VITE_BEATLEADER_API_URL=${VITE_BEATLEADER_API_URL} \
    VITE_LUDUS_URL=${VITE_LUDUS_URL} \
    VITE_ENABLED_SOURCES=${VITE_ENABLED_SOURCES}

COPY --chown=vp:vp . .
RUN vp build
RUN cp "$(vp env which node | head -1)" /tmp/node

FROM debian:bookworm-slim AS runner

WORKDIR /app

RUN apt-get update \
    && apt-get install --yes --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4000

COPY --from=builder /tmp/node /usr/local/bin/node
COPY --from=builder --chown=nobody:nogroup /app/.output ./.output

USER nobody

EXPOSE 4000

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || '4000') + '/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
