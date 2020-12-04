# Tickets Service

- [Tickets Service](#tickets-service)
  - [Description](#description)
  - [Libraries Used](#libraries-used)
    - [Dependencies](#dependencies)
    - [Dev Dependencies (Mostly testing)](#dev-dependencies-mostly-testing)
  - [Errors](#errors)

## Description

- Used to Create  new order
- Perform Bsic CRUD operations with Order
- Requires user to be authenticated

## Libraries Used

### Dependencies

- `typescript` Add ts support
- `ts-node-dev` Run ts files directly
- `morgan`, `@types/morgan` Logging library
- `express`, `@types/express` REST API server
- `express-validator` Data Validations
- `express-async-errors` Async Error Handling
- `mongoose`, `@types/mongoose` Data persistencen management library
- `cookie-session`, `@types/cookie-session` To manage cookies on server side
- `jsonwebtoken`, `@types/jsonwebtoken` Generate and verify token

### Dev Dependencies (Mostly testing)

- `@types/jest`,  `jest`, `ts-jest`
- `@types/supertest`, `supertest`
- `mongodb-memory-server`

## Errors

- `DatabaseConnectionError` Error raised when db connection fails
- `RequestValidationError` Invalid Data
- `NotFoundError` - Invalid route
