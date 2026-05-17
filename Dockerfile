# syntax=docker/dockerfile:1.7

FROM denoland/deno:2.7.14 AS deps
WORKDIR /app
COPY package.json deno.lock .npmrc ./
RUN deno install --frozen

FROM denoland/deno:2.7.14 AS build
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package.json deno.lock .npmrc svelte.config.js vite.config.ts tsconfig.json ./
COPY src ./src
COPY static ./static
COPY messages ./messages
COPY project.inlang ./project.inlang
RUN deno task build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
USER node
CMD ["node", "build/index.js"]
