# Ticket Booking App

- [Ticket Booking App](#ticket-booking-app)
  - [Features](#features)
  - [Resources](#resources)
    - [User table](#user-table)
    - [Ticket](#ticket)
    - [Order](#order)
    - [Charges](#charges)
  - [Microservices](#microservices)
    - [Auth Service](#auth-service)
    - [Tickets Service](#tickets-service)
    - [Orders Servce](#orders-servce)
    - [Expiration](#expiration)
    - [Payments](#payments)
    - [Client](#client)
    - [Event Bus](#event-bus)
  - [Events](#events)

## Features

- Users can list tickets for sale
- Other users can purchase ticket
- Any user can list tickets for sale and purchase tickets
- When user attempts to purchase ticket, it islocked for 15 minutes
- User must complte payment in those 15 minutes
- Ticket prices can be edited if they are not locked

## Resources

### User table


| Name     | Type   |
| -------- | ------ |
| email    | String |
| password | String |

### Ticket

| Name    | Type         |
| ------- | ------------ |
| title   | String       |
| price   | Number       |
| userId  | Ref to User  |
| orderId | Ref to Order |

### Order

| Name      | Type          |
| --------- | ------------- |
| userId    | Ref to User   |
| status    | String        |
| ticketId  | Ref to Ticket |
| expiresAt | Date          |

### Charges

| Name           | Type         |
| -------------- | ------------ |
| orderId        | Ref to Order |
| status         | String       |
| amount         | Number       |
| stripeId       | String       |
| stripeRefundId | String       |

## Microservices

### Auth Service

- Everything related to user
- Sign up/ sign in/ sing out

| Route                    | Method | Body                                | Description                 |
| ------------------------ | ------ | ----------------------------------- | --------------------------- |
| `/api/users/signup`      | POST   | `{email: String, password: String}` | Sign Up for an Account      |
| `/api/users/signin`      | POST   | `{email: String, password: String}` | Sign in to existing account |
| `/api/users/signout`     | POST   | `{} `                               | Sign out                    |
| `/api/users/currentuser` | GET    | `-`                                 | Return info about user      |

### Tickets Service

- Ticket creation/ edition
- Know whether a ticket can be updated

### Orders Servce

- Create/ Updaet order

### Expiration

- Watch for order to be created, cancl after 5 min

### Payments

- Handle credit card payment
- Cancels order if payment fails
- Completes if payment succed

### Client

- Using server side rendering
- Next JS

### Event Bus

- NAT Streaming server

## Events

- User service
  - UserCreated
  - UserUpdated
- Order
  - OrderCreated
  - OrderExpired
  - OrderCancelled
- Ticket
  - Ticket Created
  - Ticket Cancelled
- Charge
  - Charge Created
