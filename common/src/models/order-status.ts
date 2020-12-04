/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-04 18:51:23
 * @modify date 2020-12-04 18:51:23
 * @desc Orderstatus Enum
 */
export enum OrderStatus {
  // Order created, but ticket is not reserved
  Created = 'created',

  // Ticket user is trying to reserve is already reserved
  // Or when user has cancelled the oder
  Cancelled = 'cancelled',

  // Order has successuflly reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // Order has reserved the ticket
  // Paymnet has been completed
  Complete = 'complete',
}
