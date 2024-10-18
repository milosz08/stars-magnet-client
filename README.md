# Stars Magnet Client

> More info about this project you will find [on my personal website](https://miloszgilga.pl/project/stars-magnet-client)

Client for [Stars Magnet](https://github.com/Lettulouz/StarsMagnet) Django rest API. This application allows you to register/log in and create
new company accounts. Each company can be rated only once by a logged-in user (this rating is included in the average). Based on these values,
it is possible to filter companies with the highest level of trust. The company also has the option to respond to comments.

I didn't have much influence on the business solutions in the application. My task was only to create the visual layer. To a lesser extent,
I made improvements to the server and was in constant contact with the backend developers.

## Table of content
- [Clone script](#clone-script)
- [Prepare and run](#prepare-and-run)
- [Build docker container](#build-docker-container)
- [Tech stack](#tech-stack)
- [Author](#author)
- [Project status](#project-status)
- [License](#license)

<a name="clone-script"></a>
## Clone script
To install the program on your computer use the command (or use the built-in GIT system in your IDE environment):
```
$ git clone https://github.com/Milosz08/stars-magnet-client
```

<a name="prepare-and-run"></a>
## Prepare and run
* Install all dependencies via:
```
$ yarn install
```
* Run development server via (available on `http://localhost:4200/`):
```
$ ng serve
```
* Create optimized production build bundle via:
```
$ ng build
```
The build artifacts will be stored in the `dist/` directory.

<a name="build-docker-container"></a>
## Build docker container
* To build image go to root project directory and type:
```
$ docker build -t stars-magnet-client:1.0.0 .
```
* If you want use docker compose file to run container, your compose file may look like this:
```yml
version: '3.8'

services:
  stars-magnet-client:
    container_name: stars-magnet-client
    ports:
      - '4200:80'
    build:
      context: .
      dockerfile: Dockerfile
```
* To run container via composer file, type:
```
$ docker-compose up -d
```
> NOTE: By default, application will run on NGINX http server. You can modify options in nginx.conf file (ex. change
> to reverse proxy server in production environment).

<a name="tech-stack"></a>
## Tech stack
* Angular 15.1.0
* TypeScript
* NodeJS 18.16.0
* Bootstrap (with Angular Bootstrap)
* Docker technology

<a name="author"></a>
## Author
Created by Miłosz Gilga. If you have any questions about this application, send message: [personal@miloszgilga.pl](mailto:personal@miloszgilga.pl).

<a name="project-status"></a>
## Project status
Project is finished.

<a name="license"></a>
## License
This application is on Apache 2.0 License.
