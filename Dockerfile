FROM node:18.16.0 AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build --prod

FROM ubuntu:20.04

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y apache2
RUN rm -rf /var/lib/apt/lists/*

RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN chown root:root /var/www/html
RUN chmod 755 /var/www/html

RUN rm /var/www/html/index.html
COPY --from=build /app/dist/stars-magnet-client/ /var/www/html
COPY .htaccess /var/www/html

EXPOSE 80
CMD apache2ctl -DFOREGROUND
