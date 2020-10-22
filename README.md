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
    - [Auth Service Docs](#auth-service-docs)
    - [Tickets Service](#tickets-service)
    - [Orders Servce](#orders-servce)
    - [Expiration](#expiration)
    - [Payments](#payments)
    - [Client](#client)
    - [Event Bus](#event-bus)
  - [Events](#events)
  - [Guide to creating typescript apps](#guide-to-creating-typescript-apps)
  - [Setup Google cloud development environment](#setup-google-cloud-development-environment)
    - [Steps to Run](#steps-to-run)
    - [Using Skaffold with Google Cloud](#using-skaffold-with-google-cloud)
  - [Considerations](#considerations)
  - [Testing a microservice](#testing-a-microservice)
  - [Testing Goals](#testing-goals)
  - [Test Dependencies](#test-dependencies)
  - [Steps to create test cases](#steps-to-create-test-cases)
  - [Note](#note)

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

### [Auth Service Docs](auth/README.md)

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

## Guide to creating typescript apps

- Add the dependencies `@types/express` `express` `ts-node-dev` `typescript`
- Run `tsc --init`
- Add script in `package.json`
```json
"scripts": {
  "start": "ts-node-dev src/index.ts"
},
```
- Some dependecies may give error while importng, simple add `@types/<dependecy>` if there is any
  - This error is because normal libraries do not specify types which is required by typescript

## Setup Google cloud development environment

- GKE provies nice support for Skaffold
- Register in Goole cloud (Requires a credit card)

### Steps to Run 

- Using Gogle CLoud SDK
  1. Go to the [link](https://cloud.google.com/sdk/docs/quickstarts)
  2. Follow the installation directions
     1. Download the SDK installer
     2. Install
  3. Run `gcloud auth login` (Redirected t browser for logging in)
  4. `gcloud init` Run through all the instructions
  5. If Docker not nstalled on PC
     1. `gcloud components install kubectl`
     2. `gcloud container clusters get-credentials <cluster-name>`
  6. If Docker is installed
     1. `gcloud container clusters get-credentials <cluster-name>`
     2. Go to Docker desktop and cross verify the Context shows something related to google cloud instead of `Docker Desktop`
  
### Using Skaffold with Google Cloud

1. Eable Google CLoud build
   1. Go to Google Cloud
   2. Sidebar -> Cloud Build
   3. Enable
2. Update Skaffold.yml to enable google cloud support
   1. Below local -> Build -> Push append the code
   ```yml
   googleCloudBuild: 
      projectId: <Found in Project details in google cloud>
   ```
   2. Replace artifacts -> Image name with `us.gcr.io/<project-id>/<img-name>`
   3. Make sure to replace the image names in other k8s files aswell
3. Setup ingress-nginx in cloud cluster
   1. Go to Skaffold docs and look for Google cloud specific command
   2. Run the command on PC (Make sure contezt is set to google cloud)
4. Update host name to point to cloud cluster
   1. GoogleCloud -> Sidebar -> Loadbalancer
   2. A load balancer will be present whci was created in Step 3
   3. Fetch the oad bancer IP and Map it with host name in PC in System32 dicrectory
5. Restart skaffold

## Considerations

- Error handling should be consistent throughout all microservices
- Always Create amiddleware to handle error
- Avoid hadling error in between code (Simple throw error)
- A common error handler must be used to catch all these errors
- Create error objects by extending inbuilt error class

## Testing a microservice

- Testing single piece of code
- Testing how different pieces of code work together
- Testing how different components work together
- Testing how services work together


## Testing Goals

- Basic request handling
- Testing around models
- Testing send/recieve events

## Test Dependencies
- `@types/jest`,  `jest`, `ts-jest` 
- `@types/supertest`, `supertest`
- `mongodb-memory-server`

## Steps to create test cases
1. Install required dev dependencies
2. Update `package.json` with following script
   ```json
   "scripts": {
    "start": "ts-node-dev src/index.ts",
    "test": "jest --watchAll --no-cache"
    },
    "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "setupFilesAfterEnv": [
      "./src/test/setup.ts"
    ]
   ```
3. Create a file `src/test/setup.ts` and specify the environent
4. Create test cases wuth file name as `*.test.ts`
5. Run `npm test`


## Note

- Sometimes when using different hostname with ingress we get `Not secure` error in chrome - Fixed by typing anywhere on chrome screen `thisisunsafe`
