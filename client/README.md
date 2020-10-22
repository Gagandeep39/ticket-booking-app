# Client Side Application

- [Client Side Application](#client-side-application)
  - [Description](#description)
  - [Dependencies](#dependencies)
  - [NextJS](#nextjs)
  - [Serverside rendering notes](#serverside-rendering-notes)
  - [Issues with Server Side rendering](#issues-with-server-side-rendering)
    - [Solution](#solution)
  - [**NOTE**](#note)
  - [Actions causing execution of getInitialProps](#actions-causing-execution-of-getinitialprops)
  - [Communication with service on different namespace](#communication-with-service-on-different-namespace)

## Description

- Uses react based NextJS framework
- Uses Server side rendering
- Initially a login page is only fetched, only after successful login rest of the page are fetched

## Dependencies

- `react `
- `react-dom `
- `next`
- `axios`

## NextJS

- Routing is performed using `pages` directory
- It goes to ifferent routes beased on name of file
  - eg. `gagan.js` corresponds to `localhost/gagan`
- Starting point is `index.js`

## Serverside rendering notes

- Data loading can be performed inside getInitialProps
- Main component can not have data loaded
- Cannot use other react component inside getInitialProps

## Issues with Server Side rendering 

- Making Request from
```js
ComponentName.getInitialProps = async () => {}
```
- `getInitialProps` is executed on server sde before serving us the actual webpage asresponse

1. Local host is the Gateway IP of kubernetes
2. NextJS runs inside Kubernetes
3. Different services have dynamic IPs in it
4. When rquest is made from outside Kubernetes, proper mapping is performed by gateway
5. When request is made from inside, no interaction is done with gateway, the client doesn;t know who must recieve this request

### Solution 

- Specify the Kubernetes `service-name` in URL eg. `http://auth-srv/api/users/currentuser`
  - Not a good practice
  - We must keep clients independent of internal working of Microservices
  - We need to mae sure application is in same namespace as client

## **NOTE**
  - All requests from components are made from lient side (Even in server based apps like nextjs)
  - All requests inside `getInitialProps` will be made from server side
  - Checking our curent environment (Server or client)
  ```js
  if(typeof window === 'undefined'){
    // We ar eon server
  }else {
    // We are on Browser
  }
  ```
  - `kubectl get namespace`  Fetch namespaces
  - `kubectl get services -n <namespace>` Fetch services in that namespace

## Actions causing execution of getInitialProps

- Server Side (Console log statements will be on server logs)
  - CLick on links redirecting on ifferent domain
  - Typing address on Address bar
  - Hard refresh
- Client side  (Console log statements will be on Client logs)
  - Rediect via routing

## Communication with service on different namespace

- http://service-name.namespace.svc.cluster.local

