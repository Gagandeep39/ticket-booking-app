# Custom npm package

- [Custom npm package](#custom-npm-package)
  - [Description](#description)
  - [Login to npm](#login-to-npm)
  - [Steps to Publish](#steps-to-publish)
  - [Dependencies](#dependencies)
    - [Dev `--save-dev`](#dev---save-dev)

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


### Dev `--save-dev`

- `typescript`
- `del-cli` - Allows cleaning build riectory before every build
