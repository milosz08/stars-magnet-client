# Stars Magnet Client

Client for Stars Magnet Django rest API. This application allows you to register/log in and create new company accounts.
Each company can be rated only once by a logged-in user (this rating is included in the average). Based on these values,
it is possible to filter companies with the highest level of trust. The company also has the option to respond to
comments.

[GitHub repository](https://github.com/milosz08/stars-magnet-client)
| [Support](https://github.com/sponsors/milosz08)

## Build image

```bash
docker build -t milosz08/stars-magnet-client .
```

## Create container

* Using command:

```bash
docker run -d \
  --name stars-magnet-client \
  -p 8080:8080 \
  -e STARS_MAGNET_API_URL=<rest API path, Caddy reverse proxy> \
  milosz08/stars-magnet-client:latest
```

* Using `docker-compose.yml` file:

```yaml
services:
  stars-magnet-client:
    container_name: stars-magnet-client
    image: milosz08/stars-magnet-client:latest
    ports:
      - '8080:8080'
    environment:
      STARS_MAGNET_API_URL: <rest API path, Caddy reverse proxy>
    networks:
      - stars-magnet-network

  # other containers...

networks:
  stars-magnet-network:
    driver: bridge
```

## Author

Created by Miłosz Gilga. If you have any questions about this application, send
message: [miloszgilga@gmail.com](mailto:miloszgilga@gmail.com).

## License

This project is licensed under the Apache 2.0 License.
