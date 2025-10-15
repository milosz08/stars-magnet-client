FROM node:18-alpine AS build

WORKDIR /stars-magnet-client

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn run build

FROM caddy:2.10

COPY --from=build /stars-magnet-client/dist /app
COPY /docker/Caddyfile /etc/caddy/Caddyfile

LABEL maintainer="Miłosz Gilga <miloszgilga@gmail.com>"

EXPOSE 8080
