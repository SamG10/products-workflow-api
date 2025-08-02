## Products-workflow-api

## Docker

```bash
docker build -t samg1008/products-workflow-api .
```

deploy stack

```bash
docker stack deploy -c docker-compose.swarm.yml products-workflow-api --with-registry-auth
```

Remove stack

```bash
docker stack rm products-workflow-api
```

## Migrations

### Local

```bash
npm run build
```

```bash
npm run migrate
```
