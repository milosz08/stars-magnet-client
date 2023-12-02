FROM node:18.16.0-alpine AS build

WORKDIR /stars-magnet-client

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:latest AS run

LABEL maintainer="Miłosz Gilga <personal@miloszgilga.pl>"

COPY --from=build /stars-magnet-client/dist /usr/share/nginx/html
COPY --from=build /stars-magnet-client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
