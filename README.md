# todo-nextjs

Simple TODO app using the Next.js React framework.

This application is meant to be some kind of boilerplate for me to learn about the various tools used in web development.

### Installation and Build

Install nvm (https://github.com/nvm-sh/nvm/blob/master/README.md)

- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

Install node

- `nvm install v16.12.0`

Install npm modules

- `npm install --production`

Build

- `npm run build`

Run the built application in production mode

- `npm start`

### Development

- Run the development server: `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) with a browser to see the result.

Linting

- `npm run lint`

Deployment

- Environment variables to configure:
  - `DATABASE_URL=postgresql://<username>:<password>@<database server URL>:5432/<database name>`
  - `NEXTAUTH_URL=https://example.com/api/auth`
  - `GITHUB_ID`
  - `GITHUB_SECRET`
  - `NEXTAUTH_SECRET` that can be generated using `$ openssl rand -base64 32`
