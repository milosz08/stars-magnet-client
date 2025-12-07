FROM node:18-alpine AS build

WORKDIR /stars-magnet-client

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn run build

FROM caddy:2.10

RUN addgroup -S smgroup && \
    adduser -S smuser -G smgroup

RUN mkdir -p /config /data && \
    chown -R smuser:smgroup /config /data

COPY --chown=smuser:smgroup --from=build /stars-magnet-client/dist /app
COPY --chown=smuser:smgroup /docker/Caddyfile /etc/caddy/Caddyfile

LABEL maintainer="Miłosz Gilga <miloszgilga@gmail.com>"

EXPOSE 8080

USER smuser
