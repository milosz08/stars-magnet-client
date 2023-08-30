# Stars Magnet Client

![](https://img.shields.io/badge/Made%20in-Angular%2015.1.0-1abc.svg)
&nbsp;&nbsp;
![](https://img.shields.io/badge/Using%20-Node%2018.16.0-green.svg)
&nbsp;&nbsp;
![](https://img.shields.io/badge/Packages%20manager-npm-brown.svg)
&nbsp;&nbsp;

> More info about this project you will find [on my personal website](https://miloszgilga.pl/project/stars-magnet-client)
> <br>
> See project at [starsmagnet.com](https://starsmagnet.com)

Client for [Stars Magnet](https://github.com/Lettulouz/StarsMagnet) Django rest API. This application allows you to register/log in and create
new company accounts. Each company can be rated only once by a logged-in user (this rating is included in the average). Based on these values,
it is possible to filter companies with the highest level of trust. The company also has the option to respond to comments.

I didn't have much influence on the business solutions in the application. My task was only to create the visual layer. To a lesser extent,
I made improvements to the server and was in constant contact with the backend developers.

## Table of content
* [Clone script](#clone-script)
* [Prepare and run](#prepare-and-run)
* [Run from docker container](#run-from-docker-container)
* [Tech stack](#tech-stack)
* [Author](#author)
* [Project status](#project-status)
* [License](#license)

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
$ npm install
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

<a name="run-from-docker-container"></a>
## Run from docker container
* To run from docker container, type:
```
$ docker compose up stars-magnet-client
```

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
This application is on MIT License.
