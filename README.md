# Stars Magnet Client

[[Docker image](https://hub.docker.com/r/milosz08/stars-magnet-client)] |
[[About project](https://miloszgilga.pl/project/stars-magnet)]

Client for [Stars Magnet](https://github.com/Lettulouz/StarsMagnet) Django rest API. This application allows you to
register/log in and create new company accounts. Each company can be rated only once by a logged-in user (this rating is
included in the average). Based on these values, it is possible to filter companies with the highest level of trust. The
company also has the option to respond to comments.

I didn't have much influence on the business solutions in the application. My task was only to create the visual layer.
To a lesser extent, I made improvements to the server and was in constant contact with the backend developers.

## Table of content

* [Clone and run](#clone-and-run)
* [Prepare development environment](#prepare-development-environment)
* [Tech stack](#tech-stack)
* [Author](#author)
* [License](#license)

## Clone and run

1. Clone repository on your local machine via:

```bash
$ git clone https://github.com/milosz08/stars-magnet-client
```

2. Run with Docker via:

```bash
$ docker compose up -d
```

Following command should create following container:

| Name                | Port  | Link                                    |
|---------------------|-------|-----------------------------------------|
| stars-magnet-client | 8080  | [localhost:8080](http://localhost:8080) |

## Prepare development environment

1. Make sure you have Node v18 and npm with yarn. If you do not have yarn, install it via `$ npm i -g yarn`.
2. Install all dependencies via:

```bash
$ yarn install --frozen-lockfile
```

3. Run angular development server via:

```bash
$ yarn run start
```

Application will be listening on [localhost:8080](http://localhost:8080).

## Tech stack

* Angular 15.1.0,
* Bootstrap (with Angular Bootstrap),
* Docker and Docker compose.

## Author

Created by Miłosz Gilga. If you have any questions about this application, send
message: [miloszgilga@gmail.com](mailto:miloszgilga@gmail.com).

## License

This project is licensed under the Apache 2.0 License.
