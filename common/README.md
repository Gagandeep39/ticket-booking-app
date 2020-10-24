# Custom npm package

- [Custom npm package](#custom-npm-package)
  - [Description](#description)
  - [Login to npm](#login-to-npm)
  - [Steps to Publish](#steps-to-publish)
  - [Dependencies](#dependencies)
    - [Production `--save`](#production---save)
    - [Dev `--save-dev`](#dev---save-dev)
  - [Exporting libraries](#exporting-libraries)
  - [Creating a patch upgrade (Bugfixes)](#creating-a-patch-upgrade-bugfixes)
  - [Steps](#steps)
  - [NOTE](#note)

## Description

- Common Authorization code
- Imported via package.json
- Wrrten in typescript, however porduction code is converted in Javascript

## Login to npm

1. `npm login`
2. Enter username and password

## Steps to Publish

1. Makre sure you are logged In
2. `git init`
3. Commit your files
4. Publish package `npm publish --access public`

## Dependencies

### Production `--save`

- `@types/cookie-session`
- `@types/express`
- `@types/jsonwebtoken`
- `cookie-session`
- `express`
- `express-validator`
- `jsonwebtoken`

### Dev `--save-dev`

- `typescript`
- `del-cli` - Allows cleaning build riectory before every build

## Exporting libraries

- Update package.json with target source code
```json
{
  "main": "./build/index.js",
  "types": "./build/index.d.ts",
  "files": [
    "./build/**/*"
  ]
```

## Creating a patch upgrade (Bugfixes)
- `npm version patch`
- Must be executed everytime we publsh an upgrade

## Steps
1. `npm version patch`
2. `npm run build`
3. `npm publish`

## NOTE

- **Always** make sure a new build is published using `npm run publish` after making any changes
- Other microservices use this library as a `npm package`
