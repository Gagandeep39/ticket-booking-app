# NATS Streaming Server

- [NATS Streaming Server](#nats-streaming-server)
  - [Description](#description)
  - [Packages required](#packages-required)
  - [Steps to forward](#steps-to-forward)

## Description

- Link to [docs](http://docs.nats.io/)
- Used for event based comunication
- Can directly be deployed by running official docker image

## Packages required

- `node-nats-streaming`
- `ts-node-dev`
- `typescript`
- `@types/node`

## Steps to forward

1. Expose a port if nats server is running on Kubernetes `kubectl port-forward <pod_name> 4222:4222`
2. Run the script using `npm run-script both` or Indiviadualy run listener and publish using `npm run-script publish`, `npm run-script listen`
3. Test the listener
   1. Make any chances like add space in publisher for it to restart
   2. On each startup publisher will emit a message
   3. Message will be recieved by listener
