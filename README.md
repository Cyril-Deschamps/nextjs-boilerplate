<div align="center">
    <h1>next-js-boilerplate</h1>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-4.1-blue" />
    <img alt="NodeJS" src="https://img.shields.io/badge/NodeJS%3E%3D-16-darkgreen" />
    <img alt="License" src="https://img.shields.io/badge/License-APLv2-magenta" />
    <a href="https://github.com/Cyril-Deschamps/nextjs-boilerplate/actions/workflows/deploy.yml">
        <img alt="CI/CD status" src="https://github.com/Cyril-Deschamps/nextjs-boilerplate/actions/workflows/deploy.yml/badge.svg" />
    </a>
</div>

<br />
<br />
<hr />
<br />

<div align="center">
    <sub>👩🏻‍💻 <strong>Developer Ready:</strong> </sub>
    <p>A comprehensive template. With many built-in features</p>
    <sub>💼 <strong>Ready for production:</strong></sub>
    <p>Built-in <a href="https://github.com/features/actions">GitHub Actions</a> script to check <strong>linter</strong> and <strong>deploy</strong>. Dockerfile already configurated. See below how to use secrets.</p>
    <sub>🎁 <strong>Opensource:</strong></sub>
    <p>Available under the APLv2 license.</p>
</div>

<br />
<hr />
<br />

## Features

- **Execution environment :** Node 16 with ESM and Yarn
- **Framework :** [NextJS](https://nextjs.org/docs) with SSR (Server Side Rendering)
- **Language (COMPILE) :** [TypeScript 4.1](https://www.typescriptlang.org/)
- **CSS :** [TailwindCSS](https://tailwindcss.com/docs) with SCSS
- **Query manager :** [React Query](https://react-query.tanstack.com/)
- **Format :** [Prettier](https://prettier.io/) to enforce consistent code style
- **Linter :** [ESLint](https://eslint.org/) with good practices of clean code
- **GIT Helper :** Husky + Commitlint + Commitizen
- **CI/CD :** [GitHub Actions](https://github.com/features/actions) + Docker
- **Stats :** [Google Analytics](https://analytics.google.com/analytics/web/)

## Getting started

The project required Node.js v16.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/Cyril-Deschamps/nextjs-boilerplate
mv nextjs-boilerplate your-project-name
cd your-project-name
yarn install
```

Replace all the "todochangeprojectname" with your project name.

### Available Scripts

- `start` - build and start project,
- `build` - build project with NextJS and generate sitemap,
- `prepare` - to install husky hooks,
- `migrate` - migrate Prisma schema to remote database,
- `npm-run-all lint-check:\*` - Process eslint and prettier checks,
- `npm-run-all lint-fix:\*` - Process eslint, prettier checks and try to resolve,

## Secrets

Secrets are stored in github secrets. For a local environment, you can use the `.env` file to store the secret (see .env.example).

### For each environment

#### Development

| Variable                                  | Description                                                  | Example                                     |
| ----------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `DEVELOPMENT_REACT_APP_API_HOST`          | HTTP API address                                             | `https://boilerplate.cyrildeschamps.fr/api` |
| `DEVELOPMENT_REACT_APP_HOST`              | Web application address                                      | `https://boilerplate.cyrildeschamps.fr`     |
| `DEVELOPMENT_REACT_APP_GA_MEASUREMENT_ID` | Google Analytics ID                                          | `G-Z1GFDFH632`                              |
| `DEVELOPMENT_REACT_APP_WEBHOOK_SECRET`    | Random key used to sign between front and back               | `KDJ4I3SB!KXH`                              |
| `DEVELOPMENT_HOST`                        | Deployment server IP                                         | `66.254.114.41`                             |
| `DEVELOPMENT_PORT`                        | Deployment server SSH port                                   | `22`                                        |
| `DEVELOPMENT_SSHKEY`                      | SSH key for connecting to the server                         | See server's `.ssh/id_...` file             |
| `DEVELOPMENT_USERNAME`                    | Username for connecting to the server                        | `debian`                                    |
| `DEVELOPMENT_DOCKER_IMAGES_PATH`          | Name of the folder where the project is stored on the server | `/home/debian/docker-container-images`      |
| `DEVELOPMENT_DOCKER_LOCAL_IP`             | Local IP (nginx) of the container                            | `172.0.0.18`                                |

#### Production

| Variable                                 | Description                                                  | Example                                 |
| ---------------------------------------- | ------------------------------------------------------------ | --------------------------------------- |
| `PRODUCTION_REACT_APP_API_HOST`          | HTTP API address                                             | `https://boilerplate.fr/api`            |
| `PRODUCTION_REACT_APP_HOST`              | Web application address                                      | `https://boilerplate.cyrildeschamps.fr` |
| `PRODUCTION_REACT_APP_GA_MEASUREMENT_ID` | Google Analytics ID                                          | `G-Z1GFDFH631`                          |
| `PRODUCTION_REACT_APP_WEBHOOK_SECRET`    | Random key used to sign between front and back               | `KDJ4ISSB!KXA`                          |
| `PRODUCTION_HOST`                        | Deployment server IP                                         | `66.254.114.41`                         |
| `PRODUCTION_PORT`                        | Deployment server SSH port                                   | `22`                                    |
| `PRODUCTION_SSHKEY`                      | SSH key for connecting to the server                         | See server's `.ssh/id_...` file         |
| `PRODUCTION_USERNAME`                    | Username for connecting to the server                        | `debian`                                |
| `PRODUCTION_DOCKER_IMAGES_PATH`          | Name of the folder where the project is stored on the server | `/home/debian/docker-container-images`  |
| `PRODUCTION_DOCKER_LOCAL_IP`             | Local IP (nginx) of the container                            | `172.0.0.19`                            |

## Support

You can support this project by contributing to it, by posting issues and proposing pull request.

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/Cyril-Deschamps/nextjs-boilerplate/blob/production/LICENSE) file for details.

## Improvements

- Use github environment to store secrets and maybe reduce the number of secrets
- Add testing with Jest or other
- Auto-tagging with semantic-release
- And, all others improvements are welcome...
