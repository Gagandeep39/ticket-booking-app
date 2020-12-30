# Payment Service

- [Payment Service](#payment-service)
  - [Description](#description)
  - [Stripe JS Library flow](#stripe-js-library-flow)
  - [Stripe setup](#stripe-setup)
  - [Mock tests](#mock-tests)

## Description

- Used to manage payment
- Triggered when an order is created or cancelled

## Stripe JS Library flow

1. User will enter credit cards details
2. Stripe JS will send those details toStripe JS API
3. We will recieve a token in response (Will allow charging that credit card with some money)
4. We will send the token to payment service
5. Create a pyment object with amount
6. Send a request to Spripe API from payment service using token

## Stripe setup

- Install stripe SDK `npm install --save stripe`
- Create account at <https://stripe.com/en-in>and validate email address
- Go to dashboard -> Developer -> API Key
- Create secret key and update the screts in env (In kubernetes if deployed using kubernetes)
- Refer [docs](https://stripe.com/docs/api) for more info

## Mock tests

- Mock can be created by creating a folder `__mock__` and a file name same as actual file name inside it
- Dont forget to initilize using jest('./path/to/actual/class')
