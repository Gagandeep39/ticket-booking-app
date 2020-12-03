# NATS Streaming Server

- [NATS Streaming Server](#nats-streaming-server)
  - [Description](#description)
  - [Packages required](#packages-required)
  - [Steps to forward](#steps-to-forward)
  - [Consideration](#consideration)
  - [Notes](#notes)
  - [Queue group](#queue-group)
  - [Subscription Configurations](#subscription-configurations)

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

## Queue group

```ts
const subscription = stan.subscribe(
    'ticket:created', // Name of vent to subscribe
    'dummy-queue-group',  // Queue Group
    options // Manual Options configuration
  );
```

- Specific group to subscribe, Enables reciving eents of a specific group
- Make sures NAT doesnt delete all events if service crash
- When service crashes, all subscription are closed by NAT server and all events are dumped
- If a grup is created, subscriptions are not closed

## Subscription Configurations

```ts
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDurableName('dummy-service')

    .setDeliverAllAvailable();
```

- Allows modifying default configuration options of NATs
- `setDurableName('dummy-service')`
  - Internally NAT server creates an entry for ubscription
  - Allows NAT server to know whether the event has been pocessed
  - Make sure events is not missed
- `setManualAckMode(true)`
  - Waits for ack from subscriber because considering event publish as success
- `.setDeliverAllAvailable()`
  - Useful to send all event to subsription if service crashes
  - Prevent service to miss data due to crash
