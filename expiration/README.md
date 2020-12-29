# Expiration Service

- [Expiration Service](#expiration-service)
  - [Description](#description)
  - [Dependencies](#dependencies)
  - [Bull JS](#bull-js)
  - [Use](#use)

## Description

- Handle Expiration timer

## Dependencies

- `@gagan-personal/common` Event realted package
- `dotenv` Env File
- `morgan` Logging
- `node-nats-streaming` Nats streaming
- `ts-node-dev` Typescript support
- `typescript` Typescript support
- `bull`, `@types/bull` BullJS

## Bull JS

- Refer [docs](https://github.com/OptimalBits/bull)
- Used to delay jobs
- Redis-based queue for Node
- Ued to process a series of message (queue) overtime

## Use

- Expiration service is used to track expiration timer
- Expiration service listens to order created event
- As son as it recieves an event, it will create an entry in Redis and start the timer job
- After the tier job is complete an expiration event will be emitted
