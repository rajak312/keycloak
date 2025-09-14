FROM node:20-alpine AS builder

RUN apk add --no-cache openjdk17 maven && corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /tmp
COPY package.json pnpm-lock.yaml ./
ENV CI=true
COPY . .
RUN pnpm install --frozen-lockfile


RUN pnpm build-keycloak-theme

FROM quay.io/keycloak/keycloak:26.3.4


WORKDIR /app
USER root

COPY --from=builder /tmp/dist_keycloak/*.jar /opt/keycloak/providers/

USER 1000

EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev"]
