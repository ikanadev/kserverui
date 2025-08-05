FROM oven/bun:1 AS base
WORKDIR /app

# install with --production 
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# prod
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN bun run build
# COPY --from=build /app/build build
WORKDIR /app/build
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "start"]
