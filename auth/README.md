# Auth Service

- [Auth Service](#auth-service)
  - [Description](#description)
  - [Routes](#routes)

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
