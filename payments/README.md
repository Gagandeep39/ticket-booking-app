# Payment Service

- [Payment Service](#payment-service)
  - [Description](#description)
  - [Stripe JS Library flow](#stripe-js-library-flow)

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
