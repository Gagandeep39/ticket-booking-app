# Auth Service

- [Auth Service](#auth-service)
  - [Description](#description)
  - [Routes](#routes)
  - [Libraries Used](#libraries-used)
  - [Errors](#errors)
    - [Support for Async Error  handlers](#support-for-async-error-handlers)

## Description

- Everything related to user
- Sign up/ sign in/ sing out

## Routes

| Route                    | Method | Body                                | Description                 |
| ------------------------ | ------ | ----------------------------------- | --------------------------- |
| `/api/users/signup`      | POST   | `{email: String, password: String}` | Sign Up for an Account      |
| `/api/users/signin`      | POST   | `{email: String, password: String}` | Sign in to existing account |
| `/api/users/signout`     | POST   | `{} `                               | Sign out                    |
| `/api/users/currentuser` | GET    | `-`                                 | Return info about user      |

## Libraries Used

- `typescript` Add ts support
- `ts-node-dev` Run ts files directly
- `morgan`, `@types/morgan` Logging library
- `express`, `@types/express` REST API server
- `express-validator` Data Validations
- `express-async-errors` Async Error Handling

## Errors

- `DatabaseConnectionError` Error raised when db connection fails
- `RequestValidationError` Invalid Data
- `NotFoundError` - Invalid route

### Support for Async Error  handlers
- Simple install `express-async-errors` and import
