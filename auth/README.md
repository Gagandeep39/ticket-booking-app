# Auth Service

- [Auth Service](#auth-service)
  - [Description](#description)
  - [Routes](#routes)
  - [Libraries Used](#libraries-used)
  - [Errors](#errors)
  - [Data persistence](#data-persistence)
    - [Support for Async Error  handlers](#support-for-async-error-handlers)
  - [Sign Up Flow](#sign-up-flow)

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
- `mongoose, @types/mongoose` Data persistencen management library

## Errors

- `DatabaseConnectionError` Error raised when db connection fails
- `RequestValidationError` Invalid Data
- `NotFoundError` - Invalid route

## Data persistence

- Auth service will have its own MongoDB instance
- One DB per pservice concept

### Support for Async Error  handlers
- Simple install `express-async-errors` and import

## Sign Up Flow

1. Recieve username, password from client
2. Perform alidation
3. Chec if user exists
4. Store password in encypted format
5. Create a new user and store in DB
6. Respond with JWT
