# Build stage
FROM denoland/deno:2.2.12 AS build-stage

WORKDIR /app

COPY deno.json deno.lock .
RUN deno install
COPY . .

FROM denoland/deno:2.2.12 AS production-stage

WORKDIR /app
COPY --from=build-stage /app .

EXPOSE 8080
CMD ["deno", "task", "server"] 
