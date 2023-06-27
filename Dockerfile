#
# Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
#
# File name: Dockerfile
# Last modified: 23/05/2023, 09:58
# Project name: stars-magnet-client
#
# Licensed under the MIT license; you may not use this file except in compliance with the License.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
# documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to the following conditions:
#
# THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
# SUBSTANTIAL PORTIONS OF THE SOFTWARE.
#
# The software is provided "as is", without warranty of any kind, express or implied, including but not limited
# to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
# shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
# action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
# or other dealings in the software.
#

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
