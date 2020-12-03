# NATS Streaming Server

- [NATS Streaming Server](#nats-streaming-server)
  - [Description](#description)
  - [Packages required](#packages-required)
  - [Steps to forward](#steps-to-forward)
  - [Consideration](#consideration)
  - [Notes](#notes)

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

## Consideration

- Always make sure you generate a client ID at runtime else it may provide misleading info when creating replicas
- One solution could be `<service-name>-<random-id>`
- Enable maual ack to prevent losing data due to crash after reciving an event. 
- Send ackmnowledge tht event is recieved after a task hhas been completed

## Notes

- `kubectl port-forward <pod_name> 8222:8222` Expose port to view NATS GUI
- `localhost:8222/streaming` Provides info about events, channels, clients
- Append `?subs=1` in previous step to get more detailed info
