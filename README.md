API desenvolvida com [Nest](https://github.com/nestjs/nest) para o [blog](https://github.com/nicomoraes/blog-vite).

## Instalação
```bash
$ yarn install
```

## Preencher váriaveis de ambiente
```env
PORT=
NODE_ENV=
DATABASE_URL=PROVIDER://USER:PASSWORD@HOST:PORT/DATABASE
```

## Rodar o servidor

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
