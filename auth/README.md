# Auth Service

- [Auth Service](#auth-service)
  - [Description](#description)
  - [Routes](#routes)
  - [Libraries Used](#libraries-used)
  - [Errors](#errors)
  - [Data persistence](#data-persistence)
    - [Support for Async Error  handlers](#support-for-async-error-handlers)
  - [Sign Up Flow](#sign-up-flow)
  - [Performing User Authentication](#performing-user-authentication)
    - [Method 1](#method-1)
  - [Method 2](#method-2)
  - [Cookies vs JWT](#cookies-vs-jwt)
    - [Cookies](#cookies)
    - [JWT](#jwt)
  - [Important Considerations](#important-considerations)
  - [Current User](#current-user)

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
- `mongoose`,` @types/mongoose` Data persistencen management library
- `cookie-session`, `@types/cookie-session` To manage cookies on server side
- `jsonwebtoken`, `@types/jsonwebtoken` Generate and verify token

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

## Performing User Authentication

### Method 1

- All servvices send a request to auth-service to verify authenticity
- **Problem** If auth service fails eerything fails

## Method 2

- Store logic to validate user in individual service
- **Probilem** - If a user gets banned but still has an auth token, hell still be able to perform operation
- However this udea promotes independent services

## Cookies vs JWT

### Cookies

- Form of transport mechanish
- Movies any kind of data between server and browser
- Automatically managed by browser

### JWT

- Store any data we want
- Primarily used for authentication
- Must be manually managed

## Important Considerations

- Authentication mmechanism must be abl to provide user information
- Must habe builtin methods to handle token expiry and refreshing
- Must be asly understood by other languages
- Must not require backing data store

## Current User

- Checks if a user is logged in
- If `req.session.jwt` is set then user in logged In
- If set then data inside jwt is sent
- Ig not set then null response
