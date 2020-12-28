import { Ticket } from '../tickets';

it('Implement Concurrency control', async (done) => {
  // Create instance of tcket
  const ticket = Ticket.build({
    title: 'Dummy',
    price: 1999,
    userId: '123',
  });
  // Save ticket to database
  await ticket.save();
  // Fetch ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  // Make 2 different changes
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });
  // Save fisrst fetch ticket
  await firstInstance?.save();
  // Save second fecth ticket and expect an error
  try {
    await secondInstance?.save();
  } catch (error) {
    return done();
  }
});

it('Increment version number on save', async () => {
  const ticket = await Ticket.build({
    title: 'Dummy',
    price: 1999,
    userId: '123',
  }).save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
