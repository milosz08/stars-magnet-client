FROM node:18.16.0 AS build

WORKDIR /stars-magnet-client

COPY . .

RUN yarn install
RUN yarn run build

FROM ubuntu:20.04

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y apache2
RUN rm -rf /var/lib/apt/lists/*

RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN chown root:root /var/www/html
RUN chmod 755 /var/www/html

RUN rm /var/www/html/index.html
COPY --from=build /stars-magnet-client/dist/ /var/www/html
COPY .htaccess /var/www/html

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
