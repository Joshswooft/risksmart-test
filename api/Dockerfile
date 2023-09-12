FROM oven/bun

WORKDIR /app

COPY ./api/package*.json ./

RUN bun install

COPY ./api ./

EXPOSE 3000

CMD ["bun", "dev"]
