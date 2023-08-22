# todo-nextjs

[![codecov](https://codecov.io/gh/davidlag0/todo-nextjs/branch/main/graph/badge.svg?token=YBGR2fclvo)](https://codecov.io/gh/davidlag0/todo-nextjs)
![Node.js CI](https://github.com/davidlag0/todo-nextjs/actions/workflows/node.js.yml/badge.svg)
![CodeQL CI](https://github.com/davidlag0/todo-nextjs/actions/workflows/codeql-analysis.yml/badge.svg)

Simple TODO app using the Next.js React framework.

This application is meant to be some kind of boilerplate for me to learn about the various tools used in web development.

## Installation and Build

### Install nvm (https://github.com/nvm-sh/nvm/blob/master/README.md)

```console
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Install node

```console
$ nvm install v16.12.0
```

### Install npm modules

```console
$ npm install --production
```

### Build

```console
$ npm run build
```

### Run the built application in production mode

```console
$ npm start
```

## Development

### Start development server:

```console
$ npm run dev
```

The application is accessible at [http://127.0.0.1:3000](http://127.0.0.1:3000).

### Linting

```console
$ npm run lint
```

### Run integration (e2e) tests (macOS)

Start podman VM:

```console
$ podman machine start
```

Build container image using the `Containerfile` in folder `postgresql`:

```console
$ podman build -t postgresdb:latest .
```

Run test PostgreSQL database container:

```console
$ podman run -d --rm --name postgres -p 15432:5432/tcp postgresdb:latest
```

Initialize database with Prisma

```console
$ npx prisma db push
```

Troubleshooting the database (from host)

```console
$ psql -h 127.0.0.1 -p 15432 -U testuser -d testdb
```

### Build on different versions of Node.js locally (example)

```console
$ nvm ls
$ nvm use v16.14.2
$ npm ci
$ npm run build --if-present
```

### Deployment

- Environment variables to configure:
  - `DATABASE_URL=postgresql://<username>:<password>@<database server URL>:5432/<database name>`
  - `NEXTAUTH_URL=https://example.com/api/auth`
  - `GITHUB_ID`
  - `GITHUB_SECRET`
  - `NEXTAUTH_SECRET` that can be generated using `$ openssl rand -base64 32`
  - `CORS_ALLOWED_ORIGIN` to set the HTTP header `Access-Control-Allow-Origin` to something else than `*`
